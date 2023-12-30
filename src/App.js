import { createHashRouter, RouterProvider } from "react-router-dom";

import MainPage from "./pages/main_page";
import MaterialsPage from "./pages/materials_page";
import SignInPage from "./pages/sign_in_page";
import NotFoundPage from "./pages/notfound_page";
import PurchasesPage from "./pages/purchases_page";
import PropertyPage from "./pages/property_page";
import СraftifiesPage from "./pages/сraftifies_page";
import TmcsPage from "./pages/tmcs_page";
import TmcTypesPage from "./pages/tmc_types_page";
import DeliveryMethodsPage from "./pages/delivery_methods_page";
import DeliveryPlacesPage from "./pages/delivery_places_page";
import NotificationPage from "./pages/notifications_page";
import SignUpPage from "./pages/sign_up_page";

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
    path: "/tmctypes",
    element: <TmcTypesPage />,
  },
  {
    path: "/delivery_methods",
    element: <DeliveryMethodsPage />,
  },
  {
    path: "/delivery_places",
    element: <DeliveryPlacesPage />,
  },
  {
    path: "/notification_page",
    element: <NotificationPage />,
  },
  {
    path: "/signup_page",
    element: <SignUpPage />,
  },

  {
    path: "/sign_in",
    element: <SignInPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
