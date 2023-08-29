
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { PokemonDetail } from "../interfaces/PokemonDetail";
import Skeleton from "react-loading-skeleton";

export const DetailPage = () => {

  const navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonDetail>();
  
  const { id } = useParams();

  const fetchPokemon = async (): Promise<PokemonDetail | undefined> => {
    
    try {

      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

      if (!response.ok) {
        throw new Error('Ocurrio u error en la petición');
      }

      const data = response.json();
      return data;

    } catch (error) {
      console.log(error);
    }

  }
  
  useEffect(() => {

    fetchPokemon()
      .then( data => {
        console.log(data);
        
        setIsLoading(false);
        setPokemon(data);
      })
      .catch( error => console.log(error))

  }, [])
  
  return (
    <>
     <nav className="navbar navbar-expand-md mb-3 rounded-3 border border-warning">
        <div className="container-fluid">
        <button className="btn btn-outline-warning btn-sm me-3" onClick={ () => navigate(-1) }>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left me-2" viewBox="0 0 16 16">
            <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg> 
          Back
        </button>
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
      
      <div className="row">
        <div className="col-12 col-md-6 col-lg-4">
          {
            isLoading
              ? (
                <Skeleton 
                  baseColor="#212529"
                  highlightColor="#666"
                  height={400}
                  style={{
                    border: 0,
                    padding: 0,
                    margin: 0
                  }}
                />
              ) : (
                <div className="border border-warning rounded-2 p-2 mb-3 bg-light-subtle">
                  <img src={ `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png` } className="img-fluid" alt={pokemon?.name} />
                </div>
              )
          }

          <div className="row row-cols-2 row-cols-2 row-cols-sm-3 row-cols-md-3 row-cols-lg-3 mb-3">
            <div className="col">
            {
              isLoading
                ? (
                  <Skeleton 
                    baseColor="#212529"
                    highlightColor="#666"
                    width={150}
                    height={150}
                    style={{
                      border: 0,
                      padding: 0,
                      margin: 0
                    }}
                  />
                ) : (
                    pokemon?.sprites.front_default
                      ? <img src={ `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png` } className="img-thumbnail bg-light-subtle border-warning ratio ratio-1x1" style={{ width: '100%' }} alt={ pokemon?.name }/>
                      : null
                )
            }
            </div>
            <div className="col">
            {
              isLoading && pokemon?.sprites.back_default
                ? (
                  <Skeleton 
                    baseColor="#212529"
                    highlightColor="#666"
                    width={150}
                    height={150}
                    style={{
                      border: 0,
                      padding: 0,
                      margin: 0
                    }}
                  />
                ) : (
                  pokemon?.sprites.back_default
                    ? <img src={ `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon?.id}.png` } className="img-thumbnail bg-light-subtle border-warning ratio ratio-1x1" style={{ width: '100%' }} alt={ pokemon?.name }/>
                    : null
                )
            }
            </div>
          </div>
          
          {/* <div className="d-flex gap-3 mb-3">
          {
              isLoading
                ? (
                  <Skeleton 
                    baseColor="#212529"
                    highlightColor="#666"
                    width={150}
                    height={150}
                    style={{
                      border: 0,
                      padding: 0,
                      margin: 0
                    }}
                  />
                ) : (
                    pokemon?.sprites.front_default
                      ? <img src={ `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon?.id}.png` } className="img-thumbnail bg-light-subtle border-warning" style={{ width: 150, height: 150 }} alt={ pokemon?.name }/>
                      : null
                )
            }
            {
              isLoading && pokemon?.sprites.back_default
                ? (
                  <Skeleton 
                    baseColor="#212529"
                    highlightColor="#666"
                    width={150}
                    height={150}
                    style={{
                      border: 0,
                      padding: 0,
                      margin: 0
                    }}
                  />
                ) : (
                  pokemon?.sprites.back_default
                    ? <img src={ `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${pokemon?.id}.png` } className="img-thumbnail bg-light-subtle border-warning" style={{ width: 150, height: 150 }} alt={ pokemon?.name }/>
                    : null
                )
            }
          </div> */}
        </div>
        <div className="col-12 col-md-6 col-lg-4">
          <h2 className="display-3 fw-bold">
            {
              isLoading
                ? (
                    <Skeleton 
                      baseColor="#212529"
                      highlightColor="#666"
                      style={{
                        border: 0,
                        padding: 0,
                        margin: 0
                      }}
                    />
                ) : `${pokemon?.name.charAt(0).toUpperCase()}${pokemon?.name.slice(1)}`
            }
          </h2>

          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th className="text-warning" scope="row" style={{ width: 200 }}>Base expirience</th>
                <td>{ pokemon?.base_experience }</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="text-warning" scope="row">Height</th>
                <td>{ pokemon?.height }</td>
              </tr>
              <tr>
                <th className="text-warning" scope="row">Weight</th>
                <td>{ pokemon?.weight }</td>
              </tr>
              <tr>
                <th className="text-warning" scope="row">Species</th>
                <td>{ pokemon?.species.name }</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
