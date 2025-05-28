import { PencilLineIcon } from "@phosphor-icons/react";
import styles from "./styles.module.css";
import { Avatar } from "../Avatar";

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=50&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <div className={styles.profile}>
        <Avatar src="https://github.com/ms-lucas.png"/>

        <strong>Lucas Moreira</strong>
        <span>Desenvolvedor Web</span>
      </div>

      <footer>
        <a href="#">
          <PencilLineIcon size={20} />
          Editar seu perfil
        </a>
      </footer>
    </aside>
  );
}
