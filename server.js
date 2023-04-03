const express = require('express')
const app = express()


const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')
const {Router} = require('express')
const router = Router()


const fs = require('fs')
const { google } = require('googleapis')

const GOOGLE_API_FOLDER_ID = '1tfJZleWaOcBsRa12hVoAxjiCWIwU1Yse'

const auth = new google.auth.GoogleAuth({
            keyFile: './googlekey.json',
            scopes: ['https://www.googleapis.com/auth/drive']
        })
const driveService = google.drive({ version: 'v3', auth })


async function listFile(){
  try {
    const res = await driveService.files.list({
      q: 'mimeType=\'image/jpeg\'',
      fields: 'nextPageToken, files(id, name, parents)',
      spaces: 'drive',
    });
    const array = res.data.files
    //only get files inside the desinated folder
    const arr = array.filter(item => item.parents.includes(GOOGLE_API_FOLDER_ID))
    console.log('Found '+ arr.length +' files in gdrive')
    
    arr.forEach(function(file,index) {
      console.log('Found file ',index+1 ,file);
    });
    
    return arr;

  } catch (err) {
    throw err;
  }
}



async function downloadFile2(realFileId,name){

  fileId = realFileId;
  var dest = fs.createWriteStream(`./imageStation/${name}.jpg`)
  try {
        driveService.files.get({
                fileId: fileId,
                alt: "media"
            }, { responseType: "stream" },
            (err, res) => {
                res.data
                    .on("end", () => {
                        console.log("Downloaded in backend");
                    })
                    .on("error", err => {
                        console.log("Error", err);
                    })
               .pipe(dest);
            }
        )
  
  } catch (err) {
    throw err;
  }
}
/*
mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('connected to MongoDB'))
*/

router.get('/', async (req,res)=>{
  downloadFile2('1lhS1BUELyDoxTRQGYO8xxP2DGB90hKAz','downloaded')
})


app.use(cors())
app.use(express.json())

app.use(router)

app.listen(3000, ()=>{
  console.log('server listening on port 3000')
})