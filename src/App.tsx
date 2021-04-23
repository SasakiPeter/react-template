import React, { FC } from "react";
import styles from "./App.module.css";

const App: FC = () => (
  <div className={styles["hello-wrapper"]}>
    <p className={styles["hello-world"]}>Hello, World!</p>
  </div>
);

export default App;
