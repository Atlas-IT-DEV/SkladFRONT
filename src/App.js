import { createHashRouter, RouterProvider } from "react-router-dom";

import MainPage from "./pages/main_page";
import MaterialsPage from "./pages/materials_page";
import LoginPage from "./pages/login_page";
import NotFoundPage from "./pages/notfound_page";
import PurchasesPage from "./pages/purchases_page";
import PropertyPage from "./pages/property_page";
import СraftifiesPage from "./pages/сraftifies_page";
import TmcsPage from "./pages/tmcs_page";

const router = createHashRouter([
  {
    path: "/",
    element: <MainPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/materials",
    element: <MaterialsPage />,
  },
  {
    path: "/purchases",
    element: <PurchasesPage />,
  },
  {
    path: "/properties",
    element: <PropertyPage />,
  },
  {
    path: "/craftifies",
    element: <СraftifiesPage />,
  },
  {
    path: "/tmcs",
    element: <TmcsPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
