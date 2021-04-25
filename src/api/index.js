import { get, post } from './helpers'

const getSeller = get('/api/seller')
const getGoods = get('/api/goods')
const getRatings = get('api/ratings')
const signIn = post('api/in')

export { getSeller, getGoods, getRatings, signIn }
