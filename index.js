var VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const CustomRecorder = require('./utils/CustomRecorder')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
require('dotenv').config();

const image = path.join('/home/dev/busNotifyData','image-capture.jpg')

var rec = new CustomRecorder({
    url: 'rtsp://root:azr26p@192.168.1.29:554/stream1',
    type: 'image',
    name: 'image-capture',
    folder: `/home/dev/busNotifyData`,
})


var visualRecognition = new VisualRecognitionV3({
  version: process.env.VERSION,
  iam_apikey: process.env.IAM_APIKEY,
  url: process.env.URL,
});

const capture = function(){
  rec.captureImage(()=>{
    isBusDetected()
  });
}

var isBusDetected = function(){
  var params = {
    images_file: fs.createReadStream(`${image}`)
  };

  visualRecognition.classify(params)
    .then(result => {
      console.log(JSON.stringify(result, null, 2));
    })
    .catch(err => {
      console.log(err);
    });
}

setInterval(() => {
    capture();
}, 1000);
