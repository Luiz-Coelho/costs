import { parse, v4 as uuidv4 } from "uuid";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import styles from "./Project.module.css";

import Loading from "../layout/Loading";
import Container from "../layout/Container";
import Message from "../layout/Message";

import ProjectForm from "../project/ProjectForm";
import ServiceForm from "../service/ServiceForm";
import ServiceCard from "../service/ServiceCard";

function Project() {
  let { id } = useParams();
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setServices(data.services);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function editPost(project) {
    setMessage();

    // budget validation
    if (project.budget < project.cost) {
      setMessage("O Orçamento não pode ser menor que o custo do projeto!");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setShowProjectForm(false);
        setMessage("Projeto alterado com sucesso!");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  function createService(project) {
    setMessage("");

    const lastService = project.services[project.services.length - 1];

    lastService.id = uuidv4();

    const newCost = parseFloat(project.cost) + parseFloat(lastService.cost);

    if (newCost > parseFloat(project.budget)) {
      setMessage(
        "Orçamento ultrapassado, verifique o valor do serviço. Não foi possível criar o serviço."
      );
      setType("error");
      project.services.pop();
      return false;
    }

    project.cost = newCost;

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(data);
        setMessage("Serviço adicionado com sucesso!");
        setType("success");
        setShowServiceForm(!showServiceForm);
      })
      .catch((err) => console.log(err));
  }

  function removeService(id, cost) {
    setMessage("");

    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    );

    const projectUpdated = project;
    projectUpdated.services = servicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated);
        setServices(servicesUpdated);
        setMessage("Serviço removido com sucesso.");
        setType("success");
      })
      .catch((err) => console.log(err));
  }

  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  if (!project.name) return <Loading />

  return (
    <div className={styles.project_details}>
      <Container customClass={"column"}>
        {message && <Message type={type} msg={message} />}
        <div className={styles.details_container}>
          <h1>Projeto: {project.name}</h1>
          <button onClick={toggleProjectForm} className={styles.btn}>
            {!showProjectForm ? "Editar Projeto" : "Fechar"}
          </button>
          {!showProjectForm ? (
            <div className={styles.project_info}>
              <p>
                <span>Categoria: </span>
                {project.category.name}
              </p>
              <p>
                <span>Orçamento total: </span>
                R${project.budget}
              </p>
              <p>
                <span>Total utilizado: </span>
                R${project.cost}
              </p>
            </div>
          ) : (
            <ProjectForm
              handleSubmit={editPost}
              btnText={"Concluir Edição"}
              projectData={project}
            ></ProjectForm>
          )}
        </div>
        <div className={styles.details_container}>
          <h2>Adicione um serviço:</h2>
          <button onClick={toggleServiceForm} className={styles.btn}>
            {!showServiceForm ? "Adicionar Serviço" : "Fechar"}
          </button>
          <div className={styles.project_info}>
            {showServiceForm && (
              <ServiceForm
                handleSubmit={createService}
                btnText={"Incluir serviço"}
                projectData={project}
              ></ServiceForm>
            )}
          </div>
        </div>
        <h2>Serviços:</h2>
        <Container customClass="start">
          {services.length > 0 &&
            services.map((service) => (
              <ServiceCard
                name={service.name}
                cost={service.cost}
                description={service.description}
                id={service.id}
                key={service.id}
                handleRemove={removeService}
              />
            ))}
          {services.length === 0 && <p>Não há serviços cadastrados.</p>}
        </Container>
      </Container>
    </div>
  );
}

export default Project;
