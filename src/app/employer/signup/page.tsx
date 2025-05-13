import React from "react";
import Image from "next/image";
import SignUpEmployer from "@/components/ui/employer/SignUpEmployer";
import LinkerNavBar from "@/components/linkerNavBar";


export default function Signup() {
  return (
    <>
      <LinkerNavBar />
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        style={{
          backgroundImage: 'url("/backgroundSignUp.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)", 
          backgroundBlendMode: "overlay", 
        }}
      >
        <div className="p-20">
          <SignUpEmployer />
        </div>
      </div>
    </>
  );
}
