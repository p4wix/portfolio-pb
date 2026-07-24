"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

const easeOutCirc = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 4));

/* ─────────────────────────────────────────────────────────────
 * TUNING KNOBS - adjust these to frame the model how you like.
 * ───────────────────────────────────────────────────────────── */
// Zoom: smaller value = model appears BIGGER. (fraction of model size)
const ZOOM = 1.05;
// Horizontal orbit angle of the starting camera (in turns, 0-1).
const CAMERA_ANGLE = 0.2;
// Camera height - higher = more top-down view.
const CAMERA_HEIGHT = 10;
// Nudge the model within the frame after auto-centering (world units).
const OFFSET = { x: 0, y: 0.5, z: 0 };
// Gentle idle spin. Set to false to keep it still until dragged.
const AUTO_ROTATE = true;

/**
 * 3D voxel model rendered with Three.js.
 * An orthographic camera orbits into place on load with an easeOutCirc
 * animation, then hands over to OrbitControls so the model can be dragged
 * with the mouse.
 */
export function VoxelModel() {
  const refContainer = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = refContainer.current;
    if (!container) return;

    const scW = container.clientWidth;
    const scH = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(scW, scH);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    // Orbit centre - model gets auto-centered onto this after loading.
    const target = new THREE.Vector3(0, 0, 0);
    const initialCameraPosition = new THREE.Vector3(
      20 * Math.sin(CAMERA_ANGLE * Math.PI),
      CAMERA_HEIGHT,
      20 * Math.cos(CAMERA_ANGLE * Math.PI)
    );

    // Orthographic camera. Frustum starts from container height, then gets
    // refined to fit the model's real size once it has loaded.
    const scale = scH * 0.005 + 4.8;
    const camera = new THREE.OrthographicCamera(
      -scale,
      scale,
      scale,
      -scale,
      0.01,
      50000
    );
    camera.position.copy(initialCameraPosition);
    camera.lookAt(target);

    scene.add(new THREE.AmbientLight(0xffffff, 3));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 10, 7.5);
    scene.add(dirLight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.autoRotate = AUTO_ROTATE;
    controls.autoRotateSpeed = 1.2;
    controls.target = target;
    controls.enablePan = true;
    // Left mouse button rotates, right mouse button moves (pans) the camera.
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };

    const draco = new DRACOLoader();
    draco.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

    const loader = new GLTFLoader();
    loader.setDRACOLoader(draco);

    let req = 0;
    let frame = 0;

    const animate = () => {
      req = requestAnimationFrame(animate);
      frame = frame <= 100 ? frame + 1 : frame;

      if (frame <= 100) {
        const p = initialCameraPosition;
        const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 20;
        camera.position.y = 10;
        camera.position.x =
          p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
        camera.position.z =
          p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
        camera.lookAt(target);
      } else {
        controls.update();
      }

      renderer.render(scene, camera);
    };

    let disposed = false;

    loader.load(
      "/desk.glb",
      (gltf) => {
        if (disposed) return;
        const model = gltf.scene;

        // Auto-center the model on the orbit target and fit the camera to it.
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        model.position.sub(center);
        model.position.add(new THREE.Vector3(OFFSET.x, OFFSET.y, OFFSET.z));

        const maxDim = Math.max(size.x, size.y, size.z);
        const fit = maxDim * ZOOM;
        camera.left = -fit;
        camera.right = fit;
        camera.top = fit;
        camera.bottom = -fit;
        camera.updateProjectionMatrix();

        scene.add(model);
        setLoading(false);
        animate();
      },
      undefined,
      (error) => {
        console.error("Failed to load /desk.glb", error);
        if (!disposed) setLoading(false);
      }
    );

    const handleResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      disposed = true;
      cancelAnimationFrame(req);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      draco.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={refContainer}
      className="voxel-model relative mx-auto -mb-8 -mt-8 h-[220px] w-[220px] cursor-grab active:cursor-grabbing sm:-mb-16 sm:-mt-16 sm:h-[360px] sm:w-[360px] lg:-mb-20 lg:-mt-20 lg:h-[440px] lg:w-[440px]"
    >
      {loading && (
        <span
          className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--accent)]"
          aria-label="Loading 3D model"
        />
      )}
    </div>
  );
}
