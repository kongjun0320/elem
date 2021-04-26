<template>
  <div class="profile">
    <h3 class="title">个人信息</h3>
    <section class="form">
      <cube-form
        :model="model"
        @validate="validateHandler"
        @submit="submitHandler"
      >
        <cube-form-group>
          <cube-form-item :field="fields[0]"></cube-form-item>
        </cube-form-group>
        <cube-form-group>
          <cube-form-item :field="fields[1]"></cube-form-item>
        </cube-form-group>
        <cube-form-group>
          <cube-form-item :field="fields[2]"></cube-form-item>
        </cube-form-group>
        <cube-form-group>
          <cube-form-item :field="fields[3]"></cube-form-item>
        </cube-form-group>
        <cube-form-group>
          <cube-form-item :field="fields[4]"></cube-form-item>
        </cube-form-group>
        <cube-form-group>
          <cube-form-item :field="fields[5]"></cube-form-item>
        </cube-form-group>
        <cube-form-group>
          <cube-button type="submit">Submit</cube-button>
        </cube-form-group>
      </cube-form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      model: {
        uploadValue: [
          {
            url:
              'http://localhost:3333/uploads/upload_a2eb082fd61c83c934807482bd18d2b4.jpeg'
          }
        ],
        nickname: 'jack',
        password: '',
        gender: '',
        age: '',
        location: '',
        phone: ''
      },
      fields: [
        {
          type: 'upload',
          modelKey: 'uploadValue',
          label: ' ',
          events: {
            'file-removed': (...args) => {
              console.log('file removed', args)
            },
            'file-success': (...args) => {
              console.log(args)
            },
            'file-error': (...args) => {
              console.log(args)
            }
          },
          props: {
            multiple: false,
            max: 1,
            action: {
              target: 'http://localhost:3333/upload'
            }
          }
        },

        {
          type: 'input',
          modelKey: 'nickname',
          label: '昵称',
          props: {
            placeholder: '请输入'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'password',
          label: '密码',
          props: {
            placeholder: '请输入'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'gender',
          label: '性别',
          props: {
            placeholder: '请输入'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'age',
          label: '年龄',
          props: {
            placeholder: '请输入'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'location',
          label: '地址',
          props: {
            placeholder: '请输入'
          },
          rules: {
            required: true
          }
        },
        {
          type: 'input',
          modelKey: 'phone',
          label: '手机号码',
          props: {
            placeholder: '请输入'
          },
          rules: {
            required: true
          }
        }
      ]
    }
  },
  methods: {
    submitHandler(e) {
      console.log('submit', e)
    },
    validateHandler(result) {
      this.validity = result.validity
      this.valid = result.valid
    }
  }
}
</script>

<style lang="stylus" scoped>
.profile
  padding 30px 0
  .title
    text-align center
    font-size 30px
    color #02b6fd
    padding 30px 0
  .border-bottom-1px
    border-bottom: 1px solid #ebebeb;
</style>
