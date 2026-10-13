import React from 'react';

interface LandmarkIllustrationProps {
  landmarkId: string;
  className?: string;
}

export const LandmarkIllustration: React.FC<LandmarkIllustrationProps> = ({ landmarkId, className = 'w-full h-48' }) => {
  switch (landmarkId) {
    case 'bogatyr-mine':
      return (
        <svg viewBox="0 0 400 240" className={`rounded-xl overflow-hidden ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bogSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="60%" stopColor="#334155" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            <linearGradient id="coalLayer1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="50%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
            <linearGradient id="coalLayer2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="100%" stopColor="#1c1917" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#bogSky)" />
          {/* Distant step terraces */}
          <path d="M0,130 L120,125 L160,140 L280,135 L400,145 L400,240 L0,240 Z" fill="url(#coalLayer2)" opacity="0.6" />
          <path d="M0,160 L90,155 L180,170 L300,165 L400,175 L400,240 L0,240 Z" fill="url(#coalLayer1)" />

          {/* Mining strata benches */}
          <line x1="0" y1="175" x2="400" y2="175" stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 6" opacity="0.3" />
          <line x1="0" y1="205" x2="400" y2="205" stroke="#f59e0b" strokeWidth="1" strokeDasharray="6 8" opacity="0.4" />

          {/* Massive Rotary Bucket-Wheel Excavator (SRs-K) */}
          <g transform="translate(180, 50)">
            {/* Counterweight boom */}
            <line x1="40" y1="70" x2="10" y2="50" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
            <rect x="0" y="45" width="16" height="18" fill="#d97706" rx="2" />

            {/* Pylon / Central tower */}
            <polygon points="40,20 60,70 30,70" fill="#b45309" stroke="#f59e0b" strokeWidth="2" />
            <rect x="25" y="70" width="45" height="25" fill="#78350f" rx="3" />

            {/* Rotating Bucket Wheel Boom */}
            <line x1="50" y1="65" x2="130" y2="95" stroke="#fbbf24" strokeWidth="7" strokeLinecap="round" />
            <line x1="45" y1="20" x2="130" y2="95" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="2 2" />

            {/* Rotary Wheel itself with buckets */}
            <circle cx="130" cy="95" r="28" fill="#18181b" stroke="#f59e0b" strokeWidth="4" />
            <circle cx="130" cy="95" r="14" fill="#3f3f46" stroke="#fbbf24" strokeWidth="2" />
            {/* Buckets */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <rect
                key={i}
                x="126"
                y="63"
                width="8"
                height="8"
                fill="#f59e0b"
                transform={`rotate(${angle} 130 95)`}
                rx="1"
              />
            ))}

            {/* Crawlers / Tracks */}
            <rect x="20" y="95" width="55" height="12" fill="#27272a" rx="4" stroke="#71717a" strokeWidth="1" />
            <circle cx="28" cy="101" r="4" fill="#52525b" />
            <circle cx="47" cy="101" r="4" fill="#52525b" />
            <circle cx="67" cy="101" r="4" fill="#52525b" />
          </g>

          {/* Heavy Dump Truck (BelAZ) Silhouette */}
          <g transform="translate(60, 180)">
            <rect x="15" y="10" width="36" height="18" fill="#eab308" rx="2" />
            <polygon points="15,10 5,20 15,20" fill="#ca8a04" />
            <rect x="42" y="14" width="12" height="10" fill="#0284c7" rx="1" />
            {/* Giant Wheels */}
            <circle cx="24" cy="30" r="10" fill="#09090b" stroke="#475569" strokeWidth="3" />
            <circle cx="48" cy="30" r="10" fill="#09090b" stroke="#475569" strokeWidth="3" />
          </g>

          {/* Coal train cars on bottom right */}
          <g transform="translate(250, 205)">
            <line x1="-30" y1="20" x2="140" y2="20" stroke="#64748b" strokeWidth="2" />
            <rect x="0" y="5" width="35" height="14" fill="#334155" rx="1" />
            <polygon points="2,5 17,-2 33,5" fill="#18181b" />
            <rect x="40" y="5" width="35" height="14" fill="#334155" rx="1" />
            <polygon points="42,5 57,-2 73,5" fill="#18181b" />
            <rect x="80" y="5" width="35" height="14" fill="#334155" rx="1" />
            <polygon points="82,5 97,-2 113,5" fill="#18181b" />
          </g>
          {/* Badge indicator */}
          <text x="18" y="28" fill="#f59e0b" fontSize="12" fontWeight="bold" letterSpacing="1">1970 • 56.8 МЛН Т / ЖЫЛ</text>
        </svg>
      );

    case 'gres-stations':
      return (
        <svg viewBox="0 0 400 240" className={`rounded-xl overflow-hidden ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gresSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#082f49" />
              <stop offset="60%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#0284c7" />
            </linearGradient>
            <linearGradient id="chimneyGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="45%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#gresSky)" />

          {/* Starry Steppe Sky */}
          <circle cx="60" cy="40" r="1" fill="#fff" opacity="0.8" />
          <circle cx="120" cy="25" r="1.5" fill="#fff" opacity="0.9" />
          <circle cx="340" cy="30" r="1" fill="#fff" opacity="0.7" />

          {/* Distant Cooling Towers */}
          <path d="M70,160 Q82,120 78,95 L98,95 Q94,120 106,160 Z" fill="#334155" stroke="#475569" strokeWidth="1" />
          <path d="M110,160 Q122,120 118,95 L138,95 Q134,120 146,160 Z" fill="#334155" stroke="#475569" strokeWidth="1" />

          {/* Steam plumes */}
          <ellipse cx="88" cy="80" rx="15" ry="10" fill="#94a3b8" opacity="0.3" />
          <ellipse cx="128" cy="80" rx="15" ry="10" fill="#94a3b8" opacity="0.3" />

          {/* Generating Unit Building (Turbine Hall) */}
          <rect x="50" y="150" width="130" height="50" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" rx="2" />
          {[60, 80, 100, 120, 140, 160].map((x, i) => (
            <rect key={i} x={x} y="160" width="10" height="20" fill="#0284c7" opacity="0.6" />
          ))}

          {/* RECORD CHIMNEY (419.7 M) at GRES-2 */}
          <g transform="translate(230, 10)">
            {/* The Tallest Chimney */}
            <polygon points="12,190 28,190 23,20 17,20" fill="url(#chimneyGrad)" />
            {/* Aviation Warning Red Bands */}
            <polygon points="16,30 24,30 23,45 17,45" fill="#ef4444" />
            <polygon points="16,65 24,65 23,80 17,80" fill="#ef4444" />
            <polygon points="15,100 25,100 24,115 16,115" fill="#ef4444" />
            <polygon points="14,135 26,135 25,150 15,150" fill="#ef4444" />
            {/* Top antenna & beacon */}
            <line x1="20" y1="20" x2="20" y2="10" stroke="#f87171" strokeWidth="1.5" />
            <circle cx="20" cy="10" r="2" fill="#ef4444" className="animate-pulse" />
          </g>

          {/* High Voltage 1150 kV Pylons */}
          <g transform="translate(300, 100)">
            <line x1="25" y1="100" x2="25" y2="20" stroke="#0ea5e9" strokeWidth="2" />
            <line x1="5" y1="40" x2="45" y2="40" stroke="#0ea5e9" strokeWidth="2" />
            <line x1="10" y1="60" x2="40" y2="60" stroke="#0ea5e9" strokeWidth="2" />
            <line x1="15" y1="80" x2="35" y2="80" stroke="#0ea5e9" strokeWidth="2" />
            <line x1="5" y1="40" x2="25" y2="60" stroke="#0ea5e9" strokeWidth="1" />
            <line x1="45" y1="40" x2="25" y2="60" stroke="#0ea5e9" strokeWidth="1" />
            {/* Power lines */}
            <path d="M5,40 Q-50,60 -120,55" stroke="#38bdf8" strokeWidth="1" opacity="0.6" fill="none" />
            <path d="M45,40 Q100,60 140,55" stroke="#38bdf8" strokeWidth="1" opacity="0.6" fill="none" />
          </g>

          {/* Ground Steppe Line */}
          <rect x="0" y="200" width="400" height="40" fill="#0b1329" />
          <text x="18" y="28" fill="#38bdf8" fontSize="12" fontWeight="bold" letterSpacing="1">419,7 МЕТР • ГИННЕСС РЕКОРДЫ</text>
        </svg>
      );

    case 'pshembayev-monument':
      return (
        <svg viewBox="0 0 400 240" className={`rounded-xl overflow-hidden ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pshSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#064e3b" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="saltGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#pshSky)" />

          {/* Steppe Hills */}
          <path d="M0,150 Q100,120 200,145 T400,140 L400,240 L0,240 Z" fill="#042f2e" />
          <path d="M0,175 Q150,155 260,180 T400,170 L400,240 L0,240 Z" fill="#022c22" />

          {/* The Discovery Symbol: The Mound with Two Blocks of Salt («Екі бас тұз») */}
          <g transform="translate(60, 130)">
            <path d="M-20,35 Q10,15 40,35 Z" fill="#134e4a" />
            {/* Salt block 1 */}
            <polygon points="5,15 18,8 24,20 10,25" fill="url(#saltGrad)" stroke="#f8fafc" strokeWidth="1" />
            {/* Salt block 2 */}
            <polygon points="18,12 32,5 36,18 22,23" fill="url(#saltGrad)" stroke="#f8fafc" strokeWidth="1" />
            {/* Glimmer */}
            <circle cx="20" cy="10" r="1.5" fill="#fef08a" />
            <text x="-15" y="48" fill="#34d399" fontSize="9" fontWeight="bold">«ЕКІ БАС ТҰЗ» (1886)</text>
          </g>

          {/* Kosym Pshembayev Monument (Bronze on Granite Pedestal) */}
          <g transform="translate(240, 50)">
            {/* Monument Pedestal */}
            <polygon points="20,155 70,155 65,115 25,115" fill="#334155" stroke="#64748b" strokeWidth="2" />
            <rect x="15" y="152" width="60" height="10" fill="#1e293b" />

            {/* Bronze Statue of Kosym Pshembayev sitting thoughtfully holding the mineral sample */}
            {/* Torso & Traditional Shapan */}
            <path d="M35,65 Q45,55 55,65 L60,115 L30,115 Z" fill="#d97706" stroke="#b45309" strokeWidth="2" />
            {/* Head & Borik / Hat */}
            <circle cx="45" cy="45" r="9" fill="#d97706" />
            <path d="M36,43 Q45,34 54,43 Z" fill="#92400e" stroke="#b45309" strokeWidth="1" />
            {/* Beard */}
            <polygon points="41,49 49,49 45,56" fill="#fef3c7" />
            {/* Arm holding coal specimen */}
            <path d="M50,75 L68,85 L64,95" stroke="#b45309" strokeWidth="4" strokeLinecap="round" fill="none" />
            {/* The Coal Specimen in hand */}
            <circle cx="68" cy="85" r="5" fill="#09090b" stroke="#f59e0b" strokeWidth="1.5" />
            {/* Staff / Prospector rod in left hand */}
            <line x1="32" y1="70" x2="26" y2="120" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* Sunburst / Dawn on Saryarka */}
          <circle cx="285" cy="40" r="30" fill="#f59e0b" opacity="0.15" />
          <text x="18" y="28" fill="#34d399" fontSize="12" fontWeight="bold" letterSpacing="1">1886 • ҚОСЫМ ПІШЕНБАЕВ МҰРАСЫ</text>
        </svg>
      );

    case 'shakhter-palace':
      return (
        <svg viewBox="0 0 400 240" className={`rounded-xl overflow-hidden ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="palaceSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4c0519" />
              <stop offset="60%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="colGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#palaceSky)" />

          {/* Classical 1957 Palace of Culture Building */}
          <g transform="translate(50, 45)">
            {/* Main Attic & Pediment (Фронтон) */}
            <polygon points="150,15 40,55 260,55" fill="#881337" stroke="#fb7185" strokeWidth="2" />
            {/* Tympanum Emblem / Lyre of Art & Crossed Hammers */}
            <circle cx="150" cy="40" r="10" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />

            {/* Entablature */}
            <rect x="35" y="55" width="230" height="12" fill="#be123c" rx="1" />

            {/* Rear wall of portico */}
            <rect x="45" y="67" width="210" height="95" fill="#4c0519" />
            {/* Main entry grand portal */}
            <path d="M135,162 L135,100 Q150,90 165,100 L165,162 Z" fill="#18181b" stroke="#fbbf24" strokeWidth="2" />
            {/* Side decorative windows */}
            <rect x="75" y="100" width="20" height="35" rx="3" fill="#fbbf24" opacity="0.6" />
            <rect x="205" y="100" width="20" height="35" rx="3" fill="#fbbf24" opacity="0.6" />

            {/* Grand Classical Colonnade (8 Columns) */}
            {[52, 78, 104, 130, 170, 196, 222, 248].map((x, i) => (
              <g key={i}>
                {/* Capital */}
                <rect x={x - 4} y="67" width="14" height="6" fill="url(#colGrad)" rx="1" />
                {/* Column shaft */}
                <rect x={x - 2} y="73" width="10" height="85" fill="url(#colGrad)" />
                {/* Base */}
                <rect x={x - 4} y="158" width="14" height="4" fill="url(#colGrad)" />
              </g>
            ))}

            {/* Broad Monumental Steps (Стилобат) */}
            <rect x="20" y="162" width="260" height="8" fill="#64748b" />
            <rect x="10" y="170" width="280" height="8" fill="#475569" />
            <rect x="0" y="178" width="300" height="8" fill="#334155" />
          </g>

          {/* Plaza Lanterns */}
          <line x1="30" y1="180" x2="30" y2="230" stroke="#cbd5e1" strokeWidth="3" />
          <circle cx="30" cy="180" r="5" fill="#fbbf24" />
          <line x1="370" y1="180" x2="370" y2="230" stroke="#cbd5e1" strokeWidth="3" />
          <circle cx="370" cy="180" r="5" fill="#fbbf24" />

          <text x="18" y="28" fill="#fb7185" fontSize="12" fontWeight="bold" letterSpacing="1">1957 • «ШАХТЕР» МӘДЕНИЕТ САРАЙЫ</text>
        </svg>
      );

    case 'museum-lore':
      return (
        <svg viewBox="0 0 400 240" className={`rounded-xl overflow-hidden ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="musSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2e1065" />
              <stop offset="60%" stopColor="#1e1b4b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#musSky)" />

          {/* Museum Showcase Elements */}
          {/* Ancient Mammoth Tusk arc */}
          <path d="M40,160 Q80,70 150,90" stroke="#fde047" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.9" />
          <text x="50" y="180" fill="#a78bfa" fontSize="9" fontWeight="bold">ПАЛЕОНТОЛОГИЯ (МАМОНТ)</text>

          {/* Kazakh Yurt Roof / Shanyraq Silhouette */}
          <g transform="translate(260, 90)">
            <circle cx="50" cy="50" r="38" stroke="#c084fc" strokeWidth="3" fill="#3b0764" />
            <circle cx="50" cy="50" r="18" stroke="#fbbf24" strokeWidth="2" fill="none" />
            {/* Kuladurs / crossbars */}
            <line x1="50" y1="12" x2="50" y2="88" stroke="#fbbf24" strokeWidth="1.5" />
            <line x1="12" y1="50" x2="88" y2="50" stroke="#fbbf24" strokeWidth="1.5" />
            <line x1="23" y1="23" x2="77" y2="77" stroke="#fbbf24" strokeWidth="1.5" />
            <line x1="77" y1="23" x2="23" y2="77" stroke="#fbbf24" strokeWidth="1.5" />
            <text x="12" y="105" fill="#c084fc" fontSize="9" fontWeight="bold">ЭТНОГРАФИЯ (ШАҢЫРАҚ)</text>
          </g>

          {/* Ancient Fern in Carboniferous Stone */}
          <g transform="translate(140, 120)">
            <polygon points="30,0 70,10 80,45 40,55 10,35" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />
            <path d="M45,10 Q45,35 45,50" stroke="#34d399" strokeWidth="2" />
            <line x1="45" y1="20" x2="35" y2="15" stroke="#34d399" strokeWidth="1.5" />
            <line x1="45" y1="20" x2="55" y2="15" stroke="#34d399" strokeWidth="1.5" />
            <line x1="45" y1="30" x2="33" y2="25" stroke="#34d399" strokeWidth="1.5" />
            <line x1="45" y1="30" x2="57" y2="25" stroke="#34d399" strokeWidth="1.5" />
          </g>

          {/* Museum Glass Showcase Base */}
          <rect x="20" y="200" width="360" height="25" fill="#1e1b4b" stroke="#a78bfa" strokeWidth="1" rx="4" />
          <text x="18" y="28" fill="#c084fc" fontSize="12" fontWeight="bold" letterSpacing="1">1987 • 30 000+ ЖӘДІГЕР САҚТАЛҒАН</text>
        </svg>
      );

    case 'city-history-monuments':
      return (
        <svg viewBox="0 0 400 240" className={`rounded-xl overflow-hidden ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="citySky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="60%" stopColor="#172554" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#citySky)" />

          {/* City Grand Mosque Silhouette (with 4 Minarets) */}
          <g transform="translate(40, 70)">
            {/* Central Dome */}
            <ellipse cx="60" cy="55" rx="30" ry="25" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="60" cy="27" r="3" fill="#facc15" />
            {/* Mosque main hall */}
            <rect x="30" y="55" width="60" height="55" fill="#1e293b" />
            {/* 4 Minarets */}
            <polygon points="12,110 18,110 16,10 14,10" fill="#0369a1" />
            <polygon points="102,110 108,110 106,10 104,10" fill="#0369a1" />
            <polygon points="26,110 30,110 29,25 27,25" fill="#0284c7" />
            <polygon points="90,110 94,110 93,25 91,25" fill="#0284c7" />
          </g>

          {/* Eternal Flame Obelisk (Мәңгілік Алау) */}
          <g transform="translate(190, 60)">
            {/* Tall granite obelisk */}
            <polygon points="20,130 30,130 26,10 24,10" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1" />
            {/* Red Star pedestal at the base */}
            <polygon points="25,120 28,126 35,127 30,132 31,139 25,135 19,139 20,132 15,127 22,126" fill="#ef4444" />
            {/* The Eternal Flame */}
            <path d="M25,122 Q23,115 25,110 Q28,116 25,122 Z" fill="#f59e0b" className="animate-pulse" />
            <path d="M25,122 Q24,117 25,114 Q26,118 25,122 Z" fill="#ef4444" />
          </g>

          {/* Orthodox Cathedral Golden Dome Silhouette */}
          <g transform="translate(270, 75)">
            <ellipse cx="50" cy="50" rx="22" ry="26" fill="#eab308" stroke="#facc15" strokeWidth="2" />
            <line x1="50" y1="16" x2="50" y2="24" stroke="#facc15" strokeWidth="2" />
            <line x1="46" y1="20" x2="54" y2="20" stroke="#facc15" strokeWidth="2" />
            <rect x="30" y="50" width="40" height="60" fill="#1e293b" />
          </g>

          {/* Paved City Square */}
          <rect x="0" y="190" width="400" height="50" fill="#0f172a" />
          <line x1="0" y1="190" x2="400" y2="190" stroke="#38bdf8" strokeWidth="2" opacity="0.4" />
          <text x="18" y="28" fill="#60a5fa" fontSize="12" fontWeight="bold" letterSpacing="1">1957 • ҚАЛА МӘРТЕБЕСІ МЕН СӘУЛЕТІ</text>
        </svg>
      );

    case 'miners-glory-alley':
      return (
        <svg viewBox="0 0 400 240" className={`rounded-xl overflow-hidden ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="glorySky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#431407" />
              <stop offset="60%" stopColor="#1c1917" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#glorySky)" />

          {/* Authentic Real Heavy Rotary Bucket on Pedestal */}
          <g transform="translate(60, 60)">
            <rect x="10" y="120" width="110" height="15" fill="#334155" rx="2" />
            {/* The Massive Bucket Shell */}
            <path d="M25,120 C15,70 45,40 90,45 L105,75 C80,75 55,90 50,120 Z" fill="#ea580c" stroke="#f97316" strokeWidth="3" />
            {/* Bucket teeth */}
            <polygon points="88,43 98,30 104,45" fill="#facc15" />
            <polygon points="98,52 108,39 114,54" fill="#facc15" />
            <polygon points="105,65 118,55 120,70" fill="#facc15" />
            <text x="25" y="148" fill="#fb923c" fontSize="9" fontWeight="bold">ЭКСКАВАТОР ШӨМІШІ</text>
          </g>

          {/* Massive BelAZ Dump Truck Wheel */}
          <g transform="translate(220, 60)">
            <rect x="10" y="120" width="70" height="15" fill="#334155" rx="2" />
            {/* The 3-meter wheel */}
            <circle cx="45" cy="75" r="42" fill="#18181b" stroke="#71717a" strokeWidth="6" />
            {/* Tread pattern */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
              <line
                key={i}
                x1="45"
                y1="34"
                x2="45"
                y2="42"
                stroke="#52525b"
                strokeWidth="4"
                transform={`rotate(${deg} 45 75)`}
              />
            ))}
            <circle cx="45" cy="75" r="16" fill="#eab308" stroke="#ca8a04" strokeWidth="2" />
            <text x="8" y="148" fill="#fb923c" fontSize="9" fontWeight="bold">БелАЗ ДӨҢГЕЛЕГІ</text>
          </g>

          {/* Stele to Heroes of Socialist Labor */}
          <g transform="translate(330, 70)">
            <polygon points="10,120 25,120 22,20 13,20" fill="#d97706" stroke="#fbbf24" strokeWidth="1" />
            <circle cx="17" cy="40" r="4" fill="#fef08a" />
          </g>

          {/* Boulevard Pavers */}
          <rect x="0" y="195" width="400" height="45" fill="#1c1917" />
          <line x1="0" y1="195" x2="400" y2="195" stroke="#f97316" strokeWidth="2" opacity="0.5" />
          <text x="18" y="28" fill="#fb923c" fontSize="12" fontWeight="bold" letterSpacing="1">АШЫҚ АСПАН АСТЫНДАҒЫ МҰРАЖАЙ</text>
        </svg>
      );

    case 'bukhar-zhyrau-library':
      return (
        <svg viewBox="0 0 400 240" className={`rounded-xl overflow-hidden ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="libSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#134e4a" />
              <stop offset="60%" stopColor="#0f172a" />
              <stop offset="100%" stopColor="#022c22" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#libSky)" />

          {/* Stylized Open Book of Wisdom */}
          <g transform="translate(100, 50)">
            {/* Book Pages */}
            <path d="M100,120 C60,110 20,115 5,125 L10,50 C25,40 65,35 100,45 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" />
            <path d="M100,120 C140,110 180,115 195,125 L190,50 C175,40 135,35 100,45 Z" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
            {/* Text lines shimmer */}
            <line x1="25" y1="65" x2="85" y2="60" stroke="#0d9488" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="25" y1="78" x2="85" y2="73" stroke="#0d9488" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="25" y1="91" x2="85" y2="86" stroke="#0d9488" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="115" y1="60" x2="175" y2="65" stroke="#0d9488" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="115" y1="73" x2="175" y2="78" stroke="#0d9488" strokeWidth="2" strokeDasharray="6 4" />
            <line x1="115" y1="86" x2="175" y2="91" stroke="#0d9488" strokeWidth="2" strokeDasharray="6 4" />

            {/* Glowing Golden Quill (Қалам) */}
            <path d="M100,45 Q120,20 145,5" stroke="#facc15" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="100" cy="45" r="3" fill="#facc15" />
          </g>

          {/* Portrait of Bukhar Zhyrau silhouette or traditional ornamentation */}
          <g transform="translate(20, 70)">
            <circle cx="35" cy="35" r="28" fill="#042f2e" stroke="#2dd4bf" strokeWidth="2" />
            <text x="18" y="40" fill="#2dd4bf" fontSize="10" fontWeight="bold">БҰҚАР</text>
            <text x="15" y="52" fill="#5eead4" fontSize="9">ЖЫРАУ</text>
          </g>

          {/* Bookstacks / Shelves */}
          <rect x="20" y="190" width="360" height="30" fill="#042f2e" stroke="#0f766e" strokeWidth="1" rx="3" />
          <text x="18" y="28" fill="#2dd4bf" fontSize="12" fontWeight="bold" letterSpacing="1">150 000+ КІТАП • РУХАНИЯТ ОРДАСЫ</text>
        </svg>
      );

    case 'ekibastuz-park':
      return (
        <svg viewBox="0 0 400 240" className={`rounded-xl overflow-hidden ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="parkSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14532d" />
              <stop offset="50%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#parkSky)" />

          {/* Giant Ferris Wheel (Шолу дөңгелегі) */}
          <g transform="translate(260, 40)">
            {/* Support legs */}
            <line x1="70" y1="75" x2="40" y2="160" stroke="#84cc16" strokeWidth="3" />
            <line x1="70" y1="75" x2="100" y2="160" stroke="#84cc16" strokeWidth="3" />

            {/* Wheel rings */}
            <circle cx="70" cy="75" r="55" stroke="#a3e635" strokeWidth="3" fill="none" />
            <circle cx="70" cy="75" r="35" stroke="#65a30d" strokeWidth="1.5" fill="none" />

            {/* Spokes */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
              <g key={i}>
                <line
                  x1="70"
                  y1="75"
                  x2="70"
                  y2="20"
                  stroke="#bef264"
                  strokeWidth="1.5"
                  transform={`rotate(${deg} 70 75)`}
                />
                {/* Cabins */}
                <rect
                  x="66"
                  y="15"
                  width="8"
                  height="8"
                  fill="#facc15"
                  rx="2"
                  transform={`rotate(${deg} 70 75)`}
                />
              </g>
            ))}
            <circle cx="70" cy="75" r="6" fill="#facc15" />
          </g>

          {/* Lush Greenery / Trees */}
          <g transform="translate(20, 110)">
            {/* Tree 1 */}
            <polygon points="40,20 20,60 60,60" fill="#22c55e" />
            <polygon points="40,40 15,80 65,80" fill="#16a34a" />
            <rect x="36" y="80" width="8" height="20" fill="#78350f" />

            {/* Tree 2 (Poplar) */}
            <ellipse cx="85" cy="50" rx="18" ry="35" fill="#4ade80" />
            <rect x="82" y="80" width="6" height="20" fill="#78350f" />

            {/* Tree 3 */}
            <ellipse cx="130" cy="55" rx="22" ry="30" fill="#15803d" />
            <rect x="127" y="80" width="6" height="20" fill="#78350f" />

            {/* Dancing Fountain */}
            <path d="M190,95 Q180,50 170,75" stroke="#38bdf8" strokeWidth="2" fill="none" />
            <path d="M190,95 Q190,40 190,70" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
            <path d="M190,95 Q200,50 210,75" stroke="#38bdf8" strokeWidth="2" fill="none" />
            <ellipse cx="190" cy="98" rx="25" ry="6" fill="#0284c7" />
          </g>

          {/* Park Walkway */}
          <rect x="0" y="200" width="400" height="40" fill="#052e16" />
          <text x="18" y="28" fill="#a3e635" fontSize="12" fontWeight="bold" letterSpacing="1">ЖАСЫЛ ОАЗИС • ШОЛУ ДӨҢГЕЛЕГІ</text>
        </svg>
      );

    case 'voskresenka-railway':
    default:
      return (
        <svg viewBox="0 0 400 240" className={`rounded-xl overflow-hidden ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="railSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#713f12" />
              <stop offset="60%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#railSky)" />

          {/* First Stone Station Building 1899 */}
          <g transform="translate(30, 80)">
            <rect x="0" y="30" width="110" height="50" fill="#78350f" stroke="#d97706" strokeWidth="1" />
            <polygon points="55,5 -10,30 120,30" fill="#451a03" />
            <rect x="40" y="48" width="30" height="32" fill="#1c1917" />
            <rect x="15" y="45" width="16" height="20" fill="#fbbf24" opacity="0.7" />
            <rect x="80" y="45" width="16" height="20" fill="#fbbf24" opacity="0.7" />
            <text x="12" y="25" fill="#fef08a" fontSize="8" fontWeight="bold">ЕКІБАСТҰЗ (1899)</text>
          </g>

          {/* Historic Steam Locomotive (Паровоз) on pedestal */}
          <g transform="translate(170, 75)">
            {/* Steam plume */}
            <circle cx="50" cy="15" r="14" fill="#cbd5e1" opacity="0.6" />
            <circle cx="35" cy="5" r="18" fill="#e2e8f0" opacity="0.5" />
            <circle cx="15" cy="-5" r="22" fill="#f8fafc" opacity="0.4" />

            {/* Cab */}
            <rect x="110" y="25" width="45" height="50" fill="#1c1917" stroke="#ca8a04" strokeWidth="1.5" />
            <rect x="120" y="32" width="16" height="16" fill="#facc15" opacity="0.8" />

            {/* Boiler */}
            <rect x="40" y="40" width="75" height="35" rx="4" fill="#09090b" stroke="#71717a" strokeWidth="1" />

            {/* Smokestack */}
            <rect x="48" y="22" width="12" height="20" fill="#27272a" />
            <polygon points="44,22 64,22 58,16 50,16" fill="#18181b" />

            {/* Headlamp */}
            <polygon points="30,42 40,40 40,55 30,52" fill="#eab308" />
            {/* Light beam */}
            <polygon points="30,45 0,30 0,65 30,50" fill="#fef08a" opacity="0.25" />

            {/* Cowcatcher */}
            <polygon points="25,75 40,55 40,75" fill="#ca8a04" />

            {/* Large Driving Wheels */}
            <circle cx="60" cy="78" r="14" fill="#18181b" stroke="#eab308" strokeWidth="2" />
            <circle cx="90" cy="78" r="14" fill="#18181b" stroke="#eab308" strokeWidth="2" />
            <circle cx="120" cy="78" r="14" fill="#18181b" stroke="#eab308" strokeWidth="2" />
            <line x1="60" y1="78" x2="120" y2="78" stroke="#facc15" strokeWidth="3" />
          </g>

          {/* The 1899 Railway Tracks leading to the Irtysh river */}
          <g transform="translate(0, 170)">
            {/* Sleepers */}
            {[10, 40, 70, 100, 130, 160, 190, 220, 250, 280, 310, 340, 370].map((x, i) => (
              <line key={i} x1={x} y1="10" x2={x + 15} y2="50" stroke="#78350f" strokeWidth="4" />
            ))}
            {/* Rails */}
            <line x1="0" y1="20" x2="400" y2="20" stroke="#94a3b8" strokeWidth="3" />
            <line x1="0" y1="36" x2="400" y2="36" stroke="#94a3b8" strokeWidth="3" />
          </g>

          <text x="18" y="28" fill="#facc15" fontSize="12" fontWeight="bold" letterSpacing="1">1899 • 116 ШАҚЫРЫМДЫҚ ТҰҢҒЫШ МАГИСТРАЛЬ</text>
        </svg>
      );
  }
};
