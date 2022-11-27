/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import { useContext } from 'react';
import propTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import { Context } from '../../contexts/AuthContext';
import { Overlay, Container } from './styles';

import logout from '../../assets/images/icons/logout.svg';
import closeIcon from '../../assets/images/icons/close-icon.svg';

export default function Modal({
  danger, visible, onClose,
}) {
  if (!visible) {
    return null;
  }
  const { handleLogout, userId } = useContext(Context);

  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <header>
          <h1>Menu</h1>

          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Fechar modal" />
          </button>
        </header>

        <Link to={`/profile/${userId}`} className="menu-options">
          <p>MEUS PRODUTOS</p>
        </Link>

        <button type="button" onClick={handleLogout} className="menu-options">
          SAIR
          {' '}
          <img src={logout} className="logout-svg" alt="sair" />
        </button>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: propTypes.bool,
  visible: propTypes.bool.isRequired,
  onClose: propTypes.func.isRequired,
};

Modal.defaultProps = {
  danger: false,
};
