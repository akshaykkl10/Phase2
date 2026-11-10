import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { loginSubmit } from "@/utils/authutils";

export default function LoginCard() {
    return(
        <Card className="w-full max-w-md mx-1">
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="grid grid-cols-[120px_1fr] gap-4 items-start max-w-md" onSubmit={loginSubmit}>
                    <label htmlFor="email" className="font-medium">Email</label>
                    <input type="email" name="email" id="email" className="border border-black rounded-md px-3 py-2" />

                    <label htmlFor="password" className="font-medium">Password</label>
                    <input type="password" name="password" id="password" className="border border-black rounded-md px-3 py-2" />
                    <button className="border border-black rounded-md px-3 py-3" type="submit">Submit</button>
                </form>                     
            </CardContent>
        </Card>
    )
}