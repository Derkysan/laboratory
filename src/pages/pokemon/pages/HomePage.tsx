import { Link } from "react-router-dom"
import { CardList } from "../components/CardList"

import { useEffect, useState } from "react";

import { Pokemon } from "../hooks/useFetchPokemons";
import { PokemonAPI } from "../interfaces/PokemonsResponse";

import 'react-loading-skeleton/dist/skeleton.css'

const HomePagen = () => {

  const itemsPerPage = 20;
  // const itemsPerPage = 1000;
  
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const fetchPokemons = async () => {

    setIsLoading(true);
    
    try {
      const result = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offset}`);
      // const result = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}`);
      
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
        // setTimeout(() => {
          setIsLoading(false);
          setPokemons(pokemonList)
        // }, 500);
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm( e.target.value )
  }
  
  const filteredPokemons = () => {
    return (
      searchTerm 
        ? ( pokemons.filter( poke => {
              return poke.name.toLowerCase().includes( searchTerm.toLowerCase() )
            }) ) 
        : pokemons
    )
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      handleSearch;
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-md mb-3 rounded-3 border border-warning">
        <div className="container-fluid">
        <Link to={"/"} className="btn btn-outline-warning btn-sm me-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left me-2" viewBox="0 0 16 16">
            <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg> 
          Back
        </Link>
          <a className="navbar-brand text-white-50 fw-bolder">Pokemon</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-lg-0">
              {/* <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>*/}
              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Filter
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li> */}
            </ul>
            <form className="d-flex" role="search">
              <input 
                className="form-control border-warning text-warning" 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={ handleSearch }
                onKeyDown={handleKeyDown}
                />
                <button 
                  className="btn btn-outline-warning ms-2 btn-sm" 
                  type="submit"
                  onClick={ () => {} }
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </button> 
            </form>
          </div>
        </div>
      </nav>

      <div className="row">
        {/* <div className="col-12 col-md-3"></div> */}
        <div className="col-12">
          <CardList 
            isLoading={isLoading} 
            currentPage={currentPage} 
            offset={offset} 
            handleNext={handleNext} 
            handlePrev={handlePrev}
            pokemons={ filteredPokemons() } 
            />
        </div>
      </div>

    </>
  )
}

export default HomePagen