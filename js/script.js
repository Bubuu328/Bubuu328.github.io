function initProposal() {
  const modal = document.getElementById("proposalModal");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const mainTitle = document.getElementById("mainTitle");

  const trollNoMessages = [
    "Oh come on! 🥺",
    "Really? 😢",
    "You sure? 💔",
    "Last chance! 😅",
    "Nope, try again! 😏",
    "Not an option! 🙅",
    "Nice try! 😤",
    "Ohhhh! Ayaw nya talaga ako! 😭",
    "KEEP TRYING LOL 😹",
    "Good luck! Tulitt mo ahh 🤣",
    "This is painful to watch 💀",
  ];

  let noClickCount = 0;
  let shuffledMessages = [...trollNoMessages];
  let messageIndex = 0;
  let hasShaken = false;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function screenShake() {
    const container = document.querySelector(".container");
    if (container) {
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          container.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
        }, i * 50);
      }
      setTimeout(() => {
        container.style.transform = "translate(0, 0)";
      }, 300);
    }
  }

  function beep() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.value = 800;
      osc.type = "sine";
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.1);
    } catch (e) {}
  }

  document.addEventListener("mousemove", function (e) {
    if (noClickCount >= 2 && noClickCount < 20) {
      const rect = noBtn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - btnCenterX, 2) +
          Math.pow(e.clientY - btnCenterY, 2),
      );

      if (distance < 200) {
        const angle = Math.atan2(
          btnCenterY - e.clientY,
          btnCenterX - e.clientX,
        );

        const maxX = window.innerWidth - 100;
        const maxY = window.innerHeight - 50;
        const newX = Math.min(
          maxX,
          Math.max(-50, Math.cos(angle) * 400 + (Math.random() * 150 - 75)),
        );
        const newY = Math.min(
          maxY,
          Math.max(-50, Math.sin(angle) * 400 + (Math.random() * 150 - 75)),
        );
        const scale = Math.max(0.2, 1 - noClickCount * 0.06);
        const rotation = Math.sin(Date.now() / 100) * 25;
        noBtn.style.transform = `translate(${newX}px, ${newY}px) rotate(${rotation}deg) scale(${scale})`;
      }
    }
  });

  noBtn.addEventListener("click", function (e) {
    e.preventDefault();
    noClickCount++;
    beep();
    screenShake();

    if (noClickCount === 1) {
      shuffleArray(shuffledMessages);
      noBtn.textContent = shuffledMessages[messageIndex];
      messageIndex = (messageIndex + 1) % shuffledMessages.length;
    } else if (noClickCount === 2) {
      noBtn.style.position = "fixed";
      noBtn.style.pointerEvents = "auto";
      noBtn.style.zIndex = "999";
      noBtn.textContent = shuffledMessages[messageIndex];
      messageIndex = (messageIndex + 1) % shuffledMessages.length;
    } else if (noClickCount >= 3 && noClickCount < 20) {
      const positions = [
        { x: window.innerWidth - 100, y: 50 },
        { x: 20, y: window.innerHeight - 60 },
        { x: window.innerWidth - 100, y: window.innerHeight - 60 },
        { x: 20, y: 50 },
        {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
      ];
      const randomPos = positions[Math.floor(Math.random() * positions.length)];
      const scale = Math.max(0.2, 1 - noClickCount * 0.06);
      const rotation = (noClickCount * 45) % 360;

      noBtn.style.transition = "none";
      noBtn.style.transform = `translate(${randomPos.x}px, ${randomPos.y}px) rotate(${rotation}deg) scale(${scale})`;

      noBtn.textContent = shuffledMessages[messageIndex];
      messageIndex = (messageIndex + 1) % shuffledMessages.length;

      noBtn.style.animation = "shake 0.1s";
      setTimeout(() => {
        noBtn.style.animation = "none";
      }, 100);
    } else if (noClickCount >= 20) {
      noBtn.disabled = true;
      noBtn.style.opacity = "0";
      noBtn.style.pointerEvents = "none";
      noBtn.textContent = "I WIN 😎🏆";
      setTimeout(() => {
        noBtn.style.display = "none";
      }, 500);
    }
  });

  yesBtn.addEventListener("click", function () {
    confetti();
    modal.classList.add("hidden");
    mainTitle.textContent = "💕 Happy Anniversary 💕";
    document.title = "Happy Anniversary! ❤️";

    setTimeout(() => {
      alert(
        "You said YES! 🎉💕\n\nHere's to many more anniversaries together!",
      );
    }, 600);
  });
}

document.addEventListener("DOMContentLoaded", initProposal);

function createHearts() {
  const container = document.getElementById("hearts-container");
  const heartSymbols = ["❤️", "💕", "💖", "💗", "💝"];

  for (let i = 0; i < 15; i++) {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent =
      heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDelay = Math.random() * 2 + "s";
    heart.style.animationDuration = 5 + Math.random() * 2 + "s";
    heart.style.fontSize = 1.5 + Math.random() * 1.5 + "rem";
    container.appendChild(heart);
  }
}

window.addEventListener("load", createHearts);

function confetti() {
  const colors = ["❤️", "💕", "💖", "💗", "💝"];
  for (let i = 0; i < 30; i++) {
    const element = document.createElement("div");
    element.textContent = colors[Math.floor(Math.random() * colors.length)];
    element.style.position = "fixed";
    element.style.left = Math.random() * window.innerWidth + "px";
    element.style.top = "-20px";
    element.style.fontSize = "2rem";
    element.style.zIndex = "999";
    element.style.pointerEvents = "none";
    document.body.appendChild(element);

    let top = -20;
    let opacity = 1;
    const interval = setInterval(() => {
      top += Math.random() * 8;
      opacity -= 0.02;
      element.style.top = top + "px";
      element.style.opacity = opacity;
      if (opacity <= 0) {
        clearInterval(interval);
        element.remove();
      }
    }, 30);
  }
}

document.querySelector(".button")?.addEventListener("click", function () {
  setTimeout(confetti, 500);
});

function trollAlert() {
  const trollMessages = [
    "Wait... did you actually think I made this? My girlfriend did. 😏",
    "Sorry, she's too good for you too, mate 💅",
    "This website is better than your love life 📱✨",
    "Plot twist: She made this to break up with you 🎭",
    "You know what's worse than this trolling? Accepting fries stolen 🍟😤",
  ];
  return trollMessages[Math.floor(Math.random() * trollMessages.length)];
}

const button = document.querySelector(".button");
if (button) {
  button.addEventListener("click", function (e) {
    const randomTroll = Math.random();
    if (randomTroll > 0.5) {
      alert("❤️ I love you more! 💕\n\n" + trollAlert());
    }
  });
}

function initTrollZone() {
  const trollMessages = {
    btn1: [
      "Of course you will! 💕",
      "BET! 🔥",
      "Promise me na talaga talaga 🥺",
      "Wehh? Walang doubt? 😏",
      "I'm counting on you! 👀",
    ],
    btn2: [
      "More than fries? 🍟",
      "More than sleep? 😴",
      "More than WiFi? 📶",
      "More than your phone? 📱",
      "INFINITY AMOUNT! 💕",
    ],
    btn3: [
      "Even when you're busy? 😔",
      "All the time na? 24/7?",
      "I miss you too 😭",
      "You better! 😤",
      "ALWAYS ALWAYS! ❤️",
    ],
    btn4: [
      "Your only favorite? 👑",
      "Better than food? 🍟",
      "Better than sleep? 😴",
      "YEAH I THOUGHT SO! 😏",
      "You better say yes 😤",
    ],
  };

  ["1", "2", "3", "4"].forEach((num) => {
    const btn = document.getElementById(`trollBtn${num}`);
    const msg = document.getElementById(`trollMsg${num}`);
    let clickCount = 0;

    if (btn) {
      btn.addEventListener("click", function () {
        clickCount++;
        const messages = trollMessages[`btn${num}`];
        msg.textContent = messages[clickCount % messages.length];
        msg.style.animation = "none";
        setTimeout(() => {
          msg.style.animation = "fadeIn 0.3s";
        }, 10);
      });
    }
  });

  const fakeDownloadBtn = document.getElementById("fakeDownloadBtn");
  let downloadClicks = 0;

  if (fakeDownloadBtn) {
    fakeDownloadBtn.addEventListener("click", function () {
      downloadClicks++;
      const downloadStatus = document.getElementById("downloadStatus");
      downloadStatus.style.display = "block";

      const statuses = [
        "⏳ Downloading your love... 10%",
        "⏳ Downloading your love... 25%",
        "⏳ Downloading your love... 50%",
        "⏳ Downloading your love... 75%",
        "❌ ERROR: File too large for my heart 💔",
        "💾 Download cancelled, love cannot be downloaded only felt ❤️",
        "🚫 STOP trying to download me, just keep me! 😏",
      ];

      downloadStatus.textContent =
        statuses[Math.min(downloadClicks - 1, statuses.length - 1)];

      if (downloadClicks === 7) {
        fakeDownloadBtn.disabled = true;
        fakeDownloadBtn.style.opacity = "0.5";
        fakeDownloadBtn.style.cursor = "not-allowed";
      }
    });
  }

  const truthBtn = document.getElementById("truthBtn");
  const truthBox = document.getElementById("truthBox");
  const truthText = document.getElementById("truthText");

  const truths = [
    "You're my favorite distraction 💕",
    "I think about you way too much (like right now)",
    "Your laugh is my favorite sound 🎵",
    "You make me want to be better 💪",
    "I'm not good with words, but I love you a lot",
    "You're my home, not a place 🏠",
    "I love you even when you steal my food 🍕",
    "You're the weirdest person I know... and I love it 😂",
    "You complete me in the corniest way possible ❤️",
    "You're stuck with me forever, sorry not sorry 😏",
  ];

  let truthIndex = 0;

  if (truthBtn) {
    truthBtn.addEventListener("click", function () {
      truthBox.style.display = "block";
      truthText.textContent = truths[truthIndex];
      truthIndex = (truthIndex + 1) % truths.length;

      truthBox.style.animation = "none";
      setTimeout(() => {
        truthBox.style.animation = "slideUp 0.4s ease-out";
      }, 10);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initTrollZone();
  initGalleryLightbox();
});

function initGalleryLightbox() {
  // Create lightbox HTML
  const lightbox = document.createElement("div");
  lightbox.id = "galleryLightbox";
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <span class="lightbox-close">&times;</span>
    <img class="lightbox-img" src="" alt="" />
  `;
  document.body.appendChild(lightbox);

  const galleryImages = document.querySelectorAll(".gallery img");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeBtn = document.querySelector(".lightbox-close");

  galleryImages.forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", function () {
      lightbox.style.display = "flex";
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
      document.body.style.overflow = "hidden";
    });
  });

  closeBtn.addEventListener("click", function () {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
  });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      lightbox.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });
}
