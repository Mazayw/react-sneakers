import Card from '../components/Card';

function Favorites({ favoriteItems = [], onChangeFavorite, onAddToCart }) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>Мои закладки</h1>
      </div>
      <div className="cards-container d-flex flex-wrap">
        {favoriteItems.map((item, index) => (
          <Card
            key={item.title + index}
            id={item.id}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            onFavorite={(item, isFavoriteActive) =>
              onChangeFavorite(item, isFavoriteActive)
            }
            onPlus={(obj, isPlusActive) => onAddToCart(obj, isPlusActive)}
            favorited={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
