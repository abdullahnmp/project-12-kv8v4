// app/auth/page.tsx

import AuthButtons from "./AuthButtons";


export default function AuthPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Sign In or Register</h1>

        {/* Client Component here */}
        <AuthButtons />
      </div>
    </div>
  );
}