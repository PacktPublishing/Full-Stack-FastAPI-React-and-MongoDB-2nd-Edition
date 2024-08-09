"use client"
import { login } from "@/actions"
import { useFormState } from "react-dom";

const LoginForm = () => {

    const [state, formAction] = useFormState(login, {})
    return (
        <div className="flex flex-col items-center justify-center max-w-sm mx-auto mt-10">

            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action={formAction}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" name="username" type="text" placeholder="Username" required />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="******************" required />

                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign In
                    </button>
                </div>
                <pre>{JSON.stringify(state, null, 2)}</pre>
            </form>
        </div >
    )
}
export default LoginForm