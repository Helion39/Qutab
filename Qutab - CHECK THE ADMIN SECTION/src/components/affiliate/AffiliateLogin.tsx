import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface AffiliateLoginProps {
  setIsAffiliateLoggedIn: (value: boolean) => void;
}

export default function AffiliateLogin({ setIsAffiliateLoggedIn }: AffiliateLoginProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would normally authenticate with your backend
      console.log('Affiliate login:', formData);
      
      // Navigate to affiliate dashboard (to be created)
      navigate('/affiliate/dashboard');
      setIsAffiliateLoggedIn(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#fffbef] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <h1 className="text-4xl font-black text-black uppercase tracking-tight">
              Qutab
            </h1>
          </Link>
          <h2 className="text-3xl md:text-4xl font-black text-black uppercase mb-2">
            Masuk Affiliator
          </h2>
          <p className="text-black font-bold">
            Belum punya akun?{' '}
            <Link to="/affiliate/register" className="text-[#ffafcc] underline hover:no-underline">
              Daftar di sini
            </Link>
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border-4 border-black p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-black text-black uppercase mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-[#ffafcc] ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs font-bold text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-black text-black uppercase mb-2">
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-4 border-black font-bold focus:outline-none focus:ring-4 focus:ring-[#ffafcc] ${
                  errors.password ? 'border-red-500' : ''
                }`}
              />
              {errors.password && (
                <p className="mt-1 text-xs font-bold text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <a href="#" className="text-sm font-bold text-[#ffafcc] underline hover:no-underline">
                Lupa password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-8 py-4 bg-[#ffafcc] text-black font-black uppercase tracking-wider border-4 border-black shadow-[8px_8px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            >
              Masuk
            </button>
          </form>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-[#bddcee] border-4 border-black p-4">
          <p className="text-black font-bold text-sm text-center">
            Login ini khusus untuk affiliator. Jika Anda customer yang ingin membeli qurban,{' '}
            <Link to="/login" className="text-black underline hover:no-underline font-black">
              masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}