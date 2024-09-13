import { useState } from "react";
import { Button } from "./Button";

export function DrugCard({
  title,
  description,
  price,
  imageLink,
  onAddToCart,
}) {
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
