document.getElementById("equationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var eq1 = document.getElementById("eq1").value; 
    var eq2 = document.getElementById("eq2").value;

    // Parsing equations and extracting coefficients
    var eq1Parts = parseEquation(eq1);
    var eq2Parts = parseEquation(eq2);

    if (!eq1Parts || !eq2Parts) {
        document.getElementById("answerContainer").innerHTML = "Invalid equations. Please enter equations in the format 'ax + by = c'.";
        return;
    }

    var a1 = eq1Parts.a;
    var b1 = eq1Parts.b;
    var c1 = eq1Parts.c;

    var a2 = eq2Parts.a;
    var b2 = eq2Parts.b;
    var c2 = eq2Parts.c;

    // Calculating determinant
    var det = a1 * b2 - a2 * b1;
    if (det === 0) {
        document.getElementById("answerContainer").innerHTML = "The system of equations has no solution or infinite solutions.";
        return;
    }

    var x = (c1 * b2 - c2 * b1) / det;
    var y = (a1 * c2 - a2 * c1) / det;

    var answerContainer = document.getElementById("answerContainer");
    answerContainer.innerHTML = "x = " + x + ", y = " + y;
    answerContainer.style.display = "block"; // Show the container after setting the answer
});

function parseEquation(eq) {
    var regex = /(-?\d*)\s*x\s*([+-]?)\s*(\d*)\s*y\s*=\s*(\d*)/;
    var parts = eq.match(regex);
    if (!parts) return null;
    return {
        a: parseInt(parts[1]) || 0,
        b: (parts[2] + (parts[3] || "1")),
        c: parseInt(parts[4]) || 0
    };
}

// Initially hide the answer container
document.getElementById("answerContainer").style.display = "none";
