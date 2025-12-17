import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MaterialIcon from './MaterialIcon';

interface LoginPageProps {
  setIsLoggedIn?: (value: boolean) => void;
}

export default function LoginPage({ setIsLoggedIn }: LoginPageProps) {
  const navigate = useNavigate();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegisterMode) {
      console.log('Registering:', { fullName, email, password, confirmPassword });
    } else {
      console.log('Logging in:', { email, password });
    }
    if (setIsLoggedIn) {
      setIsLoggedIn(true);
    }
    navigate('/dashboard');
  };

  const handleToggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setFullName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRememberMe(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <div className="h-screen flex flex-col bg-[#fffbef] overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between border-b-3 border-black px-4 sm:px-6 py-3 bg-white z-50 flex-shrink-0">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#203e18] border-2 border-black flex items-center justify-center text-white shadow-[3px_3px_0px_0px_#000000]">
            <MaterialIcon icon="volunteer_activism" className="text-lg sm:text-xl" />
          </div>
          <h2 className="text-black text-lg sm:text-xl font-black uppercase tracking-tight hidden sm:block">
            Qurban Tanpa Batas
          </h2>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="text-xs sm:text-sm font-bold text-[#203e18] hidden md:block">
            {isRegisterMode ? 'Sudah punya akun?' : 'Belum punya akun?'}
          </span>
          <button
            onClick={handleToggleMode}
            className="bg-[#cecd34] border-2 border-black px-4 sm:px-6 py-1.5 sm:py-2 text-black text-xs sm:text-sm font-bold uppercase shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-200"
          >
            {isRegisterMode ? 'Masuk' : 'Daftar'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 w-full overflow-hidden">
        {/* Left Side - Mission Card (Hidden on mobile) */}
        <div className="hidden lg:flex w-1/2 relative bg-[#203e18] border-r-3 border-black overflow-hidden items-center justify-center p-12">
          <div
            className="absolute inset-0 bg-center bg-cover opacity-60 mix-blend-luminosity grayscale"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1679959350683-d503e8becfee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWElMjByaWNlJTIwZmllbGRzJTIwY2F0dGxlfGVufDF8fHx8MTc2NTc5NzcyMXww&ixlib=rb-4.1.0&q=80&w=1080")'
            }}
          />
          <div className="absolute inset-0 bg-[#477022]/40 mix-blend-multiply"></div>

          <div className="relative z-10 w-full max-w-lg bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_#000000] rotate-1">
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#cecd34] border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_0px_#000000] z-20">
              <MaterialIcon icon="favorite" className="text-2xl text-black" />
            </div>
            <h1 className="text-4xl font-black tracking-tighter mb-4 leading-none uppercase text-black">
              Memberdayakan Petani,<br />
              <span className="text-[#477022]">Memfasilitasi Ibadah.</span>
            </h1>
            <p className="text-lg text-black font-medium mb-8 leading-relaxed border-l-4 border-[#cecd34] pl-4">
              Bergabunglah dengan ribuan Muslim Indonesia dalam menunaikan Qurban dengan aman dan transparan.
              Kontribusi Anda secara langsung mendukung peternak lokal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center bg-[#fffbef] p-4 border-2 border-black">
              <div className="flex -space-x-4">
                <img
                  alt="User avatar 1"
                  className="w-10 h-10 rounded-full border-2 border-black object-cover"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop"
                />
                <img
                  alt="User avatar 2"
                  className="w-10 h-10 rounded-full border-2 border-black object-cover"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
                />
                <img
                  alt="User avatar 3"
                  className="w-10 h-10 rounded-full border-2 border-black object-cover"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                />
              </div>
              <p className="text-sm font-bold uppercase tracking-wide">Dipercaya oleh 10.000+ pekurban</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-6 py-4 bg-[#fffbef] relative overflow-y-auto">
          <div className="w-full max-w-[480px] bg-white border-3 border-black p-4 sm:p-6 shadow-[5px_5px_0px_0px_#000000] my-2">
            <div className="flex flex-col gap-1 mb-4 border-b-2 border-black pb-2">
              <h1 className="text-black text-2xl sm:text-3xl lg:text-4xl font-black uppercase leading-tight tracking-tighter">
                {isRegisterMode ? 'Buat Akun' : 'Selamat Datang'}
              </h1>
              <p className="text-[#477022] text-sm font-bold">
                {isRegisterMode
                  ? 'Daftar untuk mengelola Qurban Anda.'
                  : 'Masuk untuk mengelola Qurban Anda.'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {/* Full Name - Register Only */}
              {isRegisterMode && (
                <label className="flex flex-col w-full group">
                  <p className="text-black text-sm font-bold uppercase mb-2">Nama Lengkap</p>
                  <div className="relative flex items-center shadow-[3px_3px_0px_0px_#000000] group-focus-within:shadow-[5px_5px_0px_0px_#000000] transition-all duration-200">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#fffbef] border-r-2 border-black flex items-center justify-center">
                      <MaterialIcon icon="person" className="text-black" />
                    </div>
                    <input
                      className="form-input flex w-full border-2 border-black bg-white h-12 pl-16 pr-4 text-base font-bold text-black placeholder:text-gray-400 focus:outline-none focus:bg-[#fffbef] transition-colors rounded-none"
                      placeholder="Ahmad Abdullah"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                  </div>
                </label>
              )}

              {/* Email */}
              <label className="flex flex-col w-full group">
                <p className="text-black text-sm font-bold uppercase mb-2">
                  {isRegisterMode ? 'Email' : 'Email atau Nama Pengguna'}
                </p>
                <div className="relative flex items-center shadow-[3px_3px_0px_0px_#000000] group-focus-within:shadow-[5px_5px_0px_0px_#000000] transition-all duration-200">
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#fffbef] border-r-2 border-black flex items-center justify-center">
                    <MaterialIcon icon="mail" className="text-black" />
                  </div>
                  <input
                    className="form-input flex w-full border-2 border-black bg-white h-12 pl-16 pr-4 text-base font-bold text-black placeholder:text-gray-400 focus:outline-none focus:bg-[#fffbef] transition-colors rounded-none"
                    placeholder="nama@contoh.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </label>

              {/* Password */}
              <label className="flex flex-col w-full group">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-black text-sm font-bold uppercase">Kata Sandi</p>
                  {!isRegisterMode && (
                    <a
                      className="text-xs font-bold text-[#477022] hover:bg-[#cecd34] px-1 border border-transparent hover:border-black transition-colors"
                      href="#"
                    >
                      Lupa Kata Sandi?
                    </a>
                  )}
                </div>
                <div className="relative flex w-full items-stretch shadow-[3px_3px_0px_0px_#000000] group-focus-within:shadow-[5px_5px_0px_0px_#000000] transition-all duration-200">
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#fffbef] border-r-2 border-black flex items-center justify-center z-10">
                    <MaterialIcon icon="lock" className="text-black" />
                  </div>
                  <input
                    className="form-input flex w-full flex-1 border-2 border-black bg-white h-12 pl-16 pr-12 text-base font-bold text-black placeholder:text-gray-400 focus:outline-none focus:bg-[#fffbef] border-r-0 rounded-none"
                    placeholder="Masukkan kata sandi"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="flex items-center justify-center px-4 border-2 border-black border-l-0 bg-white cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <MaterialIcon icon={showPassword ? 'visibility_off' : 'visibility'} className="text-black" />
                  </div>
                </div>
              </label>

              {/* Confirm Password - Register Only */}
              {isRegisterMode && (
                <label className="flex flex-col w-full group">
                  <p className="text-black text-sm font-bold uppercase mb-2">Konfirmasi Kata Sandi</p>
                  <div className="relative flex w-full items-stretch shadow-[3px_3px_0px_0px_#000000] group-focus-within:shadow-[5px_5px_0px_0px_#000000] transition-all duration-200">
                    <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#fffbef] border-r-2 border-black flex items-center justify-center z-10">
                      <MaterialIcon icon="lock" className="text-black" />
                    </div>
                    <input
                      className="form-input flex w-full flex-1 border-2 border-black bg-white h-12 pl-16 pr-12 text-base font-bold text-black placeholder:text-gray-400 focus:outline-none focus:bg-[#fffbef] border-r-0 rounded-none"
                      placeholder="Konfirmasi kata sandi"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <div
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="flex items-center justify-center px-4 border-2 border-black border-l-0 bg-white cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                      <MaterialIcon icon={showConfirmPassword ? 'visibility_off' : 'visibility'} className="text-black" />
                    </div>
                  </div>
                </label>
              )}

              {/* Remember Me / Terms */}
              <div className="flex items-center gap-3 py-1">
                <input
                  className="h-5 w-5 border-2 border-black text-[#477022] focus:ring-0 rounded-none cursor-pointer"
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="text-sm font-bold text-black cursor-pointer select-none" htmlFor="remember">
                  {isRegisterMode ? 'Saya setuju dengan Syarat dan Ketentuan' : 'Ingat saya selama 30 hari'}
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex w-full cursor-pointer items-center justify-center h-12 bg-[#477022] hover:bg-[#648828] text-white border-2 border-black text-base font-black uppercase tracking-wider shadow-[5px_5px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all active:scale-[0.99]"
              >
                <span>{isRegisterMode ? 'BUAT AKUN' : 'MASUK'}</span>
              </button>

              {/* Divider */}
              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t-2 border-black"></div>
                <span className="flex-shrink-0 mx-3 text-black text-xs font-black uppercase bg-[#cecd34] px-2 py-1 border-2 border-black">
                  Atau lanjutkan dengan
                </span>
                <div className="flex-grow border-t-2 border-black"></div>
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSocialLogin('Google')}
                  className="flex items-center justify-center gap-2 border-2 border-black bg-white h-11 px-4 hover:bg-gray-50 shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  type="button"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.2746H1.5166V17.368C3.55371 21.4131 7.7029 24.0008 12.2401 24.0008Z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.50253 14.2746C5.01298 12.8099 5.01298 11.1961 5.50253 9.73135V6.83795H1.51649C-0.18551 10.2225 -0.18551 14.2468 1.51649 17.6313L5.50253 14.2746Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.58825 1.5166 6.63336L5.50264 9.73996C6.45515 6.87018 9.10952 4.74966 12.2401 4.74966Z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="text-black text-sm font-bold">Google</span>
                </button>
                <button
                  onClick={() => handleSocialLogin('Facebook')}
                  className="flex items-center justify-center gap-2 border-2 border-black bg-white h-11 px-4 hover:bg-gray-50 shadow-[3px_3px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  type="button"
                >
                  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span className="text-black text-sm font-bold">Facebook</span>
                </button>
              </div>
            </form>

            <div className="text-center pt-4">
              <p className="text-xs font-bold text-gray-500">
                Dilindungi oleh reCAPTCHA dan tunduk pada{' '}
                <a className="underline hover:bg-[#cecd34] text-black" href="#">
                  Kebijakan Privasi
                </a>{' '}
                dan{' '}
                <a className="underline hover:bg-[#cecd34] text-black" href="#">
                  Ketentuan Layanan
                </a>{' '}
                Google.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}