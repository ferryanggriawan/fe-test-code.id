import instance from "./axios.plugin"

const mixins = {
  methods: {
    callApi() {
      return instance
    },
  },
}

export default mixins
