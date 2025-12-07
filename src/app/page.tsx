"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FaDollarSign, FaEuroSign, FaBitcoin } from "react-icons/fa";
import { FiChevronDown } from "react-icons/fi";

export default function PremiumOrderPanel() {
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");

  // FIXED: currency is now typed safely
  const currencyIcon = {
    USD: <FaDollarSign className="text-gray-600 dark:text-gray-300" />,
    EUR: <FaEuroSign className="text-gray-600 dark:text-gray-300" />,
    BTC: <FaBitcoin className="text-amber-500" />,
  } as const;

  type CurrencyKey = keyof typeof currencyIcon;

  const [currency, setCurrency] = useState<CurrencyKey>("USD");
  const [openDropdown, setOpenDropdown] = useState(false);

  const tiltX = useMotionValue(0);
  const tiltY = useTransform(tiltX, [-20, 20], [5, -5]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-white to-gray-50 dark:from-neutral-900 dark:to-neutral-800 relative overflow-hidden">

      {/* Motion BG */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="float-bg absolute -left-28 -top-16 w-[520px] h-[520px] bg-gradient-to-tr from-emerald-200/30 to-sky-300/20 blur-3xl opacity-40 dark:from-cyan-700/20 dark:to-violet-700/10 rounded-full"></div>
      </div>

      <motion.aside
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        style={{ rotateX: tiltY, perspective: 800 }}
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const px = e.clientX - rect.left;
          const dx = (px / rect.width - 0.5) * 2;
          tiltX.set(dx * 12);
        }}
        onPointerLeave={() => tiltX.set(0)}
        className="relative w-full max-w-md"
      >
        <div className="rounded-2xl border border-gray-100 dark:border-neutral-700 bg-white/90 dark:bg-neutral-900/60 backdrop-blur-md shadow-2xl p-6 sm:p-7">

          {/* Header */}
          <div className="flex items-start gap-4 pb-3 border-b border-black/5 dark:border-white/5">
            <div className="flex-none">
              <Image
                src="/btc.png"
                alt="BTC"
                width={48}
                height={48}
                className="rounded-lg"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Will Bitcoin cross $100k again this year?
              </h4>
              <p className="mt-1 text-xs text-sky-600 dark:text-sky-400 font-medium">
                Buy Yes · Above $100,000
              </p>
            </div>
          </div>

          {/* Toggle + Currency Row */}
          <div className="mt-3 flex justify-between items-center">

            {/* Buy/Sell Toggle */}
            <div className="relative inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800/50 p-1 shadow-sm">
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 360, damping: 28 }}
                className={`absolute h-8 w-1/2 rounded-full bg-white/90 dark:bg-neutral-900/70 shadow-sm ${
                  side === "buy" ? "left-1" : "right-1"
                }`}
              />
              <button
                onClick={() => setSide("buy")}
                className={`relative z-10 px-3 py-1.5 text-xs font-semibold ${
                  side === "buy"
                    ? "text-emerald-600"
                    : "text-gray-500 dark:text-gray-300"
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setSide("sell")}
                className={`relative z-10 px-3 py-1.5 text-xs font-semibold ${
                  side === "sell"
                    ? "text-rose-500"
                    : "text-gray-500 dark:text-gray-300"
                }`}
              >
                Sell
              </button>
            </div>

            {/* Currency Dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-neutral-800/60 px-2 py-1 rounded-md border border-gray-200 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-700 transition"
              >
                {currencyIcon[currency]}
                {currency}
                <FiChevronDown className="text-[13px]" />
              </button>

              {openDropdown && (
                <div className="absolute right-0 mt-2 w-28 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg shadow-lg overflow-hidden z-20">
                  {(["USD", "EUR", "BTC"] as CurrencyKey[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setOpenDropdown(false);
                      }}
                      className="flex items-center gap-2 px-3 py-2 text-sm w-full text-left hover:bg-gray-100 dark:hover:bg-neutral-700"
                    >
                      {currencyIcon[c]}
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Yes/No */}
          <div className="mt-4 grid grid-cols-2 gap-3">
            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col items-center justify-center rounded-lg p-2.5 shadow-sm ${
                side === "buy"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  : "bg-white/60 dark:bg-neutral-800 text-slate-900 dark:text-slate-200"
              }`}
            >
              <span className="text-[12px] uppercase opacity-70">Yes</span>
              <div className="mt-1 text-sm font-bold">34¢</div>
              <div className="mt-1 text-[9px] opacity-60">Chance · 34%</div>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className={`flex flex-col items-center justify-center rounded-lg p-2.5 shadow-sm ${
                side === "sell"
                  ? "bg-gradient-to-r from-pink-300 to-violet-300 text-rose-800"
                  : "bg-white/60 dark:bg-neutral-800 text-slate-900 dark:text-slate-200"
              }`}
            >
              <span className="text-[12px] uppercase opacity-70">No</span>
              <div className="mt-1 text-sm font-bold">67¢</div>
              <div className="mt-1 text-[9px] opacity-60">Chance · 67%</div>
            </motion.div>
          </div>

          {/* Amount */}
          <div className="mt-4">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-300">
              Amount
            </label>
            <div className="mt-2 relative rounded-lg border border-gray-100 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/40 p-3 shadow-sm flex items-center">
              <div className="text-sm text-gray-500 mr-3">$</div>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-transparent outline-none text-right text-lg font-bold text-slate-900 dark:text-slate-100"
              />
              <div className="ml-3 text-[11px] text-emerald-500 font-semibold">
                Earn 3.5% APR
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-lg py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md"
            >
              Sign up to trade
            </motion.button>
          </div>

          <div className="mt-3 text-xs text-gray-400 dark:text-gray-500 text-center">
            No financial advice • Markets may vary
          </div>
        </div>
      </motion.aside>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
          100% { transform: translateY(0); }
        }
        .float-bg {
          animation: float 14s linear infinite;
        }
      `}</style>
    </div>
  );
}
