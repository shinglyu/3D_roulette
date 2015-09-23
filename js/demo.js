
      var scene = new THREE.Scene();
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000  );
      var directionalLight = new THREE.DirectionalLight( 0xff00ff, 0.5  );

      directionalLight.position.set( 1, 1, 1  );
      scene.add( directionalLight  );
      var directionalLight = new THREE.DirectionalLight( 0xffff00, 0.5  );

      directionalLight.position.set( 1, 0, 1  );
      scene.add( directionalLight  );

      var renderer = new THREE.WebGLRenderer();
      renderer.setSize( window.innerWidth, window.innerHeight  );
      document.body.appendChild( renderer.domElement  );

      var geometry = new THREE.BoxGeometry( 1, 1, 1  );
      //var material = new THREE.MeshBasicMaterial( { color: 0x00ff00  }  );
      var material =  new THREE.MeshPhongMaterial( { color: 0x00dddd, specular: 0x009900, shininess: 30, shading: THREE.FlatShading  }  ) 
      var cube = new THREE.Mesh( geometry, material  );
      scene.add( cube  );

      camera.position.z = 5;

      var render = function () {
        requestAnimationFrame( render  );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.05;

        renderer.render(scene, camera);
      };

      render();
