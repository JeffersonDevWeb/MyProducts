import propTypes from 'prop-types';
import { useState, useEffect } from 'react';

import useErrors from '../../hooks/useErrors';

import { ButtonContainer } from './styles';

import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import CategoriesService from '../../services/CategoriesService';

export default function ProductForm({ buttonLabel, onSubmit }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  const {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();

        setCategories(categoriesList);
      // eslint-disable-next-line no-empty
      } catch {}
    }

    loadCategories();
  }, []);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Insira um nome!' });
    } else {
      removeError('name');
    }
  }

  function handlePriceChange(event) {
    setPrice(event.target.value);

    if (!event.target.value) {
      setError({ field: 'price', message: 'Insira um Preço!' });
    } else {
      removeError('price');
    }
  }

  function handleQuantityChange(event) {
    setQuantity(event.target.value);

    if (!event.target.value) {
      setError({ field: 'quantity', message: 'Insira a quantidade!' });
    } else {
      removeError('quantity');
    }
  }

  function handleCategoryChange(event) {
    setCategoryId(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSubmit({
      name, price, quantity, categoryId,
    });
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          value={name}
          placeholder="Nome *"
          onChange={handleNameChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('price')}>
        <Input
          type="number"
          error={getErrorMessageByFieldName('price')}
          value={price}
          placeholder="Preço *"
          onChange={handlePriceChange}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('quantity')}>
        <Input
          type="number"
          error={getErrorMessageByFieldName('quantity')}
          value={quantity}
          placeholder="Quantidade em estoque *"
          onChange={handleQuantityChange}
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={categoryId}
          onChange={handleCategoryChange}
        >
          <option value="" disabled>Categoria</option>
          <option value=""> Sem Categoria</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}

        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>

    </form>
  );
}

ProductForm.propTypes = {
  buttonLabel: propTypes.string.isRequired,
  onSubmit: propTypes.func.isRequired,
};
