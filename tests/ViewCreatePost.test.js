import CreatePost from "../src/views/CreatePost.vue";
import { mount } from "@vue/test-utils";

test("CreatePost Component renders the correct text", () => {
  const wrapper = mount(CreatePost);
  expect(wrapper.text()).toBe("this is the create post");
});