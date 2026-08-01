/*globals AFRAME, THREE*/

const playerIsOnDesktop = ({ x, y, z }) => x === 0 && y === 0 && z === 0;

// fix camera height for when player is not in immersive/VR mode (i.e. the height of the player's head is 0 instead of ~1.6m)
AFRAME.registerComponent("fix-height-on-desktop", {
  init: function() {
    const defaultPos = { ...this.el.getAttribute("position") }; // backup coordinates by cloning the object
    this.el.sceneEl.addEventListener("enter-vr", () =>
      this.el.setAttribute("position", { x: 0, y: 0, z: 0 })
    );
    this.el.sceneEl.addEventListener("exit-vr", () =>
      this.el.setAttribute("position", defaultPos)
    );
  }
});

AFRAME.registerComponent("rig-thrusters", {
  schema: {
    forward: { type: "number", default: 0 },
    right: { type: "number", default: 0 },
    turnDown: { type: "number", default: 0 },
    turnRight: { type: "number", default: 0 },
    stabilize: { type: "boolean", default: false }
  },
  init: function() {
    this.moveVec = new THREE.Vector2();
    this.turnVec = new THREE.Vector2();
    this.upRotationAxis = new THREE.Vector3(0, -1, 0); // axis for turnRight/Left rotation
    this.rightRotationAxis = new THREE.Vector3(1, 0, 0); // axis for turnDown/Up rotation
    this.direction = new THREE.Vector3();
    this.lateralDirection = new THREE.Vector3();
  },
  tick: function() {
    this.el.object3D.rotateOnAxis(this.upRotationAxis, this.turnVec.y / 30);
    this.el.object3D.rotateOnAxis(this.rightRotationAxis, this.turnVec.x / 30);
    const direction = this.direction;
    const lateralDirection = this.lateralDirection;
    this.el.object3D.getWorldDirection(direction);
    lateralDirection.copy(direction).applyAxisAngle(this.upRotationAxis, -Math.PI / 2);

    // 1. move forward / backward
    this.el.object3D.position.x += direction.x * this.moveVec.y;
    this.el.object3D.position.y += direction.y * this.moveVec.y;
    this.el.object3D.position.z += direction.z * this.moveVec.y;

    // 2. lateral movement (strafe)
    this.el.object3D.position.x += lateralDirection.x * this.moveVec.x;
    this.el.object3D.position.y += lateralDirection.y * this.moveVec.x;
    this.el.object3D.position.z += lateralDirection.z * this.moveVec.x;
  },
  update: function(oldData) {
    const { forward, right, turnDown, turnRight, stabilize } = this.data;
    if (stabilize) {
      this.el.object3D.rotation.x = 0;
      this.el.object3D.rotation.z = 0;
      return;
    }
    this.moveVec.x = right;
    this.moveVec.y = forward;
    this.turnVec.x = turnDown;
    this.turnVec.y = turnRight;
  }
});
