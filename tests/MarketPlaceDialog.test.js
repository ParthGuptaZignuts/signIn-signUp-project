import { mount } from '@vue/test-utils'
import MarketplaceDialog from '../src/components/MarketPlaceDailog.vue'
import MarketPlaceProducts from '../src/components/MarketPlaceProducts.vue'

jest.mock("../src/components/MarketPlaceProducts.vue", () => ({
  name: 'MarketPlaceProducts',
  template: '<div />'
}))

describe('MarketplaceDialog.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(MarketplaceDialog, {
      global: {
        stubs: {
          VDialog: { template: '<div><slot /></div>' },
          VCard: { template: '<div><slot /></div>' },
          VCardTitle: { template: '<div><slot /></div>' },
          VContainer: { template: '<div><slot /></div>' },
          VRow: { template: '<div><slot /></div>' },
          VDatePicker: {
            props: ['modelValue', 'min'],
            template: '<input type="date" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />'
          }
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders the dialog initially', () => {
    expect(wrapper.findComponent({ name: 'VDialog' }).exists()).toBe(true)
  })

  it('renders the date picker initially', () => {
    expect(wrapper.findComponent({ name: 'VDatePicker' }).exists()).toBe(true)
  })

  it('sets the min date for the date picker correctly', () => {
    const minDate = new Date().toISOString().split('T')[0]
    const datePicker = wrapper.findComponent({ name: 'VDatePicker' })
    expect(datePicker.exists()).toBe(true)
    expect(datePicker.props('min')).toBe(minDate)
  })

  it('hides the dialog and shows the products component after selecting a date', async () => {
    const newDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]
    const dateInput = wrapper.find('input[type="date"]')

    await dateInput.setValue(newDate)
    await dateInput.trigger('input')

    await wrapper.vm.$nextTick() // wait for reactivity to update

    expect(wrapper.vm.isVisible).toBe(false)
    expect(wrapper.findComponent(MarketPlaceProducts).exists()).toBe(true)
  })

  it('stores the selected date in localStorage', async () => {
    const newDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]
    const formattedDate = new Date(newDate).toLocaleDateString()
    const dateInput = wrapper.find('input[type="date"]')

    await dateInput.setValue(newDate)
    await dateInput.trigger('input')

    await wrapper.vm.$nextTick() // wait for reactivity to update

    expect(localStorage.getItem('selectedDate')).toBe(formattedDate)
  })
})
