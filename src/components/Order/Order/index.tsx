import React from 'react';

const Order: React.FC = (props: any) => {
  const ingredients = [];

  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.ingredients[ingredientName],
    })
  }

  const ingredientOutput = ingredients.map(ig => {
    return <span key={ig.name}>{ig.name} ({ig.amount})</span>
  })

  return (
    <div>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Price: <strong>USD {Number.parseFloat(props.price.toFixed(2))}</strong></p>
    </div>
  );
}

export default Order;
