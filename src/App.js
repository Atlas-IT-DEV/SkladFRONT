import { createHashRouter, RouterProvider } from "react-router-dom";

import MainPage from "./pages/main_page";
import MaterialsPage from "./pages/materials_page";
import LoginPage from "./pages/login_page";
import NotFoundPage from "./pages/notfound_page";

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
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
