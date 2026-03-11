"use client";

import { useState } from "react";

export function WifiCard({ password, children }: { password?: string, children?: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  
  const displayPassword = password || "Lepanto17";

  const copyWifi = () => {
    navigator.clipboard.writeText(displayPassword);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-brand-50 content-card rounded-2xl p-4 mb-4 border border-brand-100 flex items-center justify-between">
      <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center mr-4">
              <i className="fa-solid fa-wifi"></i>
          </div>
          <div>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Wi-Fi Password</p>
              <p className="font-bold text-brand-900 text-lg">{displayPassword}</p>
          </div>
      </div>
      <button onClick={copyWifi} className="text-brand-800 bg-white hover:bg-gray-50 px-3 py-1.5 rounded-lg text-sm font-medium border border-brand-200 transition shadow-sm w-28 text-center shrink-0">
          {copied ? <><i className="fa-solid fa-check text-green-600"></i> Copiato!</> : <><i className="fa-regular fa-copy"></i> Copia</>}
      </button>
      {children}
    </div>
  );
}
