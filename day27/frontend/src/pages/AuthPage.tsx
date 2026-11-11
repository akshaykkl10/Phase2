import { Outlet } from "react-router";

export default function AuthPage() {
    return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-100 p-4">
            <Outlet />
        </div>
    )
}