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

    const forwardControls = { w: -1, s: 1 };
    const lateralControls = { a: -1, d: 1 };
    const vertRotControls = { y: -1, h: 1 };
    const horizRotControls = { g: -1, j: 1 };

    window.addEventListener("keydown", function(event) {
      // translation keys
      const forward = forwardControls[event.key];
      if (forward) rig.setAttribute("rig-thrusters", "forward", forward);
      const right = lateralControls[event.key];
      if (right) rig.setAttribute("rig-thrusters", "right", right);
      // rotation keys
      const turnDown = vertRotControls[event.key];
      if (turnDown) rig.setAttribute("rig-thrusters", "turnDown", turnDown);
      const turnRight = horizRotControls[event.key];
      if (turnRight) rig.setAttribute("rig-thrusters", "turnRight", turnRight);
    });

    window.addEventListener("keyup", function(event) {
      // translation keys
      const forward = forwardControls[event.key];
      if (forward) rig.setAttribute("rig-thrusters", "forward", 0);
      const right = lateralControls[event.key];
      if (right) rig.setAttribute("rig-thrusters", "right", 0);
      // rotation keys
      const turnDown = vertRotControls[event.key];
      if (turnDown) rig.setAttribute("rig-thrusters", "turnDown", 0);
      const turnRight = horizRotControls[event.key];
      if (turnRight) rig.setAttribute("rig-thrusters", "turnRight", 0);
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
    // this.el.addEventListener("triggerdown", function(event) {});
  }
});

AFRAME.registerComponent("rig-rotation-controller", {
  schema: { type: "string" },

  init: function() {
    const rigElementId = this.data;
    const rig = document.getElementById(rigElementId);

    this.el.addEventListener("axismove", function(event) {
      const [x, y] = event.detail.axis.slice(2);
      // console.log("rig-movement-controller", this.id, "axismove: " , { x, y });
      rig.setAttribute("rig-thrusters", { turnDown: y, turnRight: x });
    });
  }
});
