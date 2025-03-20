"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InfoCard } from "@/components/InfoCard/InfoCard";

export default function Home() {
  const [visibleBadges, setVisibleBadges] = useState({
    outlineClosable: true,
    defaultClosable: true,
    secondaryClosable: true,
    destructiveClosable: true,
  });

  const handleClose = (badge: string) => {
    setVisibleBadges((prevState) => ({
      ...prevState,
      [badge]: false,
    }));
  };
  return (
    <>
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
            <Badge
              variant="outline"
              onClose={() => handleClose("outlineClosable")}
            >
              Ingeniería en Software
            </Badge>
          )}

          {visibleBadges.defaultClosable && (
            <Badge
              variant="defaultClosable"
              onClose={() => handleClose("defaultClosable")}
            >
              Default Badge with Close
            </Badge>
          )}

          {visibleBadges.secondaryClosable && (
            <Badge
              variant="secondaryClosable"
              onClose={() => handleClose("secondaryClosable")}
            >
              Secondary Badge with Close
            </Badge>
          )}

          {visibleBadges.destructiveClosable && (
            <Badge
              variant="destructiveClosable"
              onClose={() => handleClose("destructiveClosable")}
            >
              Destructive Badge with Close
            </Badge>
          )}
        </div>
      </div>
      <div className="flex">
        <InfoCard avatar="https://github.com/shadcn.png" name="Jane Daw" email="Hosea28@yahoo.com" cellphone="+52 441 441 22 22"/>
        <InfoCard avatar="https://github.com/shadcn.png" name="Jane Daw" email="Hosea28@yahoo.com" cellphone={null}/>
      </div>
    </>
  );
}
