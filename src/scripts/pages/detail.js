// QUANTITY BUTTON 

function totalClick(click) {
    const totalClicks = document.getElementById('');
    const sumvalue = parseInt(totalClicks.innerHTML) + click;
    totalClicks.innerHTML = sumvalue;

    // Avoid negative numbers
    if(sumvalue < 0) {
        totalClicks.innerHTML = 0;
    }
}
