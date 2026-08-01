AFRAME.registerComponent('city-generator', {
  schema: {
    grid: { default: 34 },
    spacing: { default: 34 },
    minHeight: { default: 24 },
    maxHeight: { default: 180 },
    gapRadius: { default: 100 },
    skipChance: { default: 0.2 }
  },

  init() {
    const { grid, spacing, minHeight, maxHeight, gapRadius, skipChance } = this.data;
    const half = Math.floor(grid / 2);

    for (let gx = -half; gx <= half; gx++) {
      for (let gz = -half; gz <= half; gz++) {
        const x = gx * spacing;
        const z = gz * spacing;

        // Keep center more open for combat
        if (Math.hypot(x, z) < gapRadius) continue;
        if (Math.random() < skipChance) continue; // streets / empty lots

        const h = minHeight + Math.random() * (maxHeight - minHeight);
        const w = 10 + Math.random() * 18;
        const d = 10 + Math.random() * 18;

        const tower = document.createElement('a-box');
        tower.setAttribute('position', `${x} ${(h / 2).toFixed(2)} ${z}`);
        tower.setAttribute('width', w.toFixed(2));
        tower.setAttribute('height', h.toFixed(2));
        tower.setAttribute('depth', d.toFixed(2));
        tower.setAttribute('color', '#40485f');
        tower.setAttribute('material', 'roughness: 0.88; metalness: 0.2;');

        // Optional collision for simple hiding/obstacles
        tower.setAttribute('class', 'city-obstacle');

        this.el.appendChild(tower);
      }
    }
  }
});