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
    this.upRotationAxis = new THREE.Vector3(0, -1, 0); // axis for turnRight/Left rotation
    this.rightRotationAxis = new THREE.Vector3(1, 0, 0); // axis for turnDown/Up rotation
  },
  tick: function() {
    this.el.object3D.rotateOnAxis(this.upRotationAxis, this.rotationVec3.y  / 50);
    this.el.object3D.rotateOnAxis(this.rightRotationAxis, this.rotationVec3.x / 50);
    this.el.object3D.position.x += this.directionVec3.x / 10;
    this.el.object3D.position.z += this.directionVec3.z / 10;
    // console.log("rig tick => camera:", this.el.object3D.position);
  },
  update: function(oldData) {
    const { forward, right, turnDown, turnRight } = this.data;
    if (right !== undefined) {
      this.directionVec3.x = right;
    }
    if (forward !== undefined) {
      this.directionVec3.z = forward;
    }
    if (turnDown !== undefined) {
      this.rotationVec3.x = turnDown;
    }
    if (turnRight !== undefined) {
      this.rotationVec3.y = turnRight;
    }
    console.log("rig update => direction:", this.directionVec3);
    console.log("rig update => rotation:", this.rotationVec3);
  }
});
