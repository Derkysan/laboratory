import { Route, Routes } from "react-router-dom"

import PokemonLayout from '../layout/PokemonLayout';

import HomePage from "../pages/HomePage"
import { DetailPage } from "../pages/DetailPage"

export const PokemonRoutes = () => {
  return (
    <PokemonLayout>
      <Routes>
        <Route path="/:id" element={ <DetailPage /> } />
        <Route path="/" element={ <HomePage /> } />
      </Routes>
    </PokemonLayout>
  )
}
