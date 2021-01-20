<template>
    <div class="container mt-3">
      <!--
        <h1>Products</h1>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <ul class="list-group" v-for="product in arrayProducts" v-bind:key="product.id">
                      <li class="list-group-item">{{ product.id }}</li>
                      <li class="list-group-item">{{ product.name }}</li>
                      <li class="list-group-item">
                          //coment stat router link to specific page //comment end
                          <router-link :to=" { name: 'Product', params:{ product_id: product.id } }">
                              <img :src="product.imgsrc" height="200px" width="200px">
                          </router-link>
                      </li>
                      <li class="list-group-item">{{ product.price }}</li>
                      <li class="list-group-item">{{ product.available }}</li>
                      
                      //comment start Array in array //comment end
                      <li class="list-group-item" v-for="(tag, index) in product.tags" v-bind:key="index">
                          {{ tag }}
                      </li>
                    </ul>
                </div>
            </div>
        </div>
        <hr>
        -->
        <!--
        <h1>Firebase products - img src</h1>
          <div class="row">
            <div class="col-6 mb-3" v-for="product in arrayProductsFB" v-bind:key="product.id">
                <ul class="list-group">
                      <li class="list-group-item">ID: {{ product.id }}</li>
                      <li class="list-group-item">Name: {{ product.name }}</li>
                      <li class="list-group-item">
                        <img :src="product.imgsrc" height="200px" width="200px">
                      </li>
                      <li class="list-group-item">Price: {{ product.price }}</li>
                      <! if else to show if item is in stock or not //error
                      <li class="list-group-item" v-if="product.available">Item is in stock</li>
                      <li class="list-group-item" v-else>Item is NOT in stock</li>
                      
                      <! Array in array //error
                      <div class="list-group-item">
                        <p>Tags:</p>
                        <p class="" v-for="(tag, index) in product.tags" v-bind:key="index">
                            {{ tag }}.
                        </p>
                      </div>
                    </ul>
                    <! router link to specific page //error
                    <router-link :to=" { name: 'Product', params:{ product_id: product.id } }">
                      <button class="btn btn-primary btn-lg btn-block">Edit or delete this item</button>
                    </router-link>
          </div>
        </div>
        <hr>
        -->
        <h1>Firebase products</h1>
          <div class="row" id="row">
            <div class="col-6 mb-3" v-for="product in arrayProductsFBUpload" v-bind:key="product.id">
                <ul class="list-group">
                      <li class="list-group-item">ID: {{ product.id }}</li>
                      <li class="list-group-item">Name: {{ product.name }}</li>
                      <!--url-->
                      <li class="list-group-item">
                        <img :src="product.imgURLresIMG">
                      </li>
                      <!--
                      <li class="list-group-item">
                        <img :src="product.imgREF">
                      </li>
                      -->
                      <li class="list-group-item">Price: {{ product.price }}</li>
                      <!--if else to show if item is in stock or not-->
                      <li class="list-group-item" v-if="product.available">Item is in stock</li>
                      <li class="list-group-item" v-else>Item is NOT in stock</li>
                      
                      <!--Array in array-->
                      <div class="list-group-item">
                        <p>Tags:</p>
                        <p class="" v-for="(tag, index) in product.tags" v-bind:key="index">
                            {{ tag }}.
                        </p>
                      </div>
                    </ul>
                    <!--router link to specific page-->
                    <router-link :to=" { name: 'Product', params:{ product_id: product.id } }">
                      <button class="btn btn-primary btn-lg btn-block">Edit or delete this item</button>
                    </router-link>
          </div>
        </div>
        <div class="chat-window border border-seondary p-3">
          <p>Join our live chat if you need help</p>
          <form @submit.prevent="enterChat()">
            <div class="form-group">
              <label for="name">Enter your name</label>
              <input type="text" class="form-control" name="name" v-model="chatname">
            </div>
          
          <p class="text-danger" v-if="feedback">{{ feedback }}</p>
          <button class="btn btn-success">Enter</button>
        </form>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'Products',

    data(){
        return{
          /*
            arrayProducts:[
                {
                  id: '1',
                  name: 'Koala',
                  imgsrc: 'http://adnanbacic.dk/folders/files/vue-firebase-products/images/img1.jpg',
                  price: 111,
                  available: true,
                  tags: ['Animal', 'Koala']
                },
                {
                  id: '2',
                  name: 'Panda',
                  imgsrc: 'http://adnanbacic.dk/folders/files/vue-firebase-products/images/img2.jpg',
                  price: 222,
                  available: true,
                  tags: ['Animal', 'Panda']
                },
                {
                  id: '3',
                  name: 'Cheetah',
                  imgsrc: 'https://adnanbacic.dk/folders/files/vue-firebase-products/images/img3.jpg',
                  price: 333,
                  available: true,
                  tags: ['Animal', 'Cheetah']
                },
                {
                  id: '4',
                  name: 'Toucan',
                  imgsrc: 'https://adnanbacic.dk/folders/files/vue-firebase-products/images/img4.jpg',
                  price: 444,
                  available: true,
                  tags: ['Animal', 'Toucan']
                },
                {
                  id: '5',
                  name: 'Zebra',
                  imgsrc: 'https://adnanbacic.dk/folders/files/vue-firebase-products/images/img5.jpg',
                  price: 555,
                  available: true,
                  tags: ['Animal', 'Zebra']
                },
            ],
            */

            arrayProductsFB:[],
            arrayProductsFBUpload:[],

            chatname: null,
            feedback: null

            
        }
    },
    methods:{
      enterChat(){
      //checks if the input is filled out
      if(this.chatname){
        //redirct to chat page and send the name as a prop
        this.$router.push({ name: 'Chat', params:{ nameProp: this.chatname } });
      } else {
        this.feedback = 'You must enter a name';
      }
    }
    },

    created(){
      //https://stackoverflow.com/questions/50213901/reload-page-in-vue-just-once-in-mounted
      //didnt work in mounted(). works in created.
      //after we submit an item and go to the index page we cant ee the image. this is to reaload the page see the image
      if (localStorage.getItem('reloaded')) {
        // The page was just reloaded. Clear the value from local storage
        // so that it will reload the next time this page is visited.
        localStorage.removeItem('reloaded');
    } else {
        // Set a flag so that we know not to reload the page twice.
        localStorage.setItem('reloaded', '1');
        location.reload();
    }

    //fetch data from firestore
    db.firestore().collection('products').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        //console.log(doc.data(), doc.id)
        let product = doc.data()
        product.id = doc.id
        this.arrayProductsFB.push(product)
      })
    })

    //upload image
    db.firestore().collection('products').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        //console.log(doc.data(), doc.id)
        let product = doc.data()
        product.id = doc.id
        this.arrayProductsFBUpload.push(product)
        console.log(product.imgURL)
      })
    })
  }

}

</script>

<style scoped>
 .list-group-item p {
   display: inline;
 }

 #row{
   width: 80%;
 }
 .chat-window{
   position: fixed;
   bottom: 20px;
   right: 20px;
 }
</style>