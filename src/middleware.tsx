// middleware.ts
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // Just check if user is authenticated, not their role
  return withAuth(req);
}

export const config = {
  matcher: [
    "/((?!_next|auth|unauthorized|api|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};










// // middleware.ts
// import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { NextRequest, NextResponse } from "next/server";

// export default async function middleware(req: NextRequest) {
//   const { getPermission, isAuthenticated, } = getKindeServerSession();
  
//   const isUserAuthenticated = await isAuthenticated();
//   if (isUserAuthenticated) {
//     const isAdmin = await getPermission("admin");
//     if (!isAdmin?.isGranted) {
//         console.log(`this is admin check`, isAdmin)
//       const unauthorizedUrl = new URL("/unauthorized", req.url);
//       return NextResponse.redirect(unauthorizedUrl);
//     }
//   }

//   // Proceed if admin
//   return withAuth(req);
// }

// export const config = {
//   matcher: [
//     "/((?!_next|auth|unauthorized|api|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//   ],
// };
