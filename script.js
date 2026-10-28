/**
 * Tiệm Cà Phê Mùa Thu - Interactive Logic & Audio Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  initMoodAssistant();
  initMenu();
  initWebAudioMixer();
  initPomodoro();
  initGuestbook();
});

/* ==========================================================================
   1. Theme Toggle (Light / Dark Mode)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('cafe_theme') || 'light';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('cafe_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(newTheme === 'dark' ? 'Đã bật giao diện Ban Đêm 🌙' : 'Đã bật giao diện Ban Ngày ☀️');
  });

  function updateThemeIcon(theme) {
    if (themeIcon) {
      themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }
}

/* ==========================================================================
   2. Mobile Menu Navigation
   ========================================================================== */
function initMobileMenu() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (!mobileBtn || !navLinks) return;

  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close when clicking any nav item
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

/* ==========================================================================
   3. Interactive Mood Drink Assistant
   ========================================================================== */
const moodData = {
  sleepy: {
    title: 'Cà Phê Muối Đậm Vị (Salted Robusta)',
    tag: '⚡ Thổi bay cơn buồn ngủ',
    desc: 'Hạt Robusta Đắk Lắk rang đậm kết hợp cùng lớp kem mặn béo ngậy mịn màng. Cú huých cafein hoàn hảo giúp bạn tỉnh táo suốt buổi chiều.',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80',
    price: '38.000đ'
  },
  stress: {
    title: 'Trà Hoa Cúc Mật Ong & Quế Ấm',
    tag: '🌿 Xoa dịu căng thẳng & tâm trí',
    desc: 'Những bông cúc vàng tự nhiên hãm cùng mật ong hoa rừng và vỏ quế thơm dịu. Mang lại cảm giác thư thái, dễ chịu và giảm áp lực ngay lập tức.',
    img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80',
    price: '42.000đ'
  },
  happy: {
    title: 'Matcha Latte Sữa Dừa & Croissant Bơ Pháp',
    tag: '🥐 Nhân đôi niềm vui ngọt ngào',
    desc: 'Matcha Uji thơm mát quyện cùng sữa dừa béo bùi, đi kèm bánh sừng bò giòn rụm ngát hương bơ. Combo lý tưởng để tận hưởng buổi sáng thong thả.',
    img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=500&q=80',
    price: '65.000đ'
  },
  explore: {
    title: 'Cold Brew Trái Vải Thảo Mộc',
    tag: '✨ Khám phá tầng hương mới lạ',
    desc: 'Cà phê ủ lạnh 18 tiếng từ hạt Arabica Cầu Đất, phối hương quả vải mọng nước và lá hương thảo nướng nhẹ. Vừa thanh mát vừa độc đáo khó quên.',
    img: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=500&q=80',
    price: '48.000đ'
  }
};

function initMoodAssistant() {
  const buttons = document.querySelectorAll('.mood-btn');
  const resultContainer = document.getElementById('moodResult');

  function renderMood(moodKey) {
    const item = moodData[moodKey];
    if (!item || !resultContainer) return;

    resultContainer.innerHTML = `
      <img src="${item.img}" alt="${item.title}" class="mood-result-img" loading="lazy">
      <div class="mood-result-info">
        <span class="mood-tagline">${item.tag}</span>
        <h4>${item.title}</h4>
        <p class="mood-desc">${item.desc}</p>
        <div style="margin-top: 14px; display: flex; align-items: center; gap: 14px;">
          <strong style="color: var(--color-primary); font-size: 1.1rem;">${item.price}</strong>
          <button class="order-btn" onclick="showToast('Đã chọn ${item.title} ☕')">Thử món này ngay</button>
        </div>
      </div>
    `;
  }

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMood(btn.dataset.mood);
    });
  });

  // Render initial
  renderMood('sleepy');
}

/* ==========================================================================
   4. Menu Filtering & Dynamic Rendering
   ========================================================================== */
const menuItems = [
  {
    id: 1,
    name: 'Cà Phê Phin Truyền Thống',
    category: 'coffee',
    price: '28.000đ',
    tag: 'Bán chạy nhất',
    desc: 'Robusta Buôn Ma Thuột nhỏ từng giọt chậm rãi, đậm đà với sữa đặc béo ngọt thơm ngậy.',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 2,
    name: 'Cà Phê Trứng Hà Nội',
    category: 'coffee',
    price: '45.000đ',
    tag: 'Đặc trưng của quán',
    desc: 'Lớp kem trứng đánh bông mịn như mây, thơm lừng không tanh, phủ trên nền cà phê nóng.',
    img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 3,
    name: 'Caramel Macchiato Đá',
    category: 'modern',
    price: '48.000đ',
    tag: 'Phổ biến',
    desc: 'Espresso thơm nồng, sữa tươi thanh trùng và sốt caramel vani béo ngậy ngọt ngào.',
    img: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 4,
    name: 'Cold Brew Cam Quế',
    category: 'modern',
    price: '45.000đ',
    tag: 'Thanh mát',
    desc: 'Cà phê Arabica ủ lạnh 16 tiếng với cam vàng tươi và thanh quế khô, hậu vị ngọt thanh.',
    img: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 5,
    name: 'Trà Đào Cam Sả Mật Ong',
    category: 'tea',
    price: '42.000đ',
    tag: 'Giải nhiệt',
    desc: 'Hương thơm sả tươi, vị ngọt giòn của đào ngâm hòa quyện cùng nước cốt cam tươi tự nhiên.',
    img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 6,
    name: 'Trà Oolong Sữa Nướng',
    category: 'tea',
    price: '40.000đ',
    tag: 'Thơm lừng',
    desc: 'Lá trà Oolong sao lửa đậm kết hợp cùng sữa tươi béo thơm tạo nên dư vị sâu lắng.',
    img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 7,
    name: 'Bánh Croissant Bơ Tươi',
    category: 'pastry',
    price: '32.000đ',
    tag: 'Nướng trong ngày',
    desc: 'Bánh sừng bò ngàn lớp xốp mềm, dậy mùi bơ Anchor Pháp béo ngậy và vỏ bánh giòn tan.',
    img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 8,
    name: 'Tiramisu Cacao Mềm Mịn',
    category: 'pastry',
    price: '45.000đ',
    tag: 'Món ngọt kinh điển',
    desc: 'Bánh ngấm vị rượu rum và cà phê espresso, kẹp kem phô mai mascarpone rắc bột cacao.',
    img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=500&q=80'
  }
];

function initMenu() {
  const menuGrid = document.getElementById('menuGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function render(filter) {
    if (!menuGrid) return;
    const filtered = filter === 'all' ? menuItems : menuItems.filter(item => item.category === filter);

    menuGrid.innerHTML = filtered.map(item => `
      <div class="menu-card" data-category="${item.category}">
        <div class="menu-card-img-wrap">
          <img src="${item.img}" alt="${item.name}" class="menu-card-img" loading="lazy">
          <span class="menu-item-tag">${item.tag}</span>
        </div>
        <div class="menu-card-body">
          <div class="menu-card-top">
            <h4 class="menu-title">${item.name}</h4>
            <span class="menu-price">${item.price}</span>
          </div>
          <p class="menu-desc">${item.desc}</p>
          <div class="menu-card-action">
            <span style="font-size: 0.8rem; color: var(--text-muted);">☕ Phục vụ nóng / đá</span>
            <button class="order-btn" onclick="showToast('Đã thêm &quot;${item.name}&quot; vào danh sách gợi ý! ✨')">
              Gọi món +
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      render(btn.dataset.filter);
    });
  });

  render('all');
}

/* ==========================================================================
   5. Web Audio API Ambient Sound Synthesizer (Works 100% Offline)
   ========================================================================== */
let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Sound generators state
const soundNodes = {
  rain: { source: null, gain: null, isPlaying: false },
  fire: { source: null, gain: null, isPlaying: false, timer: null },
  wind: { source: null, gain: null, isPlaying: false }
};

// Generates pink noise for rain/water
function createPinkNoiseBuffer(ctx, duration = 5) {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    b3 = 0.86650 * b3 + white * 0.3104856;
    b4 = 0.55000 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.0168980;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.07;
    b6 = white * 0.115926;
  }
  return buffer;
}

// Generate White noise buffer for wind/surf
function createWhiteNoiseBuffer(ctx, duration = 4) {
  const bufferSize = ctx.sampleRate * duration;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function startRain(volume) {
  const ctx = getAudioContext();
  if (!ctx) return;

  stopSound('rain');

  const noiseBuffer = createPinkNoiseBuffer(ctx, 4);
  const source = ctx.createBufferSource();
  source.buffer = noiseBuffer;
  source.loop = true;

  // Filter for soft rain sound
  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1000, ctx.currentTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume * 0.8, ctx.currentTime);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  source.start();

  soundNodes.rain.source = source;
  soundNodes.rain.gain = gain;
  soundNodes.rain.isPlaying = true;
}

function startFire(volume) {
  const ctx = getAudioContext();
  if (!ctx) return;

  stopSound('fire');

  // Campfire combines gentle rumble + crackles
  const noiseBuffer = createPinkNoiseBuffer(ctx, 3);
  const source = ctx.createBufferSource();
  source.buffer = noiseBuffer;
  source.loop = true;

  const lowpass = ctx.createBiquadFilter();
  lowpass.type = 'lowpass';
  lowpass.frequency.setValueAtTime(350, ctx.currentTime);

  const mainGain = ctx.createGain();
  mainGain.gain.setValueAtTime(volume * 0.6, ctx.currentTime);

  source.connect(lowpass);
  lowpass.connect(mainGain);
  mainGain.connect(ctx.destination);
  source.start();

  // Crackle bursts using periodic noise impulses
  const crackleTimer = setInterval(() => {
    if (!soundNodes.fire.isPlaying) return;
    if (Math.random() > 0.4) {
      try {
        const crackleBuffer = ctx.createBuffer(1, 1024, ctx.sampleRate);
        const cd = crackleBuffer.getChannelData(0);
        for (let i = 0; i < 1024; i++) {
          cd[i] = (Math.random() * 2 - 1) * Math.exp(-i / 150);
        }
        const crackleSource = ctx.createBufferSource();
        crackleSource.buffer = crackleBuffer;

        const crackleFilter = ctx.createBiquadFilter();
        crackleFilter.type = 'bandpass';
        crackleFilter.frequency.setValueAtTime(1800 + Math.random() * 800, ctx.currentTime);
        crackleFilter.Q.setValueAtTime(4, ctx.currentTime);

        const crackleGain = ctx.createGain();
        const crackleVol = (soundNodes.fire.gain ? soundNodes.fire.gain.gain.value : 0.3) * (0.4 + Math.random() * 0.8);
        crackleGain.gain.setValueAtTime(crackleVol, ctx.currentTime);

        crackleSource.connect(crackleFilter);
        crackleFilter.connect(crackleGain);
        crackleGain.connect(ctx.destination);
        crackleSource.start();
      } catch (e) {
        // Safe fall-through
      }
    }
  }, 180);

  soundNodes.fire.source = source;
  soundNodes.fire.gain = mainGain;
  soundNodes.fire.timer = crackleTimer;
  soundNodes.fire.isPlaying = true;
}

function startWind(volume) {
  const ctx = getAudioContext();
  if (!ctx) return;

  stopSound('wind');

  const noiseBuffer = createWhiteNoiseBuffer(ctx, 4);
  const source = ctx.createBufferSource();
  source.buffer = noiseBuffer;
  source.loop = true;

  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.setValueAtTime(420, ctx.currentTime);
  bandpass.Q.setValueAtTime(2.5, ctx.currentTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume * 0.5, ctx.currentTime);

  source.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(ctx.destination);

  source.start();

  soundNodes.wind.source = source;
  soundNodes.wind.gain = gain;
  soundNodes.wind.isPlaying = true;
}

function stopSound(type) {
  const node = soundNodes[type];
  if (!node) return;
  if (node.source) {
    try {
      node.source.stop();
      node.source.disconnect();
    } catch (e) {}
    node.source = null;
  }
  if (node.timer) {
    clearInterval(node.timer);
    node.timer = null;
  }
  node.isPlaying = false;
}

function playCompletionBell() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1); // A5

  gain.gain.setValueAtTime(0.4, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 1.8);
}

function initWebAudioMixer() {
  const rainSlider = document.getElementById('rainSlider');
  const fireSlider = document.getElementById('fireSlider');
  const windSlider = document.getElementById('windSlider');

  const soundButtons = document.querySelectorAll('.toggle-sound-btn');
  const masterMuteBtn = document.getElementById('masterMuteBtn');
  const relaxPresetBtn = document.getElementById('relaxPresetBtn');

  function updateTrack(type, slider, btn) {
    const val = parseFloat(slider.value) / 100;
    if (val > 0) {
      if (type === 'rain') startRain(val);
      if (type === 'fire') startFire(val);
      if (type === 'wind') startWind(val);
      btn.classList.add('active');
      btn.textContent = 'Tắt';
    } else {
      stopSound(type);
      btn.classList.remove('active');
      btn.textContent = 'Bật';
    }
  }

  // Bind sliders
  if (rainSlider) {
    rainSlider.addEventListener('input', () => {
      const btn = document.querySelector('[data-sound="rain"]');
      if (soundNodes.rain.isPlaying && soundNodes.rain.gain) {
        soundNodes.rain.gain.gain.setValueAtTime((parseFloat(rainSlider.value) / 100) * 0.8, audioCtx.currentTime);
      } else if (parseFloat(rainSlider.value) > 0) {
        updateTrack('rain', rainSlider, btn);
      }
    });
  }

  if (fireSlider) {
    fireSlider.addEventListener('input', () => {
      const btn = document.querySelector('[data-sound="fire"]');
      if (soundNodes.fire.isPlaying && soundNodes.fire.gain) {
        soundNodes.fire.gain.gain.setValueAtTime((parseFloat(fireSlider.value) / 100) * 0.6, audioCtx.currentTime);
      } else if (parseFloat(fireSlider.value) > 0) {
        updateTrack('fire', fireSlider, btn);
      }
    });
  }

  if (windSlider) {
    windSlider.addEventListener('input', () => {
      const btn = document.querySelector('[data-sound="wind"]');
      if (soundNodes.wind.isPlaying && soundNodes.wind.gain) {
        soundNodes.wind.gain.gain.setValueAtTime((parseFloat(windSlider.value) / 100) * 0.5, audioCtx.currentTime);
      } else if (parseFloat(windSlider.value) > 0) {
        updateTrack('wind', windSlider, btn);
      }
    });
  }

  // Toggle buttons
  soundButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const soundType = btn.dataset.sound;
      const slider = document.getElementById(`${soundType}Slider`);
      if (soundNodes[soundType].isPlaying) {
        stopSound(soundType);
        slider.value = 0;
        btn.classList.remove('active');
        btn.textContent = 'Bật';
      } else {
        slider.value = 50;
        updateTrack(soundType, slider, btn);
      }
    });
  });

  // Master Mute
  if (masterMuteBtn) {
    masterMuteBtn.addEventListener('click', () => {
      stopSound('rain');
      stopSound('fire');
      stopSound('wind');
      if (rainSlider) rainSlider.value = 0;
      if (fireSlider) fireSlider.value = 0;
      if (windSlider) windSlider.value = 0;
      soundButtons.forEach(b => {
        b.classList.remove('active');
        b.textContent = 'Bật';
      });
      showToast('Đã dừng toàn bộ âm thanh thư giãn.');
    });
  }

  // Preset "Đêm Mưa"
  if (relaxPresetBtn) {
    relaxPresetBtn.addEventListener('click', () => {
      if (rainSlider) rainSlider.value = 65;
      if (fireSlider) fireSlider.value = 40;
      if (windSlider) windSlider.value = 25;

      const rainBtn = document.querySelector('[data-sound="rain"]');
      const fireBtn = document.querySelector('[data-sound="fire"]');
      const windBtn = document.querySelector('[data-sound="wind"]');

      if (rainSlider && rainBtn) updateTrack('rain', rainSlider, rainBtn);
      if (fireSlider && fireBtn) updateTrack('fire', fireSlider, fireBtn);
      if (windSlider && windBtn) updateTrack('wind', windSlider, windBtn);

      showToast('Đã kích hoạt chế độ: Đêm Mưa Lách Tách 🌧️🪵');
    });
  }
}

/* ==========================================================================
   6. Pomodoro Focus Timer
   ========================================================================== */
function initPomodoro() {
  let timerInterval = null;
  let totalSeconds = 25 * 60;
  let remainingSeconds = totalSeconds;
  let isRunning = false;

  const timerTime = document.getElementById('timerTime');
  const timerStatus = document.getElementById('timerStatus');
  const startBtn = document.getElementById('startTimerBtn');
  const pauseBtn = document.getElementById('pauseTimerBtn');
  const resetBtn = document.getElementById('resetTimerBtn');
  const modeButtons = document.querySelectorAll('.timer-mode-btn');

  function updateDisplay() {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    if (timerTime) {
      timerTime.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  }

  function startTimer() {
    if (isRunning) return;
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    if (timerStatus) timerStatus.textContent = 'Đang đếm ngược... ⏳';

    timerInterval = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
        updateDisplay();
      } else {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        if (timerStatus) timerStatus.textContent = 'Hoàn thành phiên làm việc! 🎉';
        playCompletionBell();
        showToast('Keng keng! Đã hết thời gian, hãy vươn vai thư giãn nhé! ☕✨');
      }
    }, 1000);
  }

  function pauseTimer() {
    if (!isRunning) return;
    clearInterval(timerInterval);
    isRunning = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    if (timerStatus) timerStatus.textContent = 'Đang tạm dừng ⏸️';
  }

  function resetTimer() {
    pauseTimer();
    remainingSeconds = totalSeconds;
    updateDisplay();
    if (timerStatus) timerStatus.textContent = 'Sẵn sàng bắt đầu';
  }

  if (startBtn) startBtn.addEventListener('click', startTimer);
  if (pauseBtn) pauseBtn.addEventListener('click', pauseTimer);
  if (resetBtn) resetBtn.addEventListener('click', resetTimer);

  modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      modeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const minutes = parseInt(btn.dataset.minutes, 10);
      totalSeconds = minutes * 60;
      resetTimer();
      if (timerStatus) timerStatus.textContent = `Chế độ: ${btn.dataset.label}`;
    });
  });

  updateDisplay();
}

/* ==========================================================================
   7. Guestbook (Sổ Lưu Bút với LocalStorage)
   ========================================================================== */
const defaultNotes = [
  {
    name: 'Hà Linh',
    rating: 5,
    message: 'Quán có vibe rất êm, ngồi nghe tiếng mưa và thưởng thức một ly cà phê muối đúng là tuyệt vời!',
    date: 'Hôm qua, 14:20'
  },
  {
    name: 'Đức Anh (Freelancer)',
    rating: 5,
    message: 'Bật đồng hồ Pomodoro ở đây làm việc tập trung cực kỳ. Chắc chắn sẽ ghé lại thường xuyên!',
    date: '2 ngày trước'
  },
  {
    name: 'Phương Thảo',
    rating: 5,
    message: 'Bánh sừng bò nướng nóng hổi giòn rụm, bạn nhân viên nhiệt tình và nhạc lofi rất hay.',
    date: '3 ngày trước'
  }
];

function initGuestbook() {
  const form = document.getElementById('guestbookForm');
  const notesGrid = document.getElementById('notesGrid');
  const noteCount = document.getElementById('noteCount');
  const stars = document.querySelectorAll('#starRating .star');
  const ratingInput = document.getElementById('ratingValue');

  // Load from LocalStorage or default
  let notes = [];
  try {
    const stored = localStorage.getItem('cafe_guestbook_notes');
    notes = stored ? JSON.parse(stored) : defaultNotes;
  } catch (e) {
    notes = defaultNotes;
  }

  // Star Rating Interaction
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const val = parseInt(star.dataset.value, 10);
      if (ratingInput) ratingInput.value = val;
      stars.forEach(s => {
        const sVal = parseInt(s.dataset.value, 10);
        if (sVal <= val) {
          s.classList.add('selected');
        } else {
          s.classList.remove('selected');
        }
      });
    });
  });

  function renderNotes() {
    if (!notesGrid) return;
    if (noteCount) noteCount.textContent = `${notes.length} lời nhắn`;

    notesGrid.innerHTML = notes.map(note => `
      <div class="note-card">
        <div class="note-header">
          <span class="note-author">${escapeHtml(note.name)}</span>
          <span class="note-stars">${'★'.repeat(note.rating)}</span>
        </div>
        <p class="note-body">"${escapeHtml(note.message)}"</p>
        <span class="note-date">${note.date}</span>
      </div>
    `).join('');
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('guestName');
      const messageInput = document.getElementById('guestMessage');

      const name = nameInput.value.trim();
      const message = messageInput.value.trim();
      const rating = parseInt(ratingInput ? ratingInput.value : 5, 10);

      if (!name || !message) return;

      const newNote = {
        name,
        rating,
        message,
        date: 'Vừa xong'
      };

      notes.unshift(newNote);
      try {
        localStorage.setItem('cafe_guestbook_notes', JSON.stringify(notes));
      } catch (err) {}

      renderNotes();
      form.reset();
      // Reset stars to 5
      stars.forEach(s => s.classList.add('selected'));
      if (ratingInput) ratingInput.value = 5;

      showToast('Đã ghim mẩu nhắn dễ thương của bạn lên bảng! 📌');
    });
  }

  renderNotes();
}

/* ==========================================================================
   Helper Utilities
   ========================================================================== */
function showToast(text) {
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>💬</span> <span>${text}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.remove();
    }
  }, 3000);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

