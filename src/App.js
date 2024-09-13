import { useState } from "react";
import drugs from "./drugs.json";
import { DrugCard } from "./DrugCard";
import { CartSidebar } from "./CartSidebar";

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
