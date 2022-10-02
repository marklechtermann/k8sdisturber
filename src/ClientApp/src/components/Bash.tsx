import React from "react";
import styles from "./Bash.module.css";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Bash: React.FC<Props> = ({ children }) => {
  return <div className={styles.bash}>{children}</div>;
};

export default Bash;
