import { FaSpotify } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { CiBellOn } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PiHouseThin } from "react-icons/pi";
import { BsInboxes } from "react-icons/bs";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import "./style.css";

export const Sidebar: React.FC = (): React.ReactNode => {
  return (
    <nav className="flex h-max items-center justify-between w-full p-1 px-4">
      <div className="w-[72px]">
        <FaSpotify className="text-white text-3xl cursor-pointer" />
      </div>
      <div className="flex items-center gap-3 cursor-pointer">
        <span className="bg-[#1F1F1F] flex items-center rounded-full w-max h-max p-3 hover:scale-105 cursor-pointer transition-transform duration-300">
          <PiHouseThin className="text-white text-2xl" />
        </span>
        <div className="bg-[#1F1F1F] hover:bg-[#272727] hover:border-gray-200 flex items-center rounded-full w-[400px] h-max p-1">
          <span className="text-white p-2">
            <CiSearch className="text-2xl text-gray-300 hover:text-white" />
          </span>
          <Input
            type="search"
            placeholder="O que você quer ouvir?"
            className="border-none bg-transparent text-white placeholder-white outline-none focus:outline-none focus:ring-0 focus:border-none w-full cursor-pointer"
          />
          <span className="w-[1px] h-[25px] bg-white"></span>
          <span className="text-[#8d8d8d] p-2 ">
            <BsInboxes className="text-[#8d8d8d] text-2xl" />
          </span>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex gap-1 items-center cursor-pointer hover:scale-105 transition-transform duration-300">
          <FaRegArrowAltCircleDown className="text-white text-2x1" />
          <p className="text-[0.8rem] spotify-font-bold">Instalar aplicativo</p>
        </div>
        <CiBellOn className="text-gray-300 hover:text-white cursor-pointer text-2xl" />
        <div className="p-2 bg-[#1F1F1F] rounded-full hover:scale-105 cursor-pointer transition-transform duration-300">
          <Avatar className="w-[34px] h-[34px]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  );
};
