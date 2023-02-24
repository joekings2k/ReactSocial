import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Root } from "./pages/Root";
import { Home } from "./pages/home/Home";
import "./styles/App.css";
import { Login } from "./pages/Login";
import { DataValueProvider } from "./AppContext";
import { CreatePosts } from "./pages/create-posts/CreatePosts";

function App() {
  const Router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createposts" element={<CreatePosts />} />
      </Route>
    )
  );
  return (
    <div className="App">
      <DataValueProvider>
        <RouterProvider router={Router} />
      </DataValueProvider>
    </div>
  );
}

export default App;
