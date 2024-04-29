/* eslint-disable tailwindcss/classnames-order */
import { SiteConfig } from "@/lib/site-config"
import { Typography } from "../ui/typography"
import Link from "next/link"
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Separator } from "../ui/separator";

export const Footer = () => {

    const socials = [
        {
            name: <Github />,
            lien: "https://github.com/10d3"
        },
        {
            name: <Linkedin />,
            lien: "https://www.linkedin.com/in/aherleym/",
        },
        { name: <Twitter />, lien: "" },
        { name: <Instagram />, lien: "" },
    ];

    const links = [
        { name: "Home", href: "/" },
        { name: "Event", href: "/event" },
        { name: 'Create event', href: '/create-event' },
        { name: "FAQ", href: "#" },
    ];


    return (
        <footer className="bg-background z-40 w-full border-b pb-2">
            <Separator />
            <div className=" mt-4 md:mx-24 flex h-auto items-center flex-col md:flex-row justify-between sm:justify-between gap-4">
                <div>
                    <Typography variant="h3" as={Link} href="/">
                        {SiteConfig.title}
                    </Typography>
                </div>
                {/* <div className="flex flex-col">
                    <h2 className=" text-xl md:text-2xl">About {SiteConfig.title}</h2>
                    <div className='flex flex-col items-center gap-2'>
                        {links.map((link, i) => {
                            return (
                                <Typography className='' as={Link} key={i} href={link.href}>{link.name}</Typography>
                            );
                        })}
                    </div>
                </div> */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-xl md:text-2xl">Get in touch</h2>
                    <div className="flex flex-row gap-4">
                        {socials.map((social, i) => {
                            return (
                                <Typography as={Link} href={social.lien} className="text-2xl" key={i}>
                                    {social.name}
                                </Typography>
                            )
                        })}
                    </div>
                </div>
            </div>
        </footer>
    )
}