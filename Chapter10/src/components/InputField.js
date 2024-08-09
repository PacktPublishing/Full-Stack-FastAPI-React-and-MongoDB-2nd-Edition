
const InputField = ({ props }) => {
    // eslint-disable-next-line react/prop-types
    const { name, type } = props
    return (

        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                {name}
            </label>
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id={name}
                name={name}
                type={type}
                placeholder={name}
                required
                autoComplete="off"

            />
        </div>
    )
}
export default InputField