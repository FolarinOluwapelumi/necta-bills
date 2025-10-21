import SignInForm from "@/components/auth/SignInform";
import Image from "next/image";
import Illustration from "@/assets/illustration.png";
import Icon1 from "@/assets/asset 1.png";

export default function SignInPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-12">
        <div className="mb-6 w-16 h-16 flex items-center justify-center">
          <Image
            src={Icon1}
            alt="Get started illustration"
            className="w-full h-full object-contain"
          />
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold text-black mb-12">
          SIGN IN TO CONSOLE
        </h1>

        {/* Client Component for interactive form */}
        <SignInForm initialMessage={searchParams.message} />
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
