/* FitPlan demo: sample data lives in the browser. No server or database is used. */
const STORAGE_KEY = "fitplan-workouts-v1";
const SAMPLE_WORKOUTS = [
  { id: "1", name: "Full-body strength", category: "Strength", duration: 45, difficulty: "Beginner" },
  { id: "2", name: "Interval cycling", category: "Cardio", duration: 30, difficulty: "Intermediate" },
  { id: "3", name: "Stretch and reset", category: "Mobility", duration: 20, difficulty: "Beginner" },
  { id: "4", name: "Upper-body strength", category: "Strength", duration: 40, difficulty: "Intermediate" },
  { id: "5", name: "Brisk walk", category: "Cardio", duration: 35, difficulty: "Beginner" },
  { id: "6", name: "Core and balance", category: "Mobility", duration: 25, difficulty: "Intermediate" }
];

function getWorkouts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null) {
      const workouts = JSON.parse(saved);
      if (Array.isArray(workouts)) return workouts;
    }
  } catch (error) {
    console.warn("Saved workouts are unavailable; showing example data.", error);
  }
  return SAMPLE_WORKOUTS.map(workout => ({ ...workout }));
}

function saveWorkouts(workouts) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts)); }
  catch (error) { console.warn("The browser could not save workouts.", error); }
}

function setupHome() {
  const count = document.getElementById("home-workout-count");
  if (!count) return;
  const workouts = getWorkouts();
  count.textContent = workouts.length;
  document.getElementById("home-total-minutes").textContent = workouts.reduce((sum, workout) => sum + Number(workout.duration), 0);
  document.getElementById("home-category-count").textContent = new Set(workouts.map(workout => workout.category)).size;
}

function setupManage() {
  const form = document.getElementById("workout-form");
  if (!form) return;
  const rows = document.getElementById("workout-rows");
  const status = document.getElementById("form-status");
  const cancelButton = document.getElementById("cancel-button");
  const saveButton = document.getElementById("save-button");
  const fields = {
    name: document.getElementById("workout-name"),
    category: document.getElementById("workout-category"),
    duration: document.getElementById("workout-duration"),
    difficulty: document.getElementById("workout-difficulty")
  };
  let editingId = null;

  function resetForm() {
    form.reset();
    editingId = null;
    saveButton.textContent = "Add workout";
    document.getElementById("form-title").textContent = "Add a workout";
    cancelButton.hidden = true;
  }

  function render() {
    const workouts = getWorkouts();
    rows.replaceChildren();
    for (const workout of workouts) {
      const row = document.createElement("tr");
      for (const value of [workout.name, workout.category, `${workout.duration} min`, workout.difficulty]) {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      }
      const actions = document.createElement("td");
      const wrap = document.createElement("div");
      wrap.className = "row-actions";
      for (const [action, label] of [["edit", "Edit"], ["delete", "Delete"]]) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `small-button ${action === "delete" ? "delete" : ""}`;
        button.dataset.action = action;
        button.dataset.id = workout.id;
        button.textContent = label;
        button.setAttribute("aria-label", `${label} ${workout.name}`);
        wrap.appendChild(button);
      }
      actions.appendChild(wrap);
      row.appendChild(actions);
      rows.appendChild(row);
    }
    document.getElementById("workout-count").textContent = `${workouts.length} workout${workouts.length === 1 ? "" : "s"}`;
    document.getElementById("empty-message").hidden = workouts.length > 0;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const workout = {
      id: editingId || `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: fields.name.value.trim(),
      category: fields.category.value,
      duration: Number(fields.duration.value),
      difficulty: fields.difficulty.value
    };
    if (!workout.name || !Number.isInteger(workout.duration) || workout.duration < 1 || workout.duration > 300) {
      status.textContent = "Enter a name and a duration between 1 and 300 minutes.";
      return;
    }
    const workouts = getWorkouts();
    const index = workouts.findIndex(item => item.id === editingId);
    if (index >= 0) workouts[index] = workout;
    else workouts.push(workout);
    saveWorkouts(workouts);
    status.textContent = index >= 0 ? "Workout updated." : "Workout added.";
    resetForm();
    render();
  });

  rows.addEventListener("click", event => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const workouts = getWorkouts();
    const selected = workouts.find(item => item.id === button.dataset.id);
    if (!selected) return;
    if (button.dataset.action === "delete") {
      saveWorkouts(workouts.filter(item => item.id !== selected.id));
      if (editingId === selected.id) resetForm();
      status.textContent = `${selected.name} deleted.`;
      render();
      return;
    }
    editingId = selected.id;
    fields.name.value = selected.name;
    fields.category.value = selected.category;
    fields.duration.value = selected.duration;
    fields.difficulty.value = selected.difficulty;
    document.getElementById("form-title").textContent = "Edit a workout";
    saveButton.textContent = "Save changes";
    cancelButton.hidden = false;
    status.textContent = `Editing ${selected.name}.`;
    fields.name.focus();
  });
  cancelButton.addEventListener("click", () => { resetForm(); status.textContent = "Edit cancelled."; });
  render();
}

function setupAnalytics() {
  const canvas = document.getElementById("workout-chart");
  if (!canvas) return;
  const categories = ["Strength", "Cardio", "Mobility"];
  const workouts = getWorkouts();
  const totals = categories.map(category => workouts
    .filter(workout => workout.category === category)
    .reduce((sum, workout) => sum + Number(workout.duration), 0));
  const summary = document.getElementById("analytics-summary");
  for (let i = 0; i < categories.length; i++) {
    const card = document.createElement("div");
    card.className = "category-total";
    const value = document.createElement("strong");
    value.textContent = `${totals[i]} min`;
    const label = document.createElement("span");
    label.textContent = categories[i];
    card.append(value, label);
    summary.appendChild(card);
  }
  const message = document.getElementById("chart-message");
  if (!workouts.length) { canvas.hidden = true; message.textContent = "Add a workout to see a chart."; return; }
  if (typeof Chart === "undefined") { canvas.hidden = true; message.textContent = "The chart library could not load. Check your internet connection; the totals are shown below."; return; }
  new Chart(canvas, {
    type: "bar",
    data: { labels: categories, datasets: [{ label: "Planned minutes", data: totals, backgroundColor: ["#216f5f", "#61b999", "#acd878"], borderRadius: 7 }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, title: { display: true, text: "Minutes" } } } }
  });
}

setupHome();
setupManage();
setupAnalytics();
