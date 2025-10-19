import VerifyEmailForm from "@/components/auth/VerifyEmailForm";
import Image from "next/image";
import Illustration from "@/assets/illustration.png";
import Icon2 from "@/assets/asset 3.png";


export default function VerifyEmailPage({
  searchParams,
}: {
  searchParams: { email?: string; type?: string };
}) {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-12">
        {/* Icon */}
        <div className="mb-6 w-16 h-16 flex items-center justify-center">
          <Image
            src={Icon2}
            alt="email icon"
            className="w-full h-full object-contain"
          />
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold text-black mb-4">
          YOU'VE GOT MAIL!
        </h1>

        <p className="text-gray-600 mb-8">
          Please, enter the 6 digit verification code sent to
          <br />
          <span className="font-semibold text-black">
            {searchParams.email || "dominic@gmail.com"}
          </span>{" "}
          to continue.
        </p>

        {/* Client Component for interactive verification form */}
        <VerifyEmailForm
          initialEmail={searchParams.email}
          initialType={searchParams.type}
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
