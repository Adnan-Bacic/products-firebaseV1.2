<template>
    <div class="container mt-3">
        <div class="row">
            <div class="col-12">
                <h1>Create a new product</h1>
                <form v-on:submit.prevent="AddNewProduct">
                    <div class="form-group">
                        <label for="name" class="d-block">Name</label>
                        <input type="text" class="form-control" name="name" v-model="name">
                    </div>
                    <!--
                    <div class="form-group">
                        <label for="imgsrc" class="d-block">Image source</label>
                        <input type="text" class="form-control" name="imgsrc" v-model="imgsrc">
                    </div>
                    -->

                    <div class="form-group">
                        <img :src="this.imgURL">
                        <br>
                        <progress max="100" :value="value" id="uploader">0%</progress>
                        <br>
                        <input @change.prevent="uploadImage()" type="file" value="upload" id="fileButton" ref="myFiles">
                        <br>
                        <!--must be type button, since default inside a form is submit-->
                        <input class="btn btn-danger" type="button" v-on:click.prevent="deleteImage()" value="Delete">

                        <p id="imageDeletedResponse" class="text-success font-weight-bolder d-none">Image deleted</p>
                        
                    </div>
                    <div class="form-group">
                        <label for="price" class="d-block">Price</label>
                        <input type="number" class="form-control" name="price" v-model="price">
                    </div>
                    <div class="form-group">
                        <label for="available">Available</label>
                        <input type="checkbox" name="available" v-model="available">
                    </div>
                    <!--adding new input after tab press-->
                    <div v-for="(tag, index) in tags" v-bind:key="index" class="field">
                        <label for="tag">Added tag:</label>
                        <input name="tag" class="form-control" type="text" v-model="tags[index]">
                        <button class="btn btn-warning mt-1 mb-3" v-on:click="DeleteTag(tag)">Delete tag</button>
                    </div>
                    <div class="field edit-ingredient">
                        <label for="ingredient">Add a tag - press tab to add more tags</label>
                        <input type="text" class="form-control" name="edit-ingredient" @keydown.tab.prevent="AddTag()" v-model="anotherTag">
                        <p class="text-danger font-weight-bolder" v-if="emptyTagResponse">{{ emptyTagResponse }}</p>
                    </div>
                    <button class="btn btn-success btn-lg btn-block mt-3 mb-3">Create</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'CreateProduct',

    data(){
        return{
            //product data
            name: null,
            //imgsrc: null,
            price: null,
            available: false, //default vaue to false. or else the db type is null an the output is empty is null
            tags: [],
            anotherTag: null,
            emptyTagResponse: null,

            //file upload
            value: 0,
            fileButton: document.querySelector("#fileButton"),
            file: [],
            imgURL: null,
            imgRef: null,
        }
    },

    methods:{
        uploadImage() {
            //Get file
            this.file = this.$refs.myFiles.files[0]
            console.log(this.file)
            //Create a storage ref
            let storageRef = db.storage().ref('photos/' + this.file.name + '-' + Date.now());
            //Save the image reference, if we want to delete the picture
            this.imgREF = storageRef.fullPath;
            //upload file
            let task = storageRef.put(this.file);
            task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes)
            * 100;
            this.value = percentage;
            if(percentage == 100){
                snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('downloadurl: ' + this.downloadURL)
                //Save the image URL, if we want to view the image on the page
                this.imgURL = downloadURL;
                let split = this.imgURL.split('photos%2F');

                this.imgURLresIMG = split[0] + 'photos%2F' + 'resIMG-' + split[1];
                console.log('split: ' + this.split);

                console.log('imgurl: ' + this.imgURL)
                console.log('downloadurl: ' + this.downloadURL)
                console.log('imgref: ' + this.imgREF)
                console.log('storageRef: ' + this.storageRef)
                });
            }
            })
            },
            deleteImage(){
                //only works if there is content
                    // Get the storage in Firebase
                    var storage = db.storage();
                    // Create a storage reference from our storage service
                    var storageRef = storage.ref();
                    var desertRef = storageRef.child(this.imgREF);
                    desertRef.delete().then(function() {
                    console.log("Image deleted");
                    imageDeletedResponse.classList.remove('d-none');
                    }).catch(function(error) {
                    console.log(error);
                    });
            },
        
        
        AddNewProduct(){
            db.firestore().collection("products").add({
                //add into the db
                name: this.name,
                //imgsrc: this.imgsrc,
                price: Number(this.price),
                available: this.available,
                tags: this.tags,

                //upload img
                imgREF: this.imgREF,
                imgURL: this.imgURL,
                
                imgURLresIMG: this.imgURLresIMG,
            })
            .then(()=>{
                //console.log(this.tags)
                this.$router.push({name: 'Index'})
            }).catch(err => {
                console.log(err)
            })
        },
        AddTag(){
            if(this.anotherTag){
                //push the value of the input into the array, on tab press
                this.tags.push(this.anotherTag)
                console.log(this.tags)
                this.anotherTag = null,
                this.emptyTagResponse = null
                } else {
                    this.emptyTagResponse = 'Enter a tag before creating a new tag.'
                }
            },
        DeleteTag(tag){
            this.tags = this.tags.filter(ingToRemove => {
                //if returns true then it stays, if false it gets removed
                return ingToRemove != tag
            })
        },
    }
}
</script>

<style scoped>
    img{
        width: 200px;
    }
</style>