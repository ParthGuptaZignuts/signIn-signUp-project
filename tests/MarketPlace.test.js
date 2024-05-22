import { mount } from '@vue/test-utils'
import MarketPlace from '../src/views/MarketPlace.vue'
import MarketPlaceDailog from "../src/components/MarketPlaceDailog.vue"

describe('MarketPlace.vue', () => {
  it('renders without errors', () => {
    const wrapper = mount(MarketPlace)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the MarketPlaceDailog component', () => {
    const wrapper = mount(MarketPlace)
    const marketPlaceDailog = wrapper.findComponent(MarketPlaceDailog)
    expect(marketPlaceDailog.exists()).toBe(true)
  })
})
