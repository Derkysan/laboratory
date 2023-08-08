import { Link } from "react-router-dom"

export const LabPage = () => {
  return (
    <>
      <div className="row row-cols-2 row-cols-md-3 g-3">

        <div className="col">
          <div className="card shadow-lg">
            {/* <div className="card-header">header</div> */}
            <div className="card-body">
              <h3>PokemonApp</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio beatae dolore id praesentium vero. Quae ipsa quisquam nam voluptatem repudiandae?</p>
              <Link to={'/pokemon'} className="btn border stretched-link">Go</Link>
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
