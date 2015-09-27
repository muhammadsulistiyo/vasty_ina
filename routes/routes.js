var fs = require('fs');
//var uri_helper = require('../helper/uri_helper');
 
 
module.exports = function(app) { 
    app.get('/',function(req,res){
        res.end("Node-File-Upload");
    });
    app.post('/upload', function(req, res) {
        console.log(req.files);
        // fs.readFile(req.files['image'][0].path, function (err, data){
        //     var newPath = "../asset/file_uploads/" +   req.files.image.originalFilename;
        //     fs.writeFile(newPath, data, function (err) {
        //         if(err){
        //             res.json({
        //                 // uri_helper.type : uri_helper.response_upload,
        //                 // uri_helper.status : uri_helper.success
        //                 "type" : "response_upload",
        //                 "status" : "success"
        //             });
        //         }else {
        //             res.json({
        //                 // uri_helper.type : uri_helper.response_upload,
        //                 // uri_helper.status : uri_helper.failed
        //                 "type" : "response_upload",
        //                 "status" : "failed"
        //             });
        //         }
        //     });
        // });
    });
};