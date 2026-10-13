import React from 'react';
import { Landmark } from '../types/chronicle';
import { Flame, Compass, Sparkles, Award, MapPin, ArrowDown, BookOpen, QrCode } from 'lucide-react';

interface HeroBannerProps {
  lang: 'kk' | 'ru' | 'en';
  onExploreClick: () => void;
  onMapClick: () => void;
  onQrClick?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ lang, onExploreClick, onMapClick, onQrClick }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-slate-800 p-6 sm:p-10 lg:p-14 shadow-2xl">
      {/* Background radial atmosphere */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      {/* Decorative Steppe Silhouette subtle grid */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
        {/* Top Tagline */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold text-xs tracking-wider uppercase animate-in fade-in">
          <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
          <span>{lang === 'kk' ? 'Қазақстанның энергетикалық жүрегі' : lang === 'ru' ? 'Энергетическое сердце Казахстана' : 'The Energy Capital of Kazakhstan'}</span>
        </div>

        {/* Grand Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          {lang === 'kk' ? (
            <>
              ЕКІБАСТҰЗДЫҢ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                ЦИФРЛЫҚ ШЕЖІРЕСІ
              </span>
            </>
          ) : lang === 'ru' ? (
            <>
              ЦИФРОВАЯ ЛЕТОПИСЬ <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                ГОРОДА ЭКИБАСТУЗ
              </span>
            </>
          ) : (
            <>
              DIGITAL CHRONICLE OF <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">
                EKIBASTUZ CITY
              </span>
            </>
          )}
        </h1>

        {/* Narrative Lead */}
        <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {lang === 'kk'
            ? '1886 жылғы Қосым Пішенбаевтың «екі бас тұз» қойып ашқан кенішінен, Гиннесс рекордын орнатқан алып «Богатырь» көмір разрезіне, әлемдегі ең биік 419,7 метрлік ГРЭС мұржасына және рухани мәдени орталықтарына дейінгі 10 басты тарихи мұраның толық шежіресі.'
            : lang === 'ru'
            ? 'Полная интерактивная летопись 10 ключевых объектов: от открытия угля Косымом Пшембаевым в 1886 году и разреза «Богатырь» до высочайшей в мире трубы ГРЭС-2 и богатейшего культурного наследия.'
            : 'Interactive chronicle detailing all 10 foundational landmarks: from the 1886 coal discovery by Kosym Pshembayev to the world-record Bogatyr mine, the 419.7 m GRES-2 chimney, and cultural icons.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onExploreClick}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-extrabold text-sm shadow-xl shadow-amber-500/20 transition-all hover:scale-105"
          >
            <BookOpen className="w-4 h-4" />
            <span>{lang === 'kk' ? '10 Тарихи нысанды шолу' : lang === 'ru' ? '10 Достояний города' : 'Explore 10 Landmarks'}</span>
          </button>

          <button
            onClick={onMapClick}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 hover:border-amber-500/50 transition-all shadow-lg"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>{lang === 'kk' ? 'Интерактивті карта' : lang === 'ru' ? 'Интерактивная карта' : 'Interactive Map'}</span>
          </button>

          {onQrClick && (
            <button
              onClick={onQrClick}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-amber-400 font-bold text-sm border border-amber-500/30 hover:border-amber-400 transition-all shadow-lg"
            >
              <QrCode className="w-4 h-4" />
              <span>QR-код (Мобильді гид)</span>
            </button>
          )}
        </div>

        {/* Metric Badges Strip */}
        <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-left">
          <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
            <div className="text-xl sm:text-2xl font-black text-amber-400">1886 ж.</div>
            <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">
              {lang === 'kk' ? 'Қосым Пішенбаев көмірді ашты' : 'Открытие угля'}
            </div>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
            <div className="text-xl sm:text-2xl font-black text-amber-400">56,8 млн т</div>
            <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">
              {lang === 'kk' ? '«Богатырь» Гиннесс рекорды' : 'Рекорд разреза «Богатырь»'}
            </div>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
            <div className="text-xl sm:text-2xl font-black text-amber-400">419,7 м</div>
            <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">
              {lang === 'kk' ? 'Әлемдегі ең биік мұржа (ГРЭС-2)' : 'Высочайшая труба в мире'}
            </div>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80">
            <div className="text-xl sm:text-2xl font-black text-amber-400">30 000+</div>
            <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">
              {lang === 'kk' ? 'Мұражай жәдігерлері қоры' : 'Экспонатов в музее'}
            </div>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80 col-span-2 sm:col-span-1">
            <div className="text-xl sm:text-2xl font-black text-amber-400">116 км</div>
            <div className="text-[11px] text-slate-400 mt-0.5 leading-tight">
              {lang === 'kk' ? '1899 ж. Ертіске шыққан шойын жол' : 'Первая дорога 1899 г.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
