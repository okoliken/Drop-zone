<template>
  <div
    v-bind="{ scopedSlots: $scopedSlots }"
    class="orgchart-container"
    @wheel="zoom && zoomHandler($event)"
    @mouseup="pan && panning && panEndHandler($event)"
  >
    <div
      class="orgchart"
      :style="{ transform: transformVal, cursor: cursorVal }"
      @mousedown="pan && panStartHandler($event)"
      @mousemove="pan && panning && panHandler($event)"
    >
      <organization-chart-node
        :datasource="datasource"
        :handle-click="handleClick"
      >
        <template
          v-for="slot in Object.keys($scopedSlots)"
          :slot="slot"
          slot-scope="scope"
        >
          <slot :name="slot" v-bind="scope" />
        </template>
      </organization-chart-node>
    </div>
  </div>
</template>

<script>
// import $ from "jquery";
import OrganizationChartNode from "./OrganizationChartNode.vue";
export default {
  name: "Container",
  props: {
    datasource: {
      type: Object,
      required: true,
    },
    pan: {
      type: Boolean,
      required: false,
    },
    zoom: {
      type: Boolean,
      required: false,
    },
    zoomoutLimit: {
      type: Number,
      required: false,
      default: 0.5,
    },
    zoominLimit: {
      type: Number,
      required: false,
      default: 7,
    },
  },
  data() {
    return {
      cursorVal: "default",
      panning: false,
      startX: 0,
      startY: 0,
      transformVal: "",
    };
  },
  components: {
    OrganizationChartNode,
  },
  methods: {
    handleClick(nodeData) {
      this.$emit("node-click", nodeData);
    },
    panEndHandler() {
      this.panning = false;
      this.cursorVal = "default";
    },
    panHandler(e) {
      let newX = 0;
      let newY = 0;
      if (!e.targetTouches) {
        // pand on desktop
        newX = e.pageX - this.startX;
        newY = e.pageY - this.startY;
      } else if (e.targetTouches.length === 1) {
        // pan on mobile device
        newX = e.targetTouches[0].pageX - this.startX;
        newY = e.targetTouches[0].pageY - this.startY;
      } else if (e.targetTouches.length > 1) {
        return;
      }
      if (this.transformVal === "") {
        if (this.transformVal.indexOf("3d") === -1) {
          this.transformVal = "matrix(1,0,0,1," + newX + "," + newY + ")";
        } else {
          this.transformVal =
            "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0," + newX + ", " + newY + ",0,1)";
        }
      } else {
        let matrix = this.transformVal.split(",");
        if (this.transformVal.indexOf("3d") === -1) {
          matrix[4] = newX;
          matrix[5] = newY + ")";
        } else {
          matrix[12] = newX;
          matrix[13] = newY;
        }
        this.transformVal = matrix.join(",");
      }
    },
    panStartHandler(e) {
      if (e.target.closest(".node").length) {
        this.panning = false;
        return;
      } else {
        this.cursorVal = "move";
        this.panning = true;
      }
      let lastX = 0;
      let lastY = 0;
      if (this.transformVal !== "") {
        let matrix = this.transformVal.split(",");
        if (this.transformVal.indexOf("3d") === -1) {
          lastX = parseInt(matrix[4]);
          lastY = parseInt(matrix[5]);
        } else {
          lastX = parseInt(matrix[12]);
          lastY = parseInt(matrix[13]);
        }
      }
      if (!e.targetTouches) {
        // pand on desktop
        this.startX = e.pageX - lastX;
        this.startY = e.pageY - lastY;
      } else if (e.targetTouches.length === 1) {
        // pan on mobile device
        this.startX = e.targetTouches[0].pageX - lastX;
        this.startY = e.targetTouches[0].pageY - lastY;
      } else if (e.targetTouches.length > 1) {
        return;
      }
    },
    setChartScale(newScale) {
      let matrix = "";
      let targetScale = 1;
      if (this.transformVal === "") {
        this.transformVal =
          "matrix(" + newScale + ", 0, 0, " + newScale + ", 0, 0)";
      } else {
        matrix = this.transformVal.split(",");
        if (this.transformVal.indexOf("3d") === -1) {
          targetScale = Math.abs(window.parseFloat(matrix[3]) * newScale);
          if (
            targetScale > this.zoomoutLimit &&
            targetScale < this.zoominLimit
          ) {
            matrix[0] = "matrix(" + targetScale;
            matrix[3] = targetScale;
            this.transformVal = matrix.join(",");
          }
        } else {
          targetScale = Math.abs(window.parseFloat(matrix[5]) * newScale);
          if (
            targetScale > this.zoomoutLimit &&
            targetScale < this.zoominLimit
          ) {
            matrix[0] = "matrix3d(" + targetScale;
            matrix[5] = targetScale;
            this.transformVal = matrix.join(",");
          }
        }
      }
    },
    zoomHandler(e) {
      let newScale = 1 + (e.deltaY > 0 ? -0.2 : 0.2);
      this.setChartScale(newScale);
    },
  },
};
</script>

<style>
.orgchart-container {
  position: relative;
  display: inline-block;
  width: calc(100% - 24px);
  border-radius: 5px;
  text-align: center;
}

.orgchart.r2l {
  position: absolute;
  transform: rotate(90deg);
  transform-origin: left top;
}
.orgchart > .spinner {
  font-size: 100px;
  margin-top: 30px;
  color: rgba(68, 157, 68, 0.8);
}
.orgchart table {
  border-spacing: 0;
  border-collapse: separate;
}
.orgchart > table:first-child {
  /* margin: 20px auto; */
  margin: 40px auto;
}
.orgchart td {
  text-align: center;
  vertical-align: top;
  padding: 0;
}
.orgchart .lines:nth-child(3) td {
  box-sizing: border-box;
  height: 40px;
}
.orgchart .lines .topLine {
  /* border-top: 2px solid rgba(217, 83, 79, 0.8); */
  border-top: 1px solid #45165f;
}
.orgchart .lines .rightLine {
  /* border-right: 1px solid rgba(217, 83, 79, 0.8); */
  border-right: 1px solid #45165f;
  float: none;
  border-radius: 0;
}
.orgchart .lines .leftLine {
  /* border-left: 1px solid rgba(217, 83, 79, 0.8); */
  border-left: 1px solid #45165f;
  float: none;
  border-radius: 0;
}
.orgchart .lines .downLine {
  /* background-color: rgba(217, 83, 79, 0.8); */
  background-color: #45165f;
  margin: 0 auto;
  /* height: 20px; */
  height: 40px;
  width: 2px;
  float: none;
}
/* node styling */
.orgchart .node {
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  margin: 4px;
  padding: 3px;
  border: 2px dashed transparent;
  text-align: center;
  /* width: 130px; */
  width: 94px;
}
.orgchart .node .edge {
  font-size: 15px;
  position: absolute;
  color: rgba(68, 157, 68, 0.5);
  cursor: default;
  transition: 0.2s;
}
.orgchart.noncollapsable .node .edge {
  display: none;
}
.orgchart .edge:hover {
  color: #449d44;
  cursor: pointer;
}
.orgchart .node .verticalEdge {
  width: calc(100% - 10px);
  width: -webkit-calc(100% - 10px);
  width: -moz-calc(100% - 10px);
  left: 5px;
}
.orgchart .node .topEdge {
  top: -4px;
}
.orgchart .node .bottomEdge {
  bottom: -4px;
}
.orgchart .node .horizontalEdge {
  width: 15px;
  height: calc(100% - 10px);
  height: -webkit-calc(100% - 10px);
  height: -moz-calc(100% - 10px);
  top: 5px;
}
.orgchart .node .rightEdge {
  right: -4px;
}
.orgchart .node .leftEdge {
  left: -4px;
}
.orgchart .node .horizontalEdge::before {
  position: absolute;
  top: calc(50% - 7px);
}
.orgchart .node .rightEdge::before {
  right: 3px;
}
.orgchart .node .leftEdge::before {
  left: 3px;
}
.orgchart .node .toggleBtn {
  position: absolute;
  left: 5px;
  bottom: -2px;
  color: rgba(68, 157, 68, 0.6);
}
.orgchart .node .toggleBtn:hover {
  color: rgba(68, 157, 68, 0.8);
}
.oc-export-btn {
  display: inline-block;
  position: absolute;
  right: 5px;
  top: 5px;
  padding: 6px 12px;
  margin-bottom: 0;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.42857143;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  color: #fff;
  background-color: #5cb85c;
  border: 1px solid transparent;
  border-color: #4cae4c;
  border-radius: 4px;
}
.oc-export-btn[disabled] {
  cursor: not-allowed;
  box-shadow: none;
  opacity: 0.3;
}
.oc-export-btn:hover,
.oc-export-btn:focus,
.oc-export-btn:active {
  background-color: #449d44;
  border-color: #347a34;
}
.orgchart ~ .mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.3);
}
.orgchart ~ .mask .spinner {
  position: absolute;
  top: calc(50% - 54px);
  left: calc(50% - 54px);
  color: rgba(255, 255, 255, 0.8);
  font-size: 108px;
}
.orgchart .node {
  transition: transform 0.3s, opacity 0.3s;
}
.orgchart .slide-down {
  opacity: 0;
  transform: translateY(40px);
}
.orgchart.l2r .node.slide-down,
.orgchart.r2l .node.slide-down {
  transform: translateY(130px);
}
.orgchart .slide-up {
  opacity: 0;
  transform: translateY(-40px);
}
.orgchart.l2r .node.slide-up,
.orgchart.r2l .node.slide-up {
  transform: translateY(-130px);
}
.orgchart .slide-right {
  opacity: 0;
  transform: translateX(130px);
}
.orgchart.l2r .node.slide-right,
.orgchart.r2l .node.slide-right {
  transform: translateX(40px);
}
.orgchart .slide-left {
  opacity: 0;
  transform: translateX(-130px);
}
.orgchart.l2r .node.slide-left,
.orgchart.r2l .node.slide-left {
  transform: translateX(-40px);
}
</style>
