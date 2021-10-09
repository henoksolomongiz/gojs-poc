function DiagramController($scope) {
	$scope.enabled = false;
	$scope.init = function () {
		var $ = go.GraphObject.make;

		myDiagram =
			$(go.Diagram, "myDiagramDiv",
				{
					nodeTemplate:
						$(go.Node, "Auto",
							{ minSize: new go.Size(60, 20), resizable: true },
							new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(go.Size.stringify),
							new go.Binding("position", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
							new go.Binding("layerName", "isSelected", function (s) { return s ? "Foreground" : ""; }).ofObject(),
							$(go.Shape, "Rectangle",
								new go.Binding("fill", "color")),
							$(go.TextBlock,
								{ margin: 2 },
								new go.Binding("text", "color"))),
					"undoManager.isEnabled": true
				});


		var node1 =
			$(go.Node, "Auto",
				$(go.Shape,
					{
						figure: "RoundedRectangle",
						fill: "lightblue",  width: 200, height: 200 
					}),
				$(go.TextBlock,
					{
						text: "Box without node",
						margin: 5
					})
			)
		myDiagram.add(node1);

	 
	  
		myDiagram.groupTemplate =
		$(go.Group, "Vertical",
		  $(go.Panel, "Auto",
			$(go.Shape, "RoundedRectangle",  
			  { parameter1: 14,
				fill: "yellow",  width: 200, height: 200  }),
			$(go.Placeholder,    
			  { padding: 5})  
		  ),
		  $(go.TextBlock,         // group title
			{ alignment: go.Spot.Right, font: "Bold 12pt Sans-Serif" },
			new go.Binding("text", "key"))
		);
		myDiagram.model.nodeDataArray = [
			{ key: "Box with node",text: "Box with node", isGroup: true },
		 	 	{ key: "NodeTypeA", group: "Box with node"}
		  ];
	 	myDiagram.toolManager.mouseMoveTools.insertAt(2,
			$(DragCreatingTool,
				{
					isEnabled: false,
					delay: 0,
					box: $(go.Part,
						{ layerName: "Tool" },
						$(go.Shape,
							{ name: "SHAPE", fill: null, stroke: "cyan", strokeWidth: 2 })
					),
					archetypeNodeData: { color: "white" },
					insertPart: function (bounds) {

						this.archetypeNodeData.color = go.Brush.randomColor();
						var tool = myDiagram.toolManager.findTool("DragCreating");
						if (tool !== null) tool.isEnabled = false;
						return DragCreatingTool.prototype.insertPart.call(this, bounds);
					}
				}));
	}
	$scope.toolEnabled = function () {
		var tool = myDiagram.toolManager.findTool("DragCreating");
		if (tool !== null) tool.isEnabled = true;
	}
	window.addEventListener('DOMContentLoaded', $scope.init);
}