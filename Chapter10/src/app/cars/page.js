import Link from "next/link"
const Cars = async () => {

    const data = await fetch(
        `${process.env.API_URL}/cars/`, {
        next: {
            revalidate: 10
        }
    }
    )
    const cars = await data.json()


    return (
        <>
            <h1>Cars</h1>
            <div>
                {cars.map((car) => (
                    <div key={car._id} className="m-4 bg-white p-2">
                        <Link href={`/cars/${car._id}`}>
                            <p>{car.brand} {car.make} from {car.year}</p>
                        </Link>
                    </div>
                ))}
            </div>

        </>
    )
}
export default Cars
