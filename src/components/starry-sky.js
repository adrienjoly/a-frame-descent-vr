AFRAME.registerComponent('starry-sky', {
  schema: {
    count: { default: 260 },
    radius: { default: 1200 }
  },

  init() {
    const sky = document.createElement('a-sky');
    sky.setAttribute('color', '#020611');
    this.el.appendChild(sky);

    const r = this.data.radius;
    for (let i = 0; i < this.data.count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);

      const star = document.createElement('a-sphere');
      star.setAttribute('position', `${x.toFixed(1)} ${y.toFixed(1)} ${z.toFixed(1)}`);
      star.setAttribute('radius', (Math.random() * 0.35 + 0.12).toFixed(2));
      star.setAttribute('material', 'shader: flat; color: #dfe7ff; emissive: #c9d3ff; emissiveIntensity: 1;');
      this.el.appendChild(star);
    }
  }
});