import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';
import axios from 'axios';

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
      <Header onClickCart={onOpenCart} />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>{searchValue ? `Поиск "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            {searchValue && (
              <img
                className="clearBtn"
                src="/img/btn-remove.svg"
                alt="Clear search"
                onClick={() => setSearchValue('')}
              />
            )}
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Поиск..."
            ></input>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items
            .filter((el) =>
              el.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((item, index) => (
              <Card
                key={index}
                title={item.title}
                price={item.price}
                imageUrl={item.imageUrl}
                onFavorite={() => console.log('add in Favorites')}
                onPlus={(obj, isPlusActive) => onAddToCart(obj, isPlusActive)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
