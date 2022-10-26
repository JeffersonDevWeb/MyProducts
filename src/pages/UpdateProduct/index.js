import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import Pageheader from '../../components/PageHeader';
import ProductForm from '../../components/ProductForm';
import Loader from '../../components/Loader';
import ProductsServices from '../../services/ProductsServices';
import { showToast } from '../../utils/showToast';

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
        showToast({
          type: 'danger',
          text: 'Contato não encontrado!',
        });
      }
    }

    loadProduct();
  }, [id, history]);

  async function handleSubmit(formData) {
    const newProduct = {
      product_name: formData.name,
      quantity: formData.quantity,
      price: formData.price,
      category_id: formData.categoryId,
    };

    const response = await ProductsServices.editProducts(id, newProduct);

    console.log(response);
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
