import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { CatmullRomCurve3 } from 'three';

// Seeded random for deterministic placement
const mulberry32 = (a) => {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const clamp = (v, min = 0, max = 1) => Math.max(min, Math.min(max, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function CityScene({ scrollProgress = 0 }) {
  const { camera } = useThree();
  const buildingGroupRef = useRef(null);
  const pointLightsRef = useRef([]);
  const buildingsRef = useRef([]);
  const aiEngineRef = useRef(null);

  // Camera path: aerial → dive → street level → pull back to overview
  const cameraPath = useMemo(() => {
    const posPoints = [
      new THREE.Vector3(0, 55, 40),    // 0.0 Prologue - high aerial
      new THREE.Vector3(5, 45, 32),    // Descending
      new THREE.Vector3(10, 32, 24),   // Old World overview
      new THREE.Vector3(8, 22, 18),    // Ceiling - getting closer
      new THREE.Vector3(4, 14, 12),    // Diving in
      new THREE.Vector3(-1, 8, 6),     // Street level - The Shift
      new THREE.Vector3(-2, 6, 2),     // Close to buildings - Ammunition
      new THREE.Vector3(2, 6, -2),     // Moving through - New World
      new THREE.Vector3(6, 10, -6),    // Rising up - Future
      new THREE.Vector3(4, 25, -10),   // Pulling back
      new THREE.Vector3(0, 55, 30),    // Finale - high aerial overview of NEW city
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

  // === BUILDING DATA: old layout (organic) & new layout (organized grid) ===
  const buildingData = useMemo(() => {
    const buildings = [];
    // Realistic urban palette: concrete, brick, stone, glass, steel
    const palette = [
      0x8a8a8a, // light concrete
      0x6b6b6b, // dark concrete
      0x7a6a5a, // sandstone/brownstone
      0x5a5a5a, // charcoal grey
      0x8b7d6b, // warm stone
      0x4a5a6a, // blue-grey steel
      0x6a5a4a, // brown brick
      0x9a9080, // beige/cream
      0x5a6a5a, // muted green glass
      0x7a7070, // rose grey
      0x6a7a8a, // slate blue
      0x8a8070, // taupe
    ];
    // Modern palette for new world: cleaner, brighter
    const newPalette = [
      0xa0a0a8, // polished concrete
      0x8899aa, // cool steel
      0x90a0b0, // glass blue
      0xb0a898, // warm modern
      0x889898, // teal grey
      0xa8a090, // light stone
    ];

    const placeBuildingType = (x, z, type, seed) => {
      const rng = mulberry32(seed);
      const color = palette[Math.floor(rng() * palette.length)];
      const newColor = newPalette[Math.floor(rng() * newPalette.length)];
      const baseScale = 0.8 + rng() * 0.4;
      const dist = Math.sqrt(x * x + z * z);

      const origPos = new THREE.Vector3(x, 0, z);

      // Exploded position: scatter outward and upward
      const explodedPos = new THREE.Vector3(
        x * 1.4 + (rng() - 0.5) * 8,
        rng() * 20 + 10,
        z * 1.4 + (rng() - 0.5) * 8
      );
      const explodedRot = {
        x: (rng() - 0.5) * Math.PI * 1.2,
        y: (rng() - 0.5) * Math.PI * 1.2,
        z: (rng() - 0.5) * Math.PI * 0.8,
      };

      return {
        x, z, type, color, newColor, baseScale, dist,
        origPos,
        newPos: null, // will be assigned after all buildings are created
        explodedPos, explodedRot,
        phase: rng() * Math.PI * 2,
        speed: 0.5 + rng() * 1.5,
        isModule: dist < 8,
        seed,
      };
    };

    // === OLD WORLD LAYOUT: organic, somewhat chaotic ===
    // Downtown core - dense cluster
    for (let bx = -2; bx <= 2; bx++) {
      for (let bz = -2; bz <= 2; bz++) {
        const cx = bx * 11 + (bx % 2 === 0 ? 1.5 : -1);
        const cz = bz * 11 + (bz % 2 === 0 ? -1 : 2);
        const blockDist = Math.sqrt(cx * cx + cz * cz);

        if (blockDist < 8) {
          // Core: 3 tall buildings + skyscrapers
          const offsets = [
            [-3.5, -3], [3, 0.5], [-1.5, 3.5],
          ];
          offsets.forEach((pos, i) => {
            const type = i === 0 ? 'skyscraper' : i === 1 ? 'cylinder' : 'skyscraper';
            buildings.push(placeBuildingType(cx + pos[0], cz + pos[1], type, blockDist * 1000 + i));
          });
        } else if (blockDist < 18) {
          // Midtown: 2 mixed buildings
          const offsets = [[-2.5, -2], [2.5, 2.5]];
          offsets.forEach((pos, i) => {
            const types = ['skyscraper', 'office'];
            buildings.push(placeBuildingType(cx + pos[0], cz + pos[1], types[i], blockDist * 1000 + i));
          });
        } else if (blockDist < 35) {
          // Suburbs: houses and small offices
          const offsets = [[-2, 0.5], [2.5, -0.5]];
          offsets.forEach((pos, i) => {
            const types = ['house', 'office'];
            buildings.push(placeBuildingType(cx + pos[0], cz + pos[1], types[i], blockDist * 1000 + i));
          });
        }
      }
    }

    // === NEW WORLD LAYOUT: clean organized grid ===
    // Sort buildings by type, then assign grid positions
    const typeOrder = { skyscraper: 0, cylinder: 1, office: 2, house: 3 };
    const sorted = [...buildings].sort((a, b) => {
      const typeA = typeOrder[a.type] ?? 99;
      const typeB = typeOrder[b.type] ?? 99;
      if (typeA !== typeB) return typeA - typeB;
      return b.baseScale - a.baseScale; // bigger first
    });

    // Place on a clean grid: 6 columns, uniform spacing
    const cols = 6;
    const spacing = 9;
    const offsetX = -((cols - 1) * spacing) / 2;
    const offsetZ = -((Math.ceil(sorted.length / cols) - 1) * spacing) / 2;

    sorted.forEach((b, idx) => {
      const col = idx % cols;
      const row = Math.floor(idx / cols);
      const origBuilding = buildings.find((ob) => ob.seed === b.seed);
      if (origBuilding) {
        origBuilding.newPos = new THREE.Vector3(
          offsetX + col * spacing,
          0,
          offsetZ + row * spacing
        );
      }
    });

    // Fallback: any building without newPos gets one
    buildings.forEach((b, i) => {
      if (!b.newPos) {
        b.newPos = new THREE.Vector3(
          (i % 5) * 10 - 20,
          0,
          Math.floor(i / 5) * 10 - 20
        );
      }
    });

    return buildings;
  }, []);

  // === GROUND MESH ===
  const groundMeshes = useMemo(() => {
    // Layer 1: Base ground
    const geom1 = new THREE.BufferGeometry();
    const positions1 = [];
    const colors1 = [];

    const groundColor = new THREE.Color(0.10, 0.10, 0.12); // dark asphalt
    const parkColor = new THREE.Color(0.12, 0.22, 0.10);  // dark grass

    const gridSize = 140;
    const step = 2;
    for (let x = -gridSize / 2; x < gridSize / 2; x += step) {
      for (let z = -gridSize / 2; z < gridSize / 2; z += step) {
        const x1 = x, x2 = x + step;
        const z1 = z, z2 = z + step;

        const inPark = (px, pz) => {
          const parks = [
            { cx: -25, cz: -25, r: 8 },
            { cx: 25, cz: 25, r: 8 },
            { cx: -25, cz: 25, r: 7 },
          ];
          return parks.some((p) => Math.sqrt((px - p.cx) ** 2 + (pz - p.cz) ** 2) < p.r);
        };

        const c1 = inPark(x1, z1) ? parkColor : groundColor;
        positions1.push(x1, 0, z1, x2, 0, z1, x2, 0, z2);
        colors1.push(c1.r, c1.g, c1.b, c1.r, c1.g, c1.b, c1.r, c1.g, c1.b);
        positions1.push(x1, 0, z1, x2, 0, z2, x1, 0, z2);
        colors1.push(c1.r, c1.g, c1.b, c1.r, c1.g, c1.b, c1.r, c1.g, c1.b);
      }
    }

    geom1.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions1), 3));
    geom1.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors1), 3));

    // Layer 2: Roads
    const geom2 = new THREE.BufferGeometry();
    const positions2 = [];
    const colors2 = [];
    const asphaltColor = new THREE.Color(0.06, 0.06, 0.07);   // realistic dark road
    const sidewalkColor = new THREE.Color(0.22, 0.21, 0.20);  // warm grey concrete sidewalk

    // Main roads
    const mainRoads = [
      { x1: -70, x2: 70, z: 0 },
      { x: 0, z1: -70, z2: 70 },
    ];
    mainRoads.forEach((road) => {
      if (road.z !== undefined) {
        const z = road.z, hw = 1.5;
        for (let x = road.x1; x < road.x2; x += step) {
          const xa = x, xb = x + step;
          positions2.push(xa, 0.08, z - hw, xb, 0.08, z - hw, xb, 0.08, z + hw);
          colors2.push(...asphaltColor.toArray(), ...asphaltColor.toArray(), ...asphaltColor.toArray());
          positions2.push(xa, 0.08, z - hw, xb, 0.08, z + hw, xa, 0.08, z + hw);
          colors2.push(...asphaltColor.toArray(), ...asphaltColor.toArray(), ...asphaltColor.toArray());
          // Sidewalk
          positions2.push(xa, 0.08, z - hw - 1, xb, 0.08, z - hw - 1, xb, 0.08, z - hw);
          colors2.push(...sidewalkColor.toArray(), ...sidewalkColor.toArray(), ...sidewalkColor.toArray());
          positions2.push(xa, 0.08, z - hw - 1, xb, 0.08, z - hw, xa, 0.08, z - hw);
          colors2.push(...sidewalkColor.toArray(), ...sidewalkColor.toArray(), ...sidewalkColor.toArray());
        }
      } else {
        const x = road.x, hw = 1.5;
        for (let z = road.z1; z < road.z2; z += step) {
          const za = z, zb = z + step;
          positions2.push(x - hw, 0.08, za, x - hw, 0.08, zb, x + hw, 0.08, zb);
          colors2.push(...asphaltColor.toArray(), ...asphaltColor.toArray(), ...asphaltColor.toArray());
          positions2.push(x - hw, 0.08, za, x + hw, 0.08, zb, x + hw, 0.08, za);
          colors2.push(...asphaltColor.toArray(), ...asphaltColor.toArray(), ...asphaltColor.toArray());
        }
      }
    });

    // Side streets
    const mainGridLines = [-22, -11, 0, 11, 22];
    mainGridLines.forEach((line) => {
      const hw = 0.8;
      for (let z = -70; z < 70; z += step) {
        const za = z, zb = z + step;
        positions2.push(line - hw, 0.08, za, line - hw, 0.08, zb, line + hw, 0.08, zb);
        colors2.push(...asphaltColor.toArray(), ...asphaltColor.toArray(), ...asphaltColor.toArray());
        positions2.push(line - hw, 0.08, za, line + hw, 0.08, zb, line + hw, 0.08, za);
        colors2.push(...asphaltColor.toArray(), ...asphaltColor.toArray(), ...asphaltColor.toArray());
      }
      for (let x = -70; x < 70; x += step) {
        const xa = x, xb = x + step;
        positions2.push(xa, 0.08, line - hw, xb, 0.08, line - hw, xb, 0.08, line + hw);
        colors2.push(...asphaltColor.toArray(), ...asphaltColor.toArray(), ...asphaltColor.toArray());
        positions2.push(xa, 0.08, line - hw, xb, 0.08, line + hw, xa, 0.08, line + hw);
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

    // Center dashes
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

    // Crosswalks
    [[-11, -11], [-11, 0], [-11, 11], [0, -11], [0, 0], [0, 11], [11, -11], [11, 0], [11, 11]].forEach(
      ([cx, cz]) => {
        for (let i = -2; i < 2; i += 0.4) {
          const xa = cx - 1.5, xb = cx + 1.5;
          positions3.push(xa, 0.16, cz + i, xb, 0.16, cz + i, xb, 0.16, cz + i + 0.3);
          colors3.push(...whiteColor.toArray(), ...whiteColor.toArray(), ...whiteColor.toArray());
          positions3.push(xa, 0.16, cz + i, xb, 0.16, cz + i + 0.3, xa, 0.16, cz + i + 0.3);
          colors3.push(...whiteColor.toArray(), ...whiteColor.toArray(), ...whiteColor.toArray());
        }
      }
    );

    geom3.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions3), 3));
    geom3.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors3), 3));

    return { geom1, geom2, geom3 };
  }, []);

  // Materials
  const groundMaterial = useMemo(
    () => new THREE.MeshPhongMaterial({ vertexColors: true, emissive: 0x000000 }),
    []
  );
  const markingMaterial = useMemo(
    () => new THREE.MeshPhongMaterial({ vertexColors: true, emissive: 0x444400, emissiveIntensity: 0.6 }),
    []
  );
  const buildingMaterial = useMemo(
    () => new THREE.MeshStandardMaterial({
      roughness: 0.75,
      metalness: 0.05,
    }),
    []
  );

  // === BUILD BUILDING GEOMETRY ===
  const createBuilding = (data) => {
    const group = new THREE.Group();
    group.position.copy(data.origPos);
    group.userData = data;

    // Creates a full facade of windows on one face of a building
    const addWindowGrid = (parent, faceWidth, faceHeight, faceY, faceZ, faceSide, seed, cols, rows) => {
      const rng = mulberry32(seed);
      const winW = (faceWidth * 0.8) / cols;
      const winH = (faceHeight * 0.7) / rows;
      const startX = -(cols - 1) * winW * 0.55;
      const startY = faceY - faceHeight * 0.35;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const rv = rng();
          let color;
          if (rv < 0.35) color = 0xffe8a0;     // warm interior
          else if (rv < 0.55) color = 0xffd070;  // golden
          else if (rv < 0.7) color = 0xa0d0ff;   // cool fluorescent
          else if (rv < 0.8) color = 0x70b0ff;   // blue office
          else color = 0x181820;                  // dark / unlit

          const w = new THREE.Mesh(
            new THREE.BoxGeometry(faceSide === 'x' ? 0.05 : winW * 0.85, winH * 0.82, faceSide === 'x' ? winW * 0.85 : 0.05),
            new THREE.MeshBasicMaterial({ color })
          );
          if (faceSide === 'z+') {
            w.position.set(startX + c * winW * 1.1, startY + r * winH * 1.15, faceZ);
          } else if (faceSide === 'z-') {
            w.position.set(startX + c * winW * 1.1, startY + r * winH * 1.15, -faceZ);
          } else if (faceSide === 'x+') {
            w.position.set(faceZ, startY + r * winH * 1.15, startX + c * winW * 1.1);
          } else {
            w.position.set(-faceZ, startY + r * winH * 1.15, startX + c * winW * 1.1);
          }
          parent.add(w);
        }
      }
    };

    const addLedge = (parent, width, depth, y, color) => {
      const ledge = new THREE.Mesh(
        new THREE.BoxGeometry(width + 0.4, 0.25, depth + 0.4),
        buildingMaterial.clone()
      );
      ledge.material.color.setHex(color);
      ledge.position.y = y;
      parent.add(ledge);
    };

    // Ground floor storefront — every building gets a lit ground level
    const addGroundFloor = (parent, width, depth, color) => {
      // Front storefront
      const sf = new THREE.Mesh(
        new THREE.BoxGeometry(width * 0.9, 1.8, 0.06),
        new THREE.MeshBasicMaterial({ color: 0xffe8a0 })
      );
      sf.position.set(0, 1.0, depth / 2 + 0.03);
      parent.add(sf);
      // Back side lit
      const sb = new THREE.Mesh(
        new THREE.BoxGeometry(width * 0.7, 1.4, 0.06),
        new THREE.MeshBasicMaterial({ color: 0xffd070 })
      );
      sb.position.set(0, 0.9, -(depth / 2 + 0.03));
      parent.add(sb);
    };

    if (data.type === 'skyscraper') {
      const { baseScale, color } = data;
      const h1 = 14 * baseScale, h2 = 9 * baseScale, h3 = 5 * baseScale;
      const w = 4.5 * baseScale, d = 3.5 * baseScale;
      const totalH = h1 + h2 + h3;

      // Base section
      const base = new THREE.Mesh(new THREE.BoxGeometry(w, h1, d), buildingMaterial.clone());
      base.material.color.setHex(color);
      base.castShadow = true;
      base.position.y = h1 / 2;
      group.add(base);

      // Ground floor storefront
      addGroundFloor(group, w, d, color);

      // Ledge at base/shaft transition
      addLedge(group, w, d, h1, color);

      // Windows on ALL 4 faces of the base
      addWindowGrid(group, w, h1 - 2.5, h1 / 2 + 1.5, d / 2 + 0.03, 'z+', data.seed, 4, 6);
      addWindowGrid(group, w, h1 - 2.5, h1 / 2 + 1.5, d / 2 + 0.03, 'z-', data.seed + 1000, 4, 6);
      addWindowGrid(group, d, h1 - 2.5, h1 / 2 + 1.5, w / 2 + 0.03, 'x+', data.seed + 2000, 3, 6);
      addWindowGrid(group, d, h1 - 2.5, h1 / 2 + 1.5, w / 2 + 0.03, 'x-', data.seed + 3000, 3, 6);

      // Middle shaft (setback)
      const sw = w * 0.78, sd = d * 0.82;
      const shaft = new THREE.Mesh(new THREE.BoxGeometry(sw, h2, sd), buildingMaterial.clone());
      shaft.material.color.setHex(color);
      shaft.castShadow = true;
      shaft.position.y = h1 + h2 / 2 + 0.3;
      group.add(shaft);

      // Shaft windows
      addWindowGrid(group, sw, h2 - 1, h1 + h2 / 2 + 0.5, sd / 2 + 0.03, 'z+', data.seed + 4000, 3, 4);
      addWindowGrid(group, sw, h2 - 1, h1 + h2 / 2 + 0.5, sd / 2 + 0.03, 'z-', data.seed + 5000, 3, 4);

      addLedge(group, sw, sd, h1 + h2 + 0.3, color);

      // Crown
      const crown = new THREE.Mesh(new THREE.BoxGeometry(w * 0.5, h3, d * 0.5), buildingMaterial.clone());
      crown.material.color.setHex(color);
      crown.castShadow = true;
      crown.position.y = h1 + h2 + h3 / 2 + 0.8;
      group.add(crown);

      // Crown windows
      addWindowGrid(group, w * 0.5, h3 - 1, h1 + h2 + h3 / 2 + 1, d * 0.25 + 0.03, 'z+', data.seed + 6000, 2, 2);

      // Antenna + blinking light
      const rng = mulberry32(data.seed + 1);
      if (rng() > 0.35) {
        const antenna = new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.1, 3.5, 6),
          new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0.5, roughness: 0.4 })
        );
        antenna.position.y = totalH + 2.5;
        group.add(antenna);

        const light = new THREE.Mesh(
          new THREE.SphereGeometry(0.2, 6, 6),
          new THREE.MeshBasicMaterial({ color: 0xff0000 })
        );
        light.position.y = totalH + 4.2;
        light.userData.isAntenna = true;
        group.add(light);
      }

      // Rooftop equipment
      if (rng() > 0.25) {
        for (let i = 0; i < 3; i++) {
          const ac = new THREE.Mesh(
            new THREE.BoxGeometry(0.5 + rng() * 0.3, 0.35, 0.5 + rng() * 0.3),
            new THREE.MeshStandardMaterial({ color: 0x666666, roughness: 0.8 })
          );
          ac.position.set((i - 1) * 0.9, totalH + 1, (rng() - 0.5) * 1);
          group.add(ac);
        }
      }
    } else if (data.type === 'office') {
      const { baseScale, color } = data;
      const h = 9 * baseScale;
      const w = 5.5 * baseScale, d = 3.5 * baseScale;

      const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), buildingMaterial.clone());
      body.material.color.setHex(color);
      body.castShadow = true;
      body.position.y = h / 2;
      group.add(body);

      // Ground floor storefront
      addGroundFloor(group, w, d, color);

      // Awning
      const rngA = mulberry32(data.seed + 77);
      const awningColor = rngA() > 0.5 ? 0x2a4a2a : 0x5a2a2a;
      const awning = new THREE.Mesh(
        new THREE.BoxGeometry(w + 0.3, 0.12, 0.8),
        new THREE.MeshStandardMaterial({ color: awningColor, roughness: 0.9 })
      );
      awning.position.set(0, 2.2, d / 2 + 0.4);
      group.add(awning);

      // Windows on all 4 sides
      addWindowGrid(group, w, h - 3, h / 2 + 1.8, d / 2 + 0.03, 'z+', data.seed + 100, 5, 4);
      addWindowGrid(group, w, h - 3, h / 2 + 1.8, d / 2 + 0.03, 'z-', data.seed + 200, 5, 4);
      addWindowGrid(group, d, h - 3, h / 2 + 1.8, w / 2 + 0.03, 'x+', data.seed + 300, 3, 4);
      addWindowGrid(group, d, h - 3, h / 2 + 0.03, w / 2 + 0.03, 'x-', data.seed + 400, 3, 4);

      // Parapet/cornice
      addLedge(group, w, d, h, color);

      // Rooftop water tank
      const rng2 = mulberry32(data.seed + 5);
      if (rng2() > 0.4) {
        const tank = new THREE.Mesh(
          new THREE.CylinderGeometry(0.45, 0.45, 1.4, 8),
          new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.7 })
        );
        tank.position.set(1.2, h + 0.9, 0);
        group.add(tank);
      }
    } else if (data.type === 'cylinder') {
      const { baseScale, color } = data;
      const h = 12 * baseScale;
      const r = 2.2 * baseScale;

      const body = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.02, h, 20), buildingMaterial.clone());
      body.material.color.setHex(color);
      body.castShadow = true;
      body.position.y = h / 2;
      group.add(body);

      // Floor ledge rings (concrete/metal)
      for (let i = 1; i <= 5; i++) {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(r + 0.15, 0.1, 8, 32),
          new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.3, roughness: 0.5 })
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.y = (h / 5.5) * i;
        group.add(ring);
      }

      // Window strips (vertical) — denser, covering facade
      for (let a = 0; a < 10; a++) {
        const angle = (a / 10) * Math.PI * 2;
        const rng = mulberry32(data.seed + a * 111);
        const stripColor = rng() < 0.5 ? 0xffe8a0 : (rng() < 0.7 ? 0xa0d0ff : 0x181820);
        const strip = new THREE.Mesh(
          new THREE.BoxGeometry(r * 0.35, h * 0.75, 0.05),
          new THREE.MeshBasicMaterial({ color: stripColor })
        );
        strip.position.set(
          Math.cos(angle) * (r + 0.03),
          h * 0.45,
          Math.sin(angle) * (r + 0.03)
        );
        strip.rotation.y = -angle;
        group.add(strip);
      }

      // Ground level entrance
      const entrance = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 2, 0.06),
        new THREE.MeshBasicMaterial({ color: 0xffe8a0 })
      );
      entrance.position.set(0, 1, r + 0.03);
      group.add(entrance);

      // Dome cap
      const rng3 = mulberry32(data.seed + 2);
      if (rng3() > 0.35) {
        const dome = new THREE.Mesh(
          new THREE.SphereGeometry(r, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2),
          buildingMaterial.clone()
        );
        dome.material.color.setHex(color);
        dome.position.y = h;
        group.add(dome);
      }
    } else if (data.type === 'house') {
      const { baseScale, color } = data;
      const h = 3.5 * baseScale;
      const w = 3.5 * baseScale, d = 3 * baseScale;

      const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), buildingMaterial.clone());
      body.material.color.setHex(color);
      body.castShadow = true;
      body.position.y = h / 2;
      group.add(body);

      // Pitched roof
      const roof = new THREE.Mesh(
        new THREE.ConeGeometry(w * 0.75, 2.5 * baseScale, 4),
        buildingMaterial.clone()
      );
      roof.material.color.setHex(0x6a4a3a);
      roof.rotation.y = Math.PI / 4;
      roof.position.y = h + 1.25 * baseScale;
      group.add(roof);

      // Windows — 2 front, 1 side
      addWindowGrid(group, w, h - 1.5, h / 2 + 0.5, d / 2 + 0.03, 'z+', data.seed + 100, 2, 2);
      addWindowGrid(group, d, h - 1.5, h / 2 + 0.5, w / 2 + 0.03, 'x+', data.seed + 200, 2, 2);

      // Door
      const door = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 1.4, 0.06),
        new THREE.MeshBasicMaterial({ color: 0xffe0a0 })
      );
      door.position.set(0, 0.7, d / 2 + 0.03);
      group.add(door);

      // Chimney
      const rng4 = mulberry32(data.seed + 3);
      if (rng4() > 0.4) {
        const chimney = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 1.8, 0.4),
          new THREE.MeshStandardMaterial({ color: 0x8a5a4a, roughness: 0.9 })
        );
        chimney.position.set(0.8, h + 1.5 * baseScale, -0.5);
        group.add(chimney);
      }
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
    const positions = [
      [-30, -30], [-20, -25], [25, 30], [30, 25], [-25, 20],
      [28, -15], [-28, 10], [15, -28], [20, 18], [-15, -10],
      [-35, 5], [35, -5], [10, 35], [-10, -35],
    ];
    return positions.map(([x, z]) => ({ position: new THREE.Vector3(x, 0, z) }));
  }, []);

  // Street lights
  const streetLights = useMemo(() => {
    const positions = [
      [-40, 0], [-20, 0], [0, 0], [20, 0], [40, 0],
      [0, -40], [0, -20], [0, 20], [0, 40],
      [-11, -11], [11, 11], [-11, 11], [11, -11],
    ];
    return positions.map(([x, z]) => ({ position: new THREE.Vector3(x, 0, z) }));
  }, []);

  // AI Engine
  const aiEngine = useMemo(() => {
    const group = new THREE.Group();
    group.position.set(0, 8, 0);
    group.visible = false;

    const octaGeom = new THREE.OctahedronGeometry(1.5);
    const wireGeo = new THREE.WireframeGeometry(octaGeom);
    const wireframe = new THREE.LineSegments(
      wireGeo,
      new THREE.LineBasicMaterial({ color: 0x60c0ff, transparent: true, opacity: 0.8 })
    );
    group.add(wireframe);

    const innerOcta = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.6),
      new THREE.MeshBasicMaterial({ color: 0x80d0ff, transparent: true, opacity: 0.6 })
    );
    group.add(innerOcta);

    // Orbital rings
    [
      { innerR: 2.2, outerR: 2.4, rotX: Math.PI * 0.3, rotZ: 0 },
      { innerR: 2.8, outerR: 2.9, rotX: 0, rotZ: Math.PI * 0.4 },
    ].forEach(({ innerR, outerR, rotX, rotZ }) => {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(innerR, outerR, 32),
        new THREE.MeshBasicMaterial({ color: 0x40a0ff, side: THREE.DoubleSide })
      );
      ring.rotation.x = rotX;
      ring.rotation.z = rotZ;
      group.add(ring);
    });

    // Data nodes
    for (let i = 0; i < 8; i++) {
      const node = new THREE.Mesh(
        new THREE.BoxGeometry(0.25, 0.25, 0.25),
        new THREE.MeshBasicMaterial({ color: 0x60c0ff })
      );
      node.userData.orbitIndex = i;
      group.add(node);
    }

    // Point light
    const light = new THREE.PointLight(0x40a0ff, 0, 35);
    group.add(light);

    return group;
  }, []);

  // === MAIN ANIMATION LOOP ===
  const tempVec = useRef(new THREE.Vector3());
  const tempLookAt = useRef(new THREE.Vector3());

  useFrame((state) => {
    const { camera } = state;
    const t = state.clock.elapsedTime;

    // Camera
    cameraPath.posCurve.getPoint(scrollProgress, tempVec.current);
    camera.position.lerp(tempVec.current, 0.05);
    cameraPath.lookAtCurve.getPoint(scrollProgress, tempLookAt.current);
    camera.lookAt(tempLookAt.current);

    // Fog — subtle atmospheric haze
    state.scene.fog.density = 0.006 - (camera.position.y / 120) * 0.002;

    // === KEY ANIMATION PHASES ===
    // Phase 1: Explosion (0.34 → 0.48)
    const explodeProgress = easeInOutCubic(clamp((scrollProgress - 0.34) / 0.14));
    // Phase 2: Reassembly into NEW layout (0.68 → 0.82)
    const reassembleProgress = easeInOutCubic(clamp((scrollProgress - 0.68) / 0.14));
    // Are we in the "new world" (post-reassembly)?
    const inNewWorld = scrollProgress > 0.82;
    // Are we in the "exploded/floating" state?
    const isExploded = scrollProgress >= 0.48 && scrollProgress < 0.68;

    // Building animations
    buildingsRef.current.forEach(({ mesh, data }) => {
      if (explodeProgress > 0 && explodeProgress < 1 && reassembleProgress === 0) {
        // Phase 1: Exploding from old positions
        mesh.position.lerpVectors(data.origPos, data.explodedPos, explodeProgress);
        mesh.rotation.x = data.explodedRot.x * explodeProgress;
        mesh.rotation.y = data.explodedRot.y * explodeProgress;
        mesh.rotation.z = data.explodedRot.z * explodeProgress;
      } else if (isExploded) {
        // Floating in exploded state with gentle drift
        mesh.position.copy(data.explodedPos);
        mesh.position.y += Math.sin(t * data.speed * 0.5 + data.phase) * 1.5;
        mesh.position.x += Math.sin(t * 0.3 + data.phase) * 0.5;
        mesh.rotation.x = data.explodedRot.x + Math.sin(t * 0.2 + data.phase) * 0.1;
        mesh.rotation.y = data.explodedRot.y + t * 0.05;
        mesh.rotation.z = data.explodedRot.z + Math.cos(t * 0.15 + data.phase) * 0.1;
      } else if (reassembleProgress > 0 && reassembleProgress < 1) {
        // Phase 2: Reassembling into NEW positions
        mesh.position.lerpVectors(data.explodedPos, data.newPos, reassembleProgress);
        mesh.rotation.x = data.explodedRot.x * (1 - reassembleProgress);
        mesh.rotation.y = data.explodedRot.y * (1 - reassembleProgress);
        mesh.rotation.z = data.explodedRot.z * (1 - reassembleProgress);
      } else if (inNewWorld) {
        // In the new world: settled at new positions with gentle bob
        mesh.position.copy(data.newPos);
        mesh.position.y += Math.sin(t * data.speed * 0.3 + data.phase) * 0.15;
        mesh.rotation.set(0, 0, 0);
      } else {
        // Old world: original positions with subtle float
        mesh.position.copy(data.origPos);
        mesh.position.y += Math.sin(t * data.speed + data.phase) * 0.2;
        mesh.rotation.set(0, 0, 0);
      }

      // Antenna blinking
      mesh.children.forEach((child) => {
        if (child.userData.isAntenna) {
          child.material.color.setHex(Math.sin(t * 5) > 0 ? 0xff0000 : 0x330000);
        }
      });
    });

    // Building group slow rotation
    if (buildingGroupRef.current) {
      buildingGroupRef.current.rotation.y =
        Math.sin(t * 0.08) * 0.03 + scrollProgress * 0.15;
    }

    // AI Engine visibility & animation
    if (aiEngineRef.current) {
      const showAI = scrollProgress > 0.36 && scrollProgress < 0.78;
      aiEngineRef.current.visible = showAI;

      if (showAI) {
        aiEngineRef.current.rotation.x += 0.004;
        aiEngineRef.current.rotation.y += 0.006;

        const children = aiEngineRef.current.children;
        // Inner octa pulse
        if (children[1]) {
          const s = 0.6 + Math.sin(t * 1.5) * 0.2;
          children[1].scale.set(s, s, s);
        }
        // Ring rotations
        if (children[2]) children[2].rotation.x += 0.003;
        if (children[3]) children[3].rotation.z -= 0.004;

        // Orbit nodes
        for (let i = 0; i < 8; i++) {
          const node = children[4 + i];
          if (node) {
            const angle = t * 0.4 + (i / 8) * Math.PI * 2;
            node.position.x = Math.cos(angle) * 3;
            node.position.z = Math.sin(angle) * 3;
            node.position.y = Math.sin(angle * 0.7) * 0.8;
          }
        }

        // Point light
        if (children[12]) {
          children[12].intensity = 0.5 + explodeProgress * 2;
        }
      }
    }

    // Drifting point lights
    pointLightsRef.current.forEach((light, i) => {
      if (light) {
        light.position.x += Math.sin(t * (0.0005 + i * 0.0002)) * 0.01;
        light.position.z += Math.cos(t * (0.0005 + i * 0.0002)) * 0.01;
      }
    });
  });

  return (
    <>
      <color attach="background" args={['#08080c']} />
      <fog attach="fog" args={['#08080c', 0.1, 150]} />

      {/* Lighting — neutral night, let building colors show through */}
      <ambientLight color={0xffffff} intensity={0.35} />
      {/* Key light — near-white moonlight, slightly warm */}
      <directionalLight color={0xf0f0f0} intensity={0.7} position={[15, 40, 20]} castShadow shadow-mapSize={[1024, 1024]} />
      {/* Warm fill from below — simulates city light bounce */}
      <directionalLight color={0xffc080} intensity={0.2} position={[-5, -3, 5]} />
      {/* Cool fill from opposite side for depth */}
      <directionalLight color={0xd0d8e0} intensity={0.2} position={[-15, 20, -10]} />
      {/* Hemisphere: warm ground (city glow), cool sky */}
      <hemisphereLight skyColor={0x202030} groundColor={0x3a2a18} intensity={0.4} />

      {/* Warm area lights — like city ambient glow */}
      <pointLight
        ref={(el) => { if (el) pointLightsRef.current[0] = el; }}
        color={0xffd090} intensity={0.7} distance={60} position={[15, 15, 10]}
      />
      <pointLight
        ref={(el) => { if (el) pointLightsRef.current[1] = el; }}
        color={0xffe0a0} intensity={0.5} distance={50} position={[-15, 12, -10]}
      />
      {/* Extra warm spots at street level */}
      <pointLight color={0xffc870} intensity={0.4} distance={30} position={[0, 5, 0]} />
      <pointLight color={0xffd090} intensity={0.3} distance={25} position={[-20, 5, 15]} />
      <pointLight color={0xffe0a0} intensity={0.3} distance={25} position={[20, 5, -15]} />

      {/* Ground layers */}
      <mesh geometry={groundMeshes.geom1} material={groundMaterial} />
      <mesh geometry={groundMeshes.geom2} material={groundMaterial} />
      <mesh geometry={groundMeshes.geom3} material={markingMaterial} />

      {/* Buildings */}
      <group ref={buildingGroupRef} />

      {/* Trees */}
      {trees.map((tree, i) => (
        <group key={`tree-${i}`} position={[tree.position.x, tree.position.y, tree.position.z]}>
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.2, 0.35, 2.5, 8]} />
            <meshStandardMaterial color={0x4a3828} roughness={0.9} />
          </mesh>
          <mesh position={[0, 3, 0]}>
            <sphereGeometry args={[1.4, 8, 8]} />
            <meshStandardMaterial color={0x1a3a1a} roughness={0.85} />
          </mesh>
        </group>
      ))}

      {/* Street lights */}
      {streetLights.map((sl, i) => (
        <group key={`sl-${i}`} position={[sl.position.x, sl.position.y, sl.position.z]}>
          <mesh position={[0, 2, 0]}>
            <cylinderGeometry args={[0.12, 0.18, 4, 6]} />
            <meshStandardMaterial color={0x3a3a3a} metalness={0.4} roughness={0.6} />
          </mesh>
          <mesh position={[1.5, 4, 0]}>
            <cylinderGeometry args={[0.08, 0.06, 1.5, 6]} />
            <meshStandardMaterial color={0x3a3a3a} metalness={0.4} roughness={0.6} />
          </mesh>
          <mesh position={[2.2, 4, 0]}>
            <sphereGeometry args={[0.3, 8, 8]} />
            <meshBasicMaterial color={0xffeebb} />
          </mesh>
          <pointLight color={0xffd090} intensity={0.3} distance={20} position={[2.2, 4, 0]} />
        </group>
      ))}

      {/* AI Engine */}
      <primitive object={aiEngine} ref={aiEngineRef} />
    </>
  );
}
