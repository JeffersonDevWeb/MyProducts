import { useState } from 'react';

import { Link } from 'react-router-dom';
import { ButtonContainer, RegisterContainer } from '../styles';

import FormGroup from '../../../components/FormGroup';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { error, sucess } from '../../../components/Toasts';
import api from '../../../contexts/utils/api';

export default function signUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handleEmailChange(event) {
    setEmail(event.target.value.toLowerCase());
  }
  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  // eslint-disable-next-line consistent-return
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await api.post('/users', {
        username,
        email,
        password,
      });

      sucess('Adicionado com sucesso');
    } catch {
      error('Erro ao adicionar');
    }
  }

  return (
    <>
      <form>
        <FormGroup>
          <Input
            value={username}
            onChange={handleUsernameChange}
            placeholder="Nome do Usúario *"
            required
          />
        </FormGroup>

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
            value={password}
            onChange={handlePasswordChange}
            placeholder="Senha *"
            required
          />
        </FormGroup>

        <ButtonContainer>
          <Button type="button" onClick={handleSubmit}>
            Cadastrar
          </Button>
        </ButtonContainer>
      </form>

      <RegisterContainer>
        <small>Já tem uma conta?</small>
        <Link to="/">
          <strong>
            &nbsp;Acessar
          </strong>
        </Link>
      </RegisterContainer>
    </>
  );
}
