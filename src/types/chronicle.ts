export type LandmarkCategory =
  | 'industry'
  | 'power'
  | 'personality'
  | 'culture'
  | 'museum'
  | 'heritage'
  | 'memorial'
  | 'park'
  | 'transport';

export interface Artifact {
  id: string;
  name: string;
  year: string;
  description: string;
  category: string;
  significance: string;
}

export interface SpecificationItem {
  label: string;
  value: string;
  unit?: string;
  highlight?: boolean;
}

export interface Landmark {
  id: string;
  number: number;
  titleKk: string;
  titleRu: string;
  titleEn: string;
  subtitleKk: string;
  subtitleRu: string;
  subtitleEn: string;
  category: LandmarkCategory;
  categoryLabelKk: string;
  categoryLabelRu: string;
  categoryLabelEn: string;
  yearEstablished: string;
  coordinates: {
    lat: number;
    lng: number;
    mapX: number; // 0-100% on regional schematic map
    mapY: number; // 0-100% on regional schematic map
  };
  addressKk: string;
  addressRu: string;
  badge: string;
  accentColor: string; // tailwind color class or hex
  shortSummaryKk: string;
  shortSummaryRu: string;
  shortSummaryEn: string;
  fullHistoryKk: string[];
  fullHistoryRu: string[];
  fullHistoryEn: string[];
  keyFactsKk: string[];
  keyFactsRu: string[];
  keyFactsEn: string[];
  specifications: SpecificationItem[];
  artifacts: Artifact[];
  historicalQuotes?: {
    author: string;
    role: string;
    text: string;
  }[];
  soundType: 'excavator' | 'turbine' | 'wind' | 'culture' | 'museum' | 'monument' | 'mine_glory' | 'library' | 'park' | 'steam_train';
  soundLabelKk: string;
  soundLabelRu: string;
  soundLabelEn: string;
  visualTheme: string;
  photoUrl?: string;
}

export interface TimelineEvent {
  year: number;
  exactDate?: string;
  titleKk: string;
  titleRu: string;
  titleEn: string;
  descriptionKk: string;
  descriptionRu: string;
  descriptionEn: string;
  landmarkId?: string;
  importance: 'major' | 'regular';
  tagKk: string;
}

export interface QuizQuestion {
  id: number;
  landmarkId: string;
  questionKk: string;
  questionRu: string;
  questionEn: string;
  optionsKk: string[];
  optionsRu: string[];
  optionsEn: string[];
  correctIndex: number;
  explanationKk: string;
  explanationRu: string;
  explanationEn: string;
  funFactKk: string;
}
