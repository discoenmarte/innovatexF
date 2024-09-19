'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company_name, setcompany_name] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Validación de username, email, password, etc.
    const usernamePattern = /^[a-z0-9_]+$/;
    if (!usernamePattern.test(username)) {
      newErrors.username = 'Username should only contain lowercase letters, numbers, and underscores, and no spaces';
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
    }

    if (phoneNumber && !/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number';
    }

    if (!firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    }
    if (!lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    }

    if (!company_name.trim()) {
      newErrors.company_name = 'company_name is required';
    } else if (company_name !== company_name.toLowerCase()) {
      newErrors.company_name = 'company_name name must be in lowercase';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setErrors({});

    if (email !== confirmEmail) {
      setError('Emails do not match');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }
    const formattedPhoneNumber = phoneNumber?.startsWith('+') ? phoneNumber.slice(1) : phoneNumber;
    try {
      const response = await axios.post('/api/register-proxy', {
        username,
        email,
        password,
        phone_number: formattedPhoneNumber,
        first_name: firstName,
        last_name: lastName,
        company_name,
      });

      if (response.status === 201) {
        router.push('/api/auth/signin?callbackUrl=%2Fadmin');
      } else {
        setError('Unexpected response status: ' + response.status);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 400) {
        const responseData = error.response.data;
        let message = '';
        if (responseData.message.username) {
          message += 'The user name already exists. ';
        }
        if (responseData.message.email) {
          message += 'The email address is already registered. ';
        }
        if (responseData.message.phone_number) {
          message += 'The phone number is already in use. ';
        }
        setPopupMessage(message.trim() || 'An error occurred while registering the user.');
        setShowPopup(true);
      } else if (error instanceof Error) {
        setPopupMessage(error.message);
        setShowPopup(true);
      } else {
        setPopupMessage('An unknown error has occurred');
        setShowPopup(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-red-600">Notice</h2>
            <p className="mb-4">{popupMessage || "An unexpected error has occurred."}</p>
            <Button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </Button>
          </div>
        </div>
      )}
      <div className="w-full max-w-md m-auto bg-white rounded-lg shadow-md p-8 relative">
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
              onChange={(e) => setUsername(e.target.value.toLowerCase())}
              required
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
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
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmEmail" className="block text-sm font-semibold">Confirm Email</label>
            <input
              type="email"
              id="confirmEmail"
              name="confirmEmail"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
            />
            {email !== confirmEmail && <p className="text-red-500 text-sm">Passwords do not match</p>}
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
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {password !== confirmPassword && <p className="text-red-500 text-sm">Passwords do not match</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-semibold">Phone Number</label>
            <PhoneInput
              value={phoneNumber}
              onChange={(value) => setPhoneNumber(value)}
              defaultCountry="US"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring"
              international={false}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
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
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
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
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="company_name" className="block text-sm font-semibold">Company Or University Name</label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring"
              value={company_name}
              onChange={(e) => setcompany_name(e.target.value.toLowerCase())}
              required
            />
            {errors.company_name && <p className="text-red-500 text-sm">{errors.company_name}</p>}
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
    </>
  );
}
