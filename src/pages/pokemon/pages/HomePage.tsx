import { Link } from "react-router-dom"

import { useEffect, useState } from "react";

import { Pokemon } from "../hooks/useFetchPokemons";
import { PokemonAPI } from "../interfaces/PokemonsResponse";

import 'react-loading-skeleton/dist/skeleton.css'
import { CardList } from "../components/CardList";
import { TableList } from "../components/TableList";

const HomePage = () => {

  const pokemonAPI = 'https://pokeapi.co/api/v2/pokemon';
  const itemsPerPage = 24;

  const [dataCount, setDataCount] = useState<number | null>(null);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  // const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('grid');

  useEffect(() => {
    fetch(pokemonAPI)
      .then(response => response.json())
      .then((data: PokemonAPI) => {
        setDataCount(data.count);
      })
  }, [])
  
  const fetchPokemons = async () => {

    setIsLoading(true);
    
    try {
      const result = await fetch(`${pokemonAPI}?limit=${itemsPerPage}&offset=${offset}`);
      
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
        });
        
        setPokemons(pokemonList);
        setIsLoading(false);
      }

    } catch (error) {
      console.error('Error al buscar pokemons:', error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  const handleView = (view: string) => {
    setView(view);
  }

  const handleNext = () => {
    setIsLoading(true);
    setOffset( prev => prev + itemsPerPage )
    setCurrentPage( prev => prev + 1 )
    setIsLoading(false);
  }
  const handlePrev = () => {
    if (offset === 0) return
    setOffset( prev => prev - itemsPerPage )
    setCurrentPage( prev => prev - 1 )
  }

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault()
  //     // handleSearch;
  //   }
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchTerm( e.target.value )
  // }

  // const filteredPokemons = () => {
  //   return (
  //     searchTerm 
  //       // ? ( pokemons.filter( poke => {
  //       //       return poke.name.toLowerCase().includes( searchTerm.toLowerCase() )
  //       //     }) ) 
  //       ? pokemons
  //       : pokemons
  //   )
  // }

  // const handleSearch = () => {
  //   if (searchTerm.length === 0) return
  //   console.log(searchTerm);
  // }

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
          <a className="navbar-brand fw-bolder text-warning">Pokemon</a>
          <button className="navbar-toggler border-warning text-warning d-flex justify-content-center align-items-center py-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            {/* <span className="navbar-toggler-icon border-warning"></span> */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <form className="d-flex ms-auto" role="search">
              <input 
                className="form-control border-warning text-warning" 
                type="text" 
                placeholder="Search" 
                value={searchTerm}
                onChange={ handleChange }
                onKeyDown={ handleKeyDown }
                />
                <button 
                  type="button"
                  className="btn btn-outline-warning ms-2 btn-sm" 
                  onClick={ handleSearch }
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                </button> 
            </form> */}
          </div>
        </div>
      </nav>

      {/* controls */}
      <div className="row align-items-center my-4">
        <div className="col-3">
          <div className="d-flex align-items-center gap-2">
            <button 
              className={`btn btn-link border-0 d-flex align-items-center justify-content-center text-secondary px-2 ${ view === 'grid' && 'border border-warning text-warning' }`}
              onClick={ () => handleView('grid') }>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
                <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
              </svg>
            </button>

            <button 
              className={`btn btn-link border-0 d-flex align-items-center justify-content-center text-secondary px-2 ${ view === 'table' && 'border border-warning text-warning' }`}
              onClick={ () => handleView('table') }>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-table" viewBox="0 0 16 16">
                <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="col text-end">
          <div className="d-flex justify-content-end gap-2">
            <p className="font-monospace text-muted text-decoration-underline m-0 d-flex align-items-center"><small>Showing {(itemsPerPage * currentPage) - itemsPerPage + 1} - { itemsPerPage * currentPage } of { dataCount }</small></p>
            <nav>
              <ul className="pagination m-0">
                <li className={`page-item ${ (offset === 0 || isLoading) ? 'disabled' : '' }`}>
                  <button 
                    className="btn btn-link text-warning"
                    onClick={ handlePrev }
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                      </svg>
                    </button>
                </li>
                <li className={`page-item ${ ( isLoading ) ? 'disabled' : '' }`}>
                  <button 
                    disabled={ isLoading ? true : false }
                    className="btn btn-link text-warning"
                    onClick={ handleNext }
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                      </svg>
                    </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>    
      </div>

      <div className="row mb-4">
        <div className="col">
          {
            (view === 'grid')
              ? <CardList pokemons={pokemons} />
              : <TableList pokemons={pokemons} />
          }
        </div>
      </div>

      <div className="row mb-2">
        <div className="col">
          <div className="d-flex align-items-center justify-content-end gap-3">
              <button 
                className="btn btn-sm btn-outline-warning px-2"
                onClick={ handlePrev }
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
              </button>
              {/* <button type="button" className="btn btn-outline-warning">1</button> */}
              <span className="text-muted">{ currentPage }</span>
              {/* <button type="button" className="btn btn-outline-warning">3</button> */}
              <button 
                type="button" 
                className="btn btn-sm btn-outline-warning px-2"
                onClick={ handleNext }
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default HomePage