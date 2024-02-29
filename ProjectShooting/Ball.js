AFRAME.registerComponent("balls",{
    init:function(){
        this.clickToShoot()
        this.removeball()
    },
    clickToShoot:function(){
        window.addEventListener("keydown",e=>{
            if (e.key === "e") {
                console.log("key is pressed")
                var ball = document.createElement("a-entity")
                ball.setAttribute("geometry",{primitive: "sphere", radius: 0.2})
                ball.setAttribute("material", "color", "black")
                var cam = document.querySelector("#camera");
  
                pos = cam.getAttribute("position");
        
              ball.setAttribute("position", {
                  x: pos.x,
                  y: pos.y,
                  z: pos.z,
                });


                var camera = document.querySelector("#camera").object3D;
                var direction = new THREE.Vector3();
                camera.getWorldDirection(direction);
                ball.setAttribute("velocity", direction.multiplyScalar(-10));
                var scene = document.querySelector("#scene");
                scene.appendChild(ball);
            }
            
        });
      },
      removeball: function (e) {

        console.log(e.detail.target.el);
    
        console.log(e.detail.body.el);
    
     
        var element = e.detail.target.el;
    
      
        var elementHit = e.detail.body.el;
    
        if (elementHit.id.includes("box")) {
          elementHit.setAttribute("material", {
            opacity: 0.5,
            transparent: true,
          });
    

          var impulse = new CANNON.Vec3(-2, 2, 1);
          var worldPoint = new CANNON.Vec3().copy(
            elementHit.getAttribute("position")
          );
    
          elementHit.body.applyImpulse(impulse, worldPoint);
    

          element.removeEventListener("collide", this.shoot);
          var scene = document.querySelector("#scene");
          scene.removeChild(element);
        }
      },
    });
    