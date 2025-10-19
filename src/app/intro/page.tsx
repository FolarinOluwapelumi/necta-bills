"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "@/assets/asset 1.png";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InvitationPage() {
  const router = useRouter();
  const handleJoinWorkspace = () => {
    router.push("auth/get-started");
  };
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Logo */}
      <div className="px-10 mt-4">
        <Image
          src={Logo}
          alt="Nectabill"
          className=""
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-start mt-0 px-10 pt-6">
        <div className=" w-full">
          <h1 className="text-2xl md:text-4xl font-semibold text-black leading-tight mb-8">
            You have been invited to join the NectaBills Admin Workspace
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-semibold text-black mb-4">
            Dear Dominic <span className="text-purple-200">💜</span>
          </p>
          <p className="text-[1rem] md:text-xl  text-[#5f80a0] leading-relaxed mb-6 md:mb-10">
            You have been invited to join the NectaBills Workspace. Please join
            from a laptop or desktop computer
          </p>

          <p className="text-[1rem] md:text-xl text-[#5f80a0] leading-relaxed mb-6 md:mb-10">
            The invitation will expire in 7 days.
          </p>

          {/* CTA Button */}
          <Button
            size="lg"
            onClick={handleJoinWorkspace}
            className="bg-[#0E70FC] hover:bg-[#0052CC] hover:cursor-pointer text-white px-8 py-6 text-[1rem] md:text-xl font-light rounded-full"
          >
            <UserPlus className="h-5 w-5" />
            Join Workspace
          </Button>
          <div className="mt-12">
            <p className="text-base text-[#5f80a0] mb-2">Best regards,</p>
            <p className="text-base text-black font-medium">
              Madvirus from NectaBills{" "}
              <span className="text-purple-600">💜</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
