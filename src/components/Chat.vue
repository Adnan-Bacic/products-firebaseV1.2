<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h1>Welcome to the chat {{ this.nameProp }}</h1>
                <ul class="list-group" id="message-container" v-chat-scroll>
                    <li class="list-group-item" v-for="message in arrayMessages" v-bind:key="message.id">
                        <span class="text-primary font-weight-bold" v-if="message.name !='admin'">{{ message.name }}:</span>
                        <span class="text-success font-weight-bold" v-else>{{ message.name }}:</span>
                        <span class="text-dark">{{ message.content }}</span><br>
                        <span class="text-secondary">{{ message.timestamp }}</span>
                    </li>
                </ul>
                <!--
                    no way to delete all
                <div v-if="arrayMessages">
                    <div class="mt-3">
                        <form v-on:submit.prevent="clearChat()">
                            <button class="btn btn-danger">Clear chat</button>
                        </form>
                    </div>
                </div>
                -->
                <hr>
                <div>
                    <NewMessage v-bind:nameProp="nameProp"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NewMessage from '@/components/NewMessage'
import db from '@/firebase/init.js'
//import moment from 'moment'

export default {
    name: 'Chat',

    props: ['nameProp'],

    components:{
        NewMessage: NewMessage,
    },

    data(){
        return{
            //array for messages when we get the messages
            arrayMessages: [],
        }
    },

    methods:{
        clearChat(){
                db.firestore().collection('messages').doc().delete()
                .then(() => {
                //this.$router.push({ name: 'Index' })
                })
                .catch(err => {
                    console.log(err)
                })
            },
    },

    created(){
        let ref = db.firestore().collection('messages').orderBy('unixtime', 'asc')
        
        //listens for changes
        ref.onSnapshot(snapshot => {
            //console.log(snapshot.docChanges())
            snapshot.docChanges().forEach(change => {
                //if type === added, then we do something(seen in console that type is added)
                if(change.type === 'added'){
                    //doc is each individual document(document is in the firebase db)
                    let doc = change.doc
                    //push the message data
                    this.arrayMessages.push({
                        //message data
                        id: doc.id,
                        name: doc.data().name,
                        content: doc.data().content,
                        timestamp: doc.data().timestamp
                    })
                }
            })
        })
    }
}
</script>

<style scoped>
    #message-container{
        max-height: 300px;
        overflow: auto;
    }
</style>