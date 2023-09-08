import { Navigate, Route, Routes } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context);
  return (
    <div className="app">
      <Topbar />

      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to={"/login"} replace={true} />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to={"/"} replace={true} /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={"/"} replace={true} /> : <Register />}
        />
        <Route
          path="/write"
          element={user ? <Write /> : <Navigate to={"/login"} replace={true} />}
        />
        <Route
          path="/settings"
          element={
            user ? <Settings /> : <Navigate to={"/login"} replace={true} />
          }
        />
        <Route path="/posts/:postId" element={<Single />} />
      </Routes>
    </div>
  );
}

export default App;
