import { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';

import Register from './Register';
import Login from './Login';
import Users from './Users';
import Message from './Message';

const App = () => {

  const [showLogin, setShowLogin] = useState(true)

  return (
    <div className=' bg-blue-200 flex flex-col justify-center items-center min-h-screen'>
      <AuthProvider>
        <h1 className='text-2xl text-blue-800'>Simple Auth App</h1>

        <Message />

        <div>
          {showLogin ? <Login /> : <Register />}
          <button onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'Register' : 'Login'}</button>
          <hr />
        </div>
        <Users />
      </AuthProvider>
    </div>
  );
};

export default App;