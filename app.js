document.addEventListener("DOMContentLoaded", () => {
    const dino = document.querySelector(".dino")
    const grid = document.querySelector(".grid")
    const alert = document.getElementById("alert")
    let isJumping = false
    let gravity = 0.9
    let isGameOver = false


    // GAME CONTROLS
    function control(e) {
        if (e.keyCode === 32) {
            if(!isJumping) {
                isJumping = true
                jump()
            }
            
        }
    }
    document.addEventListener("keyup", control)
    
    // MAKE CHARACTER JUMP
    let position = 0
    function jump() {
        let count = 0
        let timerId = setInterval(function() { 
            // MOVE DOWN
            if (count === 15) {
                clearInterval(timerId)
                console.log("down")
                let downTimerId = setInterval(function () {
                    if (count === 0) {
                        clearInterval(downTimerId)
                        isJumping = false
                    }
                    position -= 5
                    count--
                    position = position * gravity
                    dino.style.bottom = position + "px"
                })
              
            }
            
            // MOVE UP
            console.log("up")
            position += 30
            count++
            position = position * gravity
            dino.style.bottom = position + "px"
            console.log(dino.style.bottom)
        }, 20)
    }

    // OBSTACLE GENERATOR FOR DINO'S PATH
    function generateObstacles() {
        let randomTime = Math.random() * 4000
        let obstaclePosition = 1000
        const obstacle = document.createElement("div")
        if (!isGameOver) obstacle.classList.add("obstacle")
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + "px"


        // MOVES OBSTACLE CLOSER TO DINO
        let timerId = setInterval(function () {
            // IF OBSTACLE HITS POSITION 0
            if (obstaclePosition > 0 && obstaclePosition < 60 && position <60) {
                clearInterval(timerId)
                alert.innerHTML = "Game Over!"
                isGameOver = true
                // REMOVE ALL CHILDREN
                while (grid.firstChild) {
                    grid.removeChild(grid.lastChild)
                }
        }
            // OBSTACLE GETS CLOSER TO DINO
            obstaclePosition -=10
            obstacle.style.left = obstaclePosition + "px"
        }, 20)
        if (!isGameOver) setTimeout(generateObstacles, randomTime)
    }
    generateObstacles()




})