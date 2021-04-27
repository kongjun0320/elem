<template>
  <div class="home" @touchmove.prevent>
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs"></tab>
    </div>
  </div>
</template>

<script>
// import qs from 'query-string'
import { getSeller } from '../../api'
import VHeader from '../../components/v-header/v-header'
import Goods from '../../components/goods/goods'
import Ratings from '../../components/ratings/ratings'
import Seller from '../../components/seller/seller'
import Tab from '../../components/tab/tab'
export default {
  name: 'Home',
  components: {
    Tab,
    VHeader
  },
  data() {
    return {
      // seller: {
      //   id: qs.parse(location.search).id
      // },
      seller: {
        name: '花猫鲜花（西湖店）',
        description: '蜂鸟专送',
        deliveryTime: 38,
        score: 4.2,
        serviceScore: 4.1,
        foodScore: 4.3,
        rankRate: 69.2,
        minPrice: 20,
        deliveryPrice: 4,
        ratingCount: 24,
        sellCount: 90,
        bulletin:
          '保证品质 24小时营业 任何问题请联系客服：18858192603 w同号。下单请备注收花人姓名、电话、地址及贺卡内容;需要发票：请备注好发票抬头、邮箱、手机号码、方便联系您。平时送达时间1-3小时【请勿催单】节假日由于订单量多只保证当天送达，请您耐心稍等，我们会以最快的速度提供最优质的服务; 客服电话：18858192603 鲜花为生鲜定制产品，一旦制作，非质量问题不支持退换;',
        supports: [
          {
            type: 0,
            description: '在线支付满28减5'
          },
          {
            type: 1,
            description: '支持使用联盟商家红包'
          },
          {
            type: 2,
            description: '该商户支持下单后到店自取服务'
          },
          {
            type: 3,
            description: '该商家支持发票,请下单写好发票抬头'
          },
          {
            type: 4,
            description: '已加入“外卖保”计划,食品安全保障'
          }
        ],
        avatar:
          'https://cube.elemecdn.com/5/a0/b8a32537b2a68a03097758ad8e79fpng.png?x-oss-process=image/resize,w_2880,h_2880/format,webp/quality,q_90',
        imagePath:
          'https://img.alicdn.com/imgextra/i3/2208503588091/O1CN01CZbACh29djAwHgfCQ_!!2208503588091-0-koubei.jpg',
        pics: [
          'https://cube.elemecdn.com/b/62/d0c744130c94d18bcfc2fae1ce81ejpeg.jpeg?imageMogr/thumbnail/!180x180r/gravity/Center/crop/180x180/',
          'https://cube.elemecdn.com/1/64/63d6b148f78bce57d1d315ab3f19bjpeg.jpeg?imageMogr/thumbnail/!180x180r/gravity/Center/crop/180x180/',
          'https://cube.elemecdn.com/3/26/0d85e835627bf1ab7478a82c7fd6fjpeg.jpeg?imageMogr/thumbnail/!180x180r/gravity/Center/crop/180x180/',
          'https://cube.elemecdn.com/f/64/c5da139e2b5a07c03824906978474jpeg.jpeg?imageMogr/thumbnail/!180x180r/gravity/Center/crop/180x180/'
        ],
        infos: [
          '该商家支持发票,请下单写好发票抬头',
          '品类:花店',
          '北京市昌平区回龙观西大街龙观置业大厦底商B座102单元1340',
          '营业时间:10:00-20:30'
        ]
      }
    }
  },
  computed: {
    tabs() {
      return [
        {
          label: '商品',
          component: Goods,
          data: {
            seller: this.seller
          }
        },
        {
          label: '评论',
          component: Ratings,
          data: {
            seller: this.seller
          }
        },
        {
          label: '商家',
          component: Seller,
          data: {
            seller: this.seller
          }
        }
      ]
    }
  },
  created() {
    // this._getSeller()
  },
  methods: {
    _getSeller() {
      getSeller({
        id: this.seller.id
      }).then((seller) => {
        // this.seller = Object.assign({}, this.seller, seller)
        this.seller = Object.assign({}, this.seller, seller)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.home
  .tab-wrapper
    position: fixed
    top: 136px
    left: 0
    right: 0
    bottom: 0
</style>
