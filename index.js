var VisualRecognitionV3 = require('ibm-watson/visual-recognition/v3');
const CustomRecorder = require('./utils/CustomRecorder')
const fs = require('fs')
const path = require('path')
const moment = require('moment')
require('dotenv').config();

//const image = path.join('/home/dev/busNotifyData','image-capture.jpg')
const image = path.join('/home/dev/busNotifyData','download.jpeg')
const SCHOOL_BUS = "school bus"

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
      const classes = result.images[0].classifiers[0].classes;
      console.log(classes)
      
    console.log(getClassWithMaxScore(classes));
    if(getClassWithMaxScore(classes) == SCHOOL_BUS){
      console.log("School bus is here!")
    }
    })
    .catch(err => {
      console.log(err);
    });
}

const getClassWithMaxScore = function(classes){
  let max = 0;
  let maxIndex = 0;

  for(const clazz of classes){
    if(clazz.score > max){
      max = clazz.score;
    }
  }
  return classes.filter(c => c.score === max)[0].class;
}

//capture();

setInterval(() => {
    capture();
}, 5000);
