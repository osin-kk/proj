document.addEventListener('DOMContentLoaded', () => {
    const keys = document.querySelectorAll('.key');
    const cells = document.querySelectorAll('.cell');
    let currentGuess = '';
    let guessIndex = 0;
    const targetWord = "APPLE"; // Example target word
    const maxAttempts = 6 * 5; // Maximum number of attempts (e.g., 6 attempts for 5-letter words)

    const checkGuess = (guess) => {
        for (let i = 0; i < 5; i++) {
            const cell = cells[guessIndex - 5 + i];
            const letter = guess[i];

            if (targetWord[i] === letter) {
                cell.style.backgroundColor = 'green'; // Correct letter and position
            } else if (targetWord.includes(letter)) {
                cell.style.backgroundColor = 'yellow'; // Correct letter, wrong position
            } else {
                cell.style.backgroundColor = 'grey'; // Incorrect letter
            }
        }

        // Check for win or max attempts reached
        if (guess === targetWord) {
            alert('Congratulations! You guessed the word!');
            // Implement any further winning logic here
        } else if (guessIndex >= maxAttempts) {
            alert(`Game over! The word was: ${targetWord}`);
            // Implement any game-over logic here
        }
    };

    keys.forEach(key => {
        key.addEventListener('click', () => {
            if (currentGuess.length < 5 && guessIndex < maxAttempts) {
                currentGuess += key.textContent;
                cells[guessIndex].textContent = key.textContent;
                guessIndex++;
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && currentGuess.length > 0 && guessIndex % 5 !== 0) {
            guessIndex--;
            currentGuess = currentGuess.slice(0, -1);
            cells[guessIndex].textContent = '';
        } else if (e.key === 'Enter' && currentGuess.length === 5) {
            checkGuess(currentGuess);
            // Reset for the next guess
            currentGuess = '';
            guessIndex += 5 - (guessIndex % 5);
        }
    });
});

