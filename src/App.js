import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar"
import FloatingCart from "./Components/FloatingCart/FloatingCart";
import Home from "./Pages/Home/Home";
import Contact from "./Pages/Contact/Contact";
import ShoppingCart from "./Pages/ShoppingCart/ShoppingCart"
import Products from "./Pages/Products/Products";
import ProductShowcase from "./Pages/ProductShowcase/ProductShowcase";
import Signup from "./Components/Identifiant/Signup/Signup";
import Login from "./Components/Identifiant/Login/Login";
import Welcome from './Components/Welcome/Welcome'





function App() {
  return (
    <Router>
      <Navbar />
      <FloatingCart />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/produits" component={Products} />
        <Route exact path="/produits/:id" component={ProductShowcase} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/shoppingCart" component={ShoppingCart} />
        <Route exact path="/singup" component={Signup} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/welcome" component={Welcome} />
      </Switch>
    </Router>
  );
}

export default App;
