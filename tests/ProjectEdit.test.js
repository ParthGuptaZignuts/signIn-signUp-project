import { mount } from '@vue/test-utils'
import ProjectEdit from "@/components/ProjectEdit.vue"
import axios from 'axios'

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  patch: jest.fn()
}))

describe('ProjectEdit.vue', () => {
  it('fetches project data when mounted with projectId', async () => {
    const projectId = 1
    const projectData = { id: 1, projectName: 'Project 1', projectDescription: 'Description 1' }
    axios.get.mockResolvedValueOnce({ data: projectData })

    const wrapper = mount(ProjectEdit, {
      props: {
        projectId: projectId,
        isVisible: true
      }
    })

    await wrapper.vm.$nextTick()

    expect(axios.get).toHaveBeenCalledWith(`/api/projects/${projectId}`)
    expect(wrapper.vm.project.projectName).toBe(projectData.projectName)
    expect(wrapper.vm.project.projectDescription).toBe(projectData.projectDescription)
  })

  it('updates project data when form fields are edited', async () => {
    const wrapper = mount(ProjectEdit, {
      props: {
        projectId: null,
        isVisible: true
      }
    })

    await wrapper.find('[data-testid="project-name"]').setValue('New Project Name')
    await wrapper.find('[data-testid="project-description"]').setValue('New Project Description')

    expect(wrapper.vm.project.projectName).toBe('New Project Name')
    expect(wrapper.vm.project.projectDescription).toBe('New Project Description')
  })

  it('calls saveProject method when "Save Changes" button is clicked', async () => {
    const wrapper = mount(ProjectEdit, {
      props: {
        projectId: null,
        isVisible: true
      }
    })

    await wrapper.find('[data-testid="save-button"]').trigger('click')

    expect(axios.post).toHaveBeenCalled()
  })

  it('emits "handleDialog" event when "Close" button is clicked', async () => {
    const wrapper = mount(ProjectEdit, {
      props: {
        projectId: null,
        isVisible: true
      }
    })

    await wrapper.find('[data-testid="close-button"]').trigger('click')

    expect(wrapper.emitted('handleDialog')).toBeTruthy()
  })
})
