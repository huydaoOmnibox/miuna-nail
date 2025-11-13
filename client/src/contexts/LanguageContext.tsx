import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'de' | 'en';

interface LanguageContextType {
  currentLanguage: Language;
  setCurrentLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

const LANGUAGE_STORAGE_KEY = 'nails-language';

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [currentLanguage, setCurrentLanguageState] = useState<Language>('de');

  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null;
    if (savedLanguage === 'de' || savedLanguage === 'en') {
      setCurrentLanguageState(savedLanguage);
    }
  }, []);

  const setCurrentLanguage = (language: Language) => {
    setCurrentLanguageState(language);
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 
