// import { faker } from '@faker-js/faker';

export const generateOneProduct = () => {
  return {
    id: crypto.randomUUID(),
    title: 'Product 1',
    description: 'Description 1',
    price: 100,
    images: ['image 1', 'image 2'],
    category: {
      id: 1,
      name: 'Category 1'
    }
  }
}

export const generateProducts = (size = 10) => {
  const products = [];
  for (let index = 0; index < size; index++) {
    products.push(generateOneProduct())
  }
  return products
}
