var container, medidaX, medidaY, clength;
var h , w;
var palavraAleatoria, dir;
var posTabuleiro = [];
var escreve;
var palavraSelecionada = "";
var idsel = [];
var func;
var letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","Ç"];
var lista;
var cores = ["#BACE92","#7BAA92","#7B8092","#706292","#435B92"];
var itcor = cores[Symbol.iterator]();
var corsel;
var res;
var psel = [];

function iniciar(){
	container = document.querySelector("#container");
	medidaX = 20, medidaY = 20;
	clength = 30;
	h = w = -clength;
	corsel = itcor.next().value;
	dir = "h";
	res = false;
	lista = document.querySelector("#listap");
	container.style.width = (medidaX*clength) + "px";
	container.style.height = (medidaY*clength) + "px";
	container.style.marginLeft = -(medidaX*clength/2) + "px";
	container.style.marginTop = -(medidaY*clength/2-50) + "px";

	criaTabuleiro(medidaX, medidaY);
	definePos();
	selecionaPalavra();
	criaLista();
}
function criaLista(){
	bpalavras.forEach( (el)=>{
		let e = document.createElement("li");
		e.setAttribute("id",el);
		e.textContent = el;
		lista.appendChild(e);
	})
}
function pintacell(event){
	if(event.target.id.startsWith("i") && event.target.style.backgroundColor == "white"){
		event.target.style.backgroundColor = corsel;
		if(!idsel.includes(event.target)){
			palavraSelecionada += event.target.innerHTML;
			idsel.push(event.target);
		}
	}
}
function selecionaPalavra(){
	container.onmousedown = function(){
		container.addEventListener("mousemove",func = function(){
			pintacell(event);
		})
	}
	document.addEventListener("mouseup",function(){
		container.removeEventListener("mousemove",func);

		if(!bpalavras.includes(palavraSelecionada)){
			idsel.forEach( (e)=>{
				e.style.backgroundColor="white";
			})
		}
		else{
			corsel = itcor.next().value;
			document.getElementById(palavraSelecionada).style.color="red";
			pn = "pn" + bpalavras.indexOf(palavraSelecionada);
			let es = document.querySelectorAll("#listap > li");
			es = [...es];
			res = es.every( (e)=>{
				let cor = e.style.color;
				return cor == "red";
			})
			if(res){
				window.alert("Voce encontrou todas palavras");
				location.reload();
			}
		}
		idsel = [];
		palavraSelecionada = "";
	})
}
function criaTabuleiro(x, y){
	for(let l=0 ; l < y ; l++){
		h += clength;
		posTabuleiro.push([]);
		for(let c=0 ; c < x ; c++){
			w += clength;
			let celula = document.createElement("div");
			let taml = letras.length-1;
			celula.setAttribute("class","ccell");
			celula.style.width = clength + "px";
			celula.style.height = clength + "px";
			celula.style.top = h + "px";
			celula.style.left = w + "px";
			celula.style.backgroundColor = "white";
			celula.textContent = " ";
			celula.textContent = letras[Math.round(Math.random() * taml)];
			posTabuleiro[posTabuleiro.length-1][c] = celula;
			posTabuleiro[posTabuleiro.length-1][c].setAttribute("id",("id"+l+c));
			container.appendChild(celula);
		}
		w = -clength;
	}
}
function definePos(){
	while(historicoPalavras.length > 0){

		escreve = true;
		var posX = Math.round(Math.random() * medidaX);
		var posY = Math.round(Math.random() * medidaY);
			posX > medidaX-1 ? posX-=1 : posX=posX;
			posY > medidaY-1 ? posY-=1 : posY=posY;

		var nal = Math.round(Math.random() * historicoPalavras.length);
			nal > historicoPalavras.length-1 ? nal-=1 : nal=nal;

		palavraAleatoria = historicoPalavras[nal];

		if(dir == "v"){
			posY = (medidaY - posY < palavraAleatoria.length ? medidaY-palavraAleatoria.length : posY);
			let yb = posY;
			for(let i=0 ; i<palavraAleatoria.length ; i++){
				if(posTabuleiro[yb++][posX].dataset.usada){ escreve = false; break }
			}
			if(escreve){
				yb = posY;
				for(let i=0 ; i<palavraAleatoria.length ; i++){
					posTabuleiro[yb][posX].dataset.usada = true;
					posTabuleiro[yb++][posX].innerHTML = palavraAleatoria[i];
				}
				historicoPalavras.splice(nal, 1);
			}
		}
		if(dir == "h"){
			posX = (medidaX - posX < palavraAleatoria.length ? medidaX-palavraAleatoria.length : posX);
			let xb = posX;
			for(let i=0 ; i<palavraAleatoria.length ; i++){
				if(posTabuleiro[posY][xb++].dataset.usada){ escreve = false; break }
			}
			if(escreve){
				xb = posX;
				for(let i=0 ; i<palavraAleatoria.length ; i++){
					posTabuleiro[posY][xb].dataset.usada = true;
					posTabuleiro[posY][xb++].innerHTML = palavraAleatoria[i];
				}
				historicoPalavras.splice(nal, 1);
			}
		}
		if(escreve){
			dir == "h" ? dir="v" : dir="h";
		}
	}
}