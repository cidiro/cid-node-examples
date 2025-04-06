import { app } from "../../scripts/app.js";

app.registerExtension({
  name: "DynamicInputsExampleExtension",
  beforeRegisterNodeDef(nodeType, nodeData, app) {
    if (nodeData.name !== "DynamicInputsExample") return;

    const baseInputName = "string";
    const baseInputType = "STRING";

    nodeType.prototype.onNodeCreated = function () {
      // Clear any preexisting inputs
      while (this.inputs.length > 0) {
        this.removeInput(0);
      }
      // Add the initial required input
      this.addInput(`${baseInputName}_1`, baseInputType);

      // Remove the widget associated with the first input
      // (This widget is only present with certain input types)
      if (this.widgets && Array.isArray(this.widgets)) {
        this.widgets = this.widgets.filter(widget => widget.name !== `${baseInputName}_1`);
      }

      this.resizeLayout();
    };

    nodeType.prototype.onConnectionsChange = function (type, index, connected, link_info) {
      // Only handle input connections (type === 1)
      if (type !== 1 || !link_info) return;

      // 1. Add a new input slot if the last input slot is connected
      const lastIndex = this.inputs.length - 1;
      if (this.inputs[lastIndex] && this.inputs[lastIndex].link !== undefined) {
        this.addInput(`${baseInputName}_${this.inputs.length + 1}`, baseInputType);
      }

      // 2. Cleanup empty input slots, keeping only the last one
      let emptyIndices = [];
      for (let i = 0; i < this.inputs.length; i++) {
        if (!this.inputs[i].link) {
          emptyIndices.push(i);
        }
      }
      while (emptyIndices.length > 1) {
        this.removeInput(emptyIndices[0]);
        emptyIndices = [];
        for (let i = 0; i < this.inputs.length; i++) {
          if (!this.inputs[i].link) {
            emptyIndices.push(i);
          }
        }
      }

      // 3. Renumber the slot names sequentially
      for (let i = 0; i < this.inputs.length; i++) {
        this.inputs[i].name = `${baseInputName}_${i + 1}`;
      }

      this.resizeLayout();
    };

    // --- resizeLayout helper function ---
    nodeType.prototype.resizeLayout = function() {
      this.size = this.computeSize();
      this.size[0] += 10; // Add 10 pixels to the width for aesthetic reasons
    };
  }
});
