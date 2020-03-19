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
		logo.style.animation = "swarm 10s";
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
			this.origin = [ctx.canvas.width/2,ctx.canvas.height/2-40];
			this.pos = this.origin;
			this.velocity = 7 + (Math.random() * 5);
			this.theta = (Math.random() * 360);
			this.beeOpacity = 1;
			//this.constraint = 0;
			this.i = 0;
		}

		drawingSquare() {
			this.pos[0] += this.velocity * Math.cos(this.theta * Math.PI / 180);
			this.pos[1] += this.velocity * Math.sin(this.theta * Math.PI / 180);
			
			if(this.i > 100){
				if(this.beeOpacity < 0){
					ctx.globalAlpha = 0;
				}else{
					ctx.globalAlpha = this.beeOpacity;
				}
				this.beeOpacity -= 0.025;
			}
			
			ctx.beginPath();
			ctx.moveTo(this.pos[0] + 7.5 * Math.cos((this.theta + 45) * Math.PI / 180), this.pos[1] + 7.5 *  Math.sin((this.theta + 45) * Math.PI / 180));
			ctx.lineTo(this.pos[0] + 7.5 * Math.cos((this.theta + 135) * Math.PI / 180), this.pos[1] + 7.5 *  Math.sin((this.theta + 135) * Math.PI / 180));
			ctx.lineTo(this.pos[0] + 7.5 * Math.cos((this.theta + 225) * Math.PI / 180), this.pos[1] + 7.5 *  Math.sin((this.theta + 225) * Math.PI / 180));
			ctx.lineTo(this.pos[0] + 7.5 * Math.cos((this.theta + 315) * Math.PI / 180), this.pos[1] + 7.5 *  Math.sin((this.theta + 315) * Math.PI / 180));
			ctx.fillStyle = "#fb9836";
			ctx.fill();
			ctx.closePath();
			this.i++;
		}

		rotate(){
			
			
			//Trying to get the bees to go off screen be constraining the angle at which the turn away from the origin
			/*
			var ran = this.theta + ((Math.random() * 90)-45);
			var originTheta = Math.atan((this.pos[0] - this.origin[0])/(this.pos[0] - this.origin[0]))
			if(this.i > 100){
				this.constraint = ((10000/(-this.i + 100)) + 360);
				
				if((ran + 45) % 360 > (originTheta - this.constraint % 360)){
					ran -= (ran - this.constraint);
				}
				if((ran - 45) % 360 < (originTheta + this.constraint % 360)){
					ran += (this.constraint - ran);
				}
			}
			this.theta = ran;
			*/
			
			
			
			this.theta += ((Math.random() * 90)-45);
			
		}
	}
	
	
	function releaseBees(){
		var bees = [];
		for(var i = 0; i < 250; i++){
			bees.push(new Bee());
		}
		return bees;
	}
	
	var bees = releaseBees();
	
	function draw(){
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		
		
		bees.forEach((element) => {
			element.rotate();
			element.drawingSquare();
		})
	}
	
	var test = setInterval(draw, 50);
	var elem = document.getElementById("bumble-logo");
	
	setTimeout(function(){
		clearInterval(test);
		ctx.globalAlpha = 1;
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
		delete Bee.bee;
	}, 10000)
}



//function to swarm the mouse
/*
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
*/
