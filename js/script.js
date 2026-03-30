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
    "Plot twist: He made this to break up with you 🎭",
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
    "I love you even when you always steal my food 🍕",
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
  initGameFeature();
  initRoastFeature();
  initCrystalBall();
  initSweetBtn();
  initTitleEasterEgg();
  initFooterEasterEgg();
});

function initGameFeature() {
  const gameAnswers = {
    food: [
      "I'm pretty sure pizza is a vegetable, right? 🍕",
      "Fries > any meal... especially yours 😏",
      "I'd choose food over you... jk, but fries come close 🍟",
      "My superpower? Stealing your food without you noticing 👻",
      "Sharing food = true love test. You fail every time 💔😂",
    ],
    habit: [
      "I check on you 47 times a day... okay fine, 48 times 👀",
      "I absolutely WILL forget important details but remember random stuff 🧠",
      "My bad habit is being too perfect... jk obviously not 😅",
      "I hog the covers like I own the whole bed 🛏️",
    ],
    crazy: [
      "I once researched your favorite movie for 3 hours just to understand you better 🎬",
      "I talk to myself about you constantly. My brain is obsessed 🤪",
      "I'd probably do something wild like THIS... a whole website! 🌐",
      "I'm crazy enough to believe you love me back 💕",
      "I've definitely googled 'how to be a better partner' at 2 AM 📱",
    ],
    love: [
      "Quality time... but like, Me cooking while you steal food 🍳",
      "Acts of service: Me making food disappear from your plate 🍽️",
      "Words of affirmation... delivered in my most sarcastic voice 🗣️",
      "Physical touch: Me clinging to you like I'm going away forever 🤗",
      "Gift giving: Future gifts for future anniversaries 🎁",
    ],
    superpower: [
      "Making you smile even when you swear you're mad at me 😊",
      "Stealing your food and you somehow not noticing... yet 👻",
      "Loving you more every single day 💕",
      "Turning a simple moment into a memory you'll never forget ✨",
      "Being annoyingly perfect at annoying you 😏",
    ],
  };

  document.querySelectorAll(".game-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const topic = this.dataset.topic;
      const answers = gameAnswers[topic];
      const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
      const answerDiv = document.getElementById("gameAnswer");

      answerDiv.style.animation = "none";
      setTimeout(() => {
        answerDiv.textContent = randomAnswer;
        answerDiv.style.animation = "slideUp 0.4s ease-out";
      }, 10);
    });
  });
}

function initRoastFeature() {
  const roastBtn = document.getElementById("roastBtn");
  const roastInput = document.getElementById("roastInput");
  const roastResponse = document.getElementById("roastResponse");

  const roastResponses = [
    "Okay, noted! I'll add that to my 'things you secretly love' list 📝",
    "WAIT, you SECRETLY love that? I thought you hated me for it! 😭",
    "Aww, so you DO think my weirdness is cute? I knew it! 😏💕",
    "This just made my day. Actually, scratch that, my whole LIFE 🥺",
    "I'm saving this. For arguments. And keeping it forever 📸",
    "You love my weirdness?? Marry m— oh wait, technically we're married by internet standards now 💍",
    "Breaking: You admit I'm not THAT annoying. Progress! 🎉",
    "This is being screenshot and sent to everyone I know 📱",
    "Okay so we're officially a crazy couple. I can live with that 🤪💕",
    "Did you just compliment me?? BEEP BOOP ERROR 404 💫",
  ];

  const emojis = ["🎯", "💕", "✨", "🔥", "😏", "🎉", "💫", "👏", "🌟", "💯"];

  roastBtn.addEventListener("click", function () {
    if (roastInput.value.trim() || !roastInput.value.trim()) {
      const response =
        roastResponses[Math.floor(Math.random() * roastResponses.length)];
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];

      roastResponse.style.animation = "none";
      setTimeout(() => {
        roastResponse.textContent = `${response} ${emoji}`;
        roastResponse.style.animation = "slideUp 0.4s ease-out";
      }, 10);

      roastInput.value = "";
    }
  });

  roastInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      roastBtn.click();
    }
  });
}

function initCrystalBall() {
  const crystalBall = document.getElementById("crystalBall");
  const prediction = document.getElementById("prediction");

  const predictions = [
    "Future prediction: I'll still love you more than Chicken and Fries... and that's saying something 🍟💕",
    "I see... a lot of 'I love you' texts, failed attempts to leave you on read, and forever ❤️",
    "Crystal ball says: You'll never get rid of me. Even tried to return me, didn't work 😏",
    "World domination? Nah. Our future? Dominating life together 👑💫",
    "The future shows us: Still arguing about fries, still madly in love, still perfect ✨",
    "Prediction: Every day with you will be better than the last. Plot twist: It's already happening 🌟",
    "I see wrinkles, gray hair, and still holding hands. Beautiful, really 👵👴💕",
    "Your future: Stuck with my weirdness forever. RIP your sanity 👻😂",
    "Actually the crystal ball just shows your face smiling. That's our future right there 😊💕",
    "Ooh! I see us being actually official now. Wait, we already are. Crystal ball confirmed it 🎉",
  ];

  crystalBall.addEventListener("click", function () {
    crystalBall.style.animation = "none";
    prediction.style.animation = "none";

    setTimeout(() => {
      const randomPrediction =
        predictions[Math.floor(Math.random() * predictions.length)];
      prediction.textContent = randomPrediction;
      crystalBall.style.animation = "bounce 0.6s ease-out";
      prediction.style.animation = "slideUp 0.4s ease-out";
    }, 10);
  });
}

function initSweetBtn() {
  const sweetBtn = document.getElementById("sweetBtn");
  const sweetMessages = [
    "I love you too! 💕",
    "You just made my heart do a backflip ✨",
    "I promise to love you forever (and not steal your food forever) 🍟💕",
    "You saying something sweet just made my whole year 😭💕",
    "Aww stop, you're making me blush 🥺❤️",
    "I love you more! (Let's not fight about it) 💕",
    "This declaration goes straight to my heart and my weird journal 📖💫",
  ];

  if (sweetBtn) {
    sweetBtn.addEventListener("click", function () {
      const msg =
        sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
      setTimeout(() => {
        alert(`💕 ${msg} 💕`);
        confetti();
      }, 300);
    });
  }
}

function initTitleEasterEgg() {
  const mainTitle = document.getElementById("mainTitle");
  let clickCount = 0;

  const titleMessages = [
    "👀 Looking for Easter eggs?",
    "🎉 You found one!",
    "💕 I love that you're exploring!",
    "😏 Keep clicking, there's more!",
    "🔥 You're a professional clicker!",
    "⚡ ULTIMATE POWER: CLICKING",
    "🌟 You're officially part of the secret club",
    "💪 Clicking strength: MAXED OUT",
    "🚀 To the moon with our love!",
    "∞ This could go on forever... like my love for you",
  ];

  if (mainTitle) {
    mainTitle.addEventListener("click", function (e) {
      clickCount++;
      mainTitle.style.animation = "none";
      setTimeout(() => {
        const message =
          titleMessages[Math.min(clickCount - 1, titleMessages.length - 1)];
        mainTitle.textContent = message;
        mainTitle.style.animation = "bounce 0.6s ease-out";
      }, 10);

      // Extra surprise after 5 clicks
      if (clickCount === 5) {
        confetti();
      }

      // Reset after 3 seconds of no clicking
      clearTimeout(mainTitle.resetTimeout);
      mainTitle.resetTimeout = setTimeout(() => {
        clickCount = 0;
        mainTitle.textContent = "💕 Happy Anniversary 💕";
      }, 5000);
    });
  }
}

function initFooterEasterEgg() {
  const easterFooter = document.getElementById("easterFooter");
  const footerMsg = document.getElementById("footerMsg");

  const footerSecrets = [
    "🔐 Secret message: You make my heart go boom boom 💓",
    "🤫 Shhhh... I think about you way too much",
    "💌 This whole website is actually just me screaming: I LOVE YOU!",
    "🎭 Plot twist: Every word here is true despite my trolling",
    "😏 Okay fine, you caught me being romantic. Don't tell anyone",
    "🌙 Fun fact: I probably made this at 2 AM thinking about you",
    "⭐ Here's the real secret: You're literally everything to me",
    "🔑 The secret ingredient to this website? Pure unfiltered love",
    "📜 This is basically me confessing my feelings in 500 different ways",
  ];

  if (easterFooter) {
    easterFooter.addEventListener("click", function () {
      const secret =
        footerSecrets[Math.floor(Math.random() * footerSecrets.length)];
      footerMsg.textContent = secret;
      footerMsg.style.animation = "none";
      setTimeout(() => {
        footerMsg.style.animation = "slideUp 0.4s ease-out";
      }, 10);
    });
  }
}

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
