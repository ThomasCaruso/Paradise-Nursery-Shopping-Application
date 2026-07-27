import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import CartItem from './CartItem.jsx';
import './ProductList.css';

const plantCategories = [
  {
    category: 'Air-Purifying Plants',
    description: 'Leafy favorites that bring fresh energy to indoor spaces.',
    plants: [
      {
        id: 'snake-plant',
        name: 'Snake Plant',
        price: 15,
        image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=900&q=80',
        description: 'A resilient upright plant that tolerates low light.',
      },
      {
        id: 'spider-plant',
        name: 'Spider Plant',
        price: 12,
        image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=900&q=80',
        description: 'An easygoing plant with arching striped leaves.',
      },
      {
        id: 'peace-lily',
        name: 'Peace Lily',
        price: 18,
        image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7f?auto=format&fit=crop&w=900&q=80',
        description: 'Glossy foliage and elegant white blooms.',
      },
      {
        id: 'rubber-plant',
        name: 'Rubber Plant',
        price: 24,
        image: 'https://images.unsplash.com/photo-1602923668104-8f9e03d2320f?auto=format&fit=crop&w=900&q=80',
        description: 'Bold leaves that make a strong indoor statement.',
      },
      {
        id: 'boston-fern',
        name: 'Boston Fern',
        price: 20,
        image: 'https://images.unsplash.com/photo-1614594575810-6980bb6c6e8a?auto=format&fit=crop&w=900&q=80',
        description: 'Soft cascading fronds that enjoy gentle humidity.',
      },
      {
        id: 'areca-palm',
        name: 'Areca Palm',
        price: 28,
        image: 'https://images.unsplash.com/photo-1612363148951-15f16817648f?auto=format&fit=crop&w=900&q=80',
        description: 'Feathery palm foliage for a relaxed tropical feel.',
      },
    ],
  },
  {
    category: 'Low-Maintenance Plants',
    description: 'Reliable greenery for busy schedules and new plant parents.',
    plants: [
      {
        id: 'zz-plant',
        name: 'ZZ Plant',
        price: 25,
        image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=900&q=80',
        description: 'Glossy leaves and excellent tolerance for missed waterings.',
      },
      {
        id: 'golden-pothos',
        name: 'Golden Pothos',
        price: 14,
        image: 'https://images.unsplash.com/photo-1597305877032-0668b3c6413a?auto=format&fit=crop&w=900&q=80',
        description: 'Fast-growing trailing vines with golden variegation.',
      },
      {
        id: 'jade-plant',
        name: 'Jade Plant',
        price: 16,
        image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80',
        description: 'A compact succulent with thick evergreen leaves.',
      },
      {
        id: 'cast-iron-plant',
        name: 'Cast Iron Plant',
        price: 22,
        image: 'https://images.unsplash.com/photo-1611211232932-da3113c5b960?auto=format&fit=crop&w=900&q=80',
        description: 'A durable plant that performs well in shaded rooms.',
      },
      {
        id: 'aloe-vera',
        name: 'Aloe Vera',
        price: 13,
        image: 'https://images.unsplash.com/photo-1509423350716-97f2360af8e4?auto=format&fit=crop&w=900&q=80',
        description: 'A sun-loving succulent with sculptural leaves.',
      },
      {
        id: 'haworthia',
        name: 'Haworthia',
        price: 11,
        image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=900&q=80',
        description: 'A petite striped succulent ideal for desks and shelves.',
      },
    ],
  },
  {
    category: 'Flowering & Fragrant Plants',
    description: 'Colorful blooms and naturally inviting fragrance.',
    plants: [
      {
        id: 'lavender',
        name: 'Lavender',
        price: 19,
        image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=900&q=80',
        description: 'Purple blooms with a calm, familiar fragrance.',
      },
      {
        id: 'jasmine',
        name: 'Jasmine',
        price: 21,
        image: 'https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?auto=format&fit=crop&w=900&q=80',
        description: 'Delicate white flowers with a sweet evening scent.',
      },
      {
        id: 'african-violet',
        name: 'African Violet',
        price: 17,
        image: 'https://images.unsplash.com/photo-1612637968894-660373e23b03?auto=format&fit=crop&w=900&q=80',
        description: 'Velvety leaves and cheerful compact blooms.',
      },
      {
        id: 'orchid',
        name: 'Phalaenopsis Orchid',
        price: 32,
        image: 'https://images.unsplash.com/photo-1566907225472-7d0b2c021f80?auto=format&fit=crop&w=900&q=80',
        description: 'Long-lasting elegant flowers on graceful stems.',
      },
      {
        id: 'gardenia',
        name: 'Gardenia',
        price: 27,
        image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=900&q=80',
        description: 'Creamy white blossoms with a rich floral scent.',
      },
      {
        id: 'anthurium',
        name: 'Anthurium',
        price: 26,
        image: 'https://images.unsplash.com/photo-1617173944883-6ffbd35d584d?auto=format&fit=crop&w=900&q=80',
        description: 'Glossy foliage with vivid heart-shaped flowers.',
      },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const [activePage, setActivePage] = useState('plants');
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const isInCart = (plantId) => cart.some((item) => item.id === plantId);

  const handleAddToCart = (plant) => {
    dispatch(addItem({ ...plant, quantity: 1 }));
  };

  const showPlants = () => setActivePage('plants');
  const showCart = () => setActivePage('cart');

  return (
    <div className="shop-shell">
      <header className="navbar">
        <button className="brand" type="button" onClick={onHomeClick}>
          <span className="brand-mark" aria-hidden="true">🌿</span>
          <span>
            <strong>Paradise Nursery</strong>
            <small>Where Green Meets Serenity</small>
          </span>
        </button>

        <nav className="nav-links" aria-label="Primary navigation">
          <button type="button" onClick={onHomeClick}>Home</button>
          <button
            type="button"
            className={activePage === 'plants' ? 'active' : ''}
            onClick={showPlants}
          >
            Plants
          </button>
          <button
            type="button"
            className={`cart-link ${activePage === 'cart' ? 'active' : ''}`}
            onClick={showCart}
            aria-label={`Cart with ${cartItemCount} items`}
          >
            <span aria-hidden="true">🛒</span>
            Cart
            <span className="cart-count">{cartItemCount}</span>
          </button>
        </nav>
      </header>

      {activePage === 'plants' ? (
        <main className="product-page">
          <section className="catalog-intro">
            <p className="catalog-kicker">Houseplant collection</p>
            <h1>Find the right plant for every room.</h1>
            <p>
              Explore eighteen unique plants across three categories. Add a
              favorite to your cart and adjust quantities whenever needed.
            </p>
          </section>

          {plantCategories.map((group) => (
            <section className="plant-category" key={group.category}>
              <div className="category-heading">
                <div>
                  <h2>{group.category}</h2>
                  <p>{group.description}</p>
                </div>
                <span>{group.plants.length} plants</span>
              </div>

              <div className="product-grid">
                {group.plants.map((plant) => {
                  const added = isInCart(plant.id);
                  return (
                    <article className="plant-card" key={plant.id}>
                      <div className="plant-image-wrap">
                        <img src={plant.image} alt={plant.name} />
                      </div>
                      <div className="plant-card-body">
                        <div className="plant-card-heading">
                          <h3>{plant.name}</h3>
                          <span>${plant.price.toFixed(2)}</span>
                        </div>
                        <p>{plant.description}</p>
                        <button
                          className="add-to-cart-button"
                          type="button"
                          disabled={added}
                          onClick={() => handleAddToCart(plant)}
                        >
                          {added ? 'Added to Cart' : 'Add to Cart'}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      ) : (
        <CartItem onContinueShopping={showPlants} />
      )}
    </div>
  );
}

export default ProductList;
