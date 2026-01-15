import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export default function AffiliateRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    whatsapp: '',
    city: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    facebook: '',
    primaryPlatform: '',
    reason: '',
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const platformOptions = [
    { value: '', label: 'Pilih platform' },
    { value: 'instagram', label: 'Instagram' },
    { value: 'tiktok', label: 'TikTok' },
    { value: 'youtube', label: 'YouTube' },
    { value: 'whatsapp', label: 'WhatsApp Group' },
    { value: 'facebook', label: 'Facebook' },
    { value: 'lainnya', label: 'Lainnya' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

  // Development only - autofill function
  const handleAutofill = () => {
    setFormData({
      firstName: 'Ahmad',
      lastName: 'Wijaya',
      email: 'ahmad.wijaya@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      whatsapp: '081234567890',
      city: 'Jakarta',
      instagram: 'https://instagram.com/ahmadwijaya',
      tiktok: 'https://tiktok.com/@ahmadwijaya',
      youtube: 'https://youtube.com/@ahmadwijaya',
      facebook: 'https://facebook.com/ahmadwijaya',
      primaryPlatform: 'instagram',
      reason: 'Saya ingin membantu menyebarkan kebaikan qurban dan mendapatkan penghasilan tambahan sebagai affiliator.',
      agreeToTerms: true,
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = 'Nama depan wajib diisi';
    if (!formData.lastName.trim()) newErrors.lastName = 'Nama belakang wajib diisi';
    if (!formData.email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi password wajib diisi';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Password tidak cocok';
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'Nomor WhatsApp wajib diisi';
    } else if (!/^08\d{8,12}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Format: 08xxxxxxxxxx';
    }
    if (!formData.city.trim()) newErrors.city = 'Kota/domisili wajib diisi';
    if (!formData.primaryPlatform) newErrors.primaryPlatform = 'Platform promosi utama wajib dipilih';
    if (!formData.reason.trim()) newErrors.reason = 'Alasan wajib diisi';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'Anda harus menyetujui syarat dan ketentuan';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would normally send the data to your backend
      console.log('Form submitted:', formData);
      
      // Navigate to OTP verification page
      navigate('/affiliate/otp');
    }
  };

  const handleGoogleAuth = () => {
    // Here you would normally integrate with Google OAuth
    console.log('Google authentication triggered');
    alert('Google authentication will be integrated here');
    // After Google auth success, navigate to pending or complete the registration
    // navigate('/affiliate/pending');
  };

  return (
    <div className="min-h-screen bg-[#fffbef] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <h1 className="text-4xl font-black text-black uppercase tracking-tight">
              Qutab
            </h1>
          </Link>
          <h2 className="text-3xl md:text-4xl font-black text-black uppercase mb-2">
            Daftar Sebagai Affiliator
          </h2>
          <p className="text-black font-bold">
            Sudah punya akun?{' '}
            <Link to="/affiliate/login" className="text-[#ffafcc] underline hover:no-underline">
              Masuk di sini
            </Link>
          </p>
          {/* Development Only - Autofill Button */}
          <button
            type="button"
            onClick={handleAutofill}
            className="mt-4 px-4 py-2 bg-yellow-400 text-black font-black text-xs uppercase border-4 border-black hover:bg-yellow-300 transition-colors"
          >
            🔧 DEV: Autofill Form
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white border-4 border-black p-6 md:p-10">
          {/* Google Auth Button */}
          <div className="mb-8">
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full h-14 bg-white text-black font-black uppercase tracking-wider text-lg border-4 border-black shadow-[8px_8px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-3"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.8055 10.2292C19.8055 9.55135 19.7508 8.86865 19.6359 8.19843H10.2V12.0492H15.6014C15.3773 13.2911 14.6571 14.3898 13.6025 15.0878V17.5866H16.825C18.7177 15.8449 19.8055 13.2728 19.8055 10.2292Z" fill="#4285F4"/>
                <path d="M10.2001 20.0006C12.9515 20.0006 15.2693 19.1151 16.8252 17.5865L13.6027 15.0877C12.7062 15.6979 11.5493 16.0433 10.2001 16.0433C7.54275 16.0433 5.28174 14.2834 4.47668 11.9169H1.15234V14.4927C2.73289 17.6349 6.31926 20.0006 10.2001 20.0006Z" fill="#34A853"/>
                <path d="M4.47656 11.917C4.05516 10.6751 4.05516 9.32629 4.47656 8.08435V5.50854H1.15222C-0.384074 8.57022 -0.384074 12.4312 1.15222 15.4929L4.47656 11.917Z" fill="#FBBC04"/>
                <path d="M10.2001 3.95738C11.6217 3.93555 13.0004 4.47247 14.0359 5.45781L16.8907 2.60298C15.1814 0.990477 12.9288 0.0954484 10.2001 0.11728C6.31926 0.11728 2.73289 2.48296 1.15234 5.50845L4.47668 8.08426C5.28174 5.71777 7.54275 3.95738 10.2001 3.95738Z" fill="#EA4335"/>
              </svg>
              Daftar dengan Google
            </button>
            
            {/* OR Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-1 bg-black"></div>
              <span className="font-black text-lg uppercase px-2">Atau</span>
              <div className="flex-1 h-1 bg-black"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Section 01: Personal Info */}
            <div>
              <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                <span className="bg-black text-white w-8 h-8 flex items-center justify-center text-sm border-2 border-black">01</span>
                Informasi Pribadi
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="font-black text-sm uppercase tracking-wide">
                    Nama Depan *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Masukkan nama depan"
                    className={`h-12 w-full px-4 border-4 border-black font-bold focus:outline-none placeholder:text-gray-500 ${
                      errors.firstName ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-xs font-bold text-red-500">{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="font-black text-sm uppercase tracking-wide">
                    Nama Belakang *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Masukkan nama belakang"
                    className={`h-12 w-full px-4 border-4 border-black font-bold focus:outline-none placeholder:text-gray-500 ${
                      errors.lastName ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-xs font-bold text-red-500">{errors.lastName}</p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-black text-sm uppercase tracking-wide">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contoh@email.com"
                    className={`h-12 w-full px-4 border-4 border-black font-bold focus:outline-none placeholder:text-gray-500 ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs font-bold text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* WhatsApp */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="whatsapp" className="font-black text-sm uppercase tracking-wide">
                    Nomor WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="08xxxxxxxxxx"
                    className={`h-12 w-full px-4 border-4 border-black font-bold focus:outline-none placeholder:text-gray-500 ${
                      errors.whatsapp ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.whatsapp && (
                    <p className="text-xs font-bold text-red-500">{errors.whatsapp}</p>
                  )}
                </div>

                {/* City */}
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="city" className="font-black text-sm uppercase tracking-wide">
                    Kota/Domisili *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Masukkan kota tempat tinggal Anda"
                    className={`h-12 w-full px-4 border-4 border-black font-bold focus:outline-none placeholder:text-gray-500 ${
                      errors.city ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.city && (
                    <p className="text-xs font-bold text-red-500">{errors.city}</p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="font-black text-sm uppercase tracking-wide">
                    Password *
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimal 8 karakter"
                    className={`h-12 w-full px-4 border-4 border-black font-bold focus:outline-none placeholder:text-gray-500 ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.password && (
                    <p className="text-xs font-bold text-red-500">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="confirmPassword" className="font-black text-sm uppercase tracking-wide">
                    Konfirmasi Password *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Ulangi password"
                    className={`h-12 w-full px-4 border-4 border-black font-bold focus:outline-none placeholder:text-gray-500 ${
                      errors.confirmPassword ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.confirmPassword && (
                    <p className="text-xs font-bold text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-2 border-black border-dashed" />

            {/* Section 02: Social Media */}
            <div>
              <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                <span className="bg-black text-white w-8 h-8 flex items-center justify-center text-sm border-2 border-black">02</span>
                Link Media Sosial (Opsional)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Instagram */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="instagram" className="font-black text-sm uppercase tracking-wide">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    id="instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="https://instagram.com/username"
                    className="h-12 w-full px-4 border-4 border-black font-bold focus:outline-none placeholder:text-gray-500"
                  />
                </div>

                {/* TikTok */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="tiktok" className="font-black text-sm uppercase tracking-wide">
                    TikTok URL
                  </label>
                  <input
                    type="url"
                    id="tiktok"
                    name="tiktok"
                    value={formData.tiktok}
                    onChange={handleChange}
                    placeholder="https://tiktok.com/@username"
                    className="h-12 w-full px-4 border-4 border-black font-bold focus:outline-none placeholder:text-gray-500"
                  />
                </div>

                {/* YouTube */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="youtube" className="font-black text-sm uppercase tracking-wide">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    id="youtube"
                    name="youtube"
                    value={formData.youtube}
                    onChange={handleChange}
                    placeholder="https://youtube.com/@channel"
                    className="h-12 w-full px-4 border-4 border-black font-bold focus:outline-none placeholder:text-gray-500"
                  />
                </div>

                {/* Facebook */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="facebook" className="font-black text-sm uppercase tracking-wide">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    id="facebook"
                    name="facebook"
                    value={formData.facebook}
                    onChange={handleChange}
                    placeholder="https://facebook.com/username"
                    className="h-12 w-full px-4 border-4 border-black font-bold focus:outline-none placeholder:text-gray-500"
                  />
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="border-2 border-black border-dashed" />

            {/* Section 03: Strategy */}
            <div>
              <h3 className="text-2xl font-black mb-6 flex items-center gap-2">
                <span className="bg-black text-white w-8 h-8 flex items-center justify-center text-sm border-2 border-black">03</span>
                Strategi Promosi
              </h3>
              <div className="flex flex-col gap-6">
                {/* Primary Platform */}
                <div className="flex flex-col gap-2">
                  <label className="font-black text-sm uppercase tracking-wide">
                    Platform Promosi Utama *
                  </label>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      className={`h-12 w-full px-4 border-4 border-black font-bold focus:outline-none bg-white text-left flex items-center justify-between ${
                        errors.primaryPlatform ? 'border-red-500' : ''
                      }`}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <span className={formData.primaryPlatform ? 'text-black' : 'text-gray-500'}>
                        {formData.primaryPlatform 
                          ? platformOptions.find(option => option.value === formData.primaryPlatform)?.label 
                          : 'Pilih platform'}
                      </span>
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                        strokeWidth={3}
                      />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white border-4 border-black max-h-60 overflow-y-auto">
                        {platformOptions.map(option => (
                          <button
                            key={option.value}
                            type="button"
                            className={`w-full px-4 py-3 text-left font-bold hover:bg-[#ffafcc] transition-colors ${
                              formData.primaryPlatform === option.value ? 'bg-[#bddcee]' : ''
                            } ${option.value === '' ? 'text-gray-500' : 'text-black'}`}
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                primaryPlatform: option.value
                              }));
                              setIsDropdownOpen(false);
                              if (errors.primaryPlatform) {
                                setErrors(prev => {
                                  const newErrors = { ...prev };
                                  delete newErrors.primaryPlatform;
                                  return newErrors;
                                });
                              }
                            }}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.primaryPlatform && (
                    <p className="text-xs font-bold text-red-500">{errors.primaryPlatform}</p>
                  )}
                </div>

                {/* Reason */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="reason" className="font-black text-sm uppercase tracking-wide">
                    Alasan Ingin Menjadi Affiliator *
                  </label>
                  <textarea
                    id="reason"
                    name="reason"
                    rows={4}
                    value={formData.reason}
                    onChange={handleChange}
                    placeholder="Ceritakan motivasi dan rencana Anda..."
                    className={`w-full p-4 border-4 border-black font-bold focus:outline-none resize-y min-h-[120px] placeholder:text-gray-500 ${
                      errors.reason ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.reason && (
                    <p className="text-xs font-bold text-red-500">{errors.reason}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Agreement */}
            <div className="pt-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mt-1 w-6 h-6 border-4 border-black focus:ring-0 accent-[#ffafcc] cursor-pointer"
                />
                <span className="text-base font-bold select-none leading-snug">
                  Saya menyetujui <a href="#" className="underline decoration-2 decoration-[#ffafcc] hover:text-[#ffafcc]">syarat dan ketentuan</a> program affiliator Qutab *
                </span>
              </label>
              {errors.agreeToTerms && (
                <p className="mt-1 text-xs font-bold text-red-500 ml-9">{errors.agreeToTerms}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-16 bg-[#ffafcc] text-black font-black uppercase tracking-wider text-xl border-4 border-black shadow-[8px_8px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
            >
              Daftar Sekarang
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}