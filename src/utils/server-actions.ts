"use server";

import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "fs";
import { join } from "path";
import os from "os";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export type CloudinaryResponse = {
  success: boolean;
  url?: string;
  message?: string;
};

export async function uploadImage(formData: FormData): Promise<CloudinaryResponse> {
  const file = formData.get("file") as File | null;
  if (!file) {
    return { success: false, message: "File not found" };
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // ✅ OS-agnostic temp directory
  const tmpDir = join(os.tmpdir(), "uploads");
  await fs.mkdir(tmpDir, { recursive: true });

  const filePath = join(tmpDir, file.name);
  await fs.writeFile(filePath, buffer);

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "events",
      resource_type: "image",
      timeout: 15000, // 15 seconds timeout for slow networks
    });

    return { success: true, url: result.secure_url };
  } catch (error: any) {
    console.error("Upload failed:", error);
    return { success: false, message: `File upload failed: ${error.message || error}` };
  } finally {
    // Clean up the temp file after the upload attempt
    await fs.unlink(filePath).catch(err => console.error("Temp file cleanup failed:", err));
  }
}
