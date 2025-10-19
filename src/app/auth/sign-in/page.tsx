import SignInForm from "@/components/auth/SignInform";
import Image from "next/image";
import Illustration from "@/assets/illustration.png";

export default function SignInPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-12 py-12">
        {/* Static content can stay here */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-[#0E70FC] rounded-full flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <circle cx="16" cy="10" r="4" fill="currentColor" />
              <path
                d="M8 20C8 16.686 11.582 14 16 14C20.418 14 24 16.686 24 20V24H8V20Z"
                fill="currentColor"
              />
            </svg>
            <div className="absolute ml-8 mt-8 w-6 h-6 bg-white rounded-full border-2 border-[#0066FF] flex items-center justify-center">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                  fill="#0066FF"
                />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-4xl font-extrabold text-black mb-12">
          SIGN IN TO CONSOLE
        </h1>

        {/* Client Component for interactive form */}
        <SignInForm initialMessage={searchParams.message} />

        {/* Static footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <a
            href="/auth/get-started"
            className="text-[#0E70FC] underline font-medium"
          >
            Get Started
          </a>
        </p>
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
