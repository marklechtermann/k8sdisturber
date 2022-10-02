import React from "react";
import "./Bash.css";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Bash: React.FC<Props> = ({ children }) => {
  return <div className="bash">{children}</div>;
};

export default Bash;
