"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Logo from "@/assets/Logo 1.png";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function InvitationPage() {
  const router = useRouter();
  const handleJoinWorkspace = () => {
    router.push("auth/get-started");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-10 py-8">
        <div className="w-full max-w-2xl mx-auto">
          {/* Logo */}
          <div className="pt-6 mb-8">
            <Image src={Logo} alt="Nectabill" className="w-auto h-8 md:h-10" />
          </div>

          <h1 className="text-2xl md:text-4xl font-semibold text-black leading-tight mb-8 text-left">
            You have been invited to join the NectaBills Admin Workspace
          </h1>

          <div className="space-y-6 mb-8">
            <p className="text-lg md:text-xl font-semibold text-black">
              Dear Dominic <span className="text-purple-600">💜</span>
            </p>

            <p className="text-base md:text-lg text-[#5f80a0] leading-relaxed">
              You have been invited to join the NectaBills Workspace. Please
              join from a laptop or desktop computer
            </p>

            <p className="text-base md:text-lg text-[#5f80a0] leading-relaxed">
              The invitation will expire in 7 days.
            </p>
          </div>

          <div className="flex justify-start mb-8">
            <Button
              size="lg"
              onClick={handleJoinWorkspace}
              className="bg-[#0E70FC] hover:bg-[#0052CC] text-white px-8 py-6 text-base md:text-lg font-medium rounded-full flex items-center gap-3"
            >
              <UserPlus className="h-5 w-5" />
              Join Workspace
            </Button>
          </div>

          <div className="pt-3 md:pt-6">
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