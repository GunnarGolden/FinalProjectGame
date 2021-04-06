function hatTail (x,y,size) {
//hat tail
fill(224, 169, 49);
quad(x+32*size/10,y+63*size/10,x+53*size/10,y+39*size/10,x+52*size/10,y+31*size/10,x+25*size/10,y+62*size/10);
} // Start of bitmoji code

function body (x,y,size){
//neck
fill(247, 234, 202);
quad(x+60*size/10,y+87*size/10,x+82*size/10,y+84*size/10,x+83*size/10,y+102*size/10,x+57*size/10,y+101*size/10);
noStroke();
arc(x+71*size/10,y+108*size/10,42*size/10,18*size/10,180,360);

//shirt
fill(209, 209, 209);
quad(x+102*size/10,y+139*size/10,x+42*size/10,y+139*size/10,x+39*size/10,y+116*size/10,x+103*size/10,y+113*size/10);
stroke(0, 0, 92);
fill(247, 234, 202);
strokeWeight(8);
arc(x+71*size/10,y+108*size/10,42*size/10,18*size/10,0,180);
strokeWeight(8);
fill(0, 0, 92);
quad(x+40*size/10,y+118*size/10,x+41*size/10,y+124*size/10,x+54*size/10,y+113*size/10,x+51*size/10,y+109*size/10);
quad(x+88*size/10,y+118*size/10,x+101*size/10,y+124*size/10,x+104*size/10,y+113*size/10,x+92*size/10,y+109*size/10);

//initals
textSize(15*size/10);
text("GG",x+58*size/10,y+133*size/10);
}

function head (x,y,size) {
//head
fill(247, 234, 202);
strokeWeight(1);
stroke(0, 0, 0);
ellipse (x+70*size/10,y+60*size/10,50*size/10,65*size/10);

//ear
bezier(x+48*size/10,y+67*size/10,x+39*size/10,y+88*size/10,x+38*size/10,y+28*size/10,x+48*size/10,y+50*size/10);
bezier(x+91*size/10,y+71*size/10,x+105*size/10,y+84*size/10,x+98*size/10,y+28*size/10,x+90*size/10,y+50*size/10);
//glasses
stroke(0, 0, 0);
ellipse(x+58*size/10,y+55*size/10,20*size/10,15*size/10);
line(x+68*size/10,y+52*size/10,x+78*size/10,y+52*size/10);
ellipse(x+85*size/10,y+55*size/10,20*size/10,15*size/10);
//eyes
fill(255,255,255);
ellipse(x+58*size/10,y+55*size/10,12*size/10,7*size/10);
ellipse(x+85*size/10,y+55*size/10,12*size/10,7*size/10);
//pupils
fill(66, 47, 30);
ellipse(x+58*size/10,y+55*size/10,4*size/10,4*size/10);
ellipse(x+85*size/10,y+55*size/10,4*size/10,4*size/10);
//hat
fill(66, 47, 30);
arc(x+70*size/10,y+36*size/10,46*size/10,31*size/10,158,378);
//mouth
fill(247, 234, 202);
arc(x+70*size/10,y+77*size/10,20*size/10,10*size/10,0,180);
//nose
bezier(x+68*size/10,y+70*size/10,x+89*size/10,y+82*size/10,x+74*size/10,y+47*size/10,x+70*size/10,y+60*size/10);
}

function drawBitmoji (x,y,size) {
hatTail(x,y,size);
body (x,y,size);
head (x,y,size);
}
//end of bitmoji code

var creatures = []; //Empty array for future characters
var currentOpponent = 1; //Points at current opponent
var currentPlayer = 0; //Points at the player
var scene = 0; //Scene 0 = normal, scene 1 = player offensive animation, scene 2 = player defensive animation, scene 3 = enemy attacks
var animation = 0;
var animationCap = 0;
var turn = 0; //Turn 0 = player, turn 1 = Enemy
frameRate(3);

var damageAnimation = function(damage) {

};

var Person = function(config) { //Constructor for characters
    this.x = config.x;
    this.y = config.y;
    this.attack = config.attack;
    this.defense = config.defense;
    this.picture = config.picture;
    this.hp = config.hp;
    this.hpMax = config.hpMax;
    this.ability1 = config.ability1;
    this.ability2 = config.ability2;
    this.ability3 = config.ability3;
    this.ability4 = config.ability4;
    creatures.push(this);
};

Person.prototype.draw = function() { //Draws the character and their stats
    fill(255, 0, 0);
    text("Attack: " + this.attack, this.x,this.y);
    text("Defense: " + this.defense, this.x,this.y+10);
    text("HP: " + this.hp + "/" + this.hpMax, this.x,this.y-10);
    this.picture();
    if (this.hp > this.hpMax) {
        this.hp = this.hpMax;
    }
};

var player1 = new Person ({ //Creates the player character
    x: 28,
    y: 195,
    attack: 5,
    defense: 3,
    hp: 30,
    hpMax: 30,
    picture: function() {
        drawBitmoji(this.x+random(0,2), this.y+random(0,2), 10);

    },
    ability1: function() {//Attack
        fill(0, 0, 0);
        text("You attack for " + this.attack + " damage!",100,370);
        if (creatures[currentOpponent].defense < this.attack) {
        creatures[currentOpponent].hp = creatures[currentOpponent].hp - (this.attack- creatures[currentOpponent].defense);
        }
        else {
            text("It dealt no damage!", 100, 390);
        }
        fill(255, 0, 0);
        animationCap = this.attack*20;
        scene = 1;
    },
    ability2: function() {//Defend
        fill(0, 0, 0);
        text("You guarded yourself!",100,370);
        text("Your stats increased!",100,390);
        this.defense++;
        this.attack++;
        fill(0, 0, 255);
        animationCap = this.defense*20;
        scene = 2;
    },
    ability3: function() {//Restore
        text("You healed youself for 8 hp!",100,370);
        this.hp += 8;
        fill(0, 255, 255);
        animationCap = 100;
        scene = 2;
    },
    ability4: function() {//Big Attack
        fill(0, 0, 0);
        text("You attack for " + this.attack + " damage!",100,370);
        text("It bypassed defense, but weakened you!",100,390);
        creatures[currentOpponent].hp = creatures[currentOpponent].hp - this.attack;
        fill(200, 0, 0);
        animationCap = this.attack*25;
        scene = 1;
        this.defense--;
        this.attack--;
        if (this.attack < 0) { //Sets attack to 0 if negative
            this.attack = 0;
        }
    },
});

var monster1 = new Person({ //Creates an enemy
    x: 224,
    y: 53,
    attack: 2,
    defense: 3,
    hp: 10,
    hpMax: 10,
    picture: function() {
        image(getImage("avatars/aqualine-ultimate"), this.x+random(0,5), this.y+random(0,5));
    },
    ability1: function() {
        fill(0, 0, 0);
        text("Enemy attacks for " + this.attack + " damage!",200,250);
        text("Enemy got stronger!",200,270);
        if (this.attack > creatures[currentPlayer].defense) {
        creatures[currentPlayer].hp = creatures[currentPlayer].hp - (this.attack - creatures[currentPlayer].defense);
        }
        else {
            text("It dealt no damage!",200,290);
        }
        fill(255, 0, 0);
        animationCap = this.attack*20;
        scene = 2;
        this.attack += 2;
    },
    ability2: function() {
        text("Enemy stole your Defense!",200,250);
        creatures[currentPlayer].defense--;
        this.defense++;
        fill(0, 255, 0);
        animationCap = 100;
        scene = 2;
    },
});

var monster2 = new Person({ //Creates an enemy
    x: 224,
    y: 61,
    attack: 6,
    defense: 3,
    hp: 30,
    hpMax: 30,
    picture: function() {
        image(getImage("avatars/piceratops-ultimate"), this.x+random(0,5), this.y+random(0,5));
    },
        ability1: function() {
        fill(0, 0, 0);
        if (this.attack > 0) {
            text("Enemy attacks for " + this.attack + " damage!",200,250);
            text("It ignored your defense!",200,270);
            creatures[currentPlayer].hp = creatures[currentPlayer].hp - this.attack;
            this.attack--;
        }
        else {
            text("The enemy is tired...", 200, 250);
        }
        fill(255, 0, 0);
        animationCap = this.attack*20;
        scene = 2;
    },
    ability2: function() {
        text("The enemy curled up!",200,250);
        this.defense++;
        this.attack++;
        fill(0, 0, 255);
        animationCap = this.defense*20;
        scene = 1;
    },
});

var monsterAction = function () { //Determines what the mosnter does (if anything)
    if (turn === 1) {
        turn = 0;
        if (creatures[currentOpponent].hp > 0) {
            var randomAction = random(0, 2);
            if (randomAction > 1) {
                creatures[currentOpponent].ability1();
            }
            else {
                creatures[currentOpponent].ability2();
            }
        }
        else { // If hp 
        currentOpponent++;
        creatures[currentPlayer].hp = creatures[currentPlayer].hp + 5;
    }
    }
};

var draw = function() {
    if (scene === 0) { //Draws the two characters
        background(255, 255, 255);
        player1.draw();
        creatures[currentOpponent].draw();
    }
    if (scene === 1) { //Circle on enemy
        frameRate(60);
        ellipse(300, 150, animation, animation);
        animation = animation + 5;
        if (animation > animationCap) {
            animation = 0;
            scene = 0;
            frameRate(3);
            monsterAction();
        }
    }
    if (scene === 2) { //Circle on player
        frameRate(60);
        ellipse(100, 280, animation, animation);
        animation = animation + 10;
        if (animation > animationCap) {
            animation = 0;
            scene = 0;
            frameRate(3);
            monsterAction();
        }
    }
};

keyPressed = function() {//Controls
    if (scene === 0) {
        if (keyCode === UP) {//Use ability 1
        creatures[currentPlayer].ability1();
        }
        if (keyCode === RIGHT) {//Use ability 2
        creatures[currentPlayer].ability2();
        }
        if (keyCode === DOWN) {//Use ability 2
            creatures[currentPlayer].ability3();
        }
       if (keyCode === LEFT) {//Use ability 2
            creatures[currentPlayer].ability4();
       }
    turn = 1;
}
};
