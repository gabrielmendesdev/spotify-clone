import { Playlist, MyLibraryPlaylists } from "./LibraryService";

const fakePlaylistsData: Playlist[] = [
  {
    coverImage:
      "https://mosaic.scdn.co/640/ab67616d00001e02457163bec7e8e4decf8c6375ab67616d00001e02691b957dd47dd9de22a5c581ab67616d00001e026b3463e7160d333ada4b175aab67616d00001e028443a724ced4e3bef303fb7a",
    name: "Rock",
    description: "Playlist-Gabriel",
  },
  {
    coverImage:
      "https://mosaic.scdn.co/640/ab67616d00001e02121d5f92cf90576907dfb1e5ab67616d00001e02304ae5169ad8e53e261b93f2ab67616d00001e027a9bf5f82e32d33d4503fe7bab67616d00001e02b3591763154a27326b3f431a",
    name: "Play The Music",
    description: "Playlist-Gabriel",
  },
  {
    coverImage:
      "https://i.scdn.co/image/ab6761610000e5eb9a398209a4ef3360dce2dec4",
    name: "Snoop Dogg",
    description: "Artista",
  },
  {
    coverImage:
      "https://i.scdn.co/image/ab6761610000e5eb32845b1556f9dbdfe8ee6575",
    name: "Rammstein",
    description: "Artista",
  },
  {
    coverImage:
      "https://i.scdn.co/image/ab6761610000e5eb29af2ffb6f4ddd6324f878bc",
    name: "Korn",
    description: "Artista",
  },
  {
    coverImage:
      "https://i.scdn.co/image/ab6761610000e5eb654dc6b69f86aeb73527fc07",
    name: "Matuê",
    description: "Playlist-Gabriel",
  },
];

export const LibraryService = {
  GetUserLibrary: async (): Promise<MyLibraryPlaylists> => {
    // const endpoint = '/Fake/GetUserLibrary'
    try {
      const response: MyLibraryPlaylists = {
        playlists: fakePlaylistsData,
      };
      return response;
    } catch (error) {
      throw new Error(`Não foi possível criar um usuário: ${error}`);
    }
  },
};
