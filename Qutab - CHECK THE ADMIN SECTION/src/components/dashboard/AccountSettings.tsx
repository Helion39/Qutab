import { useState } from 'react';
import MaterialIcon from '../MaterialIcon';

export default function AccountSettings() {
  const [profileData, setProfileData] = useState({
    fullName: 'Ahmad Fulan',
    email: 'ahmad.fulan@email.com',
    phone: '+62 812-3456-7890',
    address: 'Jl. Raya Bogor No. 123, Jakarta Timur',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    promotionalEmails: true,
    qurbanReminders: true,
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', profileData);
    alert('Profil berhasil diperbarui!');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Kata sandi baru tidak cocok!');
      return;
    }
    console.log('Password updated');
    alert('Kata sandi berhasil diperbarui!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#4a2c3a] dark:text-white mb-2">Pengaturan Akun</h1>
        <p className="text-[#7d5a6a] dark:text-gray-400">Kelola informasi pribadi dan preferensi akun Anda</p>
      </div>

      {/* Profile Information */}
      <div className="bg-white dark:bg-[#3d2531] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#ffafcc] to-[#ff8fb5] p-6">
          <div className="flex items-center gap-4">
            <div className="size-16 rounded-full bg-white border-4 border-white shadow-lg bg-cover bg-center"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDYjUU6vVBxaaUgK4e9nfNMBeI-B4oKxra-N1xCLGde10rmVFswV1-sui5NEPHieJaOxwa8jc8ngmwzVVE5BlMySWW0nbiGLgaqjW7lSZDldwI2QAsh7wVKlQQWh-s7HE9-Wxf5W2woAC8Z48btQz3dxr6WPWiIc1R3PsUIjsQRZmekgKvw-j92IyN85BB4nK9zqbFK_SkbOdQnXZUvsL9V0sxhFtV3FX21-28iECBMUqSmqBbD9ScE9uB8J2uXC76-kcrbrLMyVv4')"
              }}
            ></div>
            <div>
              <h2 className="text-xl font-bold text-white">Informasi Profil</h2>
              <p className="text-white/80 text-sm">Perbarui informasi pribadi Anda</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleProfileSubmit} className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#4a2c3a] dark:text-white mb-2">
                Nama Lengkap
              </label>
              <div className="relative">
                <MaterialIcon icon="person" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bdbef5]" />
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                  className="w-full pl-10 pr-4 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b24] text-[#4a2c3a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffafcc]/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#4a2c3a] dark:text-white mb-2">
                Email
              </label>
              <div className="relative">
                <MaterialIcon icon="mail" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bdbef5]" />
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="w-full pl-10 pr-4 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b24] text-[#4a2c3a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffafcc]/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#4a2c3a] dark:text-white mb-2">
                Nomor Telepon
              </label>
              <div className="relative">
                <MaterialIcon icon="phone" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bdbef5]" />
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b24] text-[#4a2c3a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffafcc]/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#4a2c3a] dark:text-white mb-2">
                Alamat
              </label>
              <div className="relative">
                <MaterialIcon icon="location_on" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bdbef5]" />
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  className="w-full pl-10 pr-4 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b24] text-[#4a2c3a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#ffafcc]/50"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-[#ffafcc] hover:bg-[#ff8fb5] text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <MaterialIcon icon="save" />
              Simpan Perubahan
            </button>
          </div>
        </form>
      </div>

      {/* Password Change */}
      <div className="bg-white dark:bg-[#3d2531] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#bdbef5] to-[#a0a1f0] p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <MaterialIcon icon="lock" className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Ubah Kata Sandi</h2>
              <p className="text-white/80 text-sm">Perbarui kata sandi untuk keamanan akun</p>
            </div>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#4a2c3a] dark:text-white mb-2">
              Kata Sandi Saat Ini
            </label>
            <div className="relative">
              <MaterialIcon icon="lock" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bdbef5]" />
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="w-full pl-10 pr-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b24] text-[#4a2c3a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bdbef5]/50"
                placeholder="Masukkan kata sandi saat ini"
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
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full pl-10 pr-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b24] text-[#4a2c3a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bdbef5]/50"
                placeholder="Masukkan kata sandi baru"
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
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full pl-10 pr-12 h-12 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#2d1b24] text-[#4a2c3a] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#bdbef5]/50"
                placeholder="Konfirmasi kata sandi baru"
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

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="px-6 py-3 bg-[#bdbef5] hover:bg-[#a0a1f0] text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <MaterialIcon icon="key" />
              Ubah Kata Sandi
            </button>
          </div>
        </form>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white dark:bg-[#3d2531] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-[#ffe1ed] dark:bg-[#ffafcc]/20 flex items-center justify-center">
              <MaterialIcon icon="notifications" className="text-[#ffafcc] text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#4a2c3a] dark:text-white">Preferensi Notifikasi</h2>
              <p className="text-[#7d5a6a] dark:text-gray-400 text-sm">Atur notifikasi yang ingin Anda terima</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {[
            { key: 'emailNotifications' as const, label: 'Notifikasi Email', description: 'Terima pembaruan penting melalui email' },
            { key: 'smsNotifications' as const, label: 'Notifikasi SMS', description: 'Terima pembaruan melalui SMS' },
            { key: 'promotionalEmails' as const, label: 'Email Promosi', description: 'Terima informasi program dan promosi terbaru' },
            { key: 'qurbanReminders' as const, label: 'Pengingat Qurban', description: 'Pengingat menjelang Hari Raya Idul Adha' },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-[#2d1b24] transition-colors">
              <div>
                <p className="font-semibold text-[#4a2c3a] dark:text-white">{item.label}</p>
                <p className="text-sm text-[#7d5a6a] dark:text-gray-400">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={() => handleNotificationChange(item.key)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#ffafcc]/20 dark:peer-focus:ring-[#ffafcc]/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#ffafcc]"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-[#3d2531] rounded-2xl border-2 border-red-200 dark:border-red-900/30 shadow-sm overflow-hidden">
        <div className="bg-red-50 dark:bg-red-900/20 p-6 border-b border-red-200 dark:border-red-900/30">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <MaterialIcon icon="warning" className="text-red-500 text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-red-600 dark:text-red-400">Zona Berbahaya</h2>
              <p className="text-red-600/70 dark:text-red-400/70 text-sm">Tindakan yang tidak dapat dibatalkan</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-[#4a2c3a] dark:text-white mb-1">Hapus Akun</h3>
              <p className="text-sm text-[#7d5a6a] dark:text-gray-400 mb-4">
                Setelah akun dihapus, semua data Anda akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>
            <button
              onClick={() => {
                if (confirm('Apakah Anda yakin ingin menghapus akun? Tindakan ini tidak dapat dibatalkan.')) {
                  alert('Permintaan penghapusan akun telah diterima. Tim kami akan menghubungi Anda.');
                }
              }}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-2"
            >
              <MaterialIcon icon="delete" />
              Hapus Akun
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}