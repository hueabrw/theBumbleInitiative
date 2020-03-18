// JavaScript Document

var i = 0;
var txt = 'The Bumble Initative'; /* The text */
var speed = 100; /* The speed/duration of the effect in milliseconds */


function typeWriter() {
	if (i < txt.length) {
		document.getElementById("center-title").innerHTML += txt.charAt(i);
		i++;
		setTimeout(typeWriter, speed);
	}
}

var logoCounter = 0;

function logoClick(){
	var logo = document.getElementById("bumble-logo");
	
	if(logoCounter == 0){
		logo.style.animation = "shake 0.5s";
		logoCounter++;
	}else if(logoCounter == 1){
		logo.style.animation = "none";
		setTimeout(reset, 50, logo);
		logoCounter++;
	}else{
		logo.style.animation = "swarm 4s";
		logo.style.animationFillMode = "forwards";
		swarm();
		logoCounter = 0;
	}
}

function reset(logo){
	logo.style.animation = "shake 0.5s";
}

function logoFade(){
	var logo = document.getElementById("bumble-logo");
	logo.style.animation = "fadeInLogo ease 4s";
	logo.style.animationIterationCount = "1";
	logo.style.animationFillMode = "forward";
}

function swarm() {
	var ctx = document.getElementById("background-canvas").getContext("2d");
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	
	class Bee{
		
		constructor(){
			this.origin = [ctx.canvas.width/2,ctx.canvas.height/2];
			this.pos = this.origin;
			this.velocity = 100 + (Math.random() * 100);
			this.theta = (Math.random() * 360) * Math.PI / 180;
			this.gravity = 0;
			this.dx = 1;
			this.dy = 1;
		}
		
		drawingSquare() {
			ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			this.move();
			this.rotate();
			ctx.beginPath();
			ctx.translate(this.pos[0]-5, this.pos[1]-5);
			ctx.rotate(this.theta);
			ctx.translate(-this.pos[0]-5, -this.pos[1]-5);
			ctx.fillRect(this.pos[0]-5, this.pos[1]-5, 10, 10);
			ctx.fillStyle = "#fb9836";
			ctx.closePath();
		}
		
		rotate(){
			this.theta = ((Math.random() * 90)-45) * Math.PI / 180;
		}
		
		move(){
			this.pos[0] += 1;
			this.pos[1] += 1;
		}
	}
	
	var bee = new Bee();
	
	function draw(){
		bee.drawingSquare();
	}
	
	var test = setInterval(draw, 100);
	var count = 0;
	while(count < 5000){
		count += 100;
	}
	clearInterval(test);
}


function findScreenCoords(mouseEvent){
	var xpos = 0;
	var ypos = 0;
	if (mouseEvent)
	{
	//FireFox
	xpos = mouseEvent.screenX;
	ypos = mouseEvent.screenY;
	}
	else
	{
	//IE
	xpos = window.event.screenX;
	ypos = window.event.screenY;
	}
	return [xpos, ypos];
}
