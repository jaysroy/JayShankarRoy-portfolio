const body = document.body;
const themeBtn = document.getElementById('themeToggle');
const title = document.getElementById('mainTitle');
const sub = document.getElementById('subTitle');
const input = document.getElementById('goalInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('goalList');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');

// 1. THEME TOGGLE LOGIC
themeBtn.onclick = () => {
    if (body.classList.contains('daily-theme')) {
        switchToGym();
    } else {
        switchToDaily();
    }
    localStorage.setItem('theme', body.className); // Save theme to local storage
};

function switchToGym() {
    body.className = 'gym-theme';
    themeBtn.innerText = "Switch to Normal Mode 🏠";
    title.innerText = "IRON PULSE";
    sub.innerText = "NO PAIN, NO GAIN.";
}

function switchToDaily() {
    body.className = 'daily-theme';
    themeBtn.innerText = "Switch to Beast Mode ⚡";
    title.innerText = "Daily Bloom";
    sub.innerText = "Small steps every day.";
}

// 2. LOADING DATA ON START
window.onload = () => {
    // Load Theme Preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'gym-theme') switchToGym();
    else switchToDaily();

    // Load Goal Data
    const savedGoals = JSON.parse(localStorage.getItem('myGoals')) || [];
    savedGoals.forEach(g => createGoal(g.text, g.completed));
};

// 3. CREATE GOAL UI ELEMENT
function createGoal(text, isCompleted = false) {
    const li = document.createElement('li');
    li.innerText = text;
    if (isCompleted) li.classList.add('completed');
    
    // Toggle check/uncheck
    li.onclick = () => li.classList.toggle('completed');
    
    // Right-click (Context Menu) to delete single item
    li.oncontextmenu = (e) => {
        e.preventDefault();
        li.remove();
    };

    list.appendChild(li);
}

// 4. ADD NEW GOAL
addBtn.onclick = () => {
    if (input.value.trim() !== "") {
        createGoal(input.value);
        input.value = "";
    }
};

// 5. SAVE PROGRESS BUTTON
saveBtn.onclick = () => {
    const goals = [];
    document.querySelectorAll('li').forEach(li => {
        goals.push({
            text: li.innerText,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('myGoals', JSON.stringify(goals));
    alert("Progress locked in! ✅");
};

// 6. RESET ALL BUTTON
resetBtn.onclick = () => {
    if (confirm("Are you sure? This will wipe your daily records!")) {
        list.innerHTML = "";
        localStorage.removeItem('myGoals');
    }
};