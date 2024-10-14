"use client";

import { Footer } from "./components/footer";
import { Main } from "./components/main";
import { Sidebar } from "./components/sidebar";
import YourLibrary from "./components/your-library";
import "./style.css";

export const SpotifyLayout: React.FC = (): React.ReactNode => {
  return (
    <div className="h-[100dvh]">
      <Sidebar />
      <div className="w-full h-[calc(100dvh-138px)] grid grid-cols-[min-content_auto] bg-black">
        <YourLibrary />
        <Main />
      </div>
      <Footer />
    </div>
  );
};
