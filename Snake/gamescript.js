var fruitInfo = {}, snakeInfo = {};
var fruit, headsnk;
var game = false;
var tailSize = 3;
var frames = true;
var tails = document.getElementsByClassName("cssSnake");
var painel = document.querySelector("#pnl");
var txt = document.querySelector("#txt");
var lnth = 30;
var pont = 0;
const percent = 50;
var color = 'rgb(5, 197, 255)';
var vel = 50;

const screenInfo = 
{
    w: window.innerWidth,
    h: window.innerHeight
}
class CreateContainer
{
    constructor(){
        this.w = (percent/100*screenInfo.w);
        this.h = this.w;
    }
}
var containerInfo = new CreateContainer();
var container = document.createElement("div");

container.setAttribute("class","cssContainer");
container.style.width = containerInfo.w + "px";
container.style.height = containerInfo.h + "px";
container.style.marginLeft = "-"+(containerInfo.w/2) + "px";
container.style.marginTop = "-"+(containerInfo.h/2) + "px"

painel.style.width = containerInfo.w/2 + "px";
painel.style.height = containerInfo.h + "px";
painel.style.marginLeft = "-"+(containerInfo.w/2) + "px";
painel.style.marginTop = "-"+(containerInfo.h/2) + "px";

txt.style.fontSize = (containerInfo.w/lnth) + "px";
painel.hidden = true;

document.body.appendChild(container);

container.onclick = function(event) {
    if(!game){
        defineSizeFruit();
        createFruit();
        defineSizeSnake();
        keypress();    
        movement();
        refreshPoints();
    }
    game = true; 
}
function defineSizeFruit(){
    fruitInfo.w = Math.round(containerInfo.w/lnth);
    fruitInfo.h = fruitInfo.w;
}
function defineSizeSnake(){
    snakeInfo.w = Math.round(containerInfo.w/lnth);
    snakeInfo.h = snakeInfo.w;
    snakeInfo.dirX = 0;
    snakeInfo.dirY = 0;
    snakeInfo.vel = snakeInfo.w;
	
    headsnk = document.createElement("div");
    headsnk.setAttribute("class","cssSnake");
	headsnk.style.backgroundColor = color;
	
    headsnk.style.left = containerInfo.w/2-snakeInfo.w/2 + "px";
    headsnk.style.top = containerInfo.h/2-snakeInfo.h/2 + "px";
    headsnk.style.width = containerInfo.w/lnth + "px";
    headsnk.style.height = containerInfo.h/lnth + "px";
    container.appendChild(headsnk);
}
function createFruit(){
    let wx = Math.round(Math.random() * containerInfo.w);
        wx + fruitInfo.w > containerInfo.w ? wx-=fruitInfo.w : wx = wx;
    let hx = Math.round(Math.random() * containerInfo.h);
        hx + fruitInfo.h > containerInfo.h ? hx-=fruitInfo.h : hx = hx;

    fruit = document.createElement("div");
    fruit.setAttribute("class","cssFruit");
    fruit.style.width = fruitInfo.w + "px";
    fruit.style.height = fruitInfo.h + "px";
    fruit.style.left = wx + "px";
    fruit.style.top = hx + "px";

    container.appendChild(fruit);
}
function keypress(){
    document.onkeydown = function(event){
        switch(event.key){
            case 'ArrowUp': 
				if(snakeInfo.dirY == 0) {snakeInfo.dirY = -1; snakeInfo.dirX = 0}; break;
            case 'ArrowDown': 
				if(snakeInfo.dirY == 0) {snakeInfo.dirY = 1; snakeInfo.dirX = 0}; break;
            case 'ArrowLeft': 
				if(snakeInfo.dirX == 0) {snakeInfo.dirX = -1; snakeInfo.dirY = 0}; break;
            case 'ArrowRight': 
				if(snakeInfo.dirX == 0) {snakeInfo.dirX = 1; snakeInfo.dirY = 0}; break;
        }
        defineMarqs();
    }
}
function defineMarqs(){
    if(snakeInfo.dirX !== 0){
        switch(snakeInfo.dirX)
        {
            case -1 : (snakeInfo.marqX = (headsnk.offsetLeft - snakeInfo.w)) ;break;
            case 1 : (snakeInfo.marqX = (headsnk.offsetLeft + snakeInfo.w)) ;break;
        }
    }
    if(snakeInfo.dirY !== 0){
        switch(snakeInfo.dirY)
        {
            case -1 : (snakeInfo.marqY = (headsnk.offsetTop - snakeInfo.h)) ;break;
            case 1 : (snakeInfo.marqY = (headsnk.offsetTop + snakeInfo.h)) ;break;
        }
    }
}
function movement(){
    let posX = headsnk.offsetLeft;
    posX += (snakeInfo.dirX * snakeInfo.vel);

    let posY = headsnk.offsetTop;
    posY += (snakeInfo.dirY * snakeInfo.vel);
    headsnk.style.left = posX + "px";
    headsnk.style.top = posY + "px";
    tests();
    deleteTail();

    if(frames) { window.setTimeout(movement, vel) }
}
function tests(){
    if(headsnk.offsetLeft == snakeInfo.marqX){
        defineMarqs();
        createTail((snakeInfo.dirX*-1) * snakeInfo.w, 0);
    }
    if(headsnk.offsetTop == snakeInfo.marqY){
        defineMarqs();
        createTail(0, (snakeInfo.dirY*-1) * snakeInfo.h);
    }

    if(headsnk.offsetLeft+headsnk.offsetWidth >= containerInfo.w+snakeInfo.w){
        headsnk.style.left = 0 + "px";
        defineMarqs()
    }
    else if(headsnk.offsetLeft < 0){
        headsnk.style.left = containerInfo.w-headsnk.offsetWidth + "px";
        defineMarqs()
    }
    if(headsnk.offsetTop+headsnk.offsetHeight >= containerInfo.h+snakeInfo.h){
        headsnk.style.top = 0 + "px";
        defineMarqs()
    }
    else if(headsnk.offsetTop < 0){
        headsnk.style.top = containerInfo.h-headsnk.offsetHeight + "px";
        defineMarqs()
    }

    for(let ts=1; ts<tails.length; ts++){
        if((
                headsnk.offsetLeft+headsnk.offsetWidth > tails[ts].offsetLeft
                &&
                headsnk.offsetLeft < tails[ts].offsetLeft+tails[ts].offsetWidth
            )
            &&
            (
                headsnk.offsetTop+headsnk.offsetHeight > tails[ts].offsetTop
                &&
                headsnk.offsetTop < tails[ts].offsetTop+tails[ts].offsetHeight
            ))
        {
            frames=false;
            painel.hidden = false;
        }
    }
    if((
            headsnk.offsetLeft+headsnk.offsetWidth >= fruit.offsetLeft
            &&
            headsnk.offsetLeft <= fruit.offsetLeft+fruit.offsetWidth
        )
        &&
        (
            headsnk.offsetTop+headsnk.offsetHeight >= fruit.offsetTop
            &&
            headsnk.offsetTop <= fruit.offsetTop+fruit.offsetHeight
        ))
    {     
        let es = document.getElementsByClassName("cssPont");
        if(es){ es[0].remove() }
        tailSize++;
        pont += 10;
        fruit.remove();
        createFruit();
        refreshPoints()
    }
}
function refreshPoints(){
    let tp = document.createElement("h1");
    let sz = pont.toString().length;
    tp.setAttribute("class","cssPont");
    tp.style.marginLeft = "-" + (5 + (50 * sz)/2) + "px";
    tp.textContent = pont;
    container.appendChild(tp);
}
function createTail(x, y){
    let tail = document.createElement("div");
    tail.setAttribute("class","cssSnake");
	tail.style.backgroundColor = color;
    tail.style.width = containerInfo.w/lnth + "px";
    tail.style.height = containerInfo.h/lnth + "px";

    tail.style.left = (headsnk.offsetLeft + x) + "px";
    tail.style.top = (headsnk.offsetTop + y) + "px";

    container.appendChild(tail);
}
function deleteTail(){
    if(tails){
        if(tails.length > tailSize){
            tails[1].remove();
        }
    }
}