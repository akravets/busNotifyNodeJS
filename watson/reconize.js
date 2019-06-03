const fs = require('fs');
const VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var path = require('path');
var appDir = path.dirname(require.main.filename);

const visualRecognition = new VisualRecognitionV3({
  version: '2019-06-02',
  iam_apikey: 'boq2YX17ybFUXBkzD9O3n13yv31BHlJKcq418cuWJAhh',
});

module.exports = visualRecognition;