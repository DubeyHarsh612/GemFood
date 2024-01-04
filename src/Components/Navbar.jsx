import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Modal from "../../Modal";
import { useEffect, useState } from "react";
import Cart from "../Screens/Cart";
import { useCart } from "./ContextReducer";

const Navbar = () => {
  const [btncolor, setbtncolor] = useState(false);
  const [btncolor2, setbtncolor2] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const handleBtnColor = () => {
    setbtncolor(true);
    setbtncolor2(false);
  };

  const handleBtnColor2 = () => {
    setbtncolor2(true);
    setbtncolor(false);
  };

  useEffect(() => {
    // Check the active link on page load
    const currentPath = window.location.pathname;
    if (currentPath === "/") {
      handleBtnColor();
    } else if (currentPath === "/myorder") {
      handleBtnColor2();
    }
  }, [activeLink]);

  let data = useCart();
  const [cartView, setcartView] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success ">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="#">
            GemFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="nav me-auto mb-2 nav-tabs color-white navnav">
              <li className="nav-item">
                <Link
                  className={`nav-link navnav ${btncolor ? "active" : " "}
                    
                  fs-5`}
                  aria-current="page"
                  to="/"
                  onClick={handleBtnColor}
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className={`nav-link color-white fs-5 ${
                      btncolor2 ? "active" : " "
                    } navnav`}
                    aria-current="page"
                    to="myorder"
                    onClick={handleBtnColor2}
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div className="d-flex ">
                <Link className="btn bg-white text-success mx-1 " to="/login">
                  Login
                </Link>

                <Link
                  className="btn bg-primary text-white mx-1"
                  to="/createuser"
                >
                  SignUp
                </Link>
              </div>
            ) : (
              <div className="d-flex ">
                <div
                  className="btn bg-white text-success mx-2 "
                  onClick={() => setcartView(true)}
                >
                  My Cart{"  "}
                  <Badge className="bg-danger">{data.length}</Badge>
                </div>

                {cartView ? (
                  <Modal onClose={() => setcartView(false)}>
                    {" "}
                    <Cart></Cart>
                  </Modal>
                ) : null}
                <div
                  className="btn bg-primary text-white mx-2"
                  to="/"
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
