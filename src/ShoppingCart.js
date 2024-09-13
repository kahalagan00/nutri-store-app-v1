import { Button } from "./Button";
import { PriceBox } from "./PriceBox";

export function ShoppingCart({
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
