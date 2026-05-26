import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Kriteria from "./pages/Kriteria";
import Alternatif from "./pages/Alternatif";
import Penilaian from "./pages/Penilaian";
import Hasil from "./pages/Hasil";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />

        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/kriteria" element={<Kriteria />} />
            <Route path="/alternatif" element={<Alternatif />} />
            <Route path="/penilaian" element={<Penilaian />} />
            <Route path="/hasil" element={<Hasil />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;