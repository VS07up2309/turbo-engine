const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
var config = require('./config.json');
var getYoutubeTitle = require('get-youtube-title');
app.use(cors());

const dlformat = config.format;
const format = dlformat + "";

app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});
app.get('/download', (req,res) => {
    var URL = req.query.URL; 
    const id = ytdl.getVideoID(URL);
        getYoutubeTitle(id, function (err, title) {
            res.header('Content-Disposition', `attachment; filename= "${title}.${format}"`);
            ytdl(URL, {
                format: `${format}`
                }).pipe(res);
            title; // 'SLCHLD - EMOTIONS (feat. RIPELY) (prod. by GILLA)'
      });  
});
