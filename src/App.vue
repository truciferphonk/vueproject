<template>
  <div id="app">
    <body>
      <Nav :navItems="navigation"/>
      <Header :headerItems="header"/>

      <main id="main" class="mx-auto">
        <router-view></router-view>

      </main><!-- End #main -->
      <Footer/>
    </body>

  </div>
</template>

<script>
import Header from "./components/Header.vue"
import Nav from "./components/Nav.vue"
import Footer from "./components/Footer.vue"
export default {
  name: 'App',
  components: {
    Nav,
    Header,
    Footer
  },
  data() {
    return {
      navigation:[
            {
              text: "Home",
              path: "/page1",
              role:[
                'user',
                'guest',
                'admin'
              ]
            },
            {
              text: "Game Lookup",
              path: "/page2",
              role:[
                "user",
                "guest",
                "admin"
              ]
            },
            {
              text: "Cart",
              path: "/page4",
              role:[
                "user",
                "admin"
              ]
            },
            {
              text: "Admin Panel",
              path: "/admin",
              role:[
                "admin"
              ]
            },
            {
              text: "Login",
              path: "/login",
              role: [
                "guest"
              ]
            },
            {
              text: "Register",
              path: "/register",
              role: [
                "guest"
              ]
            }
        ],
      header: this.$store.state.header
    }
  },
  mounted(){
    if(this.$route.path=='/'){
      this.$router.push('/page1')
    }
  },
  computed:{
    users(){
      return this.$store.state.users
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#main{
  min-height: 800px;
}
</style>
