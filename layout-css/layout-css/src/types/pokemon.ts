export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  height?: string;
  weight?: string;
  types: {
    type: {
      name: string;
    };
  }[];
}

export interface PokemonListResponse {
  results: {
    name: string;
    url: string;
  }[];
}
