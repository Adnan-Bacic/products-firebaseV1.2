<template>
    <div class="new-message">
        <form v-on:submit.prevent="addMessage()">
            <div class="form-group">
                <label for="new-message">New message</label>
                <input class="form-control" type="text" name="new-message" v-model="newMessage">
            </div>
            <p class="text-danger" v-if="feedback">{{ feedback }}</p>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init.js'

export default {

    name: 'NewMessage',

    props: ['nameProp'],

    data(){
        return{
            newMessage: null,
            feedback: null,
        }
    },

    methods:{
        addMessage(){
            //show data
            //console.log(this.newMessage, this.nameProp, Date.now());

            
            //if there is content
            if(this.newMessage){
                db.firestore().collection('messages').add({
                    //inserting message info
                    name: this.nameProp,
                    content: this.newMessage,
                    timestamp: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate() + ' Time: ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds() + ':' + new Date().getMilliseconds(),
                    unixtime: new Date().getTime()
                }).catch(error => {
                    console.log(error);
                })
                this.newMessage = null,
                this.feedback = null
                //else no cotent, give feedback
            } else {
                this.feedback = 'You must enter a message in order to send one';
            }
        }
    }
}
</script>

<style scoped>

</style>