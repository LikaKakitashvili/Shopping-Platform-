import "../styles/CategoryPage.css";
import womenProducts from "../data/women";
import menProducts from "../data/men";
import kidsProducts from "../data/kids";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "../contexts/CurrencyContext";
import { useCart } from "../contexts/CartContext";
import CartIcon from "../components/CartIcon/CartIcon";

const categoryMap = {
  women: { title: "Women", products: womenProducts },
  men: { title: "Men", products: menProducts },
  kids: { title: "Kids", products: kidsProducts },
};

export default function CategoryPage({ category }) {
  const { title, products } = categoryMap[category || "women"];
  const { currency } = useCurrency();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  return (
    <div className="category-page">
      <h1 className="category-title">{title}</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => navigate(`/product/${product.id}`, { state: { category } })}
            style={{ cursor: "pointer" }}
          >
            <div className="product-card__img-wrapper">
              <img src={product.image} alt={product.name} className="product-card__img" />
              <button
                className="product-card__add"
                onClick={e => {
                  e.stopPropagation();
                  const defaultSize = product.sizes?.[0] || "";
                  addToCart(product, defaultSize);
                }}
              >
                <CartIcon width={52} height={52} />
              </button>
            </div>
            <div className="product-card__info">
              <div className="product-card__name">{product.name}</div>
              <div className="product-card__price">{currency.symbol}{(product.price * currency.rate).toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 