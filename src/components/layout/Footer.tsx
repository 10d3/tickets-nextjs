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


    return (
        <footer className="bg-background z-40 w-full border-b pb-2">
            <Separator/>
            <div className=" mt-4 md:mx-24 flex h-auto items-center flex-col md:flex-row justify-between sm:justify-between gap-4">
                <div>
                    <Typography variant="h3" as={Link} href="/">
                        {SiteConfig.title}
                    </Typography>
                </div>
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
        </footer>
    )
}