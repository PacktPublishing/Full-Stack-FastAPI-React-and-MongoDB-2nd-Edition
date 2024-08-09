
import { Outlet, NavLink } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const RootLayout = () => {
    const { user, message, logout } = useAuth()


    return (
        <div className=" bg-blue-200 min-h-screen p-2">
            <h2>RootLayout</h2>


            <p className="text-red-500 p-2 border">{message}</p>



            <header className="p-3 w-full">
                <nav className="flex flex-row justify-between mx-auto">
                    <div className="flex flex-row space-x-3">
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/cars">Cars</NavLink>
                        {user ? <>
                            <NavLink to="/new-car">New Car</NavLink>
                            <button onClick={logout}>Logout</button>
                        </> : <> <NavLink to="/login">Login</NavLink>
                        </>}
                    </div>
                </nav>
            </header>
            <main className="p-8 flex flex-col flex-1 bg-white ">
                <Outlet />
            </main>
        </div>
    )
}
export default RootLayout