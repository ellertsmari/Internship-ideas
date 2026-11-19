// The page works without this file. It adds the numbers, the tally in the
// hero, the filter buttons, "Surprise me" and the copy buttons.

const ideas = [...document.querySelectorAll(".idea")];

// Who is an idea from? Anyone who is not Smári or Claude counts as "you".
function group(idea) {
  const from = (idea.dataset.from || "").trim().toLowerCase();
  if (from === "smári" || from === "smari") return "smari";
  if (from === "claude") return "claude";
  return "you";
}

// Numbers, and a "build on this" link on every card.
ideas.forEach((idea, i) => {
  idea.dataset.n = String(i + 1).padStart(2, "0");
  idea.dataset.group = group(idea);

  const link = document.createElement("a");
  link.className = "build-link";
  link.href = "#build";
  link.textContent = "+ Build on this";
  idea.append(link);
});

// The tally in the hero.
const count = (g) => ideas.filter((idea) => idea.dataset.group === g).length;
const yours = count("you");
const tally = document.getElementById("tally");
if (tally) {
  tally.innerHTML =
    `<b>${count("smari")}</b> from Smári · <b>${count("claude")}</b> from Claude · ` +
    (yours === 0
      ? `<span class="zero"><b>0</b> from you, so far</span>`
      : `<b>${yours}</b> from you`);
}

// Filter buttons.
const controls = document.getElementById("controls");
if (controls) {
  controls.hidden = false;
  controls.addEventListener("click", (event) => {
    const chip = event.target.closest("[data-filter]");
    if (!chip) return;
    controls.querySelectorAll("[data-filter]").forEach((c) => c.classList.toggle("is-on", c === chip));
    ideas.forEach((idea) => {
      idea.hidden = chip.dataset.filter !== "all" && idea.dataset.group !== chip.dataset.filter;
    });
  });
}

// Surprise me: jump to a random idea and give it a shake.
const surprise = document.getElementById("surprise");
if (surprise) {
  surprise.addEventListener("click", () => {
    const visible = ideas.filter((idea) => !idea.hidden);
    if (!visible.length) return;
    const pick = visible[Math.floor(Math.random() * visible.length)];
    pick.scrollIntoView({ block: "center" });
    pick.classList.remove("pop");
    void pick.offsetWidth; // restart the animation
    pick.classList.add("pop");
  });
}

// Copy buttons on the code blocks.
document.querySelectorAll("pre").forEach((pre) => {
  const text = pre.textContent;
  const button = document.createElement("button");
  button.className = "copy";
  button.textContent = "Copy";
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.append(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    button.textContent = "Copied";
    button.classList.add("done");
    setTimeout(() => {
      button.textContent = "Copy";
      button.classList.remove("done");
    }, 1500);
  });
  const wrap = document.createElement("div");
  wrap.className = "code";
  pre.replaceWith(wrap);
  wrap.append(pre, button);
});
