<template>
    <div>
        <div class="container">
            <h1 class="display-1 bg-light p-3 my-3">Best Game Deals</h1>
        </div>
        <hr/>
        <div v-if="games">
            <h2 class="display-4 mt-5 bg-dark text-light p-3 my-3">Featured Games</h2>
            <div class="container px-4 px-lg-5 mt-5">
                <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-5 justify-content-center">
                    <div v-for="g,index in games" :key="index" class="col mb-5">
                        <div class="card h-100">
                            <!-- Product image-->
                            <img class="card-img-top" height="200" :src="g.thumb" alt="..." />
                            <div class="card-title">{{g.external}}</div>
                            <!-- Product details-->
                            <div class="card-body p-4">
                                <div :id="g.cheapestDealID" class="text-center">
                                    <!-- Product name-->
                                    <h5 class="fw-bolder">Cheapest Deal Ever</h5>
                                    <!-- Product price-->
                                    ${{ g.cheapest }}
                                </div>
                            </div>
                            <!-- Product actions-->
                            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                <div class="text-center"><button @click="seeGame(g.external,g.gameID)" class="btn btn-outline-dark mt-auto" href="#">View All Deals</button></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <h2 class="display-4 mt-5 bg-dark text-light p-3 my-3">No Games To Display</h2>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        name: "PageOne",
        data() {
            return {
                games:[],
            }
        },
        methods:{
            async loadGames(){
                let that=this;
                const options = {
                    method: 'GET',
                    url: that.$baseApiUrl+'games',
                    params: {
                        title:"call of duty",
                        limit: '5'
                    },
                    headers: {
                        'X-RapidAPI-Key': '6e755fcdbfmshe54a8a114f8f916p16ebe9jsne3f1eb29ec9e',
                        'X-RapidAPI-Host': 'cheapshark-game-deals.p.rapidapi.com'
                    }
                };
                try {
                    const response = await axios.request(options);
                    that.games=response.data
                    console.log(that.games);
                } catch (error) {
                    console.error(error);
                }
            },
            seeGame(title,id){
                localStorage.setItem('title',JSON.stringify(title))
                localStorage.setItem('gameId',JSON.stringify(id))
                this.$router.push('/page5')
            }
        },
        mounted(){
            this.loadGames();
        }
    }
</script>