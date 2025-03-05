import { useState, useEffect, useCallback } from "react";
import { Pokemon } from "../types/pokemon";

export const usePokemonData = (initialPage = 1) => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const limit = 20; // Number of Pokemon per page

  const fetchPokemonData = useCallback(
    async (pageNumber: number) => {
      setIsLoading(true);
      try {
        // Calculate offset based on page number
        const offset = (pageNumber - 1) * limit;

        // Fetch Pokemon list
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );
        const data = await response.json();

        // Fetch details for each Pokemon
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return await res.json();
          })
        );

        // Append new Pokemon to existing list for infinite scroll
        setPokemons((prevPokemons) =>
          pageNumber === 1
            ? pokemonDetails
            : [...prevPokemons, ...pokemonDetails]
        );
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [limit]
  );

  // Fetch initial data
  useEffect(() => {
    fetchPokemonData(initialPage);
  }, [initialPage, fetchPokemonData]);

  // Function to fetch next page
  const fetchNextPage = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
    fetchPokemonData(page + 1);
  }, [page, fetchPokemonData]);

  return { pokemons, isLoading, fetchNextPage };
};
