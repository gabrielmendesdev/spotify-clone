import { Slider } from "@/components/ui/slider";
import { CurrentMusic } from "@/service/CurrentMusicModel";
import { formatTime } from "@/utils/formating/formatTime";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
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

  return (
    <div className="grid grid-cols-3 items-center p-3 gap-3 col-span-2 row-start-2">
      <div className="flex items-center gap-3">
        {currentMusic?.image && (
          <Image
            src={currentMusic.image}
            width={56}
            height={56}
            alt="Album Image"
          />
        )}
        <div>
          <p className="spotify-font-bold text-[0.75rem] text-[#fff]">
            {currentMusic?.name}
          </p>
          <p className="text-[0.65rem] text-gray-300">{currentMusic?.band}</p>
        </div>
        <FaCircleCheck />
      </div>
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
      <div className="w-full flex justify-end items-center gap-3">
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
              <div>
                <BsFullscreenExit className="text-[#b3b3b3] text-lg cursor-pointer hover:text-[white] hover:scale-105 transition-transform duration-300" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tela cheia</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};
