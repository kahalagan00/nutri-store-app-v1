import { Button } from "./Button";

export function PriceBox({
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
