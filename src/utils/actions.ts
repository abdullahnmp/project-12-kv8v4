'use server';

import { IEvent } from "@/types/allTypes";
import { prisma } from "@/utils/prisma";
import { v2 as cloudinary } from "cloudinary";


export async function createPost(data: { title: string; content: string }) {
    try {
      return await prisma.post.create({ data });
    } catch (error) {
      throw new Error("Failed to create post");
    }
  }



export async function fetchPosts() {
  try {
    return await prisma.post.findMany();
  } catch (error) {
    throw new Error("Failed to fetch posts");
  }
}


export async function updatePost(id: string, data: { title: string; content: string }) {
    try {
      return await prisma.post.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error("Failed to update post");
    }
  }



  ;

export async function duplicatePost(data: { title: string; content: string }) {
  try {
    return await prisma.post.create({ data });
  } catch (error) {
    throw new Error("Failed to duplicate post");
  }
}




export async function deletePost(id: string) {
    try {
      await prisma.post.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      throw new Error("Failed to delete post");
    }
  }




  export async function fetchEvents() {
    try {
      const events = await prisma.event.findMany({
        orderBy: { createdAt: "desc" } // Latest event first
      });
      return events;
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  }









  export async function deleteEvent(id: string) {
    try {
      await prisma.event.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      throw new Error("Failed to delete post");
    }
  }







export async function createEvent(data:any) {
  try {
    const newEvent = await prisma.event.create({
      data: {
        ...data,
        startDate: new Date(data.startDate),
        minAge: parseInt(data.minAge),
        cost: parseFloat(data.cost),
        
      },
    });


    return newEvent;
  } catch (error) {
    console.error("Create Event Error:", error);
    throw new Error("Failed to create event");
  }
}

export async function updateEvent(id: string, data: any) {
  try {
    const updatedEvent = await prisma.event.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        minAge: data.minAge ? parseInt(data.minAge) : undefined,
        cost: data.cost ? parseFloat(data.cost) : undefined,
      },
    });


    return updatedEvent;
  } catch (error) {
    console.error("Update Event Error:", error);
    throw new Error("Failed to update event");
  }
}






cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(formData: FormData) {
  "use server";

  const file = formData.get("file") as File | null;

  if (!file) {
    throw new Error("ফাইল পাওয়া যায়নি");
  }

  // Convert File to Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Upload to Cloudinary
  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "events", // optional folder
        resource_type: "image",
      },
      (error: string, result: string) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );

    uploadStream.end(buffer);
  });

  return (result as any).secure_url;
}