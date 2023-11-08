import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Contato from "./components/pages/Contato";
import Empresa from "./components/pages/Empresa";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Container from "./components/layout/Container";
import NewProject from "./components/pages/NewProjects";
import Projects from "./components/pages/Projects";
import Project from "./components/pages/Project";
import Manager from "./components/pages/Manager";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Container customClass="min-height">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contato" element={<Contato />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/empresa" element={<Empresa />} />
            <Route path="/newproject" element={<NewProject />} />
            <Route path="/manager" element={<Manager />} />
            <Route path="/project/:id" element={<Project />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
