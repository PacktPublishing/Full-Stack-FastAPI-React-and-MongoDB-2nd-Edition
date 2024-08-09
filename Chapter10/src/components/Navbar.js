import Link from "next/link"
import { getSession } from "@/actions";
import LogoutForm from "./LogoutForm";

const Navbar = async () => {
    const session = await getSession()
    return (
        <nav
            className="flex justify-between items-center 
            bg-gray-800 p-4">
            <h1 className="text-white">Farm Cars</h1>
            <div className="flex space-x-4 text-white
                child-hover:text-yellow-400">
                <Link href="/">Home</Link>
                <Link href="/cars">Cars</Link>
                <Link href="/private">Private</Link>
                {!session?.jwt && <Link href="/login">Login</Link>}
                {session?.jwt && <LogoutForm />}
            </div>
        </nav>
    )
}
export default Navbar