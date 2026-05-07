import './style.css';
import lottie from 'lottie-web';
import cloudData from './assets/icons8-cloud.json';
import sparkleData from './assets/icons8-sparkle.json';
import { tsParticles } from "@tsparticles/engine";
import { loadFull } from "tsparticles";

// Initialize tsParticles
await loadFull(tsParticles);

let busy = false;

const ANSWERS = [
  { text: "The stars say yes <span class=\"sparkle-icon\"></span>", cat: "yes" },
  { text: "Without a doubt <span class=\"sparkle-icon\"></span>", cat: "yes" },
  { text: "It is certain <span class=\"sparkle-icon\"></span>", cat: "yes" },
  { text: "The cosmos align for you <span class=\"sparkle-icon\"></span>", cat: "yes" },
  { text: "Signs point to yes <span class=\"sparkle-icon\"></span>", cat: "yes" },
  { text: "As I see it, yes <span class=\"sparkle-icon\"></span>", cat: "yes" },
  { text: "The spirits whisper... maybe", cat: "maybe" },
  { text: "The mist clouds my vision", cat: "maybe" },
  { text: "Ask again under the moon", cat: "maybe" },
  { text: "The fates are undecided", cat: "maybe" },
  { text: "The stars remain silent", cat: "maybe" },
  { text: "The orb sees no <span class=\"sparkle-icon\"></span>", cat: "no" },
  { text: "The cosmos say no", cat: "no" },
  { text: "My vision says no <span class=\"sparkle-icon\"></span>", cat: "no" },
  { text: "Do not count on it <span class=\"sparkle-icon\"></span>", cat: "no" },
];

const COLORS = {
  yes: { s0: "#b8f0c0", s1: "#60c878", s2: "#1a7030", glow: "rgba(60,180,80,0.45)", drop: "rgba(40,160,60,0.5)", text: "#40c860" },
  no: { s0: "#ffc0c0", s1: "#e07070", s2: "#8a2020", glow: "rgba(220,60,60,0.45)", drop: "rgba(200,40,40,0.5)", text: "#e06060" },
  maybe: { s0: "#fff0a0", s1: "#e8c030", s2: "#806000", glow: "rgba(220,180,20,0.45)", drop: "rgba(200,160,10,0.5)", text: "#d4aa20" },
  idle: { s0: "#ede0ff", s1: "#c4a0f8", s2: "#7c50d8", glow: "rgba(160,100,255,0.45)", drop: "rgba(120,60,255,0.4)", text: "#c0a0ff" },
};

const RANDOM_ORG_API_URL = "https://api.random.org/json-rpc/4/invoke";

function getFilteredAnswers() {
  const isStrict = document.getElementById('strictToggle')?.checked;
  return isStrict ? ANSWERS.filter(a => a.cat !== 'maybe') : ANSWERS;
}

function getFallbackAnswerIndex(pool) {
  if (window.crypto?.getRandomValues) {
    const randomValues = new Uint32Array(1);
    window.crypto.getRandomValues(randomValues);
    return randomValues[0] % pool.length;
  }
  return Math.floor(Math.random() * pool.length);
}

async function getRandomOrgAnswerIndex(pool) {
  const apiKey = import.meta.env.VITE_RANDOM_ORG_API_KEY;

  if (!apiKey) {
    throw new Error('Missing VITE_RANDOM_ORG_API_KEY environment variable.');
  }

  const response = await fetch(RANDOM_ORG_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'generateIntegers',
      params: {
        apiKey,
        n: 1,
        min: 0,
        max: pool.length - 1,
        replacement: true,
      },
      id: window.crypto?.randomUUID?.() || Date.now(),
    }),
  });

  if (!response.ok) {
    throw new Error(`RANDOM.ORG request failed with HTTP ${ response.status } `);
  }

  const payload = await response.json();

  if (payload.error) {
    throw new Error(payload.error.message || 'RANDOM.ORG returned an error.');
  }

  const index = payload.result?.random?.data?.[0];

  if (!Number.isInteger(index) || index < 0 || index >= pool.length) {
    throw new Error('RANDOM.ORG returned an invalid answer index.');
  }

  return index;
}

async function getAnswer(pool) {
  try {
    const index = await getRandomOrgAnswerIndex(pool);
    return pool[index];
  } catch (error) {
    console.warn('Falling back to browser randomness:', error.message);
    return pool[getFallbackAnswerIndex(pool)];
  }
}

function loadSparkles(container = document) {
  container.querySelectorAll('.sparkle-icon').forEach(el => {
    if (el.hasChildNodes()) return; // Already loaded
    lottie.loadAnimation({
      container: el,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: sparkleData
    });
  });
}

// Lottie Initializations
loadSparkles();

lottie.loadAnimation({
  container: document.getElementById('lottie-clouds'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: cloudData
});

lottie.loadAnimation({
  container: document.getElementById('lottie-sparkles'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: sparkleData
});

lottie.loadAnimation({
  container: document.getElementById('lottie-bg-sparkles'),
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: sparkleData
});

// Starfield with tsParticles
await tsParticles.load({
  id: "tsparticles",
  options: {
    fullScreen: { enable: true, zIndex: 0 },
    particles: {
      number: { value: 120, density: { enable: true, area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: {
        value: { min: 0.1, max: 0.8 },
        animation: { enable: true, speed: 1, sync: false }
      },
      size: { value: { min: 1, max: 2.5 } },
      move: {
        enable: true,
        speed: 0.3,
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" }
      }
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "bubble" } },
      modes: { bubble: { size: 5, distance: 100, duration: 2, opacity: 1, color: "#c0a0ff" } }
    },
    retina_detect: true
  }
});

function setOrbColor(cat) {
  const c = COLORS[cat];
  document.getElementById('gs0').setAttribute('stop-color', c.s0);
  document.getElementById('gs1').setAttribute('stop-color', c.s1);
  document.getElementById('gs2').setAttribute('stop-color', c.s2);
  document.getElementById('orbGlow').style.background = `radial-gradient(circle, ${ c.glow } 0%, transparent 70%)`;
  document.getElementById('orbSvg').style.filter = `drop-shadow(0 8px 32px ${ c.drop })`;
}

async function revealAnswer(question) {
  if (busy) return;
  busy = true;

  const orb = document.getElementById('orb');
  orb.classList.add('shaking');
  setTimeout(() => orb.classList.remove('shaking'), 550);

  const idleMsg = document.getElementById('idleMsg');
  const answerBlock = document.getElementById('answerBlock');
  const answerText = document.getElementById('answerText');
  const questionEcho = document.getElementById('questionEcho');

  idleMsg.style.display = 'none';
  answerBlock.style.display = 'none';

  setTimeout(async () => {
    try {
      const pool = getFilteredAnswers();
      const pick = await getAnswer(pool);
      setOrbColor(pick.cat);

      const c = COLORS[pick.cat];
      answerText.style.color = c.text;
      answerText.style.textShadow = `0 0 20px ${ c.glow }`;
      answerText.innerHTML = pick.text;
      loadSparkles(answerText);

      if (question) {
        questionEcho.textContent = `"${question.length > 50 ? question.slice(0, 47) + '...' : question}"`;
        questionEcho.style.display = 'block';
      } else {
        questionEcho.style.display = 'none';
      }

      // Re-trigger animation
      answerText.style.animation = 'none';
      answerText.offsetHeight;
      answerText.style.animation = '';

      answerBlock.style.display = 'block';
    } finally {
      busy = false;
    }
  }, 560);
}

function shake() {
  const q = document.getElementById('qInput').value.trim();
  revealAnswer(q || null);
}

function askQ() {
  const q = document.getElementById('qInput').value.trim();
  revealAnswer(q || null);
  document.getElementById('qInput').value = '';
}

// Event Listeners
document.getElementById('orb').addEventListener('click', shake);
document.getElementById('askBtn').addEventListener('click', askQ);
document.getElementById('qInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') askQ();
});