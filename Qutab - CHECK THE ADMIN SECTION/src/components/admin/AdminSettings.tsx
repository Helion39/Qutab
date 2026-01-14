import MaterialIcon from '../MaterialIcon';

export default function AdminSettings() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2">General Settings</h3>
        <p className="text-sm text-gray-500">Manage your admin panel preferences and configurations</p>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <MaterialIcon icon="person" className="text-xl" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Account Settings</h4>
              <p className="text-xs text-gray-500">Manage your account information</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
              <input
                type="text"
                defaultValue="admin"
                className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                defaultValue="admin@qurbantanpabatas.id"
                className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
              Update Account
            </button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <MaterialIcon icon="security" className="text-xl" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Security Settings</h4>
              <p className="text-xs text-gray-500">Manage your password and security</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="w-full h-10 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
              Change Password
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <MaterialIcon icon="notifications" className="text-xl" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Notification Settings</h4>
              <p className="text-xs text-gray-500">Configure your notification preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-gray-900">Email Notifications</p>
                <p className="text-xs text-gray-500">Receive email updates</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-gray-900">Order Notifications</p>
                <p className="text-xs text-gray-500">New order alerts</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-gray-900">Affiliate Notifications</p>
                <p className="text-xs text-gray-500">New affiliate applications</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-sm font-semibold text-gray-900">Payout Notifications</p>
                <p className="text-xs text-gray-500">Payout request alerts</p>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
            </label>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
              <MaterialIcon icon="settings" className="text-xl" />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">System Settings</h4>
              <p className="text-xs text-gray-500">Configure system preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Language</label>
              <select className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Bahasa Indonesia</option>
                <option>English</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Timezone</label>
              <select className="w-full h-10 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Asia/Jakarta (WIB)</option>
                <option>Asia/Makassar (WITA)</option>
                <option>Asia/Jayapura (WIT)</option>
              </select>
            </div>
            <button className="w-full h-10 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors">
              Save Settings
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl border border-red-200 p-6">
        <div className="flex items-start gap-3 mb-6">
          <div className="size-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
            <MaterialIcon icon="warning" className="text-xl" />
          </div>
          <div>
            <h4 className="font-bold text-red-900">Danger Zone</h4>
            <p className="text-sm text-red-700">Critical actions that can't be undone</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <button className="w-full h-10 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
            <MaterialIcon icon="delete_forever" className="text-xl" />
            Clear All Cache
          </button>
          <button className="w-full h-10 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
            <MaterialIcon icon="restart_alt" className="text-xl" />
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
