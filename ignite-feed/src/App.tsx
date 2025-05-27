import { Header } from "./components/Header";

import styles from "./App.module.css";

import "./app.module.css";
import { Sidebar } from "./components/Sidebar";

export function App() {
  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>Main</main>
      </div>
    </div>
  );
}
