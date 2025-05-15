import React from "react";
import SignUpEmployer from "@/components/ui/employer/SignUpEmployer";
import LinkerNavBar from "@/components/linkerNavBar";


export default function Signup() {
  return (
    <>
      <LinkerNavBar />
      <div
        className="py-15 flex flex-col items-center justify-center min-h-screen"
        style={{
          backgroundImage: 'url("/backgroundSignUp.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)", 
          backgroundBlendMode: "overlay", 
        }}
      >        
        <SignUpEmployer />
      </div>
    </>
  );
}
