'use client';
import React from "react";
import { Button, buttonVariants } from '@/components/ui/button';
import { Eye, AddCircle, User } from '@solar-icons/react';
import { createContext } from "react";
import { AdminNavbarMenu } from "@/components/navigation/AdminNavbarMenu";


export default function App() {
    return (
        <>
            <div className="m-8">
                <h2 className="font-bold text-2xl">Button Variants</h2>
                <br />
                <div className="flex gap-2">
                    <h3 className="m-3">Primary Buttons</h3>
                    <Button variant='primary' color="brand">Button</Button> 
                    <Button variant='primary' color="brand" disabled>Button</Button>
                    <br />
                    <Button variant="primary" color="accent">Button</Button>
                    <Button variant="primary" color="danger">Button</Button>
                    <Button variant="primary" color="accent" size="icon">
                        <AddCircle weight="Bold" />Button 
                    </Button>
                </div>
                <br />
                <div className="flex gap-2">
                    <h3 className="m-3">Third Buttons</h3>
                    <Button variant="third" color="accent" className="m-2">Button</Button>
                </div>
                <div className="flex gap-2">
                    <h3 className="m-3">Edit Buttons</h3>
                    <Button variant="edit" color="gray" className="m-2">Button</Button>
                    <Button variant="edit" color="accent" className="m-2">Button</Button>
                    <Button variant="edit" color="danger" className="m-2">Button</Button>
                    <Button variant="edit" color="gray" size="icon" className="m-2">
                        <AddCircle weight="Bold" />Button 
                    </Button>
                    <Button variant="edit" color="accent" size="icon" className="m-2">
                        <AddCircle weight="Bold" />Button 
                    </Button>
                </div>
                <br />
                <div className="flex gap-2">
                    <h3 className="m-3">Secondary Buttons</h3>
                    <Button variant="secundary" color="accent">
                        Button<AddCircle weight="Bold" />
                    </Button>
                    <Button variant="secundary" color="accent">
                        <AddCircle weight="Bold" />Button
                    </Button>
                    <Button variant="secundary" color="accent">
                        <AddCircle weight="Bold" />
                    </Button>
                    <Button variant="secundary" color="danger">
                        <AddCircle weight="Bold" />
                    </Button>
                </div>
                <br />
                <div className="flex gap-2">
                    <h3 className="m-3">Ghost Buttons</h3>
                    <Button variant="ghost" color="brand">
                        <AddCircle weight="Bold" />Button
                    </Button>
                    <Button variant="ghost" color="brand">
                        <AddCircle weight="Bold" />
                    </Button>
                    <Button variant="ghost" color="gray">
                        <AddCircle weight="Bold" />
                    </Button>
                    <Button variant="ghost" color="accent">
                        <AddCircle weight="Bold" />
                    </Button>
                </div>
                <br />
                <div className="flex gap-2">
                    <h2 className="m-3">Mono Buttons</h2>
                    <Button variant="mono" color="brand" size="icon">
                        <AddCircle weight="Bold" />
                    </Button>
                    <Button variant="mono" color="danger" size="icon">
                        <AddCircle weight="Bold" />
                    </Button>
                </div>
            </div>
            <div className="my-8">
                <h2 className="font-bold text-2xl mx-8">NavBar Admin</h2>
                <br />
                <AdminNavbarMenu/>
            </div>
        </>
    );
}
