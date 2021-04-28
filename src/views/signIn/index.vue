<template>
  <div class="sign-in">
    <h1 class="title">花猫鲜花</h1>
    <section class="form">
      <cube-input
        class="input"
        v-model="username"
        placeholder="用户名"
      ></cube-input>
      <cube-input
        class="input"
        v-model="password"
        placeholder="密码"
        type="password"
      ></cube-input>
    </section>
    <p class="info">
      新用户登录即自动注册，并表示已同意
      <b>《用户服务协议》</b>和
      <b>《隐私权政策》</b>
    </p>
    <section class="login" @click="_signIn">登录</section>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'SignIn',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['loginAngUser']),
    async _signIn() {
      const { username, password } = this
      const params = { username, password }
      const result = await this.loginAngUser(params)
      if (result) {
        this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.sign-in
  padding 20px 30px
  .title
    text-align center
    font-size 30px
    padding 10px 0
    color #02b6fd
  .input
    margin 10px 0
  .info
    padding 15px 0
    line-height 1.5
    font-size 14px
    color #999
    b
      color #02b6fd
  .login
    height 42px
    line-height 42px
    text-align center
    background #02b6fd
    color #fff
    border-radius 20px
</style>
