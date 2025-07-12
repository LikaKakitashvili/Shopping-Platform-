import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useCurrency } from "../contexts/CurrencyContext";
import womenProducts from "../data/women";
import menProducts from "../data/men";
import kidsProducts from "../data/kids";
import "../styles/ProductPage.css";


const categoryMap = {
  women: womenProducts,
  men: menProducts,
  kids: kidsProducts,
};

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart, openCart } = useCart();
  const location = useLocation();
  const category = location.state?.category;

  let product = null;
  if (category) {
    product = categoryMap[category].find((p) => String(p.id) === String(id));
  } else {
    for (const arr of Object.values(categoryMap)) {
      const found = arr.find((p) => String(p.id) === String(id));
      if (found) product = found;
    }
  }
  const images = Array.isArray(product?.image) ? product.image : [product?.image];
  
  const { currency } = useCurrency();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "S");

  if (!product) return <div style={{ padding: 40 }}>Product not found</div>;

  return (
    <div className="product-page">
      <div className="product-gallery">
        <div className="product-thumbnails">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`thumb-${i}`}
              className={`product-thumbnail${i === selectedImage ? " product-thumbnail--active" : ""}`}
              onClick={() => setSelectedImage(i)}
            />
          ))}
        </div>
        <div className="product-main-image">
          <img src={images[selectedImage]} alt={product.name} />
        </div>
      </div>
      <div className="product-info">
        <h2 className="product-brand">{product.name.split(" ")[0]}</h2>
        <h3 className="product-name">{product.name.split(" ").slice(1).join(" ")}</h3>
        <div className="product-label">SIZE:</div>
        <div className="product-sizes">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={`product-size${size === selectedSize ? " product-size--active" : ""}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
        <div className="product-label">PRICE:</div>
        <div className="product-price">{currency.symbol}{(product.price * currency.rate).toFixed(2)}</div>
        <button className="product-add-to-cart" onClick={() => { addToCart(product, selectedSize); }}>ADD TO CART</button>
        <div className="product-description">{product.description || "No description."}</div>
      </div>
    </div>
  );
} 