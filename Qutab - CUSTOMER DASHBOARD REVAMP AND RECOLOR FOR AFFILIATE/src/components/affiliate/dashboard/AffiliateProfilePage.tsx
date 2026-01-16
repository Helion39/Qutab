import { useState } from 'react';
import MaterialIcon from '../../MaterialIcon';

export default function AffiliateProfilePage() {
  const [firstName, setFirstName] = useState('Siti');
  const [lastName, setLastName] = useState('Aminah');
  const [email] = useState('siti.aminah@email.com');
  const [whatsapp, setWhatsapp] = useState('+62 812-3456-7890');
  const [instagram, setInstagram] = useState('@sitiaminah');
  const [tiktok, setTiktok] = useState('@sitiaminah');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile saved');
    alert('Profil berhasil diperbarui!');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Kata sandi baru tidak cocok!');
      return;
    }
    console.log('Password changed');
    alert('Kata sandi berhasil diubah!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordChange(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const joinDate = '15 Desember 2025';
  const accountStatus = 'Terverifikasi';

  return (
    <div className="p-8 pb-20 bg-white dark:bg-[#2d1b24]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#4a2c3a] dark:text-white mb-2">Profil Member</h1>
        <p className="text-[#7d5a6a] dark:text-gray-400">Kelola informasi profil dan akun Anda</p>
      </div>

      {/* Profile Header Card */}
      <div className="bg-white dark:bg-[#3d2531] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#bdbef5] to-[#9b9ef5] p-6">
          <div className="flex items-center gap-4">
            <div className="size-20 rounded-full border-4 border-white shadow-lg bg-gray-200 overflow-hidden">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <MaterialIcon icon="person" className="text-4xl text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{firstName} {lastName}</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  accountStatus === 'Terverifikasi'
                    ? 'bg-white/20 text-white backdrop-blur-sm'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  <MaterialIcon icon="verified" className="text-[14px]" />
                  {accountStatus}
                </span>
                <span className="text-sm text-white/90">
                  Bergabung {joinDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="p-6 space-y-4">
          {/* Profile Photo Upload */}
          <div>
            <label className="block text-sm font-semibold text-[#4a2c3a] dark:text-white mb-3">
              Foto Profil
            </label>
            <div className="flex items-center gap-4">
              <div className="size-20 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MaterialIcon icon="person" className="text-4xl text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <label className="px-4 py-2 bg-[#bdbef5] hover:bg-[#9b9ef5] text-white rounded-lg font-semibold text-sm transition-colors cursor-pointer inline-flex items-center gap-2">
                  <MaterialIcon icon="upload" className="text-[18px]" />
                  Upload Foto
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-[#7d5a6a] dark:text-gray-400 mt-2">
                  JPG, PNG maksimal 2MB
                </p>
              </div>
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#4a2c3a] dark:text-white mb-2">
                Nama Depan
              </label>
              <div className="relative">
                <MaterialIcon icon="person" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bdbef5]" />
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full pl-10 pr-4 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b24] text-[#4a2c3a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bdbef5]/50"
                  placeholder="Nama Depan"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#4a2c3a] dark:text-white mb-2">
                Nama Belakang
              </label>
              <div className="relative">
                <MaterialIcon icon="person" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bdbef5]" />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full pl-10 pr-4 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b24] text-[#4a2c3a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bdbef5]/50"
                  placeholder="Nama Belakang"
                />
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-[#4a2c3a] dark:text-white mb-2">
              Email
            </label>
            <div className="relative">
              <MaterialIcon icon="mail" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bdbef5]" />
              <input
                type="email"
                value={email}
                disabled
                className="w-full pl-10 pr-4 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-[#2d1b24] text-[#7d5a6a] dark:text-gray-400 cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-[#7d5a6a] dark:text-gray-400 mt-2 flex items-center gap-1">
              <MaterialIcon icon="info" className="text-[14px]" />
              Email tidak dapat diubah
            </p>
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block text-sm font-semibold text-[#4a2c3a] dark:text-white mb-2">
              WhatsApp
            </label>
            <div className="relative">
              <MaterialIcon icon="phone" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bdbef5]" />
              <input
                type="tel"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full pl-10 pr-4 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b24] text-[#4a2c3a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bdbef5]/50"
                placeholder="+62 812-3456-7890"
              />
            </div>
          </div>

          {/* Social Media */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#4a2c3a] dark:text-white mb-2">
                Instagram
              </label>
              <div className="relative">
                <MaterialIcon icon="photo_camera" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bdbef5]" />
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full pl-10 pr-4 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b24] text-[#4a2c3a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bdbef5]/50"
                  placeholder="@username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#4a2c3a] dark:text-white mb-2">
                TikTok
              </label>
              <div className="relative">
                <MaterialIcon icon="music_note" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bdbef5]" />
                <input
                  type="text"
                  value={tiktok}
                  onChange={(e) => setTiktok(e.target.value)}
                  className="w-full pl-10 pr-4 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b24] text-[#4a2c3a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bdbef5]/50"
                  placeholder="@username"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-[#bdbef5] hover:bg-[#9b9ef5] text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <MaterialIcon icon="save" />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>

      {/* Password Change Section */}
      <div className="bg-white dark:bg-[#3d2531] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#ffafcc] to-[#ff8fb5] p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <MaterialIcon icon="lock" className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Keamanan Akun</h2>
              <p className="text-white/80 text-sm">Ubah kata sandi Anda</p>
            </div>
          </div>
        </div>

        {!showPasswordChange ? (
          <div className="p-6">
            <button
              onClick={() => setShowPasswordChange(true)}
              className="w-full px-6 py-3 bg-[#ffafcc] hover:bg-[#ff8fb5] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <MaterialIcon icon="vpn_key" />
              Ubah Kata Sandi
            </button>
          </div>
        ) : (
          <form onSubmit={handleChangePassword} className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#4a2c3a] dark:text-white mb-2">
                Kata Sandi Saat Ini
              </label>
              <div className="relative">
                <MaterialIcon icon="lock" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bdbef5]" />
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full pl-10 pr-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b24] text-[#4a2c3a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffafcc]/50"
                  placeholder="Masukkan kata sandi saat ini"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7d5a6a] dark:text-gray-400 hover:text-[#ffafcc]"
                >
                  <MaterialIcon icon={showCurrentPassword ? 'visibility_off' : 'visibility'} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#4a2c3a] dark:text-white mb-2">
                Kata Sandi Baru
              </label>
              <div className="relative">
                <MaterialIcon icon="lock" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bdbef5]" />
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full pl-10 pr-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b24] text-[#4a2c3a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffafcc]/50"
                  placeholder="Masukkan kata sandi baru"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7d5a6a] dark:text-gray-400 hover:text-[#ffafcc]"
                >
                  <MaterialIcon icon={showNewPassword ? 'visibility_off' : 'visibility'} />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#4a2c3a] dark:text-white mb-2">
                Konfirmasi Kata Sandi Baru
              </label>
              <div className="relative">
                <MaterialIcon icon="lock" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bdbef5]" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b24] text-[#4a2c3a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffafcc]/50"
                  placeholder="Konfirmasi kata sandi baru"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7d5a6a] dark:text-gray-400 hover:text-[#ffafcc]"
                >
                  <MaterialIcon icon={showConfirmPassword ? 'visibility_off' : 'visibility'} />
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowPasswordChange(false);
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                }}
                className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-[#4a2c3a] dark:text-white font-semibold rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-[#ffafcc] hover:bg-[#ff8fb5] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <MaterialIcon icon="check" />
                Simpan Kata Sandi
              </button>
            </div>
          </form>
        )}
      </div>
      </div>
    </div>
  );
}