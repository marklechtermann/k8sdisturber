import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";

type Props = {
  children: JSX.Element | JSX.Element[];
};

const Layout: React.FC<Props> = ({ children }) => (
  <div className={styles.container}>
    <Sidebar></Sidebar>
    <div>{children}</div>
  </div>
);

export default Layout;
