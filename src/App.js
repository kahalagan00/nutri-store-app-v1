import { useState } from "react";
import drugs from "./drugs.json";

export default function App() {
  const [shoppingList, setShoppingList] = useState([]);

  // HANDLERS
  function handleAddToCart(title, quantity, price, imageLink) {
    const isIncluded = shoppingList.find((item) => item.title === title);

    // Add new item to the shopping list if it doesn't exist
    // If it does exist then just add the incoming quantity
    if (!isIncluded) {
      setShoppingList((list) => [
        ...list,
        {
          title: title,
          quantity: quantity,
          price: price,
          imageLink: imageLink,
        },
      ]);
    } else {
      setShoppingList((list) =>
        list.map((item) => {
          if (item.title === title) {
            const updatedQuantity = quantity + item.quantity;
            return { ...item, quantity: updatedQuantity };
          }
          return item;
        })
      );
    }
  }

  function handleRemoveFromCart(title) {
    setShoppingList((list) => list.filter((item) => item.title !== title));
  }

  function handleDecreaseQuantity(title, quantity) {
    const decreasedQuantity = quantity - 1;
    if (!decreasedQuantity) {
      return;
    }
    setShoppingList((list) =>
      list.map((item) =>
        item.title === title ? { ...item, quantity: decreasedQuantity } : item
      )
    );
  }

  function handleIncreaseQuantity(title, quantity) {
    const increasedQuantity = quantity + 1;
    setShoppingList((list) =>
      list.map((item) =>
        item.title === title ? { ...item, quantity: increasedQuantity } : item
      )
    );
  }

  function handleResetCart() {
    setShoppingList([]);
  }

  return (
    <>
      <ShoppingPage onAddToCart={handleAddToCart} />
      <CartSidebar
        shoppingList={shoppingList}
        onResetCart={handleResetCart}
        onIncreaseQuantity={handleIncreaseQuantity}
        onDecreaseQuantity={handleDecreaseQuantity}
        onRemoveFromCart={handleRemoveFromCart}
      />
    </>
  );
}

function ShoppingPage({ onAddToCart }) {
  return (
    <div className="shopping-page">
      {drugs.map((drug, i) => (
        <DrugCard
          title={drug.title}
          key={drug.title}
          description={drug.description}
          price={drug.price}
          imageLink={`./svg/${i}.svg`}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

function DrugCard({ title, description, price, imageLink, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  function handleQuantityChange(value) {
    setQuantity(value);
  }

  return (
    <div className="drug-card">
      <h3>{title}</h3>
      <img src={imageLink} alt={title} />
      <p>{description}</p>
      <p>
        Only <span>${price}</span>
      </p>

      <div>
        <input
          type="range"
          min={1}
          max={10}
          value={quantity}
          onChange={(e) => handleQuantityChange(Number(e.target.value))}
        />
        <span>&nbsp; {quantity}</span>
      </div>
      <Button
        onClick={() => onAddToCart(title, quantity, price, imageLink)}
        className="add-to-cart"
      >
        Add to Cart
      </Button>
    </div>
  );
}

function CartSidebar({
  shoppingList,
  onResetCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
}) {
  const total = shoppingList.reduce(
    (acc, item) => (acc += item.price * item.quantity),
    0
  );
  return (
    <div className="cart-sidebar">
      <div>
        <h2>Your Cart</h2>
      </div>
      <ShoppingCart
        shoppingList={shoppingList}
        onIncreaseQuantity={onIncreaseQuantity}
        onDecreaseQuantity={onDecreaseQuantity}
        onRemoveFromCart={onRemoveFromCart}
      ></ShoppingCart>
      <Button className="checkout-cart">
        <strong>${total.toFixed(2)}</strong> &nbsp; &bull; &nbsp; Checkout
      </Button>
      <Button className="reset-cart" onClick={onResetCart}>
        Reset Cart
      </Button>
    </div>
  );
}

function ShoppingCart({
  shoppingList,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
}) {
  console.log(shoppingList);
  return (
    <div className="shopping-cart">
      <ul>
        {shoppingList &&
          shoppingList.map((item) => (
            <li key={item.title}>
              <Button
                className="remove-from-cart"
                onClick={() => onRemoveFromCart(item.title)}
              >
                ❌
              </Button>
              <img src={item.imageLink} alt={`${item.title}`} />
              <p>{item.title}</p>
              <PriceBox
                title={item.title}
                price={item.price}
                quantity={item.quantity}
                onIncreaseQuantity={onIncreaseQuantity}
                onDecreaseQuantity={onDecreaseQuantity}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

function PriceBox({
  title,
  price,
  quantity,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) {
  const displayedPrice = (price * quantity).toFixed(2);
  return (
    <div className="price-box">
      <p>${displayedPrice}</p>
      <div className="quantity-box">
        <Button onClick={() => onDecreaseQuantity(title, quantity)}>-</Button>
        <p>{quantity}</p>
        <Button onClick={() => onIncreaseQuantity(title, quantity)}>+</Button>
      </div>
    </div>
  );
}

function Button({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}
