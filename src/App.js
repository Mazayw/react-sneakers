import React from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch('https://628c04563df57e983ec85bcd.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((data) => setItems(data));
  }, []);

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onClickCart={() => setCartOpened(!cartOpened)} />}
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
          {items.map((obj) => (
            <Card title={obj.title} price={obj.price} imageUrl={obj.imageUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
