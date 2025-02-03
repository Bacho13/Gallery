import { Link, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

import "./componentsCSS/Layout.css";

const Layout = () => {
  return (
    <div>
      <header>
        <Link to="/">
          <h1>ფოტო გალერეა</h1>
        </Link>
        <Navbar />
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
