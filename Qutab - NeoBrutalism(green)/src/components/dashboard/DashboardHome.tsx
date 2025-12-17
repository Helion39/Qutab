import React from 'react';
import MaterialIcon from '../MaterialIcon';

export default function DashboardHome() {
  return (
    <div className="p-8 pb-20">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        {/* Welcome Section */}
        <div className="flex flex-col gap-2">
          <h2 className="text-3xl font-bold text-[#131b0d] dark:text-white tracking-tight">
            Welcome back, Ahmad! 👋
          </h2>
          <p className="text-[#6c9a4c] dark:text-gray-400">
            Here's your Qurban journey overview for 2024
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#23301a] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 rounded-xl bg-[#6dec13]/20 flex items-center justify-center">
                <MaterialIcon icon="shopping_bag" className="text-[#6dec13] text-2xl" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase">This Year</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-[#131b0d] dark:text-white">3</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Total Qurban</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#23301a] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                <MaterialIcon icon="favorite" className="text-amber-500 text-2xl filled" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase">Saved</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-[#131b0d] dark:text-white">5</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Wishlist Items</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#23301a] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="size-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <MaterialIcon icon="wallet" className="text-blue-500 text-2xl" />
              </div>
              <span className="text-xs font-semibold text-gray-400 uppercase">Balance</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-[#131b0d] dark:text-white">Rp 5.2M</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">Available Funds</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-[#6dec13] to-[#5bc710] rounded-2xl p-8 text-[#131b0d]">
          <h3 className="text-2xl font-bold mb-4">Ready for Qurban 2024?</h3>
          <p className="mb-6 text-[#131b0d]/80">
            Browse our catalog and select your sacrifice animal today. Early orders get priority documentation.
          </p>
          <a
            href="/dashboard/catalogue"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-white text-[#131b0d] font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Browse Catalog
            <MaterialIcon icon="arrow_forward" />
          </a>
        </div>
      </div>
    </div>
  );
}
