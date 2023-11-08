import { useEffect, useState } from "react";
import styles from "./Projects.module.css";
import Container from "../layout/Container";
import ProjectCard from "../project/ProjectCard";
import Message from "../layout/Message";
import LinkButton from "../layout/LinkButton";
import { useLocation } from "react-router-dom";
import Loading from "../layout/Loading";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectMessage, setProjectMessage] = useState("");
  const [removeLoading, setRemoveLoading] = useState(false);

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjects(data);
          setRemoveLoading(true);
          console.log(data);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, []);

  function removeProject(id) {
    setProjectMessage();

    fetch(`http://localhost:5000/projects/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(projects.filter((projects) => projects.id !== id));
        setProjectMessage("Projeto removido com sucesso.");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className={styles.projects_container}>
      <div className={styles.projects_title}>
        <h1>Meus Projetos</h1>
        <LinkButton to={"/newproject"} text={"Criar Projeto"}></LinkButton>
      </div>
      {message && <Message type="success" msg={message} />}
      {projectMessage && <Message type="success" msg={projectMessage} />}
      <Container customClass={"start"}>
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              id={project.id}
              name={project.name}
              budget={project.budget}
              category={project.category.name}
              key={project.id}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 && (
          <p>Não há projetos cadastrados!</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
