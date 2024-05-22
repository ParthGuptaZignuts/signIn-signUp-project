import { mount } from '@vue/test-utils'
import SignUpView from '../src/views/SignUpView.vue'
import HomeButton from '../src/components/HomeButton.vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import router from '@/router'
jest.mock('axios')
jest.mock('sweetalert2', () => ({
  fire: jest.fn()
}))

describe('SignUpView.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(SignUpView)
  })

  it('renders without errors', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders form elements correctly', () => {
    expect(wrapper.find('h1').text()).toBe('Sign-Up')
    expect(wrapper.find('input[placeholder="Enter Full Name"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Email address"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Enter your password"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Re-Enter Password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  it('toggles password visibility', async () => {
    const passwordFields = wrapper.findAll('input[type="password"]')
    expect(passwordFields.length).toBe(2)

    await wrapper.find('.mdi-eye').trigger('click')
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)

    await wrapper.find('.mdi-eye-off').trigger('click')
    expect(wrapper.findAll('input[type="password"]').length).toBe(2)
  })

  it('calls registerCheckUser on form submission', async () => {
    const registerCheckUserSpy = jest.spyOn(wrapper.vm, 'registerCheckUser')
    await wrapper.find('form').trigger('submit.prevent')
    expect(registerCheckUserSpy).toHaveBeenCalled()
  })

  it('registers a user and shows success message on valid input', async () => {
    axios.post.mockResolvedValue({ data: { token: 'fakeToken' } })
    
    wrapper.setData({
      formData: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        password_confirmation: 'password123'
      }
    })

    await wrapper.find('form').trigger('submit.prevent')
    
    expect(axios.post).toHaveBeenCalledWith('api/register', {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      password_confirmation: 'password123'
    })
    expect(Swal.fire).toHaveBeenCalledWith({
      icon: 'success',
      title: 'User created successfully!',
      showConfirmButton: false,
      timer: 1500
    })
    expect(router.push).toHaveBeenCalledWith('/signin')
  })

  it('renders HomeButton component', () => {
    const homeButton = wrapper.findComponent(HomeButton)
    expect(homeButton.exists()).toBe(true)
  })
})
