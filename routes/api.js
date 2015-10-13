/*jslint node: true */
'use strict';

var express = require('express');
var router = express.Router();

router.post('/buildGraphData', function(req, res) {
    function generateUUID(){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    var graphData = {},
        incomingData = req.body,
        nodeIdMap = {};

    graphData.nodes = [];
    graphData.links = [];

    incomingData.forEach(function(entity) {
        var sourceId,
            targetId;
        if(nodeIdMap.hasOwnProperty(entity.name) === true) {
            sourceId = nodeIdMap[entity.name];
        } else {
            sourceId = generateUUID();
            nodeIdMap[entity.name] = sourceId;
            graphData.nodes.push(
                {
                    id : sourceId,
                    title : entity.name,
                    type : 'name'
                }
            );
        }

        if(nodeIdMap.hasOwnProperty(entity.state) === true) {
            targetId = nodeIdMap[entity.state];
        } else {
            targetId = generateUUID();
            nodeIdMap[entity.state] = targetId;
            graphData.nodes.push(
                {
                    id : targetId,
                    title : entity.state,
                    type : 'state'
                }
            );
        }

        graphData.links.push(
            {
                source : sourceId,
                target : targetId
            }
        );
    });


    res.json(graphData);
});
module.exports = router;
