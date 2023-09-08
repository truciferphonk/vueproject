<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light px-2">
    <div class="container">
      <ul class="navbar-nav">
        <li class="navbar-brand"><router-link class="nav-link" :to="navItems[0].path">{{navItems[0].text}}</router-link></li>
      </ul>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="n,index in navItems" :key="index" v-role="n.role">
            <router-link class="nav-link" v-if="index!=0" :to="n.path">{{n.text}}</router-link>
          </li>
          <button class="nav-link btn-outline-danger" v-role="['admin','user']" @click="doLogout()">Log Out</button>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
    name: "NavComponent",
    props: ["navItems"],
    methods:{
      doLogout(){
        this.$store.commit('userChange',undefined)
        //this.$forceUpdate
        if(this.$route.path!='/page1'){
          this.$router.push('/page1')
        }
        location.reload()
      }
    }
}
</script>