/*_________________*/
var renderer	= new THREE.WebGLRenderer({
	antialias	: true
});

renderer.setSize( window.innerWidth, window.innerHeight );


document.body.appendChild( renderer.domElement );
var onRenderFcts= [];
var scene	= new THREE.Scene();
var camera	= new THREE.PerspectiveCamera(25, window.innerWidth /    window.innerHeight, 0.01, 1000);


camera.position.z = 15; /*Valeur initiale 15 */
camera.position.y = 2; /*Valeur initiale 2 */



/* Jeu de lumières pour le fond de map */

scene.fog = new THREE.Fog(0x000, 0, 45);
;(function(){
	var light = new THREE.AmbientLight( 0x202020 )
	scene.add( light )
	var light = new THREE.DirectionalLight('white', 5)
	light.position.set(0.5, 0.0, 2)
	scene.add( light )
	var light = new THREE.DirectionalLight('white', 0.75*2)
	light.position.set(-0.5, -0.5, -2)
	scene.add( light )		
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
mesh.scale.x = 10.8;
mesh.scale.z = 0.08;
mesh.scale.multiplyScalar(10);

/* Tourner la caméra si souhaité */

onRenderFcts.push(function(delta, now){
	mesh.rotation.z += 0.0 * delta;
})
onRenderFcts.push(function(){
	renderer.render( scene, camera );		
})
var lastTimeMsec= null
requestAnimationFrame(function animate(nowMsec){
	requestAnimationFrame( animate );
	lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
	var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
	lastTimeMsec	= nowMsec
	onRenderFcts.forEach(function(onRenderFct){
		onRenderFct(deltaMsec/1000, nowMsec/1000)
	})
});








/*Style des pyramides (texture, background)*/

var Texture = THREE.ImageUtils.loadTexture( 'images/carelage.jpg' );

var darkMaterial = new THREE.MeshBasicMaterial( {map: Texture} );
var wireframeMaterial = new THREE.MeshBasicMaterial( { color: 0, wireframe: true, transparent: true } );
var multiMaterial = [ darkMaterial, wireframeMaterial ];

/*
var shape = THREE.SceneUtils.createMultiMaterialObject(new THREE.TetrahedronGeometry( 1, 0 ), multiMaterial );
shape.position.set(2, 1, 1);
scene.add( shape );

 */
/*Grandes pyramides */

// pyramid
var shape = THREE.SceneUtils.createMultiMaterialObject(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 1.8, 2.2, 4, 4 ),
	multiMaterial );
	renderer.domElement.id='shape';
shape.position.set(-1, 1.6, 1);
scene.add( shape );



// pyramid 2
var shape3 = THREE.SceneUtils.createMultiMaterialObject(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 2, 2.5, 4, 4 ),
	multiMaterial );
	renderer.domElement.id='shape3';
shape3.position.set(0.5, 1.8, -1);
scene.add( shape3 );


// pyramid 3
var shape2 = THREE.SceneUtils.createMultiMaterialObject(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 1.8, 1.8, 4, 4 ),
	multiMaterial );
	renderer.domElement.id='shape2';
shape2.position.set(2.5, 1.6, -3);
scene.add( shape2 );






/*Petites pyramides */

// pyramid 4
var shape4 = THREE.SceneUtils.createMultiMaterialObject(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 0.3, 0.4, 4, 4 ),
	multiMaterial );
	renderer.domElement.id='shape4';
shape4.position.set(-1, 1.5, 10.5);
scene.add( shape4 );

// pyramid 5
var shape5 = THREE.SceneUtils.createMultiMaterialObject(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 0.3, 0.4, 4, 4 ),
	multiMaterial );
	renderer.domElement.id='shape5';
shape5.position.set(-0.4, 1.5, 10.5);
scene.add( shape5 );

// pyramid 6
var shape6 = THREE.SceneUtils.createMultiMaterialObject(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 0.3, 0.4, 4, 4 ),
	multiMaterial );
	renderer.domElement.id='shape6';
shape6.position.set(0.2, 1.5, 10.5);
scene.add( shape6 );




/*

camera.position.z = 16;
camera.position.y = 3;
camera.position.x =2;

 */

/*

/*Petites pyramides */

// pyramid 4
var shape4 = THREE.SceneUtils.createMultiMaterialObject(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 0.3, 0.4, 4, 4 ),
	multiMaterial );
	renderer.domElement.id='shape4';
shape4.position.set(-1, 1.5, 10.5);
scene.add( shape4 );

// pyramid 5
var shape5 = THREE.SceneUtils.createMultiMaterialObject(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 0.3, 0.4, 4, 4 ),
	multiMaterial );
	renderer.domElement.id='shape5';
shape5.position.set(-0.4, 1.5, 10.5);
scene.add( shape5 );

// pyramid 6
var shape6 = THREE.SceneUtils.createMultiMaterialObject(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 0.3, 0.4, 4, 4 ),
	multiMaterial );
	renderer.domElement.id='shape6';
shape6.position.set(0.2, 1.5, 10.5);
scene.add( shape6 );



/*

function rotate() {
    camera.position.z = 16;
    camera.position.y = 3;
    camera.position.x =0;

    for(let i = 0 ; i<9 ; i++)
    {
        camera.position.z + i ;
        camera.position.y + i ;
        camera.position.x + i ;

        console.log(i)


    }

    
}

 */










