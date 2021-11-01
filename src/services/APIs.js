import { create as apiCreate } from 'apisauce'

import { rootStore } from '~/stores'
import { parseResponseError } from '~/services/Utils'

export const create = (baseURL) => {
  const api = apiCreate({
    baseURL,
    timeout: 10000,
  })

  api.addRequestTransform((request) => {
    if (rootStore.userStore.token != null) {
      request.headers.Authorization = rootStore.userStore.token
    }
  })

  api.addMonitor((response) => {
    if (response.status === 401 && !window.location.pathname.startsWith('/login')) {
      rootStore.userStore.setToken(null)
      rootStore.userStore.setUser(null)
      const redirectUrl = encodeURIComponent(window.location.pathname)
      window.location.href = `/login?redirect-url=${redirectUrl}`
    }
    if (!response.ok) {
      const error = parseResponseError(response.data.meta)
      rootStore.notificationStore.snack(error)
    }
  })

  const login = (request) => api.post('/admin/auths/login', request)

  // Lesson: { id, title, banner, content, category_id }
  const getLessons = (request) => api.get('/user/lessons', request)
  const getLesson = ({ id }) => api.get(`/user/lessons/${id}`)
  const createLesson = (request) => api.post('/admin/lessons', request)
  const updateLesson = ({ id, ...request }) => api.put(`/admin/lessons/${id}`, request)
  const deleteLesson = ({ id, ...request }) => api.delete(`/admin/lessons/${id}`, request)

  // Category: { id, name }
  const getCategories = (request) => api.get('/user/categories', request)
  const getCategory = ({ id }) => api.get(`/user/categories/${id}`)
  const createCategory = (request) => api.post('/admin/categories', request)
  const updateCategory = ({ id, ...request }) => api.put(`/admin/categories/${id}`, request)
  const deleteCategory = ({ id, ...request }) => api.delete(`/admin/categories/${id}`, request)

  // Exercise: { id, name }
  const getExercises = (request) => api.get('/user/exercises', request)
  const getExercise = ({ id }) => api.get(`/user/exercises/${id}`)
  const createExercise = (request) => api.post('/admin/exercises', request)
  const updateExercise = ({ id, ...request }) => api.put(`/admin/exercises/${id}`, request)
  const deleteExercise = ({ id, ...request }) => api.delete(`/admin/exercises/${id}`, request)

  // Searches:
  const getSearches = (request) => api.get('/user/searches', request)
  const getSearch = ({ id }) => api.get(`/user/searches/${id}`)
  const createSearch = (request) => api.post('/admin/searches', request)
  const updateSearch = ({ id, ...request }) => api.put(`/admin/searches/${id}`, request)
  const deleteSearch = ({ id, ...request }) => api.delete(`/admin/searches/${id}`, request)

  /*
  * Example:
  *   getSingedUrl({
  *       "type": "lessons",
  *       "ext": "jpg",
  *       "content_type": "image/jpg"
  *   })
  * */
  const getSingedUrl = (request) => api.post('/admin/files', request)
  const uploadToS3 = async (signedRequest, file) => {
    const apiUpload = apiCreate({ baseURL: '' })
    return apiUpload.put(signedRequest, file, {
      headers: {
        'Content-Type': file.type,
      },
    })
  }

  return {
    login,
    getLessons,
    getLesson,
    createLesson,
    updateLesson,
    deleteLesson,
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    getExercises,
    getExercise,
    createExercise,
    updateExercise,
    deleteExercise,
    getSearches,
    getSearch,
    createSearch,
    updateSearch,
    deleteSearch,
    getSingedUrl,
    uploadToS3,
  }
}


