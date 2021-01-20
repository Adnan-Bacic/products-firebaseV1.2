const functions = require('firebase-functions');
const os = require('os');
const path = require('path');
const {Storage} = require('@google-cloud/storage');

let gcs = new Storage();

const spawn = require('child-process-promise').spawn;

exports.onFileChange = functions.storage.object().onFinalize(event => {
    console.log(event);
    const bucket = event.bucket
    const contentType = event.contentType;
    const filePath = event.name;
    console.log('file detected ' + filePath)

if(path.basename(filePath).startsWith('resIMG-')){
    console.log('already resized this file ' + filePath)
    return;
}

const destBucket = gcs.bucket(bucket);
const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
const metadata = {contentType : contentType }
return destBucket.file(filePath).download({

destination : tmpFilePath
}).then(() => {
return spawn('convert', [tmpFilePath, '-resize', '500x500', tmpFilePath])

})
/*
.then(()=>{
return destBucket.upload(tmpFilePath, {

destination: 'photos/resized@500x500-' + path.basename(filePath),

metadata: metadata })

})
*/
.then(() => {
return spawn('convert', [tmpFilePath, '-resize', '200x200', tmpFilePath]) })
.then(()=>{

return destBucket.upload(tmpFilePath, {
destination: 'photos/resIMG-' + path.basename(filePath),
metadata: metadata

})
})

});

/*
const functions = require("firebase-functions");
const gcs = require("@google-cloud/storage");
const os = require("os");
const path = require("path");
const spawn = require("child-process-promise");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.onFileChange = functions.storage.object().onFinalize(event => {
    //get image data
    const object = event.data;
    const bucket = object.bucket;
    const contentType = object.contentType;
    const filePath = object.name;
    console.log('file changed detected');

    //check if file deleted
    if(object.resourceState === 'not_exists'){
        console.log('file deleted');
        return;
    }

    //if to avoid infinate loop by making sure the filename doesnt start with our defined prefix
    if(path.basename(filePath).startsWith('resized_')){
        console.log('file already renamed');
        return;
    }

    //put data into a bucket
    const destBucket = gcs.bucket(bucket);
    //bucket to take the file and put it back with another name
    const tempFilePath = path.join(os.tmpdir(), path.basename(filePath));
    //keep contenttype
    const metaData = { contentType: contentType };

    //console.log(event)
    //download the file
    return destBucket.file(filePath).download({
        //where to download, from the bucket
        destination: tempFilePath
    }).then(() => {
        return spawn('convert', [tempFilePath, '-resize', '500x500', tempFilePath])
        //rename file. upload it
        .then(() => {
            return destBucket.upload(tempFilePath, {
                //string name prefix + filename
                destination: 'resized_ ' + path.basename(filePath),
                metaData: metaData,
            })
        })
    });
});
*/