<template>
    <div class="container row text-center mx-auto col-12 py-5 px-5">  
        <div class="col-3"></div>
        <div class="col-6">
            <div class="form-group">
                <label for="email">Username</label>
                <input v-model="email"  id="email" class="form-control" placeholder="Username" type="text">
            </div>
        </div>
        <div class="col-3"></div>
        <div class="col-3"></div>
        <div class="col-6">
            <div class="form-group">
                <label for="password">Password</label>
                <input v-model="password"  id="password" class="form-control" placeholder="Password" type="password">
            </div>
        </div>
        <div class="col-3"></div>
        <div class="col-3"></div>
       <div class="col-6">
        <br>
            <button @click="performLogin()" class="btn btn-primary">Login</button>
        <br>
       </div>
       <div class="col-3"></div>
       <div class="col-3"></div>
       <div class="col-3"></div>
       <br>
    </div>
</template>
<script>
    import { mapGetters } from "vuex"
    export default {
        name: "LogIn",
        data(){
            return{
                email:'',
                password:''
            }
        },
        computed: {
        ...mapGetters(['users', 'role'])
        },
        methods: {
            performLogin() {
                let users = this.$store.state.users;


                let user = users.find(x => x.username == this.email && x.password == this.password);

                localStorage.setItem("user", JSON.stringify(user));

                this.$store.commit("userChange", user)

                this.$router.push('/page1');
                location.reload();
            }
        }
    }
</script>