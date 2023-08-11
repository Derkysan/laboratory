interface PropTypes {
  children: JSX.Element
}

export const PremierLayout = ({ children }: PropTypes) => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-body-tertiary rounded-4 mb-5" style={{ height: 200 }}>
        <h3>PremierLayout</h3>
      </div>
      { children }
    </>
  )
}
