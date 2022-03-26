
function draw() {
    const canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        const ctx = canvas.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(75, 50);
        ctx.lineTo(100, 75);
        ctx.lineTo(100, 25);
        ctx.moveTo(100, 100);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
        
        ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
        
        ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
        
        ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
        ctx.stroke();
    }

}
