"use client";

import React from "react";
import { Check } from "lucide-react";

interface TurnstileBoxProps {
  isVerified: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  className?: string;
}

const CloudflareIcon = () => (
  <svg width="20" height="20" viewBox="0 0 100 100" className="flex-shrink-0">
    <defs>
      <linearGradient
        id="cloudflare-gradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#f38020" />
        <stop offset="100%" stopColor="#fbad41" />
      </linearGradient>
    </defs>
    <path
      d="M78.5 65.3c1.1-1.6 1.6-3.5 1.1-5.5-.6-4.1-4.6-7.2-8.8-7.2h-.5c-.6-4.6-2.6-9.2-6.2-12.4-3.6-3.1-8.2-4.6-12.9-4.6-6.2 0-12.4 3.1-16.0 8.2-1.6-.5-3.1-.5-4.6-.5-7.2 0-13.4 4.6-15.5 11.3-.5 0-1.0 0-1.5 0-4.1 0-7.7 3.1-8.2 7.2 0 .5 0 1.0 0 1.5 0 4.6 3.6 8.2 8.2 8.2h56.7c4.6 0 8.2-3.6 8.2-8.2 0-1.0-.5-2.1-1.0-3.1z"
      fill="url(#cloudflare-gradient)"
    />
  </svg>
);

export default function TurnstileBox({
  isVerified,
  isLoading = false,
  onClick,
  className = "",
}: TurnstileBoxProps) {
  return (
    <div
      className={`
        w-[300px] bg-zinc-800/50 border border-zinc-600 rounded-xl p-4 transition-all duration-300 ease-in-out
        ${isVerified ? "bg-green-900/20 border-green-500/50" : ""}
        ${
          !isVerified && !isLoading
            ? "hover:border-zinc-500 cursor-pointer"
            : ""
        }
        ${className}
      `}
      onClick={!isVerified && !isLoading ? onClick : undefined}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left side - Checkbox area */}
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-shrink-0">
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-zinc-500 border-t-orange-500 rounded-sm animate-spin bg-zinc-700"></div>
            ) : isVerified ? (
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-400 rounded-sm flex items-center justify-center shadow-sm">
                <Check className="w-4 h-4 text-white" strokeWidth={2.5} />
              </div>
            ) : (
              <div className="w-6 h-6 border-2 border-zinc-500 rounded-sm bg-zinc-700/50 hover:border-zinc-400 transition-colors cursor-pointer"></div>
            )}
          </div>

          <div className="text-sm font-medium text-zinc-300 flex-1">
            {isLoading ? (
              <span>Verifica sicurezza in corso...</span>
            ) : isVerified ? (
              <span>Verifica completata</span>
            ) : (
              <span>I&apos;m not a robot</span>
            )}
          </div>
        </div>

        {/* Right side - Cloudflare branding */}
        <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
          <CloudflareIcon />
          <div className="text-xs text-zinc-400 leading-tight text-center">
            <div className="font-medium text-[11px]">Cloudflare</div>
            <div className="text-[9px] opacity-70 flex gap-1 justify-center">
              <a
                href="https://www.cloudflare.com/privacypolicy/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-300 transition-colors"
              >
                Privacy
              </a>
              <span>-</span>
              <a
                href="https://www.cloudflare.com/website-terms/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-300 transition-colors"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
