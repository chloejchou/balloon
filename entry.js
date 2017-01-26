// SCENE
// ------------------------------------------------------------------
let scene, camera, renderer;

const setupScene = () => {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 400;

  camera.lookAt({ x: 0, y: 0, z: 0 });

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const root = document.getElementById("sky");
  root.appendChild(renderer.domElement);
};


// LIGHTS
// ------------------------------------------------------------------
let light;

const setupLights = () => {
  light = new THREE.DirectionalLight(0xffffff, .9);
  light.position.set(100, 200, 200);
  light.castShadow = true;

  scene.add(light);
};


// ADD MOON
// ------------------------------------------------------------------
let moonMesh;
let moonRed = "255";
let moonGreen = "255";
let moonBlue = "255";

const moon = () => {
  const geometry = new THREE.IcosahedronGeometry(300, 3);
  const material = new THREE.MeshPhongMaterial({
    color: `rgb(${moonRed}, ${moonGreen}, ${moonBlue})`,
    opacity: .9,
    shading: THREE.FlatShading
  });
  const sphere = new THREE.Mesh(geometry, material);

  return sphere;
};

const addMoon = () => {
  moonMesh = moon();
  moonMesh.position.y = -375;
  moonMesh.receiveShadow = true;

  scene.add(moonMesh);
};


// ADD ASTEROIDS IN SPACE
// ------------------------------------------------------------------

let spaceMesh;
let numAsteroids = 30;
// 0xbda0cb
let asteroidRed = "189";
let asteroidGreen = "160";
let asteroidBlue = "203";

class Asteroid {
  constructor() {
    const geometry = new THREE.IcosahedronGeometry(20, 1);
    const material = new THREE.MeshPhongMaterial({
      color: `rgb(${asteroidRed}, ${asteroidGreen}, ${asteroidBlue})`,
      opacity: .95,
      shading: THREE.FlatShading
    });

    const sphere = new THREE.Mesh(geometry, material);

    this.sphere = sphere;
  }
}

const space = () => {
  const mesh = new THREE.Object3D();
  // 2PI for a full rotation
  const angleDistance = (Math.PI * 2) / numAsteroids;
  for (let i = 0; i < numAsteroids; i++) {
    const angle = angleDistance * i;
    const distance = 325 + (Math.random() * 300);
    const newAsteroid = new Asteroid();
    newAsteroid.sphere.position.x = Math.cos(angle) * distance;
    newAsteroid.sphere.position.y = Math.sin(angle) * distance;
    newAsteroid.sphere.position.z = Math.random() * 100;

    const size = Math.random();
    newAsteroid.sphere.scale.set(size, size, size);
    mesh.add(newAsteroid.sphere);
  }

  return mesh;
};

const addSpace = () => {
  spaceMesh = space();
  spaceMesh.position.y = -375;
  scene.add(spaceMesh);
};


// ADD ROCKET
// ------------------------------------------------------------------
let rocketMesh;

const rocket = () => {
  const mesh = new THREE.Object3D();

  // TIP
  // radius, height, radial segments
  const tipGeometry = new THREE.ConeGeometry(7, 10, 10);
  const tipMaterial = new THREE.MeshPhongMaterial({
    color: `rgb(${asteroidRed}, ${asteroidGreen}, ${asteroidBlue})`,
    opacity: .95,
    shading: THREE.FlatShading
  });
  const tip = new THREE.Mesh(tipGeometry, tipMaterial);
  mesh.add(tip);

  // BODY
  const bodyMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    opacity: .95,
    shading: THREE.FlatShading
  });

  // TOP BODY
  // rad top, rad bottom, height, radial segments
  const topBodyGeometry = new THREE.CylinderGeometry(7, 9, 11, 10);
  const topBody = new THREE.Mesh(topBodyGeometry, bodyMaterial);
  topBody.position.y = -10.5;
  mesh.add(topBody);

  // BOTTOM BODY
  const bottomBodyGeometry = new THREE.CylinderGeometry(9, 7, 11, 10);
  const bottomBody = new THREE.Mesh(bottomBodyGeometry, bodyMaterial);
  bottomBody.position.y = -21.5;
  mesh.add(bottomBody);

  // WINGS
  const wingGeometry = new THREE.BoxGeometry(5, 10, 1);
  const wingMaterial = new THREE.MeshPhongMaterial({
    color: `rgb(${asteroidRed}, ${asteroidGreen}, ${asteroidBlue})`,
    opacity: .95,
    shading: THREE.FlatShading
  });

  // TOP WING
  // width, height, depth
  const topWing = new THREE.Mesh(wingGeometry, wingMaterial);
  topWing.position.x = -10;
  topWing.position.y = -25;
  topWing.rotation.z = -Math.PI / 2 - 49.7;
  mesh.add(topWing);

  // BOTTOM WING
  const bottomWing = new THREE.Mesh(wingGeometry, wingMaterial);
  bottomWing.position.x = 10;
  bottomWing.position.y = -25;
  bottomWing.rotation.z = -Math.PI / 2 + 49.7;
  mesh.add(bottomWing);

  // LEFT WING
  const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
  leftWing.position.z = 10;
  leftWing.position.y = -25;
  leftWing.rotation.y = Math.PI / 2;
  leftWing.rotation.x = -Math.PI / 2 - 49.5;
  mesh.add(leftWing);

  // RIGHT WING
  const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
  rightWing.position.z = -10;
  rightWing.position.y = -25;
  rightWing.rotation.y = Math.PI / 2;
  rightWing.rotation.x = -Math.PI / 2 + 49.5;
  mesh.add(rightWing);

  // TAIL
  const tailGeometry = new THREE.CylinderGeometry(7, 4, 4, 10);
  const tailMaterial = new THREE.MeshPhongMaterial({
    color: `rgb(${asteroidRed}, ${asteroidGreen}, ${asteroidBlue})`,
    opacity: .95,
    shading: THREE.FlatShading
  });
  const tail = new THREE.Mesh(tailGeometry, tailMaterial);
  tail.position.y = -29;
  mesh.add(tail);

  // FIRE
  const fireGeometry = new THREE.BoxGeometry(4, 4, 4);
  const fireMaterial = new THREE.MeshPhongMaterial({
    color: `rgb(${asteroidRed}, ${asteroidGreen}, ${asteroidBlue})`,
    shading: THREE.FlatShading
  });
  const fire = new THREE.Mesh(fireGeometry, fireMaterial);
  fire.position.y = -33;
  mesh.add(fire);

  return mesh;
};

const addRocket = () => {
  rocketMesh = rocket();
  rocketMesh.rotation.z = -Math.PI / 2;
  rocketMesh.castShadow = true;
  scene.add(rocketMesh);
};

// EXHAUST
// ------------------------------------------------------------------

let exhaustArray = [];

class ExhaustPuff {
  constructor(radius, position) {
    const geometry = new THREE.DodecahedronGeometry(radius);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shading: THREE.FlatShading
    });

    this.sphere = new THREE.Mesh(geometry, material);
    this.sphere.position.x = position.x;
    this.sphere.position.y = position.y;
    this.sphere.position.z = position.z;
  }
}

const constructExhaustArray = () => {
  const rocketPosition = jQuery.extend(rocketMesh.position);
  rocketPosition.x -= 33;
  const radii = [2, 2.5, 3, 3.5, 3, 2.5, 2];
  radii.forEach(radius => {
    rocketPosition.x -= 7;
    exhaustArray.push(new ExhaustPuff(radius, rocketPosition));
  });
};

const addExhaust = () => {
  constructExhaustArray();
  exhaustArray.forEach(puff => {
    scene.add(puff.sphere);
  });
};


// HELPER METHODS
// ------------------------------------------------------------------

let speed = .007;
let rocketRotationSpeed = .015;
let mouseY = 0;
let mouseX = 0;

const updateRocketPos = () => {
  const xPos = norm(mouseX, -1, 1, -130, 130);
  const yPos = norm(mouseY, -1, 1, -50, 70);
  rocketMesh.position.x += (xPos - rocketMesh.position.x) * .1;
  rocketMesh.position.y += (yPos - rocketMesh.position.y) * .1;
  rocketMesh.rotation.z += (rocketMesh.position.y - yPos) * .0008;
};

const norm = (v, vmin, vmax, tmin, tmax) => {
  const nv = Math.max(Math.min(v, vmax), vmin);
  const dv = vmax - vmin;
  const pc = (nv - vmin) / dv;
  const dt = tmax - tmin;
  return tmin + (pc * dt);
};

const loop = () => {
  moonMesh.rotation.z += speed;
  spaceMesh.rotation.z += speed;
  rocketMesh.rotation.x += rocketRotationSpeed;
  spaceMesh.children.forEach(asteroid => {
    asteroid.rotation.y += .01;
  });

  updateRocketPos();

  renderer.render(scene, camera);
  requestAnimationFrame(loop);
};


// RENDERING
// ------------------------------------------------------------------

const initialize = () => {
  setupScene();
  setupLights();
  addMoon();
  addSpace();
  addRocket();

  // rocket follows mouse
  document.addEventListener('mousemove', event => {
    mouseX = -1 + (event.clientX / window.innerWidth) * 2;
    mouseY = 1 - (event.clientY / window.innerHeight) * 2;
  });

  loop();
};


document.addEventListener('DOMContentLoaded', () => {
  initialize();

  // EVENTS
  // ------------------------------------------------------------------
  $("#num-asteroids").on('change', event => {
    numAsteroids = parseInt(event.target.value);
    scene.remove(spaceMesh);
    addSpace();
  });

  $("#camera-zoom").on('change', event => {
    if (camera.position.z === 0) {
      camera.position.y = parseInt(event.target.value);
    } else {
      camera.position.z = parseInt(event.target.value);
    }
  });

  $("#scene-rotation-speed").on('change', event => {
    speed = parseFloat(event.target.value);
  });

  $("#rocket-rotation-speed").on('change', event => {
    rocketRotationSpeed = parseFloat(event.target.value);
  });

  $("#pov").on('change', event => {
    if (event.target.value === "1") {
      camera.position.z = 0;
      camera.position.y = 400;
      camera.rotation.x = (Math.PI / -2);
      $("#camera-zoom").val("400");
    } else {
      camera.position.z = 400;
      camera.position.y = 0;
      camera.rotation.x = 0;
      $("#camera-zoom").val("400");
    }
  });

  $("#asteroid-color-red").on('change', event => {
    asteroidRed = event.target.value;
    spaceMesh.children.forEach(asteroid => {
      asteroid.material.color = new THREE.Color(`rgb(${asteroidRed},${asteroidGreen},${asteroidBlue})`);
    });
    scene.remove(rocketMesh);
    addRocket();
  });

  $("#asteroid-color-green").on('change', event => {
    asteroidGreen = event.target.value;
    spaceMesh.children.forEach(asteroid => {
      asteroid.material.color = new THREE.Color(`rgb(${asteroidRed},${asteroidGreen},${asteroidBlue})`);
    });
    scene.remove(rocketMesh);
    addRocket();
  });

  $("#asteroid-color-blue").on('change', event => {
    asteroidBlue = event.target.value;
    spaceMesh.children.forEach(asteroid => {
      asteroid.material.color = new THREE.Color(`rgb(${asteroidRed},${asteroidGreen},${asteroidBlue})`);
    });
    scene.remove(rocketMesh);
    addRocket();
  });

  $("#moon-color-red").on('change', event => {
    moonRed = event.target.value;
    moonMesh.material.color = new THREE.Color(`rgb(${moonRed}, ${moonGreen}, ${moonBlue})`);
  })

  $("#moon-color-green").on('change', event => {
    moonGreen = event.target.value;
    moonMesh.material.color = new THREE.Color(`rgb(${moonRed}, ${moonGreen}, ${moonBlue})`);
  })

  $("#moon-color-blue").on('change', event => {
    moonBlue = event.target.value;
    moonMesh.material.color = new THREE.Color(`rgb(${moonRed}, ${moonGreen}, ${moonBlue})`);
  })

  $("#reset").on('click', event => {
    console.log("hello");
    // asteroid count
    numAsteroids = 30;
    scene.remove(spaceMesh);
    addSpace();
    $("#num-asteroids").val("30");

    // zoom
    camera.position.z = 400;
    $("#camera-zoom").val("400");

    // rocket speed
    speed = .007;
    $("#scene-rotation-speed").val(".007");

    // rocket rotation
    rocketRotationSpeed = .015;
    $("#rocket-rotation-speed").val(".015");

    // POV
    camera.position.y = 0;
    camera.rotation.x = 0;
    $("pov").val("0");

    // asteroid color
    asteroidRed = "189";
    asteroidGreen = "160";
    asteroidBlue = "203";
    spaceMesh.children.forEach(asteroid => {
      asteroid.material.color = new THREE.Color(`rgb(${asteroidRed},${asteroidGreen},${asteroidBlue})`);
    });
    scene.remove(rocketMesh);
    addRocket();
    $("#asteroid-color-red").val("189");
    $("#asteroid-color-green").val("160");
    $("#asteroid-color-blue").val("203");

    // moon color
    moonRed = "255";
    moonGreen = "255";
    moonBlue = "255";
    moonMesh.material.color = new THREE.Color(`rgb(${moonRed}, ${moonGreen}, ${moonBlue})`);
    $("#moon-color-red").val("255");
    $("#moon-color-green").val("255");
    $("#moon-color-blue").val("255");
  });

});
