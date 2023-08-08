
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { PokemonDetail } from "../interfaces/PokemonDetail";

export const DetailPage = () => {


  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<PokemonDetail | undefined>();
  
  const { id } = useParams();

  const fetchPokemon = async () => {
    
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
        setIsLoading(false);
        console.log(data);
        setPokemon(data);
      })
      .catch( error => console.log(error))

  }, [])
  
  return (
    <>
      <div className="mb-4">
        <h4>
          <Link to={"/pokemon"} className="btn btn-outline-secondary me-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left me-2" viewBox="0 0 16 16">
              <path d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
            </svg> 
            Back
          </Link>
          DetailPage
        </h4>
        <hr />
      </div>
      { 
        isLoading 
          ? <p>Cargando...</p> 
          // : <pre>{ JSON.stringify( pokemon, null, 3 ) }</pre>
          : (
            <h3>{ pokemon?.name }</h3>
          )
      }
      
    </>
  )
}
