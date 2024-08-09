"use client"
import { createCar } from "@/actions"
import { useFormState } from "react-dom";

import InputField from "./InputField"

const CarForm = () => {

    let formArray = [

        {
            name: "brand",
            type: "text"
        },
        {
            name: "make",
            type: "text"
        },
        {
            name: "year",
            type: "number"
        },
        {
            name: "price",
            type: "number"
        },
        {
            name: "km",
            type: "number"
        },
        {
            name: "cm3",
            type: "number"
        },
        {
            name: "picture",
            type: "file"
        }

    ]

    const [state, formAction] = useFormState(createCar, {})
    return (
        <div className="flex items-center justify-center">
            <pre>{JSON.stringify(state, null, 2)}</pre>
            <div className="w-full max-w-xs">
                <form
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
                    action={formAction}
                >
                    <h2 className="text-center text-2xl font-bold mb-6">Insert new car</h2>
                    {formArray.map((item, index) => (

                        <InputField
                            key={index}
                            props={{
                                name: item.name,
                                type: item.type
                            }} />
                    ))}



                    <div className="flex items-center justify-between">
                        <button
                            className="bg-gray-900 hover:bg-gray-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >Save new car
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CarForm