/*globals AFRAME*/

AFRAME.registerComponent("enable-joystick", {
  schema: { type: "string" },

  init: function() {
    var stringToLog = this.data;
    console.log("enable-joystick", stringToLog);
    const colors = ["#FFC65D", "#7BC8A4"];
    let state = 0;
    function toggleColor() {
      document.getElementById("plane").setAttribute("color", colors[state]);
      state = (state + 1) % colors.length;
    }
    
    const rig = document.getElementById("rig");

    // https://aframe.io/docs/1.0.0/components/tracked-controls.html
    this.el.addEventListener("axismove", function(event) {
      const [x, y] = event.detail.axis.slice(2)
      console.log(this.id, {x, y});
      console.log('camera', rig.object3D.position);
      rig.object3D.position.x += x / 10
      rig.object3D.position.z += y / 10
    });

    // https://aframe.io/docs/1.0.0/components/oculus-touch-controls.html#events_thumbstickchanged
    this.el.addEventListener("thumbstickdown", function(event) {
      toggleColor();
      //console.log("Entity collided with", event.detail.collidingEntity);
    });
  }
});
