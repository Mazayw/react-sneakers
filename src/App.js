import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch('https://628c04563df57e983ec85bcd.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((data) => setItems(data));
  }, []);

  const onAddToCart = (obj, isPlusActive) => {
    if (isPlusActive) {
      setCartItems((prev) => [...prev.filter((el) => el.title !== obj.title)]);
    } else {
      setCartItems((prev) => [...prev, obj]);
    }
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          onClickRemove={setCartItems}
          items={cartItems}
          onClickCart={() => setCartOpened(!cartOpened)}
        />
      )}
      <Header onClickCart={() => setCartOpened(!cartOpened)} />
      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..."></input>
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items.map((item) => (
            <Card
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
