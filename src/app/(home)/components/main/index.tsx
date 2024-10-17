/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import "./style.css";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { IoIosPlayCircle } from "react-icons/io";
import {
  Playlist,
  MyLibraryPlaylists,
  MusicRecommendation,
  MusicRecommendations,
} from "@/service/library/LibraryModel";
import { LibraryService } from "@/service/library/LibraryService";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner";
import { useMobile } from "@/context/ViewportContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaPlay } from "react-icons/fa";

export const Main: React.FC = (): React.ReactNode => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [recommendations, setRecommendations] = useState<MusicRecommendation[]>(
    [],
  );
  const [columns, setColumns] = useState<number>(4);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { isLargeScreen, isMobile, isTablet } = useMobile();

  const getUserLibrary = async (): Promise<MyLibraryPlaylists> => {
    const response = await LibraryService.GetUserLibrary();
    return response;
  };

  const getUserRecommendations = async (): Promise<MusicRecommendations> => {
    const response = await LibraryService.GetUserRecommendations();
    return response;
  };

  useEffect(() => {
    // Função para ajustar o número de colunas com base na largura do componente pai
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (width < 860) {
          setColumns(2); // Usa 2 colunas se a largura for menor que 860px
        } else {
          setColumns(4); // Usa 4 colunas se a largura for maior ou igual a 860px
        }
      }
    };

    const observer = new ResizeObserver(handleResize);

    // Verifica se o container existe e começa a observar seu tamanho
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Cleanup: Remove o observador ao desmontar o componente
    return () => {
      if (containerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        const userLibrary = await getUserRecommendations();
        setRecommendations(userLibrary.recommendations);
      } catch (error) {
        console.error("Erro ao buscar a biblioteca do usuário:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const [backgroundAtivo, setBackgroundAtivo] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (divRef.current !== null) {
      const scrollTop = divRef.current.scrollTop;

      if (scrollTop > 0) {
        setBackgroundAtivo(true);
      } else {
        setBackgroundAtivo(false);
      }
    }
  };

  return isLoading ? (
    <div className="bg-[#121212] overflow-y-auto flex items-center justify-center">
      <Spinner className="text-white" />
    </div>
  ) : (
    <div
      className="overflow-y-auto"
      onScroll={handleScroll}
      ref={divRef}
      style={{
        backgroundColor: "#121212",
        backgroundImage: "linear-gradient(to bottom, #2e2e2e, #121212)",
        backgroundSize: "100% 200px",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className={`w-full flex items-center justify-start p-3 gap-2 fixed transition-all duration-300 z-20 ${
          backgroundAtivo ? "bg-[#2e2e2e]" : ""
        }`}
      >
        <Button
          type="button"
          className="rounded-2xl spotify-font-bold bg-gray-500 bg-opacity-20 hover:bg-opacity-30 hover:bg-gray-400 text-[0.8rem] p-2"
        >
          Tudo
        </Button>
        <Button
          type="button"
          className="rounded-2xl spotify-font-bold bg-gray-500 bg-opacity-20 hover:bg-opacity-30 hover:bg-gray-400 text-[0.8rem] p-2 py-1"
        >
          Música
        </Button>
        <Button
          type="button"
          className="rounded-2xl spotify-font-bold bg-gray-500 bg-opacity-20 hover:bg-opacity-30 hover:bg-gray-400 text-[0.8rem] p-2 py-1"
        >
          Podcasts
        </Button>
      </div>
      <div
        className={`w-full grid grid-cols-1 px-4 gap-4 ${isMobile && "pb-[108px]"}`}
      >
        <div
          ref={containerRef} // Referência do contêiner sendo observada
          className={`w-full grid ${isMobile ? "grid-cols-2" : isTablet ? "grid-cols-3" : "grid-cols-4"} mt-[60px] gap-4`}
        >
          {playlists.length > 0 ? (
            playlists.slice(0, 8).map((playlist, index) => (
              <div
                key={index}
                className="flex bg-[#7c7c7c48] hover:bg-[#c7c7c72a] cursor-pointer rounded-md group"
              >
                <Image
                  src={playlist.coverImage || ""}
                  width={48}
                  height={48}
                  alt={`Album ${index + 1}`}
                />
                <div className="w-full flex items-center justify-between mx-3">
                  <p className="spotify-font-bold text-[0.9rem]">
                    {playlist.name}
                  </p>
                  <IoIosPlayCircle className="text-green-500 text-4xl cursor-pointer hover:scale-105 transition-transform duration-300 hover:text-[#b3b3b3] hidden group-hover:block" />
                </div>
              </div>
            ))
          ) : (
            <div>No playlists available</div>
          )}
        </div>
        <div className="w-full mb-2">
          <div className="w-full flex justify-between items-center text-white">
            <h1 className="spotify-font-bold text-2xl">
              Suas músicas estão com saudade
            </h1>
            <Link
              href={"#"}
              className="spotify-font-bold text-sm hover:border-b-2"
            >
              Mostrar tudo
            </Link>
          </div>

          <div className="w-full">
            {isMobile ? (
              <Swiper
                spaceBetween={10}
                slidesPerView={2.5} // Quantidade de slides visíveis por vez
                loop={true} // Swiper faz loop infinito
              >
                {recommendations.map((recommendation, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex flex-col p-2 rounded-md gap-2 cursor-pointer hover:bg-[#2e2e2e65]">
                      <Image
                        src={recommendation.coverImage}
                        width={200}
                        height={200}
                        sizes="(max-with: 160px) 100%"
                        style={{ objectFit: "cover" }}
                        alt={`Album ${index + 1}`}
                        className="rounded-md"
                      />
                      <p className="text-[0.75rem] text-gray-400 spotify-font-bold">
                        {recommendation.description.length > 42
                          ? `${recommendation.description.slice(0, 42)}...`
                          : recommendation.description}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="w-full grid grid-cols-7">
                {recommendations
                  .slice(0, isTablet ? 5 : recommendations.length)
                  .map((recommendation, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-2 rounded-md gap-2 cursor-pointer hover:bg-[#2e2e2e65] relative group"
                    >
                      <Image
                        src={recommendation.coverImage}
                        width={200}
                        height={200}
                        sizes="(max-with: 160px) 100%"
                        style={{ objectFit: "cover" }}
                        alt={`Album ${index + 1}`}
                        className="rounded-md"
                      />
                      <div className="cursor-pointer hover:scale-105 transition-all duration-500 ease-in-out absolute right-[17px] bottom-[60px] opacity-0 translate-y-3 scale-75 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 bg-[#54ff79] rounded-full p-2 flex items-center justify-center">
                        <FaPlay className="text-black text-lg " />
                      </div>

                      <p className="text-[0.75rem] text-gray-400 spotify-font-bold">
                        {recommendation.description.length > 42
                          ? `${recommendation.description.slice(0, 42)}...`
                          : recommendation.description}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-full mb-2">
          <div className="w-full flex justify-between items-center text-white">
            <h1 className="spotify-font-bold text-2xl">
              Suas músicas estão com saudade
            </h1>
            <Link
              href={"#"}
              className="spotify-font-bold text-sm hover:border-b-2"
            >
              Mostrar tudo
            </Link>
          </div>

          <div className="w-full">
            {isMobile ? (
              <Swiper
                spaceBetween={10}
                slidesPerView={2.5} // Quantidade de slides visíveis por vez
                loop={true} // Swiper faz loop infinito
              >
                {recommendations.map((recommendation, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex flex-col p-2 rounded-md gap-2 cursor-pointer hover:bg-[#2e2e2e65]">
                      <Image
                        src={recommendation.coverImage}
                        width={200}
                        height={200}
                        sizes="(max-with: 160px) 100%"
                        style={{ objectFit: "cover" }}
                        alt={`Album ${index + 1}`}
                        className="rounded-md"
                      />
                      <p className="text-[0.75rem] text-gray-400 spotify-font-bold">
                        {recommendation.description.length > 42
                          ? `${recommendation.description.slice(0, 42)}...`
                          : recommendation.description}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="w-full grid grid-cols-7">
                {recommendations
                  .slice(0, isTablet ? 5 : recommendations.length)
                  .map((recommendation, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-2 rounded-md gap-2 cursor-pointer hover:bg-[#2e2e2e65] relative group"
                    >
                      <Image
                        src={recommendation.coverImage}
                        width={200}
                        height={200}
                        sizes="(max-with: 160px) 100%"
                        style={{ objectFit: "cover" }}
                        alt={`Album ${index + 1}`}
                        className="rounded-md"
                      />
                      <div className="cursor-pointer hover:scale-105 transition-all duration-500 ease-in-out absolute right-[17px] bottom-[60px] opacity-0 translate-y-3 scale-75 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 bg-[#54ff79] rounded-full p-2 flex items-center justify-center">
                        <FaPlay className="text-black text-lg " />
                      </div>

                      <p className="text-[0.75rem] text-gray-400 spotify-font-bold">
                        {recommendation.description.length > 42
                          ? `${recommendation.description.slice(0, 42)}...`
                          : recommendation.description}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-full mb-2">
          <div className="w-full flex justify-between items-center text-white">
            <h1 className="spotify-font-bold text-2xl">
              Suas músicas estão com saudade
            </h1>
            <Link
              href={"#"}
              className="spotify-font-bold text-sm hover:border-b-2"
            >
              Mostrar tudo
            </Link>
          </div>

          <div className="w-full">
            {isMobile ? (
              <Swiper
                spaceBetween={10}
                slidesPerView={2.5} // Quantidade de slides visíveis por vez
                loop={true} // Swiper faz loop infinito
              >
                {recommendations.map((recommendation, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex flex-col p-2 rounded-md gap-2 cursor-pointer hover:bg-[#2e2e2e65]">
                      <Image
                        src={recommendation.coverImage}
                        width={200}
                        height={200}
                        sizes="(max-with: 160px) 100%"
                        style={{ objectFit: "cover" }}
                        alt={`Album ${index + 1}`}
                        className="rounded-md"
                      />
                      <p className="text-[0.75rem] text-gray-400 spotify-font-bold">
                        {recommendation.description.length > 42
                          ? `${recommendation.description.slice(0, 42)}...`
                          : recommendation.description}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="w-full grid grid-cols-7">
                {recommendations
                  .slice(0, isTablet ? 5 : recommendations.length)
                  .map((recommendation, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-2 rounded-md gap-2 cursor-pointer hover:bg-[#2e2e2e65] relative group"
                    >
                      <Image
                        src={recommendation.coverImage}
                        width={200}
                        height={200}
                        sizes="(max-with: 160px) 100%"
                        style={{ objectFit: "cover" }}
                        alt={`Album ${index + 1}`}
                        className="rounded-md"
                      />
                      <div className="cursor-pointer hover:scale-105 transition-all duration-500 ease-in-out absolute right-[17px] bottom-[60px] opacity-0 translate-y-3 scale-75 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 bg-[#54ff79] rounded-full p-2 flex items-center justify-center">
                        <FaPlay className="text-black text-lg " />
                      </div>

                      <p className="text-[0.75rem] text-gray-400 spotify-font-bold">
                        {recommendation.description.length > 42
                          ? `${recommendation.description.slice(0, 42)}...`
                          : recommendation.description}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
        <div className="w-full mb-2">
          <div className="w-full flex justify-between items-center text-white">
            <h1 className="spotify-font-bold text-2xl">
              Suas músicas estão com saudade
            </h1>
            <Link
              href={"#"}
              className="spotify-font-bold text-sm hover:border-b-2"
            >
              Mostrar tudo
            </Link>
          </div>

          <div className="w-full">
            {isMobile ? (
              <Swiper
                spaceBetween={10}
                slidesPerView={2.5} // Quantidade de slides visíveis por vez
                loop={true} // Swiper faz loop infinito
              >
                {recommendations.map((recommendation, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex flex-col p-2 rounded-md gap-2 cursor-pointer hover:bg-[#2e2e2e65]">
                      <Image
                        src={recommendation.coverImage}
                        width={200}
                        height={200}
                        sizes="(max-with: 160px) 100%"
                        style={{ objectFit: "cover" }}
                        alt={`Album ${index + 1}`}
                        className="rounded-md"
                      />
                      <p className="text-[0.75rem] text-gray-400 spotify-font-bold">
                        {recommendation.description.length > 42
                          ? `${recommendation.description.slice(0, 42)}...`
                          : recommendation.description}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="w-full grid grid-cols-7">
                {recommendations
                  .slice(0, isTablet ? 5 : recommendations.length)
                  .map((recommendation, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-2 rounded-md gap-2 cursor-pointer hover:bg-[#2e2e2e65] relative group"
                    >
                      <Image
                        src={recommendation.coverImage}
                        width={200}
                        height={200}
                        sizes="(max-with: 160px) 100%"
                        style={{ objectFit: "cover" }}
                        alt={`Album ${index + 1}`}
                        className="rounded-md"
                      />
                      <div className="cursor-pointer hover:scale-105 transition-all duration-500 ease-in-out absolute right-[17px] bottom-[60px] opacity-0 translate-y-3 scale-75 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 bg-[#54ff79] rounded-full p-2 flex items-center justify-center">
                        <FaPlay className="text-black text-lg " />
                      </div>

                      <p className="text-[0.75rem] text-gray-400 spotify-font-bold">
                        {recommendation.description.length > 42
                          ? `${recommendation.description.slice(0, 42)}...`
                          : recommendation.description}
                      </p>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
