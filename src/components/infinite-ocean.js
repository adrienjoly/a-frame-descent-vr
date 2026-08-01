AFRAME.registerComponent('infinite-ocean', {
  schema: {
    target: { type: 'selector' },
    size: { default: 7000 },
    y: { default: -2 },
    lowPower: { default: false }
  },

  init() {
    this.plane = document.createElement('a-plane');
    this.plane.setAttribute('rotation', '-90 0 0');
    this.plane.setAttribute('width', this.data.size);
    this.plane.setAttribute('height', this.data.size);
    this.plane.setAttribute('color', '#071a46');
    this.plane.setAttribute(
      'material',
      this.data.lowPower
        ? 'shader: flat; opacity: 0.95;'
        : 'shader: standard; roughness: 0.92; metalness: 0.04; opacity: 0.97;'
    );
    this.el.appendChild(this.plane);
  },

  tick() {
    const target = this.data.target;
    if (!target) return;
    const p = target.object3D.position;
    this.el.object3D.position.set(p.x, this.data.y, p.z);
  }
});