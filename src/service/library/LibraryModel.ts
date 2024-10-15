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

export interface MusicRecommendation {
  coverImage: string;
  description: string;
}

export interface MusicRecommendations {
  recommendations: MusicRecommendation[];
}
