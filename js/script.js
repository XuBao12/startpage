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
});
