/*globals AFRAME, THREE*/

const colors = ["#FFC65D", "#7BC8A4"];
let state = 0;
function toggleColor() {
  document.getElementById("plane").setAttribute("color", colors[state]);
  state = (state + 1) % colors.length;
}

AFRAME.registerComponent("rig-thrusters", {
  schema: {    
    forward: { type: 'number', default: 0 },
    right: { type: 'number', default: 0 },
    turnDown: { type: 'number', default: 0 },
    turnRight: { type: 'number', default: 0 },
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
      this.rotationVec3.y = turnRight / 10;
    }
    console.log("rig update => direction:", this.directionVec3);
    console.log("rig update => rotation:", this.rotationVec3);
  }
});

AFRAME.registerComponent("keyboard-control", {
  schema: { type: "string" },

  init: function() {
    const rigElementId = this.data;
    const rig = document.getElementById(rigElementId);

    // Keyboard controls:
    //
    //      W           Y
    //    A S D       G H J
    // translation  rotation

    window.addEventListener("keydown", function(event) {
      switch (event.key) {
        // translation keys
        case "w":
        case "s":
          rig.setAttribute(
            "rig-thrusters",
            "forward",
            event.key === "w" ? -1 : 1
          );
          break;
        case "a":
        case "d":
          rig.setAttribute(
            "rig-thrusters",
            "right",
            event.key === "a" ? -1 : 1
          );
          break;
        // rotation keys
        case "y":
        case "h":
          rig.setAttribute(
            "rig-thrusters",
            "turnDown",
            event.key === "y" ? -1 : 1
          );
          break;
        case "g":
        case "j":
          rig.setAttribute(
            "rig-thrusters",
            "turnRight",
            event.key === "g" ? 1 : -1
          );
          break;
      }
    });

    window.addEventListener("keyup", function(event) {
      switch (event.key) {
        // translation keys
        case "w":
        case "s":
          rig.setAttribute("rig-thrusters", "forward", 0);
          break;
        case "a":
        case "d":
          rig.setAttribute("rig-thrusters", "right", 0);
          break;
        // rotation keys
        case "y":
        case "h":
          rig.setAttribute("rig-thrusters", "turnDown", 0);
          break;
        case "g":
        case "j":
          rig.setAttribute("rig-thrusters", "turnRight", 0);
          break;
      }
    });
  }
});

AFRAME.registerComponent("rig-movement-controller", {
  schema: { type: "string" },

  init: function() {
    const rigElementId = this.data;
    const rig = document.getElementById(rigElementId);

    // https://aframe.io/docs/1.0.0/components/tracked-controls.html
    this.el.addEventListener("axismove", function(event) {
      const [x, y] = event.detail.axis.slice(2);
      // console.log("rig-movement-controller", this.id, "axismove: " , { x, y });
      rig.setAttribute("rig-thrusters", { forward: y, right: x });
    });

    // https://aframe.io/docs/1.0.0/components/oculus-touch-controls.html
    this.el.addEventListener("triggerdown", function(event) {
      toggleColor();
    });
  }
});

AFRAME.registerComponent("rig-rotation-controller", {
  schema: { type: "string" },

  init: function() {
    const rigElementId = this.data;
    const rig = document.getElementById(rigElementId);
    // TODO
  }
});
