import { useState } from 'react';
import MaterialIcon from '../../MaterialIcon';

export default function AffiliateRekening() {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [ktpFile, setKtpFile] = useState<File | null>(null);
  const [ktpPreview, setKtpPreview] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  const verificationStatus = 'unverified'; // 'unverified', 'pending', 'verified'

  const handleSave = () => {
    if (!consentChecked) {
      alert('Anda harus menyetujui penggunaan data KTP');
      return;
    }
    console.log('Saving bank account details');
  };

  const handleKtpUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setKtpFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setKtpPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 pb-20 bg-[#fffbef] dark:bg-[#2d1b24]">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#4a2c3a] dark:text-white mb-2">Data Rekening Bank</h1>
        <p className="text-[#7d5a6a] dark:text-gray-400">Kelola informasi rekening untuk pencairan komisi</p>
      </div>

      {/* Bank Account Form */}
      <div className="bg-white dark:bg-[#3d2531] rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#bdbef5] to-[#9b9ef5] p-6">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <MaterialIcon icon="account_balance" className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Informasi Rekening Bank</h2>
              <p className="text-white/80 text-sm">Lengkapi data rekening untuk pencairan komisi</p>
            </div>
          </div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="p-6 space-y-4">
          {/* Bank Name */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-[#4a2c3a] dark:text-white mb-3">
              Nama Bank *
            </label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#2d1b24] border border-gray-200 dark:border-gray-700 focus:border-[#bdbef5] focus:outline-none focus:ring-2 focus:ring-[#bdbef5]/50 text-sm text-[#4a2c3a] dark:text-white transition-all"
              required
            >
              <option value="">Pilih Bank</option>
              <option value="BCA">BCA - Bank Central Asia</option>
              <option value="BNI">BNI - Bank Negara Indonesia</option>
              <option value="BRI">BRI - Bank Rakyat Indonesia</option>
              <option value="Mandiri">Bank Mandiri</option>
              <option value="CIMB">CIMB Niaga</option>
              <option value="Permata">Bank Permata</option>
              <option value="BSI">BSI - Bank Syariah Indonesia</option>
              <option value="Danamon">Bank Danamon</option>
              <option value="BTN">BTN - Bank Tabungan Negara</option>
              <option value="Maybank">Maybank Indonesia</option>
              <option value="Panin">Bank Panin</option>
              <option value="OCBC">OCBC NISP</option>
            </select>
          </div>

          {/* Account Number */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-[#4a2c3a] dark:text-white mb-3">
              Nomor Rekening *
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#2d1b24] border border-gray-200 dark:border-gray-700 focus:border-[#bdbef5] focus:outline-none focus:ring-2 focus:ring-[#bdbef5]/50 text-sm text-[#4a2c3a] dark:text-white transition-all"
              placeholder="Masukkan nomor rekening"
              required
            />
          </div>

          {/* Account Name */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-[#4a2c3a] dark:text-white mb-3">
              Nama Pemilik Rekening *
            </label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#2d1b24] border border-gray-200 dark:border-gray-700 focus:border-[#bdbef5] focus:outline-none focus:ring-2 focus:ring-[#bdbef5]/50 text-sm text-[#4a2c3a] dark:text-white transition-all"
              placeholder="Nama sesuai rekening bank"
              required
            />
            <p className="text-xs text-[#7d5a6a] dark:text-gray-400 mt-2 flex items-start gap-1.5">
              <MaterialIcon icon="info" className="text-[14px] mt-0.5" />
              <span>Nama harus sesuai dengan yang tertera di buku tabungan atau kartu ATM dan KTP</span>
            </p>
          </div>

          {/* KTP Upload */}
          <div className="mb-6">
            <label className="block text-sm font-bold text-[#4a2c3a] dark:text-white mb-3">
              Upload KTP *
            </label>
            
            {ktpPreview ? (
              <div className="space-y-4">
                {/* Image Preview */}
                <div className="relative">
                  <img 
                    src={ktpPreview} 
                    alt="KTP Preview" 
                    className="w-full h-80 object-contain rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#2d1b24]"
                  />
                </div>
                
                {/* Confirmation Text */}
                <div className="bg-gray-200 dark:bg-[#3d2531] border-2 border-gray-300 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <MaterialIcon icon="help" className="text-gray-500 dark:text-gray-400 text-2xl mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#4a2c3a] dark:text-white mb-1">
                        Apakah ini KTP anda?
                      </p>
                      <p className="text-xs text-[#7d5a6a] dark:text-gray-400">
                        Pastikan foto KTP jelas, tidak buram, dan semua informasi terbaca dengan baik
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <label className="flex-1 px-4 py-2.5 bg-white dark:bg-[#2d1b24] border-2 border-gray-300 dark:border-gray-700 hover:border-[#bdbef5] text-[#4a2c3a] dark:text-white rounded-lg font-semibold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2">
                    <MaterialIcon icon="sync" className="text-[18px]" />
                    Ganti
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleKtpUpload}
                      className="hidden"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setKtpFile(null);
                      setKtpPreview('');
                    }}
                    className="flex-1 px-4 py-2.5 bg-white dark:bg-[#2d1b24] border-2 border-red-300 dark:border-red-900 hover:border-red-500 text-red-600 dark:text-red-400 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <MaterialIcon icon="delete" className="text-[18px]" />
                    Hapus
                  </button>
                </div>
              </div>
            ) : (
              <label className="block border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center hover:border-[#bdbef5] transition-colors cursor-pointer">
                <MaterialIcon icon="upload_file" className="text-5xl text-[#7d5a6a] dark:text-gray-400 mb-3" />
                <p className="text-sm font-semibold text-[#4a2c3a] dark:text-white mb-1">
                  Klik untuk upload KTP
                </p>
                <p className="text-xs text-[#7d5a6a] dark:text-gray-400">
                  Format: JPG, PNG (max 5MB)
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleKtpUpload}
                  className="hidden"
                  required
                />
              </label>
            )}
            
            {!ktpPreview && (
              <p className="text-xs text-[#7d5a6a] dark:text-gray-400 mt-2">
                Pastikan foto KTP jelas dan terbaca untuk mempercepat verifikasi
              </p>
            )}
          </div>

          {/* Consent Checkbox */}
          <div className="mb-6 p-4 bg-gray-50 dark:bg-[#2d1b24] rounded-lg border border-gray-200 dark:border-gray-700">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consentChecked}
                onChange={(e) => setConsentChecked(e.target.checked)}
                className="mt-1 size-4 rounded border-gray-300 text-[#bdbef5] focus:ring-[#bdbef5]"
                required
              />
              <span className="text-xs text-[#7d5a6a] dark:text-gray-400 flex-1">
                Saya menyetujui penggunaan data KTP untuk <strong className="text-[#4a2c3a] dark:text-white">verifikasi identitas penerima komisi</strong> sesuai dengan kebijakan privasi dan UU Perlindungan Data Pribadi (UU PDP). Data akan disimpan dengan aman dan hanya digunakan untuk keperluan verifikasi pembayaran.
              </span>
            </label>
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full px-6 py-3.5 bg-[#bdbef5] hover:bg-[#9b9ef5] text-white rounded-lg font-bold text-sm transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <MaterialIcon icon="save" className="text-[20px]" />
              Simpan Rekening
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}