import { logout } from "@/actions"

const LogoutForm = () => {
    return (
        <form action={logout}>
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit">Logout</button>
        </form>
    )
}
export default LogoutForm