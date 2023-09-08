<template>
    <div>
        <div class="container">
            <h2 class="display-4 mt-5 bg-dark text-light p-3 my-3">Game Deals</h2>
        </div>
        <div class="container px-4 px-lg-5 mt-5">
            <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-5 justify-content-center" v-if="deals">
                <div v-for="d,index in deals.filter(d=>d.gameID==hasID)" :key="index">
                    <div class="col-12">
                        <div class="card h-100">
                            <img class="card-img-top" height="150" :src="d.thumb" alt="..." />
                            <div class="card-title">{{d.title}}</div>
                            <div class="card-body p-4">
                                <div :id="d.cheapestDealID" class="text-center">
                                    <h6 class="fw-bolder">Original Price</h6>
                                        <span>${{ d.normalPrice }}</span>
                                    <hr/>
                                    <div v-if="d.isOnSale==1">
                                        <h5 class="fw-bolder text-danger">Sale Price</h5>
                                        <span class="text-danger">${{ d.salePrice }}</span>
                                    </div>
                                    <div v-else>
                                        <h5 class="fw-bolder text-danger">Not Discounted</h5>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button @click="addToCart(d.dealID)" class="btn btn-outline-primary">Add To Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else>
                <h2 class="display-4 mt-5 bg-dark text-light p-3 my-3">No Deals To Display</h2>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default { 
        name: "SingleGame",
        data(){
            return{
                deals:[],
                id:null,
                title:"",
                cart:[]
            }
        },
        computed:{
            hasID(){
                return JSON.parse(localStorage.getItem('gameId')) ? JSON.parse(localStorage.getItem('gameId')) : null
            }
        },
        mounted(){
            if(!localStorage.getItem('gameId')||!localStorage.getItem('title')){
                this.$router.push('/page1')
            }
            else{
                this.title=JSON.parse(localStorage.getItem('title'))
                this.loadGames(this.title)
            }
            if(localStorage.getItem('cart')){
                return JSON.parse(localStorage.getItem('cart'))
            }
            else{
                return []
            }
        },
        updated:function(){
            localStorage.removeItem('title')
            localStorage.removeItem('gameId')
            
        },
        methods:{
            async loadGames(title){
                let that=this;
                const options = {
                    method: 'GET',
                    url: that.$baseApiUrl+'deals',
                    params: {
                        title:title,
                        output: 'json',
                        steamworks: '0',
                        sortBy: 'Deal Rating',
                        AAA: '0',
                        pageSize: '60',
                        exact: '0',
                        upperPrice: '50',
                        pageNumber: '0',
                        onSale: '0',
                        metacritic: '0',
                        'storeID[0]': '1,2,3'
                    },
                    headers: {
                        'X-RapidAPI-Key': '6e755fcdbfmshe54a8a114f8f916p16ebe9jsne3f1eb29ec9e',
                        'X-RapidAPI-Host': 'cheapshark-game-deals.p.rapidapi.com'
                    }
                };
                try {
                    const response = await axios.request(options);
                    that.deals=response.data
                } catch (error) {
                    console.error(error);
                }
            },
            addToCart(dealID){
                this.cart.push({"dealID":dealID})
                localStorage.setItem('cart',JSON.stringify(this.cart))
            }
        }
    }
</script>