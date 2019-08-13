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

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
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
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
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
  .btn-danger{
    margin-left: 10px
  }
</style>
