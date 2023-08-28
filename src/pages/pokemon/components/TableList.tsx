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
              <td style={{ verticalAlign: 'middle' }}>{ item.id }</td>
              <td>
                <img src={ item.image } className="img-fluid" alt={ item.name } width={100} />
              </td>
              <td style={{ verticalAlign: 'middle' }}>{ item.name }</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
