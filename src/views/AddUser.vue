<template>
  <div class="check" style="margin-top:1%">
    <div class="h3 text-center">Add User</div>

    <b-alert
      variant="success"
      dismissible
      fade
      :show="showDismissibleAlertSuccess"
      @dismissed="showDismissibleAlertSuccess=false"
    >
      User Created!!
    </b-alert>

    <b-alert
      variant="danger"
      dismissible
      fade
      :show="showDismissibleAlertEmail"
      @dismissed="showDismissibleAlertEmail=false"
    >
      Email is taken!!
    </b-alert>

    <b-alert
      variant="danger"
      dismissible
      fade
      :show="showDismissibleAlert"
      @dismissed="showDismissibleAlert=false"
    >
      Password Mismatched!!
    </b-alert>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-2">
        <b-form-input
          id="input-2"
          v-model="form.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-1"
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

      <b-form-group>
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.c_password"
          required
          placeholder="Re-enter password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3">
        <b-form-select
          id="input-3"
          v-model="form.role"
          multiple
          required
        >
        <option v-for="(role, index) in roles" :key="index" :value="`${role.id}`">{{role.name}}</option>
        </b-form-select>
      </b-form-group>

      <b-button type="submit" block variant="primary">Add User</b-button>
      <b-button type="reset" block variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'AddUser',
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        c_password: '',
        role: []
      },
      showDismissibleAlert: false,
      showDismissibleAlertSuccess: false,
      showDismissibleAlertEmail: false,
      show: true
    }
  },
  created () {
    this.getRole()
  },
  computed: {
    ...mapState({
      role: state => state.role,
      msg: state => state.msg
    }),
    roles () {
      return this.role
    }
  },
  methods: {
    ...mapActions([
      'getRole',
      'insertInfo'
    ]),
    onSubmit (evt) {
      evt.preventDefault()
      const data = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
        confirm_password: this.form.c_password,
        roles: this.form.role
      }
      if (this.form.password !== this.form.c_password) {
        this.showDismissibleAlert = true
      } else {
        this.showDismissibleAlert = false
        this.insertInfo(data).then((result) => {
          if (this.msg !== '') {
            this.showDismissibleAlert = false
            this.showDismissibleAlertEmail = false
            this.showDismissibleAlertSuccess = true
            // Reset our form values
            this.form.name = ''
            this.form.email = ''
            this.form.password = ''
            this.form.c_password = ''
            this.form.role = []
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
              this.show = true
            })
          } else {
            this.showDismissibleAlertEmail = true
          }
        })
      }
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.name = ''
      this.form.email = ''
      this.form.password = ''
      this.form.c_password = ''
      this.form.role = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.showDismissibleAlert = false
      this.showDismissibleAlertSuccess = false
      this.showDismissibleAlertEmail = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style>
  .check{
    width: 85%;
    max-width: 450px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    padding: 20px;
    border: 1px solid #dddddd;
    background-color: #ffffff;
  }
  .btn-danger{
    margin-left: 0px
  }
</style>
