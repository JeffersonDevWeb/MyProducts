import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';

import history from '../../contexts/utils/history';

import { AuthProvider } from '../../contexts/AuthContext';
import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';
import Header from '../Header';

import { Container } from './styles';
import Routes from '../../Routes';

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyles />

          <Container>
            <Header />
            <Routes />
            <ToastContainer
              newestOnTop
            />
          </Container>
        </ThemeProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
