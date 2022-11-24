/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState, useContext } from 'react';

import { Link } from 'react-router-dom';
import { ButtonContainer, RegisterContainer } from '../styles';

import { Context } from '../../../contexts/AuthContext';
import isEmailValid from '../../../utils/isEmailValid';
import useErrors from '../../../hooks/useErrors';

import FormGroup from '../../../components/FormGroup';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';

import visibilityOn from '../../../assets/images/icons/VisibilityOn.svg';
import visibilityOff from '../../../assets/images/icons/VisibilityOff.svg';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  function handleEmailChange(event) {
    setEmail(event.target.value.toLowerCase());

    if (!event.target.value || !isEmailValid(event.target.value)) {
      const ErrorExists = errors.find((error) => error.field === 'email');

      if (ErrorExists) {
        return;
      }

      setError({
        field: 'email',
        message: 'Insira um e-mail Válido',
      });
    } else {
      removeError('email');
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function togglePasswordVisibility() {
    setPasswordShow(!passwordShow);
  }

  // eslint-disable-next-line consistent-return
  const { handleLogin, isLoading } = useContext(Context);

  return (
    <>
      <Loader isLoading={isLoading} />

      <form>
        <FormGroup error={getErrorMessageByFieldName('email')}>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            error={getErrorMessageByFieldName('email')}
            placeholder="E-mail *"
            required
          />
        </FormGroup>
        <FormGroup>
          <Input
            type={passwordShow ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            placeholder="Senha"
            required
          />

          <img src={passwordShow ? visibilityOn : visibilityOff} alt="Visibilidade" onClick={togglePasswordVisibility} />
        </FormGroup>

        <ButtonContainer>
          <Button type="button" onClick={() => handleLogin(email, password)}>
            Acessar
          </Button>
        </ButtonContainer>
      </form>

      <RegisterContainer>
        <small>Não tem uma conta?</small>
        <Link to="signUp">
          <strong>
            &nbsp;Registre-se
          </strong>
        </Link>
      </RegisterContainer>
    </>
  );
};

export default SignIn;
