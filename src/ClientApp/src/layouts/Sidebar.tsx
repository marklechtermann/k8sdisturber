import k8sLogo from "../assets/kubernetes-icon.svg";
import NavItem from "./NavItem";
import styles from "./Sidebar.module.css";

type Props = {};

const Sidebar: React.FC<Props> = ({}) => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.topLabel}>
        <img className={styles.logo} src={k8sLogo} />
      </div>
      <div>
        <NavItem link="home" text="Home" />
        <NavItem link="memory" text="Memory" />
        <NavItem link="health" text="Health" />
        <NavItem link="heavy" text="Heavy" />
        <NavItem link="database" text="Database" />
        <NavItem link="swagger" text="Swagger" external />
      </div>
    </div>
  );
};

export default Sidebar;
