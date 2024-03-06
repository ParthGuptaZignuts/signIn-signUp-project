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
    id: '3',
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
  {
    id: '4',
    title: 'Fashion Accessories',
    description: 'Stylish accessories to enhance your look',
    category: 'Fashion',
    subCategory: [
      {
        id: '14',
        parentCategory: 'Fashion',
        title: 'Handbags',
        description: 'Chic handbags for every occasion',
        price: 50.0,
        imageUrl: 'handbags_image_url.jpg'
      },
      {
        id: '15',
        parentCategory: 'Fashion',
        title: 'Watches',
        description: 'Elegant timepieces for a sophisticated look',
        price: 80.0,
        imageUrl: 'watches_image_url.jpg'
      },
      {
        id: '16',
        parentCategory: 'Fashion',
        title: 'Sunglasses',
        description: 'Fashionable sunglasses to protect your eyes in style',
        price: 30.0,
        imageUrl: 'sunglasses_image_url.jpg'
      },
    ]
  },
  {
    id: '5',
    title: 'Clothing',
    description: 'Stylish and comfortable clothing for every season',
    category: 'Fashion',
    subCategory: [
      {
        id: '14',
        parentCategory: 'Fashion',
        title: 'T-Shirts',
        description: 'Casual and comfortable t-shirts for everyday wear',
        price: 20.0,
        imageUrl: 'tshirts_image_url.jpg'
      },
      {
        id: '15',
        parentCategory: 'Fashion',
        title: 'Dresses',
        description: 'Chic dresses for various occasions',
        price: 50.0,
        imageUrl: 'dresses_image_url.jpg'
      },
      {
        id: '16',
        parentCategory: 'Fashion',
        title: 'Jeans',
        description: 'Classic denim jeans for a timeless look',
        price: 45.0,
        imageUrl: 'jeans_image_url.jpg'
      },
    ]
  },
  {
    id: '6',
    title: 'Household Items',
    description: 'Essential items for your home',
    category: 'Home',
    subCategory: [
      {
        id: '17',
        parentCategory: 'Home',
        title: 'Kitchen Appliances',
        description: 'Modern appliances for your kitchen',
        price: 100.0,
        imageUrl: 'kitchen_appliances_image_url.jpg'
      },
      {
        id: '18',
        parentCategory: 'Home',
        title: 'Bedding Sets',
        description: 'Comfortable bedding for a good night\'s sleep',
        price: 50.0,
        imageUrl: 'bedding_sets_image_url.jpg'
      },
      {
        id: '19',
        parentCategory: 'Home',
        title: 'Home Decor',
        description: 'Decorate your home with stylish accessories',
        price: 30.0,
        imageUrl: 'home_decor_image_url.jpg'
      },
    ]
  },
  {
    id: '7',
    title: 'Beverages',
    description: 'Refreshing drinks for every occasion',
    category: 'Food',
    subCategory: [
      {
        id: '20',
        parentCategory: 'Food',
        title: 'Soft Drinks',
        description: 'Various flavored soft drinks',
        price: 2.0,
        imageUrl: 'soft_drinks_image_url.jpg'
      },
      {
        id: '21',
        parentCategory: 'Food',
        title: 'Tea',
        description: 'Premium tea blends for tea enthusiasts',
        price: 5.0,
        imageUrl: 'tea_image_url.jpg'
      },
      {
        id: '22',
        parentCategory: 'Food',
        title: 'Coffee',
        description: 'High-quality coffee beans and blends',
        price: 8.0,
        imageUrl: 'coffee_image_url.jpg'
      },
    ]
  },
  {
    id: '8',
    title: 'Food',
    description: 'Delicious and nutritious food items',
    category: 'Food',
    subCategory: [
      {
        id: '23',
        parentCategory: 'Food',
        title: 'Snacks',
        description: 'Tasty snacks for any time of the day',
        price: 3.0,
        imageUrl: 'snacks_image_url.jpg'
      },
      {
        id: '24',
        parentCategory: 'Food',
        title: 'Canned Goods',
        description: 'Convenient canned goods for your pantry',
        price: 4.0,
        imageUrl: 'canned_goods_image_url.jpg'
      },
      {
        id: '25',
        parentCategory: 'Food',
        title: 'Dairy Products',
        description: 'Fresh and nutritious dairy items',
        price: 2.5,
        imageUrl: 'dairy_products_image_url.jpg'
      },
    ]
  },
]);

