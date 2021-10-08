var {google} = require('googleapis'),
    youtubeV3 = google.youtube( { version: 'v3', auth: 'AIzaSyBC5oDpmgsuh5VKrn2cbzMoVHf5o0FCxFc' } );

    var request =  youtubeV3.search.list({
        part: 'snippet',
        type: 'video',
        q: 'Letica ze vaqueiro',
        maxResults: 5,
        order: 'relevance',
        safeSearch: 'none',
        videoEmbeddable: true
    }, (err,response) => {
    
        var item = response.data.items;
    
        for(var i in item) {
    
            console.log("link para o video: https://www.youtube.com/watch?v="+ item[i].id.videoId);
        }
    });
