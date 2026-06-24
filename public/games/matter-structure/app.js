// ==========================================================================
// PHYSICS LAB 3D: MATTER STRUCTURE & PHASE TRANSITIONS
// Core Application Logic (Three.js + Physics Engines + Web Audio Synth)
// ==========================================================================

// Global state variables
let scene, camera, renderer, controls;
let molecules = [];
let bonds = [];
let pollenGrain = null;
let waterMolecules = [];
let pathLine = null;
let pathPoints = [];

// Simulation Parameters
let currentTab = 'tab-structure'; // tab-structure, tab-brown, tab-transition
let currentState = 'solid'; // solid, liquid, gas, transition
let currentMaterial = 'water';
let temperature = -20; // Celsius
let bondStiffness = 8;
let boxSize = 20;
let isHeating = false;
let isCooling = false;
let simulationSpeed = 1.0;

// Phase Transition Graph state
let transitionTime = 0;
let graphPoints = [];
const graphCanvas = document.getElementById('graph-canvas');
const graphCtx = graphCanvas.getContext('2d');

// Web Audio API State
let audioCtx = null;
let soundEnabled = false;
let heaterNoiseNode = null;
let heaterGainNode = null;

// Telemetry values
let avgKE = 0;
let avgPE = 0;
let activeBondsCount = 0;
let collisionPressure = 0;
let wallCollisionsThisFrame = 0;

// Quiz Database (matching SGK curriculum)
const QUIZ_DB = [
  {
    question: "1. Trong lịch sử phát triển khoa học, mô hình động học phân tử về cấu tạo chất được xây dựng trên quan điểm nào?",
    options: [
      "Chất có cấu tạo liên tục (không có khoảng trống giữa các hạt).",
      "Chất có cấu tạo gián đoạn (cấu tạo từ các hạt riêng biệt có khoảng cách).",
      "Chất cấu tạo từ các hạt liên kết tĩnh không bao giờ dịch chuyển.",
      "Chất không có hình dạng thực tế mà là các đám mây năng lượng liên tục."
    ],
    correct: 1,
    desc: "Mô hình động học phân tử dựa trên quan điểm chất cấu tạo gián đoạn, tức là được tạo thành từ các hạt riêng biệt (phân tử, nguyên tử, ion) và giữa chúng có khoảng cách."
  },
  {
    question: "2. Tại sao thí nghiệm của Brown (quan sát hạt phấn hoa trong nước) lại chứng tỏ các phân tử nước chuyển động hỗn loạn không ngừng?",
    options: [
      "Hạt phấn hoa tự chuyển động nhờ năng lượng sinh học bên trong cơ thể nó.",
      "Hạt phấn hoa bị đẩy đi do các dòng đối lưu nhiệt của nước chạy thành dòng.",
      "Hạt phấn hoa chịu các lực va đập không cân bằng từ các phân tử nước chuyển động nhiệt hỗn loạn ở mọi phía.",
      "Hạt phấn hoa bị hấp dẫn bởi lực điện từ của các ion kim loại trong nước."
    ],
    correct: 2,
    desc: "Vì hạt phấn hoa có kích thước rất nhỏ. Khi các phân tử nước chuyển động hỗn loạn va đập vào nó từ mọi phía, trong mỗi khoảnh khắc lực va đập không cân bằng nhau, làm hạt phấn hoa bị xô đẩy hỗn loạn."
  },
  {
    question: "3. Trong quá trình nước đá đang nóng chảy (0°C) hoặc nước đang sôi (100°C), tại sao ta vẫn tiếp tục đun nóng nhưng nhiệt độ không tăng?",
    options: [
      "Nhiệt năng bị thất thoát hoàn toàn ra môi trường bên ngoài cốc.",
      "Nhiệt năng được chuyển hóa thành động năng làm phân tử chuyển động nhanh hơn.",
      "Nhiệt năng được dùng để bẻ gãy các liên kết phân tử và làm tăng thế năng tương tác của chúng.",
      "Nhiệt năng bị triệt tiêu do các phân tử nước hấp thụ và triệt tiêu lẫn nhau."
    ],
    correct: 3,
    desc: "Tại điểm chuyển thể, năng lượng nung nóng được hấp thụ để phá vỡ cấu trúc liên kết tinh thể (hoặc lực liên kết lỏng) nhằm làm tăng thế năng phân tử, động năng trung bình (nhiệt độ) được giữ nguyên."
  },
  {
    question: "4. Tại sao khi bay hơi, nhiệt độ của chất lỏng còn lại trong cốc lại bị giảm đi (hiện tượng tự làm mát)?",
    options: [
      "Các phân tử có động năng lớn nhất ở bề mặt thoát ra ngoài, làm giảm động năng trung bình của các phân tử còn lại.",
      "Không khí bên ngoài hấp thụ nhiệt và truyền hơi lạnh trực tiếp vào cốc nước.",
      "Các phân tử còn lại phản ứng hóa học tự tỏa nhiệt lạnh ra môi trường xung quanh.",
      "Lực liên kết phân tử lỏng tự co lại làm triệt tiêu nhiệt lượng của cốc."
    ],
    correct: 0,
    desc: "Chỉ các phân tử ở gần bề mặt có động năng đủ lớn để thắng lực liên kết mới thoát ra ngoài. Phân tử có động năng lớn bay đi làm động năng trung bình của các phân tử còn lại giảm, dẫn đến nhiệt độ giảm."
  }
];
let currentQuizIdx = 0;

// Initialize app on load
window.addEventListener('DOMContentLoaded', () => {
  init3D();
  setupEventListeners();
  initQuiz();
  resetSimulation();
  animate();
});

// ==========================================================================
// 3D SCENE INITIALIZATION
// ==========================================================================
function init3D() {
  const container = document.getElementById('canvas-container');
  const width = container.clientWidth;
  const height = container.clientHeight;

  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x01040a);
  scene.fog = new THREE.FogExp2(0x01040a, 0.015);

  // Camera setup
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(25, 20, 35);

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Controls setup
  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxDistance = 150;
  controls.minDistance = 5;

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0x00f2ff, 0.8);
  dirLight1.position.set(20, 40, 20);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xff007f, 0.5);
  dirLight2.position.set(-20, -20, -20);
  scene.add(dirLight2);

  const pointLight = new THREE.PointLight(0xffffff, 0.5, 100);
  pointLight.position.set(0, 0, 0);
  scene.add(pointLight);

  // Window Resize Listener
  window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
  const container = document.getElementById('canvas-container');
  camera.aspect = container.clientWidth / container.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.clientWidth, container.clientHeight);
}

// ==========================================================================
// PHYSICS SIMULATION ENGINES
// ==========================================================================

// Reset and switch simulation states based on active Tab and options
function resetSimulation() {
  // Clear existing items in 3D scene
  molecules.forEach(m => scene.remove(m.mesh));
  bonds.forEach(b => scene.remove(b.line));
  molecules = [];
  bonds = [];

  if (pollenGrain) {
    scene.remove(pollenGrain.mesh);
    pollenGrain = null;
  }
  waterMolecules.forEach(w => scene.remove(w.mesh));
  waterMolecules = [];
  
  if (pathLine) {
    scene.remove(pathLine);
    pathLine = null;
  }
  pathPoints = [];

  // Create bounding wireframe box
  createBoundingBox();

  if (currentTab === 'tab-structure' || currentTab === 'tab-transition') {
    document.getElementById('hud-state-display').classList.remove('hidden');
    buildMolecularState();
  } else if (currentTab === 'tab-brown') {
    document.getElementById('hud-state-display').classList.add('hidden');
    buildBrownianState();
  }
}

// Draw transparent bounding container box
let boxHelper = null;
function createBoundingBox() {
  if (boxHelper) scene.remove(boxHelper);
  
  const geometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
  const edges = new THREE.EdgesGeometry(geometry);
  boxHelper = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ 
    color: 0x00f2ff, 
    transparent: true,
    opacity: 0.15 
  }));
  scene.add(boxHelper);
}

// --- TAB 1 & 3: BUILD SOLID, LIQUID, OR GAS STATES ---
function buildMolecularState() {
  const count1D = currentState === 'solid' ? 5 : 4; // 125 particles for solid, 64 for liquid/gas
  const spacing = boxSize / (count1D + 1);
  const offset = -boxSize / 2 + spacing;
  
  const particleRadius = currentMaterial === 'water' ? 0.5 : 0.4;
  const sphereGeo = new THREE.SphereGeometry(particleRadius, 16, 16);

  // Set colors based on state
  let particleColor = 0x00f2ff; // Cyan default
  if (currentState === 'solid') particleColor = 0x10b981; // Green for stable solid
  if (currentState === 'gas') particleColor = 0xff007f; // Pink for high energy gas

  const mat = new THREE.MeshPhongMaterial({
    color: particleColor,
    shininess: 80,
    specular: 0xffffff,
    transparent: true,
    opacity: 0.85
  });

  // Position particles
  for (let x = 0; x < count1D; x++) {
    for (let y = 0; y < count1D; y++) {
      for (let z = 0; z < count1D; z++) {
        const mesh = new THREE.Mesh(sphereGeo, mat);
        const gridX = offset + x * spacing;
        const gridY = offset + y * spacing;
        const gridZ = offset + z * spacing;
        
        // Add minor initial thermal noise based on temperature
        const noise = (temperature + 273.15) * 0.0005;
        const posX = gridX + (Math.random() - 0.5) * noise;
        const posY = gridY + (Math.random() - 0.5) * noise;
        const posZ = gridZ + (Math.random() - 0.5) * noise;
        
        mesh.position.set(posX, posY, posZ);
        scene.add(mesh);

        molecules.push({
          mesh: mesh,
          gridPos: new THREE.Vector3(gridX, gridY, gridZ),
          pos: new THREE.Vector3(posX, posY, posZ),
          vel: new THREE.Vector3(
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.5
          ),
          force: new THREE.Vector3(),
          radius: particleRadius,
          mass: currentMaterial === 'water' ? 18 : 40,
          id: molecules.length
        });
      }
    }
  }

  // Create crystalline elastic spring bonds if solid
  if (currentState === 'solid') {
    createSpringBonds();
  }
}

// Generate spring bonds connecting nearest neighbors in 3D grid
function createSpringBonds() {
  const maxDist = (boxSize / 6) * 1.5; // grid spacing is approx boxSize/6
  const lineMat = new THREE.LineBasicMaterial({ 
    color: 0x10b981, 
    transparent: true, 
    opacity: 0.35 
  });

  for (let i = 0; i < molecules.length; i++) {
    for (let j = i + 1; j < molecules.length; j++) {
      const dist = molecules[i].gridPos.distanceTo(molecules[j].gridPos);
      if (dist < maxDist) {
        // Draw 3D Line representing bond spring
        const points = [molecules[i].pos, molecules[j].pos];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geo, lineMat);
        scene.add(line);

        bonds.push({
          line: line,
          p1: molecules[i],
          p2: molecules[j],
          restLength: dist,
          active: true
        });
      }
    }
  }
}

// --- TAB 2: BROWNIAN MOTION EXPERIMENT ---
function buildBrownianState() {
  // 1. Create a large Pollen Grain
  const pollenSizeVal = parseFloat(document.getElementById('pollen-size-slider').value);
  const radius = pollenSizeVal / 10; // e.g. 2.0 to 5.0
  const pollenGeo = new THREE.SphereGeometry(radius, 32, 32);
  const pollenMat = new THREE.MeshPhongMaterial({
    color: 0xffb700, // Gold / Yellow
    shininess: 90,
    specular: 0xffffff,
    bumpScale: 0.05
  });
  
  const pollenMesh = new THREE.Mesh(pollenGeo, pollenMat);
  pollenMesh.position.set(0, 0, 0);
  scene.add(pollenMesh);

  pollenGrain = {
    mesh: pollenMesh,
    pos: new THREE.Vector3(0, 0, 0),
    vel: new THREE.Vector3(0, 0, 0), // Starts at rest, moved solely by water molecule collisions
    radius: radius,
    mass: 50 * radius * radius // very massive compared to water molecules
  };

  // 2. Create small water molecules
  const showWater = document.getElementById('toggle-water').checked;
  const count = 120;
  const waterRadius = 0.3;
  const waterGeo = new THREE.SphereGeometry(waterRadius, 8, 8);
  const waterMat = new THREE.MeshPhongMaterial({
    color: 0x00f2ff, // Cyan
    transparent: true,
    opacity: showWater ? 0.35 : 0.0
  });

  const waterTemp = parseFloat(document.getElementById('brown-temp-slider').value);
  const speedScale = Math.sqrt(waterTemp + 273.15) * 0.12;

  for (let i = 0; i < count; i++) {
    const mesh = new THREE.Mesh(waterGeo, waterMat);
    
    // Position randomly inside the box, not overlapping the pollen grain
    let posX, posY, posZ;
    do {
      posX = (Math.random() - 0.5) * (boxSize - 1);
      posY = (Math.random() - 0.5) * (boxSize - 1);
      posZ = (Math.random() - 0.5) * (boxSize - 1);
    } while (Math.sqrt(posX*posX + posY*posY + posZ*posZ) < radius + 1);

    mesh.position.set(posX, posY, posZ);
    scene.add(mesh);

    waterMolecules.push({
      mesh: mesh,
      pos: new THREE.Vector3(posX, posY, posZ),
      vel: new THREE.Vector3(
        (Math.random() - 0.5) * speedScale,
        (Math.random() - 0.5) * speedScale,
        (Math.random() - 0.5) * speedScale
      ),
      radius: waterRadius,
      mass: 1 // extremely light
    });
  }

  // 3. Setup trajectory line renderer
  const lineMat = new THREE.LineBasicMaterial({ 
    color: 0xffb700, 
    linewidth: 2,
    transparent: true,
    opacity: 0.8
  });
  const geometry = new THREE.BufferGeometry();
  pathLine = new THREE.Line(geometry, lineMat);
  scene.add(pathLine);
  
  pathPoints.push(pollenGrain.pos.clone());
}

// ==========================================================================
// PHYSICS RESOLUTION LOOP (EACH FRAME)
// ==========================================================================
function updatePhysics() {
  const dt = 0.08 * simulationSpeed;
  
  if (currentTab === 'tab-structure' || currentTab === 'tab-transition') {
    resolveMolecularPhysics(dt);
  } else if (currentTab === 'tab-brown') {
    resolveBrownianPhysics(dt);
  }
}

// --- RESOLVE KINETIC THEORY & INTERMOLECULAR FORCES ---
function resolveMolecularPhysics(dt) {
  // Convert Celsius to Kelvin
  const tempK = temperature + 273.15;
  
  // Base velocity proportional to sqrt(T)
  const baseSpeed = Math.sqrt(tempK) * 0.04;
  avgKE = 1.5 * 1.38e-23 * tempK * 1e20; // arbitrary eV scaling
  
  // Reset collision counters
  wallCollisionsThisFrame = 0;
  activeBondsCount = 0;

  // 1. Calculate Intermolecular Forces and spring tensions
  molecules.forEach(m => {
    m.force.set(0, 0, 0);

    if (currentState === 'solid') {
      // Solid: Apply restoring spring force back to grid node (F = -k * dx)
      const dx = new THREE.Vector3().subVectors(m.gridPos, m.pos);
      const k = bondStiffness * 0.8;
      const restoringForce = dx.clone().multiplyScalar(k);
      m.force.add(restoringForce);

      // Damp velocity to maintain stability in Solid Lattice
      m.vel.multiplyScalar(0.92);
    } else if (currentState === 'liquid') {
      // Liquid: Soft gravity pulling particles to bottom of the container
      m.force.y -= 0.15; // Weak gravity
      
      // Weak attraction to center to keep them clumped together at the bottom
      const distToCenter = m.pos.x * m.pos.x + m.pos.z * m.pos.z;
      if (distToCenter > 4) {
        m.force.x -= m.pos.x * 0.03;
        m.force.z -= m.pos.z * 0.03;
      }
    }
    
    // Add random thermal force jitter based on current Temperature
    const thermalForce = new THREE.Vector3(
      (Math.random() - 0.5) * baseSpeed * 10,
      (Math.random() - 0.5) * baseSpeed * 10,
      (Math.random() - 0.5) * baseSpeed * 10
    );
    m.force.add(thermalForce);
  });

  // 2. Resolve Spring breaking for Transition Graph
  if (currentState === 'solid') {
    bonds.forEach(b => {
      if (!b.active) return;
      
      const dx = new THREE.Vector3().subVectors(b.p2.pos, b.p1.pos);
      const currentLength = dx.length();
      
      // Spring force connecting the two molecules
      const stretch = currentLength - b.restLength;
      const k = bondStiffness * 0.5;
      const forceVec = dx.clone().normalize().multiplyScalar(k * stretch);
      
      b.p1.force.add(forceVec);
      b.p2.force.sub(forceVec);

      // Check if bond is broken (large thermal stretch)
      const breakThreshold = b.restLength * (1.2 + (0.5 * (10 - bondStiffness) / 10));
      if (currentLength > breakThreshold) {
        b.active = false;
        scene.remove(b.line);
        triggerBondBreakSound();
      } else {
        activeBondsCount++;
        // Update 3D Line coordinates to match updated positions
        const points = [b.p1.pos, b.p2.pos];
        b.line.geometry.setFromPoints(points);
        b.line.geometry.attributes.position.needsUpdate = true;
      }
    });
    
    // Update potential energy based on active bond count
    avgPE = -activeBondsCount * 0.08;
  } else {
    avgPE = currentState === 'liquid' ? -2.2 : 0;
  }

  // 3. Update Velocities and Positions
  molecules.forEach(m => {
    // a = F / m
    const acc = m.force.clone().multiplyScalar(1 / m.mass);
    m.vel.add(acc.multiplyScalar(dt));
    
    // Clamp velocity to prevent particles from flying off due to numerical integration errors
    const maxSpeed = currentState === 'gas' ? baseSpeed * 5 : baseSpeed * 3;
    if (m.vel.length() > maxSpeed) {
      m.vel.normalize().multiplyScalar(maxSpeed);
    }
    
    m.pos.add(m.vel.clone().multiplyScalar(dt));
    
    // 4. Resolve Wall Collisions
    const bound = boxSize / 2 - m.radius;
    if (m.pos.x > bound) { m.pos.x = bound; m.vel.x *= -1; wallCollisionsThisFrame++; }
    if (m.pos.x < -bound) { m.pos.x = -bound; m.vel.x *= -1; wallCollisionsThisFrame++; }
    if (m.pos.y > bound) { m.pos.y = bound; m.vel.y *= -1; wallCollisionsThisFrame++; }
    if (m.pos.y < -bound) { m.pos.y = -bound; m.vel.y *= -1; wallCollisionsThisFrame++; }
    if (m.pos.z > bound) { m.pos.z = bound; m.vel.z *= -1; wallCollisionsThisFrame++; }
    if (m.pos.z < -bound) { m.pos.z = -bound; m.vel.z *= -1; wallCollisionsThisFrame++; }

    m.mesh.position.copy(m.pos);
  });

  // 5. Resolve Inter-particle collisions (Rắn/Lỏng/Khí)
  resolveParticleCollisions(molecules);

  // Compute wall pressure (based on wall impact rates)
  collisionPressure = (wallCollisionsThisFrame * baseSpeed * 0.25);
}

// Particle-to-particle elastic collision resolution
function resolveParticleCollisions(particles) {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const p1 = particles[i];
      const p2 = particles[j];
      const dist = p1.pos.distanceTo(p2.pos);
      const minDist = p1.radius + p2.radius;

      if (dist < minDist) {
        // Resolve overlap
        const overlap = minDist - dist;
        const dir = new THREE.Vector3().subVectors(p2.pos, p1.pos).normalize();
        
        // Push particles apart slightly
        p1.pos.sub(dir.clone().multiplyScalar(overlap * 0.5));
        p2.pos.add(dir.clone().multiplyScalar(overlap * 0.5));

        // Elastic collision response
        const relativeVel = new THREE.Vector3().subVectors(p1.vel, p2.vel);
        const impulse = (2 * relativeVel.dot(dir)) / (p1.mass + p2.mass);
        
        p1.vel.sub(dir.clone().multiplyScalar(impulse * p2.mass));
        p2.vel.add(dir.clone().multiplyScalar(impulse * p1.mass));
      }
    }
  }
}

// --- RESOLVE BROWNIAN SCATTERING DYNAMICS ---
function resolveBrownianPhysics(dt) {
  const waterTemp = parseFloat(document.getElementById('brown-temp-slider').value);
  const speedScale = Math.sqrt(waterTemp + 273.15) * 0.15;

  // 1. Update Water Molecules
  waterMolecules.forEach(w => {
    // Move
    w.pos.add(w.vel.clone().multiplyScalar(dt));

    // Bounce off box walls
    const bound = boxSize / 2 - w.radius;
    if (w.pos.x > bound) { w.pos.x = bound; w.vel.x *= -1; }
    if (w.pos.x < -bound) { w.pos.x = -bound; w.vel.x *= -1; }
    if (w.pos.y > bound) { w.pos.y = bound; w.vel.y *= -1; }
    if (w.pos.y < -bound) { w.pos.y = -bound; w.vel.y *= -1; }
    if (w.pos.z > bound) { w.pos.z = bound; w.vel.z *= -1; }
    if (w.pos.z < -bound) { w.pos.z = -bound; w.vel.z *= -1; }

    // 2. Collision with Pollen Grain
    const distToPollen = w.pos.distanceTo(pollenGrain.pos);
    const minDist = w.radius + pollenGrain.radius;
    if (distToPollen < minDist) {
      // Resolve overlap
      const overlap = minDist - distToPollen;
      const dir = new THREE.Vector3().subVectors(w.pos, pollenGrain.pos).normalize();
      w.pos.add(dir.clone().multiplyScalar(overlap));

      // Momentum elastic exchange
      const relativeVel = new THREE.Vector3().subVectors(w.vel, pollenGrain.vel);
      const impulse = (2 * relativeVel.dot(dir)) / (w.mass + pollenGrain.mass);

      w.vel.sub(dir.clone().multiplyScalar(impulse * pollenGrain.mass));
      pollenGrain.vel.add(dir.clone().multiplyScalar(impulse * w.mass));
      
      triggerBoilingPopSound(0.05); // Tiny tap sound
    }

    w.mesh.position.copy(w.pos);
  });

  // 2. Update Pollen Grain
  // Damp pollen grain velocity slightly to simulate fluid viscosity drag
  pollenGrain.vel.multiplyScalar(0.95);
  pollenGrain.pos.add(pollenGrain.vel.clone().multiplyScalar(dt));

  // Bounce pollen grain off box walls
  const pBound = boxSize / 2 - pollenGrain.radius;
  if (pollenGrain.pos.x > pBound) { pollenGrain.pos.x = pBound; pollenGrain.vel.x *= -1; }
  if (pollenGrain.pos.x < -pBound) { pollenGrain.pos.x = -pBound; pollenGrain.vel.x *= -1; }
  if (pollenGrain.pos.y > pBound) { pollenGrain.pos.y = pBound; pollenGrain.vel.y *= -1; }
  if (pollenGrain.pos.y < -pBound) { pollenGrain.pos.y = -pBound; pollenGrain.vel.y *= -1; }
  if (pollenGrain.pos.z > pBound) { pollenGrain.pos.z = pBound; pollenGrain.vel.z *= -1; }
  if (pollenGrain.pos.z < -pBound) { pollenGrain.pos.z = -pBound; pollenGrain.vel.z *= -1; }

  pollenGrain.mesh.position.copy(pollenGrain.pos);

  // 3. Update trajectory path render list
  const showPath = document.getElementById('toggle-path').checked;
  if (showPath && pathLine) {
    const lastPoint = pathPoints[pathPoints.length - 1];
    // Only record points if displacements are significant
    if (lastPoint.distanceTo(pollenGrain.pos) > 0.15) {
      pathPoints.push(pollenGrain.pos.clone());
      // Max out path trace size for performance
      if (pathPoints.length > 500) {
        pathPoints.shift();
      }
      pathLine.geometry.setFromPoints(pathPoints);
      pathLine.geometry.attributes.position.needsUpdate = true;
    }
  }

  // Jiggle water molecules random noise to keep system active
  waterMolecules.forEach(w => {
    if (w.vel.length() < speedScale * 0.5) {
      w.vel.set(
        (Math.random() - 0.5) * speedScale,
        (Math.random() - 0.5) * speedScale,
        (Math.random() - 0.5) * speedScale
      );
    }
  });

  // Jitter telemetry values for brownian
  avgKE = 1.5 * 1.38e-23 * (waterTemp + 273.15) * 1e20;
  avgPE = -0.5;
  activeBondsCount = 0;
  collisionPressure = Math.abs(pollenGrain.vel.length()) * 2.5;
}

// ==========================================================================
// TEMPERATURE & PHASE TRANSITION GRAPH SYNC
// ==========================================================================
function updatePhaseTransitions(dt) {
  if (currentTab !== 'tab-transition') return;

  const heatingRate = 0.5 * simulationSpeed;

  if (isHeating) {
    transitionTime += dt;
    
    // Simulate heating curve stages:
    if (temperature < 0) {
      // 1. Heating Ice: Solid State, Temp rises
      temperature += heatingRate * 1.5;
      currentState = 'solid';
      document.getElementById('hud-state').innerText = "RẮN (NƯỚC ĐÁ)";
      document.getElementById('hud-state').className = "hud-value text-green";
    } else if (temperature >= 0 && temperature < 1.0 && activeBondsCount > 0) {
      // 2. Melting Plateau: Temp stays at 0°C until crystal bonds are fully broken
      temperature = 0.0;
      currentState = 'solid'; // Keep visual springs active as they crack
      document.getElementById('hud-state').innerText = "ĐANG NÓNG CHẢY (0°C)";
      document.getElementById('hud-state').className = "hud-value text-yellow";
      
      // Artificially weaken and snap remaining bonds during melting
      bondStiffness = Math.max(1, bondStiffness - 0.05 * simulationSpeed);
    } else if (temperature < 100) {
      // 3. Heating Water: Liquid state, Temp rises
      if (currentState === 'solid') {
        currentState = 'liquid';
        resetSimulation(); // Destroys all spring lines, turns particles to sliding lỏng
      }
      temperature += heatingRate * 1.2;
      currentState = 'liquid';
      document.getElementById('hud-state').innerText = "LỎNG (NƯỚC)";
      document.getElementById('hud-state').className = "hud-value text-teal";
      
      // Simulate water bubble audio occasionally
      if (Math.random() < 0.05) triggerBoilingPopSound(0.1);
    } else if (temperature >= 100 && temperature < 101 && molecules.length > 15) {
      // 4. Boiling Plateau: Temp stays at 100°C as molecules evaporate
      temperature = 100.0;
      currentState = 'liquid';
      document.getElementById('hud-state').innerText = "ĐANG SÔI (100°C)";
      document.getElementById('hud-state').className = "hud-value text-yellow";

      // Simulate bubbles forming and escaping:
      // Remove molecules one by one to simulate evaporation
      if (Math.random() < 0.04 * simulationSpeed) {
        const evaporated = molecules.pop();
        if (evaporated) {
          scene.remove(evaporated.mesh);
          triggerBoilingPopSound(0.2);
        }
      }
    } else {
      // 5. Heating Steam: Gas state, Temp rises
      if (currentState === 'liquid') {
        currentState = 'gas';
        resetSimulation(); // Regenerates gas particles filling the box
      }
      temperature = Math.min(150, temperature + heatingRate * 2.0);
      currentState = 'gas';
      document.getElementById('hud-state').innerText = "KHÍ (HƠI NƯỚC)";
      document.getElementById('hud-state').className = "hud-value text-pink";
    }
  } else if (isCooling) {
    transitionTime += dt;
    
    // Simulate cooling curve stages:
    if (temperature > 100) {
      temperature -= heatingRate * 2.0;
      currentState = 'gas';
      document.getElementById('hud-state').innerText = "KHÍ (HƠI NƯỚC)";
      document.getElementById('hud-state').className = "hud-value text-pink";
    } else if (temperature <= 100 && temperature > 99 && molecules.length < 64) {
      // Condensation plateau
      temperature = 100.0;
      currentState = 'gas';
      document.getElementById('hud-state').innerText = "ĐANG NGƯNG TỤ (100°C)";
      document.getElementById('hud-state').className = "hud-value text-yellow";

      // Add back molecules to simulate gas condensing to liquid
      if (Math.random() < 0.06 * simulationSpeed) {
        const particleRadius = 0.5;
        const sphereGeo = new THREE.SphereGeometry(particleRadius, 16, 16);
        const mat = new THREE.MeshPhongMaterial({ color: 0x00f2ff, shininess: 80 });
        const mesh = new THREE.Mesh(sphereGeo, mat);
        mesh.position.set((Math.random()-0.5)*10, -boxSize/2 + 1, (Math.random()-0.5)*10);
        scene.add(mesh);
        
        molecules.push({
          mesh: mesh,
          gridPos: new THREE.Vector3(),
          pos: mesh.position.clone(),
          vel: new THREE.Vector3((Math.random()-0.5)*0.5, 0, (Math.random()-0.5)*0.5),
          force: new THREE.Vector3(),
          radius: particleRadius,
          mass: 18,
          id: molecules.length
        });
      }
    } else if (temperature > 0) {
      if (currentState === 'gas') {
        currentState = 'liquid';
        resetSimulation();
      }
      temperature -= heatingRate * 1.2;
      currentState = 'liquid';
      document.getElementById('hud-state').innerText = "LỎNG (NƯỚC)";
      document.getElementById('hud-state').className = "hud-value text-teal";
    } else if (temperature <= 0 && temperature > -1 && currentState === 'liquid') {
      // Freezing plateau
      temperature = 0.0;
      document.getElementById('hud-state').innerText = "ĐANG ĐÔNG ĐẶC (0°C)";
      document.getElementById('hud-state').className = "hud-value text-yellow";

      // Slowly freeze to solid
      currentState = 'solid';
      bondStiffness = 8;
      resetSimulation();
      playCompletionChord();
    } else {
      temperature = Math.max(-40, temperature - heatingRate * 1.5);
      currentState = 'solid';
      document.getElementById('hud-state').innerText = "RẮN (NƯỚC ĐÁ)";
      document.getElementById('hud-state').className = "hud-value text-green";
    }
  }

  // Update DOM sliders to show sync'd values
  document.getElementById('temp-slider').value = temperature;
  document.getElementById('temp-slider-val').innerText = `${temperature.toFixed(1)} °C`;
  document.getElementById('bond-slider').value = bondStiffness;

  // Add coordinates to graph list
  graphPoints.push({
    time: transitionTime,
    temp: temperature
  });
  // Cap graph horizontal size
  if (graphPoints.length > 300) {
    graphPoints.shift();
  }

  drawGraph2D();
}

// Render the 2D Temperature Curve Graph on HTML Canvas
function drawGraph2D() {
  const w = graphCanvas.width;
  const h = graphCanvas.height;
  graphCtx.clearRect(0, 0, w, h);

  // Background Grid Lines
  graphCtx.strokeStyle = 'rgba(255,255,255,0.04)';
  graphCtx.lineWidth = 1;
  for (let x = 0; x < w; x += 40) {
    graphCtx.beginPath();
    graphCtx.moveTo(x, 0);
    graphCtx.lineTo(x, h);
    graphCtx.stroke();
  }
  for (let y = 0; y < h; y += 30) {
    graphCtx.beginPath();
    graphCtx.moveTo(0, y);
    graphCtx.lineTo(w, y);
    graphCtx.stroke();
  }

  // Draw axis boundaries
  graphCtx.strokeStyle = 'rgba(255,255,255,0.15)';
  graphCtx.beginPath();
  graphCtx.moveTo(40, 10);
  graphCtx.lineTo(40, h - 30);
  graphCtx.lineTo(w - 10, h - 30);
  graphCtx.stroke();

  // Labels and scales
  graphCtx.fillStyle = '#64748b';
  graphCtx.font = '9px "JetBrains Mono"';
  graphCtx.textAlign = 'right';
  graphCtx.fillText("100°C", 35, 45);
  graphCtx.fillText("0°C", 35, 110);
  graphCtx.fillText("-20°C", 35, 135);
  
  graphCtx.textAlign = 'center';
  graphCtx.fillText("Thời gian (t)", w / 2, h - 10);

  // Convert temp/time values to canvas pixel coordinates
  // Time domain mapping: 0 to 100 sec
  // Temp domain mapping: -40°C to 140°C
  const getX = (time) => 40 + (time % 80) * ((w - 50) / 80);
  const getY = (temp) => {
    const range = 180; // from -40 to 140
    const relative = (temp - (-40)) / range;
    return (h - 30) - relative * (h - 50);
  };

  // Draw theoretical textbook transition curve in dashed gray
  graphCtx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
  graphCtx.setLineDash([4, 4]);
  graphCtx.lineWidth = 2;
  graphCtx.beginPath();
  graphCtx.moveTo(40, getY(-20));
  graphCtx.lineTo(40 + 15 * ((w-50)/80), getY(0)); // Heating ice
  graphCtx.lineTo(40 + 30 * ((w-50)/80), getY(0)); // Melting
  graphCtx.lineTo(40 + 50 * ((w-50)/80), getY(100)); // Heating water
  graphCtx.lineTo(40 + 70 * ((w-50)/80), getY(100)); // Boiling
  graphCtx.lineTo(w - 10, getY(120)); // Steam
  graphCtx.stroke();
  graphCtx.setLineDash([]);

  // Plot live running points
  if (graphPoints.length > 1) {
    graphCtx.strokeStyle = 'rgba(0, 242, 255, 0.85)';
    graphCtx.shadowColor = 'rgba(0, 242, 255, 0.5)';
    graphCtx.shadowBlur = 4;
    graphCtx.lineWidth = 3;
    graphCtx.beginPath();
    
    // Sort and map points
    graphCtx.moveTo(getX(graphPoints[0].time), getY(graphPoints[0].temp));
    for (let i = 1; i < graphPoints.length; i++) {
      graphCtx.lineTo(getX(graphPoints[i].time), getY(graphPoints[i].temp));
    }
    graphCtx.stroke();
    graphCtx.shadowBlur = 0; // Reset shadow

    // Current pointer node blinking
    const active = graphPoints[graphPoints.length - 1];
    const px = getX(active.time);
    const py = getY(active.temp);
    
    graphCtx.fillStyle = '#ff007f';
    graphCtx.shadowColor = '#ff007f';
    graphCtx.shadowBlur = 8;
    graphCtx.beginPath();
    graphCtx.arc(px, py, 4, 0, Math.PI * 2);
    graphCtx.fill();
    graphCtx.shadowBlur = 0;
  }
}

// ==========================================================================
// WEB AUDIO API SYNTHESIZER
// ==========================================================================
function initAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  soundEnabled = true;
  
  // Create ongoing rumble node for heater
  setupHeaterNoise();
}

function setupHeaterNoise() {
  const bufferSize = 2 * audioCtx.sampleRate;
  const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  
  // Fill buffer with white noise
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1;
  }
  
  const whiteNoise = audioCtx.createBufferSource();
  whiteNoise.buffer = noiseBuffer;
  whiteNoise.loop = true;

  // Filter out high frequencies to create a low rumble fire crackle
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 180; // Low frequency rumbles

  heaterGainNode = audioCtx.createGain();
  heaterGainNode.gain.setValueAtTime(0, audioCtx.currentTime);

  whiteNoise.connect(filter);
  filter.connect(heaterGainNode);
  heaterGainNode.connect(audioCtx.destination);
  
  whiteNoise.start();
  heaterNoiseNode = whiteNoise;
}

// Adjust heater sound volume based on whether we are nung nong or lam lanh
function updateHeaterVolume() {
  if (!soundEnabled || !heaterGainNode) return;
  
  const targetGain = (isHeating || isCooling) ? 0.35 : 0;
  heaterGainNode.gain.setTargetAtTime(targetGain, audioCtx.currentTime, 0.2);
}

// Synthesize short glass cracking pitch for crystalline spring snaps
function triggerBondBreakSound() {
  if (!soundEnabled || !audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1600, audioCtx.currentTime); // High pitch crack
  osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.1);

  gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.1);
}

// Synthesize bubbling pop sounds for boiling
function triggerBoilingPopSound(vol = 0.15) {
  if (!soundEnabled || !audioCtx) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'sine';
  const startFreq = 200 + Math.random() * 500;
  osc.frequency.setValueAtTime(startFreq, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(startFreq * 1.8, audioCtx.currentTime + 0.05);

  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.05);
}

// Synthesize pleasant C major chord arpeggio for phase transition completion
function playCompletionChord() {
  if (!soundEnabled || !audioCtx) return;

  const freqs = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
  freqs.forEach((f, idx) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, audioCtx.currentTime + idx * 0.12);

    gain.gain.setValueAtTime(0.15, audioCtx.currentTime + idx * 0.12);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + idx * 0.12 + 0.8);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime + idx * 0.12);
    osc.stop(audioCtx.currentTime + idx * 0.12 + 0.8);
  });
}

// ==========================================================================
// INTERACTIVE TEXTBOOK CHECKPOINTS (QUIZ CONTROLLER)
// ==========================================================================
function initQuiz() {
  renderQuizQuestion();
  
  document.getElementById('btn-prev-quiz').addEventListener('click', () => {
    currentQuizIdx = (currentQuizIdx - 1 + QUIZ_DB.length) % QUIZ_DB.length;
    renderQuizQuestion();
  });
  
  document.getElementById('btn-next-quiz').addEventListener('click', () => {
    currentQuizIdx = (currentQuizIdx + 1) % QUIZ_DB.length;
    renderQuizQuestion();
  });
}

function renderQuizQuestion() {
  const q = QUIZ_DB[currentQuizIdx];
  document.getElementById('quiz-question-text').innerText = q.question;
  document.getElementById('quiz-counter-text').innerText = `${currentQuizIdx + 1} / ${QUIZ_DB.length}`;
  
  const optContainer = document.getElementById('quiz-options-container');
  optContainer.innerHTML = '';
  
  const feedbackBox = document.getElementById('quiz-feedback-box');
  feedbackBox.classList.add('hidden');

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    btn.innerText = opt;
    
    btn.addEventListener('click', () => {
      // Disable other choices
      Array.from(optContainer.children).forEach(b => b.setAttribute('disabled', 'true'));
      
      feedbackBox.classList.remove('hidden');
      if (idx === q.correct) {
        btn.classList.add('selected-correct');
        feedbackBox.className = 'quiz-feedback correct';
        document.getElementById('feedback-status').innerText = "✓ Trả lời chính xác!";
        document.getElementById('feedback-desc').innerText = q.desc;
        playCompletionChord();
      } else {
        btn.classList.add('selected-incorrect');
        feedbackBox.className = 'quiz-feedback incorrect';
        document.getElementById('feedback-status').innerText = "✗ Trả lời sai";
        document.getElementById('feedback-desc').innerText = "Vui lòng xem lại kiến thức và thử chọn đáp án khác.";
      }
    });
    
    optContainer.appendChild(btn);
  });
}

// ==========================================================================
// DOM EVENT LISTENERS & USER CONTROLS
// ==========================================================================
function setupEventListeners() {
  // Tab selector click triggers
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      
      btn.classList.add('active');
      currentTab = btn.getAttribute('data-tab');
      document.getElementById(currentTab).classList.add('active');
      
      // Adapt state when tabs change
      if (currentTab === 'tab-structure') {
        currentState = 'solid';
        temperature = -20;
        bondStiffness = 8;
        isHeating = false;
        isCooling = false;
        updateHeaterVolume();
      } else if (currentTab === 'tab-transition') {
        temperature = -20;
        currentState = 'solid';
        bondStiffness = 8;
        transitionTime = 0;
        graphPoints = [];
        isHeating = false;
        isCooling = false;
        updateHeaterVolume();
      }
      
      resetSimulation();
    });
  });

  // State selectors (Tab 1)
  document.getElementById('state-solid').addEventListener('click', () => {
    currentState = 'solid';
    temperature = -20;
    bondStiffness = 8;
    document.querySelectorAll('.state-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('state-solid').classList.add('active');
    resetSimulation();
  });
  
  document.getElementById('state-liquid').addEventListener('click', () => {
    currentState = 'liquid';
    temperature = 25;
    bondStiffness = 4;
    document.querySelectorAll('.state-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('state-liquid').classList.add('active');
    resetSimulation();
  });
  
  document.getElementById('state-gas').addEventListener('click', () => {
    currentState = 'gas';
    temperature = 120;
    bondStiffness = 1;
    document.querySelectorAll('.state-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('state-gas').classList.add('active');
    resetSimulation();
  });

  // Temperature Slider Jitter
  document.getElementById('temp-slider').addEventListener('input', (e) => {
    temperature = parseFloat(e.target.value);
    document.getElementById('temp-slider-val').innerText = `${temperature.toFixed(0)} °C`;
    
    // Automatically match state to temperature if not in sync'd transition tab
    if (currentTab !== 'tab-transition') {
      if (temperature < 0 && currentState !== 'solid') {
        currentState = 'solid';
        resetSimulation();
      } else if (temperature >= 0 && temperature < 100 && currentState !== 'liquid') {
        currentState = 'liquid';
        resetSimulation();
      } else if (temperature >= 100 && currentState !== 'gas') {
        currentState = 'gas';
        resetSimulation();
      }
    }
  });

  // Bond stiffness slider
  document.getElementById('bond-slider').addEventListener('input', (e) => {
    bondStiffness = parseInt(e.target.value);
    const labels = ["Rất yếu", "Yếu", "Trung bình", "Khá mạnh", "Mạnh", "Rất mạnh"];
    const idx = Math.floor((bondStiffness - 1) / 2);
    document.getElementById('bond-slider-val').innerText = labels[idx] || "Mạnh";
    
    if (currentState === 'solid') {
      resetSpringStiffness();
    }
  });

  // Material dropdown preset selector
  document.getElementById('material-select').addEventListener('change', (e) => {
    currentMaterial = e.target.value;
    resetSimulation();
  });

  // Brownian pollen grain size slider
  document.getElementById('pollen-size-slider').addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    document.getElementById('pollen-size-val').innerText = val > 40 ? "Rất Lớn" : (val < 28 ? "Trung bình" : "Lớn");
    resetSimulation();
  });

  // Brownian temperature slider
  document.getElementById('brown-temp-slider').addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    document.getElementById('brown-temp-val').innerText = `${val} °C`;
  });

  // Reset brownian path trace
  document.getElementById('btn-reset-path').addEventListener('click', () => {
    pathPoints = [];
    if (pollenGrain) {
      pollenGrain.pos.set(0, 0, 0);
      pollenGrain.vel.set(0, 0, 0);
      pollenGrain.mesh.position.set(0, 0, 0);
      pathPoints.push(new THREE.Vector3());
    }
  });

  // Brownian water molecule visibility toggle
  document.getElementById('toggle-water').addEventListener('change', (e) => {
    const checked = e.target.checked;
    waterMolecules.forEach(w => {
      w.mesh.material.opacity = checked ? 0.35 : 0.0;
    });
  });

  // Tab 3: Heat/Cool triggers
  document.getElementById('btn-heat').addEventListener('click', () => {
    isHeating = true;
    isCooling = false;
    document.querySelectorAll('.source-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-heat').classList.add('active');
    
    // Add glowing overlay effect
    document.getElementById('temp-overlay').className = "temperature-overlay heating";
    initAudio();
    updateHeaterVolume();
  });

  document.getElementById('btn-cool').addEventListener('click', () => {
    isHeating = false;
    isCooling = true;
    document.querySelectorAll('.source-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-cool').classList.add('active');
    
    // Add ice overlay effect
    document.getElementById('temp-overlay').className = "temperature-overlay cooling";
    initAudio();
    updateHeaterVolume();
  });

  document.getElementById('btn-stop').addEventListener('click', () => {
    isHeating = false;
    isCooling = false;
    document.querySelectorAll('.source-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-stop').classList.add('active');
    
    // Clear overlay effects
    document.getElementById('temp-overlay').className = "temperature-overlay";
    updateHeaterVolume();
  });

  // Transition reset button
  document.getElementById('btn-reset-transition').addEventListener('click', () => {
    temperature = -20;
    currentState = 'solid';
    bondStiffness = 8;
    transitionTime = 0;
    graphPoints = [];
    isHeating = false;
    isCooling = false;
    
    document.querySelectorAll('.source-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('btn-stop').classList.add('active');
    document.getElementById('temp-overlay').className = "temperature-overlay";
    
    updateHeaterVolume();
    resetSimulation();
  });

  // Speed slider
  document.getElementById('speed-slider').addEventListener('input', (e) => {
    simulationSpeed = parseFloat(e.target.value);
    document.getElementById('speed-slider-val').innerText = `${simulationSpeed}x`;
  });

  // Audio mute button
  document.getElementById('sound-toggle').addEventListener('click', () => {
    if (!audioCtx) {
      initAudio();
    } else {
      if (audioCtx.state === 'running') {
        audioCtx.suspend();
        soundEnabled = false;
        document.querySelector('.sound-icon-on').classList.add('hidden');
        document.querySelector('.sound-icon-off').classList.remove('hidden');
      } else {
        audioCtx.resume();
        soundEnabled = true;
        document.querySelector('.sound-icon-on').classList.remove('hidden');
        document.querySelector('.sound-icon-off').classList.add('hidden');
        updateHeaterVolume();
      }
    }
  });

  // Camera HUD commands
  document.getElementById('cam-reset').addEventListener('click', () => {
    camera.position.set(25, 20, 35);
    controls.target.set(0, 0, 0);
    controls.update();
  });

  let cameraAutoRotate = false;
  document.getElementById('cam-lock').addEventListener('click', () => {
    cameraAutoRotate = !cameraAutoRotate;
    controls.autoRotate = cameraAutoRotate;
    controls.autoRotateSpeed = 1.0;
    
    const btn = document.getElementById('cam-lock');
    if (cameraAutoRotate) {
      btn.style.color = "var(--color-teal)";
      btn.style.borderColor = "var(--color-teal-glow)";
    } else {
      btn.style.color = "";
      btn.style.borderColor = "";
    }
  });
}

function resetSpringStiffness() {
  bonds.forEach(b => {
    if (b.active) b.stiffness = bondStiffness;
  });
}

// ==========================================================================
// HUD & TELEMETRY DOM SYNC
// ==========================================================================
function updateTelemetryDOM() {
  // 1. HUD Updates
  document.getElementById('hud-temp').innerText = `${temperature.toFixed(1)} °C`;
  
  if (currentTab === 'tab-structure' || currentTab === 'tab-transition') {
    let stateLabel = "RẮN (MẠNG LẬP PHƯƠNG)";
    let stateClass = "hud-value text-green";
    
    if (currentState === 'liquid') {
      stateLabel = "LỎNG (NƯỚC)";
      stateClass = "hud-value text-teal";
    } else if (currentState === 'gas') {
      stateLabel = "KHÍ (HƠI NƯỚC)";
      stateClass = "hud-value text-pink";
    }
    
    document.getElementById('hud-state').innerText = stateLabel;
    document.getElementById('hud-state').className = stateClass;

    const activeBondsPercent = currentState === 'solid' ? Math.round((activeBondsCount / (bonds.length || 1)) * 100) : 0;
    document.getElementById('hud-bonds').innerText = `${activeBondsPercent}%`;
  } else {
    document.getElementById('hud-bonds').innerText = "0%";
  }

  // 2. Real-time Telemetry panel cards
  document.getElementById('tele-ke').innerText = `${avgKE.toFixed(2)} eV`;
  document.getElementById('tele-pe').innerText = `${avgPE.toFixed(2)} eV`;
  document.getElementById('tele-bonds').innerText = `${activeBondsCount}`;
  document.getElementById('tele-pressure').innerText = `${collisionPressure.toFixed(2)} atm`;
}

// ==========================================================================
// CORE ANIMATION LOOP (RENDER LOOP)
// ==========================================================================
function animate() {
  requestAnimationFrame(animate);

  // 1. Update Physics Engine
  updatePhysics();

  // 2. Update transitions (tab 3 curve sync)
  const dt = 0.04;
  updatePhaseTransitions(dt);

  // 3. Update Camera Orbit Controller
  controls.update();

  // 4. Render 3D viewport WebGL
  renderer.render(scene, camera);

  // 5. Update DOM Telemetry HUDs
  updateTelemetryDOM();
}
