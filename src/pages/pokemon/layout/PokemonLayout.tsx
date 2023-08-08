
interface propTypes {
  children: JSX.Element
}

const PokemonLayout = ({ children }: propTypes) => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-body-tertiary rounded-4 mb-5" style={{ height: 200 }}>
        <h3>PokemonLayout</h3>
      </div>
      { children }
    </>
  )
}

export default PokemonLayout