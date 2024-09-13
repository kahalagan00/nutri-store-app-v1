import { useState } from "react";
import drugs from "./drugs.json";

export default function App() {
  return (
    <>
      <ShoppingPage />
      <CartSidebar />
    </>
  );
}

function ShoppingPage() {
  return (
    <div className="shopping-page">
      {drugs.map((drug) => (
        <DrugCard
          title={drug.title}
          description={drug.description}
          price={drug.price}
          imageLink={drug.imageLink}
        />
      ))}
    </div>
  );
}

function CartSidebar() {
  return <div className="cart-sidebar">Shopping cart</div>;
}

function DrugCard({ title, description, price, imageLink }) {
  return (
    <div className="drug-card">
      <h3>{title}</h3>
      <img src={imageLink} alt="Image of the drug" />
      <p>{description}</p>
      <p>Only ${price}</p>
    </div>
  );
}
