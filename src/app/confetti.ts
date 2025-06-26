// confetti.ts - Simple confetti animation for Angular
export function launchConfetti(targetId: string) {
  const colors = ["#6366f1", "#f472b6", "#3b82f6", "#fbbf24", "#34d399", "#f87171", "#a78bfa", "#38bdf8"];
  const numConfetti = 120;
  const confettiContainer = document.createElement("div");
  confettiContainer.style.position = "fixed";
  confettiContainer.style.left = "0";
  confettiContainer.style.top = "0";
  confettiContainer.style.width = "100vw";
  confettiContainer.style.height = "100vh";
  confettiContainer.style.pointerEvents = "none";
  confettiContainer.style.zIndex = "9999";
  for (let i = 0; i < numConfetti; i++) {
    const conf = document.createElement("div");
    const size = Math.random() * 8 + 6;
    conf.style.position = "absolute";
    conf.style.width = `${size}px`;
    conf.style.height = `${size * 0.6}px`;
    conf.style.background = colors[Math.floor(Math.random() * colors.length)];
    conf.style.borderRadius = `${Math.random() * 50 + 25}%`;
    conf.style.left = `${Math.random() * 100}vw`;
    conf.style.top = `-${size * 2}px`;
    conf.style.opacity = `${Math.random() * 0.5 + 0.5}`;
    conf.style.transform = `rotate(${Math.random() * 360}deg)`;
    conf.style.transition = `top 2.2s cubic-bezier(.23,1.02,.67,1) ${Math.random()}s, left 2.2s linear ${Math.random()}s, opacity 0.5s`;
    confettiContainer.appendChild(conf);
    setTimeout(() => {
      conf.style.top = `${100 + Math.random() * 10}vh`;
      conf.style.left = `${Math.random() * 100}vw`;
      conf.style.opacity = "0";
    }, 30);
  }
  document.body.appendChild(confettiContainer);
  setTimeout(() => {
    confettiContainer.remove();
  }, 3000);
}
