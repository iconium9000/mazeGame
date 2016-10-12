//------------------------------------------------------------
// POINT.JS
//------------------------------------------------------------
function notEqualOrZero(a, b) {
    return a != b && a != 0 && b != 0
}
function side(a, b, p) {
    var A = (p.x - b.x) * (a.y - b.y)
    var B = (p.y - b.y) * (a.x - b.x)
    if (A == B)
        return 0
    else
        return A > B ? 1 : -1
}
var Point = function() {
    x = 0
    y = 0
    return this
}
Point.prototype.set = function(x, y) {
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
Point.prototype.unit = function(f) {
    var l = f / this.length()
    this.x *= l
    this.y *= l
    return this
}
Point.prototype.length = function() {
    var nx = this.x
    var ny = this.y
    return Math.sqrt(nx * nx + ny * ny)
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
    return Math.sqrt(nx * nx + ny * ny)
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
Point.prototype.drawCircle = function(g, r) {
    g.beginPath()
    g.arc(this.x, this.y, r, 0, Math.PI * 2, true)
    g.closePath()
    g.stroke()
}
Point.prototype.fillCircle = function(g, r) {
    g.beginPath()
    g.arc(this.x, this.y, r, 0, Math.PI * 2, true)
    g.closePath()
    g.fill()
}
Point.prototype.drawSquare = function(g, r) {
    g.beginPath()
    g.rect(this.x - r, this.y - r, 2 * r, 2 * r)
    g.closePath()
    g.stroke()
}
Point.prototype.fillSquare = function(g, r) {
    g.beginPath()
    g.rect(this.x - r, this.y - r, 2 * r, 2 * r)
    g.closePath()
    g.fill()
}
Point.prototype.drawLine = function(g, p) {
    g.beginPath()
    g.moveTo(this.x, this.y)
    g.lineTo(p.x, p.y)
    g.stroke()
}
//------------------------------------------------------------
// LINE.JS
//------------------------------------------------------------
var Line = function(pa, pb) {
    this.a = pa
    this.b = pb
}
Line.prototype.length = function() {
    return this.a.dist(this.b)
}
Line.prototype.draw = function(g) {
    g.beginPath()
    g.moveTo(this.a.x, this.a.y)
    g.lineTo(this.b.x, this.b.y)
    g.stroke()
}
Line.prototype.lineCross = function(la, lb) {
    var a = this.a
    var b = this.b
    return notEqualOrZero(side(a, b, la), side(a, b, lb)) && notEqualOrZero(side(la, lb, a), side(la, lb, b))
}
//------------------------------------------------------------
// LIST.JS
//------------------------------------------------------------
var ListNode = function(l, v) {
    this.list = l
    this.val = v
    this.prev = l.tail
    this.next = null
}
ListNode.prototype.kill = function() {
    if (this.prev == null ) {
        this.list.head = this.next
    } else {
        this.prev.next = this.next
    }
    if (this.next == null ) {
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
    if (this.head == null ) {
        this.head = this.tail = new ListNode(this,v)
    } else {
        this.tail = this.tail.next = new ListNode(this,v)
    }
    return this
}
List.prototype.remove = function(v) {
    for (var n = this.head; n != null ; n = n.next)
        if (n.val == v) {
            return n.kill()
        }
    return null
}
List.prototype.addAll = function() {
    for (var i = 0; i < arguments.length; ++i) {
        this.add(arguments[i])
    }
    return this
}
List.prototype.addArray = function(a) {
    for (var i = 0; i < a.length; ++i) {
        this.add(a[i])
    }
    return this
}
List.prototype.addList = function(l) {
    for (var n = l.head; n != null ; n = n.next) {
        this.add(n.val)
    }
    return this
}
List.prototype.foreach = function(f) {
    for (var n = this.head; n != null ; n = n.next) {
        f(n.val)
    }
    return this
}
List.prototype.foreach2 = function(f) {
    for (var a = this.head; a != null ; a = a.next) {
        for (var b = a.next; b != null ; b = b.next) {
            f(a.val, b.val)
        }
    }
    return this
}
List.prototype.sortif = function(f) {
    for (var a = this.head; a != null ; a = a.next) {
        for (var b = a.next; b != null ; b = b.next) {
            if (f(a.val, b.val)) {
                var v = a.val
                a.val = b.val
                b.val = v
            }
        }
    }
    return this
}
List.prototype.findif = function(f) {
    for (var n = this.head; n != null ; n = n.next) {
        if (f(n.val)) {
            return true
        }
    }
    return false
}
List.prototype.returnif = function(f) {
    for (var n = this.head; n != null ; n = n.next) {
        if (f(n.val)) {
            return n.val
        }
    }
    return null
}
List.prototype.removeif = function(f) {
    var a = []
    for (var n = this.head; n != null ; n = n.next) {
        if (f(n.val)) {
            a.push(n.kill())
        }
    }
    return a
}
List.prototype.alltrue = function(f) {
    for (var n = this.head; n != null ; n = n.next) {
        if (!f(n.val)) {
            return false
        }
    }
    return true
}
List.prototype.countif = function(f) {
    var i = 0
    for (var n = this.head; n != null ; n = n.next) {
        if (f(n.val)) {
            i++
        }
    }
    return i
}
List.prototype.size = function() {
    var i = 0
    for (var n = this.head; n != null ; n = n.next) {
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
    return new Point().set(this.readFloat(), this.readFloat())
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
    if (n.gate == null ) {
        return
    }
    var g = Game.g
    var r = Game.lvl.val.radius / Game.nodeRadiusFactor

    if (n.gate == null ) {
        g.fillStyle = Game.wallColor
    } else {
        g.fillStyle = n.gate.isOpen() ? Game.doorColor : Game.closeColor
    }
    n.point.fillCircle(g, r)
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
    if (this.targets.alltrue(isActive)) {
        return this.master == null || this.master.countif(isPortalActive) == 2
    } else {
        return
    }
}
//------------------------------------------------------------
// LINK.JS
//------------------------------------------------------------
var Link = function(a, b, d) {
    this.line = new Line(a.point,b.point)
    this.nodes = new List().addAll(a, b)
    this.a = a
    this.b = b
    a.links.add(this)
    b.links.add(this)
    if (d) {
        this.resetGate()
    }
}
function drawLink(l) {
    var g = Game.g
    var r = Game.lvl.val.radius
    if (l.gate == null ) {
        g.strokeStyle = Game.wallColor
        g.lineWidth = r / Game.wallWidthFactor
        g.setLineDash([])
    } else {
        if (l.isOpen()) {
            g.strokeStyle = Game.doorColor
            g.setLineDash([r / Game.wallWidthFactor])
        } else {
            g.strokeStyle = Game.closeColor
            g.setLineDash([])
        }
        g.lineWidth = r / Game.doorWidthFactor
    }
    l.line.draw(g)
}
Link.prototype.isOpen = function() {
    return this.gate != null && this.gate.isOpen()
}
Link.prototype.checkGate = function() {
    if (this.gate == null )
        return
    var link = this
    link.nodes.foreach(function(n) {
        if (n.gate == link.gate)
            return
        n.gate = link.gate
        n.targets.foreach(function(t) {
            t.handle.gate = link.gate
            link.gate.targets.add(t)
        })
        n.links.foreach(function(l) {
            if (l.gate != null && l.gate != link.gate) {
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
    this.gate = this.gate == null && (nan != (nb == null ) || (!nan && na == nb)) ? nan ? nb : na : new Gate
    this.checkGate()
}
Link.prototype.clearGate = function() {
    if (gate == null )
        return
    var g = gate
    this.gate = null
    this.nodes.foreach(clearGate)
    this.nodes.foreach(function(n) {
        n.links.foreach(function(l) {
            if (l.gate == g) {
                l.resetGate
            }
        })
    })
    this.nodes.foreach(function(n) {
        if (n.gate == null ) {
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
    if (p == null )
        return
    var g = Game.g
    g.strokeStyle = p.gate.isOpen() ? Game.portalColor : Game.closeColor
    g.lineWidth = 4
    g.setLineDash([])
    var r = t.level.radius * Math.abs(Math.cos(p.turn))
    t.point.drawCircle(g, r)
    p.turn += window.elapsed * Game.pulseSpeed
    p.turn %= Math.PI * 2
}
//------------------------------------------------------------
// PLAYER.JS
//------------------------------------------------------------
var Player = function(lvl, tar) {
    this.level = lvl
    tar.playerHome = this
    this.turn = 0
    this.home = tar
}
function drawPlayer(tar) {
    var player = tar.player
    if (player == null ) {
        return
    }
    var g = Game.g
    var path = tar.level.path
    var r = tar.level.radius
    if (tar == Game.lvl.val.sel) {
        player.turn += window.elapsed * Game.turnSpeed
        player.turn %= Math.PI * 2
        g.strokeStyle = 'orange'
    } else {
        g.strokeStyle = Game.wallColor
    }
    g.lineWidth = r / Game.doorWidthFactor
    g.setLineDash([])
    freePoint.setAngle(2 * player.turn * Math.PI).scale(r)
    tar.point.freeA().sum(freePoint)
    tar.point.freeB().sub(freePoint)
    freeAPoint.drawLine(g, freeBPoint)
    freePoint.inverse()
    tar.point.freeA().sum(freePoint)
    tar.point.freeB().sub(freePoint)
    freeAPoint.drawLine(g, freeBPoint)
}
//------------------------------------------------------------
// KEY.JS
//------------------------------------------------------------
var Key = function(tar, is) {
    this.isSquare = is
    tar.keyHome = this
    this.home = tar
}
function drawKey(t) {
    var key = t.key
    if (key == null ) {
        return
    }
    var g = Game.g
    var r = t.level.radius
    g.lineWidth = r / Game.doorWidthFactor
    g.setLineDash([])
    g.strokeStyle = Game.wallColor
    if (key.isSquare) {
        t.point.drawSquare(g, r / Game.keyRadiusFactor)
    } else {
        t.point.drawCircle(g, r / Game.keyRadiusFactor)
    }
}
//------------------------------------------------------------
// HANDLE.JS
//------------------------------------------------------------
var Handle = function(targetOrHandle, han, is) {
    if (targetOrHandle.links != null ) {
        this.color = Game.doorColor
        this.gate = targetOrHandle.gate
        targetOrHandle.targets.add(han)
    } else {
        this.gate = targetOrHandle.portal.gate
        this.color = Game.portalColor
    }
    this.parent = targetOrHandle.point
    this.gate.targets.add(han)
    this.isSquare = is
}
function deleteHandle(t) {}
function drawHandle(t) {
    var h = t.handle
    if (h == null ) {
        return
    }
    var g = Game.g
    var r = Game.lvl.val.radius
    g.strokeStyle = g.fillStyle = h.gate.isOpen() ? h.color : Game.closeColor
    g.lineWidth = r / Game.doorWidthFactor
    g.setLineDash([1,1.5 * r / Game.doorWidthFactor])
    t.point.drawLine(g, h.parent)
    if (h.isSquare) {
        t.point.fillSquare(g, r / Game.handleRadiusFactor )
    } else {
        t.point.fillCircle(g, r / Game.handleRadiusFactor)
    }
}
//------------------------------------------------------------
// TARGET.JS
//------------------------------------------------------------
var Target = function(lvlOrTar, p) {
    this.handle = null
    this.portal = null
    this.player = null
    this.key = null
    this.playerHome = null
    this.keyHome = null
    this.point = p
    this.level = lvlOrTar
}
function isActive(t) {
    return t.key != null || t.player != null
}
function isPortalActive(t) {
    return t.portal != null && t.portal.gate.targets.alltrue(isActive)
}
function lineCross(a, b) {
    var pa = a.point
    var pb = b.point
    var lvl = a.level
    return lvl.links.findif(function(l) {
        if ( !l.line.lineCross(pa, pb) )
            return false
        if (l.gate == null || !l.gate.isOpen()) {
            return true
        } else if ( a.handle == null ) {
            return false
        } else if ( a.handle.gate == l.gate ) {
            if ( a.key == null ) {
                return true
            } else {
                Game.releaseKey = true
                return false
            }
        } else {
            return false
        }
         
    })
}
Target.prototype.isValidPortal = function() {
    return this.portal != null && this.portal.gate.isOpen()
}
Target.prototype.isEmpty = function() {
    return this.handle == null && this.portal == null && this.key == null && this.player == null
}
Target.prototype.movePlayerFrom = function(target) {
    if (this.player != null ) {
        return false
    }
    var wasEmpty = this.isEmpty()
    this.player = target.player
    target.player = null
    this.level.sel = this
    if (this.key == null && !Game.releaseKey) {
        this.key = target.key
        target.key = null
    }
    if (target.isEmpty())
        target.level.targets.remove(target)
    if (wasEmpty && !this.isEmpty())
        this.level.targets.add(this)
    return true
}
Target.prototype.drag = function(a, b) {
    this.sum(a).sub(b)
    if (portal != null )
        portal.forEach(function(t) {
            t.drag(a, b)
        })
    if (handle != null )
        handle.update(this)
}
//------------------------------------------------------------
// PATH.JS (start, transport, end, isValid, isPortal)
//------------------------------------------------------------
var Path = function(start, end) {
    this.isValid = false
    this.start = start
    this.end = end
    this.isPortal = false
    var lvl = this.start.level
    if (start.player != null && end.player != null ) {
        return
    } else if (start == end) {
        this.isPortal = start.isValidPortal()
        this.end = this.isPortal ? start.level.getOtherPortal(start) : start
    } else if (start.isValidPortal() && end.isValidPortal()) {
        this.isPortal = true
    } else if (lineCross(start, end)) {
        if ( start.isValidPortal() ) {
            this.end = start.level.getOtherPortal(start)
            this.isPortal = true
        } else {
            var tar = this.start.level.getNearestActivePortal(start)
            if ( tar != null ) {
                this.end = tar
            } else {
                return
            }
        }
    }
    this.isValid = true
    this.transport = null
}
Path.prototype.startPath = function() {
    if ( this.isValid ) {
        if (this.start.key != null && !Game.releaseKey) {
            if (this.end.key != null )
                Game.releaseKey = true;
            else if (this.end.handle != null && this.end.handle.isSquare != this.start.key.isSquare)
                Game.releaseKey = true;
        }
        var lvl = this.start.level
        var p = new Point().copy(this.start.point)
        this.transport = new Target(lvl,p)
        this.transport.movePlayerFrom(this.start)
        this.dist = this.start.point.dist(this.end.point)
    }
}
Path.prototype.draw = function(g) {
    g.strokeStyle = Game.wallColor
    g.setLineDash([10])
    g.lineWidth = 4
    if (this.transport != null ) {
        drawKey(this.transport)
        drawPlayer(this.transport)
        this.transport.point.drawLine(g, this.end.point)
        var d = Game.playerSpeed * window.elapsed * this.dist
        var trav = this.transport.point.dist(this.start.point)
        if (trav + d > this.dist) {
            var r = this.end.handle != null && this.transport.key != null ;
            this.end.movePlayerFrom(this.transport)
            Game.releaseKey = r
            if (!this.isPortal && this.end.isValidPortal()) {
                var po = this.end.level.getOtherPortal(this.end)
                if ( po.player != null ) {
                    this.transport = null
                    return
                }
                this.start = this.end
                this.end = po
                this.isPortal = true
                this.startPath()
            } else {
                this.transport = null
            }
        } else {
            this.transport.point.sum(this.end.point.free().sub(this.start.point).unit(d))
        }
    } else if (this.isValid) {// 		this.start.point.drawLine(g,this.end.point)
    }
}
//------------------------------------------------------------
// LEVEL.JS
//------------------------------------------------------------
var Level = function(s, i) {
    this.score = s
    this.index = i
    this.radius = 28
    this.nodes = new List
    this.links = new List
    this.portals = new List
    this.targets = new List
    this.homes = new List
    this.path = null
    this.sel = null
    this.minPoint = new Point().set(1e10, 1e10)
    this.maxPoint = new Point().set(0, 0)
}
Level.prototype.draw = function() {
    this.targets.foreach(drawHandle)
    this.targets.foreach(drawPortal)
    this.targets.foreach(drawKey)
    this.targets.foreach(drawPlayer)
    if (this.path != null )
        this.path.draw(Game.g)
    this.links.foreach(drawLink)
    this.nodes.foreach(drawNode)
}
Level.prototype.resize = function(w, h) {
    var min = this.minPoint
    var max = freeBPoint.copy(this.maxPoint).sub(min)
    var pad = 30
    w -= 2 * pad
    h -= 2 * pad + Game.menuBar
    var index = Game.levelResetIndex++
    var swap = (w > h) != (max.x > max.y)
    var scale = function(n) {
        if (n == null || n.index == index)
            return
        var p = n.point

        p.x -= min.x
        p.y -= min.y

        if ( swap ) {
            var x = p.x
            p.x = p.y * max.x / max.y
            p.y = x * max.y / max.x
        }

        p.x = p.x * w / max.x + pad
        p.y = p.y * h / max.y + pad
        n.index = index
    }
    this.nodes.foreach(scale)
    this.targets.foreach(scale)
    this.homes.foreach(scale)
    if (this.path != null ) {
        scale(this.path.transport)
    }
    min.set(pad, pad)
    this.maxPoint.set(w + pad, h + pad)
    this.radius = Game.radius * this.maxPoint.length() / this.startSize
}
Level.prototype.resetLevel = function() {
    if (this.path != null && this.path.transport != null ) {
        return
    }
    var targets = this.targets
    targets.removeif(function(t) {
        if (t.player != null ) {
            if (t.player.home.isEmpty()) {
                targets.add(t.player.home)
            }
            t.player.home.player = t.player
            t.player = t.playerHome
        }
        if (t.key != null ) {
            if (t.key.home.isEmpty()) {
                targets.add(t.key.home)
            }
            t.key.home.key = t.key
            t.key = t.keyHome
        }
        return t.isEmpty()
    })
    this.sel = null
    this.path = null
}
Level.prototype.getOtherPortal = function(t) {
    return this.portals.returnif(function(tar) {
        return tar.portal != null && tar.portal.gate.isOpen() && t != tar
    })
}
Level.prototype.getNearestActivePortal = function(t) {
    return this.portals.returnif(function(tar) {
        return tar.portal != null && tar.portal.gate.isOpen() && !lineCross(t,tar)
    })
}

Level.prototype.getNode = function(p) {
    var r = this.radius
    return this.nodes.returnif(function(n) {
        return n.point.dist(p) < r
    })
}
Level.prototype.getTarget = function(p) {
    var r = this.radius
    return this.targets.returnif(function(n) {
        return n.point.dist(p) < r
    })
}
Level.prototype.setTarget = function(p) {
    var tar = this.getTarget(p)
    if (this.sel == null) {
        if (tar != null && tar.player != null ) {
            this.sel = tar
            this.path = new Path(tar,tar)
        }
        return
    }
    if ( this.sel == null ) {
        return
    }

    if (this.path != null && this.path.transport != null )
        return
    else if (tar == null )
        tar = new Target(this,new Point().copy(p))
    else if (tar.player != null ) {
        if (tar == this.path.end) {
            this.sel = null
            this.path = null
        } else {
            this.sel = tar
            this.path = new Path(tar,tar)
            Game.releaseKey = true
        }
        return
    }
    var path = new Path(this.sel,tar)
    if (path.isValid) {
        this.path = path
        path.startPath()
    }
}
//------------------------------------------------------------
// WINDOW.JS
//------------------------------------------------------------
var Game = {
    wallColor: 'white',
    backGroundColor: 'black',
    doorColor: '#00FF00',
    portalColor: '#FF00FF',
    closeColor: '#FF3311',
    radius: 24,
    wallWidthFactor:3,
    doorWidthFactor:7,
    handleRadiusFactor:5,
    nodeRadiusFactor:2.5,
    keyRadiusFactor:2,
    playerSpeed: 0.009,
    pulseSpeed: 0.002,
    turnSpeed: 0.001,
    canvas: null ,
    menuBar: 60,
    levelResetIndex: 0,
    g: null ,
    now: 0,
    src: "https://raw.githubusercontent.com/iconium9000/mazeGame/master/mazeGame.txt",
    lastTime: 0,
    releaseKey: false,
    levels: new List,
    lvl: null ,
    stringIO: null ,
    mouseDown: false,
    mouse: new Point,
    events: new List().addAll(),
    textOut: function(startX, startY, shiftX, shiftY, strings) {
        Game.g.font = '10pt Verdana'
        Game.g.fillStyle = Game.wallColor
        for (var i = 0; i < strings.length; i++) {
            Game.g.fillText(strings[i], startX += shiftX, startY += shiftY)
        }
    },
    readLevels: function(s) {
        var index = 0
        while (s.readBoolean()) {
            // Level
            var lvl = new Level(s.readInteger(),++index)
            Game.levels.add(lvl)
            while (s.readBoolean()) {
                var n = new Node(s.readPoint())
                lvl.nodes.add(n)
                var min = lvl.minPoint
                var max = lvl.maxPoint
                var p = n.point
                if (p.x < min.x) {
                    min.x = p.x
                }
                if (p.x > max.x) {
                    max.x = p.x
                }
                if (p.y < min.y) {
                    min.y = p.y
                }
                if (p.y > max.y) {
                    max.y = p.y
                }
            }
            while (s.readBoolean()) {
                var a = lvl.getNode(s.readPoint())
                var b = lvl.getNode(s.readPoint())
                lvl.links.add(new Link(a,b,s.readBoolean()))
            }
            while (s.readBoolean()) {
                // Target
                var tar = new Target(lvl,s.readPoint())
                lvl.targets.add(tar)
                if (s.readBoolean()) {
                    tar.key = new Key(tar,s.readBoolean())
                }
                if (s.readBoolean()) {
                    tar.player = new Player(lvl,tar)
                }
                if (s.readBoolean()) {
                    tar.portal = new Portal(lvl)
                    lvl.portals.add(tar)
                }
                if (tar.player != null || tar.key != null ) {
                    lvl.homes.add(tar)
                }
                if (s.readBoolean()) {
                    // Handle
                    var p = s.readPoint()
                    var n = lvl.getNode(p)
                    var t = lvl.getTarget(p)
                    if (n != null ) {
                        tar.handle = new Handle(n,tar,s.readBoolean())
                    } else if (t != null ) {
                        tar.handle = new Handle(t,tar,s.readBoolean())
                    } else {
                        s.readBoolean()
                    }
                }
            }
            lvl.startSize = lvl.maxPoint.length()
            lvl.resize(Game.canvas.width, Game.canvas.height)
            console.log("Level \t" + lvl.index + "\t" + lvl.nodes.size() + "\t" + lvl.links.size() + "\t" + lvl.targets.size() + "\t" + lvl.score + "\t")

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
    var g = Game.g
    var w = canvas.width
    var h = canvas.height
    g.fillStyle = Game.backGroundColor
    g.lineCap = 'round'
    g.fillRect(0, 0, w, h)
    Game.lvl.val.draw()
    g.fillStyle = Game.backGroundColor
    g.beginPath()
    g.rect(0, h, w, -Game.menuBar)
    g.closePath()
    g.fill()
    g.font = '30pt Verdana'
    g.fillStyle = Game.wallColor
    g.textAlign = 'center'
    if (Game.lvl.prev != null ) {
        g.fillText("<", 20, h - 20)
    }
    if (Game.lvl.next != null ) {
        g.fillText(">", w - 20, h - 20)
    }
    g.fillText("Level " + Game.lvl.val.index, w / 2, h - 20)
    window.requestAnimFrame(tick)
}
function mousePressed(e) {
    Game.mouseDown = true
    if (e.clientY + 2 * Game.menuBar > Game.canvas.height) {
        var x = e.clientX
        var w = Game.canvas.width / 3
        if (x < w) {
            if (Game.lvl.prev != null ) {
                Game.lvl = Game.lvl.prev
            }
        } else if (x > 2 * w) {
            if (Game.lvl.next != null ) {
                Game.lvl = Game.lvl.next
            }
        } else {
            Game.lvl.val.resetLevel()
        }
    } else {
        Game.mouse.set(e.clientX, e.clientY)
        Game.lvl.val.setTarget(Game.mouse)
        Game.mouseDown = true
    }
}
function mouseDragged(e) {
    if (e.clientY + 2 * Game.menuBar > Game.canvas.height) {
        return
    }
    var f = Game.mouse.freeA()
    var n = Game.mouse.set(e.clientX, e.clientY)
    var lvl = Game.lvl.val
    if ( lvl.path == null || lvl.path.transport == null ) {

    }
    
}
function mouseReleased(e) {
    Game.mouseDown = false
}
function resize(e) {
    var w = Game.canvas.width = window.innerWidth
    var h = Game.canvas.height = window.innerHeight
    Game.levels.foreach(function(l) {
        l.resize(w, h)
    })
}
function init() {
    Game.canvas = document.getElementById('canvas')
    Game.g = canvas.getContext("2d")
    Game.canvas.width = window.innerWidth
    Game.canvas.height = window.innerHeight
    // 	Game.canvas.addEventListener("touchstart", mousePressed, false)
    Game.canvas.addEventListener("mousedown", mousePressed, false)
    // 	Game.canvas.addEventListener("touchmove", mouseDragged, false)
    Game.canvas.addEventListener("mousemove", mouseDragged, false)
    // 	Game.canvas.addEventListener("touchend", mouseReleased, false)
    Game.canvas.addEventListener("mouseup", mouseReleased, false)
    // 	Game.canvas.addEventListener("touchcancel", mouseReleased, false)
    $(window).resize(resize)
    // 	$( document ).keypress( keyPress )
    var x = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP")
    x.onreadystatechange = function() {
        if (x.readyState == 4) {
            Game.readLevels(new StringIO(x.responseText.split("\n")))
            document.getElementById('loadingMsg').style.visibility = 'hidden'
            document.getElementById('canvas').style.visibility = 'visible'
            tick()
        }
    }
    x.open("GET", Game.src, true)
    x.send()
}
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 30)
    }
})()
