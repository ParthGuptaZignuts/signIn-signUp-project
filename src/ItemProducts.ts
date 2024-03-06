import { ref } from 'vue';

interface SubCategory {
  id: string;
  parentCategory: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface Items {
  id: string;
  title: string;
  description: string;
  category: string;
  subCategory: SubCategory[];
}

export const items = ref<Items[]>([
  {
    id: '1',
    title: 'Laptop',
    description: 'Powerful and portable computing devices',
    category: 'Electronics',
    subCategory: [
      {
        id: '1',
        parentCategory: 'Electronics',
        title: 'High-Performance Laptops',
        description: 'Laptops with advanced features for demanding tasks',
        price: 1200,
        imageUrl: 'laptop_image_url_1.jpg'
      },
      {
        id: '2',
        parentCategory: 'Electronics',
        title: 'Budget Laptops',
        description: 'Affordable laptops for everyday use',
        price: 600,
        imageUrl: 'laptop_image_url_2.jpg'
      }
    ]
  },
  {
    id: '2',
    title: 'Smartphone',
    description: 'Feature-rich mobile devices',
    category: 'Electronics',
    subCategory: [
      {
        id: '3',
        parentCategory: 'Electronics',
        title: 'Flagship Smartphones',
        description: 'Top-of-the-line smartphones with cutting-edge technology',
        price: 1000,
        imageUrl: 'smartphone_image_url_1.jpg'
      },
      {
        id: '4',
        parentCategory: 'Electronics',
        title: 'Budget Smartphones',
        description: 'Cost-effective smartphones with essential features',
        price: 300,
        imageUrl: 'smartphone_image_url_2.jpg'
      },
      {
        id: '5',
        parentCategory: 'Electronics',
        title: 'Camera Phones',
        description: 'Smartphones with advanced camera capabilities',
        price: 800,
        imageUrl: 'smartphone_image_url_3.jpg'
      }
    ]
  },
  {
    id: '3',
    title: 'Dairy Products',
    description: 'Fresh and nutritious dairy items',
    category: 'Food',
    subCategory: [
      {
        id: '6',
        parentCategory: 'Food',
        title: 'Milk',
        description: 'Nutrient-rich fresh milk',
        price: 2.5,
        imageUrl: 'milk_image_url.jpg'
      },
      {
        id: '7',
        parentCategory: 'Food',
        title: 'Cheese',
        description: 'Assorted cheeses for various tastes',
        price: 5.0, 
        imageUrl: 'cheese_image_url.jpg'
      },
     
    ]
  },
  {
    id: '4',
    title: 'Footwear',
    description: 'Stylish and comfortable footwear for all occasions',
    category: 'Fashion',
    subCategory: [
      {
        id: '8',
        parentCategory: 'Fashion',
        title: 'Sneakers',
        description: 'Casual and sporty footwear',
        price: 50.0,
        imageUrl: 'sneakers_image_url.jpg'
      },
      {
        id: '9',
        parentCategory: 'Fashion',
        title: 'Formal Shoes',
        description: 'Elegant footwear for formal occasions',
        price: 80.0,
        imageUrl: 'formal_shoes_image_url.jpg'
      },
      {
        id: '10',
        parentCategory: 'Fashion',
        title: 'Sandals',
        description: 'Comfortable sandals for everyday use',
        price: 30.0,
        imageUrl: 'sandals_image_url.jpg'
      }
    ]
  },
]);

