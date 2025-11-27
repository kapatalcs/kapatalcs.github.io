// === Yazı Efekti - Satır + Segment + Efekt ===
function typeWriterSegmentedLine(container, segments, delay = 40) {
  return new Promise(async (resolve) => {
    const p = document.createElement("p");
    container.appendChild(p);

    for (const segment of segments) {
      const tag = segment.href ? 'a' : (segment.tag || 'span');
      const el = document.createElement(tag);

      if (segment.class) el.className = segment.class;
      if (segment.href) {
        el.href = segment.href;
        el.target = "_blank";
        el.rel = "noopener noreferrer";
      }

      p.appendChild(el);

      await new Promise((r) => {
        let i = 0;
        const interval = setInterval(() => {
          el.textContent += segment.text.charAt(i);
          i++;
          if (i >= segment.text.length) {
            clearInterval(interval);
            r();
          }
        }, delay);
      });
    }

    resolve();
  });
}

async function typeWriterSegmentedLines(container, lines, delay = 40) {
  for (const line of lines) {
    await typeWriterSegmentedLine(container, line, delay);
  }
}

// === Welcome Mesajı Fonksiyonu ===
function showWelcomeMessage() {
  const outputWrapper = document.getElementById("output-wrapper");
  outputWrapper.innerHTML = '<div class="welcome-message"></div>';
  const welcome = outputWrapper.querySelector(".welcome-message");
  typeWriterSegmentedLines(welcome, [
    [
      { text: "Welcome! This is my personal website.I'll develop this site over time." },
      {text: "ㅤㅤㅤType "},
      { text: "help", class: "command" },
      { text: " to start." }
    ]
  ], 40);
}

// === Terminal Komutları ===
const commands = {
  help: {
    description: "Show all commands",
    execute: () => {
      const container = document.createElement("div");
      container.className = "command-output";
      const lines = Object.entries(commands).map(([cmd, detail]) => ([
        { text: cmd, class: "command" },
        { text: ` - ${detail.description}` }
      ]));
      typeWriterSegmentedLines(container, lines, 30);
      return container;
    },
  },
  about: {
    description: "Who am I and what I do",
    execute: () => {
      const container = document.createElement("div");
      container.className = "command-output";
      const lines = [
        [{ text: "Hello! I'm Yusuf İslam Özaydın, a passionate developer." }],
        [{ text: "I'm a student obsessed with Purple Team and security engineering." }],
        [{ text: "Lately I've been focusing on Red team related projects." }]
      ];
      typeWriterSegmentedLines(container, lines, 30);
      return container;
    },
  },
  projects: {
    description: "Show my featured projects",
    execute: () => {
      const container = document.createElement("div");
      container.className = "command-output";
      const lines = [
        [{ text: "My recent works:" }],
        [
          { text: "- " },
          { text: "kapatal-dev-env-saltstack", tag: "a", class: "link", href: "https://github.com/kapatalcs/kapatal-dev-env-saltstack" },
          { text: "  — SaltStack state to automate the setup of a development environment for user." }
        ],
        [
          { text: "- " },
          { text: "kapatal-wordpress", tag: "a", class: "link", href: "https://github.com/kapatalcs/kapatal-wordpress" },
          { text: "  — Automated user setup, Docker, WordPress, and HAProxy deployment for Kapatal server using SaltStack." }
        ],
        [
          { text: "- " },
          { text: "Encrypted-Chat-App", tag: "a", class: "link", href: "https://github.com/kapatalcs/Encrypted-Chat-App" },
          { text: "  — This project is a multi-user CLI-based chat application developed using Python with RSA encryption support." }
        ],
        [
          { text: "- " },
          { text: "Password-Manager", tag: "a", class: "link", href: "https://github.com/kapatalcs/Password-Manager" },
          { text: " — This project is a password manager developed to securely store account information." }
        ],
         [
          { text: "- " },
          { text: "Snake-AI DQN", tag: "a", class: "link", href: "https://github.com/kapatalcs/SnakeAI-DQN" },
          { text: " — A self-learning AI that plays the classic Snake game using Deep Q-Learning combined with a rule-based Hybrid Solver." }
        ],
         [
          { text: "- " },
          { text: "Port Scanner", tag: "a", class: "link", href: "https://github.com/kapatalcs/Port-Scanner" },
          { text: " — This is a basic TCP port scanner written in Python. It scans the first 1000 TCP ports of a given target, displays open ports with their corresponding services, and logs the results into a file." }
        ]
      ];
      typeWriterSegmentedLines(container, lines, 30);
      return container;
    },
  },
  skills: {
    description: "List my technical skills",
    execute: () => {
      const container = document.createElement("div");
      container.className = "command-output";
      const lines = [
        [{ text: "Core competencies:" }],
        [{ text: "- Programming Languages: Python, Javascript, C#, C" }],
        [{ text: "- Saltstack for automation and configuration" }],
        [{ text: "- Linux distributions such as Ubuntu, Debian and Kali" }],
        [{ text: "- Basic proficiency in Bash" }]
      ];
      typeWriterSegmentedLines(container, lines, 30);
      return container;
    },
  },
  contact: {
    description: "How to reach me",
    execute: () => {
      const container = document.createElement("div");
      container.className = "command-output";
      const lines = [
        [{ text: "Let's connect!" }],
        [
          { text: "- Email: " },
          { text: "yusufislamozaydin@gmail.com", tag: "a", class: "link", href: "mailto:yusufislamozaydin@gmail.com" }
        ],
        [
          { text: "- LinkedIn: " },
          { text: "https://tr.linkedin.com/in/yusufislamozaydin", tag: "a", class: "link", href: "https://tr.linkedin.com/in/yusufislamozaydin" }
        ],
        [
          { text: "- Github: " },
          { text: "https://github.com/kapatalcs", tag: "a", class: "link", href: "https://github.com/kapatalcs" }
        ]
      ];
      typeWriterSegmentedLines(container, lines, 30);
      return container;
    },
  },
  cv: {
    description: "Download my CV (PDF)",
    execute: () => {
      const pdfUrl = 'cv.pdf';
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'yusuf_islam_ozaydin_cv.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return "CV is downloading...";
    },
  },
  clear: {
    description: "Clear terminal",
    execute: () => {
      showWelcomeMessage();
      return "";
    },
  },
};

// === Terminal Olayları ===
document.addEventListener("DOMContentLoaded", () => {
  const outputWrapper = document.getElementById("output-wrapper");
  const commandInput = document.getElementById("command-input");

  showWelcomeMessage();

  commandInput.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const cmd = commandInput.value.trim();
      commandInput.value = "";

      if (!cmd) return;

      const baseCommand = cmd.toLowerCase();

      const outputDiv = document.createElement("div");
      outputDiv.className = "output";
      outputDiv.innerHTML = `<div class="command-line"><span class="prompt">$</span> ${cmd}</div>`;

      if (commands[baseCommand]) {
        const result = commands[baseCommand].execute();
        if (typeof result === "string") {
          const p = document.createElement("p");
          p.textContent = result;
          outputDiv.appendChild(p);
        } else {
          outputDiv.appendChild(result);
        }
      } else {
        const error = document.createElement("div");
        error.className = "error";
        error.textContent = `Command not found: ${baseCommand}`;
        outputDiv.appendChild(error);
      }

      outputWrapper.appendChild(outputDiv);
      setTimeout(() => {
        outputWrapper.scrollTop = outputWrapper.scrollHeight;
        commandInput.focus();
      }, 0);
    }
  });

  commandInput.focus();
});

function updateClock() {
  const now = new Date();
  const clockElement = document.getElementById('terminal-clock');
  
  const timeString = now.toLocaleTimeString('tr-TR', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  const dateString = now.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '.');
  
  clockElement.textContent = `🕒 ${timeString} | 📅 ${dateString}`;
}

setInterval(updateClock, 1000);
document.addEventListener('DOMContentLoaded', updateClock);

// --- Müzik Kütüphanesi ---
const musicLibrary = [
  {
    title: "Lo-Fi Coding",
    artist: "Chill Vibes",
    file: "assets/music/lofi.mp3",
    cover: "assets/music/covers/lofi.jpeg"
  },
  {
    title: "Ambient Space",
    artist: "Cosmic Waves",
    file: "assets/music/ambient.mp3",
    cover: "assets/music/covers/ambient.jpeg"
  },
  {
    title: "Focus Mode",
    artist: "Deep Work",
    file: "assets/music/focus.mp3",
    cover: "assets/music/covers/focus.jpeg"
  }
];

// DOM elementleri
const audio = document.getElementById('audio');
const musicCover = document.getElementById('music-cover');
const musicTitle = document.getElementById('music-title');
const musicArtist = document.getElementById('music-artist');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

let currentTrack = -1;
let isPlaying = false;

function loadTrack(trackIndex) {
  if (trackIndex < 0 || trackIndex >= musicLibrary.length) {
    musicCover.src = "assets/music/covers/default.jpg";
    musicTitle.textContent = "Müzik Seçilmedi";
    musicArtist.textContent = "Terminal Player";
    document.getElementById('music-bar-title').textContent = "Müzik Seçilmedi";
    audio.src = "";
    return;
  }

  const track = musicLibrary[trackIndex];
  audio.src = track.file;
  musicCover.src = track.cover;
  musicTitle.textContent = track.title;
  musicArtist.textContent = track.artist;
  document.getElementById('music-bar-title').textContent = track.title;
  document.getElementById('music-bar-time').textContent = "0:00";
  
  audio.addEventListener('loadedmetadata', function() {
    updateDuration();
    updateMobileTime();
  });
}

function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}

function playMusic() {
  if (currentTrack === -1) {
    currentTrack = 0;
    loadTrack(currentTrack);
  }
  audio.play().catch(err => console.error("Play hatası:", err));
  playBtn.textContent = "⏸";
  document.getElementById('mobile-play').textContent = "⏸";
  isPlaying = true;
}

function pauseMusic() {
  audio.pause();
  playBtn.textContent = "▶";
  document.getElementById('mobile-play').textContent = "▶";
  isPlaying = false;
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % musicLibrary.length;
  loadTrack(currentTrack);
  if (isPlaying) {
    audio.play().catch(err => console.error("Oynatma hatası:", err));
  }
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + musicLibrary.length) % musicLibrary.length;
  loadTrack(currentTrack);
  if (isPlaying) {
    audio.play().catch(err => console.error("Oynatma hatası:", err));
  }
}

function updateDuration() {
  const duration = audio.duration || 0;
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60).toString().padStart(2, '0');
  durationEl.textContent = `${minutes}:${seconds}`;
}

function updateProgress() {
  const { currentTime, duration } = audio;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.setProperty('--progress', `${progressPercent}%`);

  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
  currentTimeEl.textContent = `${minutes}:${seconds}`;
}

function updateMobileTime() {
  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
  document.getElementById('music-bar-time').textContent = `${minutes}:${seconds}`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextTrack);
prevBtn.addEventListener('click', prevTrack);
progressBar.addEventListener('click', setProgress);

document.getElementById('mobile-play').addEventListener('click', togglePlay);
document.getElementById('mobile-next').addEventListener('click', nextTrack);
document.getElementById('mobile-prev').addEventListener('click', prevTrack);

audio.addEventListener('timeupdate', function() {
  updateProgress();
  updateMobileTime();
});

audio.addEventListener('loadedmetadata', updateDuration);
audio.addEventListener('ended', nextTrack);

document.addEventListener('DOMContentLoaded', () => {
  if (window.innerWidth <= 600) {
    document.getElementById('music-bar-compact').style.display = 'flex';
  }
  
  loadTrack(currentTrack);
});

// Pencere boyutu değiştiğinde
window.addEventListener('resize', () => {
  if (window.innerWidth <= 600) {
    document.getElementById('music-bar-compact').style.display = 'flex';
  } else {
    document.getElementById('music-bar-compact').style.display = 'none';
  }
});
