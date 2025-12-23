document.addEventListener("DOMContentLoaded", () => {
  const timeElement = document.getElementById("time");
  const greetingElement = document.getElementById("greeting");
  const name = "Xiaxu"; // 你可以在这里修改你的名字

  // 个性化问候语库
  const greetings = {
    lateNight: [
      // 00:00 - 05:00
      "Still up, ${name}?",
      "The world sleeps, you build, ${name}.",
      "Late night inspiration, ${name}?",
      "Go to sleep, ${name}.",
      "Coding into the void, ${name}.",
      "Compiling dreams, ${name}?",
      "Silence is golden for coding, ${name}.",
      "Just one more line, right ${name}?",
    ],
    morning: [
      // 05:00 - 11:00
      "Ready to ship code, ${name}?",
      "Coffee first, bugs later, ${name}.",
      "Seize the day, ${name}.",
      "Let's make something cool, ${name}.",
      "New day, new commits, ${name}.",
      "May your build pass, ${name}.",
      "Time to conquer the backlog, ${name}.",
      "System online. Welcome back, ${name}.",
    ],
    afternoon: [
      // 11:00 - 17:00
      "Stay focused, ${name}.",
      "Keep pushing, ${name}.",
      "Don't forget to hydrate, ${name}.",
      "In the flow state, ${name}?",
      "Squashing bugs or creating them, ${name}?",
      "Don't break production, ${name}.",
      "Time for a context switch, ${name}?",
      "Halfway through, keep going, ${name}.",
    ],
    evening: [
      // 17:00 - 22:00
      "Time to relax, ${name}?",
      "Great work today, ${name}.",
      "Any side projects tonight, ${name}?",
      "Reviewing the day's code, ${name}?",
      "Commit and chill, ${name}?",
      "Learning something new tonight, ${name}?",
      "Switching to dark mode, ${name}.",
      "Refactoring the mind, ${name}.",
    ],
    night: [
      // 22:00 - 24:00
      "Time to wind down, ${name}.",
      "Rest is important, ${name}.",
      "See you tomorrow, ${name}.",
      "Offline mode soon, ${name}?",
      "Save your progress, ${name}.",
      "Recharge your battery, ${name}.",
      "Dream in code, ${name}.",
    ],
  };

  let currentHour = -1; // 用于追踪小时变化

  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    timeElement.textContent = `${hours}:${minutes}`;
    document.title = `${hours}:${minutes} | Start Page`;

    // 只有当小时发生变化时，或者页面刚加载时（currentHour为-1），才更新问候语
    // 这样可以避免每秒刷新导致问候语狂闪，同时保证随机性
    const hour = now.getHours();
    if (hour !== currentHour) {
      currentHour = hour;
      let timeOfDay = "morning";
      if (hour >= 0 && hour < 5) timeOfDay = "lateNight";
      else if (hour >= 5 && hour < 11) timeOfDay = "morning";
      else if (hour >= 11 && hour < 17) timeOfDay = "afternoon";
      else if (hour >= 17 && hour < 22) timeOfDay = "evening";
      else timeOfDay = "night";

      const options = greetings[timeOfDay];
      const randomGreeting =
        options[Math.floor(Math.random() * options.length)];
      greetingElement.textContent = randomGreeting.replace("${name}", name);
    }
  }

  updateTime();
  setInterval(updateTime, 1000);

  // 打字机效果
  const searchInput = document.querySelector('input[name="q"]');
  const prompts = [
    "What are you looking for?",
    "Search for papers on ArXiv...",
    "Find code on GitHub...",
    "Ask ChatGPT a question...",
    "Explore models on HuggingFace...",
  ];

  let promptIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeWriter() {
    const currentPrompt = prompts[promptIndex];

    if (isDeleting) {
      searchInput.setAttribute(
        "placeholder",
        currentPrompt.substring(0, charIndex - 1)
      );
      charIndex--;
      typeSpeed = 50; // 删除速度快一点
    } else {
      searchInput.setAttribute(
        "placeholder",
        currentPrompt.substring(0, charIndex + 1)
      );
      charIndex++;
      typeSpeed = 100; // 打字速度正常
    }

    if (!isDeleting && charIndex === currentPrompt.length) {
      isDeleting = true;
      typeSpeed = 2000; // 打完字后停顿一下
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      promptIndex = (promptIndex + 1) % prompts.length;
      typeSpeed = 500; // 切换到下一句前停顿一下
    }

    setTimeout(typeWriter, typeSpeed);
  }

  // 启动打字机
  setTimeout(typeWriter, 1000);

  // 格言随机显示
  const quoteElement = document.getElementById("quote");
  const quotes = [
    "Stay hungry, Stay foolish.",
    "Talk is cheap. Show me the code.",
    "Simplicity is the soul of efficiency.",
    "Code is like humor. When you have to explain it, it’s bad.",
    "Make it work, make it right, make it fast.",
    "The only way to do great work is to love what you do.",
    "Innovation distinguishes between a leader and a follower.",
    "Knowledge is power.",
    "First, solve the problem. Then, write the code.",
    "It’s not a bug. It’s an undocumented feature.",
    "Software is eating the world.",
  ];

  function updateQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteElement.textContent = quotes[randomIndex];
  }

  updateQuote();
});
