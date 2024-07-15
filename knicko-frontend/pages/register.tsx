import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            email,
            password,
            password_confirmation: passwordConfirmation
          }
        })
      });

      const data = await response.json();
      if (data.created_at) {
        router.push('/login');
      } else {
        setError(data.errors.join(', '));
      }
    } catch (error) {
      console.error('Error registering:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
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
          <div>
            <label htmlFor="passwordConfirmation" className="block text-sm font-medium">
              Password Confirmation
            </label>
            <input
              id="passwordConfirmation"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
              className="w-full p-2 border rounded mt-1"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{' '}
          <button
            className="text-blue-500 hover:underline"
            onClick={() => router.push('/login')}
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;