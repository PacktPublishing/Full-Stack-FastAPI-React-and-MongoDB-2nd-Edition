import { useAuth } from "./AuthContext"
const Message = () => {
    const { message } = useAuth()
    return (
        <div className="p-2 my-2">
            <p>{message}</p>
        </div>
    )
}
export default Message