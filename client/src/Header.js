import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/" className="logo">
        My Temple Blog
      </Link>
      <nav>
        <Link to="/login" className="logo">
          Login
        </Link>
        <Link to="/register" className="logo">
          Register
        </Link>
      </nav>
    </header>
  );
}
