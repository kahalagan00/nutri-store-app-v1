import { Button } from "./Button";
import { ShoppingCart } from "./ShoppingCart";

export function CartSidebar({
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
