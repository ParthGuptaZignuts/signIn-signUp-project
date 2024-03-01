import axios from 'axios'
import { ref } from 'vue'
import Swal from 'sweetalert2'
import router from '@/router'

export function useLogin() {
  interface UserLogin {
    email: string
    password: string
  }

  const token = ref<string | null>(null)
  const formData = ref<UserLogin>({
    email: '',
    password: ''
  })

  const handleLogin = () => {
    axios
      .post('api/login', formData.value)
      .then((response: any) => {
        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token)
          Swal.fire({
            icon: 'success',
            title: 'Logged in successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          router.push('/dashboard')
          formData.value.email = ''
          formData.value.password = ''
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Invalid response from server',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
      .catch((error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Invalid password or email!',
          showConfirmButton: false,
          timer: 1500
        })
        return error
      })
  }

  return {
    token,
    formData,
    handleLogin
  }
}
