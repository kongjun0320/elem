<template>
  <div id="app">
    <v-header :seller="seller" />
  </div>
</template>

<script>
import VHeader from './components/v-header/v-header.vue'
import { getSeller } from './api'
export default {
  name: 'App',
  data() {
    return {
      seller: {}
    }
  },
  components: {
    VHeader
  },
  created() {
    this._getSeller()
  },
  methods: {
    _getSeller() {
      getSeller().then((seller) => {
        this.seller = seller
      })
    }
  }
}
</script>

<style lang="stylus"></style>
