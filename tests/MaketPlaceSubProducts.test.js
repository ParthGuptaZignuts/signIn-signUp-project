import { mount } from '@vue/test-utils'
import MarketplaceSubProduct from "../src/components/MarketPlaceSubProducts.vue"

describe('MarketplaceSubProduct.vue', () => {
  it('renders subcategories correctly', () => {
    const subcategories = [
      { id: 1, title: 'Item 1', description: 'Description 1', price: 10.99, imageUrl: 'image1.jpg' },
      { id: 2, title: 'Item 2', description: 'Description 2', price: 15.99, imageUrl: 'image2.jpg' }
    ];

    const wrapper = mount(MarketplaceSubProduct, {
      props: {
        currentSubcategories: subcategories
      }
    })
    subcategories.forEach(subcategory => {
      expect(wrapper.html()).toContain(subcategory.title)
      expect(wrapper.html()).toContain(subcategory.description)
      expect(wrapper.html()).toContain(`$${subcategory.price.toFixed(2)}`)
      expect(wrapper.html()).toContain(subcategory.imageUrl)
    })
  })

  it('adds item to cart when "Add to Cart" button is clicked', async () => {
    const subcategory = { id: 1, title: 'Item 1', description: 'Description 1', price: 10.99, imageUrl: 'image1.jpg' }
    const wrapper = mount(MarketplaceSubProduct, {
      props: {
        currentSubcategories: [subcategory]
      }
    })
    await wrapper.find('.custom-card-button').trigger('click')
    expect(wrapper.vm.$data.cart).toContain(subcategory)
  })

  it('removes item from cart when "Remove from Cart" button is clicked', async () => {
    const subcategory = { id: 1, title: 'Item 1', description: 'Description 1', price: 10.99, imageUrl: 'image1.jpg' }
    const wrapper = mount(MarketplaceSubProduct, {
      props: {
        currentSubcategories: [subcategory]
      }
    })
    await wrapper.find('.custom-card-button').trigger('click')
    await wrapper.find('.custom-card-button-delete').trigger('click')
    expect(wrapper.vm.$data.cart).not.toContain(subcategory)
  })

  it('updates cart badge count when items are added or removed', async () => {
    const subcategory = { id: 1, title: 'Item 1', description: 'Description 1', price: 10.99, imageUrl: 'image1.jpg' }
    const wrapper = mount(MarketplaceSubProduct, {
      props: {
        currentSubcategories: [subcategory]
      }
    })
    await wrapper.find('.custom-card-button').trigger('click')
    expect(wrapper.find('.badge').text()).toBe('1')
    await wrapper.find('.custom-card-button-delete').trigger('click')
    expect(wrapper.find('.badge').text()).toBe('0')
  })
})
