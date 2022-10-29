import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Pageheader from '../../components/PageHeader';
import ProductForm from '../../components/ProductForm';
import Loader from '../../components/Loader';
import ProductsServices from '../../services/ProductsServices';
import { error, sucess } from '../../components/Toasts';

export default function UpdateProduct() {
  const { id } = useParams();
  const history = useHistory();
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await ProductsServices.getProductById(id);

        setProduct(response);
        setIsLoading(false);
      } catch {
        history.push('/');

        error('Erro ao acessar');
      }
    }

    loadProduct();
  }, [id, history]);

  async function handleSubmit(formData) {
    try {
      const newProduct = {
        product_name: formData.name,
        quantity: formData.quantity,
        price: formData.price,
        category_id: formData.categoryId,
      };

      await ProductsServices.editProducts(id, newProduct);

      sucess('Alterado com sucesso');
    } catch {
      error('Erro ao alterar');
    }
  }

  return (
    <>
      <Loader isLoading={isLoading} />

      <Pageheader
        title={`Editar ${product[0]?.product_name}`}
      />

      <ProductForm
        buttonLabel="Salvar Alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
