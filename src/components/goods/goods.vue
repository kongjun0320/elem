<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav
        :side="true"
        :data="goods"
        :options="scrollOptions"
        v-if="goods.length"
      >
        <template slot="bar" slot-scope="props">
          <cube-scroll-nav-bar
            direction="vertical"
            :labels="props.labels"
            :txts="barTxts"
            :current="props.current"
          >
            <template slot-scope="props">
              <div class="text">
                <support-ico
                  v-if="props.txt.type >= 1"
                  :size="3"
                  :type="props.txt.type"
                ></support-ico>
                <span>{{ props.txt.name }}</span>
                <span class="num" v-if="props.txt.count">
                  <bubble :num="props.txt.count"></bubble>
                </span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel
          v-for="good in goods"
          :key="good.name"
          :label="good.name"
          :title="good.name"
        >
          <ul>
            <li
              @click="selectFood(food)"
              v-for="food in good.foods"
              :key="food.name"
              class="food-item"
            >
              <div class="icon">
                <img
                  width="96"
                  height="96"
                  style="overflow: hidden; border-radius: 3px"
                  :src="food.image"
                />
              </div>
              <div class="content">
                <h2 class="name ellipsis1">{{ food.name }}</h2>
                <p class="desc ellipsis1">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}份</span
                  ><span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span class="old" v-show="food.oldPrice"
                    >￥{{ food.oldPrice }}</span
                  >
                </div>
                <div class="cart-control-wrapper">
                  <cart-control @add="onAdd" :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <div class="shop-cart-wrapper">
      <shop-cart
        ref="shopCart"
        :select-foods="selectFoods"
        :delivery-price="seller.deliveryPrice"
        :min-price="seller.minPrice"
      ></shop-cart>
    </div>
  </div>
</template>

<script>
import { getGoods } from '../../api'
import CartControl from '../../components/cart-control/cart-control'
import ShopCart from '../../components/shop-cart/shop-cart'
// import Food from '../../components/food/food'
import SupportIco from '../../components/support-ico/support-ico'
import Bubble from '../../components/bubble/bubble'

export default {
  name: 'goods',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      goods: [],
      selectedFood: {},
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      }
    }
  },
  computed: {
    seller() {
      return this.data.seller
    },
    selectFoods() {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    },
    barTxts() {
      let ret = []
      this.goods.forEach((good) => {
        const { type, name, foods } = good
        let count = 0
        foods.forEach((food) => {
          count += food.count || 0
        })
        ret.push({
          type,
          name,
          count
        })
      })
      return ret
    }
  },
  methods: {
    fetch() {
      if (!this.fetched) {
        this.fetched = true
        getGoods({
          id: this.seller.id
        }).then((goods) => {
          console.log(goods)
          this.goods = goods
        })
      }
    },
    selectFood(food) {
      console.log(food)
      // eslint-disable-next-line no-unused-vars
      const d = {
        name: '热销爆款【罗曼蒂克】11枝红玫瑰花搭配尤加利鲜花花束 F-3',
        price: 10,
        oldPrice: '',
        description:
          '价格说明 1.未划线价：未划线价是当前商品或服务在本平台上的实时销售价（不含包装费、运输费等），是您最终决定是否购买商品或服务的依据。具体成交价格根据商品或服务参加的活动等情况发生变化，最终以订单结算页面呈现的价格为准。 2.划线价:划线价为参考价，并非价值或线下实体门店的销售价。该划线价可能是商品或服务的网络零售指导价、商家提供的正品零售价或该商品/服务在本平台上曾经展示过的销售价等。由于地区、时间在差异性和市场行情波动，零售指导价、销售价等可能会与您购物时展示的价格不一致，划线价仅供您参考。',
        sellCount: 229,
        rating: 100,
        info: '热销爆款【罗曼蒂克】11枝红玫瑰花搭配尤加利鲜花花束 F-3',
        ratings: [
          {
            username: '3******c',
            rateTime: 1469281964000,
            rateType: 0,
            text: '很喜欢的花',
            avatar:
              'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
          },
          {
            username: '2******3',
            rateTime: 1469271264000,
            rateType: 0,
            text: '',
            avatar:
              'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
          },
          {
            username: '3******b',
            rateTime: 1469261964000,
            rateType: 1,
            text: '',
            avatar:
              'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
          }
        ],
        icon:
          'https://img.alicdn.com/imgextra/i3/111483146/O1CN01Q7wxBJ1Z6udKWdskJ_!!111483146-2-eleretail.png_196x196Q90s50_.webp',
        image:
          'https://img.alicdn.com/imgextra/i3/111483146/O1CN01Q7wxBJ1Z6udKWdskJ_!!111483146-2-eleretail.png_196x196Q90s50_.webp'
      }
      const tempFood = {
        ...food,
        ratings: [
          {
            username: '3******c',
            rateTime: 1469281964000,
            rateType: 0,
            text: '很喜欢的花',
            avatar:
              'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
          },
          {
            username: '2******3',
            rateTime: 1469271264000,
            rateType: 0,
            text: '还不错',
            avatar:
              'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
          },
          {
            username: '3******b',
            rateTime: 1469261964000,
            rateType: 1,
            text: '不咋地',
            avatar:
              'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
          }
        ]
      }
      this.selectedFood = tempFood
      this._showFood()
      this._showShopCartSticky()
    },
    onAdd(target) {
      this.$refs.shopCart.drop(target)
    },
    _showFood() {
      this.foodComp =
        this.foodComp ||
        this.$createFood({
          $props: {
            food: 'selectedFood'
          },
          $events: {
            add: (target) => {
              this.shopCartStickyComp.drop(target)
            },
            leave: () => {
              this._hideShopCartSticky()
            }
          }
        })
      this.foodComp.show()
    },
    _showShopCartSticky() {
      this.shopCartStickyComp =
        this.shopCartStickyComp ||
        this.$createShopCartSticky({
          $props: {
            selectFoods: 'selectFoods',
            deliveryPrice: this.seller.deliveryPrice,
            minPrice: this.seller.minPrice,
            fold: true
          }
        })
      this.shopCartStickyComp.show()
    },
    _hideShopCartSticky() {
      this.shopCartStickyComp.hide()
    }
  },
  components: {
    Bubble,
    SupportIco,
    CartControl,
    ShopCart
    // Food
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/mixin"
@import "../../common/stylus/variable"
.goods
  position: relative
  text-align: left
  height: 100%
  .scroll-nav-wrapper
    position: absolute
    width: 100%
    top: 0
    left: 0
    bottom: 48px
  >>> .cube-scroll-nav-bar
    width: 80px
    white-space: normal
    overflow: hidden
  >>> .cube-scroll-nav-bar-item
    padding: 0 10px
    display: flex
    align-items: center
    height: 56px
    line-height: 14px
    font-size: $fontsize-small
    background: $color-background-ssss
    .text
      flex: 1
      position: relative
    .num
      position: absolute
      right: -8px
      top: -10px
    .support-ico
      display: inline-block
      vertical-align: top
      margin-right: 4px
  >>> .cube-scroll-nav-bar-item_active
    background: $color-white
    color: $color-dark-grey
  >>> .cube-scroll-nav-panel-title
    padding-left: 14px
    height: 26px
    line-height: 26px
    border-left: 2px solid $color-col-line
    font-size: $fontsize-small
    color: $color-grey
    background: $color-background-ssss
  .food-item
    display: flex
    margin: 18px
    padding-bottom: 18px
    position: relative
    &:last-child
      border-none()
      margin-bottom: 0
    .icon
      flex: 0 0 57px
      margin-right: 10px
      img
        height: auto
    .content
      flex: 1
      overflow: hidden
      .name
        margin: 2px 0 8px 0
        height: 14px
        line-height: 14px
        font-size: $fontsize-medium
        color: $color-dark-grey
      .desc, .extra
        line-height: 10px
        font-size: $fontsize-small-s
        color: $color-light-grey
      .desc
        line-height: 12px
        margin-bottom: 8px
      .extra
        .count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: $fontsize-medium
          color: $color-red
        .old
          text-decoration: line-through
          font-size: $fontsize-small-s
          color: $color-light-grey
    .cart-control-wrapper
      position: absolute
      right: 0
      bottom: 12px
  .shop-cart-wrapper
    position: absolute
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
</style>
