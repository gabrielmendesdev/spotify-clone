"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

type MobileContextType = {
  isMobile: boolean;
  isTablet: boolean;
  isLargeScreen: boolean;
};

const MobileContext = createContext<MobileContextType | undefined>(undefined);

export const useMobile: () => MobileContextType = (): MobileContextType => {
  const context = useContext(MobileContext);
  if (!context) {
    throw new Error("useMobile must be used within a MobileProvider");
  }
  return context;
};

type MobileProviderProps = {
  children: ReactNode;
};

export function MobileProvider({ children }: MobileProviderProps) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isTablet, setIsTablet] = useState<boolean | null>(null);
  const [isLargeScreen, setIsLargeScreen] = useState<boolean | null>(null);

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
      setIsLargeScreen(window.innerWidth > 1024);
    };

    handleWindowSizeChange(); // Set initial values
    window.addEventListener("resize", handleWindowSizeChange);

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  if (isMobile === null || isTablet === null || isLargeScreen === null) {
    // Exibe um fallback ou nada enquanto o estado não é inicializado
    return null;
  }

  return (
    <MobileContext.Provider value={{ isMobile, isTablet, isLargeScreen }}>
      {children}
    </MobileContext.Provider>
  );
}
