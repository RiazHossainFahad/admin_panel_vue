<template>
  <div class="check" style="margin-top:5%">
    <div class="h3 text-center">Import</div>
    <b-alert
      variant="danger"
      dismissible
      fade
      :show="showDismissibleAlert"
      @dismissed="showDismissibleAlert=false"
    >
      Empty file!!
    </b-alert>

    <b-alert
      variant="danger"
      dismissible
      fade
      :show="showDismissibleAlertError"
      @dismissed="showDismissibleAlertError=false"
    >
      {{getImport.error}}
    </b-alert>

    <b-alert
      variant="success"
      dismissible
      fade
      :show="showDismissibleAlertSuccess"
      @dismissed="showDismissibleAlertSuccess=false"
    >
      {{getImport.success}}
    </b-alert>

    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
     <b-form-group>
       <b-form-file
        v-model="file"
        type="file"
        ref="file"
        :state="Boolean(file)"
        placeholder="Choose a file or drop it here..."
        drop-placeholder="Drop file here..."
        @change="processFile($event)"
      ></b-form-file>
     </b-form-group>

      <!-- <b-form-group>
        <div class="custom-file">
          <input type="file" id="file" ref="file" class="custom-file-input" @change="processFile()">
          <label class="custom-file-label" for="customFile">Choose file</label>
        </div>
      </b-form-group> -->

      <b-button type="submit" block variant="primary">Import</b-button>
      <b-button type="reset" block variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ImportVue',
  data () {
    return {
      file: null,
      showDismissibleAlert: false,
      showDismissibleAlertError: false,
      showDismissibleAlertSuccess: false,
      show: true
    }
  },
  computed: {
    ...mapState({
      importData: state => state.import
    }),
    getImport () {
      return this.importData
    }
  },
  methods: {
    ...mapActions([
      'import'
    ]),
    processFile (e) {
      // this.img = URL.createObjectURL(event.target.files[0]);
      this.file = e.target.files[0]
      this.showDismissibleAlert = false
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
        this.import(formData).then((result) => {
          this.file = null
          this.showDismissibleAlert = false
          // Trick to reset/clear native browser form validation state
          this.show = false
          this.$nextTick(() => {
            this.show = true
          })
          if (this.getImport.success) {
            this.showDismissibleAlertSuccess = true
          } else if (this.getImport.error) {
            this.showDismissibleAlertError = true
          }
        })
      }
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.file = null
      this.showDismissibleAlert = false
      this.showDismissibleAlertError = false
      this.showDismissibleAlertSuccess = false
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
  #app{
    text-align: left
  }
</style>
