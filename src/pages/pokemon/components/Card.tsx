import { Link } from "react-router-dom"
import { Pokemon } from "../hooks/useFetchPokemons"

interface PropTypes {
  item: Pokemon,
  activeImage: string | null,
}

export const Card = (props: PropTypes) => {

  const { item } =  props;
  const { id, name, image } = item;

  return (
    <div role="button" className="col">
      <Link className="card text-decoration-none" to={`/pokemon/${id}`}>
          <div className="text-center py-4">
            <img src={ image } className="card-img-top" style={{ width: 150, height: 150 }} alt={ name } />
          </div>
          <div className="card-header">
            <h6 className="card-title">{ id }. { name }</h6>
          </div>
        </Link>
    </div>
  )
}
