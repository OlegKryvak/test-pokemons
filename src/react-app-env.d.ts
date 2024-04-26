/// <reference types="react-scripts" />

interface IAllPokemonResponse {
  count: number;
  next: string;
  previous: null | string;
  results: Array<IResult> | null;
}

interface IForm {
  name: string;
  url: string;
}

interface IGame {
  game_index: number;
  version: {
    name: string;
    url: string;
  };
}

interface IMove {
  move: {
    name: string;
    url: string;
  };
  version_group_details: any;
}

interface IPokemon {
  abilities: {
    isHidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  };
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: Array<IForm>;
  game_indices: Array<IGame>;
  height: number;
  held_items: any;
  id: number;
  is_default: boolean;
  true;
  location_area_encounters: string;
  moves: Array<IMove>;
  name: string;
  order: number;
  past_abilities: any;
  past_types: any;
  species: { name: string; url: string };
  sprites: any;
  stats: any;
  types: any;
  weight: number;
}
