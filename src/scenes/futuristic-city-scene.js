AFRAME.registerComponent('futuristic-city-scene', {
  init() {
    const starrySky = document.createElement('a-entity');
    starrySky.setAttribute('starry-sky', 'count: 260; radius: 1200;');
    this.el.appendChild(starrySky);

    const ocean = document.createElement('a-entity');
    ocean.setAttribute('infinite-ocean', 'target: #playerRig; size: 7000; y: -2;');
    this.el.appendChild(ocean);

    const city = document.createElement('a-entity');
    city.setAttribute('city-generator', 'grid: 34; spacing: 34; minHeight: 24; maxHeight: 180; gapRadius: 100; skipChance: 0.2;');
    this.el.appendChild(city);
  }
});