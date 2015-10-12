(function() {
    var nodeGraph = function nodeGraph() {
        this.svg = null;
        this.force = null;
    };

    nodeGraph.prototype.initializeGraph = function initializeGraph() {
        var width = 780,
            height = 680;

        this.svg = d3.select('.forcelayout_zone').append('svg')
            .attr('width', width)
            .attr('height', height);
        this.force = d3.layout.force()
            .gravity(.05)
            .distance(100)
            .charge(-100)
            .size([width, height]);

    }

    nodeGraph.prototype.expandGraph = function expandGraph(graphData) {
        this.force
            .nodes(graphData.nodes)
            .links(graphData.links)
            .start();
        var link = this.svg.selectAll('.link');
        link = link.data(graphData.links);
        link.exit().remove();
        link.enter().append('line')
            .attr('class', 'link')

        var node = this.svg.selectAll('.node');
        node = node.data(graphData.nodes);
        node.exit().remove();
        node.enter().append('circle')
            .attr('class', 'circle')
            .attr('r', 5)
            .style('fill', 'blue')
            .call(this.force.drag);

        this.force.on("tick", function() {
            if(link[0].length > 0) {
                link.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });
                }

            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        });
    }



    window.visualizationAPI = window.visualizationAPI || {};
    window.visualizationAPI.nodeGraph = nodeGraph;
})();
