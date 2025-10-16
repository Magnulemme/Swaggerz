import React from "react";

interface RegistrationLayoutProps {
  children: React.ReactNode;
}

export default function RegistrationLayout({ children }: RegistrationLayoutProps) {
  // Questo layout contiene solo la UI condivisa per le pagine di registrazione
  // La logica di session management è gestita dal layout auth superiore

  return (
    <div className="min-h-screen bg-zinc-950 font-jost">
      <div className="relative min-h-screen overflow-hidden p-4 sm:p-6 lg:p-12 xl:p-20 flex items-center justify-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900/95 to-zinc-950"></div>

        {/* Ambient lighting - ottimizzato per mobile */}
        <div className="absolute top-1/4 right-1/4 sm:right-1/3 w-60 h-60 sm:w-80 sm:h-80 bg-gradient-to-r from-red-500/10 to-orange-500/8 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 sm:left-1/3 w-56 h-56 sm:w-72 sm:h-72 bg-gradient-to-r from-orange-500/8 to-yellow-500/6 rounded-full blur-3xl"></div>

        <div className="relative w-full max-w-7xl mx-auto">
          {/* Header mobile - posizionato in alto */}
          <div className="lg:hidden mb-8 sm:mb-12 text-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black leading-tight tracking-tight mb-3">
                <span className="block text-white">Swaggerz</span>
                <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                  Collective
                </span>
              </h1>
              <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-medium">
                L&apos;autenticità della strada italiana
              </p>
            </div>
          </div>

          {/* Main grid */}
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
            
            {/* Left side - Brand (desktop only) */}
            <div className="hidden lg:block space-y-8 xl:space-y-10">
              <div className="space-y-6">
                {/* Main value proposition */}
                <div className="space-y-5">
                  <h1 className="text-5xl xl:text-6xl font-black leading-tight tracking-tight">
                    <span className="block text-white">Swaggerz</span>
                    <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                      Collective
                    </span>
                  </h1>

                  <div className="space-y-3">
                    <p className="text-lg xl:text-xl text-zinc-200 leading-relaxed max-w-md font-medium">
                      L&apos;autenticità della strada italiana
                    </p>
                    <p className="text-base text-zinc-400 leading-relaxed max-w-md">
                      Unisciti alla community di streetwear più esclusiva d&apos;Italia
                    </p>
                  </div>
                </div>
              </div>

              {/* Value-driven features */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-px bg-gradient-to-r from-orange-500/70 to-transparent"></div>
                  <span className="text-zinc-400 text-xs font-semibold tracking-wider uppercase">
                    Benefici Membri
                  </span>
                </div>
                
                <div className="space-y-5">
                  {[
                    { 
                      icon: "🚀", 
                      title: "Drop Esclusivi", 
                      value: "Accesso 24h prima del pubblico" 
                    },
                    { 
                      icon: "💸", 
                      title: "Sconti VIP", 
                      value: "Fino al 30% sui brand partner" 
                    },
                    { 
                      icon: "🎯", 
                      title: "Community Premium", 
                      value: "Network di 2.4K+ appassionati" 
                    }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="text-lg group-hover:scale-110 transition-transform duration-200 mt-0.5">
                        {feature.icon}
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="text-white font-semibold text-sm xl:text-base">{feature.title}</div>
                        <div className="text-zinc-400 text-sm leading-relaxed">{feature.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-between pt-6 border-t border-zinc-800/40">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-7 h-7 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 border border-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-300"
                      >
                        ★
                      </div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <span className="text-white font-semibold">4.9</span>
                    <span className="text-zinc-400 ml-1">• 500+ reviews</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Auth form */}
            <div>
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-r from-zinc-800/20 to-zinc-700/10 rounded-2xl blur-xl"></div>
                
                {/* Form container */}
                <div className="relative bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 sm:p-8 lg:p-10">
                  <div className="w-full max-w-md mx-auto lg:mx-0 lg:max-w-none">
                    {children}
                  </div>
                </div>
              </div>
            </div>

            {/* Features mobile - sotto il form */}
            <div className="lg:hidden col-span-full">
              <div
                className="space-y-6"
              >
                {/* Benefici per mobile */}
                <div className="space-y-4">
                  <div className="flex justify-center items-center gap-3">
                    <div className="w-6 h-px bg-gradient-to-r from-orange-500/70 to-transparent"></div>
                    <span className="text-zinc-400 text-xs font-semibold tracking-wider uppercase">
                      Benefici Membri
                    </span>
                    <div className="w-6 h-px bg-gradient-to-l from-orange-500/70 to-transparent"></div>
                  </div>
                  
                  <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                    {[
                      { 
                        icon: "🚀", 
                        title: "Drop Esclusivi", 
                        value: "Accesso 24h prima" 
                      },
                      { 
                        icon: "💸", 
                        title: "Sconti VIP", 
                        value: "Fino al 30% off" 
                      },
                      { 
                        icon: "🎯", 
                        title: "Community", 
                        value: "2.4K+ membri" 
                      }
                    ].map((feature, index) => (
                      <div key={index} className="text-center space-y-2 group">
                        <div className="text-2xl group-hover:scale-110 transition-transform duration-200">
                          {feature.icon}
                        </div>
                        <div className="space-y-1">
                          <div className="text-white font-semibold text-sm">{feature.title}</div>
                          <div className="text-zinc-400 text-xs leading-relaxed">{feature.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trust indicators mobile */}
                <div className="flex items-center justify-center gap-6 pt-4 border-t border-zinc-800/40">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-5 h-5 rounded-full bg-gradient-to-br from-zinc-600 to-zinc-700 border border-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-300"
                        >
                          ★
                        </div>
                      ))}
                    </div>
                    <div className="text-xs">
                      <span className="text-white font-semibold">4.9</span>
                      <span className="text-zinc-400 ml-1">• 500+ reviews</span>
                    </div>
                  </div>
                  <div className="text-xs text-zinc-500">
                    🔒 Sicuro
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
