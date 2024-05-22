import { mount } from '@vue/test-utils'
import Topbar from '../src/components/TopBar.vue'

describe('Topbar', () => {
  it('renders without errors', () => {
    const wrapper = mount(Topbar)
    expect(wrapper.exists()).toBe(true)
  })

  it('displays correct title', () => {
    const wrapper = mount(Topbar)
    expect(wrapper.find('VToolbarTitle').text()).toBe('Awesome App')
  })

  it('navigates to correct routes when buttons are clicked', async () => {
    const wrapper = mount(Topbar)
    await wrapper.find('[to="/dashboard"]').trigger('click')
    expect(wrapper.vm.$route.path).toBe('/dashboard')

    await wrapper.find('[to="/marketplace"]').trigger('click')
    expect(wrapper.vm.$route.path).toBe('/marketplace')
  })

  it('displays user information and logout button', async () => {
    const wrapper = mount(Topbar, {
      global: {
        stubs: {
          LogoutButton: true
        }
      }
    })
    await wrapper.setProps({
      user: {
        name: 'John Doe'
      },
      userEmail: 'john@example.com'
    })

    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('john@example.com')
    expect(wrapper.findComponent({ name: 'LogoutButton' }).exists()).toBe(true)
  })
})
