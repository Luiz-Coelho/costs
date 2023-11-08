import { BsFillTrashFill } from "react-icons/bs";
import styles from "../project/ProjectCard.module.css";

function ServiceCard({ name, cost, description, id, handleRemove }) {
  const remove = (e) => {
    e.preventDefault();
    handleRemove(id, cost);
  };

  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Custo do Serviço:</span> R${cost}
      </p>
      <p>
        <span>Descrição do Serviço:</span> {description}
      </p>
      <div className={styles.project_card_actions}>
        <button onClick={remove}>
          <BsFillTrashFill /> Excluir
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
