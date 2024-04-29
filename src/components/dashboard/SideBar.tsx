'use client'
import React from 'react'
import { Typography } from '../ui/typography';
import Link from 'next/link';
import { SiteConfig } from '@/lib/site-config';
import { Drawer, DrawerClose, DrawerContent, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { Home, Menu, Package, ShoppingCart, Users2, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';

export default function SideBar() {

    const pathname = usePathname()

    const links = [
        { name: "Dashboard", href: "/dashboard", icon: <Home /> },
        { name: "Orders", href: "/dashboard/users", icon: <ShoppingCart /> },
        { name: 'Event', href: '/create-event', icon: <Package /> },
        { name: "Users", href: "/dashboard/users", icon: <Users2 /> },
    ];
    return (
        <aside className="absolute md:w-[10%] md:flex h-[80%]">

            <div className=' hidden md:flex flex-col justify-between'>
                <div>
                    <h1>Logo</h1>
                </div>
                {/* menu pc */}

                <div className=' hidden md:flex flex-col gap-2 items-center '>
                    {links.map((link, i) => {
                        return (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Typography className='' as={Link} key={i} href={link.href}><Button variant={link.href === pathname ? "default" : "ghost"}>{link.icon}</Button><span className="sr-only">{link.name}</span></Typography>
                                </TooltipTrigger>
                                <TooltipContent side="right">{link.name}</TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>
                <div>
                <h1>logout</h1>
            </div>
            </div>


            {/* end menu pc */}


            <div className='absolute md:hidden'>
                <Drawer direction='left'>
                    <DrawerTrigger>
                        <Menu />
                    </DrawerTrigger>
                    <DrawerContent>
                        <div className='flex flex-col h-[85%] w-full justify-between'>
                            <div className='flex self-end'>
                                <DrawerTitle>
                                    <DrawerClose asChild>
                                        <X />
                                    </DrawerClose>
                                </DrawerTitle>
                            </div>
                            <div className='flex flex-col items-center gap-4'>
                                {links.map((link, i) => {
                                    return (
                                        <DrawerClose key={i} asChild>
                                            <Typography className='' as={Link} key={i} href={link.href}>{link.name}</Typography>
                                        </DrawerClose>
                                    );
                                })}
                            </div>
                        </div>
                    </DrawerContent>
                </Drawer>

            </div>
        </aside>
    )
}
