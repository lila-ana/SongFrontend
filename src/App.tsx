import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Songs from "./pages/songs";
import { useSelector } from "react-redux";
import { RootState } from "./Store/rootReducer";
import Statistics from "./pages/statistics";
import Register from "./pages/register";

function App() {
  const token = useSelector((state: RootState) => state.loginReducer.token);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {!token ? (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </>
          ) : (
            <>
              <Route path="/songs" element={<Songs />} />
              <Route path="/statistics" element={<Statistics />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
