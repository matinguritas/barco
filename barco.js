class Barco{
    constructor(x, y, width, height, barcopos){
        var options = {
            restitution: 0.8,
            friction: 1.0,
            density: 1.0,

    }
    this.animation = boatanimation;
    this.body = Bodies.rectangle(x, y, width, height, options)
    this.width = width
    this.height = height
    this.barcoPosition = barcopos
    this.image = loadImage('assets/boat.png')
    World.add(world, this.body)
}
animate(){
    this.speed += 0.05 % 1.1;
}

display(){
    var angle = this.body.angle;
    var pos = this.body.position;
    
    var index = floor(this.speed % this.animation.length);


    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, this.barcoPosition, this.width, this.height);
    noTint()
    pop();

}
}