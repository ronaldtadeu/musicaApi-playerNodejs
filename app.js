const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/api', (req, res) => {

  var {google} = require('googleapis'),
      youtubeV3 = google.youtube( { version: 'v3', auth: 'AIzaSyBC5oDpmgsuh5VKrn2cbzMoVHf5o0FCxFc' } );

    var request =  youtubeV3.search.list({
      part: 'snippet',
      type: 'video',
      q: req.body.musica,
      maxResults: 5,
      order: 'relevance',
      safeSearch: 'none',
      videoEmbeddable: true
  }, (err,response) => {
    var item = response.data.items;

    var idVideo = [];
    var urlVideo = [];
    var TituloVideo = [];
    var DescVideo = [];
    var ThumbVideo = [];

    for(var i in item) {

      idVideo.push(item[i].id.videoId);
      urlVideo.push("https://www.youtube.com/embed/"+ item[i].id.videoId);
      TituloVideo.push(item[i].snippet.title);
      DescVideo.push(item[i].snippet.description);
      ThumbVideo.push(item[i].snippet.thumbnails.default.url);
      console.log(item[i].snippet);

    }
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ id: idVideo, url: urlVideo, titulo: TituloVideo, descricao: DescVideo, thumb: ThumbVideo }));
    });
});

router.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');