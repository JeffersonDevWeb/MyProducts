import { useContext } from 'react';

import { Context } from '../../contexts/AuthContext';

import Pageheader from '../../components/PageHeader';
import ProductForm from '../../components/ProductForm';
import ProductsServices from '../../services/ProductsServices';
import { sucess, error } from '../../components/Toasts';

export default function NewProduct() {
  const { userId } = useContext(Context);

  async function handleSubmit(formData) {
    try {
      const product = {
        product_name: formData.name,
        quantity: formData.quantity,
        price: formData.price,
        category_id: formData.categoryId,
        user_id: userId,
      };

      await ProductsServices.createProducts(product);

      sucess('Adicionado com Sucesso');
    } catch {
      error('Erro ao adicionar');
    }
  }

  return (
    <>
      <Pageheader
        title="Cadastrar Produto"
      />

      <ProductForm
        buttonLabel="Cadastrar Produto"
        onSubmit={handleSubmit}
      />
    </>
  );
}
