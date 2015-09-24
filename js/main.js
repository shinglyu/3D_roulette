Physijs.scripts.worker = 'bower_components/physijs/physijs_worker.js'
Physijs.scripts.ammo = '../../bower_components/ammo.js/builds/ammo.js'

//var scene = new THREE.Scene();
var scene = new Physijs.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000  );
var ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add( ambientLight);

/*
var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5  );

directionalLight.position.set( 0, 0, 30  );
scene.add( directionalLight  );
*/
var pointLight = new THREE.PointLight( 0xffffff, 1, 100  );

pointLight.position.set( 30, 0, 50  );
scene.add( pointLight  );
/*
var directionalLight = new THREE.DirectionalLight( 0xffff00, 0.5  );

directionalLight.position.set( 0, 1, 30  );
scene.add( directionalLight  );
*/

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight  );
document.body.appendChild( renderer.domElement  );

var ground = new Physijs.BoxMesh(
  new THREE.BoxGeometry(100, 1, 100),
  new THREE.MeshPhongMaterial( { color: 0x404040, specular: 0x009900, shininess: 30, shading: THREE.FlatShading  }  ),
  0 // mass

);
ground.receiveShadow = true;
ground.position.set(0,-30,0);
//ground.rotation.set(0,-20,-10);
scene.add( ground  );

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
    amount: 10, 
    //bevelEnabled: true, 
    bevelEnabled: false, 
    /*
    bevelSegments: 2, 
    steps: 2, 
    bevelSize: 1, 
    bevelThickness: 1  
    */
  };
  var geometry = new THREE.ExtrudeGeometry( shape, extrudeOpts );
  //var geometry = new THREE.ShapeGeometry( shape );

  // Creating the 3D object, positioning it and adding it to the scene
  //pieobj = new THREE.Mesh( geometry, material );
  pieobj = new Physijs.BoxMesh( geometry, material );
  pieobj.rotation.set(0,0,angFrom);
  // Adds shadows if selected as an option
  if( this.hasShadows ){
    pieobj.castShadow = true;
    pieobj.receiveShadow = true;
  }
  return pieobj

}

var slicesCount = 3.0;
//console.log(1.0/slicesCount)
var angDelta = (Math.PI*2.0*1.0/slicesCount);
var pies = []
for (var i = 0; i < slicesCount; i++){
  //console.log(getColor(i, slicesCount))
  var pie = drawPie(angDelta * i, angDelta, getColor(i,slicesCount))
  pies.push(pie)
  scene.add(pie)
  
}
//scene.add( pieobj );
    
//var cube = new THREE.Mesh( geometry, material  );
//scene.add( cube  );

//camera.position.z = 25;
camera.position.set(0,30,60);
//camera.up = new THREE.Vector3(0,0,0);
camera.lookAt(new THREE.Vector3(0,1,-1));

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
