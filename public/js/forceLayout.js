/*jslint node: true */
'use strict';

(function() {
    var nodeGraph = function nodeGraph() {
        this.svg = null;
        this.force = null;
        this.graph = null;
        this.nodeMap = {};
    };

    nodeGraph.prototype.initializeGraph = function initializeGraph() {
        var width = 780,
            height = 680;

        this.svg = d3.select('.forcelayout_zone').append('svg')
            .attr('width', width)
            .attr('height', height);

        this.graph = this.svg.append('g');
        this.force = d3.layout.force()
            .gravity(0.05)
            .distance(100)
            .charge(-100)
            .size([width, height]);

    };

    nodeGraph.prototype.expandGraph = function expandGraph(jsonData) {
        var graphData = this.buildNodeMap(jsonData);

        this.force
            .nodes(graphData.nodes)
            .links(graphData.links);

        var link = this.graph.selectAll('.link');
        link = link.data(graphData.links);
        link.exit().remove();
        link.enter().append('line')
            .attr('class', 'link');

        var node = this.graph.selectAll('.node');
        node = node.data(graphData.nodes);
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

    nodeGraph.prototype.buildNodeMap = function buildNodeMap(jsonData) {
        jsonData.nodes.forEach(function(node) {
            if(!this.nodeMap.hasOwnProperty(node.id)) {
                this.nodeMap[node.id] = node;
            }
        }.bind(this)) ;

        jsonData.links.forEach(function(link) {
            var sourceId = link.source,
                targetId = link.target;
            link.source = this.nodeMap[sourceId];
            link.target = this.nodeMap[targetId];
         }.bind(this));
        return jsonData;
    };
    window.visualizationAPI = window.visualizationAPI || {};
    window.visualizationAPI.nodeGraph = nodeGraph;
})();
