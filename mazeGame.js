//------------------------------------------------------------
// POINT.JS
//------------------------------------------------------------

var Point = function() {
	x = 0
	y = 0
	return this
}

Point.prototype.set = function(x,y) {
	this.x = x
	this.y = y
	return this
}

Point.prototype.copy = function(p) {
	this.x = p.x
	this.y = p.y
	return this
}

Point.prototype.length = function() {
	return Math.sqrt(this.x*this.x + this.y*this.y)
}

Point.prototype.dist = function(p) {
	var nx = p.x - this.x
	var ny = p.y - this.y
	return Math.sqrt(nx*nx+ny*ny)
}

Point.prototype.print = function() {
	console.log(x + ", " + y)
}

Point.prototype.free = new Point
Point.prototype.freeA = new Point
Point.prototype.freeB = new Point

Point.prototype.getFree = function() {
	return free.copy(this)
}

Point.prototype.getFreeA = function() {
	return freeA.copy(this)
}

Point.prototype.getFreeB = function() {
	return freeB.copy(this)
}

Point.prototype.drawCircle = function(ctx,r) {
	ctx.beginPath()
	ctx.arc( this.x, this.y, r, 0, Math.PI*2, true)
	ctx.closePath()
	ctx.stroke()
}

Point.prototype.fillCircle = function(ctx,r) {
	ctx.beginPath()
	ctx.arc( this.x, this.y, r, 0, Math.PI*2, true)
	ctx.closePath()
	ctx.fill()
}

//------------------------------------------------------------
// LIST.JS
//------------------------------------------------------------

var Node = function(l,v) {
	this.list = l
	this.val = v
	this.prev = l.tail
	this.next = null
}

var List = function() {
	this.head = null
	this.tail = null
}

List.prototype.add = function(v) {
	if ( this.head == null ) {
		this.head = this.tail = new Node(this,v)
	} else {
		this.tail = this.tail.next = new Node(this,v)
	}
	return this
}


List.prototype.addAll = function() {
	for ( var i = 0; i < arguments.length; ++i) {
		this.add(arguments[i])
	}
	return this
}
List.prototype.addArray = function(a) {
	for ( var i = 0; i < a.length; ++i) {
		this.add(a[i])
	}
	return this
}

List.prototype.addList = function(l) {
	for ( var n = l.head; n != null; n = n.next) {
		this.add(n.val)
	}
	return this
}

List.prototype.foreach = function(f) {
	for ( var n = this.head; n != null; n = n.next ) {
		f(n.val)
	}
	return this
}

List.prototype.foreach2 = function(f) {
	for ( var a = this.head; a != null; a = a.next ) {
		for ( var b = a.next; b != null; b = b.next ) {
			f(a.val,b.val)
		}
	}
	return this
}

List.prototype.sortif = function(f) {
	for ( var a = this.head; a != null; a = a.next ) {
		for ( var b = a.next; b != null; b = b.next ) {
			if ( f(a.val,b.val) ) {
				var v = a.val
				a.val = b.val
				b.val = v
			}
		}
	}
	return this
}

List.prototype.findif = function(f) {
	for ( var n = this.head; n != null; n = n.next ) {
		if ( f(n.val) ) {
			return true
		}
	}
	return false
}

List.prototype.returnif = function(f) {
	for ( var n = this.head; n != null; n = n.next ) {
		if ( f(n.val) ) {
			return n.val
		}
	}
	return null
}

List.prototype.alltrue = function(f) {
	for ( var n = this.head; n != null; n = n.next ) {
		if ( !f(n.val) ) {
			return false
		}
	}
	return true
}

function writeTextFile(filepath, list) {
	
}

function readTextFile(filepath) {
	
}

//------------------------------------------------------------
// LEVEL.JS
//------------------------------------------------------------

var Level = function() {

}

//------------------------------------------------------------
// MODE.JS
//------------------------------------------------------------

var Mode = function(k,n) {
	this.key = k
	this.name = n
}

var wallMode = new Mode('w',"wallMode")
var doorMode = new Mode('d',"doorMode")
var playerMode = new Mode('j',"playerMode")
var keyMode = new Mode('k',"keyMode")
var portalMode = new Mode('p',"portalMode")
var handleMode = new Mode('h',"handleMode")

//------------------------------------------------------------
// EVENT.JS
//------------------------------------------------------------

var Event = function(k,a) {
	this.key = k
	this.action = a
}

var deleteLevel = new Event('q',function(){

})
var newLevel = new Event('n',function(){

})
var prevLevel = new Event(',',function(){
	
})
var nextLevel = new Event('.',function(){
	
})
var swapPrevLevel = new Event('[',function(){
	
})
var swapNextLevel = new Event(']',function(){
	
})
var readLevel = new Event('r',function(){
	Game.levels = new List

})
var writeLevel = new Event('u',function(){

})
var toggleGameMode = new Event('g',function(){

})

//------------------------------------------------------------
// WINDOW.JS
//------------------------------------------------------------

var Game = {
	canvas: null,
 	ctx: null,
 	now: 0,
 	lastTime: 0,
 	gameMode: true,
 	doorMode: false,
 	mode: wallMode,
 	levels: null,
 	lvl: null,
	mouseDown: false,
	mouse: new Point,
	modes: new List().addAll(wallMode,doorMode,playerMode,keyMode,portalMode,handleMode),
	events: new List().addAll(deleteLevel,newLevel,prevLevel,nextLevel,swapPrevLevel,swapNextLevel,readLevel,writeLevel,toggleGameMode)
}

function textOut( startX, startY, shiftX, shiftY, strings ) {
	Game.ctx.font = '10pt Verdana'
	Game.ctx.fillStyle = 'black'
	for ( var i = 0; i < strings.length; i++) {
		Game.ctx.fillText( strings[i], startX += shiftX, startY += shiftY );
	}
}


//------------------------------------------------------------
// MAIN.JS
//------------------------------------------------------------

function tick() {
	
	Game.now = (new Date()).getTime()
	window.elapsed = Game.now - Game.lastTime
	Game.lastTime = Game.now
	
	Game.ctx.clearRect(0, 0, canvas.width, canvas.height);	
	
	Game.ctx.setLineDash([1, 3]);
	
	Game.mouse.drawCircle(Game.ctx,20)

	textOut( 10, canvas.height, 0, -15, [
		"fps:" + Math.round(1000/window.elapsed),
		"Canvas Size: " + canvas.width + " " + canvas.height
	])
	
	window.requestAnimFrame(tick)
}

function keyPress(e) {
	var key = String.fromCharCode(e.which)
	var m = Game.modes.returnif(function(m){return key == m.key})
	if ( m != null ) {
		if ( m != Game.mode ) {
			console.log("changed mode from " + Game.mode.name + " to " + m.name)
			Game.mode = m
		}
		return
	}
	e = Game.events.returnif(function(e){return key == e.key})
}

function mouseMoved(e) {
	Game.mouse.set(e.clientX,e.clientY)
}

function mousePressed(e) {
	Game.mouse.set(e.clientX,e.clientY)
	Game.mouseDown = true
	console.log("mousePressed")
}

function mouseReleased(e) {
	Game.mouse.set(e.clientX,e.clientY)
	Game.mouseReleased = false
	console.log("mouseReleased")
}

function resize(e) {
	Game.canvas.width = window.innerWidth
	Game.canvas.height = window.innerHeight
}


function init() {
	Game.canvas = document.getElementById('canvas')
	Game.ctx = canvas.getContext("2d")
	
	Game.canvas.width = window.innerWidth
	Game.canvas.height = window.innerHeight

	$(document).mousemove( mouseMoved )
	$(document).mousedown( mousePressed )
	$(document).mouseup( mouseReleased )
	$( window ).resize( resize )
	$( document ).keypress( keyPress )

	$(canvas).css('cursor', 'none')

	tick()
}

window.requestAnimFrame = ( function(){
  return  window.requestAnimationFrame	   || 
		  window.webkitRequestAnimationFrame || 
		  window.mozRequestAnimationFrame	|| 
		  window.oRequestAnimationFrame	  || 
		  window.msRequestAnimationFrame	 || 
		  function( callback ){
			window.setTimeout(callback, 30)
		  }
})()