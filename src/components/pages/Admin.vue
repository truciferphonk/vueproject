<template>
    <div>
        <div class="container">
            <b-modal id="modal-1" title="Edit Deal">    
                <div class="form-group">
                    <label for="title">Title</label>
                    <input v-model="title"  id="title" class="form-control" type="text">
                </div>
                <div class="form-group">
                    <label for="iname">Internal Name</label>
                    <input v-model="internalName"  id="iname" class="form-control" type="text">
                </div>
                <div class="form-group">
                    <label for="email">Game ID</label>
                    <input v-model="gameID"  id="email" class="form-control" type="text">
                </div>
                <div class="form-group">
                    <label for="onsale">On Sale</label>
                    <input v-model="isOnSale"  id="onsale" class="form-control" type="text">
                </div>
                <div class="form-group">
                    <label for="price">Price</label>
                    <input v-model="normalPrice"  id="price" class="form-control" type="text">
                </div>
                <div class="form-group">
                    <label for="saleprice">Sale Price</label>
                    <input v-model="salePrice"  id="saleprice" class="form-control" type="text">
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" @click="performUpdate(toEdit.dealID)">Update</button>
                </div>
            </b-modal>
            <b-modal id="modal-2" title="Add Deal">
                <div class="row">
                    <div class="col-6">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input v-model="addtitle"  id="title" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="dealID">Deal ID</label>
                            <input v-model="adddealID"  id="dealID" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="iname">Internal Name</label>
                            <input v-model="addinternalName"  id="iname" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="email">Game ID</label>
                            <input v-model="addgameID"  id="email" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="onsale">On Sale</label>
                            <input v-model="addisOnSale"  id="onsale" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="price">Price</label>
                            <input v-model="addnormalPrice"  id="price" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="saleprice">Sale Price</label>
                            <input v-model="addsalePrice"  id="saleprice" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <button class="btn btn-primary" @click="performInsert()">Insert</button>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="card h-100">
                            <img class="card-img-top" height="200" :src="this.deals[0].thumb" alt="..." />
                            <div class="px-2 responsive-font-example card-text text-center">{{addtitle}}</div>
                            <div class="card-body p-4">
                                <div class="text-center">
                                    <h6 class="fw-bolder">Original Price</h6>
                                        <span>${{ addnormalPrice}}</span>
                                    <hr/>
                                    <div>
                                        <h5 class="fw-bolder text-danger">Sale Price</h5>
                                        <span class="text-danger">${{ addsalePrice }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="card-footer text-center">
                                LIVE PREVIEW
                            </div>
                        </div>
                    </div>
                </div>
            </b-modal>
            <div class="row justify-content-center">
                <div class="col-md-6 text-center mb-5">
                    <h2 class="heading-section">Admin Panel</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="table-wrap">
                        <table class="table table-striped table-responsive-xl">
                            <thead>
                                <tr>
                                    <th>Picture</th>
                                    <th>Game ID</th>
                                    <th>Deal ID</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Sale Price</th>
                                    <th>On Sale</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="d,index in deals" :key="index" class="alert" role="alert">
                                    <td class="d-flex align-items-center">
                                        <img height="100" class="img me-3" :src="d.thumb"/>
                                    </td>
                                    <td>
                                        {{ d.gameID }}
                                    </td>
                                    <td>
                                        {{ d.dealID }}
                                    </td>
                                    <td>{{d.title}}</td>
                                    <td>${{d.normalPrice}}</td>
                                    <td>{{d.salePrice?'$'+d.salePrice:"N/A"}}</td>
                                    <td class="status"><span class="active">{{d.isOnSale?'Yes':"No"}}</span></td>
                                    <td>
                                        <b-button v-b-modal.modal-1 class="btn btn-warning" @click="editDeal(d.dealID)">UPD</b-button>
                                        <button @click="deleteDeal(d.dealID)" type="button" class="btn btn-danger text-light" data-dismiss="alert" aria-label="Close">
                                            DEL
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <b-button v-b-modal.modal-2 class="btn btn-warning">Add a new deal</b-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "AdminPanel",
        data(){
            return{
                deals: this.$store.state.deals,
                toEdit:{},
                title:"",
                internalName:"",
                normalPrice:"",
                salePrice:"",
                gameID:"",
                addtitle:"",
                isOnSale:0,
                addinternalName:"",
                addnormalPrice:"",
                addsalePrice:"",
                addgameID:"",
                adddealID:"",
                addisOnSale:0
            }
        },
        methods:{
            closeModal() {
                let modalElement = document.getElementById('exampleModal');
                modalElement.classList.remove('show');
                modalElement.style.display = 'none';
                document.body.classList.remove('modal-open');
            },
            deleteDeal(dealID){
                console.log(dealID)
                let deleted=[];
                let dils=this.$store.state.deals
                dils.forEach(d=>{
                    if(d.dealID!=dealID){
                        deleted.push(d)
                    }
                })
                this.$store.state.deals=deleted
                this.deals=deleted
                console.log(deleted)
                this.$forceUpdate
            },
            editDeal(id){
                console.log(id)
                let dils=this.$store.state.deals
                let that=this
                dils.forEach(x=>{
                    if(x.dealID==id){
                        that.toEdit=x
                    }
                })
                this.title=this.toEdit.title
                this.internalName=this.toEdit.internalName
                this.isOnSale=this.toEdit.isOnSale
                this.normalPrice=this.toEdit.normalPrice
                this.salePrice=this.toEdit.salePrice
                this.gameID=this.toEdit.gameID
            },
            performUpdate(dealID){
                let dils=this.$store.state.deals
                let that=this
                dils.forEach(x=>{
                    if(x.dealID==dealID){
                        x.title=that.title
                        x.internalName=that.internalName
                        x.isOnSale=that.isOnSale
                        x.normalPrice=that.normalPrice
                        x.salePrice=that.isOnSale!=0?this.salePrice:this.normalPrice
                        x.gameID=that.gameID
                    }
                })
                let updated=dils
                this.$store.state.deals=updated
                this.deals=updated
            },
            performInsert(){
                let x={};
                let added=[]
                this.$store.state.deals.forEach(x=>{
                    added.push(x)
                })
                let that=this
                x.title=that.addtitle
                x.internalName=that.addinternalName
                x.isOnSale=that.addisOnSale
                x.normalPrice=that.addnormalPrice
                x.salePrice=that.addisOnSale!=0?this.addsalePrice:this.addnormalPrice
                x.gameID=that.addgameID
                x.dealID=that.adddealID
                x.metacriticLink= "/game/pc/added-game-1",
                x.storeID="3",
                x.savings="39.020000",
                x.metacriticScore="64",
                x.steamRatingText="Mostly Positive",
                x.steamRatingPercent="624358",
                x.steamRatingCount="sd3wue",
                x.steamAppID="s;kjdoishd",
                x.releaseDate=1502150400,
                x.lastChange=1693557414,
                x.dealRating='8.6',
                x.thumb=this.$store.state.deals[0].thumb
                added.push(x)
                this.deals=added
                this.$store.state.deals=added
            }
        },
        updated(){
            this.deals=this.$store.state.deals
        }
    }
</script>