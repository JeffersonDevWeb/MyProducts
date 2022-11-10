/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { useState, useContext } from 'react';

import { Link } from 'react-router-dom';
import { ButtonContainer, RegisterContainer } from '../styles';

import { Context } from '../../../contexts/AuthContext';

import FormGroup from '../../../components/FormGroup';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import visibilityOn from '../../../assets/images/icons/VisibilityOn.svg';
import visibilityOff from '../../../assets/images/icons/VisibilityOff.svg';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);

  function handleEmailChange(event) {
    setEmail(event.target.value.toLowerCase());
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function togglePasswordVisibility() {
    setPasswordShow(!passwordShow);
  }

  // eslint-disable-next-line consistent-return
  const { handleLogin } = useContext(Context);

  return (
    <>
      <form>
        <FormGroup>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
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
