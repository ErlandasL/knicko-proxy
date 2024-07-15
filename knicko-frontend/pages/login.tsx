import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const user = {
    email: email,
    password: password
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3001/login',
        { user },
        { withCredentials: true }
      );

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        router.push('/');
      } else {
        setError('Authentication failed. Please check your credentials.');
      }
    } catch (error) {
      console.log(error);
      setError('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => router.push('/register')}
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;