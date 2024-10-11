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

export const Footer: React.FC = () => {
  const [currentMusic, setCurrentMusic] = useState<CurrentMusic | undefined>();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [isRandom, setIsRandom] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Define uma música mock como exemplo
    setCurrentMusic({
      image: "https://i.scdn.co/image/ab67616d0000485126f20b4d67c0c7b0f137ce4f",
      name: "Solway Firth",
      band: "Slipknot",
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

  return (
    <div className="grid grid-cols-3 items-center p-3 gap-3">
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
          <div className="relative flex flex-col items-center">
            <TiArrowShuffle
              onClick={handleRandom}
              className={`${isRandom ? "text-green-500" : "text-[#b3b3b3] hover:text-[white]"} text-[1.2rem] cursor-pointer hover:scale-105 transition-transform duration-300`}
            />
            {isRandom && (
              <span className="absolute bottom-[-5px] w-1 h-1 bg-green-500 rounded-full" />
            )}
          </div>
          <BiSkipPrevious
            className="text-[#b3b3b3] text-4xl cursor-pointer hover:text-[white]"
            onClick={handlePrevious}
          />
          {isPlaying ? (
            <IoPauseCircleSharp
              className="text-white text-4xl cursor-pointer hover:scale-105 transition-transform duration-300 hover:text-[#b3b3b3]"
              onClick={togglePlayPause}
            />
          ) : (
            <IoIosPlayCircle
              className="text-white text-4xl cursor-pointer hover:scale-105 transition-transform duration-300 hover:text-[#b3b3b3]"
              onClick={togglePlayPause}
            />
          )}
          <BiSkipNext className="text-[#b3b3b3] text-4xl cursor-pointer hover:text-[white] hover:scale-105 transition-transform duration-300" />
          <div className="relative flex flex-col items-center">
            <SlLoop
              onClick={handleLoop}
              className={`${isLoop ? "text-green-500" : "text-[#b3b3b3] hover:text-[white]"} text-[1.2rem] cursor-pointer hover:scale-105 transition-transform duration-300`}
            />
            {isLoop && (
              <span className="absolute bottom-[-5px] w-1 h-1 bg-green-500 rounded-full" />
            )}
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
            className="w-full text-white"
          />
          <span className="text-white text-[0.65rem] w-[26px]">
            {formatTime(duration)}
          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
};
