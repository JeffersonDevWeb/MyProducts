import { Link } from 'react-router-dom';

import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import {
  Container, InputSearchContainer, Header, ListHeader, Card, ErrorContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import update from '../../assets/images/icons/update.svg';
import trash from '../../assets/images/icons/delete.svg';
import sad from '../../assets/images/icons/sadFace.svg';

import Loader from '../../components/Loader';
import Button from '../../components/Button';

import ProductsServices from '../../services/ProductsServices';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchField, setSearchField] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredProducts = useMemo(() => products.filter((product) => (
    product.product_name.toLowerCase().includes(searchField.toLocaleLowerCase())
  )), [products, searchField]);

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);

      const productsList = await ProductsServices.listProducts(orderBy);

      setHasError(false);
      setProducts(productsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  function handleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleChangeSearchField(event) {
    setSearchField(event.target.value);
  }

  async function handleDelete(id, product) {
    const quantity = Number(product.quantity);

    if (quantity === 1) {
      ProductsServices.deleteProducts(id);
    }

    const buyed = quantity - 1;
    const buyProduct = {
      quantity: String(buyed),
    };

    const response = await ProductsServices.buyProducts(id, buyProduct);
    console.log(response);

    loadProducts();
  }

  function handleTryAgain() {
    loadProducts();
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <InputSearchContainer>
        <input
          value={searchField}
          type="text"
          placeholder="Pesquisar Produto"
          onChange={handleChangeSearchField}
        />
      </InputSearchContainer>

      <Header hasError={hasError}>
        {!hasError && (
          <strong>
            {filteredProducts.length}
            {filteredProducts.length === 1 ? ' Produto' : ' Produtos'}
          </strong>
        )}

        <Link to="/new">Novo Produto</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="sad" />

          <div className="details">
            <strong>Ocorreu um erro ao obter seus Produtos</strong>

            <Button type="button" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {filteredProducts.length > 0 && (
          <ListHeader orderBy={orderBy}>
            <button type="button" onClick={handleOrderBy}>
              <img src={arrow} alt="Sort Arrow" />
              <span>Produto</span>
            </button>
          </ListHeader>
          )}

          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <div className="info">
                <div className="product-name">
                  <strong>{product.product_name}</strong>
                  {product.category_name && (
                  <small>{product.category_name}</small>
                  )}
                </div>
                <span>
                  Preço:
                  {' '}
                  {product.price}
                  R$
                </span>
                <span>
                  Em estoque:
                  {' '}
                  {product.quantity}
                </span>
              </div>

              <div className="actions">
                <Link to={`edit/${product.id}`}>
                  <img src={update} alt="Atualizar" />
                </Link>

                <button type="button" onClick={() => handleDelete(product.id, product)}>
                  <img src={trash} alt="Delete" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}

// Saida: http://localhost:3000
// Destino: http://localhost:3001
