import { useState, useEffect, useRef } from "react";
import { IoLibrarySharp } from "react-icons/io5";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoMdAdd } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { LibraryService } from "@/service/library/LibraryModel";
import Image from "next/image";
import { BiSolidVolumeFull } from "react-icons/bi";
import { MyLibraryPlaylists, Playlist } from "@/service/library/LibraryService";

const [minWidth, maxWidth, defaultWidth] = [280, 500, 350];

export default function YourLibrary() {
  const [width, setWidth] = useState(defaultWidth);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState<number>(0);
  const isResized = useRef(false);

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      if (!isResized.current) {
        return;
      }

      setWidth((previousWidth) => {
        const newWidth = previousWidth + e.movementX / 2;

        const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;

        return isWidthInRange ? newWidth : previousWidth;
      });
    });

    window.addEventListener("mouseup", () => {
      isResized.current = false;
    });
  }, []);

  const getUserLibrary = async (): Promise<MyLibraryPlaylists> => {
    const response = await LibraryService.GetUserLibrary();
    return response;
  };

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const userLibrary = await getUserLibrary();
        setPlaylists(userLibrary.playlists);
      } catch (error) {
        console.error("Erro ao buscar a biblioteca do usuário:", error);
      }
    };

    fetchLibrary();
  }, []);

  const handlePlaylistClick = (index: number) => {
    setSelectedPlaylistIndex(index);
  };

  return (
    <div className="flex">
      <div style={{ width: `${width / 16}rem` }} className="bg-[#121212]">
        <header className="w-full flex items-center justify-between p-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex gap-2 cursor-pointer hover:text-white group">
                  <IoLibrarySharp className="text-[#b3b3b3] text-2xl group-hover:text-white" />
                  <p className="text-md spotify-font-black text-[#b3b3b3] group-hover:text-white">
                    Sua biblioteca
                  </p>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ocultar biblioteca</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex gap-2 hover:bg-gray-700 hover:bg-opacity-15 rounded-full cursor-pointer p-2">
                    <IoMdAdd className="text-[#b3b3b3] text-2xl group-hover:text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Criar playlist ou pasta</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex gap-2 hover:bg-gray-700 hover:bg-opacity-15 rounded-full p-2 cursor-pointer">
                    <FaArrowRight className="text-[#b3b3b3] text-lg group-hover:text-white" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Mostrar mais</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </header>
        <div className="w-full flex items-center justify-start p-4 gap-2">
          <Button
            type="button"
            className="rounded-xl spotify-font-bold bg-gray-500 bg-opacity-20 hover:bg-opacity-30 hover:bg-gray-400 text-[0.8rem]"
          >
            Playlists
          </Button>
          <Button
            type="button"
            className="rounded-xl spotify-font-bold bg-gray-500 bg-opacity-20 hover:bg-opacity-30 hover:bg-gray-400 text-[0.8rem]"
          >
            Artistas
          </Button>
          <Button
            type="button"
            className="rounded-xl spotify-font-bold bg-gray-500 bg-opacity-20 hover:bg-opacity-30 hover:bg-gray-400 text-[0.8rem]"
          >
            Álbuns
          </Button>
        </div>
        <div className="w-full flex flex-col items-center justify-start p-4">
          {playlists.length > 0 &&
            playlists.map((playlist, index) => (
              <div
                key={index}
                className={`w-full flex items-center justify-start gap-2 cursor-pointer hover:bg-gray-500 hover:bg-opacity-20 rounded-md p-2 ${selectedPlaylistIndex ? "hover:bg-gray-500" : ""}`}
                onClick={() => handlePlaylistClick(index)}
              >
                <Image
                  src={playlist.coverImage}
                  width={48}
                  height={48}
                  alt="Imagem de capa"
                  className="rounded-md"
                />
                <div>
                  <p
                    className={`text-[0.9rem] spotify-font-medium ${
                      index === selectedPlaylistIndex ? "text-green-500" : ""
                    }`}
                  >
                    {playlist.name}
                  </p>
                  <p className="text-[0.75rem] text-gray-300">
                    {playlist.description}
                  </p>
                </div>
                {index === selectedPlaylistIndex && (
                  <BiSolidVolumeFull className="text-green-500 text-lg ml-auto" />
                )}
              </div>
            ))}
        </div>
      </div>
      <div
        className="w-2 cursor-col-resize"
        onMouseDown={() => {
          isResized.current = true;
        }}
      />
    </div>
  );
}
