import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import userLogin from "./store/store";

export default function App() {
  const myRoute = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/dashboard", element: <Dashboard /> },
  ]);
  return (
    <>
      <Provider store={userLogin}>
        <RouterProvider router={myRoute}></RouterProvider>
      </Provider>
    </>
  );
}
