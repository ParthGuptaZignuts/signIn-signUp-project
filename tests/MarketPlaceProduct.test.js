import { mount } from '@vue/test-utils'
import MarketplaceProducts from '../src/components/MarketPlaceProducts.vue'
import { items } from '../src/ItemProducts'

describe('MarketplaceProducts.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(MarketplaceProducts, {
      global: {
        stubs: {
          VRow: { template: '<div><slot /></div>' },
          VCol: { template: '<div><slot /></div>' },
          VCard: { template: '<div><slot /></div>' },
          VCardTitle: { template: '<div><slot /></div>' },
          VCardSubtitle: { template: '<div><slot /></div>' },
          VCardText: { template: '<div><slot /></div>' },
          VCardActions: { template: '<div><slot /></div>' },
          VBtn: { props: ['to'], template: '<a :href="to"><slot /></a>' }
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the correct number of items', () => {
    const cols = wrapper.findAllComponents({ name: 'VCol' })
    expect(cols.length).toBe(items.length)
  })

  it('renders the correct content for each item', () => {
    items.forEach((item, index) => {
      const col = wrapper.findAllComponents({ name: 'VCol' }).at(index)
      const cardTitle = col.findComponent({ name: 'VCardTitle' })
      const cardSubtitle = col.findComponent({ name: 'VCardSubtitle' })
      const cardText = col.findComponent({ name: 'VCardText' })
      const btn = col.find('a')

      expect(cardTitle.text()).toBe(item.title)
      expect(cardSubtitle.text()).toBe(item.description)
      expect(cardText.text()).toBe(item.category)
      expect(btn.attributes('href')).toBe(`/marketplace/category/${item.id}`)
    })
  })

  it('assigns a random color to each card', () => {
    const lightColors = ['#E5FAFB', '#FDEDE8', '#FEF5E5', '#E6FFFA']
    wrapper.findAllComponents({ name: 'VCard' }).wrappers.forEach(card => {
      const color = card.props('color')
      expect(lightColors).toContain(color)
    })
  })
})
