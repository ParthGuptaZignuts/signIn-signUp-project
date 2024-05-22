import { mount } from '@vue/test-utils'
import LoginView from '../src/views/SignIn.vue'
import HomeButton from '../src/components/HomeButton.vue'
import { useLogin } from "../src/composables/useLogin"

jest.mock('../src/composables/useLogin', () => ({
  useLogin: jest.fn().mockReturnValue({
    formData: { email: '', password: '' },
    handleLogin: jest.fn()
  })
}))

describe('LoginView.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(LoginView)
  })

  it('renders without errors', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders form elements correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Sign In')
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('toggles password visibility', async () => {
    const passwordField = wrapper.find('input[type="password"]')
    expect(passwordField.exists()).toBe(true)

    await wrapper.find('.mdi-eye').trigger('click')
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)

    await wrapper.find('.mdi-eye-off').trigger('click')
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
  })

  it('calls handleLogin on form submission', async () => {
    const { handleLogin, formData } = useLogin()
    formData.email = 'realhalamadrid04@gmail.com'
    formData.password = 'Real@0407'

    await wrapper.find('form').trigger('submit.prevent')
    expect(handleLogin).toHaveBeenCalled()
  })

  it('renders HomeButton component', () => {
    const homeButton = wrapper.findComponent(HomeButton)
    expect(homeButton.exists()).toBe(true)
  })
})
