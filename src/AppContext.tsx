import { createContext, useContext, ReactNode, useState } from 'react';
import { CompanyData } from 'types/interfaces';

interface AppContextType {
  companyData: CompanyData;
  setCompanyData: (data: CompanyData) => void;
}



const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children, companyData }: { children: ReactNode, companyData: CompanyData }) {
  const [companyDataInfo, setCompanyDataInfo] = useState<CompanyData>(companyData);

  const value = {
    companyData: companyDataInfo,
    setCompanyData: setCompanyDataInfo,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}