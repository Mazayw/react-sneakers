function Drawer({ onRemoveFromCart, onClickCart, cartItems = [] }) {
  return (
    <div className="overlay">
      <div className="drawer d-flex flex-column">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img
            className="cu-p"
            src="/img/btn-remove.svg"
            alt="Close cart"
            onClick={onClickCart}
          />
        </h2>
        {cartItems.length > 0 ? (
          <div className="h100p">
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
                    onClick={() => onRemoveFromCart(obj)}
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
        ) : (
          <div className="empty-basket d-flex flex-column h100p">
            <div className="d-flex flex-column justify-center align-center h100p">
              <img
                className="empty-basket__image"
                src="/img/empty-basket.svg"
                alt="Empty basket"
              />
              <h4 className="empty-basket__title">Корзина пустая</h4>
              <p className="empty-basket__description text-center">
                Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
              </p>
              <button className="greenButton" onClick={onClickCart}>
                Вернутся назад
                <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Drawer;
