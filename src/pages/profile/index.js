import { Link } from 'react-router-dom';

import {
  useEffect, useState, useMemo, useCallback, useContext,
} from 'react';
import {
  Container, InputSearchContainer, Header, ListHeader, Card, ErrorContainer,
} from './styles';

import profile from '../../assets/images/icons/profile.svg';
import arrow from '../../assets/images/icons/arrow.svg';
import update from '../../assets/images/icons/update.svg';
import trash from '../../assets/images/icons/delete.svg';
import sad from '../../assets/images/icons/sadFace.svg';

import { Context } from '../../contexts/AuthContext';

import Loader from '../../components/Loader';
import Menu from '../../components/Menu/index';
import Button from '../../components/Button';
import Modal from '../../components/Modal/index';
import Pageheader from '../../components/PageHeader';

import ProductsServices from '../../services/ProductsServices';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchField, setSearchField] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const { userId } = useContext(Context);

  const filteredProducts = useMemo(() => products.filter((product) => (
    product.product_name.toLowerCase().includes(searchField.toLocaleLowerCase())
  )), [products, searchField]);

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);

      const productsList = await ProductsServices.getProductByUserId(userId, orderBy);

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

  function handleOpenModal(product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }
  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedProduct(null);
    loadProducts();
  }

  function handleOpenMenu() {
    setIsMenuOpen(true);
  }
  function handleCloseMenu() {
    setIsMenuOpen(false);
  }

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

    if (quantity <= 1) {
      ProductsServices.deleteProducts(id);
    }

    const buyed = quantity - 1;
    const buyProduct = {
      quantity: String(buyed),
    };

    const response = await ProductsServices.buyProducts(id, buyProduct);
    if (!response) {
      console.log('alright');
    }

    loadProducts();
  }

  function handleTryAgain() {
    loadProducts();
  }

  return (
    <Container>
      <Pageheader
        title="Meus Produtos"
      />

      <Modal
        visible={isModalVisible}
        product={selectedProduct}
        onClose={handleCloseModal}
      />

      <Menu
        visible={isMenuOpen}
        onClose={handleCloseMenu}
      />

      <button type="button" onClick={handleOpenMenu} className="logout">
        <img src={profile} alt="Perfil" />
      </button>

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

                <button type="button" onClick={product.quantity > 10 ? () => handleOpenModal(product) : () => handleDelete(product.id, product)}>
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
