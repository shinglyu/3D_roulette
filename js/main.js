Physijs.scripts.worker = 'bower_components/physijs/physijs_worker.js'
//Physijs.scripts.ammo = '../../bower_components/ammo.js/builds/ammo.js'
Physijs.scripts.ammo = 'examples/js/ammo.js'

var maxDartsCount = 20;
var cameraPosition = [-3, 20, 80]
//var cameraPosition = [-50, 20, 0]
var firstHit = true;

var scene, camera, renderer;//FIXME: don't use global

function initScene(){
  scene = new Physijs.Scene();

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000  ); // ambient light
  //camera.position.set(-3,20,80);
  camera.position.set(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
  camera.lookAt(new THREE.Vector3(0,0,0)); //TODO: extract this

  renderer = new THREE.WebGLRenderer();
  renderer.shadowMapEnabled = true;
  renderer.setSize( window.innerWidth, window.innerHeight  );
  document.body.appendChild( renderer.domElement  );

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
  scene.add( dir_light  );

}

function prepareStage(){
  /*
  var table_material = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/wood.jpg'  ), ambient: 0xFFFFFF  }),
    .9, // high friction
    .2 // low restitution
  );
  */
  var table_material = new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture( 'images/wood.jpg'  ), ambient: 0xFFFFFF  });
  table_material.map.wrapS = table_material.map.wrapT = THREE.RepeatWrapping;
  table_material.map.repeat.set( 5, 5  );
  var ground = new Physijs.BoxMesh(
    new THREE.BoxGeometry(300, 1, 60),
    table_material,
    0 // mass
  );
  ground.position.set(0,-25,20);
  ground.receiveShadow = true;
  scene.add( ground  );

  var backboard = new Physijs.BoxMesh(
    new THREE.BoxGeometry(300, 1, 150),
    table_material,
    0 // mass
  );
  backboard.position.set(0,30,-5);
  backboard.rotation.set(0.5 * Math.PI, 0, 0);
  backboard.receiveShadow = true;
  scene.add( backboard);
}


function getColor(i, total){
  var h = i/total;
  //console.log("hsl(" + h + ", 70%, 50%)")
  //return (new THREE.Color("hsl(" + h + ", 70%, 50%)"));
  return (new THREE.Color("rgb("+ h*255+",100,0)" ))
}

function boundToHinge(obj){
    var constraint = new Physijs.HingeConstraint(
      obj, // First object to be constrained
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

function drawPie(angFrom, angDelta, color, text){
  var pieMaterial =  new THREE.MeshPhongMaterial( { 
    color: color,
    //emissive: 0x426600,
    specular: 0xa0a0a0,
    shininess: 20,
    reflectivity: 30,
    //shading: THREE.SmoothShading
    //wireframe: true
    //metal: true
  }  ) ;
  var pieGeometry = new THREE.CylinderGeometry( 30, 30, 15, 32, 3, false, 0, angDelta);
  pieobj = new Physijs.ConvexMesh( pieGeometry, pieMaterial );
  pieobj.rotateOnAxis( new THREE.Vector3(1, 0, 0), 0.5*Math.PI )
  pieobj.rotateOnAxis( new THREE.Vector3(0, 1, 0), angFrom )
  pieobj.position.set(0, 10, 5)
  pieobj.castShadow = true;
  pieobj.receiveShadow = true;

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

  var textGeometry = new THREE.TextGeometry( text, {
    size: 5,
    height: 1,
  });
  text = new Physijs.BoxMesh( textGeometry, textMaterial );
  text.rotateOnAxis( new THREE.Vector3(1, 0, 0), -0.5*Math.PI );
  text.rotateOnAxis( new THREE.Vector3(0, 0, 1), -0.2*Math.PI );
  text.position.set( 5, 8, 5 );
  text.castShadow = true;
  text.receiveShadow = true;

  pieobj.add(text);
  return pieobj;
}


function prepareRoulette(texts){

  var slicesCount = 3.0;
  var angDelta = (Math.PI*2.0*1.0/slicesCount);
  var pies = []
  texts = ["Mozilla", "Firefox", "Rocks"]
  //TODO: repeat the options, calculate slicesCount based on texts
  for (var i = 0; i < slicesCount; i++){
    var pie = drawPie(angDelta * i, angDelta, getColor(i,slicesCount), texts[i])
    pies.push(pie)
    scene.add(pie)

    boundToHinge(pie);

    pie.setAngularVelocity({x: 0, y: 0, z: 20}); //TODO: move this to main
    //constraint.enableAngularMotor({velocity:20, acceleration:999});
    //constraint.enableAngularMotor(true, 10, 999);
  }
}

function handleDartHit(other_obj, rel_velocity, rel_rotation){
  //other_obj.setAngularVelocity({x:0, y:0, z:0})
  if (!firstHit){ return }
  winnerPie = other_obj;
  other_obj.material.emissive.setHex(0x808080)

  var damperMaterial =  Physijs.createMaterial (

    new THREE.MeshPhongMaterial( { 
      color: 0xffffff,
      transparent: true,
      opacity: 0.1 //For Debug
    }  ) ,
    //.4, //friction
    .8, //friction
    .8 // restitution (bouncy-ness)
  )
  var damperGeometry = new THREE.CylinderGeometry( 30, 30, 4.9, 10, 10, false);
  var damper = new Physijs.CylinderMesh(damperGeometry, damperMaterial)
  damper.rotateOnAxis( new THREE.Vector3(1, 0, 0), -0.5*Math.PI )
  damper.position.set(0, 10, 1.5)

  scene.add(damper)

  boundToHinge(damper)
  firstHit = false;
  //constraint.enableAngularMotor(true, -1000, 999999999)
}

function prepareDart(){

  var dartsQueue = []
  window.addEventListener('click', function(e){
    var material = new THREE.MeshPhongMaterial( { 
      color: 0xff0000,
    } );
    var geometry = new THREE.SphereGeometry( 2, 32, 32  );
    var dart = new Physijs.SphereMesh( geometry, material );
    dart.position.set(20,0,60)
    dart.castShadow = true;
    //dart.receiveShadow = true; //save some computation

    scene.add( dart );

    dart.setLinearVelocity({x: 0, y: 30, z: -80});
    dart.addEventListener('collision', handleDartHit);

    dartsQueue.push(dart)

    while (dartsQueue.length > maxDartsCount){
      oldDart = dartsQueue.shift()
      scene.remove(oldDart)
    }
  })
}

//var flag = false;
var winnerPie = undefined;
var render = function () {
  requestAnimationFrame( render  );

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

initScene(); //TODO: move me to the end
prepareStage();
prepareRoulette();
prepareDart();
render();
