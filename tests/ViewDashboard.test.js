import { mount } from '@vue/test-utils'
import Dashboard from '../src/views/DashboardView.vue'
import ItemsListing from "../src/components/ItemsListing.vue"

describe('Dashboard.vue', () => {
  it('renders without errors', () => {
    const wrapper = mount(Dashboard)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the ItemsListing component', () => {
    const wrapper = mount(Dashboard)
    const itemsListing = wrapper.findComponent(ItemsListing)
    expect(itemsListing.exists()).toBe(true)
  })
})