/*jslint node: true */
'use strict';

(function() {
    var nodeGraph = function nodeGraph() {
        this.svg = null;
        this.force = null;
        this.graph = null;
        this.nodeMap = {};
        this.linkMap = {};
        this.graphData = {};
    };

    /**
    * Function instantiates d3.force and establishes initial parameters.
    */
    nodeGraph.prototype.initializeGraph = function initializeGraph() {
        var width = 780,
            height = 680;

        this.graphData.nodes = [];
        this.graphData.links = [];

        this.svg = d3.select('.forcelayout_zone').append('svg')
            .attr('width', width)
            .attr('height', height);

        this.graph = this.svg.append('g');

        // initialize force layout, bind to force nodes and links to graph data nodes and links.
        this.force = d3.layout.force()
            .gravity(0.05)
            .distance(100)
            .charge(-100)
            .size([width, height])
            .nodes(this.graphData.nodes)
            .links(this.graphData.links)
            .start();

    };

    nodeGraph.prototype.expandGraph = function expandGraph(formData) {
        this._buildGraphData(formData);
        this._drawNodesLinks();


    };

    /**
    * Function generates a unique id
    * @return {String}
    */
    nodeGraph.prototype._generateUUID = function _generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };

    nodeGraph.prototype._drawNodesLinks = function _drawNodesLinks() {
        var link = this.graph.selectAll('.link');
        link = link.data(this.force.links());
        link.exit().remove();
        link.enter().append('line')
            .attr('class', 'link');

        var node = this.graph.selectAll('.node');
        node = node.data(this.force.nodes());
        node.exit().remove();
        node.enter().append('g')
            .attr('class', 'node')
            .call(this.force.drag);

        node.append('circle')
            .attr('class', function(d) { return d.type; })
            .attr('r', 5);

        node.append('text')
            .attr('class', 'node_title')
            .attr('dx', 12)
            .attr('dy', '.35em')
            .text(function(d) { return d.title; });


        this.force.on('tick', function() {
            node.attr('transform', function(d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            });
            if(link[0].length > 0) {
                link.attr('x1', function(d) { return d.source.x; })
                    .attr('y1', function(d) { return d.source.y; })
                    .attr('x2', function(d) { return d.target.x; })
                    .attr('y2', function(d) { return d.target.y; });
                }

        });
        this.force.start();
    };

    nodeGraph.prototype._buildGraphData = function _buildGraphData(formData) {
        var source,
            sourceId,
            target,
            targetId;

        var createLink = function(source, target) {
            this.graphData.links.push(
                {
                    id : this._generateUUID,
                    source : source,
                    target : target
                }
            );
        }.bind(this);

        formData.forEach(function(entity) {
            if(this.nodeMap.hasOwnProperty(entity.source.title) === true) {
                sourceId = this.nodeMap[entity.source.title].id;
                source = this.nodeMap[entity.source.title];
            } else {
                sourceId = this._generateUUID();
                source = {
                    id : sourceId,
                    title : entity.source.title,
                    color : entity.source.color,
                    type : 'source'
                };
                this.nodeMap[entity.source.title] = source;
                this.graphData.nodes.push(source);
            }

            if(this.nodeMap.hasOwnProperty(entity.target.title) === true) {
                targetId = this.nodeMap[entity.target.title].id;
                target = this.nodeMap[entity.target.title];
            } else {
                targetId = this._generateUUID();
                target = {
                    id : targetId,
                    title : entity.target.title,
                    color : entity.target.color,
                    type : 'target'
                };
                this.nodeMap[entity.target.title] = target;
                this.graphData.nodes.push(target);
            }

            if(this.linkMap.hasOwnProperty(sourceId)) {
                var linkExists = false;
                this.linkMap[sourceId].forEach(function(linkId) {
                    if(linkId === targetId) {
                        linkExists = true;
                    }
                });
                if(linkExists === false) {
                    this.linkMap[sourceId].push(targetId);
                    createLink(source, target);
                }
            } else {
                this.linkMap[sourceId] = [];
                this.linkMap[sourceId].push(targetId);
                createLink(source, target);
            }
        }.bind(this));
    };
    window.visualizationAPI = window.visualizationAPI || {};
    window.visualizationAPI.nodeGraph = nodeGraph;
})();
