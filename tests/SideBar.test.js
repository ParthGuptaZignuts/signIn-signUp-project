import { mount } from '@vue/test-utils'
import SideBar from '../src/components/SideBar.vue'

describe('SideBar', () => {
  it('renders correctly', () => {
    const wrapper = mount(SideBar)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('changes locale when select option is changed', async () => {
    const wrapper = mount(SideBar)
    const select = wrapper.find('select')
    await select.setValue('Hindi')
    expect(wrapper.vm.locale).toBe('Hindi')
  })
})
