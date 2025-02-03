import { Link } from "react-router-dom";
import "./componentsCSS/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <Link to="/" className="custom-link">
        მთავარი
      </Link>

      <Link to="/history" className="custom-link">
        ისტორია
      </Link>
    </nav>
  );
};

export default Navbar;
