import {Link, useNavigate} from "react-router-dom";
import {MountainIcon} from "lucide-react";
import {Button} from "@/components/ui/button.jsx";
import {useAuth} from "@/contexts/auth.context.jsx";
import {Avatar, AvatarImage} from "@/components/ui/avatar.jsx";
import {AvatarFallback} from "@radix-ui/react-avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.jsx";
import {toast} from "sonner";

export const   Header = () => {
    const {user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
        toast.success('Logged out successfully');
    }
    return (
        <header className="px-4 py-4 border-b w-full shrink-0 md:px-6">
            <div className="container w-full flex items-center justify-between">
                <Link className="flex mr-4" to="/">
                    <MountainIcon className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <nav className="text-sm font-medium">
                    {user ?

                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src="/logo.jpg" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    :
                        <>
                            <Link className="text-gray-500 dark:text-gray-500" to="/login">
                                <Button variant="link" size="sm">Login</Button>
                            </Link>
                            <Link className="text-gray-500 dark:text-gray-500" to="/signup">
                                <Button size="sm">Signup</Button>
                            </Link>
                        </>}
                </nav>
            </div>
        </header>
    )
}