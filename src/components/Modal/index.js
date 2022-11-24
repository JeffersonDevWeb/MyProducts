/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
import { useState } from 'react';
import propTypes from 'prop-types';
import ReactDOM from 'react-dom';

import { Overlay, Container, Footer } from './styles';
import ProductsServices from '../../services/ProductsServices';
import { sucess, error } from '../Toasts';

import useErrors from '../../hooks/useErrors';

import closeIcon from '../../assets/images/icons/close-icon.svg';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Button from '../Button';

export default function Modal({
  product, danger, visible, onClose,
}) {
  if (!visible) {
    return null;
  }

  console.log(product);

  const [quantity, setQuantity] = useState('');

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  console.log(errors);

  function handleQuantityChange(event) {
    setQuantity(event.target.value);

    if (!event.target.value) {
      setError({ field: 'quantity', message: 'Insira a quantidade!' });
    } else {
      removeError('quantity');
    }
  }

  // eslint-disable-next-line consistent-return
  async function handleDelete(id) {
    const Actualquantity = Number(product.quantity);

    if (quantity > Actualquantity) {
      return error('Quantidade Invalida');
    }

    const buyed = Actualquantity - quantity;
    const buyProduct = {
      quantity: String(buyed),
    };

    const response = await ProductsServices.buyProducts(id, buyProduct);

    if (response) {
      sucess('Deletado com sucesso');
    }
    onClose();
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <header>
          <h1>Remover Itens</h1>

          <button type="button" onClick={onClose}>
            <img src={closeIcon} alt="Fechar modal" />
          </button>
        </header>

        <p>
          Quantos itens você deseja deletar?
        </p>

        <FormGroup error={getErrorMessageByFieldName('quantity')}>
          <Input
            type="number"
            error={getErrorMessageByFieldName('quantity')}
            value={quantity}
            placeholder="Quantidade de itens à remover *"
            onChange={handleQuantityChange}
            max="10"
            min="1"
          />
        </FormGroup>

        <Footer>
          <button type="button" onClick={onClose} className="cancel-Button">Cancelar</button>

          <Button type="button" className="delete-Button" onClick={() => handleDelete(product.id)}>
            Deletar
          </Button>
        </Footer>
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
