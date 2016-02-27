var express = require('express');

var routes = function(ScanItem) {
    //make router
    var scanItemRouter = express.Router();
    
    //handle POST and GET routes
    scanItemRouter.route('/')
    
        .post(function(req, res) {
            var scanItem = new ScanItem(req.body);
            scanItem.save();
            res.status(201).send(scanItem);
        })
        
        .get(function(req, res){
            var query = {};

            if (req.query.author) {
                query.author = req.query.author;
            }
            ScanItem.find(query, function(err, items){
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(items);
               }
            });
        });

    //handle GET/:id route
    scanItemRouter.route('/:itemId')
        .get(function(req, res) {
            ScanItem.findById(req.params.itemId, function(err, book){
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(book);
                }
            });
        });
    
    return scanItemRouter;
};

module.exports = routes;