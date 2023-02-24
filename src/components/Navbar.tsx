import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Actiontype, DataValueContext } from "../AppContext";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { state, dispatch } = useContext(DataValueContext);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const userSignOut = async () => {
    await signOut(auth);
    navigate("/")  }; 
  return (
    <div className={state.darkMood ? "dark" : ""}>
      <div className="px-2 bg-gradient-to-r from-cyan-500 to-white dark:bg-gradient-to-r dark:from-black dark:to-slate-300">
        <nav className="py-8 flex justify-between  ">
          <h1 className="text-2xl font-josefin font-bold text-black dark:text-white">
            NathanDev
          </h1>
          <ul className="flex items-center px-10 ">
            <Link to="/" className="mr-6">
              Home
            </Link>
            {!user ? (
              <Link to="login" className="ml-4">
                Login
              </Link>
            ) : (
              <Link to="createposts">Create Posts</Link>
            )}
            <li className="ml-2 dark:text-white">
              {state.darkMood ? (
                <BsFillMoonStarsFill
                  onClick={() => {
                    dispatch({ type: Actiontype.darkmood });
                  }}
                />
              ) : (
                <BsSunFill
                  onClick={() => {
                    dispatch({ type: Actiontype.darkmood });
                  }}
                />
              )}
            </li>
            {user && (
              <li className="ml-3 flex flex-col ">
                {/* {user?.displayName} */}
                <p>
                  <img
                    className="rounded-full"
                    src={user?.photoURL || ""}
                    alt="usr"
                    width="30px"
                    height="40px"
                  />
                </p>

                <button onClick={userSignOut}>Sign Out </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};
