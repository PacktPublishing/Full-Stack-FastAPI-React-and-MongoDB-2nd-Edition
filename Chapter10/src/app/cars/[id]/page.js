import {
    redirect
} from "next/navigation"
import Image from "next/image"

export async function generateStaticParams() {
    const cars = await fetch(
        `${process.env.API_URL}/cars/`).then((res) => res.json())
    return cars.map((car) => ({ id: car._id, }))
}

export async function generateMetadata({ params }, parent) {
    // read route params
    const carId = params.id

    // fetch data
    const car = await fetch(`${process.env.API_URL}/cars/${carId}`).then((res) => res.json())

    const title = `FARM Cars App - ${car.brand} ${car.make} (${car.year})`

    return {
        title

    }
}

const CarDetails = async ({
    params
}) => {
    const carId = params.id

    const res = await fetch(
        `${process.env.API_URL}/cars/${carId}`, {
        next: {
            revalidate: 10
        }
    }
    )
    if (!res.ok) {
        redirect("/error")
    }
    const data = await res.json()
    return (
        <div className="p-4 flex flex-col justify-center items-center min-h-full bg-white">
            <h1>{data.brand} {data.make} ({data.year})</h1>

            <p>{data.description}</p>

            <div className="p-2 shadow-md bg-white">
                <Image src={data.picture_url}
                    alt={`${data.brand} ${data.make}`}
                    width={600} height={400}
                    quality={40}
                    className="object-cover w-full" />
            </div>
            <div className="grid grid-cols-2 gap-3 my-3">

                {data.pros && <div className="bg-green-200 
                      p-5 flex flex-col justify-center 
                      items-center">
                    <h2>Pros</h2>
                    <ol className="list-decimal">
                        {data.pros.map((pro, index) => (
                            <li key={index}>{pro}</li>
                        ))}
                    </ol>
                </div>}

                {data.cons && <div className="bg-red-200 p-5 flex flex-col justify-center items-center">
                    <h2>Cons</h2>
                    <ol className="list-decimal">
                        {data.cons.map((con, index) => (
                            <li key={index}>{con}</li>
                        ))}
                    </ol>
                </div>}
            </div>
        </div >
    )
}
export default CarDetails
