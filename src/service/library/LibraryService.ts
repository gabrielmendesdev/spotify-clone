export interface Playlist {
  coverImage: string;
  name: string;
  description: string;
  editedAt: string;
  lastHeard: string;
}

export interface MyLibraryPlaylists {
  playlists: Playlist[];
}
