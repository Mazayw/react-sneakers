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
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    axios
      .get('https://628c04563df57e983ec85bcd.mockapi.io/items')
      .then((res) => {
        setItems(res.data);
      });
    onOpenFavorite();
  }, []);

  const onOpenCart = () => {
    setCartOpened(!cartOpened);
    axios
      .get('https://628c04563df57e983ec85bcd.mockapi.io/cart')
      .then((res) => {
        setCartItems(res.data);
      });
  };

  const onOpenFavorite = () => {
    axios
      .get('https://628c04563df57e983ec85bcd.mockapi.io/favorite')
      .then((res) => {
        setFavoriteItems(res.data);
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
  };

  const onChangeFavorite = (obj, isFavoriteActive) => {
    if (isFavoriteActive) {
      axios.delete(
        `https://628c04563df57e983ec85bcd.mockapi.io/favorite/${obj.id}`
      );
      setFavoriteItems((prev) => prev.filter((el) => el.id !== obj.id));
    } else {
      axios.post('https://628c04563df57e983ec85bcd.mockapi.io/favorite', obj);
      setFavoriteItems((prev) => [...prev, obj]);
    }
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
        <Route
          path="/*"
          element={
            <Header onClickCart={onOpenCart} onClickFavorite={onOpenFavorite} />
          }
        />
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
              onChangeFavorite={onChangeFavorite}
            />
          }
        />
        <Route
          exact
          path="/favorite"
          element={
            <Favorites
              favoriteItems={favoriteItems}
              onAddToCart={onAddToCart}
              onChangeFavorite={onChangeFavorite}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
