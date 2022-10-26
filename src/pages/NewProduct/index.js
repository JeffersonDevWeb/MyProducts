import Pageheader from '../../components/PageHeader';
import ProductForm from '../../components/ProductForm';
import ProductsServices from '../../services/ProductsServices';

export default function NewProduct() {
  async function handleSubmit(formData) {
    const product = {
      product_name: formData.name,
      quantity: formData.quantity,
      price: formData.price,
      category_id: formData.categoryId,
    };

    const response = await ProductsServices.createProducts(product);

    console.log(response);
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
