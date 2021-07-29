// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions. 
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, createSlider, windowWidth, windowHeight, PI, frameRate, sin, sqrt, pow, noFill*/


let fallSpeed, raindrop, numOfElements, slider, BG, snowFlake, time, cherryBlossom, firefly, timer
function setup() {
  createCanvas(1920,1080);
  colorMode(HSB, 360,100,100);
  //time = frameRate/30;
  BG = loadImage("https://cdn.glitch.com/8f203d8b-17c5-4ca9-94e0-3916aee05fbe%2Floficoffehouse.gif?v=1627493525997")
  fallSpeed = 9;
  numOfElements = 100;
  slider = createSlider(8,20, 8);
  timer = 0;
  time = 0;
  //can make this more efficient by creating some more variables 
  raindrop=[];
  for (let i = 0; i < numOfElements; i++)
    {
      raindrop.push(new Raindrops());
    }
  snowFlake = [];
  for (let i = 0; i < numOfElements; i++)
    {
      snowFlake.push(new Snowflakes());
    }
  cherryBlossom = [];
  for (let i = 0; i < numOfElements; i++)
    {
      cherryBlossom.push(new Cherryblossoms());
    }
  firefly = [];
  for (let i=0; i < 150; i++)
    {
      firefly.push(new Fireflies());
    }
  
}

function draw(){
  background(BG)
  timer++;
  if (timer % 30 == 0)
    {
      time +=1;
    }
  fill('white');
  text(`timer: ${time}`, 0, 20);
//   for (let drops of raindrop)
//     {
//       drops.checkFallSpeed();
//       drops.draw();
//       drops.move();
     
//     }
  // for (let flake of snowFlake)
  //   {
  //     flake.checkFallSpeed();
  //     flake.move();
  //     flake.draw();
    //}
  // for (let blossom of cherryBlossom)
  //   {
  //     blossom.checkFallSpeed();
  //     blossom.move();
  //     blossom.draw();
  //   }
  for (let fly of firefly)
    {
      fly.checkFallSpeed();
      // console.log(this.x)
      // console.log(this.y)
      fly.move();
      fly.draw();
      //fly.glow();
    }
}


class Raindrops
{
  constructor()
  {
    this.x = random(width);
    this.y = random(height);
    this.diameter= random(5,15);
    
  }
  
  move()
  {
    this.y += fallSpeed;
    
    if (this.y > height)
      {
        this.y = 0;
        this.x = random(width);
        this.diameter = random(5,15);
        
      }
  }
  
  draw()
  {
    noStroke();
    fill(204, 52, 75);
    ellipse(this.x, this.y, this.diameter);
  }
  
  checkFallSpeed()
  {
    fallSpeed = slider.value();
  }
}

class Snowflakes
  {
    constructor()
    {
      this.x = random(width);
      this.y = random(height);
      this.size = random(2,5);
      this.initialangle = random(0, 2 * PI);
      this.radius = sqrt(random(pow(width / 2, 2)));
    }
    move()
  {
    let w = 0.6; // angular speed
    let angle = w * time + this.initialangle;
    this.x = width / 2 + this.radius * sin(angle);
    this.y += fallSpeed;
    
    if (this.y > height)
      {
        this.y = 0;
        this.x = random(width);
        this.size = random(2,5);
        
      }
  }
  
  draw()
  {
    noStroke();
    fill(0, 0, 100);
    ellipse(this.x, this.y, this.size);
  }
  
  checkFallSpeed()
  {
    this.size = slider.value();
  }
  }
class Cherryblossoms
{
  constructor()
  {
   
    this.windSpeed = 5;
    this.x = random(width);
    this.y = random(height);
    this.width = random(5,10);
    //I use the -1 to make sure that the width was not included in the height of the cherry blossoms
    this.height = random(2, this.width-1);
  }
  
  move()
  {
    this.x += this.windSpeed;
    this.y += fallSpeed;
    
    if (this.y > height)
      {
        this.y = 0;
        this.x = random(width);
        
      }
  }
  
  draw()
  {
    noStroke();
    fill(348, 28, 100);
    ellipse(this.x, this.y,this.width, this.height);
  }
  
  checkFallSpeed()
  {
     fallSpeed = slider.value();
  }
}
class Fireflies
{
  constructor()
  {
    this.x = random(width);
    this.y = random(height);
    this.size = random(5,10);
    this.baseXVelocity = random(.5,3);
    this.baseYVelocity = random(.5,3);
    this.xVelocity = this.baseXVelocity;
    this.yVelocity =this.baseYVelocity;
  }
  
  move()
  {
    
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  
    if (this.x + this.size > width)
      {
        this.xVelocity = -1 * this.baseXVelocity;
      }
    if (this.x - this.size < 0)
      {
        this.xVelocity = this.baseXVelocity;
      }
      
    if (this.y + this.size > height)
      {
        this.yVelocity = -1 * this.baseYVelocity;
      }
    if (this.y - this.size < 0)
      {
        this.yVelocity = this.baseYVelocity;
      }
        
      
  }
  
  draw()
  {
    noStroke();
    //fill(180, 60, 9);
    fill(54, 94, 81);
    ellipse(this.x, this.y, this.size);
  }
  
  checkFallSpeed()
  {
    fallSpeed = slider.value();
  }
  
  glow()
  {
    if (time % 10 == 0)
      {
        fill(54, 94, 81);
        ellipse(this.x, this.y, this.size);
      }
  }
}
