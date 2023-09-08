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
            <button @click="performRegister()" class="btn btn-primary">Register</button>
        <br>
       </div>
       <div class="col-3"></div>
       <div class="col-3"></div>
       <div class="col-3"></div>
       <br>
    </div>
</template>
<script>
    export default {
        name: "RegisterComp",
        data(){
            return{
                email:'',
                password:''
            }
        },
        methods: {
            performRegister() {
                let users = this.$store.state.users;


                let user = { username:this.email, password:this.password, role:'user' }

                users.push(user)
                console.log(users)

                this.$router.push('/login');
            }
        }
    }
</script>