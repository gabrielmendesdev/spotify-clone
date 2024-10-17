import {
  fakeLongingSongs,
  fakeMixes,
  fakeMusicRecommendationsData,
  fakePlaylistsData,
  fakeRecentPlayeds,
} from "./FakeLibraryData";
import {
  GenericLongingSongs,
  MusicRecommendations,
  MyLibraryPlaylists,
} from "./LibraryModel";

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
  GetUserLongingSongs: async (): Promise<GenericLongingSongs> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response: GenericLongingSongs = {
        recommendations: fakeLongingSongs,
      };

      return response;
    } catch (error) {
      throw new Error(`Não foi possível criar um usuário: ${error}`);
    }
  },
  GetUserRecentPlayeds: async (): Promise<GenericLongingSongs> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response: GenericLongingSongs = {
        recommendations: fakeRecentPlayeds,
      };

      return response;
    } catch (error) {
      throw new Error(`Não foi possível criar um usuário: ${error}`);
    }
  },
  GetUserMixes: async (): Promise<MusicRecommendations> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const response: MusicRecommendations = {
        recommendations: fakeMixes,
      };

      return response;
    } catch (error) {
      throw new Error(`Não foi possível criar um usuário: ${error}`);
    }
  },
};
