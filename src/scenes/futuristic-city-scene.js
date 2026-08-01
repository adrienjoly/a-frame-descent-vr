AFRAME.registerComponent('futuristic-city-scene', {
  init() {
    const starrySky = document.createElement('a-entity');
    starrySky.setAttribute('starry-sky', 'target: #rig; count: 500; radius: 420; minY: 40; maxY: 320; minSize: 0.6; maxSize: 1.8;');
    this.el.appendChild(starrySky);

    const ocean = document.createElement('a-entity');
    ocean.setAttribute('infinite-ocean', 'target: #rig; size: 7000; y: -2;');
    this.el.appendChild(ocean);

    const city = document.createElement('a-entity');
    city.setAttribute(
      'city-generator',
      'grid: 34; spacing: 34; minHeight: 24; maxHeight: 180; gapRadius: 100; skipChance: 0.2;'
    );
    this.el.appendChild(city);
  }
});