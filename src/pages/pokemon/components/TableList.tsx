import { Link } from "react-router-dom"
import { Pokemon } from "../hooks/useFetchPokemons"

interface PropsType {
  pokemons: Pokemon[],
}

export const TableList = ({ pokemons }: PropsType) => {
  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th className="text-warning">N°</th>
          <th className="text-warning">Picture</th>
          <th className="text-warning">Name</th>
        </tr>
      </thead>

      <tbody>
        {
          pokemons.map( item => (
            <tr key={ item.id }>
              <td style={{ verticalAlign: 'middle', width: '4em' }}>
                <Link className="text-decoration-none text-warning" to={`/pokemon/${item.id}`}>
                  { item.id }
                </Link>
              </td>
              <td style={{ width: 150 }}>
                <div className="img-wrapper" style={{ height: 100 }}>
                  <Link className="text-decoration-none" to={`/pokemon/${item.id}`}>
                    <img src={ item.image } className="img-fluid" alt={ item.name } width={100} />
                  </Link>
                </div>
              </td>
              <td style={{ verticalAlign: 'middle' }} className="text-warning">
                <Link className="text-decoration-none text-warning" to={`/pokemon/${item.id}`}>
                  { item.name.slice(0, 1).toUpperCase() }{ item.name.slice(1) }
                </Link>
              </td>
            </tr>
          ))
        }

      </tbody>
    </table>
  )
}
