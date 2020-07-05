/*globals AFRAME*/

const colors = ["#FFC65D", "#7BC8A4"];
let state = 0;
function toggleColor() {
  document.getElementById("plane").setAttribute("color", colors[state]);
  state = (state + 1) % colors.length;
}

AFRAME.registerComponent("rig-thrusters", {
  init: function() {
    // this.data["right"] = 0;
    // this.data["forward"] = 0;
  },
  tick: function() {
    this.el.object3D.position.x += this.data["right"] / 10;
    this.el.object3D.position.z += this.data["forward"] / 10;
    // console.log("camera", this.el.object3D.position);
  },
  update: function(oldData) {
    console.log("update", this.data);
  }
});

AFRAME.registerComponent("keyboard-control", {
  schema: { type: "string" },

  init: function() {
    const rigElementId = this.data;
    const rig = document.getElementById(rigElementId);

    window.addEventListener("keydown", function(event) {
      switch (event.key) {
        case "w":
          rig.setAttribute("rig-thrusters", "forward", -1);
          break;
        case "s":
          rig.setAttribute("rig-thrusters", "forward", 1);
          break;
        case "a":
          rig.setAttribute("rig-thrusters", "right", -1);
          break;
        case "d":
          rig.setAttribute("rig-thrusters", "right", 1);
          break;
      }
    });

    window.addEventListener("keyup", function(event) {
      switch (event.key) {
        case "w":
        case "s":
          rig.setAttribute("rig-thrusters", "forward", 0);
          break;
        case "a":
        case "d":
          rig.setAttribute("rig-thrusters", "right", 0);
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
      // console.log(this.id, { x, y });
      rig.setAttribute("rig-thrusters", { forward: y, right: x });
      //console.log("Entity collided with", event.detail.collidingEntity);
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
