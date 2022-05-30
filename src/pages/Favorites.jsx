import Card from '../components/Card';

function Favorites({
  items = [],
  searchValue,
  onAddToCart,
  onChangeSearchInput,
  setSearchValue,
}) {
  console.log(items);
  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>{searchValue ? `Поиск "${searchValue}"` : 'Мои закладки'}</h1>
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
      <div className="cards-container d-flex flex-wrap">
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
  );
}

export default Favorites;
