<template>
<div>
  <b-container fluid class="col-md-8 offset-md-2">
    <b-row>
      <div class="d-block text-center" v-if="allUser.length == 0">
        <h5 class="text-center">Loading...</h5>
      </div>
      <div class="table-responsive" v-else>
       <div class="align-h-right">
         <b-button class="my-3" block size="sm">
           <export-excel
              :data = "exportData()"
              type = "csv"
              name = "filename.xls">
              Download Excel
          </export-excel>
         </b-button>
         </div>
        <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Roles</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user,index) in allUser" :key="index">
                <th scope="row">{{index+1}}</th>
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>{{getRoles(user.roles)}}</td>
                <td class="action-btn">
                  <b-button id="show-btn" class="mt-1" size="sm" @click="$bvModal.show(`bv-modal-edit-${user.id}`);getUser(user.id)">EDIT</b-button>
                  <b-button id="show-btn" size="sm" class="ml-1 mt-1" @click="$bvModal.show(`bv-modal-delete-${user.id}`)" variant="danger">DELETE</b-button>
                </td>

                <!-- Modal for Edit details -->
                <b-modal :id="`bv-modal-edit-${user.id}`" hide-footer>
                  <template slot="modal-title">
                     <code>EDIT INFO</code>
                  </template>
                  <div class="d-block">
                    <div class="d-block text-center" v-if="singleUser.length == 0">
                      <h5 class="text-center">Loading...</h5>
                    </div>
                    <b-form @submit="onSubmit" v-else>
                      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                        <b-form-input
                          id="input-2"
                          v-model="form.name"
                          required
                          placeholder="Enter name"
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group
                        id="input-group-1"
                        label="Email address:"
                        label-for="input-1"
                      >
                        <b-form-input
                          id="input-1"
                          v-model="form.email"
                          type="email"
                          required
                          placeholder="Enter email"
                        ></b-form-input>
                      </b-form-group>

                      <b-form-group id="input-group-3" label="Roles:" label-for="input-3">
                        <b-form-select
                          id="input-3"
                          v-model="form.role"
                          multiple
                          required
                        >
                        <option v-for="(role, index) in roles" :key="index" :value="`${role.id}`">{{role.name}}</option>
                        </b-form-select>
                      </b-form-group>

                      <b-button type="submit" block variant="primary">Update</b-button>
                    </b-form>
                  </div>
                  <b-button class="mt-3" block @click="$bvModal.hide(`bv-modal-edit-${user.id}`)">Close Me</b-button>
                </b-modal>

                <!-- Modal for delete user -->
                <b-modal :id="`bv-modal-delete-${user.id}`" hide-footer>
                  <template slot="modal-title">
                    <code>DELETE INFO</code>
                  </template>
                  <div class="d-block text-center">
                    <h6>Are you sure??</h6>
                  </div>

                  <b-button class="mt-1" block @click="deleteUser(user.id)" squared variant="outline-danger">Delete</b-button>
                  <b-button class="mt-1" block @click="$bvModal.hide(`bv-modal-delete-${user.id}`)" squared variant="outline-secondary">Close Me</b-button>
                </b-modal>
              </tr>
            </tbody>
        </table>
      </div>
    </b-row>
  </b-container>

</div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      form: {
        id: null,
        email: '',
        name: '',
        role: []
      },
      show: true
    }
  },
  created () {
    this.getUsers()
    this.getRole()
  },
  computed: {
    ...mapState({
      users: state => state.userList,
      user: state => state.user,
      role: state => state.role
    }),
    allUser () {
      return this.users
    },
    singleUser () {
      return this.user
    },
    roles () {
      return this.role
    }
  },
  methods: {
    ...mapActions([
      'getUsers',
      'getSingleUser',
      'getRole',
      'updateInfo',
      'userDelete',
      'export'
    ]),
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
    },
    deleteUser (id) {
      this.userDelete(id).then((result) => {
        // call the API for updated data
        this.getUsers()
        // console.log(`#bv-modal-delete-${id}`)
        this.$bvModal.hide(`bv-modal-delete-${id}`)
      })
    },
    onSubmit (evt) {
      evt.preventDefault()
      // alert(JSON.stringify(this.form))
      const info = {
        'id': this.form.id,
        data: {
          'name': this.form.name,
          'email': this.form.email,
          'roles': this.form.role
        }
      }
      this.updateInfo(info).then((result) => {
        // call the API for updated data
        this.getUsers()
        // console.log(`#bv-modal-edit-${this.form.id}`)
        this.$bvModal.hide(`bv-modal-edit-${this.form.id}`)
      })
    },
    getUser (id) {
      // console.log(id)
      this.getSingleUser(id).then((result) => {
        this.form.id = id
        this.form.role = []
        this.form.email = this.user.email
        this.form.name = this.user.name
        for (let i = 0; i < this.user.roles.length; i++) {
          this.form.role.push(this.user.roles[i].id)
        }
        // console.log(this.form.role)
      }).catch((err) => {
        console.log(err)
      })
    },
    exportData () {
      let data = []
      for (let i = 0; i < this.allUser.length; i++) {
        let tmp = {
          ID: this.allUser[i].id,
          Name: this.allUser[i].name,
          Email: this.allUser[i].email,
          Password: this.allUser[i].password,
          Roles: this.getRoles(this.allUser[i].roles)
        }
        // console.log(`${i}`, this.roleForCSV(this.allUser[i].roles))
        data.push(tmp)
      }
      return data
    }
  }
}
</script>

<style>
  .action-btn{
    margin: 0 auto;
  }
</style>
