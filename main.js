//----------------------------------------- Class

function Vector (paraX , paraY){
    this.x= paraX ;
    this.y= paraY ;
}

function Rectangle( paraX , paraY , paraWidth, paraHeight ){
    this.x= paraX ;
    this.y= paraY ;
    this.w= paraWidth ;
    this.h= paraHeight ;
}

function Button( paraX , paraY , paraWidth, paraHeight ) {
    this.rect = new Rectangle(paraX , paraY , paraWidth, paraHeight) ;
    
    this.high = "#FF0000" ;    // pure red color
    this.low = "#FF9980" ;  // faint red
    
    this.on = false ;
}

Button.prototype.Draw = function(ctx) { 
    if(this.on)
        ctx.fillStyle = this.high ;
    else    
        ctx.fillStyle = this.low ;
    
    ctx.fillRect( this.rect.x ,this.rect.y ,this.rect.w ,this.rect.h );
}


//----------------------------------------- Variables , Objects

var c = document.getElementById("toolkit"); // toolkit is id of canvas element from html
var ctx = c.getContext("2d");

var ButtonObjects = [] ;

//----------------------------------------- Main Functions

window.onload = function() { // This functions whenever the page is loaded
    Start() ;
    Draw() ;
}

function Start() { 
    var buttonStartX = 40 ;
    
    for(var i = 0 ; i < 5 ; i++) {  // Initiating our buttons
        var tempButton = new Button(buttonStartX , 100 , 30 , 30) ;
        ButtonObjects.push(tempButton) ;
        
        buttonStartX += 45 ;
    }

    
}


function Draw() { // A normal function which inclues complete draw method
    
    for(var i = 0 ; i< 5 ; i++) {
        ButtonObjects[i].Draw(ctx) ;
    }
    
    
    ctx.beginPath();
    var x , y , radius ;
    x = 40 ;
    y = 20 ;
    radius = 20 ;
    
    for(var i = 0 ; i < 10 ; i++) {   
        ctx.moveTo(x+radius , y+radius);
        ctx.arc(x  , y+radius , radius , 0 , 2*Math.PI);
        ctx.stroke();
        x += 45;
    }
    //to draw a line in canvas
    ctx.moveTo(0,80);
    ctx.lineTo(407,80);
    ctx.stroke();
    x=40,y=100;
    
    for(var i=0 ; i<5 ; i++){  //for rectangles
        ctx.rect(x,y,30,30);
        ctx.stroke();
        x+=45;
    }    
    
    ctx.moveTo(0,160);
    ctx.lineTo(407,160);
    ctx.stroke();
    ctx.rect(10,y+100,190,310);
    ctx.rect(x-50,200,190,310);
    ctx.stroke();
    
}
    
    
//----------------------------------------- Basic Functions
 

function OnMouseClick(mouseData) { // when we click on canvas this functuion is called 
    var mouseLocation = new Vector(mouseData.clientX , mouseData.clientY) ;

    for(var i = 0 ; i < ButtonObjects.length ; i++) {
        if( isInside(mouseLocation , ButtonObjects[i].rect ) ){ // mouse location and button rect from each element of ButtonObjects array
            console.log("clicked on Button Object "+(1+i)); 
            if(ButtonObjects[i].on) {
                ButtonObjects[i].on = false ;
                console.log("false") ;
            }
            else {
                ButtonObjects[i].on = true ;
                console.log("true") ;
            }
        }
//        else {
//            ButtonObjects[i].on = false ;
    }
  
    ctx.clearRect(0, 0 , 800 , 600) ;
    Draw() ;
}


function isInside( pos, rect) { //to check mouse pos and rectangle pos
    if ((pos.x > rect.x) && (pos.x < (rect.x+rect.w)) ) {
        if(( pos.y < (rect.y+rect.h) && (pos.y > rect.y))) {
            return true;
        }
        else    
            return false ;
    }
    else
        return false ;
}

//----------------------------------------- Event Listeners

c.addEventListener("click" , OnMouseClick) ;