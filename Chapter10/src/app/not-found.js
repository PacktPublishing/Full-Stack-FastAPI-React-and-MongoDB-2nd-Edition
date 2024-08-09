import Link from "next/link"
const NotFoundPage = () => {
    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col justify-center items-center">

            <h1>Custom Not Found Page</h1>
            <p>take a look at <Link href="/cars" className="text-blue-500 font-bold">our cars</Link></p>

        </div>
    )
}
export default NotFoundPage