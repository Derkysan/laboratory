import { Route, Routes } from "react-router-dom"
import { LabLayout } from "../layout/LabLayout"
import { LabPage } from "../pages/LabPage"

export const LabRoutes = () => {
  return (
    <LabLayout>
      <Routes>

        <Route path="/" element={ <LabPage /> } />

      </Routes>
    </LabLayout>
  )
}
