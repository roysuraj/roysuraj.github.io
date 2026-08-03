import { resources } from "../../../utils/resources";
import { Group, Mesh, PlaneGeometry, MeshBasicMaterial, DoubleSide } from "three";
import gsap from "gsap";
import { sceneWeights } from "../../../animations/scenes";
import { scene } from "../../core/scene";
import { getContactMaterial } from "../../common/materials";
import { shadow } from "./shadow";

import type { Object3D } from "three";

const group = new Group();
group.position.set(1, -13, 0);
group.rotation.set(0, -0.8, 0);

let objects: {
  base: Mesh;
} | null = null;

const init = () => {
  initObjects();
  shadow.init();
  gsap.ticker.add(tick);
};

const initObjects = () => {
  if (objects) return;
  const resource = resources.items["contact-model"];

  objects = {
    base: resource.scene.children.find((child: Object3D) => child.name === "base"),
  };

  Object.values(objects).forEach((object) => {
    const mat = getContactMaterial();
    object.material = mat;

    group.add(object);
  });

  // ── Full Wall Bengali Graffiti & Durga Paintings behind contact ──
  const graffitiTex = resources.items["bengali-wall-graffiti"];
  const tagoreTex = resources.items["bengali-wall-left-tagore"];
  const durgaTex = resources.items["bengali-durga-badge"];

  if (graffitiTex) {
    const wallGeo = new PlaneGeometry(45, 25);
    const wallMat = new MeshBasicMaterial({ map: graffitiTex, side: DoubleSide });
    const wallMesh = new Mesh(wallGeo, wallMat);
    wallMesh.position.set(-2, 10, -5);
    wallMesh.rotation.set(0, 0.4, 0);
    group.add(wallMesh);

    if (tagoreTex) {
      const tagoreGeo = new PlaneGeometry(3.5, 4.5);
      const tagoreMat = new MeshBasicMaterial({ map: tagoreTex, transparent: true, opacity: 0.95, side: DoubleSide });
      const tagoreMesh = new Mesh(tagoreGeo, tagoreMat);
      tagoreMesh.position.set(-5, 11, -4.8);
      tagoreMesh.rotation.set(0, 0.4, 0);
      group.add(tagoreMesh);
    }

    if (durgaTex) {
      const durgaGeo = new PlaneGeometry(3, 3);
      const durgaMat = new MeshBasicMaterial({ map: durgaTex, transparent: true, opacity: 0.95, side: DoubleSide });
      const durgaMesh = new Mesh(durgaGeo, durgaMat);
      durgaMesh.position.set(4, 11, -4.8);
      durgaMesh.rotation.set(0, 0.4, 0);
      group.add(durgaMesh);
    }
  }

  scene.instance.add(group);
};

const tick = () => {
  group.visible = sceneWeights.contact > 0.001;
};

const destroy = () => {
  gsap.ticker.remove(tick);
  shadow.destroy();
};

export const contact = { init, tick, destroy, group };
