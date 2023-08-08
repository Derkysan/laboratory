import Skeleton from "react-loading-skeleton"
import { useFetchPokemons } from "../hooks/useFetchPokemons"
import { Card } from "./Card"

export const CardList = () => {

  const { currentPage, offset, isLoading, pokemons, activeImage, handleNext, handlePrev } = useFetchPokemons()
  
  return (
    <>
    <div className="d-flex justify-content-between align-items-center my-4">
      <nav>
        <ul className="pagination m-0">
          <li className={`page-item ${ (offset === 0 || isLoading) ? 'disabled' : '' }`}>
            <button 
              className="page-link"
              onClick={ handlePrev }
              >Previous</button>
          </li>
          <li className={`page-item ${ ( isLoading ) ? 'disabled' : '' }`}>
            <button 
              disabled={ isLoading ? true : false }
              className="page-link"
              onClick={ handleNext }
              >Next</button>
          </li>
        </ul>
      </nav>

      <div className="px-3">
        Page: { currentPage }
      </div>
    </div>

      <div className="row row-cols-2 row-cols-md-6 g-2">
        {
          isLoading
            ? (
              new Array(12).fill(null).map((_,i) => (
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
                <Card 
                  key={item.id}
                  item={ item } 
                  activeImage={ activeImage } 
                />
              ))
            )
        }
      </div>
    </>
  )
}
