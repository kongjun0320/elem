import { get, post } from './helpers'

const getSeller = get('/api/seller')
const getGoods = get('/api/goods')
const getRatings = get('/api/ratings')
const signIn = post('/api/in')
const getUser = post('/api/user')

export { getSeller, getGoods, getRatings, signIn, getUser }
