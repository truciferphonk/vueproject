<template>
    <div>sss</div>
</template>
<script>
    import axios from 'axios'
    export default {
        name: "PageThree",
        data() {
            return {
                
            }
        },
        methods: {
            deleteAlbum(id) {
                this.error = ""
                this.success = ""
                var that = this
               
                axios.delete(this.$baseApiUrl + "/api/albums/" + id, {
                headers: {
                    Authorization: "Bearer " + this.token
                }
            })
                .then(function() {
                    that.success = "Uspešno brisanje."
                    that.loadAlbums()
                })
                .catch(function() {
                    that.error = "Došlo je do greške prilikom brisanja."
                })
            },
            loadAlbums() {
                var that = this

                axios.get(this.$baseApiUrl + "/api/albums", {
                    headers: {
                        Authorization: "Bearer " + this.token
                    }
                }).then(function(response) {
                    that.albums = response.data 
                })
            }
        }
    }
</script>