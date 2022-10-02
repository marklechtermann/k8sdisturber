import { Link } from "react-router-dom";
import styles from "./NavItem.module.css";

type Props = {
  link: string;
  text: string;
};

const NavItem: React.FC<Props> = ({ link, text }) => {
  return (
    <Link className={styles.link} to={link}>
      <div className={styles.navitem}>{text}</div>
    </Link>
  );
};

export default NavItem;
