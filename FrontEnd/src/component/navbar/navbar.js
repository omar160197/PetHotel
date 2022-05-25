import { useLocation } from "react-router-dom";

const NavbarComponent = () => {
  const location = useLocation();
  return <>{location.pathname !== "/login" && <h1>Navbar</h1>}</>;
};
export default NavbarComponent;

