document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.querySelector('.game-area');
    const basket = document.getElementById('basket');
    const scoreDisplay = document.getElementById('score');
    const gameOverScreen = document.getElementById('game-over-screen');
    const finalScoreDisplay = document.getElementById('final-score');
    const retryButton = document.getElementById('retry-button');

    let scores = 0;
    let gameRunning = true;
    let beerInterval;
    let beers = [];

    // Game area dimensions
    const gameAreaWidth = gameArea.offsetWidth;
    const gameAreaHeight = gameArea.offsetHeight;
    const basketWidth = basket.offsetWidth;

    // Move basket with mouse movement
    gameArea.addEventListener('mousemove', (e) => {
        if (!gameRunning) return; // Disable basket movement if game is not running

        const x = e.clientX - gameArea.getBoundingClientRect().left;
        const basketHalfWidth = basketWidth / 2;

        let basketX = x - basketHalfWidth;

        if (basketX < 0) {
            basketX = 0;
        }

        if (basketX > gameAreaWidth - basketWidth) {
            basketX = gameAreaWidth - basketWidth;
        }

        basket.style.left = basketX + 'px';
    });

    // Function to create a new beer
    function createBeer() {
        const beer = document.createElement('div');
        beer.classList.add('beer');
        beer.style.left = Math.random() * (gameAreaWidth - 40) + 'px';
        gameArea.appendChild(beer);

        animateBeer(beer);
        beers.push(beer); // Add beer to array
    }

    // Function to animate the beer falling
    function animateBeer(beer) {
        let beerTop = 0;
        const beerSpeed = 2; // Adjust speed as needed

        function updateBeer() {
            if (!gameRunning) return;

            beerTop += beerSpeed;
            beer.style.top = beerTop + 'px';

            // Check if beer is caught
            if (beerTop > gameAreaHeight - 50 && beerTop < gameAreaHeight) {
                const basketLeft = basket.offsetLeft;
                const basketRight = basketLeft + basketWidth;
                const beerLeft = beer.offsetLeft;
                const beerRight = beerLeft + beer.offsetWidth;

                if (beerRight > basketLeft && beerLeft < basketRight) {
                    scores++;
                    scoreDisplay.innerText = 'Score: ' + scores;
                    resetBeer(beer);
                    return; // Exit function if beer is caught
                }
            }

            // Check if beer missed
            if (beerTop >= gameAreaHeight) {
                gameOver();
                return; // Exit function if beer is missed
            }

            requestAnimationFrame(updateBeer);
        }

        // Start the beer animation
        requestAnimationFrame(updateBeer);
    }

    // Function to reset beer position
    function resetBeer(beer) {
        beer.remove();
        beers = beers.filter(b => b !== beer); // Remove beer from array

        // Check if all beers are gone and game is running
        if (beers.length === 0 && gameRunning) {
            startGame();
        }
    }

    // Game over function
    function gameOver() {
        gameRunning = false;
        clearInterval(beerInterval); // Clear beer creation interval
        gameOverScreen.style.display = 'flex'; // Display game over screen
        finalScoreDisplay.innerText = scores;
    }

    // Function to start the game
    function startGame() {
        // Clear existing beers
        beers.forEach(beer => beer.remove());
        beers = [];

        gameRunning = true;
        beerInterval = setInterval(() => {
            if (!gameRunning) {
                clearInterval(beerInterval);
                return;
            }
            createBeer();
        }, 1000); // Adjust interval as needed
    }

    // Retry button event listener
    retryButton.addEventListener('click', () => {
        gameOverScreen.style.display = 'none'; // Hide game over screen
        scores = 0;
        scoreDisplay.innerText = 'Score: 0';
        startGame();
    });

    // Start the game initially
    startGame();
});
