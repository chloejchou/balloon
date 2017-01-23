// SCENE
let scene, camera, renderer;

const setupScene = () => {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xe6e6ff);

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 200;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  const root = document.getElementById("sky");
  root.appendChild(renderer.domElement);
};



// LIGHTS
let directionalLight, hemisphereLight;

const setupLights = () => {
  directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
  directionalLight.position.set(100, 300, 300);
  directionalLight.castShadow = true;
  scene.add(directionalLight);
};



// ADD MOON
let moonMesh;

const moon = () => {
  const geometry = new THREE.SphereGeometry(300, 15, 15);
  const matrix = new THREE.Matrix4();
  // counterclockwise
  geometry.applyMatrix(matrix.makeRotationX(-Math.PI/2));
  const material = new THREE.MeshPhongMaterial({ color: 0xc0c0c0 });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.receiveShadow = true;

  return sphere;
};

const addMoon = () => {
  moonMesh = moon();
  moonMesh.position.y = -350;
  scene.add(moonMesh);
};


const initialize = () => {
  setupScene();
  setupLights();
  addMoon();

  renderer.render(scene, camera);
};


document.addEventListener('DOMContentLoaded', () => {
  initialize();
});
