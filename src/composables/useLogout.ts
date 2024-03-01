import axios from 'axios'
import { onMounted, ref } from 'vue'
import Swal from 'sweetalert2'
import router from '@/router'

interface UserData {
  id: number
  name: string
  email: string
}

export const useUserAuthData = () => {
  const user = ref<UserData>()
  const userEmail = ref<string>('')

  const getUser = () => {
    return axios
      .get('/api/user', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then((r) => {
        const userData = r.data as UserData

        user.value = userData
        userEmail.value = userData.email

        return { user: userData, email: userData.email }
      })
      .catch((e) => {
        return e
      })
  }

  const logoutAction = () => {
    return axios
      .post(
        '/api/logout',
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      .then((r) => {
        localStorage.setItem('token', '')
        router.push('/')
        Swal.fire({
          icon: 'success',
          title: 'Logged out successfully!',
          showConfirmButton: false,
          timer: 1500
        })

        return r
      })
      .catch((e) => {
        Swal.fire({
          icon: 'error',
          title: 'Invalid response from the server',
          showConfirmButton: false,
          timer: 1500
        })

        return e
      })
  }

  onMounted(() => {
    getUser()
    if (localStorage.getItem('token') === '' || localStorage.getItem('token') === null)
      router.push('/')
    else getUser()
  })

  return {
    user,
    userEmail,
    getUser,
    logoutAction
  }
}
