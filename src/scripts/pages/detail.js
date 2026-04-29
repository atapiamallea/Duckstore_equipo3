// QUANTITY BUTTON 

function totalClick(click) {
    // 1. Target the span where the number is shown
    const totalClicksSpan = document.getElementById('totalClicks');
    
    // 2. Get current value and add the click (1 or -1)
    let sumValue = parseInt(totalClicksSpan.innerHTML) + click;
    
    // 3. Avoid negative numbers
    if (sumValue < 0) {
        sumValue = 0;
    }

    // 4. Update the text on the screen
    totalClicksSpan.innerHTML = sumValue;
}