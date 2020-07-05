/*globals AFRAME, THREE*/

AFRAME.registerComponent("rig-thrusters", {
  schema: {
    forward: { type: "number", default: 0 },
    right: { type: "number", default: 0 },
    turnDown: { type: "number", default: 0 },
    turnRight: { type: "number", default: 0 }
  },
  init: function() {
    this.directionVec3 = new THREE.Vector3();
    this.rotationVec3 = new THREE.Vector3();
  },
  tick: function() {
    ["x", "y", "z"].forEach(axis => {
      this.el.object3D.position[axis] += this.directionVec3[axis];
      this.el.object3D.rotation[axis] += this.rotationVec3[axis];
    });
    // console.log("rig tick => camera:", this.el.object3D.position);
  },
  update: function(oldData) {
    const { forward, right, turnDown, turnRight } = this.data;
    if (right !== undefined) {
      this.directionVec3.x = right / 10;
    }
    if (forward !== undefined) {
      this.directionVec3.z = forward / 10;
    }
    if (turnDown !== undefined) {
      this.rotationVec3.x = turnDown / 10;
    }
    if (turnRight !== undefined) {
      this.rotationVec3.y = -turnRight / 10;
    }
    console.log("rig update => direction:", this.directionVec3);
    console.log("rig update => rotation:", this.rotationVec3);
  }
});
