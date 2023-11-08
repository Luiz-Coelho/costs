import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import { useEffect, useState } from "react";

import styles from "../project/ProjectForm.module.css";

function ServiceForm({ handleSubmit, btnText, projectData }) {
  const [service, setService] = useState({});

  function handleChange(e) {
    setService({ ...service, [e.target.name]: e.target.value });
  }

  const submit = (e) => {
    e.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);
  };

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        name={"name"}
        text={"Nome do Serviço"}
        type={"text"}
        placeholder={"Insira o nome do serviço"}
        handleOnChange={handleChange}
      />
      <Input
        name={"cost"}
        text={"Custo do Serviço"}
        type={"number"}
        placeholder={"Insira o custo total"}
        handleOnChange={handleChange}
      />
      <Input
        name={"description"}
        text={"Descrição do Serviço"}
        type={"text"}
        placeholder={"Descreva o serviço"}
        handleOnChange={handleChange}
      />
      <SubmitButton text={btnText} />
    </form>
  );
}

export default ServiceForm;
