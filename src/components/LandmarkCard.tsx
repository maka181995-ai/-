import React from 'react';
import { Landmark } from '../types/chronicle';
import { LandmarkIllustration } from './LandmarkIllustration';
import { Volume2, VolumeX, ArrowRight, Calendar, MapPin, Award, QrCode } from 'lucide-react';
import { soundscape } from '../utils/audioSynth';

interface LandmarkCardProps {
  landmark: Landmark;
  onOpenModal: (landmark: Landmark) => void;
  lang: 'kk' | 'ru' | 'en';
  isAudioPlaying: boolean;
  onToggleAudio: (landmark: Landmark) => void;
  onOpenQr?: (landmark: Landmark) => void;
}

export const LandmarkCard: React.FC<LandmarkCardProps> = ({
  landmark,
  onOpenModal,
  lang,
  isAudioPlaying,
  onToggleAudio,
  onOpenQr,
}) => {
  const getTitle = () => {
    if (lang === 'ru') return landmark.titleRu;
    if (lang === 'en') return landmark.titleEn;
    return landmark.titleKk;
  };

  const getSubtitle = () => {
    if (lang === 'ru') return landmark.subtitleRu;
    if (lang === 'en') return landmark.subtitleEn;
    return landmark.subtitleKk;
  };

  const getSummary = () => {
    if (lang === 'ru') return landmark.shortSummaryRu;
    if (lang === 'en') return landmark.shortSummaryEn;
    return landmark.shortSummaryKk;
  };

  const getCategoryLabel = () => {
    if (lang === 'ru') return landmark.categoryLabelRu;
    if (lang === 'en') return landmark.categoryLabelEn;
    return landmark.categoryLabelKk;
  };

  const getSoundLabel = () => {
    if (lang === 'ru') return landmark.soundLabelRu;
    if (lang === 'en') return landmark.soundLabelEn;
    return landmark.soundLabelKk;
  };

  return (
    <div className="group relative bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col overflow-hidden">
      {/* Top Media Area with Photo or Illustration */}
      <div className="relative overflow-hidden cursor-pointer" onClick={() => onOpenModal(landmark)}>
        {landmark.photoUrl ? (
          <img
            src={landmark.photoUrl}
            alt={getTitle()}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        ) : (
          <LandmarkIllustration landmarkId={landmark.id} className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-amber-500 text-black font-extrabold flex items-center justify-center text-sm shadow-lg">
            {landmark.number < 10 ? `0${landmark.number}` : landmark.number}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-amber-400 font-bold text-xs border border-amber-500/30">
            {getCategoryLabel()}
          </span>
        </div>

        {landmark.badge && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-amber-300 font-extrabold text-[10px] tracking-wider border border-amber-400/40">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{landmark.badge}</span>
          </div>
        )}

        {/* Audio atmosphere trigger on thumbnail */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleAudio(landmark);
          }}
          className={`absolute bottom-3 right-3 p-2.5 rounded-xl backdrop-blur-md transition-all shadow-lg flex items-center gap-1.5 text-xs font-semibold ${
            isAudioPlaying
              ? 'bg-amber-500 text-black shadow-amber-500/30 animate-pulse'
              : 'bg-black/70 hover:bg-black/90 text-slate-200 border border-slate-700 hover:text-amber-400'
          }`}
          title={getSoundLabel()}
        >
          {isAudioPlaying ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span className="hidden sm:inline">Дыбысты өшіру</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Атмосфера</span>
            </>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata info */}
          <div className="flex items-center gap-4 text-xs text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              {landmark.yearEstablished} жыл
            </span>
            <span className="flex items-center gap-1 truncate max-w-[180px]">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {lang === 'ru' ? landmark.addressRu : landmark.addressKk}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenModal(landmark)}
            className="text-lg md:text-xl font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer leading-snug"
          >
            {getTitle()}
          </h3>

          {/* Subtitle */}
          <p className="text-xs font-medium text-amber-400/90 mt-1 line-clamp-1">
            {getSubtitle()}
          </p>

          {/* Short Narrative */}
          <p className="text-xs md:text-sm text-slate-300 mt-2.5 line-clamp-3 leading-relaxed">
            {getSummary()}
          </p>
        </div>

        {/* Bottom Action Footer */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {onOpenQr && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenQr(landmark);
                }}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 border border-slate-700/80 transition-colors"
                title="QR-код алу"
              >
                <QrCode className="w-3.5 h-3.5" />
              </button>
            )}
            <span className="text-xs text-slate-400">
              <span className="text-amber-400 font-semibold">{landmark.keyFactsKk.length}</span> {lang === 'kk' ? 'дерек' : 'фактов'}
            </span>
          </div>

          <button
            onClick={() => onOpenModal(landmark)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-amber-500 text-slate-200 hover:text-black text-xs font-bold transition-all group/btn"
          >
            <span>{lang === 'kk' ? 'Толығырақ' : lang === 'ru' ? 'Подробнее' : 'Explore'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
