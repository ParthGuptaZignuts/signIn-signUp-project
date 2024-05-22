import { mount } from '@vue/test-utils'
import LandingView from "../src/views/LandingView.vue"
import { RouterLinkStub } from '@vue/test-utils'

describe('LandingView.vue', () => {
  it('renders without errors', () => {
    const wrapper = mount(LandingView)
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the correct header and paragraph texts', () => {
    const wrapper = mount(LandingView)
    expect(wrapper.find('h1').text()).toBe('Welcome to Our OneSite Management Website')
    expect(wrapper.find('p').text()).toBe('This is the best place to manage your projects efficiently and effectively.')
  })

  it('contains navigation buttons with correct links', () => {
    const wrapper = mount(LandingView, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    })
    const signUpButton = wrapper.find('a[href="/signup"]')
    const signInButton = wrapper.find('a[href="/signin"]')
    
    expect(signUpButton.exists()).toBe(true)
    expect(signInButton.exists()).toBe(true)
    
    expect(signUpButton.text()).toBe('Sign Up')
    expect(signInButton.text()).toBe('Sign In')
  })
})
