//You might have some game state so you can keep track of
//what is happening:
let score;  //The players score, built-in, cannot be removed.
let dead; //The player's dead state

//You might have some constants that you use
const speed = 300;  //In pixels per second

//This is a helper function to compute the distance
//between two sprites
function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

//This setup function is called once when the game starts
function setup(sprites) {
    score = 0;      //set score to zero
    dead = false; //Player is alive by default
    sprites[0].image = "🧍"; //Standing man
    sprites[0].x = 100;
    sprites[0].y = 100;
    sprites[1].image = "☢️"; //Radiation particle 1
    sprites[1].x = 600;
    sprites[1].y = 350;
    sprites[2].image = "☣️"; //Radiation particle 2
    sprites[2].x = 250;
    sprites[2].y = 150;
    sprites[3].image = "☢️"; //Radiation particle 3
    sprites[3].x = 200;
    sprites[3].y = 350;
    //Starting from here, these radiation particles are stored in memory until drawn eachtime the score reaches +20
    sprites[4].image = "";
    sprites[4].x = 200;
    sprites[4].y = 100;
    sprites[5].image = "";
    sprites[5].x = 500;
    sprites[5].y = 100;
    sprites[6].image = "";
    sprites[6].x = 200;
    sprites[6].y = 200;
}
//The Velocity for the particles
//Set to 0 for debugging / coordinate adjustment purposes
//Each particle cannot share the same vx and vy, otherwise there will be bounce collision conflictions!
let SpeedValues = [100, 100, 100, 100, 100, 100]
let vx = 100; //default 100
let vy = 100;
let vx2 = 100;
let vy2 = 100;
let vx3 = 100;
let vy3 = 100;
let vx4 = 100;
let vy4 = 100;
let vx5 = 100;
let vy5 = 100;
let vx6 = 100;
let vy6 = 100;

/**
 * This function is called every frame
 * @param sprites   Array of sprite objects
 * @param t         Seconds since start of game
 * @param dt        Seconds since last frame (A very small number)
 * @param up        Is up arrow pressed?
 * @param down      "
 * @param left      "
 * @param right     "
 * @param space     Is spacebar pressed?
 * @returns The current score
 */
function frame(sprites, t, dt, up, down, left, right, space) {
    //Keep references to the sprites in some variables with
    //better names:
    const player = sprites[0]; //Easier to remember
    const RadiationOne = sprites[1]; //Easier to remember
    const RadiationTwo = sprites[2]; //Easier to remember
    const RadiationThree = sprites[3];

    //Game killcode for the dead state
    if (dead){
        alert("Game over! Refresh page to start again!")
        speed = 0;
    }

    score += dt;
    if (score < 1000000){
        Math.floor(score + 1)
    }
    //Move the player
    if (up) {
        //Speed is in pixels per second, and
        //dt is the number of seconds that have
        //passed since the last frame.
        //
        //Multiply them together so that the
        //truck moves at the same speed if the
        //computer is fast or slow
        player.y += speed * dt;
    } 
    if (down) {
        player.y -= speed * dt;
    }
    if (right) {
        player.x += speed * dt;
        sprites[0].image = "🏃‍♂️";
        //You can flipH a spright so it is facing
        //the other direction
        player.flipH = true;
    }
    if (left) {
        player.x -= speed * dt;
        sprites[0].image = "🏃‍♂️";
        player.flipH = false;
    }

    //Killcode lines for radiation touching player
    if (distance(player, RadiationOne) < 50) {
        dead = true;
    }

    if (distance(player, RadiationTwo) < 50) {
        dead = true;
    }

    if (distance(player, RadiationThree) < 50) {
        dead = true;
    }


    //stops the player from leaving the frame horizontally
    if (sprites[0].x < -20)
        sprites[0].x = -20;
    if (sprites[0].x > 755)
        sprites[0].x = 755;
    //stops the player from leaving the frame vertically
    if (sprites[0].y < -9)
        sprites[0].y = -9;
    if (sprites[0].y > 445)
        sprites[0].y = 445;

    
    //The radiation's code for bouncing around the frame
    //The Radiation goes diagonally, because Vertical and Horizontal velocity is called at the same time
    //to prevent the sprites from escaping, if they're less than or equal to 450 (the square of the frame)
    //If walls are hit, they'll reverse their trajectory

    //For the first three default starting particles
    //Radiation particle one, "☢️"
    sprites[1].y = sprites[1].y + vy * dt
    sprites[1].x = sprites[1].x + vx * dt
    if (sprites[1].y >= 450 || sprites[1].y <= 0){
        vy = -vy
    }
    if (sprites[1].x >= 750 || sprites[1].x <= 0){
        vx = -vx
    }
    //default for all, 450 y and 750 x
    //Radiation particle two, "☣️"
    sprites[2].y = sprites[2].y + vy2 * dt
    sprites[2].x = sprites[2].x + vx2 * dt
    if (sprites[2].y >= 450 || sprites[2].y <= 0){
        vy2 = -vy2
    }
    if (sprites[2].x >= 750 || sprites[2].x <= 0){
        vx2 = -vx2
    }
    //Radiation particle three, "☢️"
    sprites[3].y = sprites[3].y + vy3 * dt
    sprites[3].x = sprites[3].x + vx3 * dt
    if (sprites[3].y >= 450 || sprites[3].y <= 0){
        vy3 = -vy3
    }
    if (sprites[3].x >= 750 || sprites[3].x <= 0){
        vx3 = -vx3
    }
    //end of trajectory "function"

    if (score > 20){
        sprites[4].image = "☢️";
        sprites[5].image = "☢️";
        sprites[6].image = "☣️";
    }

    //Additional particle velocity starts here for increasing difficulty
    sprites[4].y = sprites[4].y + vy4 * dt
    sprites[4].x = sprites[4].x + vx4 * dt
    if (sprites[4].y >= 450 || sprites[4].y <= 0){
        vy4 = -vy4
    }
    if (sprites[4].x >= 750 || sprites[4].x <= 0){
        vx4 = -vx4
    }

    sprites[5].y = sprites[5].y + vy5 * dt
    sprites[5].x = sprites[5].x + vx5 * dt
    if (sprites[5].y >= 450 || sprites[5].y <= 0){
        vy5 = -vy5
    }
    if (sprites[5].x >= 750 || sprites[5].x <= 0){
        vx5 = -vx5
    }

    sprites[6].y = sprites[6].y + vy6 * dt
    sprites[6].x = sprites[6].x + vx6 * dt
    if (sprites[6].y >= 450 || sprites[6].y <= 0){
        vy6 = -vy6
    }
    if (sprites[6].x >= 750 || sprites[6].x <= 0){
        vx6 = -vx6
    }

    return Math.floor(score)
};


export default {
    name: "Radiation Runaway",
    instructions: "Dodge the Radiation particles using the arrow keys!",
    icon: "☢️", //Choose an emoji icon
    background: {
        //You can put CSS here to change your background
        "background-color": "#555"
    },
    frame,
    setup,
};