<template>
 <div>
   <header>
     <b-navbar toggleable="lg" type="dark" variant="info">
       <b-navbar-brand href="/">Admin Panel</b-navbar-brand>

       <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

       <b-collapse id="nav-collapse" is-nav>
         <b-navbar-nav>
           <b-nav-item href="/">SHOW USERS</b-nav-item>
           <b-nav-item href="add">ADD USER</b-nav-item>
         </b-navbar-nav>

         <!-- Right aligned nav items -->
         <b-navbar-nav class="ml-auto">
           <b-nav-item-dropdown right>
             <!-- Using 'button-content' slot -->
             <template slot="button-content"><em>USER</em></template>
             <b-dropdown-item @click="logoutUser()">Sign Out</b-dropdown-item>
           </b-nav-item-dropdown>
         </b-navbar-nav>
       </b-collapse>
     </b-navbar>
  </header>

  <main>
   <router-view/>
  </main>
 </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions([
      'logout'
    ]),
    logoutUser () {
      this.logout().then((result) => {
        localStorage.removeItem('token')
        this.$router.push('/login')
      })
    }
  }
}
</script>
