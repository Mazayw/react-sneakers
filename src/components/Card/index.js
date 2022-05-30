import React from 'react';
import styles from './Card.module.scss';

function Card({
  onFavorite,
  imageUrl,
  title,
  price,
  onPlus,
  id,
  favorited = false,
}) {
  const [isPlusActive, setActivePlus] = React.useState(false);
  const [isFavoriteActive, setActiveFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ title, imageUrl, price }, isPlusActive);
    setActivePlus(!isPlusActive);
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price }, isFavoriteActive);
    setActiveFavorite(!isFavoriteActive);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          onClick={onClickFavorite}
          src={isFavoriteActive ? 'img/like-active.svg' : '/img/like.svg'}
          alt="Like button like"
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt={title} />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className="cu-p"
          onClick={onClickPlus}
          src={isPlusActive ? 'img/btn-checked.svg' : 'img/btn-plus.svg'}
          alt="Add button"
        />
      </div>
    </div>
  );
}

export default Card;
