import React from 'react';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Header from './components/Header';
import Drawer from './components/Drawer';
import axios from 'axios';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios
      .get('https://628c04563df57e983ec85bcd.mockapi.io/items')
      .then((res) => {
        setItems(res.data);
      });
  }, []);

  const onOpenCart = () => {
    setCartOpened(!cartOpened);
    axios
      .get('https://628c04563df57e983ec85bcd.mockapi.io/cart')
      .then((res) => {
        setCartItems(res.data);
      });
  };

  const onAddToCart = (obj, isPlusActive) => {
    if (!isPlusActive) {
      axios.post('https://628c04563df57e983ec85bcd.mockapi.io/cart', obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onRemoveFromCart = (obj) => {
    axios.delete(`https://628c04563df57e983ec85bcd.mockapi.io/cart/${obj.id}`);
    setCartItems((prev) => prev.filter((el) => el.id !== obj.id));
    console.log(obj);
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          onRemoveFromCart={onRemoveFromCart}
          cartItems={cartItems}
          onClickCart={onOpenCart}
        />
      )}
      <Routes>
        <Route path="/*" element={<Header onClickCart={onOpenCart} />} />
      </Routes>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              onAddToCart={onAddToCart}
              onChangeSearchInput={onChangeSearchInput}
              setSearchValue={setSearchValue}
            />
          }
        />

        <Route
          exact
          path="/favorite"
          element={
            <Favorites
              items={items}
              searchValue={searchValue}
              onAddToCart={onAddToCart}
              onChangeSearchInput={onChangeSearchInput}
              setSearchValue={setSearchValue}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
