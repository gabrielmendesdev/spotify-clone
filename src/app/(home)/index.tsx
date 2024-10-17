"use client";

import { useMobile } from "@/context/ViewportContext";
import { Footer } from "./components/footer";
import { Main } from "./components/main";
import { Sidebar } from "./components/sidebar";
import YourLibrary from "./components/your-library";
import "./style.css";

export const SpotifyLayout: React.FC = (): React.ReactNode => {
  const { isMobile } = useMobile();

  return (
    <div className="h-[100dvh] relative">
      <Sidebar />
      <div
        className={`w-full  grid ${isMobile ? "h-[calc(100dvh)] relative" : "grid-cols-[min-content_auto] h-[calc(100dvh-138px)]"} bg-black`}
      >
        <YourLibrary />
        <Main />
      </div>
      <Footer />
    </div>
  );
};
