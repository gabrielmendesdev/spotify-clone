import { Playlist, MyLibraryPlaylists } from "./LibraryService";

const fakePlaylistsData: Playlist[] = [
  {
    coverImage:
      "https://mosaic.scdn.co/640/ab67616d00001e02457163bec7e8e4decf8c6375ab67616d00001e02691b957dd47dd9de22a5c581ab67616d00001e026b3463e7160d333ada4b175aab67616d00001e028443a724ced4e3bef303fb7a",
    name: "Rock",
    description: "Playlist-Gabriel",
    editedAt: "15 de dez. de 2023",
    lastHeard: "há 7 minutos",
  },
  {
    coverImage:
      "https://mosaic.scdn.co/640/ab67616d00001e02121d5f92cf90576907dfb1e5ab67616d00001e02304ae5169ad8e53e261b93f2ab67616d00001e027a9bf5f82e32d33d4503fe7bab67616d00001e02b3591763154a27326b3f431a",
    name: "Play The Music",
    description: "Playlist-Gabriel",
    editedAt: "21 de nov. de 2022",
    lastHeard: "há 1 dia",
  },
  {
    coverImage:
      "https://i.scdn.co/image/ab6761610000e5eb9a398209a4ef3360dce2dec4",
    name: "Snoop Dogg",
    description: "Artista",
    editedAt: "10 de jan. de 2022",
    lastHeard: "há 8 horas",
  },
  {
    coverImage:
      "https://i.scdn.co/image/ab6761610000e5eb32845b1556f9dbdfe8ee6575",
    name: "Rammstein",
    description: "Artista",
    editedAt: "21 de fev. de 2021",
    lastHeard: "há 14 meses",
  },
  {
    coverImage:
      "https://i.scdn.co/image/ab67616100005174e80d1ffb81aa6503ad41c574",
    name: "League of Legends",
    description: "Artista",
    editedAt: "13 de ago. de 2017",
    lastHeard: "há 32 meses",
  },
  {
    coverImage:
      "https://i.scdn.co/image/ab676161000051742e619cf7c1577485d14c2043",
    name: "Three Days Grace",
    description: "Artista",
    editedAt: "11 de jun. de 2024",
    lastHeard: "há 2 horas",
  },
  {
    coverImage:
      "https://i.scdn.co/image/ab6761610000517429af2ffb6f4ddd6324f878bc",
    name: "Korn",
    description: "Artista",
    editedAt: "2 de jan. de 2024",
    lastHeard: "há 5 horas",
  },
  {
    coverImage:
      "https://i.scdn.co/image/ab67616d00001e021db908d5f66645cb158837ca",
    name: "LMFAO",
    description: "Artista",
    editedAt: "30 de dez. de 2023",
    lastHeard: "há 44 dias",
  },
  {
    coverImage:
      "https://i.scdn.co/image/ab67616100005174997cc9a4aec335d46c9481fd",
    name: "Michael Jackson",
    description: "Artista",
    editedAt: "25 de nov. de 2019",
    lastHeard: "há 4 meses",
  },
  {
    coverImage:
      "https://i.scdn.co/image/ab67616100005174a00b11c129b27a88fc72f36b",
    name: "Eminem",
    description: "Artista",
    editedAt: "11 de dez. de 2024",
    lastHeard: "há 12 minutos",
  },
  {
    coverImage:
      "https://i.scdn.co/image/ab6761610000517440ccefdbc6f6da49087b561d",
    name: "Gustavo Lima",
    description: "Artista",
    editedAt: "15 de dez. de 2015",
    lastHeard: "há 43 minutos",
  },
];

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
};
