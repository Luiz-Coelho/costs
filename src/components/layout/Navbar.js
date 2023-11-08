import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../img/costs_logo.png";
import Container from "./Container";

function Navbar() {
  const location = useLocation();
  let project = false;
  if (location.state) {
    project = location.state.project;
  }

  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src={logo} alt="Costs" />
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/projects">Projetos</Link>
          </li>
          <li>
            <Link to="/manager">Gerenciador</Link>
          </li>
          <li>
            <Link to="/contato">Contato</Link>
          </li>
          <li>
            <Link to="/empresa">Empresa</Link>
          </li>
        </ul>
      </Container>
    </nav>
  );
}

export default Navbar;
