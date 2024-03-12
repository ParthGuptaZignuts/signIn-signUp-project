import { ref } from 'vue'

export interface SubCategory {
  id: string
  parentCategory: string
  title: string
  description: string
  price: number
  imageUrl: string
}

export interface Items {
  id: string
  title: string
  description: string
  category: string
  subCategory: SubCategory[]
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
        imageUrl:
          'https://www.reliancedigital.in/medias/Asus-Strix-G-HN083W-493838344-i-1-1200Wx1200H-300Wx300H?context=bWFzdGVyfGltYWdlc3wxMjg1N3xpbWFnZS9qcGVnfGltYWdlcy9oNWIvaDBiLzEwMDU2ODMzNDMzNjMwLmpwZ3w0OGI2N2Q3ZTRkYWU2YTYwY2FjMjJiNzhlZjZkZjIwZDQ3NGMwN2Q3YmQxOTFiYzNlYTA5OTcwMDcwZjhhNzQz'
      },
      {
        id: '2',
        parentCategory: 'Electronics',
        title: 'Budget Laptops',
        description: 'Affordable laptops for everyday use',
        price: 600,
        imageUrl:
          'data:image/jpeg;base64,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'
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
        imageUrl:
          'https://as1.ftcdn.net/v2/jpg/01/06/68/88/1000_F_106688812_rVoRFXazgIMEUJdvffG9p0XvP8Lntf0a.jpg'
      },
      {
        id: '7',
        parentCategory: 'Food',
        title: 'Cheese',
        description: 'Assorted cheeses for various tastes',
        price: 5.0,
        imageUrl:
          'data:image/jpeg;base64,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'
      }
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
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvcDKS8R7dg8P6v-oC_Crc-XjsXN8h59wBvInHgnnlMqptVoMVPHTEf6jS7XxrMRrlTE4&usqp=CAU'
      },
      {
        id: '9',
        parentCategory: 'Fashion',
        title: 'Formal Shoes',
        description: 'Elegant footwear for formal occasions',
        price: 80.0,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHl-0eKeKaAY_erNX0QZl5y3inLz5zya2wmw&usqp=CAU'
      },
      {
        id: '10',
        parentCategory: 'Fashion',
        title: 'Sandals',
        description: 'Comfortable sandals for everyday use',
        price: 30.0,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2A_IiOnci1oarGjPU-sIA_y9qdBN1_dAfpD9Q7IPke1MrdJ7t0r7NepicMZWee3Qovfw&usqp=CAU'
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
        imageUrl: 'https://m.media-amazon.com/images/I/71K2DBFeGHL._AC_UY1000_.jpg'
      },
      {
        id: '15',
        parentCategory: 'Fashion',
        title: 'Watches',
        description: 'Elegant timepieces for a sophisticated look',
        price: 80.0,
        imageUrl: 'https://media.casioindiashop.com/assets/menu-images/clocks/watches-menu.webp'
      },
      {
        id: '16',
        parentCategory: 'Fashion',
        title: 'Sunglasses',
        description: 'Fashionable sunglasses to protect your eyes in style',
        price: 30.0,
        imageUrl:
          'https://www.jiomart.com/images/product/original/rvakkhspam/elegante-aviator-transparent-sunglasses-for-men-product-images-rvakkhspam-0-202207230926.jpg?im=Resize=(500,630)'
      }
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
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1lMagLwZAZ4WykjfmSG26Tzkcs-_XhaSE5ZgDdmpBQtSfdQ9q8ZP0hUL13tdchpVVBZQ&usqp=CAU'
      },
      {
        id: '15',
        parentCategory: 'Fashion',
        title: 'Dresses',
        description: 'Chic dresses for various occasions',
        price: 50.0,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScKYuglJ_pWhGD42Yyx97bO5pXg3-E4EWEOQihzkhY1hmnw8SqjdhVAfmY6NGjWpgh2uo&usqp=CAU'
      },
      {
        id: '16',
        parentCategory: 'Fashion',
        title: 'Jeans',
        description: 'Classic denim jeans for a timeless look',
        price: 45.0,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSo3vGvxfgLwCQpooM2jOj19ARH16UnUgjtZn-xfd6p-yqgeUq7xq0XwvopPtjsMSWRaM&usqp=CAU'
      }
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
        imageUrl:
          'data:image/jpeg;base64,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'
      },
      {
        id: '18',
        parentCategory: 'Home',
        title: 'Bedding Sets',
        description: "Comfortable bedding for a good night's sleep",
        price: 50.0,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6-dnc2FwNGaRJQFlkw9JY2v7OuVnSPF0zCg&usqp=CAU'
      },
      {
        id: '19',
        parentCategory: 'Home',
        title: 'Home Decor',
        description: 'Decorate your home with stylish accessories',
        price: 30.0,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhUsKwCMiUdM74fvZ9Zb4vCvlaZRMXu_MqIQ&usqp=CAU'
      }
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
        imageUrl:
          'https://images.unsplash.com/photo-1527960471264-932f39eb5846?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mdCUyMGRyaW5rfGVufDB8fDB8fHww'
      },
      {
        id: '21',
        parentCategory: 'Food',
        title: 'Tea',
        description: 'Premium tea blends for tea enthusiasts',
        price: 5.0,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSlg8tHwABW_cc9cqZpIN6xylwpdrDkV5IsA&usqp=CAU'
      },
      {
        id: '22',
        parentCategory: 'Food',
        title: 'Coffee',
        description: 'High-quality coffee beans and blends',
        price: 8.0,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVlwbopN1nEvivLo5GdZFYUQgFaUrOVHdptA&usqp=CAU'
      }
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
        imageUrl: 'https://m.media-amazon.com/images/I/81ZX-dvnU1L._AC_UF1000,1000_QL80_.jpg'
      },
      {
        id: '24',
        parentCategory: 'Food',
        title: 'Canned Goods',
        description: 'Convenient canned goods for your pantry',
        price: 4.0,
        imageUrl:
          'data:image/jpeg;base64,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'
      },
      {
        id: '25',
        parentCategory: 'Food',
        title: 'Dairy Products',
        description: 'Fresh and nutritious dairy items',
        price: 2.5,
        imageUrl:
          'data:image/jpeg;base64,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'
      }
    ]
  }
])
