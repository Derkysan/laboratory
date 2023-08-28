import Skeleton from "react-loading-skeleton";
import { Pokemon } from "../hooks/useFetchPokemons";
import { Link } from "react-router-dom";

interface PropTypes {
  pokemons: Pokemon[]
}

export const CardList = ({ 
  pokemons
}: PropTypes) => {

  return (
    <>
      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-2">
        {
          pokemons.length === 0
            ? (
              new Array(24).fill(null).map((_,i) => (
                <div
                  key={i} 
                  role="button"
                  className="col" 
                  >
                  <li className="card">
                      <Skeleton 
                        baseColor="#212529"
                        highlightColor="#666"
                        height={190}
                        />
                      <div className="card-header">
                        <h6 className="card-title">
                          <Skeleton
                            baseColor="#212529"
                            highlightColor="#666"
                          />
                        </h6>
                      </div>
                    </li>
                </div>
              ))
            )
            : (
              pokemons.map( (item) => (
                <div role="button" className="col" key={ item.id }>
                  <Link className="card text-decoration-none border border-warning overflow-hidden" to={`/pokemon/${item.id}`}>
                      <div className="text-center py-4 bg-light-subtle">
                        <img src={ item.image } className="card-img-top" style={{ width: 150, height: 150 }} alt={ item.name } />
                      </div>
                      <div className="card-header border-0">
                        <h6 className="card-title text-warning">{ item.name.charAt(0).toUpperCase()}{item?.name.slice(1) }</h6>
                      </div>
                    </Link>
                </div>
              ))
            ) 
        }
      </div>
    </>
  )
}
