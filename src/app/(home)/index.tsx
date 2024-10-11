"use client";

import { Footer } from "./components/footer";
import { Main } from "./components/main";
import { Sidebar } from "./components/sidebar";
import YourLibrary from "./components/your-library";
import "./style.css";

export const SpotifyLayout: React.FC = (): React.ReactNode => {
  return (
    <div className="h-[100dvh] grid grid-rows-12">
      <Sidebar />
      <div className="w-full h-screen grid grid-cols-[min-content_auto] grid-rows-[5fr_1fr] bg-black col-row-11">
        <YourLibrary />
        <Main />
        <Footer />
      </div>
    </div>
  );
};
