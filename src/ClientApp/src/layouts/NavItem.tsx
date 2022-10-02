import { Link } from "react-router-dom";
import styles from "./NavItem.module.css";

type Props = {
  link: string;
  text: string;
  external?: boolean;
};

const NavItem: React.FC<Props> = ({ link, text, external = false }) => {
  return (
    <Link className={styles.link} to={link} target={external ? "_" : ""}>
      <div className={styles.navitem}>{text}</div>
    </Link>
  );
};

export default NavItem;
