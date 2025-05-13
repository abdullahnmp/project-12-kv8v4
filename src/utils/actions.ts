'use server';

import { IEvent, IGuestlist, IHero } from "@/types/allTypes";
import { prisma } from "@/utils/prisma";
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(formData: FormData) {
  "use server";

  const file = formData.get("file") as File | null;

  if (!file) {
    throw new Error("didn't find file");
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
      (error, result) => {
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





export async function fetchPosts() {
  try {
    return await prisma.post.findMany();
  } catch (error) {
    throw new Error("Failed to fetch posts");
  }
}


export async function createPost(data: { title: string; content: string }) {
  try {
    return await prisma.post.create({ data });
  } catch (error) {
    throw new Error("Failed to create post");
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


  export async function deleteEvent(id: string) {
    try {
      await prisma.event.delete({ where: { id } });
      return { success: true };
    } catch (error) {
      throw new Error("Failed to delete post");
    }
  }







// this is for guestlist 
export async function fetchGuestlist() {
  try {
    const data = await prisma.guestlist.findMany({
      orderBy: { createdAt: "desc" } // Latest event first
    });
    return data;
  } catch (error: any) {
    throw new Error("Failed to fetch guestlist: " + error.message);
  }
}

export async function createGuestlist(data: IGuestlist) {
  try {
    const newGuest = await prisma.guestlist.create({
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        numberOfGuests: Number(data.numberOfGuests)         
      },
    });

    return newGuest;
  } catch (error :any) {
    // console.error("Create Guestlist Error:", error);
    throw new Error("Failed to create guestlist " + error.message);
  }
}

export async function updateGuestlist(id: string, data: any) {
  try {
    const updatedEvent = await prisma.guestlist.update({
      where: { id },
      data: {
        ...data,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
      },
    });


    return updatedEvent;
  } catch (error) {
    console.error("Update Event Error:", error);
    throw new Error("Failed to update Guestlist");
  }
}

export async function deleteGuestlist(id: string) {
  try {
    await prisma.guestlist.delete({ where: { id } });
    return { success: true };
  } catch (error) {
    throw new Error("Failed to delete Guestlist");
  }
}





// this is for Hero 
export async function fetchHero() {
  const data = await prisma.hero.findFirst({where: { slug: "unique-hero-id" }, });
  return data;
}


export async function upsertHero(data: IHero) {
  const {image,title,subTitle} =data;
  const newData = {image,title,subTitle}
  const finalData = await prisma.hero.upsert({
    where: { slug: "unique-hero-id" }, 
    update: { ...newData },
    create: {
      slug: "unique-hero-id",
      title: "My Hero Section Title",
      subTitle: "Optional Subtitle",
      image: ""
    },
  });

  return finalData
}