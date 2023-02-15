<!DOCTYPE html >
    <html>
    <head>
    <title>Evolution Game < /title>
        < style >
        canvas {
    border: 1px solid black;
}
</style>
    < /head>
    < body >
    <canvas id="canvas" width = "400" height = "400" > </canvas>
        < script >
		// Constants
		const FOOD_COLOR = "#00FF00";
const CREATURE_COLOR = "#FF0000";
const FOOD_SIZE = 10;
const CREATURE_SIZE = 20;
const NUM_FOOD = 10;
const NUM_CREATURES = 5;

// Set up the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create the creatures
let creatures = [];
for (let i = 0; i < NUM_CREATURES; i++) {
    creatures.push(new Creature(canvas.width, canvas.height));
}

// Create the food
let food = [];
for (let i = 0; i < NUM_FOOD; i++) {
    food.push(new Food(canvas.width, canvas.height));
}

// Draw the game objects
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < food.length; i++) {
        food[i].draw(ctx);
    }
    for (let i = 0; i < creatures.length; i++) {
        creatures[i].draw(ctx);
    }
}

// Update the game objects
function update() {
    for (let i = 0; i < food.length; i++) {
        food[i].update();
    }
    for (let i = 0; i < creatures.length; i++) {
        creatures[i].update(food);
    }
}

// Game loop
function gameLoop() {
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

// Food class
class Food {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = FOOD_SIZE;
        this.color = FOOD_COLOR;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }

    update() {
        // Do nothing
    }
}

// Creature class
class Creature {
    constructor(canvasWidth, canvasHeight) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = CREATURE_SIZE;
        this.color = CREATURE_COLOR;
        this.speed = 2;
        this.direction = Math.random() * Math.PI * 2;
        this.health = 100;
        this.hunger = 0;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    update(food) {
        // Move the creature
        this.x += this.speed * Math.cos(this.direction);
        this.y += this.speed * Math.sin(this.direction);

				// Wrap the creature around the canvas
