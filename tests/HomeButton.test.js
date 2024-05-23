import { mount } from '@vue/test-utils'
import HomeButton from "../src/components/HomeButton.vue"
jest.mock('vuetify/components', () => ({
  VBtn: {
    template: '<button><slot /></button>',
    props: ['variant', 'color', 'to']
  }
}))

describe('HomeButton.vue', () => {
  it('renders Home button with correct attributes', () => {
    const wrapper = mount(HomeButton)
    const button = wrapper.find('button')

    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Home')
    expect(button.attributes('variant')).toBe('flat')
    expect(button.attributes('color')).toBe('info')
    expect(button.attributes('to')).toBe('/')
  })

  it('has correct class and structure', () => {
    const wrapper = mount(HomeButton)
    const div = wrapper.find('div.demo-space-x')

    expect(div.exists()).toBe(true)
    expect(div.find('button').exists()).toBe(true)
  })

  it('matches the snapshot', () => {
    const wrapper = mount(HomeButton)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
