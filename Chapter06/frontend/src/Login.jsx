import { useState } from 'react';
import { useAuth } from './AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password);
        setUsername('');
        setPassword('');
    };

    return (
        <div className="m-5 p-5  border-2">
            <form onSubmit={handleSubmit} className='grid grid-rows-3 gap-2'>
                <input
                    type="text"
                    placeholder="Username"
                    className='p-2'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className='p-2'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className='bg-blue-500 text-white rounded'>Login</button>
            </form>
        </div>
    );
};
export default Login