import { resources } from "../../../utils/resources";
import { scene } from "../../core/scene";
import { Euler, Group, Mesh, PlaneGeometry, MeshBasicMaterial, DoubleSide } from "three";
import { getRoomMaterial } from "../../common/materials";
import { sceneWeights } from "../../../animations/scenes";
import gsap from "gsap";
import { shadow } from "./shadow";
import { desktops } from "./desktops";
import { mouse } from "./mouse";
import { messagePopup } from "./message-popup";
import { penguin } from "./penguin";
import { music } from "./music";

import type { Object3D } from "three";

const group = new Group();
const chairScrollRotation = new Euler();

let objects: {
  blackboard: Mesh;
  carpet: Mesh;
  chair: Mesh;
  frame: Mesh;
  mouse: Mesh;
  music: Mesh;
  penguin: Mesh;
  "penguin-wing-left": Mesh;
  "penguin-wing-right": Mesh;
  plant: Mesh;
  room: Mesh;
  shelf: Mesh;
} | null = null;

const init = () => {
  gsap.ticker.add(tick);
  initObjects();
  shadow.init();
  desktops.init();
  messagePopup.init();
  if (objects?.mouse) mouse.init(objects.mouse);
  if (objects?.penguin)
    penguin.init(objects.penguin, { left: objects["penguin-wing-left"], right: objects["penguin-wing-right"] });

  if (objects?.music) music.init(objects.music);
};

const initObjects = () => {
  if (objects) return;
  const resource = resources.items["room-model"];

  const penguin = resource.scene.children.find((child: Object3D) => child.name === "penguin");
  objects = {
    blackboard: resource.scene.children.find((child: Object3D) => child.name === "blackboard"),
    carpet: resource.scene.children.find((child: Object3D) => child.name === "carpet"),
    chair: resource.scene.children.find((child: Object3D) => child.name === "chair"),
    frame: resource.scene.children.find((child: Object3D) => child.name === "frame"),
    mouse: resource.scene.children.find((child: Object3D) => child.name === "mouse"),
    music: resource.scene.children.find((child: Object3D) => child.name === "music"),
    plant: resource.scene.children.find((child: Object3D) => child.name === "plant"),
    room: resource.scene.children.find((child: Object3D) => child.name === "room"),
    shelf: resource.scene.children.find((child: Object3D) => child.name === "shelf"),
    penguin,
    "penguin-wing-left": penguin.children.find((child: Object3D) => child.name === "penguin-wing-left"),
    "penguin-wing-right": penguin.children.find((child: Object3D) => child.name === "penguin-wing-right"),
  };

  console.log("Blackboard pos:", objects.blackboard?.position);
  console.log("Blackboard rot:", objects.blackboard?.rotation);

  Object.values(objects).forEach((object) => {
    if (!object) return;
    const mat = getRoomMaterial();
    object.material = mat;
    group.add(object);

    if (object.name === "carpet") {
      object.renderOrder = -10;
      object.onBeforeRender = () => {
        mat.depthWrite = false;
      };

      object.onAfterRender = () => {
        mat.depthWrite = true;
      };
    }
  });

  // Add portrait picture to the brown picture frame on the right wall
  const texture = resources.items["portrait-texture"];
  if (texture) {
    // The frame on the right wall has an inner area of roughly 1.15 x 0.95
    const planeGeo = new PlaneGeometry(1.15, 0.95);
    const planeMat = new MeshBasicMaterial({ map: texture, transparent: true, side: DoubleSide });
    const planeMesh = new Mesh(planeGeo, planeMat);

    // Frame center is at X=-2.64, Y=3.27, Z=-2.89
    // The frame's front face is at X=-2.59. We place the plane slightly in front at X=-2.58
    planeMesh.position.set(-2.58, 3.27, -2.89);
    // Rotate to face the room (+X direction)
    planeMesh.rotation.set(0, Math.PI / 2, 0);

    group.add(planeMesh);
  }

  // ── Bengali wall decorations ──
  const bengaliDecorTex = resources.items["bengali-wall-decor"];
  const tagoreTexture = resources.items["bengali-wall-left-tagore"];
  const durgaTexture  = resources.items["bengali-durga-badge"];

  // The wall face is confirmed at X ≈ -2.57 (portrait frame is at X=-2.58).
  // All planes face +X direction by rotating Y = Math.PI / 2.
  const WALL_X = -2.56; 

  if (bengaliDecorTex) {
    const panelGeo = new PlaneGeometry(0.75, 1.0);
    const panelMat = new MeshBasicMaterial({
      map: bengaliDecorTex,
      transparent: true,
      opacity: 0.92,
      side: DoubleSide,
    });

    // Panel above the frame removed as requested

    // Panel far right (further into the room)
    const panelRight = new Mesh(panelGeo, panelMat);
    panelRight.position.set(WALL_X, 3.4, -4.4);
    panelRight.rotation.set(0, Math.PI / 2, 0);
    group.add(panelRight);
  }

  // Create the graffiti wallpaper on the left side of the main back wall
  const graffitiTexture = resources.items["bengali-wall-graffiti"];
  if (graffitiTexture) {
    // Make the wallpaper massive enough to cover the entire back wall without a sharp cutoff
    const graffitiGeo = new PlaneGeometry(35, 15);
    const graffitiMat = new MeshBasicMaterial({
      map: graffitiTexture,
      transparent: false,
    });
    
    // Main back wall wallpaper
    const wallpaper = new Mesh(graffitiGeo, graffitiMat);
    // Position it so the bottom edge rests exactly at the floor (Y=0). 
    // Since height is 15, center Y should be 7.5.
    wallpaper.position.set(-2.63, 7.5, 5.0);
    wallpaper.rotation.set(0, Math.PI / 2, 0);
    group.add(wallpaper);

    // The room has a corner! Add a second wallpaper plane for the left side wall 
    // that is cutting off the main wallpaper.
    const leftWallGeo = new PlaneGeometry(15, 15);
    const leftWallpaper = new Mesh(leftWallGeo, graffitiMat);
    // Position it on the left wall (local Z ~ 5.3), extending forward from the back wall
    leftWallpaper.position.set(2.0, 7.5, 5.1);
    // Rotate to face the room (local -Z direction)
    leftWallpaper.rotation.set(0, Math.PI, 0);
    group.add(leftWallpaper);

    if (tagoreTexture) {
      // Scale it appropriately for the space above the portrait frame
      const tagoreGeo = new PlaneGeometry(0.85 * 1.5, 1.1 * 1.5);
      const tagoreMat = new MeshBasicMaterial({
        map: tagoreTexture,
        transparent: true,
        opacity: 0.94,
        side: DoubleSide,
      });
      const tagoreMesh = new Mesh(tagoreGeo, tagoreMat);
      // Place Tagore portrait directly above the portrait frame, on top of wallpaper
      tagoreMesh.position.set(-2.61, 4.8, -2.89);
      tagoreMesh.rotation.set(0, Math.PI / 2, 0); 
      group.add(tagoreMesh);
    }

    if (durgaTexture) {
      const durgaGeo = new PlaneGeometry(0.7, 0.7);
      const durgaMat = new MeshBasicMaterial({
        map: durgaTexture,
        transparent: true,
        opacity: 0.92,
        side: DoubleSide,
      });
      
      const durgaMesh1 = new Mesh(durgaGeo, durgaMat);
      // Placed near the shelf, on top of wallpaper
      durgaMesh1.position.set(-2.61, 4.8, -0.5);
      durgaMesh1.rotation.set(0, Math.PI / 2, 0);
      group.add(durgaMesh1);

      const durgaMesh2 = new Mesh(durgaGeo, durgaMat);
      // Place medallion above the far right panel, on top of wallpaper
      durgaMesh2.position.set(-2.61, 4.2, -4.3);
      durgaMesh2.rotation.set(0, Math.PI / 2, 0);
      group.add(durgaMesh2);
    }
  }
  // ────────────────────────────────────────────────────────────────────────────

  scene.instance.add(group);

};

const tick = () => {
  group.visible = sceneWeights.hero > 0.001;

  if (objects?.chair) {
    objects.chair.rotation.copy(chairScrollRotation);
  }

  penguin.tick();
  music.tick();
};

const destroy = () => {
  gsap.ticker.remove(tick);
  shadow.destroy();
  group.clear();
  objects = null;
  desktops.destroy();
  mouse.destroy();
  penguin.destroy();
  music.destroy();
};

export const room = { init, destroy, group, chairScrollRotation };
