import "../styles/ShippingInfoPage.css";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCurrency } from "../contexts/CurrencyContext";
import CheckoutBreadcrumbs from "../components/CheckoutBreadcrumbs";

export default function ShippingInfoPage() {
  const { cart } = useCart();
  const { currency } = useCurrency();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    contact: "",
    firstName: "",
    lastName: "",
    address: "",
    note: "",
    city: "",
    postal: "",
    province: "",
    country: "",
    save: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('shippingInfo', JSON.stringify(form));
    navigate("/shipping-method");
  };

  const subtotal = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);

  return (
    <div className="shipping-info-page">
      <form className="shipping-info-form" onSubmit={handleSubmit}>
        <CheckoutBreadcrumbs currentStep="details" />
        <div className="shipping-info-label">Contact</div>
        <input name="contact" value={form.contact} onChange={handleChange} placeholder="Email or mobile phone number" required />
        <div className="shipping-info-label">Shipping Address</div>
        <div className="shipping-info-row">
          <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="Name" required />
          <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Second Name" required />
        </div>
        <input name="address" value={form.address} onChange={handleChange} placeholder="Address and number" required />
        <input name="note" value={form.note} onChange={handleChange} placeholder="Shipping note (optional)" />
        <div className="shipping-info-row">
          <input name="city" value={form.city} onChange={handleChange} placeholder="City" required />
          <input name="postal" value={form.postal} onChange={handleChange} placeholder="Postal Code" required />
          <div className="shipping-info-province-select-wrap">
            <select name="province" value={form.province} onChange={handleChange} required>
              <option value="">Province</option>
              <option value="AG">Agrigento</option>
              <option value="AL">Alessandria</option>
              <option value="AN">Ancona</option>
              <option value="AO">Aosta</option>
              <option value="AR">Arezzo</option>
              <option value="AP">Ascoli Piceno</option>
              <option value="AT">Asti</option>
              <option value="AV">Avellino</option>
              <option value="BA">Bari</option>
              <option value="BT">Barletta-Andria-Trani</option>
              <option value="BL">Belluno</option>
              <option value="BN">Benevento</option>
              <option value="BG">Bergamo</option>
              <option value="BI">Biella</option>
              <option value="BO">Bologna</option>
              <option value="BZ">Bolzano</option>
              <option value="BS">Brescia</option>
              <option value="BR">Brindisi</option>
              <option value="CA">Cagliari</option>
              <option value="CL">Caltanissetta</option>
              <option value="CB">Campobasso</option>
              <option value="CI">Carbonia-Iglesias</option>
              <option value="CE">Caserta</option>
              <option value="CT">Catania</option>
              <option value="CZ">Catanzaro</option>
              <option value="CH">Chieti</option>
              <option value="CO">Como</option>
              <option value="CS">Cosenza</option>
              <option value="CR">Cremona</option>
              <option value="KR">Crotone</option>
              <option value="CN">Cuneo</option>
              <option value="EN">Enna</option>
              <option value="FM">Fermo</option>
              <option value="FE">Ferrara</option>
              <option value="FI">Firenze</option>
              <option value="FG">Foggia</option>
              <option value="FC">Forlì-Cesena</option>
              <option value="FR">Frosinone</option>
              <option value="GE">Genova</option>
              <option value="GO">Gorizia</option>
              <option value="GR">Grosseto</option>
              <option value="IM">Imperia</option>
              <option value="IS">Isernia</option>
              <option value="SP">La Spezia</option>
              <option value="AQ">L'Aquila</option>
              <option value="LT">Latina</option>
              <option value="LE">Lecce</option>
              <option value="LC">Lecco</option>
              <option value="LI">Livorno</option>
              <option value="LO">Lodi</option>
              <option value="LU">Lucca</option>
              <option value="MC">Macerata</option>
              <option value="MN">Mantova</option>
              <option value="MS">Massa-Carrara</option>
              <option value="MT">Matera</option>
              <option value="VS">Medio Campidano</option>
              <option value="ME">Messina</option>
              <option value="MI">Milano</option>
              <option value="MO">Modena</option>
              <option value="MB">Monza e della Brianza</option>
              <option value="NA">Napoli</option>
              <option value="NO">Novara</option>
              <option value="NU">Nuoro</option>
              <option value="OG">Ogliastra</option>
              <option value="OT">Olbia-Tempio</option>
              <option value="OR">Oristano</option>
              <option value="PD">Padova</option>
              <option value="PA">Palermo</option>
              <option value="PR">Parma</option>
              <option value="PV">Pavia</option>
              <option value="PG">Perugia</option>
              <option value="PU">Pesaro e Urbino</option>
              <option value="PE">Pescara</option>
              <option value="PC">Piacenza</option>
              <option value="PI">Pisa</option>
              <option value="PT">Pistoia</option>
              <option value="PN">Pordenone</option>
              <option value="PZ">Potenza</option>
              <option value="PO">Prato</option>
              <option value="RG">Ragusa</option>
              <option value="RA">Ravenna</option>
              <option value="RC">Reggio Calabria</option>
              <option value="RE">Reggio Emilia</option>
              <option value="RI">Rieti</option>
              <option value="RN">Rimini</option>
              <option value="RM">Roma</option>
              <option value="RO">Rovigo</option>
              <option value="SA">Salerno</option>
              <option value="SS">Sassari</option>
              <option value="SV">Savona</option>
              <option value="SI">Siena</option>
              <option value="SR">Siracusa</option>
              <option value="SO">Sondrio</option>
              <option value="TA">Taranto</option>
              <option value="TE">Teramo</option>
              <option value="TR">Terni</option>
              <option value="TO">Torino</option>
              <option value="TP">Trapani</option>
              <option value="TN">Trento</option>
              <option value="TV">Treviso</option>
              <option value="TS">Trieste</option>
              <option value="UD">Udine</option>
              <option value="VA">Varese</option>
              <option value="VE">Venezia</option>
              <option value="VB">Verbano-Cusio-Ossola</option>
              <option value="VC">Vercelli</option>
              <option value="VR">Verona</option>
              <option value="VV">Vibo Valentia</option>
              <option value="VI">Vicenza</option>
              <option value="VT">Viterbo</option>
            </select>
          </div>
        </div>
        <div className="shipping-info-country-select-wrap">
          <select name="country" value={form.country} onChange={handleChange} required>
            <option value="">Country/Region</option>
            <option value="Italy">Italy</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
          </select>
        </div>
        <label className="shipping-info-checkbox">
          <input type="checkbox" name="save" checked={form.save} onChange={handleChange} />
          Save this information for a future fast checkout
        </label>
        <div className="shipping-info-actions">
          <span className="shipping-info-back" onClick={() => navigate("/cart")}>Back to cart</span>
          <button className="shipping-info-next" type="submit">Go to shipping</button>
        </div>
      </form>
      <div className="shipping-info-summary">
        <div className="shipping-info-summary-products">
          {cart.map(product => (
            <div className="shipping-info-summary-product" key={product.id + product.size}>
              <div className="shipping-info-summary-product-imgwrap">
                <img src={product.image} alt={product.name} />
                <span className="shipping-info-summary-qty">{product.quantity}</span>
              </div>
              <div>
                <div className="shipping-info-summary-name">{product.name.split(" ").slice(1).join(" ")}</div>
                <div className="shipping-info-summary-price">{currency.symbol}{(product.price * currency.rate).toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="shipping-info-summary-table">
          <div className="shipping-info-summary-row">
            <span>Subtotal</span>
            <span>{currency.symbol}{(subtotal * currency.rate).toFixed(2)}</span>
          </div>
          <div className="shipping-info-summary-row">
            <span>Shipping</span>
            <span>Calculated at the next step</span>
          </div>
          <div className="shipping-info-summary-row shipping-info-summary-row--total">
            <span>Total</span>
            <span>{currency.symbol}{(subtotal * currency.rate).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 