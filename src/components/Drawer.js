function Drawer({ onClickRemove, onClickCart, items = [] }) {
  const onRemoveFromCart = (title) => {
    const index = items.findIndex((el) => el.title === title);
    items.splice(index, 1);
    onClickRemove((prev) => [...items]);
    console.log(title);
  };

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
          {items.map((obj) => (
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
                onClick={() => onRemoveFromCart(obj.title)}
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
