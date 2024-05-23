import { mount } from '@vue/test-utils';
import UserInput from '../src/components/Github/UserInput.vue'; 

describe('UserInput', () => {
  it('updates username ref when input is entered', async () => {
    const wrapper = mount(UserInput);
    await wrapper.find('input').setValue('test_user');
    expect(wrapper.vm.username).toBe('test_user');
  });

  it('emits usernameSubmitted event when form is submitted with a valid username', async () => {
    const wrapper = mount(UserInput);
    await wrapper.find('input').setValue('test_user');
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted('usernameSubmitted')).toBeTruthy();
    expect(wrapper.emitted('usernameSubmitted')[0]).toEqual(['test_user']);
  });

  it('does not emit usernameSubmitted event when form is submitted with an empty username', async () => {
    const wrapper = mount(UserInput);
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.emitted('usernameSubmitted')).toBeFalsy();
  });
});
