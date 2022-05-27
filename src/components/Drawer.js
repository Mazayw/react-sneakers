import React from 'react';
import axios from 'axios';

function Drawer({ onClickRemove, onClickCart, items = [] }) {
  const [cartItems, setCartItems] = React.useState([]);

  const onRemoveFromCart = (id) => {
    const index = cartItems.findIndex((el) => el.id === id);
    cartItems.splice(index, 1);
    setCartItems((prev) => [...cartItems]);
    axios.delete(`https://628c04563df57e983ec85bcd.mockapi.io/cart/${id}`);
    //axios.post('https://628c04563df57e983ec85bcd.mockapi.io/cart', cartItems);
    console.log(id);
  };

  React.useEffect(() => {
    axios
      .get('https://628c04563df57e983ec85bcd.mockapi.io/cart')
      .then((res) => {
        setCartItems(res.data);
      });
  }, []);

  return (
    <div className="overlay">
      <div className="drawer d-flex flex-column">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Remove"
            onClick={onClickCart}
          />
        </h2>
        <div className="items flex">
          {cartItems.map((obj) => (
            <div className="cartItem d-flex align-center mb-20">
              <div
                style={{ backgroundImage: `url(${obj.imageUrl})` }}
                className="cartItemImg d-flex"
              ></div>
              <div className="20">
                <p className="mb-5">{obj.title}</p>
                <b>{obj.price}руб.</b>
              </div>
              <img
                className="removeBtn"
                src="/img/btn-remove.svg"
                alt="Remove"
                onClick={() => onRemoveFromCart(obj.id)}
              />
            </div>
          ))}
        </div>
        <div className="cartTotalBlock">
          <ul>
            <li className="d-flex">
              <span>Итого</span>
              <div></div>
              <b>24 498 руб.</b>
            </li>
            <li className="d-flex">
              <span>Налог 5%:</span>
              <div></div>
              <b>1074 руб.</b>
            </li>
          </ul>
          <button className="greenButton">
            Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Drawer;
