'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '../../components/ui/button';

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/register-proxy', {
        username,
        email,
        password,
        phone_number: phoneNumber,
        first_name: firstName,
        last_name: lastName,
      });

      if (response.status === 201) {
        // Redirect to the custom sign-in URL
        router.push('/api/auth/signin?callbackUrl=%2Fadmin');
      } else {
        setError('Unexpected response status: ' + response.status);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || 'Failed to register user');
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md m-auto bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-bold text-center">Sign Up</h1>
      <form onSubmit={handleSignUp} className="mt-6">
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-semibold">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-semibold">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-semibold">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-sm font-semibold">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-sm font-semibold">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full text-center mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </Button>
        <Button onClick={() => router.push('/api/auth/signin?callbackUrl=%2Fadmin')} className="w-full text-center mt-4">
          Sign In
        </Button>
      </form>
    </div>
  );
}
