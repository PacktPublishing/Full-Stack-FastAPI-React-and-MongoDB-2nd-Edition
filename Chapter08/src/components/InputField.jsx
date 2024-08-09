// eslint-disable-next-line react/prop-types
const InputField = ({ props }) => {
    // eslint-disable-next-line react/prop-types
    const { name, type, error } = props
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
                {...props}
            />
            {error && <p className="text-red-500 text-xs italic">{error.message}</p>}
        </div>
    )
}
export default InputField