Physijs.scripts.worker = 'bower_components/physijs/physijs_worker.js'
//Physijs.scripts.ammo = '../../bower_components/ammo.js/builds/ammo.js'
Physijs.scripts.ammo = 'examples/js/ammo.js'

var maxDartsCount = 20;

//var scene = new THREE.Scene();
var scene = new Physijs.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000  ); // ambient light
am_light = new THREE.AmbientLight( 0x444444  );
scene.add( am_light  );

// directional light
dir_light = new THREE.DirectionalLight( 0xffffff);
dir_light.position.set( 20, 30, 20  );
dir_light.target.position.copy( scene.position  );
dir_light.castShadow = true;
dir_light.shadowCameraLeft = -80;
dir_light.shadowCameraTop = -80;
dir_light.shadowCameraRight = 80;
dir_light.shadowCameraBottom = 50;
dir_light.shadowCameraNear = -100;
dir_light.shadowCameraFar = 100;
dir_light.shadowBias = -.001
dir_light.shadowMapWidth = dir_light.shadowMapHeight = 2048;
dir_light.shadowDarkness = .5;
/*
*/
scene.add( dir_light  );
//var ambientLight = new THREE.AmbientLight( 0xffffff );
//scene.add( ambientLight);

/*
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5  );

directionalLight.position.set( 0, 0, 30  );
scene.add( directionalLight  );
*/
/*
var pointLight = new THREE.PointLight( 0xffffff, 1, 100  );

pointLight.position.set( 30, 0, 50  );
scene.add( pointLight  );
*/
/*
var directionalLight = new THREE.DirectionalLight( 0xffff00, 0.5  );

directionalLight.position.set( 0, 1, 30  );
scene.add( directionalLight  );
*/

var renderer = new THREE.WebGLRenderer();
renderer.shadowMapEnabled = true;
renderer.setSize( window.innerWidth, window.innerHeight  );
document.body.appendChild( renderer.domElement  );

var table_material = Physijs.createMaterial(
  new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/wood.jpg'  ), ambient: 0xFFFFFF  }),
  .9, // high friction
  .2 // low restitution

);
table_material.map.wrapS = table_material.map.wrapT = THREE.RepeatWrapping;
table_material.map.repeat.set( 5, 5  );
var ground = new Physijs.BoxMesh(
  new THREE.BoxGeometry(250, 1, 60),
  //new THREE.MeshPhongMaterial( { color: 0x404040, specular: 0x009900, shininess: 30, shading: THREE.FlatShading  }  ),
  //new THREE.MeshLambertMaterial( { color: 0x404040}  ),
  table_material,
  0 // mass

);
ground.receiveShadow = true;
ground.position.set(0,-25,20);
//ground.rotation.set(0,-20,-10);
scene.add( ground  );

var backboard = new Physijs.BoxMesh(
  new THREE.BoxGeometry(300, 1, 150),
  //new THREE.MeshPhongMaterial( { color: 0x404040, specular: 0x009900, shininess: 30, shading: THREE.FlatShading  }  ),
  //new THREE.MeshLambertMaterial( { color: 0x404040}  ),
  table_material,
  0 // mass

);
backboard.receiveShadow = true;
backboard.position.set(0,30,-5);
backboard.rotation.set(0.5 * Math.PI, 0, 0);
backboard.receiveShadow = true;
scene.add( backboard);

//var geometry = new THREE.BoxGeometry( 1, 1, 1  );
//var material = new THREE.MeshBasicMaterial( { color: 0x00ff00  }  );

function getColor(i, total){
  var h = i/total;
  //console.log("hsl(" + h + ", 70%, 50%)")
  //return (new THREE.Color("hsl(" + h + ", 70%, 50%)"));
  return (new THREE.Color("rgb("+ h*255+",100,0)" ))
}

function drawPie(angFrom, angDelta, color, text){
  //console.log(color)
  var material =  new THREE.MeshPhongMaterial( { 
    color: color,
    //emissive: 0x426600,
    specular: 0xa0a0a0,
    shininess: 20,
    reflectivity: 30,
    //shading: THREE.SmoothShading
    //wireframe: true
    //metal: true
  }  ) 
  var textMaterial =  new THREE.MeshPhongMaterial( { 
    color: 0xffffff,
    //emissive: 0x426600,
    specular: 0xa0a0a0,
    shininess: 20,
    reflectivity: 30,
    //shading: THREE.SmoothShading
    //wireframe: true
    //metal: true
  }  ) 
  //material.metal = true;

  /*
  var shape = new THREE.Shape();
  //var angToMove = (Math.PI*2*(this.val/this.valTotal));
  //shape.moveTo(this.position.x,this.position.y);
  var x = 0;
  var y = 0;
  var pieRadius=20;
  //var angPrev=0;
  //var angToMove=1;
  shape.moveTo(x,y);
  shape.lineTo(pieRadius,y);
  //console.log(angFrom + " to " + (angFrom + angDelta))
  //shape.absarc(x,y,pieRadius,angFrom,
  //          angFrom+angDelta,false);
  shape.absarc(x,y,pieRadius,0,
            angDelta,true);
  shape.lineTo(x,y);
  //shape.moveTo(pieRadius,y);
  //nextAng = this.angPrev + angToMove;

  var extrudeOpts = { 
    amount: 2, 
    //bevelEnabled: true, 
    bevelEnabled: false, 
    bevelSegments: 2, 
    steps: 2, 
    bevelSize: 1, 
    bevelThickness: 1  
  };
  */
  //var geometry = new THREE.ExtrudeGeometry( shape, extrudeOpts );
  var geometry = new THREE.CylinderGeometry( 30, 30, 15, 32, 3, false, 0, angDelta);
  var textGeometry = new THREE.TextGeometry( text, {
    size: 5,
    height: 1,
  });
  /*
  var mesh = new THREE.Object3D()
  //var mesh = new Physijs.ConvexMesh(geometry)

  mesh.add( new THREE.Line(geometry, 
    new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5
    })
  ) );

  mesh.add( new THREE.Mesh(
    geometry,
    new THREE.MeshPhongMaterial({
      color: 0x156289,
      emissive: 0x072534,
      side: THREE.DoubleSide,
      shading: THREE.FlatShading
    })
  ) );


  pieobj = mesh;
  */
  //var geometry = new THREE.CylinderGeometry( 20, 20, 5, 32, 32, false, 0, 2*Math.PI);
  //var geometry = new THREE.ShapeGeometry( shape );

  // Creating the 3D object, positioning it and adding it to the scene
  //pieobj = new THREE.Mesh( geometry, material );
  //pieobj = new Physijs.BoxMesh( geometry, material );
  //pieobj = new Physijs.CylinderMesh( geometry, material );
  //pieobj = new Physijs.ConcaveMesh( geometry, material );
  text = new Physijs.BoxMesh( textGeometry, textMaterial );
  text.castShadow = true;
  text.rotateOnAxis( new THREE.Vector3(1, 0, 0), -0.5*Math.PI )
  text.rotateOnAxis( new THREE.Vector3(0, 0, 1), -0.2*Math.PI )
  text.position.set( 5, 8, 5 )
  pieobj = new Physijs.ConvexMesh( geometry, material );
  pieobj.add(text)
  //pieobj.rotation.set(0.5*Math.PI,angFrom,0);
  //pieobj.rotation.set(0.5*Math.PI,angFrom,0);
  pieobj.position.set(0, 10, 5)
  pieobj.rotateOnAxis( new THREE.Vector3(1, 0, 0), 0.5*Math.PI )
  pieobj.rotateOnAxis( new THREE.Vector3(0, 1, 0), angFrom )
  //pieobj.rotateOnAxis( new THREE.Vector3(0, 0, 1), 0.1)
  //pieobj.__dirtyRotation = true;
  // Adds shadows if selected as an option
  pieobj.castShadow = true;
  pieobj.receiveShadow = true;
  //mesh.setCcdMotionThreshold(1);

  // Set the radius of the embedded sphere such that it is smaller than the object
  // mesh.setCcdSweptSphereRadius(0.2);
  return pieobj

}

var slicesCount = 3.0;
//console.log(1.0/slicesCount)
var angDelta = (Math.PI*2.0*1.0/slicesCount);
//var roulette = new Physijs.CylinderMesh(new THREE.CylinderGeometry( 30, 30, 1, 10, 10, false));//TODO: extract these parameters
//roulette.rotateOnAxis( new THREE.Vector3(1, 0, 0), 0.5*Math.PI )
//roulette.position.set(0, 10, 5)
var pies = []
texts = ["Mozilla", "Firefox", "Rocks"]
//TODO: repeat the options, calculate slicesCount based on texts
for (var i = 0; i < slicesCount; i++){
  //console.log(getColor(i, slicesCount))
  var pie = drawPie(angDelta * i, angDelta, getColor(i,slicesCount), texts[i])
  //roulette.add(pie)
  pies.push(pie)
  scene.add(pie)
  var constraint = new Physijs.HingeConstraint(
  //var constraint = new Physijs.PointConstraint(
    pie, // First object to be constrained
    new THREE.Vector3( 0, 10, 0  ), // point in the scene to apply the constraint
    new THREE.Vector3( 0, 1, 0  ) // Axis along which the hinge lies - in this case it is the X axis
  );
  scene.addConstraint( constraint  );
  constraint.setLimits({
    low: 0, // minimum angle of motion, in radians
    high: 1000, // maximum angle of motion, in radians
    bias_factor: 0.3, // applied as a factor to constraint error
    relaxation_factor: 1.0 // controls bounce at limit (0.0 == no bounce)
  }
                      );
  pie.setAngularVelocity({x: 0, y: 0, z: 20});
  //constraint.enableAngularMotor({velocity:20, acceleration:999});
  //constraint.enableAngularMotor(true, 10, 999);
  
}
//scene.add(roulette)
/*
var constraint = new Physijs.HingeConstraint(
//var constraint = new Physijs.PointConstraint(
  roulette, // First object to be constrained
  new THREE.Vector3( 0, 10, 0  ), // point in the scene to apply the constraint
  new THREE.Vector3( 0, 1, 0  ) // Axis along which the hinge lies - in this case it is the X axis
);
scene.addConstraint( constraint  );
*/
//roulette.setAngularVelocity({x: 0, y: 0, z: 10});
/*
constraint.setLimits({
  low: 0, // minimum angle of motion, in radians
  high: 1000, // maximum angle of motion, in radians
  bias_factor: 0.3, // applied as a factor to constraint error
  relaxation_factor: 1.0 // controls bounce at limit (0.0 == no bounce)
}
);
*/
//NOT working//constraint.enableAngularMotor({velocity:20, acceleration:2});
//constraint.disableMotor();
//scene.add( pieobj );
    
//var cube = new THREE.Mesh( geometry, material  );
//scene.add( cube  );

//camera.position.z = 25;
camera.position.set(-3,20,80);
//camera.position.set(-80,20,0);
//camera.up = new THREE.Vector3(0,0,0);
//camera.lookAt(new THREE.Vector3(30,30,0));
camera.lookAt(new THREE.Vector3(0,0,0));

var firstHit = true;
var dartsQueue = []
window.addEventListener('click', function(e){
  var geometry = new THREE.SphereGeometry( 2, 32, 32  );
  var material = new THREE.MeshPhongMaterial( { 
    color: 0xff0000,
  } );
  //var material = new THREE.PhonMaterial( {color: 0xffff00}  );
  var dart = new Physijs.SphereMesh( geometry, material );
  //var sphere = new THREE.Mesh( geometry, material  );
  dart.position.set(20,0,80)
  scene.add( dart );
  dartsQueue.push(dart)
  while (dartsQueue.length > maxDartsCount){
    oldDart = dartsQueue.shift()
    scene.remove(oldDart)
  }

  dart.castShadow = true;
  dart.receiveShadow = true;
  //dart.setLinearVelocity(new THREE.Vector3(0,10,1))
  dart.setLinearVelocity({x: -10, y: 20, z: -80});
  dart.addEventListener('collision', function(other_obj, rel_velocity, rel_rotation){
    //console.log(other_obj)
    //other_obj.setAngularVelocity(0,0,0)
    other_obj.setAngularVelocity({x:0, y:0, z:0})
    //console.log(other_obj.mass)
    if (firstHit){
      other_obj.material.emissive.setHex(0x808080)
      winnerPie = other_obj;
      //other_obj.mass = 
      var damperGeometry = new THREE.CylinderGeometry( 30, 30, 4.7, 10, 10, false);
      var damperMaterial =  Physijs.createMaterial (
        
      new THREE.MeshPhongMaterial( { 
        color: 0xffffff,
        transparent: true,
        opacity: 0.1 //For Debug
      }  ) ,
      .3, //friction
      .8 // restitution (bouncy-ness)
      )
      var damper = new Physijs.CylinderMesh(damperGeometry, damperMaterial)
      damper.rotateOnAxis( new THREE.Vector3(1, 0, 0), -0.5*Math.PI )
      damper.position.set(0, 10, 1.5)
      scene.add(damper)
      var constraint = new Physijs.HingeConstraint(
      //var constraint = new Physijs.PointConstraint(
        damper, // First object to be constrained
        new THREE.Vector3( 0, 10, 0  ), // point in the scene to apply the constraint
        new THREE.Vector3( 0, 1, 0  ) // Axis along which the hinge lies - in this case it is the X axis
      );
      scene.addConstraint( constraint  );
      constraint.setLimits({
        low: 0, // minimum angle of motion, in radians
        high: 1000, // maximum angle of motion, in radians
        bias_factor: 0.3, // applied as a factor to constraint error
        relaxation_factor: 1.0 // controls bounce at limit (0.0 == no bounce)
      }
                      );
    }
    firstHit = false;
    //constraint.enableAngularMotor(true, -1000, 999999999)


    //var spotLight = new THREE.SpotLight( 0xffffff  );
    //spotLight.position.set( 10, 10, 10  );

      //spotLight.castShadow = true;

    //spotLight.shadowMapWidth = 1024;
    //spotLight.shadowMapHeight = 1024;

    //spotLight.shadowCameraNear = 500;
    //spotLight.shadowCameraFar = 4000;
    //spotLight.shadowCameraFov = 30;

    //scene.add( spotLight  );
    //other_obj.setLinearVelocity(0,0,0)
    //other_obj.material.color.setHex(0xffffff);
    //alert(other_obj)
    /*
    var constraint = new Physijs.PointConstraint(
      dart, // First object to be constrained
      other_obj, // OPTIONAL second object - if omitted then physijs_mesh_1 will be constrained to the scene
      //contact_normal
      new THREE.Vector3( 0, 0, 0  ) // point in the scene to apply the constraint
    );
    scene.addConstraint( constraint  );
    */
    //)
    /*
    var constraint = new Physijs.HingeConstraint(
    //var constraint = new Physijs.PointConstraint(
      dart, // First object to be constrained
      new THREE.Vector3( 0, 10, 0  ), // point in the scene to apply the constraint
      new THREE.Vector3( 0, 0, 1  ) // Axis along which the hinge lies - in this case it is the X axis
    );
    scene.addConstraint( constraint  );
    constraint.setLimits({
      low: 0, // minimum angle of motion, in radians
      high: 1000, // maximum angle of motion, in radians
      bias_factor: 0.3, // applied as a factor to constraint error
      relaxation_factor: 1.0 // controls bounce at limit (0.0 == no bounce)
    }
    );
    */
  })
  
})

//var flag = false;
var winnerPie = undefined;
var render = function () {
  requestAnimationFrame( render  );

  //pieobj.rotation.x += 0.01;
  //pieobj.rotation.y += 0.05;
  //
  //console.log(flag)
  //pies.map(function(pie){
    //pie.rotation.z += 0.01;
    /*
    if (flag){
      pie.rotation.y += 0.1;
    }
    else {
      pie.rotation.y -= 0.1;
    }
    */
  //})
  //flag = !(flag)
  //pieobj.rotation.z += 0.01;
  if (typeof winnerPie !== "undefined") {
    if ((new Date()).getSeconds() % 2 == 0){
      winnerPie.material.emissive.setHex(0x808080)
    }
    else {
      winnerPie.material.emissive.setHex(0x000000)
    }
    
  }

  scene.simulate()
  renderer.render(scene, camera);
};

render();
