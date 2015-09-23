var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000  );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight  );
document.body.appendChild( renderer.domElement  );



    var material = new THREE.MeshPhongMaterial( {ambient: 0x000000,
                                                 color: this.color,
                                                 specular: 0x777777,
                                                 shininess: 100,
                                                 shading : THREE.SmoothShading,
                                                 transparent: true
                                                } );
                                                
    //  if we want a lower quality renderer - mainly with canvas renderer
    if( this.renderType == 'light' ){
      var material = new THREE.MeshLambertMaterial( { color: this.color, 
                                                      shading: THREE.FlatShading, 
                                                      overdraw: true } );
    }
    
    // Creats the shape, based on the value and the radius
    var shape = new THREE.Shape();
    var angToMove = (Math.PI*2*(this.val/this.valTotal));
    shape.moveTo(this.position.x,this.position.y);
    shape.arc(this.position.x,this.position.y,pieRadius,this.angPrev,
              this.angPrev+angToMove,false);
    shape.lineTo(this.position.x,this.position.y);
    nextAng = this.angPrev + angToMove;

    var geometry = new THREE.ExtrudeGeometry( shape, this.extrudeOpts );

    this.pieobj = new THREE.Mesh( geometry, material );
    this.pieobj.rotation.set(90,0,0);
                                          
    // Creating the 3D object, positioning it and adding it to the scene
    this.pieobj = new THREE.Mesh( geometry, material );
    this.pieobj.rotation.set(Math.PI/2,0,0);
    // Adds shadows if selected as an option
    if( this.hasShadows ){
      this.pieobj.castShadow = true;
      this.pieobj.receiveShadow = true;
    }
    target.add( this.pieobj );
    
    // If we want to have a label, we add a text object
    if(this.hasLabel){
      
      var percent = Math.round( (this.val/this.valTotal*100) * 10 ) / 10;
      var txt = this.val.toString() + " (" +
                percent.toString() +"%)";
      var curveSeg = 3;
      var material = new THREE.MeshPhongMaterial( { color: this.valcolor, 
                                                    shading: THREE.FlatShading } );
      
      if( this.renderType == 'light' ){
        curveSeg = 1;
        material = new THREE.MeshBasicMaterial( { color: this.valcolor } );
      }
      
      // Create a three.js text geometry
      var geometry = new THREE.TextGeometry( txt, {
        size: this.labelSize,
        height: this.labelHeight,
        curveSegments: curveSeg,
        font: this.labelFont,
        weight: "bold",
        style: "normal",
        bevelEnabled: false
      });
