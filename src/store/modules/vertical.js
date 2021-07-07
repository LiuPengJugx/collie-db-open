import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  tabledata: '',
  workloads: [],
  methods: [],
  costModels: [],

}

const mutations = {
  SET_TABLE: (state, tabledata) => {
    state.tabledata = tabledata
  },
  SET_WORKLOAD: (state, workloads) => {
    state.workloads = workloads
  },
  SET_METHODS: (state, methods) => {
    state.methods = methods
  },
  SET_COSTMODELS: (state, costModels) => {
    state.costModels = costModels
  }
}

const actions = {

}

export default {
  state,
  mutations,
  actions
}
