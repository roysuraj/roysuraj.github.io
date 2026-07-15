const THREE = require('three');

// Define camera parameters based on src/three/core/camera.ts and src/animations/waypoints-data.ts
const cameraPosition = new THREE.Vector3(0, 4.5, 15.5);
const cameraFocus = new THREE.Vector3(0, 2.2, 6);

const camera = new THREE.PerspectiveCamera(38, 1920 / 1080, 0.01, 100);
camera.position.copy(cameraPosition);
camera.lookAt(cameraFocus);
camera.updateMatrixWorld();

// Define room group transform based on src/animations/transitions/about.ts
const roomGroup = new THREE.Group();
roomGroup.position.set(4.5, 5.7, 0);
roomGroup.rotation.set(0.1, -2.3, 0.09);
roomGroup.scale.set(0.85, 0.85, 0.85);
roomGroup.updateMatrixWorld();

// Define points
const points = {
  details: new THREE.Vector3(-2.0, 4.2, 6.75),
  description: new THREE.Vector3(-2.2, 1.2, 6.75),
  services: new THREE.Vector3(2.2, 2.75, 6.75)
};

const vw = 1920;
const vh = 1080;

console.log("Calculated screen coordinates (centered, from -vw/2 to vw/2):");
for (const [name, point] of Object.entries(points)) {
  const worldPoint = point.clone();
  roomGroup.localToWorld(worldPoint);
  
  const projected = worldPoint.clone();
  projected.project(camera);
  
  const screenX = projected.x * vw * 0.5;
  const screenY = -projected.y * vh * 0.5;
  
  const absoluteX = vw * 0.5 + screenX;
  const absoluteY = vh * 0.5 + screenY;
  
  console.log(`- ${name}:`);
  console.log(`  Local: ${point.x}, ${point.y}, ${point.z}`);
  console.log(`  World: ${worldPoint.x.toFixed(2)}, ${worldPoint.y.toFixed(2)}, ${worldPoint.z.toFixed(2)}`);
  console.log(`  Centered Screen: x = ${screenX.toFixed(1)}, y = ${screenY.toFixed(1)}`);
  console.log(`  Absolute Screen: x = ${absoluteX.toFixed(1)}, y = ${absoluteY.toFixed(1)}`);
}
