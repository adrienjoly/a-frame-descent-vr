/*globals AFRAME, THREE*/

// Keyboard controls:
//
//      W           Y
//    A S D       G H J       L
//
// translation  rotation  stabilize

AFRAME.registerComponent("keyboard-control", {
  schema: { type: "string" },

  init: function() {
    const rigElementId = this.data;
    const rig = document.getElementById(rigElementId);

    const movControls = {
      forward: { w: -1, s: 1 },
      right: { a: -1, d: 1 },
      turnDown: { y: -1, h: 1 },
      turnRight: { g: -1, j: 1 }
    };

    const applyKeyMovement = (key, movementName) => {
      const movement = movControls[movementName][key];
      if (movement) rig.setAttribute("rig-thrusters", movementName, movement);
    };

    const applyKeyRelease = (key, movementName) => {
      const movement = movControls[movementName][key];
      if (movement) rig.setAttribute("rig-thrusters", movementName, 0);
    };

    window.addEventListener("keydown", function(event) {
      if (event.key === "l") {
        rig.setAttribute("rig-thrusters", "stabilize", true);
        return;
      }
      Object.keys(movControls).forEach(mvt => applyKeyMovement(event.key, mvt));
    });

    window.addEventListener("keyup", function(event) {
      if (event.key === "l") {
        rig.setAttribute("rig-thrusters", "stabilize", false);
        return;
      }
      Object.keys(movControls).forEach(mvt => applyKeyRelease(event.key, mvt));
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
      rig.setAttribute("rig-thrusters", { forward: y, right: x });
    });
  }
});

AFRAME.registerComponent("rig-rotation-controller", {
  schema: { type: "string" },

  init: function() {
    const rigElementId = this.data;
    const rig = document.getElementById(rigElementId);

    this.el.addEventListener("axismove", function(event) {
      const [x, y] = event.detail.axis.slice(2);
      rig.setAttribute("rig-thrusters", { turnDown: y, turnRight: x });
    });

    // https://aframe.io/docs/1.0.0/components/oculus-touch-controls.html
    this.el.addEventListener("triggerdown", function(event) {
      rig.setAttribute("rig-thrusters", "stabilize", true);
    });

    this.el.addEventListener("triggerup", function(event) {
      rig.setAttribute("rig-thrusters", "stabilize", false);
    });
  }
});

/**
 * Click mouse to shoot.
 */
AFRAME.registerComponent("click-to-shoot", {
  init: function() {
    document.body.addEventListener("mousedown", () => {
      this.el.emit("shoot");
    });
  }
});

/**
 * Change color when hit.
 */
AFRAME.registerComponent("hit-handler", {
  dependencies: ["material"],

  init: function() {
    var color;
    var el = this.el;

    color = new THREE.Color();
    color.set("#666");
    el.components.material.material.color.copy(color);
    el.addEventListener("hit", () => {
      color.addScalar(0.05);
      el.components.material.material.color.copy(color);
    });

    el.addEventListener("die", () => {
      color.setRGB(1, 0, 0);
      el.components.material.material.color.copy(color);
    });
  }
});
