const codes = document.querySelectorAll('.code');


codes[ 0 ].focus();


/* This code snippet is adding event listeners to each element with the class name 'code'. For each
'code' element, it listens for a keydown event. If the key pressed is a number between 0 and 9, it
clears the value of the current 'code' element and then focuses on the next 'code' element after a
short delay of 10 milliseconds. If the key pressed is the 'Backspace' key, it focuses on the
previous 'code' element after a short delay of 10 milliseconds. This functionality is typically used
for handling input in a sequence of input fields, like entering a code or password digit by digit. */
codes.forEach((code, index) => {
    code.addEventListener('keydown', (e) => {
        if (e.key >= 0 && e.key <= 9) {
            codes[ index ].value = '';
            setTimeout(() => codes[ index + 1 ].focus(), 10);
        } else if (e.key === 'Backspace') {
            setTimeout(() => codes[ index - 1 ].focus(), 10);
        }
    });
});


/**
 * The function `validateKey` checks if the input key matches a secret key and displays a success or
 * error message accordingly.
 */
function validateKey () {
    const digits = [];
    for (let i = 1; i <= 16; i++) {
        const value = document.getElementById(`digit${ i }`).value;
        digits.push(value);
    }

    const studentResult = digits.join('');
    const secretKey = '3611111211111632';

    if (studentResult === secretKey) {
        showPopup("Success!", "✅ Master key correct! You have completed the Escape Room", true);
        showConfeti();
    } else {
        showPopup("Error", "❌ Incorrect key. Check the challenge values.", false);
        showExplosion();
    }
}


/**
 * The function `showPopup` displays a popup with a specified title, message, and border color based on
 * whether it is a success or error message.
 * @param title - The parameter "titulo" is a string that represents the title of the popup window
 * that will be displayed.
 * @param message - The parameter "mensaje" in the function "showPopup" is used to specify the message
 * content that will be displayed in the popup. It is the text that will be shown to the user in the
 * popup window.
 * @param success - The parameter `exito` in the `showPopup` function is a boolean value that determines
 * whether the popup should display a success or error message. If `exito` is `true`, the popup content
 * border will be set to green, indicating a success message. If `exito` is
 */
function showPopup (title, message, success) {
    document.getElementById("popup-title").textContent = title;
    document.getElementById("popup-message").textContent = message;

    const popup = document.getElementById("popup");
    popup.style.display = "flex";

    popup.querySelector(".popup-content").style.border = success ? "4px solid green" : "4px solid red";
}

/**
 * The function closePopup hides the popup element on the webpage.
 */
function closePopup () {
    document.getElementById("popup").style.display = "none";
}


/**
 * The function `showConfeti` generates a confetti effect with 150 particles spread out and originating
 * from 60% down the screen.
 */
function showConfeti () {
    confetti({
        particleCount: 250,
        spread: 100,
        origin: { y: 0.6 }
    });
}

/**
 * The function `showExplosion` creates a visual explosion effect on a webpage by generating and
 * animating multiple particles.
 */
function showExplosion () {
    const explosion = document.getElementById("explosion");
    explosion.innerHTML = '';

    for (let i = 0; i < 20; i++) {
        const div = document.createElement("div");
        div.className = "particle";
        explosion.appendChild(div);
    }

    anime({
        targets: '.particle',
        translateX: () => anime.random(-400, 400),
        translateY: () => anime.random(-400, 400),
        scale: () => anime.random(2, 5),
        easing: 'easeOutExpo',
        duration: 1500,
        complete: () => explosion.innerHTML = ''
    });
}
