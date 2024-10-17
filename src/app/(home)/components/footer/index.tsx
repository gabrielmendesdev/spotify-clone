import { Slider } from "@/components/ui/slider";
import { CurrentMusic } from "@/service/CurrentMusicModel";
import { formatTime } from "@/utils/formating/formatTime";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { IoIosPlayCircle } from "react-icons/io";
import { IoPauseCircleSharp } from "react-icons/io5";
import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";
import { SlLoop } from "react-icons/sl";
import { TiArrowShuffle } from "react-icons/ti";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { LuMic2 } from "react-icons/lu";
import { HiOutlineQueueList } from "react-icons/hi2";
import { PiDesktopTowerLight } from "react-icons/pi";
import { CiVolumeHigh, CiVolumeMute } from "react-icons/ci";
import { CgMiniPlayer } from "react-icons/cg";
import { BsFullscreenExit } from "react-icons/bs";
import { useMobile } from "@/context/ViewportContext";
import { FaCheckCircle, FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { RiSearch2Line } from "react-icons/ri";
import { RiSearch2Fill } from "react-icons/ri";
import { IoLibraryOutline } from "react-icons/io5";
import { IoLibrarySharp } from "react-icons/io5";
import { PiHouse } from "react-icons/pi";
import { PiHouseFill } from "react-icons/pi";

export const Footer: React.FC = () => {
  const [currentMusic, setCurrentMusic] = useState<CurrentMusic | undefined>();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [isRandom, setIsRandom] = useState<boolean>(false);

  const [lastVolume, setLastVolume] = useState<number>(100);
  const [volume, setVolume] = useState<number>(100);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { isLargeScreen, isMobile } = useMobile();

  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isClicked, setIsClicked] = useState<string | null>(null);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setIsClicked(item);

    setTimeout(() => {
      setIsClicked(null);
    }, 150);
  };

  useEffect(() => {
    // Define uma música mock como exemplo
    setCurrentMusic({
      image: "https://i.scdn.co/image/ab67616d00001e0241b247657afb83a4bbea0edc",
      name: "Só Fé",
      band: "Grelo",
      currentTime: "0",
      totalTime: "5:55",
    });

    // Inicializa o áudio
    audioRef.current = new Audio("/music/grelo-music.mp3");
    audioRef.current.addEventListener("loadedmetadata", () => {
      setDuration(audioRef.current!.duration);
    });

    audioRef.current.addEventListener("timeupdate", () => {
      setCurrentTime(audioRef.current!.currentTime);
    });

    // Limpeza ao desmontar o componente
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleSliderChange = (value: number[]) => {
    setCurrentTime(value[0]);
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleRandom = () => {
    setIsRandom(!isRandom);
  };

  const handleLoop = () => {
    setIsLoop(!isLoop);
    if (audioRef.current) {
      audioRef.current.loop = !isLoop;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (newVolume > 0) {
      setLastVolume(newVolume);
      setIsMuted(false);
    } else {
      setIsMuted(true);
    }
  };

  const toggleMute = () => {
    if (isMuted || volume === 0) {
      setVolume(lastVolume);
      setIsMuted(false);
    } else {
      setLastVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const toggleFullScreen = () => {
    const element = document.documentElement; // Seleciona o elemento root (html)

    if (!document.fullscreenElement) {
      // Entra no modo tela cheia
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (
        (element as HTMLElement & { mozRequestFullScreen?: () => void })
          .mozRequestFullScreen
      ) {
        // Para Firefox antigo
        (element as HTMLElement & { mozRequestFullScreen?: () => void })
          .mozRequestFullScreen!();
      } else if (
        (element as HTMLElement & { webkitRequestFullscreen?: () => void })
          .webkitRequestFullscreen
      ) {
        // Para Chrome, Safari e Opera antigos
        (element as HTMLElement & { webkitRequestFullscreen?: () => void })
          .webkitRequestFullscreen!();
      } else if (
        (element as HTMLElement & { msRequestFullscreen?: () => void })
          .msRequestFullscreen
      ) {
        // Para IE/Edge antigos
        (element as HTMLElement & { msRequestFullscreen?: () => void })
          .msRequestFullscreen!();
      }
    } else {
      // Sai do modo tela cheia
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (
        (document as Document & { mozCancelFullScreen?: () => void })
          .mozCancelFullScreen
      ) {
        // Para Firefox antigo
        (document as Document & { mozCancelFullScreen?: () => void })
          .mozCancelFullScreen!();
      } else if (
        (document as Document & { webkitExitFullscreen?: () => void })
          .webkitExitFullscreen
      ) {
        // Para Chrome, Safari e Opera antigos
        (document as Document & { webkitExitFullscreen?: () => void })
          .webkitExitFullscreen!();
      } else if (
        (document as Document & { msExitFullscreen?: () => void })
          .msExitFullscreen
      ) {
        // Para IE/Edge antigos
        (document as Document & { msExitFullscreen?: () => void })
          .msExitFullscreen!();
      }
    }
  };

  return (
    <div
      className={`${isMobile ? "grid-cols-2 bg-[#00000000] fixed bottom-0 w-full z-50 p-0" : "grid-cols-3"} items-center col-span-2 row-start-2`}
    >
      <div
        className={`grid ${isMobile ? "grid-cols-2 mx-3 bg-[#2c2c2c] p-2 rounded-lg pb-0" : "grid-cols-3 p-3"}`}
      >
        <div className="flex items-center gap-3">
          {currentMusic?.image && (
            <Image
              src={currentMusic.image}
              width={isMobile ? 38 : 56}
              height={isMobile ? 38 : 56}
              alt="Album Image"
            />
          )}
          <div>
            <p className="spotify-font-bold text-[0.75rem] text-[#fff]">
              {currentMusic?.name}
            </p>
            <p className="text-[0.65rem] text-gray-300">{currentMusic?.band}</p>
          </div>
        </div>
        {!isMobile && (
          <div className="flex-1 flex-col justify-center">
            <div className="w-full flex justify-center items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="relative flex flex-col items-center">
                      <TiArrowShuffle
                        onClick={handleRandom}
                        className={`${isRandom ? "text-green-500" : "text-[#b3b3b3] hover:text-[white]"} text-[1.2rem] cursor-pointer hover:scale-105 transition-transform duration-300`}
                      />
                      {isRandom && (
                        <span className="absolute bottom-[-5px] w-1 h-1 bg-green-500 rounded-full" />
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {isRandom
                        ? "Desativar a ordem aleatória"
                        : "Ativar a ordem aleatória"}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <BiSkipPrevious
                        className="text-[#b3b3b3] text-4xl cursor-pointer hover:text-[white]"
                        onClick={handlePrevious}
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Voltar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {isPlaying ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <IoPauseCircleSharp
                          className="text-white text-4xl cursor-pointer hover:scale-105 transition-transform duration-300 hover:text-[#b3b3b3]"
                          onClick={togglePlayPause}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Pausar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <IoIosPlayCircle
                          className="text-white text-4xl cursor-pointer hover:scale-105 transition-transform duration-300 hover:text-[#b3b3b3]"
                          onClick={togglePlayPause}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Play</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <BiSkipNext className="text-[#b3b3b3] text-4xl cursor-pointer hover:text-[white] hover:scale-105 transition-transform duration-300" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Avançar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="relative flex flex-col items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative flex flex-col items-center">
                        <SlLoop
                          onClick={handleLoop}
                          className={`${isLoop ? "text-green-500" : "text-[#b3b3b3] hover:text-[white]"} text-[1.2rem] cursor-pointer hover:scale-105 transition-transform duration-300`}
                        />
                        {isLoop && (
                          <span className="absolute bottom-[-5px] w-1 h-1 bg-green-500 rounded-full" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isLoop ? "Não repetir" : "Repetir"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <div className="w-full flex gap-1">
              <span className="text-white text-[0.65rem] w-[26px]">
                {formatTime(currentTime)}
              </span>
              <Slider
                value={[currentTime]}
                onValueChange={handleSliderChange}
                max={duration}
                step={1}
                className="w-full cursor-pointer"
              />
              <span className="text-white text-[0.65rem] w-[26px]">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        )}
        <div className="w-full flex justify-end items-center gap-3">
          {isLargeScreen && (
            <>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <AiOutlinePlaySquare className="text-[#b3b3b3] text-lg cursor-pointer hover:text-[white] hover:scale-105 transition-transform duration-300" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tela tocando agora</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div>
                <LuMic2 className="text-[#b3b3b381] text-[1rem] hover:text-[#838383] hover:scale-105 transition-transform duration-300 cursor-not-allowed" />
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <HiOutlineQueueList className="text-[#b3b3b3] text-lg cursor-pointer hover:text-[white] hover:scale-105 transition-transform duration-300" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Fila</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <PiDesktopTowerLight className="text-[#b3b3b3] text-lg cursor-pointer hover:text-[white] hover:scale-105 transition-transform duration-300" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Conectar dispositivo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
          {isMobile ? (
            <div className="flex justify-end items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <PiDesktopTowerLight className="text-[#b3b3b3] text-lg cursor-pointer hover:text-[white] hover:scale-105 transition-transform duration-300" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Conectar dispositivo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <FaCheckCircle className="text-green-500 text-lg cursor-pointer hover:scale-105 transition-transform duration-300" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Adicionar a playlist</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {isPlaying ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <FaPause
                          className="text-white text-lg cursor-pointer hover:scale-105 transition-transform duration-300 hover:text-[#b3b3b3]"
                          onClick={togglePlayPause}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Pausar</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <FaPlay
                          className="text-white text-[1rem] cursor-pointer hover:scale-105 transition-transform duration-300 hover:text-[#b3b3b3]"
                          onClick={togglePlayPause}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Play</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          ) : (
            <>
              <div className="w-max flex gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div onClick={toggleMute}>
                        {isMuted || volume === 0 ? (
                          <CiVolumeMute className="text-[#b3b3b3] text-lg cursor-pointer hover:text-[white] hover:scale-105 transition-transform duration-300" />
                        ) : (
                          <CiVolumeHigh className="text-[#b3b3b3] text-lg cursor-pointer hover:text-[white] hover:scale-105 transition-transform duration-300" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{isMuted || volume === 0 ? "Com som" : "Mudo"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Slider
                  value={[volume]}
                  onValueChange={handleVolumeChange}
                  max={100}
                  step={1}
                  className="w-[93px] cursor-pointer"
                />
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <CgMiniPlayer className="text-[#b3b3b3] text-lg cursor-pointer hover:text-[white] hover:scale-105 transition-transform duration-300" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Abrir miniplayer</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div onClick={toggleFullScreen}>
                      <BsFullscreenExit className="text-[#b3b3b3] text-lg cursor-pointer hover:text-[white] hover:scale-105 transition-transform duration-300" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tela cheia</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </>
          )}
        </div>
        {isMobile && (
          <div className="col-span-2 pt-2">
            <Slider
              value={[currentTime]}
              onValueChange={handleSliderChange}
              max={duration}
              step={1}
              className="w-full cursor-pointer"
            />
          </div>
        )}
      </div>

      {isMobile && (
        <div
          className="col-span-2 flex items-center justify-between gap-4 p-2 pb-1 px-20"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0))",
          }}
        >
          {/* Início */}
          <div
            className={`text-white cursor-pointer`}
            onClick={() => handleSelect("home")}
          >
            <div
              className={`transition-transform duration-150 ease-out transform ${
                isClicked === "home" ? "scale-95" : "scale-100"
              } hover:text-white`}
            >
              {selectedItem === "home" ? (
                <PiHouseFill className="text-2xl m-auto" />
              ) : (
                <PiHouse className="text-2xl m-auto" />
              )}
            </div>
            <p className="text-[0.6rem]">Início</p>
          </div>

          {/* Pesquisar */}
          <div
            className={`text-white cursor-pointer`}
            onClick={() => handleSelect("search")}
          >
            <div
              className={`transition-transform duration-150 ease-out transform ${
                isClicked === "search" ? "scale-95" : "scale-100"
              } hover:text-white`}
            >
              {selectedItem === "search" ? (
                <RiSearch2Fill className="text-2xl m-auto" />
              ) : (
                <RiSearch2Line className="text-2xl m-auto" />
              )}
            </div>
            <p className="text-[0.6rem]">Pesquisar</p>
          </div>

          {/* Biblioteca */}
          <div
            className={`text-white [#dfdfdf] cursor-pointer`}
            onClick={() => handleSelect("library")}
          >
            <div
              className={`transition-transform duration-150 ease-out transform ${
                isClicked === "library" ? "scale-95" : "scale-100"
              } hover:text-white`}
            >
              {selectedItem === "library" ? (
                <IoLibrarySharp className="text-2xl m-auto" />
              ) : (
                <IoLibraryOutline className="text-2xl m-auto" />
              )}
            </div>
            <p className="text-[0.6rem]">Sua biblioteca</p>
          </div>
        </div>
      )}
    </div>
  );
};
