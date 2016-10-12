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

Point.prototype.setAngle = function(a) {
	this.x = Math.cos(a)
	this.y = Math.sin(a)
	return this
}

Point.prototype.copy = function(p) {
	this.x = p.x
	this.y = p.y
	return this
}

Point.prototype.sum = function(p) {
	this.x += p.x
	this.y += p.y
	return this
}

Point.prototype.sub = function(p) {
	this.x -= p.x
	this.y -= p.y
	return this
}

Point.prototype.scale = function(f) {
	this.x *= f
	this.y *= f
	return this
}

Point.prototype.factor = function(f) {
	this.x /= f
	this.y /= f
	return this
}

Point.prototype.length = function() {
	return Math.sqrt(this.x*this.x + this.y*this.y)
}

Point.prototype.inverse = function() {
	var temp = this.x
	this.x = this.y
	this.y = -temp
	return this
}

Point.prototype.dist = function(p) {
	var nx = p.x - this.x
	var ny = p.y - this.y
	return Math.sqrt(nx*nx+ny*ny)
}

Point.prototype.print = function() {
	console.log(x + ", " + y)
}

freePoint = new Point
freeAPoint = new Point
freeBPoint = new Point

Point.prototype.free = function() {
	return freePoint.copy(this)
}

Point.prototype.freeA = function() {
	return freeAPoint.copy(this)
}

Point.prototype.freeB = function() {
	return freeBPoint.copy(this)
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

Point.prototype.drawLine = function(ctx, p) {
	ctx.beginPath();
	ctx.moveTo(this.x,this.y);
	ctx.lineTo(p.x,p.y);
	ctx.stroke();
}

//------------------------------------------------------------
// LINE.JS
//------------------------------------------------------------

var Line = function(pa,pb) {
	this.a = pa
	this.b = pb
}

Line.prototype.length = function() {
	return this.a.dist(this.b)
}

Line.prototype.draw = function(ctx) {
	ctx.beginPath();
	ctx.moveTo(this.a.x,this.a.y);
	ctx.lineTo(this.b.x,this.b.y);
	ctx.stroke();
}

//------------------------------------------------------------
// LIST.JS
//------------------------------------------------------------

var ListNode = function(l,v) {
	this.list = l
	this.val = v
	this.prev = l.tail
	this.next = null
}

ListNode.prototype.kill = function() {
	if ( this.prev == null ) {
		this.list.head = this.next
	} else {
		this.prev.next = this.next
	}
	if (this.next == null) {
		this.list.tail = this.prev
	} else {
		this.next.prev = this.prev
	}
}

var List = function() {
	this.head = null
	this.tail = null
}

List.prototype.clear = function() {
	this.head = this.tail = null
}

List.prototype.add = function(v) {
	if ( this.head == null ) {
		this.head = this.tail = new ListNode(this,v)
	} else {
		this.tail = this.tail.next = new ListNode(this,v)
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

List.prototype.countif = function(f) {
	var i = 0
	for ( var n = this.head; n != null; n = n.next ) {
		if ( f(n.val) ) {
			i++
		}
	}
	return i
}

List.prototype.size = function() {
	var i = 0
	for ( var n = this.head; n != null; n = n.next ) {
		i++
	}
	return i
}

//------------------------------------------------------------
// STRINGIO.JS
//------------------------------------------------------------

var StringIO = function(a) {
	this.array = a
	this.index = 0
}

StringIO.prototype.readInteger = function() {
	var s = this.array[this.index]
	var i = parseInt(s)
// 	console.log("readInteger " + s + " " + i)
	this.index++
	return i
}

StringIO.prototype.readFloat = function() {
	var s = this.array[this.index]
	var i = parseFloat(s)
// 	console.log("readFloat " + s + " " + i)
	this.index++
	return i
}

StringIO.prototype.readBoolean = function() {
	var s = this.array[this.index]
	var i = s == "true"
// 	console.log("readBoolean " + s + " " + i + " ")
	this.index++
	return i
}

StringIO.prototype.readPoint = function() {
	return new Point().set(this.readFloat(),this.readFloat())
}

//------------------------------------------------------------
// NODE.JS
//------------------------------------------------------------

var Node = function(p) {
	this.point = p
	this.links = new List
	this.targets = new List
	this.gate = null
}

function drawNode(n) {
	var ctx = Game.ctx
	if ( n.gate == null ) {
		ctx.fillStyle = 'black'
	} else {
		ctx.fillStyle = n.gate.isOpen() ? 'green' : 'red'
	}
	n.point.fillCircle(ctx,10)
}

function clearGate(n) {
	n.gate = null
}

//------------------------------------------------------------
// GATE.JS
//------------------------------------------------------------

var Gate = function(m) {
	this.master = m
	this.targets = new List
}

Gate.prototype.isOpen = function() {
	return this.targets.alltrue(isActive) && (this.master == null || this.master.countif(isPortalActive))
}

//------------------------------------------------------------
// LINK.JS
//------------------------------------------------------------

var Link = function(a,b,d) {
	this.line = new Line(a.point,b.point)
	this.nodes = new List().addAll(a,b)
	this.a = a
	this.b = b
	a.links.add(this)
	b.links.add(this)
	if ( d ) {
		this.resetGate()
	}
}

function drawLink(l) {
	var ctx = Game.ctx
	if ( l.gate == null ) {
		ctx.strokeStyle = 'black'
		ctx.lineWidth = 10
		ctx.setLineDash([0]);
	} else {
		if ( l.isOpen() ) {
			ctx.strokeStyle = 'green'
			ctx.setLineDash([10]);
		} else {
			ctx.strokeStyle = 'red'
			ctx.setLineDash([0]);
		}
		ctx.lineWidth = 4
	}
	
	l.line.draw(ctx)
}

Link.prototype.isOpen = function() {
	return this.gate != null && this.gate.isOpen();
}

Link.prototype.checkGate = function() {
	if (this.gate == null)
		return
	var link = this
	link.nodes.foreach(function(n){
		if ( n.gate == link.gate )
			return
		n.gate = link.gate;
		n.targets.foreach(function(t){
			t.handle.gate = link.gate;
			link.gate.targets.add(t);
		});
		n.links.foreach(function(l){
			if( l.gate != null && l.gate != link.gate){
				l.setGate(link.gate)
			}
		})
	})
}

Link.prototype.setGate = function(g) {
	this.gate = g
	this.checkGate()
}

Link.prototype.resetGate = function() {
	var na = this.a.gate
	var nb = this.b.gate
	var nan = na == null
	this.gate = this.gate == null && (nan != (nb == null) || (!nan && na == nb)) ? nan ? nb : na : new Gate
	this.checkGate()
}

Link.prototype.clearGate = function() {
	if (gate == null)
		return;
	var g = gate;
	this.gate = null
	this.nodes.foreach(clearGate)
	this.nodes.foreach(function(n){
		n.links.foreach(function(l){
			if ( l.gate == g ) {
				l.resetGate
			}
		})
	})
	this.nodes.foreach(function(n){
		if ( n.gate == null ){
			n.targets.foreach(deleteHandle)
			n.targets.clear()
		}
	})
}

//------------------------------------------------------------
// PORTAL.JS
//------------------------------------------------------------

var Portal = function(lvl) {
	this.gate = new Gate(lvl.portals)
	this.targets = new List
	this.turn = Math.random() * Math.PI
}


function drawPortal(t) {
	var p = t.portal
	if ( p == null )
		return
	var ctx = Game.ctx
	
	ctx.strokeStyle = p.gate.isOpen() ? 'purple' : 'red'
	ctx.lineWidth = 4
	ctx.setLineDash([0])

	var r = Game.radius * Math.abs(Math.cos(p.turn))
	t.point.drawCircle(ctx,r)

	p.turn += window.elapsed * Game.pulseSpeed
	p.turn %= Math.PI * 2
}

//------------------------------------------------------------
// PLAYER.JS
//------------------------------------------------------------

var Player = function(lvl,tar) {
	this.level = lvl
	this.home = tar
	this.turn = 0
}

function drawPlayer(tar) {
	var player = tar.player
	if ( player == null ) {
		return
	}
	var ctx = Game.ctx
	if ( player.level.sel == tar ) {
		player.turn += window.elapsed * Game.turnSpeed
		player.turn %= Math.PI * 2
		ctx.strokeStyle = 'orange'
	} else {
		ctx.strokeStyle = 'black'
	}
	ctx.lineWidth = 4
	freePoint.setAngle(2 * player.turn * Math.PI).scale(Game.radius);
	tar.point.freeA().sum(freePoint);
	tar.point.freeB().sub(freePoint);
	freeAPoint.drawLine(ctx, freeBPoint);
	freePoint.inverse();
	tar.point.freeA().sum(freePoint);
	tar.point.freeB().sub(freePoint);
	freeAPoint.drawLine(ctx, freeBPoint);
}

//------------------------------------------------------------
// KEY.JS
//------------------------------------------------------------

var Key = function(is) {
	this.isSquare = is

}

//------------------------------------------------------------
// HANDLE.JS
//------------------------------------------------------------

var Handle = function(targetOrHandle, han, is) {
	if ( targetOrHandle.links != null ) {
		this.gate = targetOrHandle.gate
		this.color = 'green'
		targetOrHandle.targets.add(han)
	} else {
		this.gate = targetOrHandle.portal.gate
		this.color = 'purple'
	}

	this.gate.targets.add(han)
	this.isSquare = is
}

//------------------------------------------------------------
// TARGET.JS
//------------------------------------------------------------


var Target = function(lvl,p) {
	this.point = p
	this.level = lvl
	this.handle = null
	this.portal = null
	this.key = null
	this.player = null
}

function isActive(t) {
	return t.key != null || t.player != null
}

function isPortalActive(t) {
	return t.portal != null && t.portal.gate.targets.alltrue(isActive)
}

function deleteHandle(t) {

}

function drawHandle(t) {

}



function drawKey(t) {

}

Target.prototype.isEmpty = function() {
	return this.handle == null && this.portal == null && this.key == null && this.player == null
}

Target.prototype.movePlayerFrom = function(target) {
	if ( this.player != null ) {
		return false
	}
	var wasEmpty = this.isEmpty()
	
	this.player = target.player
	target.player = null
	if (this.key == null && !Game.releaseKey) {
		this.key = target.key
		target.key = null
	}

	if (target.isEmpty())
		target.lvl.targets.remove(target)
	if (wasEmpty && !this.isEmpty())
		this.lvl.targets.add(this)
	return true
}

Target.prototype.drag = function(a,b) {
	this.sum(a).sub(b)
	if (portal != null)
		portal.forEach(function(t){t.drag(a,b)})
	if (handle != null)
		handle.update(this)
}


//------------------------------------------------------------
// LEVEL.JS
//------------------------------------------------------------

var Level = function(s,i) {
	this.score = s
	this.index = i
	this.nodes = new List
	this.links = new List
	this.portals = new List
	this.targets = new List

	this.sel = null
	this.target = null
}

Level.prototype.draw = function() {
	this.targets.foreach(drawHandle)
	this.targets.foreach(drawPortal)
	this.targets.foreach(drawKey)
	this.targets.foreach(drawPlayer)
	this.links.foreach(drawLink)
	this.nodes.foreach(drawNode)
}

Level.prototype.getNode = function(p) {
	return this.nodes.returnif(function(n){return n.point.dist(p) < Game.radius})
}

//------------------------------------------------------------
// WINDOW.JS
//------------------------------------------------------------

var Game = {
	radius: 25,
	pulseSpeed: 0.002,
	turnSpeed: 0.002,
	canvas: null,
 	ctx: null,
 	now: 0,
 	src: "https://raw.githubusercontent.com/iconium9000/mazeGame/master/mazeGame.txt",
 	lastTime: 0,
 	releaseKey: false,
 	levels: new List,
 	lvl: null,
 	stringIO: null,
	mouseDown: false,
	mouse: new Point,
	events: new List().addAll(),
	textOut: function( startX, startY, shiftX, shiftY, strings ) {
		Game.ctx.font = '10pt Verdana'
		Game.ctx.fillStyle = 'black'
		for ( var i = 0; i < strings.length; i++) {
			Game.ctx.fillText( strings[i], startX += shiftX, startY += shiftY );
		}
	},
	readLevels: function(s) {
		var index = 0
		while ( s.readBoolean() ) {
			// Level

			var lvl = new Level(s.readInteger(),++index)
			Game.levels.add(lvl)

			while ( s.readBoolean() ) {
				lvl.nodes.add(new Node(s.readPoint()))
			}
			while ( s.readBoolean() ) {
				lvl.links.add(new Link(lvl.getNode(s.readPoint()),lvl.getNode(s.readPoint()),s.readBoolean()))
			}
			while ( s.readBoolean() ) {
				// Target
				var tar = new Target(lvl,s.readPoint())
				lvl.targets.add(tar)

				if ( s.readBoolean() ) {
					// Key
					s.readBoolean()

// 					console.log("\t\tnew Key")
				}

				if ( s.readBoolean() ) {
					tar.player = new Player(lvl,tar)
				}

				if ( s.readBoolean() ) {
					tar.portal = new Portal(lvl)
					lvl.portals.add(tar)
				}

				if ( s.readBoolean() ) {
					// Handle
					s.readPoint()
					s.readBoolean()

// 					console.log("\t\tnew Handle")
				}
			}
			console.log("Level \t"
				+ lvl.index + "\t"
				+ lvl.nodes.size() + "\t"
				+ lvl.links.size() + "\t"
				+ lvl.targets.size() + "\t"
				+ lvl.score + "\t"
			)
		}
		Game.lvl = Game.levels.head
	}
}

//------------------------------------------------------------
// MAIN.JS
//------------------------------------------------------------

function tick() {
	

	Game.now = (new Date()).getTime()
	window.elapsed = Game.now - Game.lastTime
	Game.lastTime = Game.now
	
	Game.ctx.fillStyle = "#ffffff"
	Game.ctx.fillRect(0, 0, canvas.width, canvas.height);	
	Game.ctx.lineCap = "round";


// 	Game.ctx.setLineDash([1, 3]);
	
	Game.mouse.drawCircle(Game.ctx,20)

	Game.textOut( 10, canvas.height, 0, -15, [
		"fps:" + Math.round(1000/window.elapsed),
		"Canvas Size: " + canvas.width + " " + canvas.height,
		"Level Number: " + Game.lvl.val.index
	])
	
	Game.lvl.val.draw()

	window.requestAnimFrame(tick)
}

function keyPress(e) {
	var key = String.fromCharCode(e.which)
	
	switch ( key ) {
	case ',':	// prevLevel
		if ( Game.lvl.prev != null ) {
			Game.lvl = Game.lvl.prev
		}
		break
	case '.':	// nextLevel
		if ( Game.lvl.next != null ) {
			Game.lvl = Game.lvl.next
		}
		break
	case 'r':
		Game.lvl.reset()
		break
	}

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
	
	var xmlhttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
	xmlhttp.onreadystatechange = function () {               
		if (xmlhttp.readyState == 4) {                   
			Game.readLevels(new StringIO(xmlhttp.responseText.split("\n")))
			document.getElementById('loadingMsg').style.visibility = 'hidden'
			document.getElementById('canvas').style.visibility = 'visible'
			tick()
		}  	             
	}
	xmlhttp.open("GET", Game.src, true)
	xmlhttp.send()
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
