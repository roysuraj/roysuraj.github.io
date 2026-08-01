const canvas = document.getElementById('bg-canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
const loader = new THREE.TextureLoader();

renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
camera.position.z = 5.6;

const bridge = new THREE.Group();
scene.add(bridge);

const span = new THREE.Mesh(
  new THREE.TorusGeometry(2.55, 0.035, 8, 120, Math.PI),
  new THREE.MeshBasicMaterial({ color: 0xffb36b })
);
span.rotation.z = Math.PI;
span.position.y = -1.2;
bridge.add(span);

for (let i = -9; i <= 9; i++) {
  const tower = new THREE.Mesh(
    new THREE.BoxGeometry(0.12, 1.4 + Math.abs(i) * 0.05, 0.12),
    new THREE.MeshBasicMaterial({ color: i % 3 ? 0x7ee6d7 : 0xffb36b })
  );
  tower.position.set(i * 0.55, -1.2 + Math.abs(i) * 0.02, -2.2);
  bridge.add(tower);
}

const particles = new THREE.Points(
  new THREE.BufferGeometry().setFromPoints(
    Array.from({ length: 180 }, () => new THREE.Vector3((Math.random() - 0.5) * 16, (Math.random() - 0.5) * 10, -Math.random() * 8))
  ),
  new THREE.PointsMaterial({ color: 0xffffff, size: 0.03, transparent: true, opacity: 0.5 })
);
scene.add(particles);

loader.load('images/personalPortfolio.jpg', (texture) => {
  texture.colorSpace = THREE.SRGBColorSpace;
  const portrait = new THREE.Mesh(
    new THREE.PlaneGeometry(2.0, 2.6),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.18 })
  );
  portrait.position.set(2.8, 0.1, -1.4);
  scene.add(portrait);
});

function animate() {
  requestAnimationFrame(animate);
  const max = Math.max(1, document.body.scrollHeight - innerHeight);
  const s = scrollY / max;
  bridge.position.y = 0.2 - s * 1.6;
  bridge.rotation.y = Math.sin(s * Math.PI * 2) * 0.08;
  bridge.rotation.z = Math.sin(s * Math.PI) * 0.035;
  particles.rotation.y += 0.0007;
  renderer.render(scene, camera);
}

addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
});

animate();
