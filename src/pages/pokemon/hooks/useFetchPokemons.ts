import { useEffect, useState } from "react";
import { PokemonAPI } from "../interfaces/PokemonsResponse";

export interface Pokemon {
  id: string,
  name: string,
  image: string,
}

export const useFetchPokemons = () => {

  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1)
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const [ activeImage ] = useState<null | string>(null);

  const fetchPokemons = async () => {
    setIsLoading(true);
    try {
      const result = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`);
      
      if (result.ok) {
        const data: PokemonAPI = await result.json();
        
        const pokemonList = data.results.map( item => {
          
          const splitURL = item.url.split('/');
          const id = splitURL[splitURL.length - 2];
          const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

          return {
              id, 
              name: item.name,
              image,
            }
        })
        setTimeout(() => {
          setIsLoading(false);
          setPokemons(pokemonList)
        }, 500);
      }

    } catch (error) {
      console.error('Error al buscar pokemons:', error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  const handleNext = () => {
    setOffset( prev => prev + itemsPerPage )
    setCurrentPage( prev => prev + 1 )
  }
  const handlePrev = () => {
    if (offset === 0) return
    setOffset( prev => prev - itemsPerPage )
    setCurrentPage( prev => prev - 1 )
  }

  return {
    currentPage,
    offset,
    isLoading,
    pokemons,
    activeImage,
    handleNext,
    handlePrev,
  }
}
