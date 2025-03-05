import { useEffect, useRef, useState } from "react";
import { usePokemonData } from "../hooks/usePokemonData";
import "./card-container.css";
import Card from "./card/card";
import Dashboard from "./layout/dashboard";
import Dialog from "./dialog/Dialog";
import { Pokemon } from "../types/pokemon";

const CardContainer = () => {
  const [page, setPage] = useState(1);
  const { pokemons, isLoading, fetchNextPage } = usePokemonData(page);
  const loaderRef = useRef(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading) {
          setPage((prevPage) => prevPage + 1);
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [isLoading, fetchNextPage]);

  const handleCardClick = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseDialog = () => {
    setSelectedPokemon(null);
  };

  return (
    <Dashboard>
      <div className="card-container">
        {pokemons.map((pok, index) => {
          return (
            <Card
              tag={pok.types.map((type) => type.type.name)}
              img={pok.sprites.front_default}
              title={pok.name}
              description={pok.name}
              key={index}
              onClick={() => handleCardClick(pok)}
            />
          );
        })}

        {/* Loading indicator */}
        <div ref={loaderRef} className="loader-container">
          {isLoading && (
            <div className="loader">
              <div className="spinner"></div>
              <p>Loading more Pokémon...</p>
            </div>
          )}
        </div>
      </div>

      {/* Dialog for Pokémon details */}
      {selectedPokemon && (
        <Dialog
          isOpen={!!selectedPokemon}
          onClose={handleCloseDialog}
          title={selectedPokemon.name}
        >
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
          />
          <p>{selectedPokemon.name}</p>
          <p>
            Types:{" "}
            {selectedPokemon.types.map((type) => type.type.name).join(", ")}
          </p>
          <p>Height: {selectedPokemon.height}</p>
          <p>Weight: {selectedPokemon.weight}</p>
        </Dialog>
      )}
    </Dashboard>
  );
};

export default CardContainer;
