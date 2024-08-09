import { useForm } from "react-hook-form"
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";
import InputField from "./InputField";



const schema = z.object({
    brand: z.string().min(2, 'Brand must contain at least two letters').max(20, 'Brand cannot exceed 20 characters'),
    make: z.string().min(1, 'Car model must be at least 1 character long').max(20, 'Model cannot exceed 20 characters'),
    year: z.coerce.number().gte(1950).lte(2025),
    price: z.coerce.number().gte(100).lte(1000000),
    km: z.coerce.number().gte(0).lte(500000),
    cm3: z.coerce.number().gt(0).lte(5000),
    picture: z.any()
        .refine(file => file[0] && file[0].type.startsWith('image/'), { message: 'File must be an image' })
        .refine(file => file[0] && file[0].size <= 1024 * 1024, { message: 'File size must be less than 1MB' }),

});



// eslint-disable-next-line react/prop-types
const CarForm = () => {

    const navigate = useNavigate();
    const { jwt, setMessage } = useAuth();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema),
    });

    let formArray = [

        {
            name: "brand",
            type: "text",
            error: errors.brand
        },
        {
            name: "make",
            type: "text",
            error: errors.make
        },
        {
            name: "year",
            type: "number",
            error: errors.year
        },
        {
            name: "price",
            type: "number",
            error: errors.price
        },
        {
            name: "km",
            type: "number",
            error: errors.km
        },
        {
            name: "cm3",
            type: "number",
            error: errors.cm3
        },
        {
            name: "picture",
            type: "file",
            error: errors.picture
        }

    ]

    const onSubmit = async (data) => {

        const formData = new FormData();

        formArray.forEach((field) => {
            if (field == 'picture') {
                formData.append(field, data[field][0]);
            } else {

                formData.append(field.name, data[field.name]);
            }
        });


        const result = await fetch(`${import.meta.env.VITE_API_URL}/cars/`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        });

        const json = await result.json();

        if (result.ok) {
            navigate('/cars');
        } else if (json.detail) {
            setMessage(JSON.stringify(json))
            navigate('/')
        }


    }



    return (
        <div className="flex items-center justify-center">
            <div className="w-full max-w-xs">
                <form
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 "
                    encType="multipart/form-data"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <h2 className="text-center text-2xl font-bold mb-6">Insert new car</h2>

                    {formArray.map((item, index) => (

                        <InputField
                            key={index}
                            props={{
                                name: item.name,
                                type: item.type,
                                error: item.error,
                                ...register(item.name)
                            }} />
                    ))}



                    <div className="flex items-center justify-between">
                        <button
                            className="bg-gray-900 hover:bg-gray-700 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit" disabled={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save new car"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CarForm