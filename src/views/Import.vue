<template>
  <div class="check" style="margin-top:5%">

    <b-alert
      variant="danger"
      dismissible
      fade
      :show="showDismissibleAlert"
      @dismissed="showDismissibleAlert=false"
    >
      Empty file!!
    </b-alert>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
     <b-form-group>
       <b-form-file
        v-model="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        @change="processFile($event)"
      ></b-form-file>
     </b-form-group>

      <b-button type="submit" block variant="primary">Import</b-button>
      <b-button type="reset" block variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ImportVue',
  data () {
    return {
      form: {
        file: null
      },
      showDismissibleAlert: false,
      show: true
    }
  },
  methods: {
    ...mapActions([
      'import'
    ]),
    processFile (event) {
      // this.img = URL.createObjectURL(event.target.files[0]);
      this.file = this.$refs.file.files[0]
    },
    onSubmit (evt) {
      evt.preventDefault()
      if (this.file === null) {
        this.showDismissibleAlert = true
      } else {
        // const data = document.getElementById('myForm');
        this.showDismissibleAlert = false
        const formData = new FormData()
        formData.append('file', this.file)
        this.import(formData)
      }
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.file = null
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
    width: 85%;
    max-width: 550px;
    margin: auto;
    position: absolute;
    left: 0;
    right: 0;
    padding: 20px;
    border: 1px solid #dddddd;
    background-color: #ffffff;
  }
</style>
