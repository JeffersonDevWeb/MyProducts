import { Link } from 'react-router-dom';

import { Container } from './styles';

import logo from '../../assets/images/logo.svg';

export default function Header() {
  return (
    <Container>
      <Link to="/home">
        <img src={logo} alt="MyProducts" width="200px" />
      </Link>
    </Container>
  );
}
