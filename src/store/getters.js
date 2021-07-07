const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  tabledata: state => state.vertical.tabledata,
  workloads: state => state.vertical.workloads,
  methods: state => state.vertical.methods,
  costModels: state => state.vertical.costModels
}
export default getters
