import { app } from "../../scripts/app.js";

app.registerExtension({
  name: "AnyTypeExampleExtension",
  beforeRegisterNodeDef(nodeType, nodeData, app) {
    if (nodeData.name !== "AnyTypeExample") return;

    nodeType.prototype.onNodeCreated = function () {
      // Rename all input labels to "*"
      for (let i = 0; i < this.inputs.length; i++) {
        this.inputs[i].label = "*";
      }
    };

    nodeType.prototype.onConnectionsChange = function (type, index, connected, link_info) {
      // Only handle input connections (type === 1)
      if (type !== 1) return;

      if (connected) {
        // Copy the type from the source
        let newType = "*";
        if (link_info) {
          const originNode = app.graph.getNodeById(link_info.origin_id);
          newType = originNode.outputs[link_info.origin_slot].type;
        }
        
        if (newType && newType !== "*") {
          // Update input and output types to match the connected type
          this.inputs[index].type = newType;
          this.inputs[index].label = newType.toLowerCase();
          this.outputs[0].type = newType;
          this.outputs[0].label = newType.toUpperCase();
        }
      } else {
        // When disconnected, reset to default "*" type
        this.inputs[index].type = "*";
        this.inputs[index].label = "*";
        this.outputs[0].type = "*";
        this.outputs[0].label = "*";
      }
    };
  }
});