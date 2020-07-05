/*globals AFRAME, THREE*/

// Keyboard controls:
//
//      W           Y
//    A S D       G H J
//
// translation  rotation

AFRAME.registerComponent("keyboard-control", {
  schema: { type: "string" },

  init: function() {
    const rigElementId = this.data;
    const rig = document.getElementById(rigElementId);

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
            event.key === "g" ? -1 : 1
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
