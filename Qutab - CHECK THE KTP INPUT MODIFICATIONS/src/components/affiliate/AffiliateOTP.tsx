import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function AffiliateOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  // Auto-focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    
    // Check if pasted data is exactly 6 digits
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('');
      setOtp(newOtp);
      setError('');
      // Focus last input
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setError('Masukkan 6 digit kode OTP');
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      // For demo, accept "123456" as valid OTP
      if (otpCode === '123456') {
        navigate('/affiliate/pending');
      } else {
        setError('Kode OTP salah. Silakan coba lagi.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      }
      setIsVerifying(false);
    }, 1000);
  };

  const handleResend = () => {
    if (!canResend) return;

    // Simulate resending OTP
    setOtp(['', '', '', '', '', '']);
    setError('');
    setCanResend(false);
    setCountdown(60);
    inputRefs.current[0]?.focus();
    
    // Show success message
    alert('Kode OTP baru telah dikirim ke email Anda!');
  };

  return (
    <div className="min-h-screen bg-[#fffbef] py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-black uppercase mb-2 leading-tight">
            Verifikasi
          </h2>
          <div className="inline-block bg-[#ffafcc] border-3 border-black px-6 py-2 shadow-[4px_4px_0px_0px_#000000] transform -rotate-2">
            <h3 className="text-3xl md:text-4xl font-black text-black uppercase">
              Kode OTP
            </h3>
          </div>
          <p className="text-black font-bold mt-6">
            Masukkan 6 digit kode OTP yang telah dikirim ke email Anda
          </p>
          <p className="text-sm font-bold text-gray-600 mt-2">
            ahmad.wijaya@example.com
          </p>
        </div>

        {/* OTP Card */}
        <div className="bg-white border-4 border-black p-8 md:p-10 shadow-[8px_8px_0px_0px_#000000]">
          {/* OTP Input Boxes */}
          <div className="flex gap-3 justify-center mb-6" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-14 h-16 md:w-16 md:h-20 text-center text-2xl md:text-3xl font-black border-4 border-black focus:outline-none focus:bg-[#fffbef] transition-colors ${
                  error ? 'border-red-500' : ''
                }`}
              />
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-100 border-4 border-red-500">
              <p className="text-sm font-bold text-red-700 text-center">{error}</p>
            </div>
          )}

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={isVerifying}
            className={`w-full h-16 bg-[#ffafcc] text-black font-black uppercase tracking-wider text-xl border-4 border-black shadow-[8px_8px_0px_0px_#000000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_#000000] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all ${
              isVerifying ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isVerifying ? 'Memverifikasi...' : 'Verifikasi OTP'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-0.5 bg-black"></div>
          </div>

          {/* Resend Section */}
          <div className="text-center">
            <p className="text-sm font-bold text-black mb-3">
              Tidak menerima kode OTP?
            </p>
            {canResend ? (
              <button
                onClick={handleResend}
                className="font-black text-[#ffafcc] underline decoration-2 decoration-[#ffafcc] hover:no-underline transition-all uppercase text-sm"
              >
                Kirim Ulang Kode
              </button>
            ) : (
              <p className="text-sm font-bold text-gray-500">
                Kirim ulang dalam{' '}
                <span className="text-black font-black">
                  {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                </span>
              </p>
            )}
          </div>

          {/* Back to Registration */}
          <div className="mt-6 pt-6 border-t-2 border-black border-dashed text-center">
            <Link
              to="/affiliate/register"
              className="text-sm font-bold text-black hover:text-[#ffafcc] transition-colors"
            >
              ← Kembali ke Registrasi
            </Link>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs font-bold text-gray-600">
            Kode OTP akan kadaluarsa dalam 10 menit
          </p>
        </div>
      </div>
    </div>
  );
}