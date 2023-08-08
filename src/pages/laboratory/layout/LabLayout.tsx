
interface PropTypes {
  children: JSX.Element
}

export const LabLayout = ({ children }: PropTypes) => {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center bg-body-tertiary rounded-4 mb-5" style={{ height: 200 }}>
        <h3>LaboratoryLayout</h3>
      </div>
      { children }
    </>
  )
}
