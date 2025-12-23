document.addEventListener("DOMContentLoaded", () => {
  const timeElement = document.getElementById("time");
  const greetingElement = document.getElementById("greeting");
  const name = "Xiaxu"; // 你可以在这里修改你的名字

  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    timeElement.textContent = `${hours}:${minutes}`;

    // 更新问候语
    const hour = now.getHours();
    let greeting = "";
    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";
    else greeting = "Good Evening";

    greetingElement.textContent = `${greeting}, ${name}.`;
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
});
