export interface Playlist {
  coverImage: string;
  name: string;
  description: string;
}

export interface MyLibraryPlaylists {
  playlists: Playlist[];
}
