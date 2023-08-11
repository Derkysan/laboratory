import Skeleton from "react-loading-skeleton";
import { Pokemon } from "../hooks/useFetchPokemons";
import { Link } from "react-router-dom";

interface PropTypes {
  isLoading: boolean,
  pokemons: Pokemon[],
  currentPage: number,
  offset: number,
  handleNext: () => void
  handlePrev: () => void
}

export const CardList = ({ 
  pokemons, 
  isLoading, 
  // currentPage,
  offset,
  handleNext,
  handlePrev
}: PropTypes) => {

  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-4">
        <nav>
          <ul className="pagination m-0">
            <li className={`page-item ${ (offset === 0 || isLoading) ? 'disabled' : '' }`}>
              <button 
                className="page-link border border-warning text-warning"
                onClick={ handlePrev }
                >Previous</button>
            </li>
            <li className={`page-item ${ ( isLoading ) ? 'disabled' : '' }`}>
              <button 
                disabled={ isLoading ? true : false }
                className="page-link border border-warning text-warning"
                onClick={ handleNext }
                >Next</button>
            </li>
          </ul>
        </nav>

        <div className="d-flex align-items-center gap-2">
          {/* Page: { currentPage } */}

          <small className="me-3">View: </small>

          <button className="btn btn-link text-warning border border-warning d-flex align-items-center justify-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-grid" viewBox="0 0 16 16">
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
            </svg>
          </button>

          <button className="btn btn-link  text-white-50 d-flex align-items-center justify-content-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-table" viewBox="0 0 16 16">
              <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-2">
        {
          isLoading
            ? (
              new Array(20).fill(null).map((_,i) => (
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
            ) : (
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
