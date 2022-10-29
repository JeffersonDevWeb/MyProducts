import Pageheader from '../../components/PageHeader';
import ProductForm from '../../components/ProductForm';
import ProductsServices from '../../services/ProductsServices';
import { sucess, error } from '../../components/Toasts';

export default function NewProduct() {
  async function handleSubmit(formData) {
    try {
      const product = {
        product_name: formData.name,
        quantity: formData.quantity,
        price: formData.price,
        category_id: formData.categoryId,
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
