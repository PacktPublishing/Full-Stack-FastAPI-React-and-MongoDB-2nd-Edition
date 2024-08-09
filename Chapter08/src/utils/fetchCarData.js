export default async function fetchCarData(id) {

    const res = await fetch(`${import.meta.env.VITE_API_URL}/cars/${id}`)

    const response = await res.json()

    if (!res.ok) {
        throw new Error(response.message)
    }

    return response
}