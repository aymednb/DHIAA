// State management
let currentStep = 1;
let points = 100;
let timer = null;
let answers = {
    activities: [],
    newSkills: [],
    advice: ''
};

// DOM Elements
const form = document.getElementById('survey-form');
const thankYou = document.getElementById('thank-you');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const errorMessage = document.getElementById('error-message');
const pointsDisplay = document.getElementById('points-display');
const highScore = document.getElementById('high-score');
const progressFill = document.getElementById('progress-fill');
const currentStepDisplay = document.getElementById('current-step');
const progressPercentage = document.getElementById('progress-percentage');

// Initialize points timer
function startPointsTimer() {
    timer = setInterval(() => {
        points = Math.max(0, points - 1);
        updatePointsDisplay();
    }, 1000);
}

// Update points display
function updatePointsDisplay() {
    pointsDisplay.textContent = `${points} points`;
    highScore.classList.toggle('hidden', points < 100);
    progressFill.style.width = `${(currentStep / 4) * 100}%`;
    currentStepDisplay.textContent = currentStep;
    progressPercentage.textContent = Math.round((currentStep / 4) * 100);
}

// Validate current step
function validateCurrentStep() {
    switch (currentStep) {
        case 1:
            const age = form.querySelector('input[name="age"]:checked');
            const gender = form.querySelector('input[name="gender"]:checked');
            if (!age || !gender) {
                showError('Please select your age and gender before proceeding.');
                return false;
            }
            break;
        case 2:
            const freeTime = form.querySelector('input[name="freeTimeHours"]:checked');
            const activities = form.querySelectorAll('input[name="activities"]:checked');
            if (!freeTime || activities.length === 0) {
                showError('Please answer all questions before proceeding.');
                return false;
            }
            break;
        case 3:
            const skills = form.querySelectorAll('input[name="newSkills"]:checked');
            const opportunities = form.querySelector('input[name="communityOpportunities"]:checked');
            if (skills.length === 0 || !opportunities) {
                showError('Please answer all questions before proceeding.');
                return false;
            }
            break;
        case 4:
            const advice = form.querySelector('textarea[name="advice"]').value;
            if (!advice || advice.trim().length < 10) {
                showError('Please provide your advice (minimum 10 characters) before submitting.');
                return false;
            }
            break;
    }
    hideError();
    return true;
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// Hide error message
function hideError() {
    errorMessage.classList.add('hidden');
}

// Update step visibility
function updateStepVisibility() {
    document.querySelectorAll('.step').forEach((step, index) => {
        step.classList.toggle('hidden', index + 1 !== currentStep);
    });
    prevButton.classList.toggle('hidden', currentStep === 1);
    nextButton.textContent = currentStep === 4 ? 'Submit' : 'Next';
    updatePointsDisplay();
}

// Handle next button click
nextButton.addEventListener('click', () => {
    if (currentStep === 4) {
        if (validateCurrentStep()) {
            submitForm();
        }
    } else if (validateCurrentStep()) {
        currentStep++;
        points += 20; // Award points for completing step
        updateStepVisibility();
    }
});

// Handle previous button click
prevButton.addEventListener('click', () => {
    currentStep = Math.max(1, currentStep - 1);
    hideError();
    updateStepVisibility();
});

// Submit form
function submitForm() {
    clearInterval(timer);
    points += 50; // Final bonus points
    form.classList.add('hidden');
    thankYou.classList.remove('hidden');
    document.getElementById('final-points').textContent = `Final Score: ${points} points`;
}

// Snow effect
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = Math.random() * 100 + 'vw';
    snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
    snowflake.style.opacity = Math.random() * 0.6 + 0.4 + '';
    snowflake.style.width = snowflake.style.height = Math.random() * 4 + 4 + 'px';
    
    document.body.appendChild(snowflake);

    setTimeout(() => {
        snowflake.remove();
    }, 5000);
}

// Initialize
function init() {
    updateStepVisibility();
    startPointsTimer();
    setInterval(createSnowflake, 100);
}

init();