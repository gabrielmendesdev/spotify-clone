import {
  fakeMusicRecommendationsData,
  fakePlaylistsData,
} from "./FakeLibraryData";
import { MusicRecommendations, MyLibraryPlaylists } from "./LibraryModel";

export const LibraryService = {
  GetUserLibrary: async (): Promise<MyLibraryPlaylists> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response: MyLibraryPlaylists = {
        playlists: fakePlaylistsData,
      };

      return response;
    } catch (error) {
      throw new Error(`Não foi possível criar um usuário: ${error}`);
    }
  },
  GetUserRecommendations: async (): Promise<MusicRecommendations> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response: MusicRecommendations = {
        recommendations: fakeMusicRecommendationsData,
      };

      return response;
    } catch (error) {
      throw new Error(`Não foi possível criar um usuário: ${error}`);
    }
  },
};
