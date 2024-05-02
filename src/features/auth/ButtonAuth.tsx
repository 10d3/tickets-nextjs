import { getAuthSession } from "@/lib/auth"
import { LoginButton } from "./LoginButton";
import { LoggedIn } from "./loggedInButton";


export type AuthButtonProps = {

}

export const AuthButton = async (props : AuthButtonProps) => {
    const session = await getAuthSession();
    const user = session?.user

    if(!user){
        return(
            <LoginButton/>
        )
    }

    return(
        <LoggedIn user={user} />
    )
}