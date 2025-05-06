/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';

type SidebarContextType = {
  isExpanded: boolean;
  toggleExpanded: () => void;
};

export const SidebarContext = createContext<SidebarContextType | null>(null);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context)
    throw new Error('useSidebar must be used within a SidebarProvider');
  return context;
};

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleExpanded }}>
      {children}
    </SidebarContext.Provider>
  );
};
