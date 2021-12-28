import React from 'react';
import * as Auth from '../utils/auth.js';
import { useHistory } from 'react-router';

function Login(props) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const history = useHistory();

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleLogin(email) {
    props.onLogin(email);
  }

  function handleError(message) {
    props.onLoginError(false, message);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Логика обработки формы авторизации
    if (email === '' || password === ''){
      return;
    }
    Auth.authorize(email, password)
    .then((data) => {
      if (data.token){
        localStorage.setItem('jwt', data.token);
        handleLogin(email);
        history.push('/');
      }
    })
    .catch((err) => {
      //console.log(`Ошибка ${err}`)
      if (err.message) {
        handleError(err.message);
      }
    });
  }

  return (
    <main>
      <form className="form form_size_short" name="login-form" onSubmit={handleSubmit}>
        <h2 className="form__title form__title_theme_dark">Вход</h2>
        <fieldset className="form__profile-info">
          <input
            type="email"
            name="email"
            id="email-input"
            className="form__text-input form__text-input_theme_dark form__text-input_name_title"
            value={email}
            placeholder="E-mail"
            onChange={handleChangeEmail}
            required
          />
          <span className="form__input-error email-input-error"></span>
          <input
            type="password"
            name="password"
            id="password-input"
            className="form__text-input form__text-input_theme_dark form__text-input_name_link"
            value={password}
            placeholder="Пароль"
            minLength="6"
            maxLength="30"
            onChange={handleChangePassword}
            required
          />
          <span className="form__input-error password-input-error"></span>
        </fieldset>
        <button type="submit" value="Сохранить" className="form__submit-button form__submit-button_theme_dark">Войти</button>
      </form>
    </main>
  );
}

export default Login;
