import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Tv from "./routes/Tv";
import Search from "./routes/Search";
import Header from "./components/Header";

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="movies/:category/:id" element={<Home />} />
        </Route>
        <Route path="/tv" element={<Tv />}>
          <Route path="shows/:category/:id" element={<Tv />} />
        </Route>
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
