import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom"

import RootLayout from "./layouts/RootLayout"

import Cars, { carsLoader } from "./pages/Cars"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NewCar from "./pages/NewCar"
import SingleCar from "./pages/SingleCar"
import NotFound from "./pages/NotFound"
import AuthRequired from "./components/AuthRequired"

import fetchCarData from "./utils/fetchCarData"

import { AuthProvider } from "./contexts/AuthContext"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="cars" element={<Cars />} loader={carsLoader} />
      <Route path="login" element={<Login />} />
      <Route element={<AuthRequired />}>
        <Route path="new-car" element={<NewCar />} />
      </Route>
      <Route
        path="cars/:id"
        element={<SingleCar />}
        loader={async ({ params }) => {
          return fetchCarData(params.id);
        }}
        errorElement={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)


export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}