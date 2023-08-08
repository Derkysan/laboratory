import { Route, Routes } from "react-router-dom"

import { AppLayout } from "../layout/AppLayout"

import { LabRoutes } from "../pages/laboratory/routes/LabRoutes"
import { PokemonRoutes } from "../pages/pokemon/routes/PokemonRoutes"

export const AppRouter = () => {
  return (
    <AppLayout>
      <Routes>
        {/* <Route path="/pokemon/:id" element={ <DetailPage /> } /> */}
        <Route path="/pokemon/*" element={ <PokemonRoutes /> } />
        <Route path="/" element={ <LabRoutes /> } />
      </Routes>
    </AppLayout>
  )
}
