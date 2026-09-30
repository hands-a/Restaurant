/**
 * Per-category sizes and addons.
 * ProductDetails reads from this map using product.category as the key.
 * Falls back to `defaultOptions` for any unrecognised category.
 */
export const categoryOptions = {
  Burgers: {
    sizes: ['Single', 'Double', 'Triple'],
    addons: [
      { name: 'Extra Cheese', price: 25 },
      { name: 'Mushroom Sauce', price: 30 },
      { name: 'Spicy Jalapeños', price: 15 },
      { name: 'Crispy Onion Rings', price: 20 },
      { name: 'Beef Bacon', price: 35 },
    ],
  },
  Pizza: {
    sizes: ['Small', 'Medium', 'Large', 'Family'],
    addons: [
      { name: 'Extra Cheese', price: 25 },
      { name: 'Extra Pepperoni', price: 30 },
      { name: 'Stuffed Crust', price: 40 },
      { name: 'Spicy Jalapeños', price: 15 },
    ],
  },
  Desserts: {
    sizes: ['Regular'],
    addons: [
      { name: 'Extra Scoop', price: 20 },
      { name: 'Whipped Cream', price: 15 },
      { name: 'Caramel Drizzle', price: 10 },
    ],
  },
  Drinks: {
    sizes: ['Regular', 'Large'],
    addons: [
      { name: 'Extra Shot', price: 20 },
      { name: 'Oat Milk', price: 15 },
    ],
  },
};

export const defaultOptions = {
  sizes: ['Regular'],
  addons: [],
};
