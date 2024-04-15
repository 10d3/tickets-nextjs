"use client"

import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/ui/loader"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { useMutation } from "@tanstack/react-query"
import { LogIn, LogOut, User2 } from "lucide-react"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import Link from "next/link"

export type LoggedInProps = {
    user: Session['user']
}

export const LoggedIn = (props: LoggedInProps) => {

    const mutation = useMutation({
        mutationFn: async () => {
            signOut();
        }
    });

    return (
        <DropdownMenu>
            <AlertDialog>
                <DropdownMenuTrigger asChild>
                    <Button variant='outline' size='sm'>
                        <Avatar className=" rounded-md h-6 w-6 mr-2">
                            <AvatarFallback>
                                {props.user?.name?.[0]}
                            </AvatarFallback>
                            {props.user?.image && (<AvatarImage className="rounded" src={props.user.image} alt={props.user.name ?? "user image"} />)}
                        </Avatar>
                        {props.user?.name}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className=" border-none" asChild>
                        <Link href="/account">
                            <Button variant="outline" size="sm"><User2 className="mr-2" size={12} />Account</Button>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <AlertDialogTrigger asChild>
                        <DropdownMenuItem className=" border-none ">
                            <Button variant="outline" size="sm"><LogOut className="mr-2" size={12} />Logout</Button>
                        </DropdownMenuItem>
                    </AlertDialogTrigger>
                </DropdownMenuContent>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you sure you want to logout?
                        </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                            <Button variant="secondary">
                                Cancel
                            </Button>
                        </AlertDialogCancel>
                        <Button variant='destructive'
                            disabled={mutation.isPending}
                            onClick={() => { mutation.mutate(); }} >
                            {mutation.isPending ? (
                                <Loader className="mr-2" size={12} />
                            ) : <LogIn className="mr-2" size={12} />}
                            Logout
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >
        </DropdownMenu>
    )
}