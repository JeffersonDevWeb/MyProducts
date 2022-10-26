import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import NewProduct from './pages/NewProduct';
import UpdateProduct from './pages/UpdateProduct';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/new" component={NewProduct} />
      <Route path="/edit/:id" component={UpdateProduct} />
    </Switch>
  );
}
