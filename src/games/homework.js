//You might have some game state so you can keep track of
//what is happening:
let score;  //The players score
let alive;  //The player's alive state
let dead; //The player's dead state
let timer; //The endless counting timer score

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
    timer = 0;
    alive = true;   //Set player to alive
    sprites[0].image = "🧍"; //Standing man
    sprites[0].x = 100;
    sprites[0].y = 100;

    //Putting two sprites together you
    //can make more complicated things.
    sprites[1].image = "☢️"; //Radiation particle 1
    sprites[1].x = 400;
    sprites[1].y = 350;
    sprites[2].image = "☣️"; //Radiation particle 2
    sprites[2].x = 350;
    sprites[2].y = 350;
    sprites[3].image = "☢️"; //Radiation particle 3
    sprites[3].x = 200;
    sprites[3].y = 350;
//WARNING! See line 123 if these values change!
}
//velocity for the particles
//Set to 0 for debugging / coordinate adjustment purposes
let vx = 100;
let vy = 100;
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
    const radiationOne = sprites[1]; //Easier to remember
    const RadiationTwo = sprites[2]; //Easier to remember
    const RadiationThree = sprites[3];

    //Move the fire engine
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
        //You can flipH a spright so it is facing
        //the other direction
        player.flipH = true;
    }
    if (left) {
        player.x -= speed * dt;
        player.flipH = false;
    }

    //The radiation's code for bouncing around the frame
    //The sprite starts with hitting the corner, because vertical and horizontal velocity is called at the same time
    //to prevent the sprites from escaping, if they're less than or equal to 450 (the sides of frame)
    //they'll reverse their trajectory
    //vy and vx are declared on line 39 and 40

    //Radiation particle one, "☢️"
    sprites[1].y = sprites[1].y + vy * dt
    sprites[1].x = sprites[1].x + vx * dt
    if (sprites[1].y >= 450 || sprites[1].y <= 0){
        vy = -vy
    }
    if (sprites[1].x >= 750 || sprites[1].x <= 0){
        vx = -vx
    }
    //Radiation particle two, "☣️"
    sprites[2].y = sprites[2].y + vy * dt
    sprites[2].x = sprites[2].x + vx * dt
    if (sprites[2].y >= 450 || sprites[2].y <= 0){
        vy = -vy
    }
    if (sprites[2].x >= 750 || sprites[2].x <= 0){
        vx = -vx
    }
    //Radiation particle three, "☢️"
    sprites[3].y = sprites[3].y + vy * dt
    sprites[3].x = sprites[3].x + vx * dt
    if (sprites[3].y >= 450 || sprites[3].y <= 0){
        vy = -vy
    }
    if (sprites[3].x >= 750 || sprites[3].x <= 0){
        vx = -vx
    }
    //WARNING! If all of the radiation sprites are set to the same bounce-off coordinates, they will stay in a pair!
    //Each needs a unique coordinate to correspond to the original set sprite position!
    //end of trajectory "function"

    return score;
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