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
import Image from "next/image";
import { BiSolidVolumeFull } from "react-icons/bi";
import { IoList } from "react-icons/io5";
import { RiSearchLine } from "react-icons/ri";
import { BsList } from "react-icons/bs";
import { LuLayoutGrid } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import "./style.css";
import { LibrarySkeleton } from "./components/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Playlist, MyLibraryPlaylists } from "@/service/library/LibraryModel";
import { LibraryService } from "@/service/library/LibraryService";
import { useMobile } from "@/context/ViewportContext";

const [minWidth, maxWidth, defaultWidth] = [90, 800, 350];

export default function YourLibrary() {
  const [width, setWidth] = useState(defaultWidth);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylistIndex, setSelectedPlaylistIndex] = useState<number>(0);
  const isResized = useRef(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { isMobile, isTablet } = useMobile();

  useEffect(() => {
    // Handle resizing
    const handleMouseMove = (e: MouseEvent) => {
      if (isTablet || !isResized.current) {
        return;
      }

      setWidth((previousWidth) => {
        const newWidth = previousWidth + e.movementX / 2;

        // Primeira lógica: de 90px para 280px
        if (newWidth < 280 && previousWidth > 90) {
          return 90; // Trava em 90px se diminuir para menos de 280px
        }
        if (previousWidth === 90 && newWidth > 90) {
          return 280; // Aumenta diretamente para 280px se estiver aumentando a partir de 90px
        }

        // Segunda lógica: de 420px para 584px
        if (newWidth < 420 && previousWidth > 420) {
          return 420; // Trava em 420px se diminuir para menos de 420px
        }
        if (previousWidth === 420 && newWidth > 420) {
          return 584; // Aumenta diretamente para 584px se estiver aumentando a partir de 420px
        }

        // Checa se o novo width está dentro do intervalo permitido
        const isWidthInRange = newWidth >= minWidth && newWidth <= maxWidth;

        return isWidthInRange ? newWidth : previousWidth;
      });
    };

    const handleMouseUp = () => {
      isResized.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isTablet]);

  const getUserLibrary = async (): Promise<MyLibraryPlaylists> => {
    const response = await LibraryService.GetUserLibrary();
    return response;
  };

  useEffect(() => {
    // Fetch user's playlists
    const fetchLibrary = async () => {
      setIsLoading(true);
      try {
        const userLibrary = await getUserLibrary();
        setPlaylists(userLibrary.playlists);
      } catch (error) {
        console.error("Erro ao buscar a biblioteca do usuário:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLibrary();
  }, []);

  const handlePlaylistClick = (index: number) => {
    setSelectedPlaylistIndex(index);
  };

  useEffect(() => {
    if (isTablet) {
      setWidth(90);
    }
  }, [isTablet]);

  return (
    <div className={`flex h-full ${isMobile && "hidden"}`}>
      <div style={{ width: `${width / 16}rem` }} className="bg-[#121212] flex">
        <div className="flex flex-col w-full">
          <header className="w-full flex items-center justify-between p-4">
            {width >= 280 ? (
              <>
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
              </>
            ) : (
              <IoLibrarySharp className="text-[#b3b3b3] text-2xl group-hover:text-white m-auto" />
            )}
          </header>
          {width >= 280 && (
            <div className="w-full flex items-center justify-start p-3 gap-2">
              <Button
                type="button"
                className="rounded-xl spotify-font-bold bg-gray-500 bg-opacity-20 hover:bg-opacity-30 hover:bg-gray-400 text-[0.8rem] p-2 py-1"
              >
                Playlists
              </Button>
              <Button
                type="button"
                className="rounded-xl spotify-font-bold bg-gray-500 bg-opacity-20 hover:bg-opacity-30 hover:bg-gray-400 text-[0.8rem] p-2 py-1"
              >
                Artistas
              </Button>
              <Button
                type="button"
                className="rounded-xl spotify-font-bold bg-gray-500 bg-opacity-20 hover:bg-opacity-30 hover:bg-gray-400 text-[0.8rem] p-2 py-1"
              >
                Álbuns
              </Button>
            </div>
          )}

          {width >= 280 && (
            <div className="w-full flex items-center justify-between p-2 gap-2">
              <div className="flex gap-2 hover:bg-gray-600 hover:bg-opacity-20 rounded-full cursor-pointer p-2">
                <RiSearchLine className="text-[#b3b3b3] text-lg group-hover:text-white" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-300 flex items-center gap-2 hover:bg-transparent hover:text-white hover:scale-105 cursor-pointer transition-transform duration-300"
                  >
                    Recentes <IoList className="text-lg" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 text-[#dddddd] bg-[#353535] border-0 gap-3">
                  <DropdownMenuLabel className="spotify-font-bold text-[0.7rem]">
                    Classificar por
                  </DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="spotify-font-regular cursor-pointer">
                      <span>Recentes</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="spotify-font-regular cursor-pointer">
                      <span>Adicionados recentemente</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="spotify-font-regular cursor-pointer">
                      <span>Ordem alfabética</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="spotify-font-regular cursor-pointer">
                      <span>Criador</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator className="h-[1px] opacity-15" />
                  <DropdownMenuLabel className="spotify-font-bold text-[0.7rem]">
                    Ver como
                  </DropdownMenuLabel>
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="spotify-font-regular cursor-pointer flex gap-1">
                      <BsList className="text-lg" />
                      <span>Compacto</span>
                    </DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuItem className="spotify-font-regular cursor-pointer flex gap-1">
                        <IoList className="text-lg" />
                        <span>Lista</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="spotify-font-regular cursor-pointer flex gap-1">
                        <LuLayoutGrid className="text-lg" />
                        <span>Grade</span>
                      </DropdownMenuItem>
                    </DropdownMenuSub>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          <div className="flex-grow overflow-hidden relative px-3">
            <div className="absolute inset-0 overflow-y-hidden p-2 hover:overflow-y-scroll scroll-container">
              {isLoading ? (
                <LibrarySkeleton width={width} />
              ) : (
                playlists.length > 0 && (
                  <Table>
                    {/* Renderiza o TableHeader e as colunas de "Data de edição" e "Você ouviu" apenas quando width >= 584 */}
                    {width >= 584 && (
                      <TableHeader className="mb-2 hover:bg-transparent">
                        <TableRow className="border-b-[1px] border-opacity-20 border-b-gray-400">
                          <TableHead className="text-left text-[0.65rem] spotify-font-bold">
                            Título
                          </TableHead>
                          <TableHead className="text-left text-[0.65rem] spotify-font-bold">
                            Data de edição
                          </TableHead>
                          <TableHead className="text-right text-[0.65rem] spotify-font-bold">
                            Você ouviu
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                    )}

                    <TableBody>
                      {playlists.map((playlist, index) => (
                        <TableRow
                          key={index}
                          className={`border-none cursor-pointer hover:bg-gray-500 hover:bg-opacity-20 rounded-md ${
                            selectedPlaylistIndex === index
                              ? "bg-gray-500 bg-opacity-20"
                              : ""
                          }`}
                          onClick={() => handlePlaylistClick(index)}
                        >
                          <TableCell className="flex items-center gap-2 p-2 rounded-md">
                            <Image
                              src={playlist.coverImage}
                              width={48}
                              height={48}
                              alt="Imagem de capa"
                              className="rounded-md"
                            />
                            {width > 280 && (
                              <>
                                <div>
                                  <p
                                    className={`text-[0.9rem] spotify-font-medium ${
                                      index === selectedPlaylistIndex
                                        ? "text-green-500"
                                        : ""
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
                              </>
                            )}
                          </TableCell>

                          {width >= 584 && (
                            <>
                              <TableCell>
                                <p className="text-[0.75rem] text-gray-300">
                                  {playlist.editedAt}
                                </p>
                              </TableCell>
                              <TableCell>
                                {playlist.lastHeard ? (
                                  <p className="text-[0.75rem] text-end text-gray-300">
                                    {playlist.lastHeard}
                                  </p>
                                ) : (
                                  <span className="text-gray-300">Não</span>
                                )}
                              </TableCell>
                            </>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-1 cursor-col-resize bg-transparent hover:bg-gray-700"
        onMouseDown={() => {
          isResized.current = true; // Ativa o redimensionamento
        }}
        onMouseUp={() => {
          isResized.current = false; // Garante que seja desativado ao soltar o mouse
        }}
      />
    </div>
  );
}
