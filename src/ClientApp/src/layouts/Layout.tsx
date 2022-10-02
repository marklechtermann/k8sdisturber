import NavMenu from "./NavMenu";
import styles from "./Layout.module.css";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Layout: React.FC<Props> = ({ children }) => (
  <div className={styles.container}>
    <NavMenu></NavMenu>
    <div>{children}</div>
  </div>
);

export default Layout;
