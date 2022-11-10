import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

import arrow from '../../assets/images/icons/arrow.svg';

import { Container } from './styles';

export default function Pageheader({ title }) {
  return (
    <Container>
      <Link to="/home">
        <img src={arrow} alt="Voltar" />
        <span>Voltar</span>
      </Link>

      <h1>{title}</h1>
    </Container>
  );
}

Pageheader.propTypes = {
  title: propTypes.string.isRequired,
};
