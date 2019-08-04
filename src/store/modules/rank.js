//import * as services from 'services/x-library-pro/implement/hymz'
import ss  from '@/utils/sessionStorage'
import { SET_BOOKLIST }  from '../mutations-types'
export default {
  namespaced: true,
  state: {
    _id:ss.getItem('rank') && ss.getItem('rank')._id,
    monthRank:ss.getItem('rank') && ss.getItem('rank').monthRank,
    totalRank:ss.getItem('rank') && ss.getItem('rank').totalRank,
    rank: ss.getItem('rank') || {}
  },
  mutations: {
    [SET_BOOKLIST](state, args) {
      state[args[0]] = args[1]
      state.rank[args[0]] = args[1]
      ss.setItem('rank', state.rank)
    },
  },
  actions: {
    async getBookList({ state, commit }, data) {

    }
  }
}
