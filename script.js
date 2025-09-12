// Wait until the entire HTML document is loaded and ready
document.addEventListener('DOMContentLoaded', () => {
    
    // Find our key elements on the page
    const magicButton = document.getElementById('magic-button');
    const resultDisplay = document.getElementById('result-display');

    // Add a 'click' event listener to the button
    magicButton.addEventListener('click', () => {
        
        // --- 1. COLLECT & VALIDATE DATA ---
        const choiceAName = document.getElementById('choice-a-name').value.trim();
        const choiceBName = document.getElementById('choice-b-name').value.trim();

        // This is the new validation check
        if (choiceAName === '' || choiceBName === '') {
            resultDisplay.innerHTML = `<h3>Halt!</h3><p>You must provide a name for both choices before the path can be revealed.</p>`;
            
            // We get the border style directly from the element for consistency
            const resultStyle = window.getComputedStyle(resultDisplay);
            const originalBorder = resultStyle.borderLeft;

            // Temporarily set a red border for the error
            resultDisplay.style.borderLeft = '5px solid #ff4757'; // A fiery error red

            // Optional: Revert the border color after a few seconds
            setTimeout(() => {
                resultDisplay.style.borderLeft = originalBorder;
            }, 3000);

            return; // IMPORTANT: This stops the function from running any further
        }
        
        // --- 2. IF VALIDATION PASSES, CONTINUE ---
        const regretA = parseInt(document.getElementById('choice-a-regret').value, 10);
        const regretB = parseInt(document.getElementById('choice-b-regret').value, 10);

        // Make sure the border is the correct neon color for a valid result
        // This is necessary because of the error state above
        resultDisplay.style.borderLeft = `5px solid var(--neon-accent)`;

        // --- 3. THE "LAW OF REGRETS" ALGORITHM ---
        let recommendation = '';

        if (regretA > regretB) {
            recommendation = `<h3>Your Path is Clear: **${choiceAName}**</h3><p>Your regret score for not choosing this was significantly higher (${regretA} vs ${regretB}). Your gut is telling you this is the way to go.</p>`;
        } else if (regretB > regretA) {
            recommendation = `<h3>Your Path is Clear: **${choiceBName}**</h3><p>Your regret score for not choosing this was significantly higher (${regretB} vs ${regretA}). Your gut is telling you this is the way to go.</p>`;
        } else {
            recommendation = `<h3>A Perfect Tie (${regretA} vs ${regretB})</h3><p>Your regret scores are identical. This decision requires a closer look at your pros and cons. Neither choice holds a stronger pull of potential regret.</p>`;
        }

        // --- 4. DISPLAY THE RESULT ---
        resultDisplay.innerHTML = recommendation;
    });
});