import { Link } from "react-router-dom"

export const LabPage = () => {
  return (
    <>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">

        <div className="col">
          <div className="card shadow-lg h-100 border-warning">
            {/* <div className="card-header">header</div> */}
            <div className="card-body">
              <h3 className="text-warning fw-bolder">PokemonApp</h3>
              <p>Fetch API project</p>
              <Link to={'/pokemon'} className="btn border stretched-link btn-outline-warning border-warning">Go</Link>
            </div>
            <div className="card-footer text-end border-warning">
              <small>Footer data</small>
            </div>
          </div>
        </div>
        
        <div className="col">
          <div className="card shadow-lg h-100 border border-secondary">
            {/* <div className="card-header">header</div> */}
            <div className="card-body">
              <h3 className="text-secondary fw-bolder">PremierLeagueApp</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              <Link to={'/'} className="btn border stretched-link">Go</Link>
            </div>
            <div className="card-footer text-end">
              <small>Footer data</small>
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}
