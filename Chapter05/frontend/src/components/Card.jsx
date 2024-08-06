const Card = ({ car: { name, year, model, price } }) => {


    return (
        <div className="bg-white rounded m-4 p-4 shadow-lg">
            <h1 className="text-2xl text-gray-600">{name}</h1>
            <p className="text-sm text-gray-600">{year} - {model}</p>
            <p className="text-lg text-right text-gray-600 align-text-bottom">${price}</p>
        </div>
    )
}
export default Card