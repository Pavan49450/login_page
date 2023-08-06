import { useContext } from 'react';
import AuthContext from "../../Store/AuthContext"
import classes from './Navigation.module.css';

const Navigation = (props) => {
    const ctx = useContext(AuthContext);
    console.log("isLoggedIn",ctx.isLoggedIn)
    console.log("onlogout",ctx.onlogout)
  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
