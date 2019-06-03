const Recorder = require('node-rtsp-recorder').Recorder
const FileHandler = require('node-rtsp-recorder').FileHandler
const path = require('path')
const childProcess = require('child_process')

const fh = new FileHandler()

class CustomRecorder extends Recorder {
    constructor(config = {}) {
        super(config);
    }

    async captureImage(cb){
        this.writeStream = null
        const folderPath = this.folder
        fh.createDirIfNotExists(folderPath)
        const fileName = this.getFilename(folderPath)
        this.writeStream = this.getChildProcess(fileName)
        this.writeStream.once('exit', () => {
          if (cb) {
            cb()
          }
        })
    }

    getChildProcess(fileName) {
      var args = ['-y','-i', this.url]
      const mediaArgs = this.getArguments()
      mediaArgs.forEach((item) => {
        args.push(item)
      })
      args.push(fileName)
      return childProcess.spawn('ffmpeg',
        args,
        { detached: false, stdio: 'ignore' })
    }

    getFilename(folderPath) {
        return path.join(folderPath, this.name + this.getExtenstion())
    }
}


module.exports = CustomRecorder