// Enemies our player must avoid

class Enemy { 
    constructor(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y + 55;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = this.y + 55;
    this.boundry = this.step * 4;
    this.resetPos = -501;
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if enemnty is not pass boundrey 
    if(this.x < this.boundry) {
        // Move enemey forward
        // increment x by dt speed
        this.x += this.speed * dt;
    }
    else{
        this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Hero {
    constructor(){
        this.sprite ='images/char-boy.png';
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 55; 
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
    }
        update(){
            for(let enemy of allEnemies){
                if(this.y === enemy.y && (enemy.x + enemy.step/2 > 
                    this.x && enemy.x < this.x + this.step/2)){
                    this.reset();
                }
            }
            if(this.y === -28){
                this.victory = true;
            }
        }
        reset(){
            this.y = this.startY;
            this.x = this.startX;
        }
        
    // Renders player image to page
    render(){
        ctx.drawImage(Resources.get(this.sprite),this.x, this.y);
    }
    // Players movement
    handleInput(input){
        switch(input){
            case 'left':
            if(this.x > 0)
            this.x -= this.step;
            break;
            case "up":
            if(this.y > 0)
            this.y -= this.jump;
            break;
            case "right":
            if(this.x < this.jump * 4)
            this.x += this.step;
            break;
            case "down":
            if(this.y < this.jump * 4)
            this.y += this.jump;
            break;

        }
    }
}

// Now instantiate your objects.
const player = new Hero();
const bug1 = new Enemy(-202, 83, 542);
const bug2 = new Enemy(-302, 166, 446);
const bug3 = new Enemy(-502, 0, 378);



// Place all enemy objects in an array called allEnemies
const allEnemies = [bug1,bug2,bug3];
// Place the player object in a variable called player

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});