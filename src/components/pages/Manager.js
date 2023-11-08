import { useEffect, useState } from "react";
import styles from "./Manager.module.css";
import Container from "../layout/Container";
import ProjectCard from "../project/ProjectCard";

function Manager() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/projects", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Gerenciador de Projetos</h1>
      <Container>
        {projects.length > 0 &&
          projects.map((project) => {
            <ProjectCard
              id={project.id}
              name={project.name}
              key={project.key}
            />;
          })}
      </Container>
    </div>
  );
}

export default Manager;
