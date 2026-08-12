"use client"
import type { MetaphoricalCard } from "./metaphorical-cards-data"

export function MetaphoricalCardSVG({ card }: { card: MetaphoricalCard }) {
  const c = card.color
  return (
    <svg viewBox="0 0 200 280" className="w-full h-full">
      <defs>
        <radialGradient id="mak-bg" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor={c} stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#0a0510" stopOpacity="1"/>
        </radialGradient>
      </defs>
      <rect width="200" height="280" fill="url(#mak-bg)" rx="12"/>
      <rect x="6" y="6" width="188" height="268" fill="none" stroke={c} strokeWidth="1" strokeOpacity="0.3" rx="8"/>
      <CardArt id={card.id} color={c} emoji={card.emoji}/>
      <text x="100" y="255" fontSize="11" textAnchor="middle" fill={c} opacity="0.8" fontWeight="bold">{card.name}</text>
    </svg>
  )
}

function CardArt({ id, color, emoji }: { id: number; color: string; emoji: string }) {
  const c = color
  const sw = 2

  switch(id) {
    case 1: // Семена
      return <g>
        <path d="M 100 200 Q 100 170 100 150" fill="none" stroke="#2d6e2d" strokeWidth="2"/>
        <path d="M 100 150 Q 90 140 85 145 Q 88 155 100 150" fill="rgba(74,222,128,0.3)" stroke="#2d6e2d" strokeWidth="1"/>
        <path d="M 100 150 Q 110 140 115 145 Q 112 155 100 150" fill="rgba(74,222,128,0.3)" stroke="#2d6e2d" strokeWidth="1"/>
        <ellipse cx="100" cy="200" rx="30" ry="10" fill="rgba(120,80,40,0.3)"/>
        {[85,100,115,92,108].map((x,i)=>(<circle key={i} cx={x} cy={205+(i%2)*7} r="3" fill="rgba(180,140,70,0.5)" stroke="#8b5a2b" strokeWidth="0.5"/>))}
      </g>
    case 2: // Лестница
      return <g>
        {[0,1,2,3,4].map(i=>(<g key={i}>
          <line x1={70+i*12} y1={210-i*25} x2={130+i*12} y2={210-i*25} stroke={c} strokeWidth="3" opacity="0.7"/>
          <line x1={70+i*12} y1={210-i*25} x2={70+i*12} y2={210-(i+1)*25} stroke={c} strokeWidth="2" opacity="0.5"/>
          <line x1={130+i*12} y1={210-i*25} x2={130+i*12} y2={210-(i+1)*25} stroke={c} strokeWidth="2" opacity="0.5"/>
        </g>))}
        <circle cx="100" cy="60" r="8" fill="none" stroke={c} strokeWidth={sw} opacity="0.6"/>
        <circle cx="100" cy="60" r="3" fill={c} opacity="0.5"/>
      </g>
    case 3: // Ключ
      return <g>
        <circle cx="100" cy="100" r="22" fill="none" stroke={c} strokeWidth="4"/>
        <circle cx="100" cy="100" r="14" fill="none" stroke={c} strokeWidth="2" opacity="0.5"/>
        <circle cx="100" cy="100" r="5" fill={c} opacity="0.3"/>
        <rect x="96" y="120" width="8" height="80" fill={c} opacity="0.6" rx="2"/>
        <rect x="96" y="160" width="16" height="6" fill={c} opacity="0.6" rx="1"/>
        <rect x="96" y="175" width="12" height="5" fill={c} opacity="0.6" rx="1"/>
        <rect x="96" y="188" width="18" height="5" fill={c} opacity="0.6" rx="1"/>
      </g>
    case 4: // Мост
      return <g>
        <path d="M 20 200 L 50 150 Q 100 130 150 150 L 180 200" fill="none" stroke={c} strokeWidth="3" opacity="0.7"/>
        <line x1="50" y1="150" x2="50" y2="200" stroke={c} strokeWidth="2" opacity="0.5"/>
        <line x1="150" y1="150" x2="150" y2="200" stroke={c} strokeWidth="2" opacity="0.5"/>
        <line x1="20" y1="200" x2="180" y2="200" stroke={c} strokeWidth="2" opacity="0.4"/>
      </g>
    case 5: // Зеркало
      return <g>
        <ellipse cx="100" cy="130" rx="35" ry="55" fill="rgba(192,192,192,0.1)" stroke={c} strokeWidth="2.5"/>
        <ellipse cx="100" cy="130" rx="28" ry="48" fill="rgba(255,255,255,0.05)" stroke={c} strokeWidth="1" opacity="0.5"/>
        <line x1="100" y1="190" x2="100" y2="210" stroke={c} strokeWidth="3"/>
        <path d="M 85 210 Q 100 215 115 210" fill="none" stroke={c} strokeWidth="3"/>
      </g>
    case 6: // Компас
      return <g>
        <circle cx="100" cy="140" r="40" fill="none" stroke={c} strokeWidth="3"/>
        {Array.from({length:12}).map((_,i)=>{const a=(i/12)*Math.PI*2;return <line key={i} x1={100+Math.cos(a)*32} y1={140+Math.sin(a)*32} x2={100+Math.cos(a)*40} y2={140+Math.sin(a)*40} stroke={c} strokeWidth="1" opacity="0.5"/>})}
        <path d="M 100 105 L 105 140 L 100 175 L 95 140 Z" fill={c} opacity="0.3" stroke={c} strokeWidth="1"/>
        <circle cx="100" cy="140" r="3" fill={c}/>
      </g>
    case 7: // Корни
      return <g>
        <path d="M 100 80 L 100 120" fill="none" stroke="#8b5a2b" strokeWidth="5" strokeLinecap="round"/>
        <path d="M 100 120 Q 80 140 60 180" fill="none" stroke="#8b5a2b" strokeWidth="3" strokeLinecap="round"/>
        <path d="M 100 120 Q 120 140 140 180" fill="none" stroke="#8b5a2b" strokeWidth="3" strokeLinecap="round"/>
        <path d="M 100 120 Q 90 150 80 190" fill="none" stroke="#8b5a2b" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
        <path d="M 100 120 Q 110 150 120 190" fill="none" stroke="#8b5a2b" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
        <path d="M 100 120 L 100 200" stroke="#8b5a2b" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
      </g>
    case 8: // Крылья
      return <g>
        <path d="M 100 140 Q 60 100 30 120 Q 50 130 40 150 Q 60 140 55 165 Q 75 150 70 175 Q 90 160 100 180" fill="rgba(167,139,250,0.12)" stroke={c} strokeWidth="1.5" opacity="0.7"/>
        <path d="M 100 140 Q 140 100 170 120 Q 150 130 160 150 Q 140 140 145 165 Q 125 150 130 175 Q 110 160 100 180" fill="rgba(167,139,250,0.12)" stroke={c} strokeWidth="1.5" opacity="0.7"/>
      </g>
    case 9: // Якорь
      return <g>
        <circle cx="100" cy="80" r="12" fill="none" stroke={c} strokeWidth="3"/>
        <line x1="100" y1="92" x2="100" y2="190" stroke={c} strokeWidth="3"/>
        <line x1="75" y1="110" x2="125" y2="110" stroke={c} strokeWidth="3"/>
        <path d="M 65 170 Q 65 195 100 200 Q 135 195 135 170" fill="none" stroke={c} strokeWidth="3"/>
      </g>
    case 10: // Фонарь
      return <g>
        <line x1="100" y1="50" x2="100" y2="70" stroke={c} strokeWidth="2"/>
        <rect x="85" y="75" width="30" height="50" rx="4" fill="rgba(255,200,80,0.15)" stroke={c} strokeWidth="2"/>
        <circle cx="100" cy="100" r="12" fill="rgba(255,215,0,0.3)"/>
        <circle cx="100" cy="100" r="6" fill="rgba(255,235,150,0.5)"/>
        <line x1="100" y1="130" x2="100" y2="145" stroke={c} strokeWidth="2"/>
        <circle cx="100" cy="148" r="2" fill={c}/>
      </g>
    case 11: // Дверь
      return <g>
        <rect x="70" y="60" width="60" height="160" rx="4" fill="rgba(139,92,246,0.1)" stroke={c} strokeWidth="2.5"/>
        <circle cx="120" cy="140" r="3" fill={c} opacity="0.6"/>
      </g>
    case 12: // Птица
      return <g>
        <path d="M 60 120 Q 80 100 100 110 Q 120 100 140 120 Q 130 130 100 135 Q 70 130 60 120 Z" fill="rgba(96,165,250,0.15)" stroke={c} strokeWidth="1.5"/>
        <circle cx="103" cy="108" r="1.5" fill={c}/>
        <path d="M 60 120 Q 40 110 30 120 Q 45 125 60 120" fill="rgba(96,165,250,0.12)" stroke={c} strokeWidth="1" opacity="0.6"/>
        <path d="M 140 120 Q 160 110 170 120 Q 155 125 140 120" fill="rgba(96,165,250,0.12)" stroke={c} strokeWidth="1" opacity="0.6"/>
      </g>
    case 13: // Колокол
      return <g>
        <path d="M 80 70 Q 80 140 70 160 L 130 160 Q 120 140 120 70 Q 100 65 80 70 Z" fill="rgba(251,191,36,0.12)" stroke={c} strokeWidth="2.5"/>
        <ellipse cx="100" cy="160" rx="32" ry="5" fill={c} opacity="0.3"/>
        <circle cx="100" cy="168" r="5" fill={c} opacity="0.5"/>
      </g>
    case 14: // Река
      return <g>
        {[100,120,140,160,180,200].map((y,i)=>(<path key={i} d={`M 20 ${y} Q 60 ${y-10} 100 ${y} Q 140 ${y+10} 180 ${y}`} fill="none" stroke={c} strokeWidth="2.5" opacity={0.7-i*0.07}/>))}
      </g>
    case 15: // Гора
      return <g>
        <path d="M 20 200 L 70 80 L 100 140 L 130 60 L 180 200 Z" fill="rgba(120,113,108,0.15)" stroke={c} strokeWidth="2" opacity="0.7"/>
        <path d="M 70 80 L 80 100 L 90 95 L 100 110" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
        <path d="M 130 60 L 140 85 L 150 80" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5"/>
      </g>
    case 16: // Сердце
      return <g>
        <path d="M 100 190 Q 50 150 50 110 Q 50 80 75 80 Q 90 80 100 100 Q 110 80 125 80 Q 150 80 150 110 Q 150 150 100 190 Z" fill="rgba(239,68,68,0.12)" stroke={c} strokeWidth="2.5"/>
      </g>
    case 17: // Часы
      return <g>
        <circle cx="100" cy="140" r="45" fill="rgba(245,158,11,0.08)" stroke={c} strokeWidth="3"/>
        {Array.from({length:12}).map((_,i)=>{const a=(i/12)*Math.PI*2-Math.PI/2;return <line key={i} x1={100+Math.cos(a)*35} y1={140+Math.sin(a)*35} x2={100+Math.cos(a)*42} y2={140+Math.sin(a)*42} stroke={c} strokeWidth="1.5" opacity="0.6"/>})}
        <line x1="100" y1="140" x2="100" y2="110" stroke={c} strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="100" y1="140" x2="125" y2="140" stroke={c} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="100" cy="140" r="3" fill={c}/>
      </g>
    case 18: // Спираль
      return <g>
        <path d="M 100 140 Q 110 140 110 130 Q 110 115 95 115 Q 75 115 75 140 Q 75 170 110 170 Q 150 170 150 130 Q 150 85 100 85 Q 40 85 40 145 Q 40 215 110 215" fill="none" stroke={c} strokeWidth="2.5" opacity="0.6"/>
        <circle cx="100" cy="140" r="3" fill={c}/>
      </g>
    case 19: // Кристалл
      return <g>
        <path d="M 100 60 L 70 100 L 80 180 L 120 180 L 130 100 Z" fill="rgba(34,211,238,0.08)" stroke={c} strokeWidth="2" opacity="0.7"/>
        <line x1="70" y1="100" x2="130" y2="100" stroke={c} strokeWidth="1.5" opacity="0.5"/>
        <line x1="100" y1="60" x2="100" y2="180" stroke={c} strokeWidth="1" opacity="0.4"/>
      </g>
    case 20: // Книга
      return <g>
        <path d="M 60 70 L 60 200 L 100 210 L 140 200 L 140 70 L 100 80 Z" fill="rgba(139,92,246,0.08)" stroke={c} strokeWidth="2" opacity="0.7"/>
        <line x1="100" y1="80" x2="100" y2="210" stroke={c} strokeWidth="1.5" opacity="0.5"/>
      </g>
    default:
      // Для карт 21-52 — крупный эмодзи
      return <text x="100" y="155" fontSize="64" textAnchor="middle">{emoji}</text>
  }
}
