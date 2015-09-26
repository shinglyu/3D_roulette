Physijs.scripts.worker = 'bower_components/physijs/physijs_worker.js'
Physijs.scripts.ammo = '../../bower_components/ammo.js/builds/ammo.js'

//var scene = new THREE.Scene();
var scene = new Physijs.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000  ); // ambient light
am_light = new THREE.AmbientLight( 0x444444  );
scene.add( am_light  );

// directional light
dir_light = new THREE.DirectionalLight( 0xffffff);
dir_light.position.set( 20, 30, 10  );
dir_light.target.position.copy( scene.position  );
dir_light.castShadow = true;
dir_light.shadowCameraLeft = -30;
dir_light.shadowCameraTop = -30;
dir_light.shadowCameraRight = 30;
dir_light.shadowCameraBottom = 30;
dir_light.shadowCameraNear = 20;
dir_light.shadowCameraFar = 200;
dir_light.shadowBias = -.001
dir_light.shadowMapWidth = dir_light.shadowMapHeight = 2048;
dir_light.shadowDarkness = .5;
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
  new THREE.BoxGeometry(300, 1, 100),
  //new THREE.MeshPhongMaterial( { color: 0x404040, specular: 0x009900, shininess: 30, shading: THREE.FlatShading  }  ),
  //new THREE.MeshLambertMaterial( { color: 0x404040}  ),
  table_material,
  0 // mass

);
ground.receiveShadow = true;
ground.position.set(0,-30,0);
//ground.rotation.set(0,-20,-10);
scene.add( ground  );

var backboard = new Physijs.BoxMesh(
  new THREE.BoxGeometry(100, 1, 100),
  //new THREE.MeshPhongMaterial( { color: 0x404040, specular: 0x009900, shininess: 30, shading: THREE.FlatShading  }  ),
  //new THREE.MeshLambertMaterial( { color: 0x404040}  ),
  table_material,
  0 // mass

);
backboard.receiveShadow = true;
backboard.position.set(0,0,-5);
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

function drawPie(angFrom, angDelta, color){
  //console.log(color)
  var material =  new THREE.MeshPhongMaterial( { color: color, specular: 0x009900, shininess: 30, shading: THREE.FlatShading  }  ) 

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
    /*
    bevelSegments: 2, 
    steps: 2, 
    bevelSize: 1, 
    bevelThickness: 1  
    */
  };
  //var geometry = new THREE.ExtrudeGeometry( shape, extrudeOpts );
  var geometry = new THREE.CylinderGeometry( 30, 30, 5, 10, 10, false, 0, angDelta);
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
  pieobj = new Physijs.ConcaveMesh( geometry, material );
  //pieobj = new Physijs.ConvexMesh( geometry, material );
  //pieobj.rotation.set(0.5*Math.PI,angFrom,0);
  //pieobj.rotation.set(0.5*Math.PI,angFrom,0);
  //pieobj.rotateOnAxis( new THREE.Vector3(1, 0, 0), 0.5*Math.PI )
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
var roulette = new Physijs.CylinderMesh(new THREE.CylinderGeometry( 30, 30, 3, 10, 10, false));//TODO: extract these parameters
roulette.rotateOnAxis( new THREE.Vector3(1, 0, 0), 0.5*Math.PI )
roulette.position.set(0, 10, 0)
var pies = []
for (var i = 0; i < slicesCount; i++){
  //console.log(getColor(i, slicesCount))
  var pie = drawPie(angDelta * i, angDelta, getColor(i,slicesCount))
  roulette.add(pie)
  //pies.push(pie)
  //scene.add(pie)
  
}
scene.add(roulette)
roulette.setAngularVelocity({x: 0, y: 0, z: 20})
//scene.add( pieobj );
    
//var cube = new THREE.Mesh( geometry, material  );
//scene.add( cube  );

//camera.position.z = 25;
camera.position.set(0,20,80);
//camera.up = new THREE.Vector3(0,0,0);
//camera.lookAt(new THREE.Vector3(30,30,0));
camera.lookAt(new THREE.Vector3(0,0,0));

window.addEventListener('click', function(e){
  var geometry = new THREE.SphereGeometry( 1, 32, 32  );
  var material = new THREE.MeshPhongMaterial( { color: 0xff0000} );
  //var material = new THREE.PhonMaterial( {color: 0xffff00}  );
  var dart = new Physijs.SphereMesh( geometry, material );
  //var sphere = new THREE.Mesh( geometry, material  );
  dart.castShadow = true;
  dart.receiveShadow = true;
  dart.position.set(20,0,80)
  scene.add( dart );
  //dart.setLinearVelocity(new THREE.Vector3(0,10,1))
  dart.setLinearVelocity({x: -10, y: 20, z: -50});
  
})

var flag = false;
var render = function () {
  requestAnimationFrame( render  );

  //pieobj.rotation.x += 0.01;
  //pieobj.rotation.y += 0.05;
  //
  //console.log(flag)
  pies.map(function(pie){
    //pie.rotation.z += 0.01;
    /*
    if (flag){
      pie.rotation.y += 0.1;
    }
    else {
      pie.rotation.y -= 0.1;
    }
    */
  })
  flag = !(flag)
  //pieobj.rotation.z += 0.01;

  scene.simulate()
  renderer.render(scene, camera);
};

render();
