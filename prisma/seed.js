import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const events  = [
  {
   
    fullName: "John Smith",
    email: "john.smith@example.com",
    phoneNumber: "+1-202-555-0143",
    numberOfGuests: 2,
    termsAccepted: true,
    submittedBy: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    
    fullName: "Emily Johnson",
    email: "emily.johnson@example.co.uk",
    phoneNumber: "+44-7911-123456",
    numberOfGuests: 1,
    termsAccepted: true,
    submittedBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
   
    fullName: "Michael Thompson",
    email: "michael.t@example.com",
    phoneNumber: "+1-415-555-2671",
    numberOfGuests: 3,
    termsAccepted: true,
    submittedBy: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {

    fullName: "Sophie Williams",
    email: "sophie.williams@domain.co.uk",
    phoneNumber: "+44-7700-900123",
    numberOfGuests: 2,
    termsAccepted: true,
    submittedBy: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
  
    fullName: "David Miller",
    email: "david.miller@eventmail.com",
    phoneNumber: "+1-303-555-0199",
    numberOfGuests: 4,
    termsAccepted: true,
    submittedBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
   
    fullName: "Olivia Brown",
    email: "olivia.brown@eventhub.com",
    phoneNumber: "+1-646-555-7821",
    numberOfGuests: 1,
    termsAccepted: true,
    submittedBy: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
   
    fullName: "James Anderson",
    email: "james.anderson@live.co.uk",
    phoneNumber: "+44-7555-123321",
    numberOfGuests: 2,
    termsAccepted: true,
    submittedBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
  
    fullName: "Chloe Harris",
    email: "chloe.harris@gmail.com",
    phoneNumber: "+1-702-555-0137",
    numberOfGuests: 1,
    termsAccepted: true,
    submittedBy: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
 
    fullName: "Daniel Wilson",
    email: "daniel.wilson@outlook.com",
    phoneNumber: "+44-7400-555777",
    numberOfGuests: 3,
    termsAccepted: true,
    submittedBy: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
   
    fullName: "Isabella Moore",
    email: "isabella.moore@eventbrite.com",
    phoneNumber: "+1-212-555-9988",
    numberOfGuests: 2,
    termsAccepted: true,
    submittedBy: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];








async function createDummyPosts() {

    

  try {
    // Generate 10 dummy posts
    

    const post = await prisma.guestlist.createMany({
        data: events
      })

    console.log(`✅ Successfully added ${post} posts`);
  } catch (error) {
    console.error("❌ Error seeding data:", error.message);
  }
}

createDummyPosts();