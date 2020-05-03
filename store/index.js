import Vue from 'vue'

export const state = () => ({
  companies: [],
  products: []
})

export const mutations = {
  SET_DATA(state, params) {
    Vue.set(state, params.destination, params.data)
  },
  PUSH_DATA(state, params) {
    state[params.destination].push(params.data)
  },
  DELETE_ARRAY_ELEMENT(state, { destination, index }) {
    state[destination].splice(index, 1)
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req, $axios }) {},

  set_data(context, data) {
    context.commit('SET_DATA', {
      destination: data.destination,
      data: data.data
    })
  },
  push_data(context, data) {
    context.commit('PUSH_DATA', {
      destination: data.destination,
      data: data.data
    })
  },

  delete_array_element(context, { destination, index }) {
    context.commit('DELETE_ARRAY_ELEMENT', {
      destination,
      index
    })
  }
}

export const getters = {
  userCompany(state) {
    const companies = state.companies
    const userCompany = companies.filter((company) => {
      console.log()
      return company.id === state.auth.user.companyId
    })

    return userCompany
  }
}
