'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ButtonNavBar } from "@/components/ui/buttonNavBar";
import { Badge } from "@/components/ui/badge";
import LinkerNavBar from "@/components/linkerNavBar";
import UserNavBar from "@/components/userNavBar";
import FooterLanding from "@/components/footerLanding";
export default function Home() {
  const [visibleBadges, setVisibleBadges] = useState({
    outlineClosable: true,
    defaultClosable: true,
    secondaryClosable: true,
    destructiveClosable: true,
  })

  const handleClose = (badge: string) => {
    setVisibleBadges((prevState) => ({
      ...prevState,
      [badge]: false,
    }))
  }
  return (
    <>
    <div>
      <LinkerNavBar />
      <div className="bg-white p-2"></div>
      <UserNavBar/>
    </div>
      <div className="space-y-4">
        <h1 className="px-">My Homepage</h1>
        <p>Welcome!</p>
        <Button variant="default">Button</Button>
        <Button variant="destructive">Button</Button>
        <Button variant="secondary">Button</Button>
        <Button variant="ghost">Button</Button>
        <Button variant="edit">Button</Button>
      </div>
      <div className="space-y-4">
        <ButtonNavBar variant="hover" size="sm">Option</ButtonNavBar>
        <ButtonNavBar variant="default" size="default">Option</ButtonNavBar>
        <ButtonNavBar variant="active">Option</ButtonNavBar>
      </div>

      <div className="space-y-4">
      {/* Badges sin onClose */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="default">Abierto</Badge>
        <Badge variant="secondary">Cerrado</Badge>
        <Badge variant="destructive">En Revisión</Badge>
        <Badge variant="outline">Ingeniería en Software</Badge>
      </div>

      {/* Badges con onClose */}
      <div className="flex flex-wrap gap-2">
        {visibleBadges.outlineClosable && (
          <Badge variant="outline" onClose={() => handleClose("outlineClosable")}>
            Ingeniería en Software
          </Badge>
        )}

        {visibleBadges.defaultClosable && (
          <Badge variant="defaultClosable" onClose={() => handleClose("defaultClosable")}>
            Default Badge with Close
          </Badge>
        )}

        {visibleBadges.secondaryClosable && (
          <Badge variant="secondaryClosable" onClose={() => handleClose("secondaryClosable")}>
            Secondary Badge with Close
          </Badge>
        )}

        {visibleBadges.destructiveClosable && (
          <Badge variant="destructiveClosable" onClose={() => handleClose("destructiveClosable")}>
            Destructive Badge with Close
          </Badge>
        )}
      </div>
    </div>
    <div>
      <FooterLanding/>
    </div>
    </>
  );
}
