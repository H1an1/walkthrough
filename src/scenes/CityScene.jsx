import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { CatmullRomCurve3 } from 'three';

// Seeded random for deterministic placement
const mulberry32 = (a) => {
  return function() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
};

const clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(max, v));

// Building placement utility
const seededRandom = (seed) => {
  const rng = mulberry32(seed);
  return rng();
};

export default function CityScene({ scrollProgress = 0 }) {
  const { camera } = useThree();
  const buildingGroupRef = useRef(null);
  const pointLightsRef = useRef([]);
  const buildingsRef = useRef([]);
  const aiEngineRef = useRef(null);

  // Create curve for camera path
  const cameraPath = useMemo(() => {
    const posPoints = [
      new THREE.Vector3(0, 50, 35),
      new THREE.Vector3(5, 40, 30),
      new THREE.Vector3(8, 30, 22),
      new THREE.Vector3(6, 20, 16),
      new THREE.Vector3(3, 12, 10),
      new THREE.Vector3(-1, 7, 6),
      new THREE.Vector3(-2, 5, 3),
      new THREE.Vector3(2, 5, -1),
      new THREE.Vector3(5, 8, -5),
      new THREE.Vector3(4, 20, -8),
      new THREE.Vector3(0, 45, 22),
    ];
    const lookAtPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -2),
      new THREE.Vector3(0, 2, -3),
      new THREE.Vector3(0, 3, -2),
      new THREE.Vector3(0, 4, 0),
      new THREE.Vector3(0, 5, 0),
      new THREE.Vector3(0, 4, 0),
      new THREE.Vector3(0, 4, 0),
      new THREE.Vector3(0, 3, 0),
      new THREE.Vector3(0, 2, 0),
      new THREE.Vector3(0, 0, 0),
    ];
    return {
      posCurve: new CatmullRomCurve3(posPoints),
      lookAtCurve: new CatmullRomCurve3(lookAtPoints),
    };
  }, []);

  // Building data
  const buildingData = useMemo(() => {
    const buildings = [];
    const palette = [
      0x4a4570, 0x3e3e65, 0x454268, 0x4d4875, 0x403d60,
      0x3a3860, 0x534e7a, 0x48446d, 0x5a5585,
    ];

    const placeBuildingType = (x, z, type, seed) => {
      const rng = mulberry32(seed);
      const color = palette[Math.floor(rng() * palette.length)];
      const baseScale = 0.8 + rng() * 0.4;
      const dist = Math.sqrt(x * x + z * z);

      const origPos = new THREE.Vector3(x, 0, z);
      const explodedPos = new THREE.Vector3(
        x * 1.3 + (rng() - 0.5) * 2,
        rng() * 15 + 8,
        z * 1.3 + (rng() - 0.5) * 2,
      );
      const explodedRot = {
        x: (rng() - 0.5) * Math.PI,
        y: (rng() - 0.5) * Math.PI,
        z: (rng() - 0.5) * Math.PI,
      };

      return {
        x, z, type, color, baseScale, dist,
        origPos, explodedPos, explodedRot,
        phase: rng() * Math.PI * 2,
        speed: 0.5 + rng() * 1.5,
        isModule: dist < 5,
        seed,
      };
    };

    // Downtown: 3 buildings per block, skyscrapers + cylinders
    for (let bx = -2; bx <= 2; bx++) {
      for (let bz = -2; bz <= 2; bz++) {
        const cx = bx * 11;
        const cz = bz * 11;
        const blockDist = Math.sqrt(cx * cx + cz * cz);

        if (blockDist < 6) {
          // 3 buildings
          const positions = [
            [cx - 3, cz - 3],
            [cx + 3, cz],
            [cx - 2, cz + 3],
          ];
          positions.forEach((pos, i) => {
            const type = i % 2 === 0 ? 'skyscraper' : 'cylinder';
            buildings.push(placeBuildingType(pos[0], pos[1], type, blockDist * 1000 + i));
          });
        } else if (blockDist < 16) {
          // Midtown: 2 buildings
          const positions = [[cx - 2, cz - 2], [cx + 2, cz + 2]];
          positions.forEach((pos, i) => {
            const types = ['skyscraper', 'office'];
            buildings.push(placeBuildingType(pos[0], pos[1], types[i], blockDist * 1000 + i));
          });
        } else if (blockDist < 35) {
          // Suburbs: 2 buildings
          const positions = [[cx - 2, cz], [cx + 2, cz]];
          positions.forEach((pos, i) => {
            const types = ['house', 'office'];
            buildings.push(placeBuildingType(pos[0], pos[1], types[i], blockDist * 1000 + i));
          });
        }
      }
    }

    return buildings;
  }, []);

  // Ground meshes
  const groundMeshes = useMemo(() => {
    // Layer 1: Base ground plane with parks
    const geom1 = new THREE.BufferGeometry();
    const positions1 = [];
    const colors1 = [];

    const groundColor = new THREE.Color(0.12, 0.12, 0.18);
    const parkColor = new THREE.Color(0.2, 0.35, 0.18);

    // Grid of quads
    const gridSize = 140;
    const step = 2;
    for (let x = -gridSize / 2; x < gridSize / 2; x += step) {
      for (let z = -gridSize / 2; z < gridSize / 2; z += step) {
        const x1 = x, x2 = x + step;
        const z1 = z, z2 = z + step;
        
        // Determine if in park
        const inPark = (px, pz) => {
          const parks = [
            { cx: -25, cz: -25, r: 8 },
            { cx: 25, cz: 25, r: 8 },
            { cx: -25, cz: 25, r: 7 },
          ];
          return parks.some(p => Math.sqrt((px - p.cx) ** 2 + (pz - p.cz) ** 2) < p.r);
        };

        const c1 = inPark(x1, z1) ? parkColor : groundColor;
        const c2 = inPark(x2, z1) ? parkColor : groundColor;
        const c3 = inPark(x2, z2) ? parkColor : groundColor;
        const c4 = inPark(x1, z2) ? parkColor : groundColor;

        // Triangle 1
        positions1.push(x1, 0, z1, x2, 0, z1, x2, 0, z2);
        colors1.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b, c3.r, c3.g, c3.b);
        // Triangle 2
        positions1.push(x1, 0, z1, x2, 0, z2, x1, 0, z2);
        colors1.push(c1.r, c1.g, c1.b, c3.r, c3.g, c3.b, c4.r, c4.g, c4.b);
      }
    }

    geom1.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions1), 3));
    geom1.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors1), 3));

    // Layer 2: Roads
    const geom2 = new THREE.BufferGeometry();
    const positions2 = [];
    const colors2 = [];

    const asphaltColor = new THREE.Color(0.025, 0.025, 0.04);
    const sidewalkColor = new THREE.Color(0.15, 0.15, 0.22);

    // Main roads (width 3)
    const mainRoads = [
      { x1: -70, x2: 70, z: 0 },
      { x: 0, z1: -70, z2: 70 },
    ];
    mainRoads.forEach((road) => {
      if (road.z !== undefined) {
        const z = road.z, hw = 1.5;
        for (let x = road.x1; x < road.x2; x += step) {
          const x1 = x, x2 = x + step;
          // Road
          positions2.push(x1, 0.08, z - hw, x2, 0.08, z - hw, x2, 0.08, z + hw);
          colors2.push(...asphaltColor.toArray(), ...asphaltColor.toArray(), ...asphaltColor.toArray());
          positions2.push(x1, 0.08, z - hw, x2, 0.08, z + hw, x1, 0.08, z + hw);
          colors2.push(...asphaltColor.toArray(), ...asphaltColor.toArray(), ...asphaltColor.toArray());
          // Sidewalks
          positions2.push(x1, 0.08, z - hw - 1, x2, 0.08, z - hw - 1, x2, 0.08, z - hw);
          colors2.push(...sidewalkColor.toArray(), ...sidewalkColor.toArray(), ...sidewalkColor.toArray());
          positions2.push(x1, 0.08, z - hw - 1, x2, 0.08, z - hw, x1, 0.08, z - hw);
          colors2.push(...sidewalkColor.toArray(), ...sidewalkColor.toArray(), ...sidewalkColor.toArray());
        }
      } else {
        const x = road.x, hw = 1.5;
        for (let z = road.z1; z < road.z2; z += step) {
          const z1 = z, z2 = z + step;
          positions2.push(x - hw, 0.08, z1, x - hw, 0.08, z2, x + hw, 0.08, z2);
          colors2.push(...asphaltColor.toArray(), ...asphaltColor.toArray(), ...asphaltColor.toArray());
          positions2.push(x - hw, 0.08, z1, x + hw, 0.08, z2, x + hw, 0.08, z1);
          colors2.push(...asphaltColor.toArray(), ...asphaltColor.toArray(), ...asphaltColor.toArray());
        }
      }
    });

    // Side streets
    const mainGridLines = [-22, -11, 0, 11, 22];
    mainGridLines.forEach((line) => {
      const hw = 0.8;
      // Vertical streets
      for (let z = -70; z < 70; z += step) {
        const z1 = z, z2 = z + step;
        positions2.push(line - hw, 0.08, z1, line - hw, 0.08, z2, line + hw, 0.08, z2);
        colors2.push(...asphaltColor.toArray(), ...asphaltColor.toArray(), ...asphaltColor.toArray());
        positions2.push(line - hw, 0.08, z1, line + hw, 0.08, z2, line + hw, 0.08, z1);
        colors2.push(...asphaltColor.toArray(), ...asphaltColor.toArray(), ...asphaltColor.toArray());
      }
      // Horizontal streets
      for (let x = -70; x < 70; x += step) {
        const x1 = x, x2 = x + step;
        positions2.push(x1, 0.08, line - hw, x2, 0.08, line - hw, x2, 0.08, line + hw);
        colors2.push(...asphaltColor.toArray(), ...asphaltColor.toArray(), ...asphaltColor.toArray());
        positions2.push(x1, 0.08, line - hw, x2, 0.08, line + hw, x1, 0.08, line + hw);
        colors2.push(...asphaltColor.toArray(), ...asphaltColor.toArray(), ...asphaltColor.toArray());
      }
    });

    geom2.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions2), 3));
    geom2.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors2), 3));

    // Layer 3: Markings
    const geom3 = new THREE.BufferGeometry();
    const positions3 = [];
    const colors3 = [];

    const yellowColor = new THREE.Color(1, 1, 0.3);
    const whiteColor = new THREE.Color(1, 1, 1);

    // Center dashes on main roads
    [-70, -55, -40, -25, -10, 5, 20, 35, 50, 65].forEach((x) => {
      positions3.push(x, 0.16, -1.5, x + 3, 0.16, -1.5, x + 3, 0.16, -0.5);
      colors3.push(...yellowColor.toArray(), ...yellowColor.toArray(), ...yellowColor.toArray());
      positions3.push(x, 0.16, -1.5, x + 3, 0.16, -0.5, x, 0.16, -0.5);
      colors3.push(...yellowColor.toArray(), ...yellowColor.toArray(), ...yellowColor.toArray());
    });

    [-70, -55, -40, -25, -10, 5, 20, 35, 50, 65].forEach((z) => {
      positions3.push(-1.5, 0.16, z, -0.5, 0.16, z, -0.5, 0.16, z + 3);
      colors3.push(...yellowColor.toArray(), ...yellowColor.toArray(), ...yellowColor.toArray());
      positions3.push(-1.5, 0.16, z, -0.5, 0.16, z + 3, -1.5, 0.16, z + 3);
      colors3.push(...yellowColor.toArray(), ...yellowColor.toArray(), ...yellowColor.toArray());
    });

    // Crosswalks at intersections
    [[-11, -11], [-11, 0], [-11, 11], [0, -11], [0, 0], [0, 11], [11, -11], [11, 0], [11, 11]].forEach(
      ([cx, cz]) => {
        // Horizontal stripes
        for (let i = -2; i < 2; i += 0.4) {
          const x1 = cx - 1.5, x2 = cx + 1.5;
          positions3.push(x1, 0.16, cz + i, x2, 0.16, cz + i, x2, 0.16, cz + i + 0.3);
          colors3.push(...whiteColor.toArray(), ...whiteColor.toArray(), ...whiteColor.toArray());
          positions3.push(x1, 0.16, cz + i, x2, 0.16, cz + i + 0.3, x1, 0.16, cz + i + 0.3);
          colors3.push(...whiteColor.toArray(), ...whiteColor.toArray(), ...whiteColor.toArray());
        }
      }
    );

    geom3.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions3), 3));
    geom3.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors3), 3));

    return { geom1, geom2, geom3 };
  }, []);

  // Material for ground
  const groundMaterial = useMemo(
    () => new THREE.MeshPhongMaterial({ vertexColors: true, emissive: 0x000000 }),
    []
  );

  // Material for markings (with emissive glow)
  const markingMaterial = useMemo(
    () => new THREE.MeshPhongMaterial({
      vertexColors: true,
      emissive: 0x444400,
      emissiveIntensity: 0.6,
    }),
    []
  );

  // Building material
  const buildingMaterial = useMemo(
    () => new THREE.MeshPhysicalMaterial({
      roughness: 0.15,
      metalness: 0.1,
      clearcoat: 0.35,
      transparent: true,
      opacity: 0.88,
    }),
    []
  );

  // Function to create a building
  const createBuilding = (data) => {
    const group = new THREE.Group();
    group.position.copy(data.origPos);
    group.userData = data;

    if (data.type === 'skyscraper') {
      const { baseScale, color } = data;
      const h1 = 12 * baseScale, h2 = 8 * baseScale, h3 = 4 * baseScale;

      // Base section
      const base = new THREE.Mesh(
        new THREE.BoxGeometry(4 * baseScale, h1, 3 * baseScale),
        buildingMaterial.clone()
      );
      base.material.color.setHex(color);
      base.castShadow = true;
      base.position.y = h1 / 2;
      group.add(base);

      // Windows on base
      for (let x = -1; x < 2; x++) {
        for (let z = -0.5; z < 1; z++) {
          for (let y = 1; y < 5; y++) {
            const rng = mulberry32(data.seed + x * 100 + z * 1000 + y * 10000);
            const windowType = Math.floor(rng() * 3);
            let emissive = 0x1a1a2a;
            let intensity = 0.1;
            if (windowType === 0) {
              emissive = 0xfff0c8;
              intensity = 1.0;
            } else if (windowType === 1) {
              emissive = 0xc8e0ff;
              intensity = 0.7;
            }

            const windowGeom = new THREE.BoxGeometry(0.25, 0.55, 0.04);
            const windowMat = new THREE.MeshBasicMaterial({
              color: emissive,
              emissive,
              emissiveIntensity: intensity,
            });
            const window = new THREE.Mesh(windowGeom, windowMat);
            window.position.set(
              x * 1.2,
              h1 / 2 - 5 + y * 2,
              z * 1.5 + 1.5
            );
            group.add(window);
          }
        }
      }

      // Middle shaft
      const shaft = new THREE.Mesh(
        new THREE.BoxGeometry(3 * baseScale, h2, 2.5 * baseScale),
        buildingMaterial.clone()
      );
      shaft.material.color.setHex(color);
      shaft.castShadow = true;
      shaft.position.y = h1 + h2 / 2 + 0.5;
      group.add(shaft);

      // Crown/setback
      const crown = new THREE.Mesh(
        new THREE.BoxGeometry(2 * baseScale, h3, 1.5 * baseScale),
        buildingMaterial.clone()
      );
      crown.material.color.setHex(color);
      crown.castShadow = true;
      crown.position.y = h1 + h2 + h3 / 2 + 1;
      group.add(crown);

      // Antenna
      if (seededRandom(data.seed + 1) > 0.5) {
        const antenna = new THREE.Mesh(
          new THREE.CylinderGeometry(0.15, 0.15, 3, 8),
          new THREE.MeshBasicMaterial({ color: 0x333333 })
        );
        antenna.position.y = h1 + h2 + h3 + 1.5;
        group.add(antenna);

        const light = new THREE.Mesh(
          new THREE.SphereGeometry(0.3, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0xff0000, emissive: 0xff0000 })
        );
        light.position.y = h1 + h2 + h3 + 3;
        light.userData.isAntenna = true;
        group.add(light);
      }
    } else if (data.type === 'office') {
      const { baseScale, color } = data;
      const h = 8 * baseScale;

      // Main body
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(5 * baseScale, h, 3 * baseScale),
        buildingMaterial.clone()
      );
      body.material.color.setHex(color);
      body.castShadow = true;
      body.position.y = h / 2;
      group.add(body);

      // Glass storefront
      const storefront = new THREE.Mesh(
        new THREE.BoxGeometry(5 * baseScale, 2, 0.1),
        new THREE.MeshBasicMaterial({
          color: 0xfff0c8,
          emissive: 0xfff0c8,
          emissiveIntensity: 0.8,
        })
      );
      storefront.position.y = 1;
      storefront.position.z = 1.5;
      group.add(storefront);

      // Windows grid
      for (let x = -1; x < 2; x++) {
        for (let z = -0.5; z < 1; z++) {
          for (let y = 2; y < 4; y++) {
            const windowGeom = new THREE.BoxGeometry(0.3, 0.5, 0.04);
            const windowMat = new THREE.MeshBasicMaterial({
              color: 0xc8e0ff,
              emissive: 0xc8e0ff,
              emissiveIntensity: 0.6,
            });
            const window = new THREE.Mesh(windowGeom, windowMat);
            window.position.set(
              x * 1.5,
              2 + y * 1.5,
              z * 1.2 + 1.5
            );
            group.add(window);
          }
        }
      }

      // Parapet
      const parapet = new THREE.Mesh(
        new THREE.BoxGeometry(5.5 * baseScale, 0.5, 3.5 * baseScale),
        buildingMaterial.clone()
      );
      parapet.material.color.setHex(color);
      parapet.position.y = h + 0.25;
      group.add(parapet);
    } else if (data.type === 'cylinder') {
      const { baseScale, color } = data;
      const h = 10 * baseScale;
      const r = 2 * baseScale;

      // Main cylinder
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(r, r, h, 12),
        buildingMaterial.clone()
      );
      body.material.color.setHex(color);
      body.castShadow = true;
      body.position.y = h / 2;
      group.add(body);

      // Glowing torus rings at floors
      for (let i = 1; i < 4; i++) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(r + 0.3, 0.2, 8, 32),
          new THREE.MeshBasicMaterial({
            color: 0x9d5eff,
            emissive: 0x9d5eff,
            emissiveIntensity: 0.8,
          })
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.y = (h / 3.5) * i;
        group.add(ring);
      }

      // Top dome/cap
      if (seededRandom(data.seed + 2) > 0.5) {
        const dome = new THREE.Mesh(
          new THREE.SphereGeometry(r, 12, 6),
          buildingMaterial.clone()
        );
        dome.material.color.setHex(color);
        dome.scale.y = 0.5;
        dome.position.y = h + 0.5;
        group.add(dome);
      }
    } else if (data.type === 'house') {
      const { baseScale, color } = data;

      // Body
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(3 * baseScale, 3 * baseScale, 2.5 * baseScale),
        buildingMaterial.clone()
      );
      body.material.color.setHex(color);
      body.castShadow = true;
      body.position.y = 1.5 * baseScale;
      group.add(body);

      // Roof
      const roof = new THREE.Mesh(
        new THREE.ConeGeometry(2 * baseScale, 2 * baseScale, 4),
        buildingMaterial.clone()
      );
      roof.material.color.setHex(0x3a2a4a);
      roof.position.y = 3 * baseScale + 1;
      group.add(roof);

      // Window
      const window = new THREE.Mesh(
        new THREE.BoxGeometry(0.4, 0.4, 0.04),
        new THREE.MeshBasicMaterial({
          color: 0xfff0c8,
          emissive: 0xfff0c8,
          emissiveIntensity: 0.8,
        })
      );
      window.position.set(-0.5, 2 * baseScale, 1.3 * baseScale);
      group.add(window);

      // Door
      const door = new THREE.Mesh(
        new THREE.BoxGeometry(0.6, 1, 0.04),
        new THREE.MeshBasicMaterial({
          color: 0xc8e0ff,
          emissive: 0xc8e0ff,
          emissiveIntensity: 0.7,
        })
      );
      door.position.set(0.6, 1, 1.3 * baseScale);
      group.add(door);
    }

    return group;
  };

  // Create all buildings
  useEffect(() => {
    if (!buildingGroupRef.current) return;
    buildingGroupRef.current.clear();
    buildingsRef.current = [];

    buildingData.forEach((data) => {
      const building = createBuilding(data);
      buildingGroupRef.current.add(building);
      buildingsRef.current.push({ mesh: building, data });
    });
  }, [buildingData]);

  // Trees
  const trees = useMemo(() => {
    const treePositions = [
      [-30, -30],
      [-20, -25],
      [25, 30],
      [30, 25],
      [-25, 20],
      [28, -15],
      [-28, 10],
      [15, -28],
      [20, 18],
      [-15, -10],
    ];

    return treePositions.map(([x, z]) => ({
      position: new THREE.Vector3(x, 0, z),
    }));
  }, []);

  // Street lights
  const lights = useMemo(() => {
    const lightPositions = [
      [-40, 0], [-20, 0], [0, 0], [20, 0], [40, 0],
      [0, -40], [0, -20], [0, 20], [0, 40],
    ];

    return lightPositions.map(([x, z]) => ({
      position: new THREE.Vector3(x, 0, z),
    }));
  }, []);

  // Animation frame
  const tempVec = useRef(new THREE.Vector3());
  const tempLookAt = useRef(new THREE.Vector3());

  useFrame((state) => {
    const { camera } = state;

    // Camera movement
    cameraPath.posCurve.getPoint(scrollProgress, tempVec.current);
    camera.position.lerp(tempVec.current, 0.05);

    cameraPath.lookAtCurve.getPoint(scrollProgress, tempLookAt.current);
    camera.lookAt(tempLookAt.current);

    // Fog density based on height
    state.scene.fog.density = 0.007 - (camera.position.y / 100) * 0.003;

    // Explosion animation
    const explodeProgress = clamp((scrollProgress - 0.34) / 0.14);
    const reassembleProgress = clamp((scrollProgress - 0.72) / 0.14);

    // Building animations
    buildingsRef.current.forEach(({ mesh, data }) => {
      if (explodeProgress > 0 && explodeProgress < 1) {
        // Exploding
        mesh.position.lerpVectors(
          data.origPos,
          data.explodedPos,
          explodeProgress
        );
        mesh.rotation.x = data.explodedRot.x * explodeProgress;
        mesh.rotation.y = data.explodedRot.y * explodeProgress;
        mesh.rotation.z = data.explodedRot.z * explodeProgress;
      } else if (reassembleProgress > 0 && reassembleProgress < 1) {
        // Reassembling
        mesh.position.lerpVectors(
          data.explodedPos,
          data.origPos,
          reassembleProgress
        );
        mesh.rotation.x = data.explodedRot.x * (1 - reassembleProgress);
        mesh.rotation.y = data.explodedRot.y * (1 - reassembleProgress);
        mesh.rotation.z = data.explodedRot.z * (1 - reassembleProgress);
      } else if (explodeProgress === 0 && reassembleProgress === 0) {
        // Floating
        mesh.position.copy(data.origPos);
        mesh.position.y += Math.sin(state.clock.elapsedTime * data.speed + data.phase) * 0.3;
        mesh.rotation.set(0, 0, 0);
      }

      // Antenna blinking
      mesh.children.forEach((child) => {
        if (child.userData.isAntenna) {
          child.material.emissiveIntensity = Math.sin(state.clock.elapsedTime * 5) > 0 ? 1 : 0.3;
        }
      });
    });

    // Building group rotation
    if (buildingGroupRef.current) {
      buildingGroupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.05 + scrollProgress * 0.2;
    }

    // AI Engine animation
    if (aiEngineRef.current && explodeProgress > 0.3) {
      aiEngineRef.current.visible = true;
      aiEngineRef.current.rotation.x += 0.005;
      aiEngineRef.current.rotation.y += 0.008;
      aiEngineRef.current.rotation.z += 0.003;
    }

    // Drifting point lights
    pointLightsRef.current.forEach((light, i) => {
      const speed = 0.0005 + i * 0.0002;
      light.position.x += Math.sin(state.clock.elapsedTime * speed) * 0.01;
      light.position.z += Math.cos(state.clock.elapsedTime * speed) * 0.01;
    });
  });

  // AI Engine component
  const aiEngine = useMemo(() => {
    const group = new THREE.Group();
    group.position.set(0, 6, 0);
    group.visible = false;

    // Wireframe octahedron
    const octaGeom = new THREE.OctahedronGeometry(1.2);
    const wireGeo = new THREE.WireframeGeometry(octaGeom);
    const wireframe = new THREE.LineSegments(wireGeo, new THREE.LineBasicMaterial({ color: 0xc4b5fd, transparent: true, opacity: 0 }));
    group.add(wireframe);

    // Solid inner octahedron
    const innerOcta = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.5),
      new THREE.MeshBasicMaterial({
        color: 0xc4b5fd,
        transparent: true,
        opacity: 0,
      })
    );
    group.add(innerOcta);

    // Orbital rings
    const ring1 = new THREE.Mesh(
      new THREE.RingGeometry(1.8, 2, 32),
      new THREE.MeshBasicMaterial({
        color: 0x9d5eff,
        emissive: 0x9d5eff,
        emissiveIntensity: 0.6,
        side: THREE.DoubleSide,
      })
    );
    ring1.rotation.x = Math.PI * 0.3;
    group.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.RingGeometry(2.2, 2.3, 32),
      new THREE.MeshBasicMaterial({
        color: 0x9d5eff,
        emissive: 0x9d5eff,
        emissiveIntensity: 0.4,
        side: THREE.DoubleSide,
      })
    );
    ring2.rotation.z = Math.PI * 0.4;
    group.add(ring2);

    // Data nodes
    for (let i = 0; i < 6; i++) {
      const node = new THREE.Mesh(
        new THREE.BoxGeometry(0.3, 0.3, 0.3),
        new THREE.MeshBasicMaterial({
          color: 0xc4b5fd,
          emissive: 0xc4b5fd,
          emissiveIntensity: 0.9,
        })
      );
      node.userData.orbitIndex = i;
      group.add(node);
    }

    // Point light
    const light = new THREE.PointLight(0x9d5eff, 0, 30);
    group.add(light);

    return group;
  }, []);

  // Update AI engine
  useFrame((state) => {
    if (aiEngineRef.current && aiEngineRef.current.visible) {
      const children = aiEngineRef.current.children;
      const explodeProgress = clamp((scrollProgress - 0.34) / 0.14);

      // Find inner octahedron and scale it
      if (children[1]) {
        children[1].scale.set(
          0.6 + Math.sin(state.clock.elapsedTime) * 0.2,
          0.6 + Math.sin(state.clock.elapsedTime) * 0.2,
          0.6 + Math.sin(state.clock.elapsedTime) * 0.2
        );
      }

      // Rotate rings
      if (children[2]) children[2].rotation.x += 0.003;
      if (children[3]) children[3].rotation.z -= 0.004;

      // Orbit nodes
      const nodeStart = 4;
      for (let i = 0; i < 6; i++) {
        if (children[nodeStart + i]) {
          const node = children[nodeStart + i];
          const angle = (state.clock.elapsedTime * 0.3 + (i / 6) * Math.PI * 2);
          node.position.x = Math.cos(angle) * 2.5;
          node.position.z = Math.sin(angle) * 2.5;
          node.position.y = Math.sin(angle * 0.5) * 0.5;
        }
      }

      // Light intensity based on visibility
      if (children[10]) {
        children[10].intensity = 0.5 + explodeProgress * 1.5;
      }
    }
  });

  return (
    <>
      <color attach="background" args={['#0e0e1a']} />
      <fog attach="fog" args={['#0e0e1a', 0.1, 150]} />

      {/* Lighting */}
      <ambientLight color={0x2a2540} intensity={1.2} />
      <directionalLight
        color={0xe0e4ff}
        intensity={0.8}
        position={[15, 40, 20]}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight color={0x8a7aed} intensity={0.35} position={[-15, 20, -10]} />
      <hemisphereLight skyColor={0x3a2a60} groundColor={0x1a1530} intensity={0.6} />

      {/* Point lights - drifting */}
      <pointLight
        ref={(el) => {
          if (el && pointLightsRef.current[0] !== el) {
            pointLightsRef.current[0] = el;
          }
        }}
        color={0xc4b5fd}
        intensity={0.8}
        distance={55}
        position={[15, 20, 10]}
      />
      <pointLight
        ref={(el) => {
          if (el && pointLightsRef.current[1] !== el) {
            pointLightsRef.current[1] = el;
          }
        }}
        color={0xf0c4e2}
        intensity={0.5}
        distance={45}
        position={[-15, 15, -10]}
      />

      {/* Ground layers */}
      <mesh geometry={groundMeshes.geom1} material={groundMaterial} />
      <mesh geometry={groundMeshes.geom2} material={groundMaterial} />
      <mesh geometry={groundMeshes.geom3} material={markingMaterial} />

      {/* Buildings */}
      <group ref={buildingGroupRef} />

      {/* Trees */}
      {trees.map((tree, i) => (
        <group key={`tree-${i}`} position={[tree.position.x, tree.position.y, tree.position.z]}>
          <mesh geometry={new THREE.CylinderGeometry(0.3, 0.5, 2, 8)} material={new THREE.MeshPhongMaterial({ color: 0x4a3a2a })} position={[0, 1, 0]} />
          <mesh geometry={new THREE.SphereGeometry(1.2, 8, 8)} material={new THREE.MeshPhongMaterial({ color: 0x2d5a2d })} position={[0, 3, 0]} />
        </group>
      ))}

      {/* Street lights */}
      {lights.map((light, i) => (
        <group key={`light-${i}`} position={[light.position.x, light.position.y, light.position.z]}>
          <mesh geometry={new THREE.CylinderGeometry(0.2, 0.2, 4, 8)} material={new THREE.MeshPhongMaterial({ color: 0x333333 })} position={[0, 2, 0]} />
          <mesh geometry={new THREE.CylinderGeometry(0.15, 0.1, 1.5, 8)} material={new THREE.MeshPhongMaterial({ color: 0x333333 })} position={[2, 4, 0]} />
          <mesh
            geometry={new THREE.SphereGeometry(0.4, 8, 8)}
            material={new THREE.MeshBasicMaterial({ color: 0xfffacd, emissive: 0xfffacd, emissiveIntensity: 0.9 })}
            position={[2.5, 4, 0]}
          />
          <pointLight color={0xfffacd} intensity={0.3} distance={20} position={[2.5, 4, 0]} />
        </group>
      ))}

      {/* AI Engine */}
      <primitive
        object={aiEngine}
        ref={aiEngineRef}
      />
    </>
  );
}
