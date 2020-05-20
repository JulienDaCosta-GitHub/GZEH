var scene, renderer, camera;
var onRenderFcts= [];
var controls;

init2();
animate();

function init2()
{
    renderer = new THREE.WebGLRenderer( {antialias:true} );
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize (width, height);
    document.body.appendChild (renderer.domElement);


    scene = new THREE.Scene();

    

    camera = new THREE.PerspectiveCamera (25, width/height, 0.01, 1000);
    camera.position.y = 2;
    camera.position.z = 30;
    camera.position.x=15;

    /*Rotation dans l'espace*/
    controls = new THREE.OrbitControls (camera, renderer.domElement);
    
    console.log(camera.position.z)
    console.log(camera.position.y)


    /*Control Orbit*/
    controls.addEventListener('cameraChange', (event) => {
        const { position, target } = event.camera;
        // position & target in world space and instanceof THREE.Vector3
    });

// options with default values
    controls.enabled = false; // enable / disable all interactions
    controls.enableDamping = true; // enable / disable smooth transitions
    controls.dampingFactor = 0.2; // smooth transition factor (<= 1). Move (targetState - currentState) * dampingFactor for each `controls.update` call
    controls.dynamicTarget = false; // possible to zoom past the target (will move the target if you are closer than minDistance to the target)
    controls.dollyFactor = 0.98; // zoom factor (when zooming one step the distance to the target will be distance = oldDistance * dollyFactor)


    /*Contrôle du zoom */
    controls.minDistance = 30; // minimum distance to the target (see also dynamicTarget)
    controls.maxDistance = 50; // maximum distance to the target

    /*contrôle de l'orbite sur l'axe "polaire" */
    controls.minPolarAngle = 0; // minium polar angle around the target (radians)
    controls.maxPolarAngle = 1.42; // maximum polar angle around the target (radians)

    /*contrôle de l'orbite sur "l'équateur" */
    controls.minAzimuthAngle = -1; // minimum azimuth angle around the target (radians)
    controls.maxAzimuthAngle = 1; // maximum azimuth angle around the target (radians)

    controls.enableKeyboardNavigation = true; // enable / disable keyboard navigation
    controls.keyboardDollySpeed = 2; // using keyboard ('W' & 'S') will zoom equal to keyboardDollySpeed mouse wheel events
    controls.keyboardPanSpeed = 10; // using keyboard ('A' & 'D') to pan will be equal to keyboardPanSpeed pixels mouse pan
    controls.keyboardSpeedFactor = 3; // speed factor for keyboard navigation (pan & zoom) when 'shift' key is pressed
    controls.firstPersonRotationFactor = 0.4; // rotation speed in first person mode

    controls.pinchPanSpeed = 1; // pinch (touch) pan speed
    controls.pinchEpsilon = 2; // minimum pixels change for pinch (touch & pan) to trigger pinch action
    controls.pointerRotationSpeedPolar = Math.PI / 360; // rotation speed for touch in radians per pixel
    controls.pointerRotationSpeedAzimuth = Math.PI / 360; // rotation speed for touch in radians per pixel

    controls.keyboardRotationSpeedAzimuth = 10 * Math.PI / 360; // rotation speed for keyboard first person mode (arrow-keys).
    controls.keyboardRotationSpeedPolar = 10 * Math.PI / 360; // rotation speed for keyboard first person mode (arrow-keys).

    controls.minZoom = 0; // minimum zoom distance, only available when camera is orthographic
    controls.maxZoom = 1; // maximum zoom distance, only available when camera is orthographic
    controls.orthographicCameraDollyFactor = 0.3; // dolly factor of orthographic camera




    /* Jeu de lumières pour le fond de map */

    scene.fog = new THREE.Fog( 0x000, 0, 100); //Valeurs initiales 0x000, 0, 45
    (function(){
    var light = new THREE.AmbientLight( 0x666666 ) //Valeurs initailes 0x202020
    scene.add( light )

    var light2 = new THREE.DirectionalLight('white', 5)
    light.position.set(0.5, 0.0, 2 ) //Valeurs initiales 0.5, 0.0, 2

    scene.add( light2 )
    })()

    var heightMap = THREEx.Terrain.allocateHeightMap(256,256)
    THREEx.Terrain.simplexHeightMap(heightMap)
    var geometry = THREEx.Terrain.heightMapToPlaneGeometry(heightMap)
    THREEx.Terrain.heightMapToVertexColor(heightMap, geometry)

    /* Materiel appliqué a notre élément mesh */

    var material = new THREE.MeshBasicMaterial({
        wireframe: true
    });
    var mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    mesh.lookAt(new THREE.Vector3(0,1,0));

    /* Taille */

    mesh.scale.y = 8.5;
    mesh.scale.x = 8.5;
    mesh.scale.z = 0.03;
    mesh.scale.multiplyScalar(10);
}


/*Rotation dans l'espace*/
function animate()
{
    controls.update();
    requestAnimationFrame ( animate );
    renderer.render (scene, camera);
}

/*Fonction qui remet la caméra à sa posotion initiale au click du logo */
function initialize() {
  camera.position.y = 2;
  camera.position.z = 30;
  camera.position.x = 15;

}


/*__________________AJOUT DES PYRAMIDES DANS LA SCENE_______*/


/*Style des pyramides (texture, background)*/

var Texture = THREE.ImageUtils.loadTexture( 'images/carelage.jpg' );

var darkMaterial = new THREE.MeshBasicMaterial( {map: Texture} );
var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0, wireframe: true, transparent: true } );
var multiMaterial = [ darkMaterial, wireframeMaterial ];


/*Grandes pyramides */

// pyramid
var shape = THREE.SceneUtils.createMultiMaterialObject(

	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 2, 2, 4, 4 ),
	multiMaterial );
shape.position.set(2, 1, 12);

scene.add( shape );



// pyramid 2
var shape3 = THREE.SceneUtils.createMultiMaterialObject(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 4, 3.5, 4, 4 ),
	multiMaterial );
shape3.position.set(0, 1.7, 0 );
scene.add( shape3 );


// pyramid 3
var shape2 = THREE.SceneUtils.createMultiMaterialObject(
    // radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	
	new THREE.CylinderGeometry( 0, 3.5, 3, 4, 4 ),
    multiMaterial );
shape2.position.set(0, 1.5, -10);
scene.add( shape2 );


/*Petites pyramides */

// pyramid 4
var shape4 = THREE.SceneUtils.createMultiMaterialObject(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 0.5, 0.4, 4, 4 ),

	multiMaterial );
shape4.position.set(3, 0.29, 17);
scene.add( shape4 );

// pyramid 5
var shape5 = THREE.SceneUtils.createMultiMaterialObject(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 0.5, 0.4, 4, 4 ),
	multiMaterial );
shape5.position.set(5, 0.29, 15);
scene.add( shape5 );

// pyramid 6
var shape6 = THREE.SceneUtils.createMultiMaterialObject(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 0.5, 0.4, 4, 4 ),
	multiMaterial );
shape6.position.set(4, 0.29, 16);
scene.add( shape6 );


//_________________________________________________________Affichage Loader

function showContent() {
    document.querySelector('.loader-container').classList.add('hidden');
    }
    setTimeout(showContent,3000)
    
//_________________________________________________________Affichage Mode Exploration et Découverte 

///EXPLORATION



  document.getElementById('unlock').addEventListener ("click",function(){
    new THREE.Vector3(controls.enabled=true);
    document.querySelector('.content').classList.add('hidden');
    }
  );

  // DISCOVERY 


  document.getElementById('lock').addEventListener ("click",function(){
    new THREE.Vector3(controls.enabled=false);
    camera.position.y = 2;
    camera.position.z = 30;
    camera.position.x = 15;
    document.querySelector('.content').classList.remove('hidden');
    }
  );
