<template>
    <div>
        <div class=" container-fluid my-5">
            <div class="row justify-content-center ">
                <div class="col-xl-10">
                    <div class="card shadow-lg ">
                        <div class="row p-2 mt-3 justify-content-between mx-sm-2">
                            <div class="col">
                                <p class="text-muted space mb-0 shop">Shop No.78618K</p> 
                                <p class="text-muted space mb-0 shop">Cheap Lion</p>   
                            </div>
                            <div class="col">
                                <div class="row justify-content-start ">
                                    <div class="col">
                                        <img class="irc_mi img-fluid cursor-pointer " src="https://i.imgur.com/jFQo2lD.png"  width="70" height="70" >
                                    </div>
                                </div>
                            </div>
                            <div class="col-auto">
                                <img class="irc_mi img-fluid bell" src="https://i.imgur.com/uSHMClk.jpg" width="30" height="30"  >
                            </div>
                        </div>
                    
                        <div class="row justify-content-around">
                            <div class="col-md-5">
                                <div class="card border-0">
                                    <div class="card-header pb-0">
                                        <h2 class="card-title space ">Checkout</h2>
                                        <p class="card-text text-muted mt-4  space">SHIPPING DETAILS</p>
                                        <hr class="my-0">
                                    </div>
                                    <div class="card-body">
                                        <div class="row justify-content-between">
                                            <div class="col-auto mt-0"><p><b>Cheap Lion</b></p></div>
                                            <div class="col-auto"><p><b>cheaplion@gmail.com</b> </p></div>
                                        </div>
                                        <div class="row mt-4">
                                            <div class="col"><p class="text-muted mb-2">PAYMENT DETAILS</p><hr class="mt-0"></div>
                                        </div>
                                        <div class="form-group">
                                            <label for="NAME" class="small text-muted mb-1">NAME ON CARD</label>
                                            <input type="text" class="form-control form-control-sm" name="NAME" id="NAME" aria-describedby="helpId" placeholder="Cheap Lion">
                                        </div>
                                        <div class="form-group">
                                            <label for="NAME" class="small text-muted mb-1">CARD NUMBER</label>
                                            <input type="text" class="form-control form-control-sm" name="NAME" id="NAME" aria-describedby="helpId" placeholder="4534 5555 5555 5555">
                                        </div>
                                        <div class="row no-gutters">
                                            <div class="col-sm-6 pr-sm-2">
                                                <div class="form-group">
                                                    <label for="NAME" class="small text-muted mb-1">VALID THROUGH</label>
                                                    <input type="text" class="form-control form-control-sm" name="NAME" id="NAME" aria-describedby="helpId" placeholder="06/21">
                                                </div>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="form-group">
                                                    <label for="NAME" class="small text-muted mb-1">CVC CODE</label>
                                                    <input type="text" class="form-control form-control-sm" name="NAME" id="NAME" aria-describedby="helpId" placeholder="183">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-5">
                                <div class="card border-0 ">
                                    <div class="card-header card-2">
                                        <p class="card-text text-muted mt-md-4  mb-2 space">YOUR ORDER</p>
                                        <hr class="my-2">
                                    </div>
                                    <div class="card-body pt-0">
                                        <div v-for="d,index in deals" :key="index">
                                            <div class="row  justify-content-between">
                                                <div class="col-auto col-md-7">
                                                    <div class="media flex-column flex-sm-row">
                                                        <img class="img-fluid" :src="d.pic" width="62" height="62">
                                                        <div class="media-body  my-auto">
                                                            <div class="row">
                                                                <div class="col"><p class="mb-0"><b>{{d.title}}</b></p><small class="text-muted">{{d.gameID}}</small></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class=" pl-0 flex-sm-col col-auto  my-auto "><p><b>${{d.price}}</b></p><button @click="removeItem(index)" class="btn btn-danger text-light">X</button></div>
                                        </div>
                                        <hr class="my-2">
                                        </div>
                                        <div class="row ">
                                            <div class="col">
                                                <div class="row justify-content-between">
                                                    <div class="col-4"><p class="mb-1"><b>Total</b></p></div>
                                                    <div class="flex-sm-col col-auto"><p class="mb-1"><b>${{totalRounded}}</b></p></div>
                                                </div>
                                                <hr class="my-0">
                                            </div>
                                        </div>
                                        <div class="row mb-5 mt-4 ">
                                            <div class="col-md-7 col-lg-6 mx-auto"><button @click="purchase()" type="button" class="btn btn-block btn-outline-primary btn-lg">{{this.total!=0?"CONFIRM PURCHASE":"BACK TO HOMEPAGE"}}</button></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "PageFour",
        data(){
            return{
                cartItems:[],
                deals:[],
                total:0,
                totalRounded:0
            }
        },
        mounted(){
            if(!localStorage.getItem('cart')){
                this.$router.push('/page1')
            }
            else{
                this.loadItems()
            }
        },
        methods:{
            purchase(){
                this.$router.push('/page1')
            },
            removeItem(id){
                let changed=[]
                for(var i=0;i<this.deals.length;i++){
                    if(i!=id){
                        changed.push(this.deals[i])
                    }
                    if(i==id){
                        this.total-=this.deals[i].price
                    }
                }
                this.deals=changed
                localStorage.setItem('cart',JSON.stringify(this.deals))
                this.$forceUpdate
            },
            loadItems(){
                this.cartItems=JSON.parse(localStorage.getItem('cart'))
                this.cartItems.forEach(x => {
                    this.deals.push(x)
                    this.total+=Number(x.price)
                })
            }
        },
        updated:function(){
            this.totalRounded=Math.round((Number(this.total) + Number.EPSILON) * 100) / 100
        }
    }
</script>