import { Link } from "react-router";

export default function NotFoundPage() {
    return (
        <>
            <h1>Not Found 404</h1>
            <Link to='/'> Go to dashboard</Link>
        </>
    )
}