
// src/components/layout/Header.
import { SiteConfig } from '@/lib/site-config';
import Link from 'next/link';
import { ThemeToggle } from '../theme/Toggletheme';
import { Typography } from '../ui/typography';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTitle, DrawerTrigger } from '../ui/drawer';
import { AuthButton } from '@/features/auth/authButton';

export function Header() {

    const links = [
        { name: "Home", href: "/" },
        { name: "Event", href: "/event" },
        { name: 'Create event', href: '/create-event' },
        { name: "FAQ", href: "#" },
    ];


    return (
        <header className="bg-background sticky top-0 z-40 w-full border-b">
            <div className="container flex h-16 items-center justify-between space-x-4 sm:justify-between sm:space-x-0">
                <div className="flex gap-2 items-center ">
                    {/* <Image src="/images/logo.svg" width={50} height={35} alt="app logo" /> */}
                    <Typography variant="h3" as={Link} href="/">
                        {SiteConfig.title}
                    </Typography>
                </div>
                {/* menu pc */}

                <div className=' hidden md:flex gap-2 items-center '>
                    {links.map((link, i) => {
                        return (
                            <Typography className='' as={Link} key={i} href={link.href}>{link.name}</Typography>
                        );
                    })}
                </div>

                <div className=" hidden md:flex items-center justify-end space-x-4">
                    <nav className="flex items-center space-x-1">
                        <AuthButton />
                        <ThemeToggle />
                    </nav>
                </div>

                {/* end menu pc */}


                <div className='flex md:hidden'>
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
                                <div className='flex flex-col w-full items-center'>
                                    <div className='flex flex-col gap-4 p-3 items-center'>
                                        <AuthButton />
                                        <ThemeToggle />
                                    </div>
                                </div>
                            </div>
                        </DrawerContent>
                    </Drawer>

                </div>

            </div>
        </header>
    );
}
