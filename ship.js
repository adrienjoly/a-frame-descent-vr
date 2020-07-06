/*globals AFRAME, THREE*/

AFRAME.registerComponent("rig-thrusters", {
  schema: {
    forward: { type: "number", default: 0 },
    right: { type: "number", default: 0 },
    turnDown: { type: "number", default: 0 },
    turnRight: { type: "number", default: 0 }
  },
  init: function() {
    this.moveVec = new THREE.Vector2();
    this.turnVec = new THREE.Vector2();
    this.upRotationAxis = new THREE.Vector3(0, -1, 0); // axis for turnRight/Left rotation
    this.rightRotationAxis = new THREE.Vector3(1, 0, 0); // axis for turnDown/Up rotation
  },
  tick: function() {
    this.el.object3D.rotateOnAxis(this.upRotationAxis, this.turnVec.y / 50);
    this.el.object3D.rotateOnAxis(this.rightRotationAxis, this.turnVec.x / 50);
    var direction = new THREE.Vector3();
    this.el.object3D.getWorldDirection(direction);
    ['x', 'y', 'z'].forEach(axis => {
      // this.el.object3D.position[axis] += this.moveVec.x / 10;  
      this.el.object3D.position[axis] += direction[axis] * this.moveVec.y / 10;
    });
    // console.log("rig tick => camera:", this.el.object3D.position);
  },
  update: function(oldData) {
    const { forward, right, turnDown, turnRight } = this.data;
    this.moveVec.x = right;
    this.moveVec.y = forward;
    this.turnVec.x = turnDown;
    this.turnVec.y = turnRight;
    console.log("rig update => moving:", this.moveVec);
    console.log("rig update => turning:", this.turnVec);
    console.log("rig update => rotation:", this.el.object3D.rotation);
    // console.log("rig update => direction: ", direction);
  }
});
