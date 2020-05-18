
/*_________________*/
var renderer	= new THREE.WebGLRenderer({
	antialias	: true
});

renderer.setSize( window.innerWidth, window.innerHeight );


document.body.appendChild( renderer.domElement );
var onRenderFcts= [];
var scene	= new THREE.Scene();
var camera	= new THREE.PerspectiveCamera(25, window.innerWidth /    window.innerHeight, 0.01, 1000);



camera.position.z = 0;
camera.position.y = 0;


camera.position.z = 15; /*Valeur initiale 15 */
camera.position.y = 2; /*Valeur initiale 2 */

var animate = () =>{
    requestAnimationFrame(animate)
    shape.rotation.x += 0.1;
    shape.rotation.y += 0.1;

    shape2.rotation.x += 0.1;
    shape2.rotation.y += 0.1;
}





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
	new THREE.CylinderGeometry( 0, 1.8, 2, 4, 4 ),
	multiMaterial );
shape.position.set(-1, 1.5, 1);
scene.add( shape );




// pyramid 2
var shape3 = THREE.SceneUtils.createMultiMaterialObject(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 1.8, 2, 4, 4 ),
	multiMaterial );
shape3.position.set(0.5, 1.5, -1);
scene.add( shape3 );


// pyramid 3
var shape2 = THREE.SceneUtils.createMultiMaterialObject(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 1.8, 2, 4, 4 ),
	multiMaterial );
shape2.position.set(2.5, 1.5, -3);
scene.add( shape2 );






/*Petites pyramides */

// pyramid 4
var shape4 = THREE.SceneUtils.createMultiMaterialObject(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 0.3, 0.4, 4, 4 ),
	multiMaterial );
shape4.position.set(-1, 1.5, 10.5);
scene.add( shape4 );

// pyramid 5
var shape5 = THREE.SceneUtils.createMultiMaterialObject(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 0.3, 0.4, 4, 4 ),
	multiMaterial );
shape5.position.set(-0.4, 1.5, 10.5);
scene.add( shape5 );

// pyramid 6
var shape6 = THREE.SceneUtils.createMultiMaterialObject(
	// radiusAtTop, radiusAtBottom, height, segmentsAroundRadius, segmentsAlongHeight,
	new THREE.CylinderGeometry( 0, 0.3, 0.4, 4, 4 ),
	multiMaterial );
shape6.position.set(0.2, 1.5, 10.5);
scene.add( shape6 );

$(document).ready(function(){
    $(shape).click(function(){
		$('.text1').css('opacity', '1');
		alert('Click');
    })
});






/*__________________________________________________Test Cube => pyramides_____________________

var pyramid1	= new THREE.CubeGeometry(1,1,1)
var Texture = THREE.ImageUtils.loadTexture( 'data:image/jpeg;base64,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' );
var material2	= new THREE.MeshBasicMaterial({ map: Texture })
var mesh2	= new THREE.Mesh( pyramid1, material2 )

mesh2.position.y = 1;

scene.add(mesh2)



//Première pyramide

var pyramid2	= new THREE.CubeGeometry(1,1,1)
var Texture2 = THREE.ImageUtils.loadTexture( 'data:image/jpeg;base64,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' );
var material3	= new THREE.MeshBasicMaterial({ map: Texture2 })
var mesh3	= new THREE.Mesh( pyramid2, material3 )stemkoski

mesh3.position.y = 1;
mesh3.position.x =  4

scene.add(mesh3)


//Première pyramide

var pyramid3	= new THREE.CubeGeometry(1,1,1)
var Texture3 = THREE.ImageUtils.loadTexture( 'data:image/jpeg;base64,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' );
var material4	= new THREE.MeshBasicMaterial({ map: Texture3 })
var mesh4	= new THREE.Mesh( pyramid3, material4 )

mesh4.position.y = 1;
mesh4.position.x =  -4

scene.add(mesh4)

 */















/*Test GLTF */





