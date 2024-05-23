import { mount } from '@vue/test-utils';
import GithubOutput from '../src/components/Github/GithubOutput.vue'; 
describe('GithubOutput', () => {
  it('renders user profile information when userProfile prop is provided', async () => {
    const userProfile = {
      login: 'test_user',
      avatar_url: 'https://example.com/avatar.png',
      followers: 10,
      following: 20,
      public_repos: 5
    };
    const wrapper = mount(GithubOutput, {
      props: {
        userProfile: userProfile,
        error: null
      }
    });

    expect(wrapper.find('.user-profile').exists()).toBe(true);
    expect(wrapper.find('.user-details').text()).toContain('test_user');
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/avatar.png');
    expect(wrapper.find('.user-details').text()).toContain('Followers: 10');
    expect(wrapper.find('.user-details').text()).toContain('Following: 20');
    expect(wrapper.find('.user-details').text()).toContain('Public Repos: 5');

  });

  it('displays error message when error prop is provided', async () => {
    const error = 'Error: User not found';
    const wrapper = mount(GithubOutput, {
      props: {
        userProfile: null,
        error: error
      }
    });

    expect(wrapper.find('.error-message').exists()).toBe(true);
    expect(wrapper.find('.error-message').text()).toContain(error);
  });

  it('renders nothing when userProfile and error props are null', async () => {
    const wrapper = mount(GithubOutput, {
      props: {
        userProfile: null,
        error: null
      }
    });

    expect(wrapper.find('.user-profile').exists()).toBe(false);
    expect(wrapper.find('.error-message').exists()).toBe(false);
  });
});
