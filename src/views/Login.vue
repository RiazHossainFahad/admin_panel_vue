<template>
  <div class="check" style="top:30%">
    <div class="h1">LOGIN</div>

    <b-alert
      variant="danger"
      dismissible
      fade
      :show="showDismissibleAlert"
      @dismissed="showDismissibleAlert=false"
    >
      Wrong Cradentials!!
    </b-alert>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group>
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" block variant="primary">Submit</b-button>
      <b-button type="reset" block variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LoginVue',
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      showDismissibleAlert: false,
      show: true
    }
  },
  computed: {
    ...mapState({
      userProfile: state => state.userProfile
    })
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    onSubmit (evt) {
      evt.preventDefault()
      // alert(JSON.stringify(this.form))
      const data = {
        email: this.form.email,
        password: this.form.password
      }
      this.login(data).then((result) => {
        const roles = this.getRoles(this.userProfile.roles)
        localStorage.setItem('roles', roles)
        this.$router.push('/')
      }).catch((err) => {
        console.log(err)
      })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    // get the roles in 'role1,role2' format
    getRoles (role) {
      let data = ''
      for (let index = 0; index < role.length; index++) {
        if (index === (role.length - 1)) {
          data += role[index].name
        } else {
          data += role[index].name + ','
        }
      }
      return data
    }
  }
}
</script>

<style>
  .check{
    width: 75%;
    max-width: 350px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    padding: 20px;
    border: 1px solid #dddddd;
    background-color: #ffffff;
  }
</style>
