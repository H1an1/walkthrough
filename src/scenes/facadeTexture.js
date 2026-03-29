import * as THREE from 'three';

// Seeded random
const mulberry32 = (a) => {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = t + Math.imul(t ^ (t >>> 7), 61 | t) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/**
 * Generate a realistic building facade texture using Canvas2D.
 *
 * @param {number} widthM  - facade width in meters
 * @param {number} heightM - facade height in meters
 * @param {number} baseColor - hex color (0xRRGGBB)
 * @param {number} seed
 * @param {object} opts
 *   - floors: number of floors
 *   - windowsPerFloor: windows per floor
 *   - style: 'modern' | 'brick' | 'glass'
 *   - hasGroundFloor: draw storefront on bottom floor
 *   - hasDoor: draw a door (for houses)
 */
export function generateFacadeTexture(widthM, heightM, baseColor, seed, opts = {}) {
  const {
    floors = Math.max(1, Math.round(heightM / 3.2)),
    windowsPerFloor = Math.max(1, Math.round(widthM / 1.8)),
    style = 'modern',
    hasGroundFloor = true,
    hasDoor = false,
  } = opts;

  const PX = 42; // pixels per meter
  const W = Math.max(48, Math.round(widthM * PX));
  const H = Math.max(48, Math.round(heightM * PX));

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  const rng = mulberry32(seed);

  const cr = (baseColor >> 16) & 0xff;
  const cg = (baseColor >> 8) & 0xff;
  const cb = baseColor & 0xff;

  // ---- BASE WALL ----
  ctx.fillStyle = `rgb(${cr},${cg},${cb})`;
  ctx.fillRect(0, 0, W, H);

  // Subtle noise for concrete / plaster texture
  const noiseCount = Math.round(W * H * 0.04);
  for (let i = 0; i < noiseCount; i++) {
    const nx = rng() * W;
    const ny = rng() * H;
    const v = (rng() - 0.5) * 28;
    const a = 0.04 + rng() * 0.04;
    ctx.fillStyle = `rgba(${(128 + v) | 0},${(128 + v) | 0},${(128 + v) | 0},${a})`;
    ctx.fillRect(nx, ny, 1 + rng() * 3, 1 + rng() * 3);
  }

  // ---- BRICK PATTERN (for brick style) ----
  if (style === 'brick') {
    const bH = 5;
    const bW = 12;
    const rows = Math.ceil(H / bH);
    for (let row = 0; row < rows; row++) {
      const off = (row % 2) * (bW / 2);
      const cols = Math.ceil(W / bW) + 2;
      for (let col = -1; col < cols; col++) {
        const bx = col * bW + off;
        const by = row * bH;
        // Mortar lines (lighter than brick)
        ctx.fillStyle = `rgba(${Math.max(0, cr - 20)},${Math.max(0, cg - 20)},${Math.max(0, cb - 20)},0.55)`;
        ctx.fillRect(bx, by, 1, bH);
        ctx.fillRect(bx, by, bW, 1);
        // Brick color variation
        const bv = (rng() - 0.5) * 22;
        ctx.fillStyle = `rgba(${Math.min(255, Math.max(0, cr + bv)) | 0},${Math.min(255, Math.max(0, cg + bv)) | 0},${Math.min(255, Math.max(0, cb + bv)) | 0},0.22)`;
        ctx.fillRect(bx + 1, by + 1, bW - 2, bH - 2);
      }
    }
  }

  // ---- HORIZONTAL FLOOR BANDS / SPANDREL ----
  const floorH = H / floors;
  for (let f = 1; f < floors; f++) {
    const y = f * floorH;
    // Dark band (shadow under floor slab)
    ctx.fillStyle = 'rgba(0,0,0,0.12)';
    ctx.fillRect(0, y - 1, W, 3);
    // Highlight (top of floor slab)
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fillRect(0, y + 2, W, 1);
  }

  // ---- WINDOW GRID ----
  const marginX = W * 0.1;
  const cellW = (W - marginX * 2) / Math.max(windowsPerFloor, 1);
  const baseWinW = style === 'glass' ? cellW * 0.82 : cellW * 0.55;
  const baseWinH = style === 'glass' ? floorH * 0.72 : floorH * 0.50;
  const winTopOffset = floorH * 0.18;

  for (let f = 0; f < floors; f++) {
    const fy = f * floorH;
    const isGF = hasGroundFloor && f === floors - 1;

    for (let c = 0; c < windowsPerFloor; c++) {
      let ww = baseWinW;
      let wh = baseWinH;
      let wy = fy + winTopOffset;
      const wx = marginX + c * cellW + (cellW - ww) / 2;

      if (isGF) {
        wh = floorH * 0.72;
        wy = fy + floorH * 0.12;
        ww = baseWinW * 1.15;
      }

      // Door on ground floor center (for houses)
      if (hasDoor && f === floors - 1 && c === Math.floor(windowsPerFloor / 2)) {
        const dw = cellW * 0.42;
        const dh = floorH * 0.65;
        const dx = marginX + c * cellW + (cellW - dw) / 2;
        const dy = fy + floorH - dh - 2;
        ctx.fillStyle = `rgb(${Math.max(0, cr - 40)},${Math.max(0, cg - 30)},${Math.max(0, cb - 20)})`;
        ctx.fillRect(dx - 1, dy - 1, dw + 2, dh + 2);
        ctx.fillStyle = '#3a2a18';
        ctx.fillRect(dx, dy, dw, dh);
        // Door handle
        ctx.fillStyle = '#c0a040';
        ctx.fillRect(dx + dw * 0.75, dy + dh * 0.5, 2, 3);
        // Transom window above door
        ctx.fillStyle = '#2a3a50';
        ctx.fillRect(dx + 2, dy + 2, dw - 4, dh * 0.15);
        continue;
      }

      // ---- Window recess shadow (depth illusion) ----
      ctx.fillStyle = 'rgba(0,0,0,0.28)';
      ctx.fillRect(wx - 3, wy - 2, ww + 5, wh + 5);

      // ---- Window frame ----
      ctx.fillStyle = `rgb(${(cr * 0.5) | 0},${(cg * 0.5) | 0},${(cb * 0.5) | 0})`;
      ctx.fillRect(wx - 1.5, wy - 1.5, ww + 3, wh + 3);

      // ---- Glass ----
      const rv = rng();
      let glassColor;
      if (isGF) {
        // Storefront: warm, inviting
        glassColor = rv < 0.55 ? '#ffe8a0' : '#ffd070';
      } else if (style === 'glass') {
        // Curtain wall: mostly reflective dark blue
        if (rv < 0.30) glassColor = '#1a2a42';
        else if (rv < 0.52) glassColor = '#243850';
        else if (rv < 0.68) glassColor = '#ffe0a0';
        else if (rv < 0.80) glassColor = '#ffd080';
        else glassColor = '#0e1820';
      } else {
        // Standard windows: mix of lit/unlit
        if (rv < 0.20) glassColor = '#1e2e48';
        else if (rv < 0.38) glassColor = '#2a3a58';
        else if (rv < 0.52) glassColor = '#ffe8a0';
        else if (rv < 0.62) glassColor = '#ffd070';
        else if (rv < 0.72) glassColor = '#90c0e0';
        else glassColor = '#0c0c16';
      }
      ctx.fillStyle = glassColor;
      ctx.fillRect(wx, wy, ww, wh);

      // ---- Glass reflection highlight (subtle) ----
      if (style === 'glass' || rng() < 0.3) {
        const grad = ctx.createLinearGradient(wx, wy, wx + ww, wy + wh);
        grad.addColorStop(0, 'rgba(255,255,255,0.12)');
        grad.addColorStop(0.5, 'rgba(255,255,255,0)');
        grad.addColorStop(1, 'rgba(255,255,255,0.05)');
        ctx.fillStyle = grad;
        ctx.fillRect(wx, wy, ww, wh);
      }

      // ---- Mullions (window dividers) ----
      const frameColor = `rgba(${(cr * 0.4) | 0},${(cg * 0.4) | 0},${(cb * 0.4) | 0},0.6)`;
      if (ww > 14) {
        ctx.fillStyle = frameColor;
        ctx.fillRect(wx + ww / 2 - 0.5, wy, 1, wh);
      }
      if (wh > 22 && style !== 'glass') {
        ctx.fillStyle = frameColor;
        ctx.fillRect(wx, wy + wh * 0.42, ww, 1);
      }

      // ---- Window sill ----
      ctx.fillStyle = `rgba(${Math.min(255, cr + 22)},${Math.min(255, cg + 22)},${Math.min(255, cb + 22)},0.45)`;
      ctx.fillRect(wx - 2, wy + wh, ww + 4, 2.5);
    }
  }

  // ---- TOP CORNICE ----
  ctx.fillStyle = `rgba(${Math.min(255, cr + 15)},${Math.min(255, cg + 15)},${Math.min(255, cb + 15)},0.55)`;
  ctx.fillRect(0, 0, W, 5);
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  ctx.fillRect(0, 5, W, 2);

  // ---- BOTTOM GROUND LINE ----
  ctx.fillStyle = 'rgba(0,0,0,0.18)';
  ctx.fillRect(0, H - 3, W, 3);

  // ---- Vertical pilaster hints (for modern/brick, not glass) ----
  if (style !== 'glass' && widthM > 3) {
    ctx.fillStyle = 'rgba(0,0,0,0.04)';
    ctx.fillRect(0, 0, 3, H);
    ctx.fillRect(W - 3, 0, 3, H);
    if (widthM > 5) {
      ctx.fillRect(W / 2 - 1, 0, 2, H);
    }
  }

  // ---- AWNING strip for ground floor (commercial buildings) ----
  if (hasGroundFloor && !hasDoor) {
    const awningY = (floors - 1) * floorH - 2;
    const awningColors = ['#2a4a2a', '#4a2a2a', '#2a2a4a', '#3a3a2a'];
    ctx.fillStyle = awningColors[(seed % awningColors.length)];
    ctx.fillRect(4, awningY, W - 8, 4);
    // Awning shadow below
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(4, awningY + 4, W - 8, 3);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = 4;
  return tex;
}

/**
 * Generate a bump map canvas matching the facade layout.
 * Bright = raised, Dark = recessed.
 */
export function generateBumpTexture(widthM, heightM, seed, opts = {}) {
  const {
    floors = Math.max(1, Math.round(heightM / 3.2)),
    windowsPerFloor = Math.max(1, Math.round(widthM / 1.8)),
    style = 'modern',
  } = opts;

  const PX = 42;
  const W = Math.max(48, Math.round(widthM * PX));
  const H = Math.max(48, Math.round(heightM * PX));

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Base wall: neutral grey (flat surface)
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, W, H);

  // Floor bands: slightly raised
  const floorH = H / floors;
  for (let f = 1; f < floors; f++) {
    ctx.fillStyle = '#999999';
    ctx.fillRect(0, f * floorH - 1, W, 4);
  }

  // Windows: recessed (darker)
  const marginX = W * 0.1;
  const cellW = (W - marginX * 2) / Math.max(windowsPerFloor, 1);
  const winW = style === 'glass' ? cellW * 0.82 : cellW * 0.55;
  const winH = style === 'glass' ? floorH * 0.72 : floorH * 0.50;
  const winTopOffset = floorH * 0.18;

  for (let f = 0; f < floors; f++) {
    for (let c = 0; c < windowsPerFloor; c++) {
      const wx = marginX + c * cellW + (cellW - winW) / 2;
      const wy = f * floorH + winTopOffset;
      // Recess
      ctx.fillStyle = '#404040';
      ctx.fillRect(wx - 2, wy - 2, winW + 4, winH + 4);
      // Glass surface (slightly less recessed)
      ctx.fillStyle = '#505050';
      ctx.fillRect(wx, wy, winW, winH);
      // Sill: raised
      ctx.fillStyle = '#b0b0b0';
      ctx.fillRect(wx - 2, wy + winH, winW + 4, 3);
    }
  }

  // Cornice: raised
  ctx.fillStyle = '#c0c0c0';
  ctx.fillRect(0, 0, W, 5);

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.anisotropy = 4;
  return tex;
}
