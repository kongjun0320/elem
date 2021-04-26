import { get, post } from './helpers'

const getSeller = get('/seller')
const getGoods = get('/category')
const getRatings = get('/ratings')
const signIn = post('/in')
const getUser = post('/user')

export { getSeller, getGoods, getRatings, signIn, getUser }
