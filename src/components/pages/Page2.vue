<template>
    <div>
        <div class="container">
            <h1 class="display-1 bg-light p-3 my-3">All Game Deals</h1>
        </div>
        <div id="sort" class="px-3 row mx-auto my-5">
            <div class="col-3 bg-dark" style="height:1000px;">
                <h4 class="mt-3 text-light">Sort By: {{sortBy}}</h4>
                <select autocomplete="off" class="form-select" v-model="sortBy">
                    <option value="Deal Rating" selected>Deal Rating</option>
                    <option value="Title">Title</option>
                    <option value="Price">Price</option>
                </select>
                <div class="form-group text-white">
                    <label for="blankRadio1">DESC</label>
                    <input class="form-check-input position-static ms-2 me-3" v-model="descAsc" checked type="radio" name="blankRadio" id="blankRadio1" value="1" aria-label="..."/>
                    <label for="blankRadio2">ASC</label>
                    <input class="form-check-input position-static ms-2" v-model="descAsc" type="radio" name="blankRadio" id="blankRadio2" value="0" aria-label="..."/>
                </div>
                <div class="form-group mt-3">
                    <h4 class="mt-3 text-light">Search</h4>
                    <input type="text" class="form-control" id="search" name="search" v-model="search" placeholder="Enter a game title..."/>
                </div>
                <div class="form-group mt-3 row">
                    <h4 class="text-light">Price Range</h4>
                    <div class="col-6">
                        <input type="text" class="form-control" id="min" name="min" v-model="min" placeholder="Minimum Price"/>
                    </div>
                    <div class="col-6">
                        <input type="text" class="form-control" id="max" name="max" v-model="max" placeholder="Maximum Price"/>
                        <label for="max" class="text-light">(50 acts the same as no limit)</label>
                    </div>
                </div>
                <button @click="sortEvent()" class="mt-3 col-12 btn btn-success">Search</button>
            </div>
            <div class="col-9">
                <div class="container px-4 px-lg-5 mt-5">
                    <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-5 justify-content-center" v-if="deals">
                        <div class="card-deck" v-for="d,index in deals" :key="index">
                            <div class="col-12 mb-4">
                                <div class="card h-100">
                                    <img class="card-img-top" height="200" :src="d.thumb" alt="..." />
                                    <div class="px-2 responsive-font-example card-text">{{d.title ? d.title:"[No Title]"}}</div>
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
                                        <button @click="addToCart(d)" v-role="['user','admin']"  class="btn btn-outline-primary">Add To Cart</button>
                                        <button @click="toLogin()" v-role="['guest']"  class="btn btn-outline-primary">Log In To Buy</button>
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
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        name: "PageTwo",
        data(){
            return{
                deals:[],
                sortBy:"Deal Rating",
                search:"",
                min:0,
                max:50,
                descAsc:0,
                storeDeals:[],
                cart:[]
            }
        },
        methods:{
            addToCart(deal){
                this.cart=JSON.parse(localStorage.getItem('cart'))?JSON.parse(localStorage.getItem('cart')):[]
                let obj={
                    title:deal.title,
                    gameID:deal.gameID,
                    price:deal.isOnSale?deal.salePrice:deal.normalPrice,
                    pic:deal.thumb
                }
                this.cart.push(obj)
                localStorage.setItem('cart',JSON.stringify(this.cart))
            },
            toLogin(){
                this.$router.push('/login')
            },
            async loadGames(data){
                let that=this;
                const options = {
                method: 'GET',
                url: 'https://cheapshark-game-deals.p.rapidapi.com/deals',
                params: {
                    lowerPrice: this.min,
                    steamRating: '0',
                    title:this.search,
                    desc: this.descAsc,
                    output: 'json',
                    steamworks: '0',
                    sortBy: this.sortBy,
                    AAA: '0',
                    pageSize: '60',
                    exact: '0',
                    upperPrice: this.max,
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
                    data.forEach(x => {
                        that.deals.push(x);
                    });
                } catch (error) {
                    console.error(error);
                }
            },
            sortEvent(){
                let filtered=[];
                let that=this
                if(this.search==""){
                    filtered=this.$store.state.deals
                }
                else{
                    this.$store.state.deals.forEach(x=>{
                    if(x.title.toLowerCase().includes(this.search.toLowerCase())){
                        filtered.push(x)
                    }
                })
                }
                let pricedMin=filtered.filter(function(x){
                    return (x.isOnSale?x.salePrice:x.normalPrice)>=that.min
                })
                let priced=pricedMin.filter(function(x){
                    return (x.isOnSale?x.salePrice:x.normalPrice)<=(that.max==50?Infinity:that.max)
                })

                let sort=this.sortBy
                let ascDesc=this.descAsc
                console.log(isNaN(ascDesc))
                let sorted=[];
                switch(sort){
                    case 'Deal Rating':
                        if(ascDesc==1){
                            sorted=priced.sort((a,b)=>
                                parseFloat(b.dealRating)-parseFloat(a.dealRating)
                            )
                        }
                        else{
                            sorted=priced.sort((a,b)=>
                                parseFloat(a.dealRating)-parseFloat(b.dealRating)
                            )
                        }
                    break
                    case 'Price':
                        if(ascDesc==1){
                            console.log(priced[0].salePrice)
                            sorted=priced.sort((a,b)=>
                                parseFloat(b.salePrice)-parseFloat(a.salePrice)
                            )
                        }
                        else{
                            sorted=priced.sort((a,b)=>
                                parseFloat(a.salePrice)-parseFloat(b.salePrice)
                            )
                        }
                    break
                    case 'Title':
                        if (ascDesc == 1) {
                            sorted = priced.sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
                        } else {
                            sorted = priced.sort((a, b) => b.title.toLowerCase().localeCompare(a.title.toLowerCase()));
                        }
                    break
                }
                console.log(sorted)
                this.loadGames(sorted);
            }
        },
        mounted(){
            this.loadGames(this.$store.state.deals);
            if(localStorage.getItem('cart')){
                return JSON.parse(localStorage.getItem('cart'))
            }
            else{
                return []
            }
        },
    }
</script>
<style>
.card-deck{
    display: flex;
    flex-wrap: wrap;
    align-items:stretch;
}
</style>