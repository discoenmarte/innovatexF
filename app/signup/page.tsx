import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

export default function Signup() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
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

    // Validación de username, email, password, etc. (mantén el código que ya tienes)

    // Validar número de teléfono
    if (phoneNumber && !/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setErrors({});

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setIsLoading(false);
      return;
    }

    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/register-proxy', {
        username,
        email,
        password,
        phone_number: phoneNumber, // Aquí el número ya incluirá el indicativo
        first_name: firstName,
        last_name: lastName,
      });

      if (response.status === 201) {
        router.push('/api/auth/signin?callbackUrl=%2Fadmin');
      } else {
        setError('Unexpected response status: ' + response.status);
      }
    } catch (error) {
      // Manejando los errores (mantén el código que ya tienes)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-red-600">Error</h2>
            <p className="mb-4">{popupMessage || "Ha ocurrido un error inesperado."}</p>
            <Button 
              onClick={() => setShowPopup(false)} 
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}
      <div className="w-full max-w-md m-auto bg-white rounded-lg shadow-md p-8 relative">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <form onSubmit={handleSignUp} className="mt-6">
          {/* Otros campos de registro */}
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-sm font-semibold">Phone Number</label>
            <PhoneInput
              country={'us'}
              value={phoneNumber}
              onChange={(phone) => setPhoneNumber(phone)}
              inputStyle={{ width: '100%', padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid #e2e8f0' }}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
          </div>
          {/* Botones de envío */}
        </form>
      </div>
    </>
  );
}
