import logo from "../../logo.svg";
import { BsSunFill } from "react-icons/bs";
import { SimpleInput, OutlineButton } from "../index";
import { Link } from "react-router-dom";
import { ThemeState } from "../../context/theme/ThemeProvider";
import { AuthState } from "../../context/auth/AuthProvider";

const Navbar = () => {
  const { toggleTheme } = ThemeState();
  const { authInfo, handleLogout } = AuthState();
  const { isLoggedIn } = authInfo;

  return (
    <div className="dark:bg-[#161B22]">
      <div className="dark:bg-[#161B221] max-w-screen-xl mx-auto p-2 text-white ">
        <div className="flex justify-between items-center">
          <Link to="/">
            <img src={logo} alt="logo" className="h-10" />
          </Link>
          <ul>
            <li className="flex items-center space-x-4 bg-[#161B22]">
              <button className=" p-1 rounded">
                <BsSunFill
                  onClick={toggleTheme}
                  className="text-white"
                  size={24}
                />
              </button>
              <SimpleInput type="text" label={"Search"} name="search" />
              <Link to="/sign-in">
                <div className="w-13">
                  {isLoggedIn ? (
                    <OutlineButton onClick={handleLogout}>Log out</OutlineButton>
                  ) : (
                    <OutlineButton>Log in</OutlineButton>
                  )}
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
