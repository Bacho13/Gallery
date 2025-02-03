// ------------------------ მოდალური ფანჯრის დეტალების ინტერფეისი --------------------------//

export interface ModalDataProps {
  id: string;
  likes: number;
  description: string;

  urls: {
    small: string;
    full: string;
  };
}

// ------------------------ ფოტოს დეტალების ინტერფეისი --------------------------//

export interface PhotoStatistics {
  downloads: {
    total: number;
  };
  views: {
    total: number;
  };
}

//--- ინტერფეისი დასასერჩად გამოყენებული პროფსისთვის---
export interface InputLoggerProps {
  onSearch: (searchTerm: string) => void;
}

export interface SearchHistoryProps {
  history: string[];
  onSelect: (word: string) => void;
}
