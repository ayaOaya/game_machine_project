// Import necessary modules

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useRef, useEffect, useCallback } from 'react';
import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  BloomPlugin,
  GammaCorrectionPlugin,
  mobileAndTabletCheck,
} from 'webgi';

import './style.scss';

gsap.registerPlugin(ScrollTrigger);

export default function WebgiViewer() {
  const canvasRef = useRef(null);
  const viewerRef = useRef(null);

  const updateCamera = useCallback(
    (camera, position, target) => {
      // Set the camera position and target
      camera.setPosition(position);
      camera.setTarget(target);

      // Call camera.positionTargetUpdated to update the camera in the viewer
      camera.positionTargetUpdated(true);
    },
    [],
  );

  const memoizedScrollAnimation = useCallback(
    (camera, position, target) => {
      gsap.to(
        { x: position.x, y: position.y, z: position.z, tx: target.x, ty: target.y, tz: target.z },
        {
          duration: 1,
          x: 0,
          y: 0,
          z: 10,
          tx: 0,
          ty: 0,
          tz: 0,
          onUpdate: ({ x, y, z, tx, ty, tz }) => {
            updateCamera(camera, { x, y, z }, { x: tx, y: ty, z: tz });
          },
        },
      );
    },
    [updateCamera],
  );

  const setupViewer = useCallback(async () => {
    // Initialize the viewer
    const viewer = new ViewerApp({
      canvas: canvasRef.current,
    });

    // Add some plugins
    await viewer.addPlugin(AssetManagerPlugin);

    await viewer.addPlugin(GBufferPlugin);
    await viewer.addPlugin(new ProgressivePlugin(32));
    await viewer.addPlugin(new TonemapPlugin(true));
    await viewer.addPlugin(GammaCorrectionPlugin);
    await viewer.addPlugin(SSRPlugin);
    await viewer.addPlugin(SSAOPlugin);
    await viewer.addPlugin(BloomPlugin);

    // This must be called once after all plugins are added.
    viewer.renderer.refreshPipeline();

    await viewer.getPlugin(AssetManagerPlugin).addFromPath('scene.glb');

    viewer.getPlugin(TonemapPlugin).config.clipBackground = true;

    viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });

    const camera = viewer.scene.activeCamera;
    const position = camera.position.clone();
    const target = camera.target.clone();

    window.scrollTo(0, 0);

    let needsUpdate = true;

    const onUpdate = () => {
      needsUpdate = true;
      viewer.setDirty();
    };

    viewer.addEventListener('preframe', () => {
      if (needsUpdate) {
        camera.positionTargetUpdated(true);
      }
    });

    memoizedScrollAnimation(camera, position, target);

    viewerRef.current = viewer;
  }, [memoizedScrollAnimation]);

  useEffect(() => {
    setupViewer();
  }, []);

  return (
    <>
      <div className="webgiViewer-canvas-container">
        <canvas id="webgi-canvas" height={650} width={450} />
      </div>
    </>
)}