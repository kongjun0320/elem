<template>
  <cube-scroll ref="scroll" class="ratings" :options="scrollOptions">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ seller.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{ seller.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select
        @select="onSelect"
        @toggle="onToggle"
        :selectType="selectType"
        :onlyContent="onlyContent"
        :ratings="ratings"
      >
      </rating-select>
      <div class="rating-wrapper">
        <ul>
          <li
            v-for="(rating, index) in computedRatings"
            :key="index"
            class="rating-item border-bottom-1px"
          >
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar" />
            </div>
            <div class="content">
              <h1 class="name">{{ rating.username }}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{
                  rating.deliveryTime
                }}</span>
              </div>
              <p class="text">{{ rating.text }}</p>
              <div
                class="recommend"
                v-show="rating.recommend && rating.recommend.length"
              >
                <span class="icon-thumb_up"></span>
                <span
                  class="item"
                  v-for="(item, index) in rating.recommend"
                  :key="index"
                >
                  {{ item }}
                </span>
              </div>
              <div class="time">
                {{ format(rating.rateTime) }}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
import Star from '../../components/star/star'
import RatingSelect from '../../components/rating-select/rating-select'
import Split from '../../components/split/split'
import ratingMixin from '../../common/mixins/rating'
// import { getRatings } from '../../api'
import moment from 'moment'

export default {
  name: 'ratings',
  mixins: [ratingMixin],
  props: {
    data: {
      type: Object
    }
  },
  data() {
    return {
      ratings: [],
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      }
    }
  },
  computed: {
    seller() {
      return this.data.seller || {}
    }
  },
  methods: {
    fetch() {
      this.ratings = [
        {
          username: '3******c',
          rateTime: 1469281964000,
          deliveryTime: 30,
          score: 5,
          rateType: 0,
          text: '不错,强烈推荐.',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: ['花', '玫瑰花', '满天星', '菊花', '小菊花']
        },
        {
          username: '2******3',
          rateTime: 1469271264000,
          deliveryTime: '',
          score: 4,
          rateType: 0,
          text: '服务态度不错',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: ['满天星']
        },
        {
          username: '3******b',
          rateTime: 1469261964000,
          score: 3,
          rateType: 1,
          text: '',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: '1******c',
          rateTime: 1469261864000,
          deliveryTime: 20,
          score: 5,
          rateType: 0,
          text: '良心店铺',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: '2******d',
          rateTime: 1469251264000,
          deliveryTime: 10,
          score: 4,
          rateType: 0,
          text: '',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: '9******0',
          rateTime: 1469241964000,
          deliveryTime: 70,
          score: 1,
          rateType: 1,
          text: '送货速度蜗牛一样',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'd******c',
          rateTime: 1469231964000,
          deliveryTime: 30,
          score: 5,
          rateType: 0,
          text: '很喜欢的花店',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: '2******3',
          rateTime: 1469221264000,
          deliveryTime: '',
          score: 4,
          rateType: 0,
          text: '量给的还可以',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: '3******8',
          rateTime: 1469211964000,
          deliveryTime: '',
          score: 3,
          rateType: 1,
          text: '',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'a******a',
          rateTime: 1469201964000,
          deliveryTime: '',
          score: 4,
          rateType: 0,
          text: '啦啦',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: ['满天星']
        },
        {
          username: '3******3',
          rateTime: 1469191264000,
          deliveryTime: '',
          score: 4,
          rateType: 0,
          text: '很漂亮',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 't******b',
          rateTime: 1469181964000,
          deliveryTime: '',
          score: 3,
          rateType: 1,
          text: '',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'f******c',
          rateTime: 1469171964000,
          deliveryTime: 15,
          score: 5,
          rateType: 0,
          text: '送货速度很快',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'k******3',
          rateTime: 1469161264000,
          deliveryTime: '',
          score: 4,
          rateType: 0,
          text: '',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'u******b',
          rateTime: 1469151964000,
          deliveryTime: '',
          score: 4,
          rateType: 0,
          text: '下雨天给快递小哥点个赞',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 's******c',
          rateTime: 1469141964000,
          deliveryTime: '',
          score: 4,
          rateType: 0,
          text: '好',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'z******3',
          rateTime: 1469131264000,
          deliveryTime: '',
          score: 5,
          rateType: 0,
          text: '不错',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'n******b',
          rateTime: 1469121964000,
          deliveryTime: '',
          score: 3,
          rateType: 1,
          text: '发票开的不对',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'm******c',
          rateTime: 1469111964000,
          deliveryTime: 30,
          score: 5,
          rateType: 0,
          text: '好吃',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'l******3',
          rateTime: 1469101264000,
          deliveryTime: 40,
          score: 5,
          rateType: 0,
          text: '还不错吧',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: '3******o',
          rateTime: 1469091964000,
          deliveryTime: '',
          score: 2,
          rateType: 1,
          text: '',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: '3******p',
          rateTime: 1469081964000,
          deliveryTime: '',
          score: 4,
          rateType: 0,
          text: '很喜欢的花',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'o******k',
          rateTime: 1469071264000,
          deliveryTime: '',
          score: 5,
          rateType: 0,
          text: '',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        },
        {
          username: 'k******b',
          rateTime: 1469061964000,
          deliveryTime: '',
          score: 4,
          rateType: 0,
          text: '',
          avatar:
            'http://static.galileo.xiaojukeji.com/static/tms/default_header.png',
          recommend: []
        }
      ]
      // if (!this.fetched) {
      //   this.fetched = true
      //   getRatings({
      //     id: this.seller.id
      //   }).then((ratings) => {
      //     this.ratings = ratings
      //   })
      // }
    },
    format(time) {
      return moment(time).format('YYYY-MM-DD hh:mm')
    }
  },
  components: {
    Star,
    Split,
    RatingSelect
  },
  watch: {
    selectType() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/stylus/variable"
@import "../../common/stylus/mixin"

.ratings
  position: relative
  text-align: left
  white-space: normal
  height: 100%
  .overview
    display: flex
    padding: 18px 0
    .overview-left
      flex: 0 0 137px
      padding: 6px 0
      width: 137px
      border-right: 1px solid $color-col-line
      text-align: center
      @media only screen and (max-width: 320px)
        flex: 0 0 120px
        width: 120px
      .score
        margin-bottom: 6px
        line-height: 28px
        font-size: $fontsize-large-xxx
        color: $color-orange
      .title
        margin-bottom: 8px
        line-height: 12px
        font-size: $fontsize-small
        color: $color-dark-grey
      .rank
        line-height: 10px
        font-size: $fontsize-small-s
        color: $color-light-grey
    .overview-right
      flex: 1
      padding: 6px 0 6px 24px
      @media only screen and (max-width: 320px)
        padding-left: 6px
      .score-wrapper
        display: flex
        align-items: center
        margin-bottom: 8px
        .title
          line-height: 18px
          font-size: $fontsize-small
          color: $color-dark-grey
        .star
          margin: 0 12px
        .score
          line-height: 18px
          font-size: $fontsize-small
          color: $color-orange
      .delivery-wrapper
        display: flex
        align-items: center
        .title
          line-height: 18px
          font-size: $fontsize-small
          color: $color-dark-grey
        .delivery
          margin-left: 12px
          font-size: $fontsize-small
          color: $color-light-grey
  .rating-wrapper
    padding: 0 18px
    .rating-item
      display: flex
      padding: 18px 0
      &:last-child
        border-none()
      .avatar
        flex: 0 0 28px
        width: 28px
        margin-right: 12px
        img
          height: auto
          border-radius: 50%
      .content
        position: relative
        flex: 1
        .name
          margin-bottom: 4px
          line-height: 12px
          font-size: $fontsize-small-s
          color: $color-dark-grey
        .star-wrapper
          margin-bottom: 6px
          display: flex
          align-items: center
          .star
            margin-right: 6px
          .delivery
            font-size: $fontsize-small-s
            color: $color-light-grey
        .text
          margin-bottom: 8px
          line-height: 18px
          color: $color-dark-grey
          font-size: $fontsize-small
        .recommend
          display: flex
          align-items: center
          flex-wrap: wrap
          line-height: 16px
          .icon-thumb_up, .item
            margin: 0 8px 4px 0
            font-size: $fontsize-small-s
          .icon-thumb_up
            color: $color-blue
          .item
            padding: 0 6px
            border: 1px solid $color-row-line
            border-radius: 1px
            color: $color-light-grey
            background: $color-white
        .time
          position: absolute
          top: 0
          right: 0
          line-height: 12px
          font-size: $fontsize-small
          color: $color-light-grey
</style>
