import React, { useState } from 'react';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  if (showProductList) {
    return <ProductList onHomeClick={() => setShowProductList(false)} />;
  }

  return (
    <main className="landing-page">
      <div className="landing-overlay" aria-hidden="true" />
      <section className="landing-content">
        <div className="landing-hero">
          <p className="eyebrow">Bring nature home</p>
          <h1>Paradise Nursery</h1>
          <p className="tagline">Where Green Meets Serenity</p>
          <button
            className="get-started-button"
            type="button"
            onClick={() => setShowProductList(true)}
          >
            Get Started
          </button>
        </div>
        <AboutUs />
      </section>
    </main>
  );
}

export default App;
