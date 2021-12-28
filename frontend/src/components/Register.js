import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as Auth from '../utils/auth.js';
import { useHistory } from "react-router";

function Register(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Логика обработки формы регистрации

    Auth.register(email, password)
    .then((res) => {
      props.onRegister(true, 'Вы успешно зарегистрировались!');
      history.push('/sign-in');
    })
    .catch((err) => {
      console.log(`Ошибка ${err}`)
      props.onRegister(false, 'Что-то пошло не так!');
    });

  }

  return (
    <main>
      <form className="form form_size_short" name=""  onSubmit={handleSubmit}>
        <h2 className="form__title form__title_theme_dark">Регистрация</h2>
        <fieldset className="form__profile-info">
          <input
            //ref={cardTitleField}
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
            //ref={cardLinkField}
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
        <button type="submit" value="Сохранить" className="form__submit-button form__submit-button_theme_dark">Зарегистрироваться</button>
        <p className="form__link">Уже зарегистрированы? <Link style={{color: '#fff'}} to="/sign-in">Войти</Link></p>
      </form>
    </main>
  );
}

//export default Register;
export default withRouter(Register);
