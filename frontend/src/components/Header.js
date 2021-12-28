import React, { useState } from 'react';
import { Route, Switch, Link} from 'react-router-dom';
import logoPath from "../images/logo.svg"; // Путь к изображению внутри сборки


function Header(props) {
  const [mobileMenuOpened, setMobileMenuOpened,] = useState(false);
  const mobileMenuLinks = React.useRef(); // записываем объект, возвращаемый хуком, в переменную

  const userEmail = (props.user.email) ? <p className="header__login-link">{props.user.email}</p> : '';

  const active = mobileMenuOpened ? ' header__mobile-menu-link_active' : '';


  function handleClickExit(evt) {
    props.onSignOut();
  }

  function handleClickMenu(evt) {
    if (mobileMenuOpened === false) {
      setMobileMenuOpened(true);
      mobileMenuLinks.current.style.display = 'flex';
    } else {
      setMobileMenuOpened(false);
      mobileMenuLinks.current.style.display = 'none';
    }

  }

  return (
    <header className="header">
      <img
        src={logoPath}
        className="header__logo"
        alt="Логотип Mesto"
      />
      <div className="header__links" ref={mobileMenuLinks}>
        {userEmail}
        <Switch>
          <Route path="/sign-in">
            <Link to="/sign-up" className="header__login-link">Регистрация</Link>
          </Route>
          <Route path="/sign-up">
            <Link to="/sign-in" className="header__login-link">Войти</Link>
          </Route>
          <Route path="/">
            <button className="header__login-link" onClick={handleClickExit}>Выйти</button>
          </Route>
        </Switch>
      </div>
      <button href="#" className={`header__mobile-menu-link${active}`} onClick={handleClickMenu}></button>
    </header>
  );
}

export default Header;
