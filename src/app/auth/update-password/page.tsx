import UpdatePasswordForm from "@/components/auth/UpdatePasswordForm";
import Image from "next/image";
import Illustration from "@/assets/illustration.png";
import Icon3 from "@/assets/asset 4.png";


export default function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: { token?: string; email?: string };
}) {
  const isValidToken = !!searchParams.token; // Simple validation for demo

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-12">
        {/* Icon */}
         <div className="mb-6 w-16 h-16 flex items-center justify-center">
          <Image
            src={Icon3}
            alt="Get started illustration"
            className="w-full h-full object-contain"
          />
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold text-black mb-12">
          UPDATE PASSWORD
        </h1>

        {/* Client Component for interactive form */}
        <UpdatePasswordForm
          initialToken={searchParams.token}
          initialEmail={searchParams.email}
          isValidToken={isValidToken}
        />
      </div>

      {/* Right Side - Illustration (Static) */}
      <div className="hidden md:flex w-1/2 bg-[#F3F4F6] items-center justify-center p-12">
        <Image
          src={Illustration}
          alt="Get started illustration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
