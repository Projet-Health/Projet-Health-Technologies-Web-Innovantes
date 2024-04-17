import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {toast} from "sonner";
import {useNavigate} from "react-router-dom";

export const Signup = () => {
    return (
        <div className="flex justify-center items-center h-screen bg-accent-100">
            <SignupForm />
        </div>
    )
}


export function SignupForm() {

    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const email = form.get('email');
        const password = form.get('password');
        const confirmPassword = form.get('confirmPassword');

        if(password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        if(!email || !password) {
            toast.error('Please fill all the fields');
            return;
        } else {
            const response = await fetch('https://health.shrp.dev/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, role: "16317dcf-1e2f-4fba-969f-6f6b15ba1062" }),
            });
            const data = await response.json();
            if(response.ok) {
                toast.success('Account created successfully');
                navigate('/login');
            } else {
                toast.error(data.message);
            }
        }
    }
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Signup</CardTitle>
                <CardDescription>
                    Enter your email below to create a account.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <form onSubmit={(e) => onSubmit(e)} className="grid gap-2" id="signupForm">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="exemple@etu.univ-lorraine.fr" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Confirm Password</Label>
                        <Input id="password" name="confirmPassword" type="password" required />
                    </div>
                </form>
            </CardContent>
            <CardFooter>
                <Button type="submit" className="w-full" form="signupForm">Sign in</Button>
            </CardFooter>
        </Card>
    )
}
