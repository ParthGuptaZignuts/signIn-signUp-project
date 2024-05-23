import { mount, createLocalVue } from '@vue/test-utils'
import Topbar from '../src/components/TopBar.vue'
import { createRouter, createMemoryHistory } from 'vue-router'
import { routes } from '../src/router' 

const localVue = createLocalVue()
const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

describe('Topbar', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(Topbar, {
      global: {
        plugins: [router],
        stubs: {
          LogoutButton: true
        },
        mocks: {
          $route: {
            path: ''
          }
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders without errors', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays correct title', () => {
    expect(wrapper.findComponent({ name: 'VToolbarTitle' }).text()).toBe('Awesome App')
  })

  it('navigates to correct routes when buttons are clicked', async () => {
    await wrapper.find('[to="/dashboard"]').trigger('click')
    await router.isReady()
    expect(wrapper.vm.$route.path).toBe('/dashboard')

    await wrapper.find('[to="/marketplace"]').trigger('click')
    await router.isReady()
    expect(wrapper.vm.$route.path).toBe('/marketplace')
  })

  it('displays user information and logout button', async () => {
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
