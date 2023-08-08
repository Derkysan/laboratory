interface PropTypes {
  children: JSX.Element
}

export const AppLayout = ({ children }: PropTypes) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col py-5">
          
          { children }

        </div>
      </div>
    </div>
  )
}
