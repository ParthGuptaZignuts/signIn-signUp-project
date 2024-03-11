import axios from 'axios'

axios.defaults.baseURL = 'https://mock-api.binaryboxtuts.com/'

axios.interceptors.request.use(function (config) {
  config.headers['X-Binarybox-Api-Key'] =
    'binarybox_api_key_VzO8M31mfzUAW58MBuDkyVX68IWufWJWW7m5BqqSi3FSXHHwKeHjuXQzOC7QdACzffplQ93npFb6Q3sMQLeImXxkz3IHQDkWy1yt'
  return config
})

export default axios
