// document.addEventListener('DOMContentLoaded', () => { This waits until the HTML page finishes loading before running the script.

// Why? Because if the script runs too early, getElementById will fail since elements don’t exist yet.


    const magicButton = document.getElementById('magic-button');
    const continueButton = document.getElementById('continue-button');
    const resultDisplay = document.getElementById('result-display');
const backendUrl = 'https://decision-room-backend.onrender.com/api/analyze';
    const steps = [
        document.getElementById('step-1'),
        document.getElementById('step-2'),
        document.getElementById('step-3'),
        document.getElementById('step-4'),
    ];

    let currentStep = 0;

    continueButton.addEventListener('click', () => {
        if (currentStep === 0) {
            if (document.getElementById('decision-subject').value.trim() === '') {
                alert('Please enter what you are deciding on.');
                return;
            }
        }
        if (currentStep === 1) {
            if (document.getElementById('choice-a-name').value.trim() === '' || document.getElementById('choice-b-name').value.trim() === '') {
                alert('Please provide a name for both choices.');
                return;
            }
        }
        
        steps[currentStep].classList.add('hidden');
        currentStep++;

        if (currentStep < steps.length) {
            steps[currentStep].classList.remove('hidden');
        }

        if (currentStep === steps.length) {
            continueButton.classList.add('hidden');
            magicButton.classList.remove('hidden'); // This was the line with the typo
        }
    });

    magicButton.addEventListener('click', async () => {
        const choiceA = {
            name: document.getElementById('choice-a-name').value.trim(),
            pros: document.getElementById('choice-a-pros').value.trim(),
            cons: document.getElementById('choice-a-cons').value.trim(),
            regretScore: parseInt(document.getElementById('choice-a-regret').value, 10)
        };
        const choiceB = {
            name: document.getElementById('choice-b-name').value.trim(),
            pros: document.getElementById('choice-b-pros').value.trim(),
            cons: document.getElementById('choice-b-cons').value.trim(),
            regretScore: parseInt(document.getElementById('choice-b-regret').value, 10)
        };

        resultDisplay.innerHTML = `<p>Connecting to the oracle... Analyzing the paths...</p>`;

        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ choiceA, choiceB }),
            });

            if (!response.ok) { throw new Error(`Server responded with status: ${response.status}`); }

            const data = await response.json();
            resultDisplay.innerHTML = data.recommendation;

        } catch (error) {
            console.error('Error fetching analysis:', error);
            resultDisplay.innerHTML = `<h3>Connection Error</h3><p>Could not connect to the analysis server.</p>`;
        }
    });
});