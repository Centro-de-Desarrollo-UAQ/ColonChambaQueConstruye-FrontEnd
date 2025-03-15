import React from "react";
import { Button } from "@/components/ui/button"


export default function Home() {
  return (
    <div>
      <h1>My Homepage</h1>
      <p>
        Welcome !
      </p>
      <Button variant="default" >Button</Button>
      <Button variant="destructive">Button</Button>
      <Button variant="secondary">Button</Button>
      <Button variant="ghost">Button</Button>
      <Button variant="edit">Button</Button>
    </div>
  );
}
