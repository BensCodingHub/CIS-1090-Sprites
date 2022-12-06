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

}

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
    const truck = sprites[0]; //Easier to remember
    const house = sprites[1]; //Easier to remember
    const fire = sprites[2]; //Easier to remember

    //Move the fire engine
    if (up) {
        //Speed is in pixels per second, and
        //dt is the number of seconds that have
        //passed since the last frame.
        //
        //Multiply them together so that the
        //truck moves at the same speed if the
        //computer is fast or slow
        truck.y += speed * dt;
    } 
    if (down) {
        truck.y -= speed * dt;
    }
    if (right) {
        truck.x += speed * dt;
        //You can flipH a spright so it is facing
        //the other direction
        truck.flipH = true;
    }
    if (left) {
        truck.x -= speed * dt;
        truck.flipH = false;
    }

    //If the truck is close to the house
    if ( distance(truck, house) < 10 ){
        fire.image = ""; //Make the fire go away
    }

    //The radiation's code for bouncing around the frame
    //The sprite starts with hitting the corner, because vertical and horizontal velocity is called at the same time
    //to prevent the sprites from escaping, if they're less than or equal to 450 (the sides of frame)
    //they'll reverse their trajectory
    //vy and vx are declared on line 39 and 40
    sprites[2].y = sprites[2].y + vy * dt
    sprites[2].x = sprites[2].x + vx * dt
    if (sprites[2].y >= 450 || sprites[2].y <= 0){
        vy = -vy
    }
    if (sprites[2].x >= 750 || sprites[2].x <= 0){
        vx = -vx
    }


    return score;
};


export default {
    name: "Radiation Runaway",
    instructions: "Dodge the Radiation particles!",
    icon: "☢️", //Choose an emoji icon
    background: {
        //You can put CSS here to change your background
        "background-color": "#555"
    },
    frame,
    setup,
};