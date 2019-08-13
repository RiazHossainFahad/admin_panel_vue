<template>
<div>
  <b-container fluid class="col-md-8 offset-md-2">
    <b-row>
      <div style="text-align:center" v-if="allUser.length == 0">Loading...</div>
      <div class="table-responsive" v-else>
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
                  <b-button id="show-btn" size="sm" @click="$bvModal.show(`bv-modal-edit-${user.id}`)">EDIT</b-button>
                  <b-button id="show-btn" size="sm" class="ml-1 mt-sm-1" @click="$bvModal.show(`bv-modal-delete-${user.id}`)" variant="danger">DELETE</b-button>
                </td>

                <!-- Modal for Edit details -->
                <b-modal :id="`bv-modal-edit-${user.id}`" hide-footer>
                  <template slot="modal-title">
                     <code>EDIT INFO</code>
                  </template>
                  <div class="d-block text-center">
                    <h3>Hello From This Modal!</h3>
                  </div>
                  <b-button class="mt-3" block @click="$bvModal.hide(`bv-modal-edit-${user.id}`)">Close Me</b-button>
                </b-modal>

                <!-- Modal for delete details -->
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
    }
  },
  created () {
    this.getUsers()
  },
  computed: {
    ...mapState({
      users: state => state.userList
    }),
    allUser () {
      return this.users
    }
  },
  methods: {
    ...mapActions([
      'getUsers'
    ]),
    // get the roles in 'role1,role2' format
    getRoles (role) {
      let data = ''
      for (let index = 0; index < role.length; index++) {
        data += role[index].name + ','
        if (index === (role.length - 1)) {
          data += role[index].name
        }
      }
      return data
    },
    deleteUser (id) {
      console.log(id)
    }
  }
}
</script>

<style>
  .action-btn{
    margin: 0 auto;
  }
</style>
