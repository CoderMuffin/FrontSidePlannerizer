const w=4;
const h=4;
const sw=400;
const sh=400;
let fronta=[[],[],[],[]]
let sidea=[[],[],[],[]]
let plana=[[],[],[],[]]
let cubes=[]

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, sw/sh, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( sw,sh );
document.getElementById("scene").appendChild( renderer.domElement );
const controls = new THREE.OrbitControls(camera, renderer.domElement);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
directionalLight.position.set(4,5,3);
const light = new THREE.AmbientLight( 0xffffff, 0.5 );
scene.add(light);
scene.add( directionalLight );

camera.position.set(5,5,5);
camera.lookAt(0,0,0);

function populateDiv(el) {
    for (var i = 0; i<16; i++) {
    let d = document.createElement("div");
    d.className="grid-item";
    d.style="width:50px;height:50px;"+([5,6,9,10].includes(i)?"background-color:#777":"");
    d.addEventListener("mousedown",function(){handleDivToggle(d)})
    el.appendChild(d);
    }
}

function rgbToHex(col)
{
    if(col.charAt(0)=='r')
    {
        col=col.replace('rgb(','').replace(')','').split(',');
        var r=parseInt(col[0], 10).toString(16);
        var g=parseInt(col[1], 10).toString(16);
        var b=parseInt(col[2], 10).toString(16);
        r=r.length==1?'0'+r:r; g=g.length==1?'0'+g:g; b=b.length==1?'0'+b:b;
        var colHex='#'+r+g+b;
        return colHex;
    }
}

function handleDivToggle(el) {
    el.style.backgroundColor=rgbToHex(el.style.backgroundColor)=="#777777"?"#dddddd":"#777777"
    solveall();
}

function solve(x,y,z) {
    return fronta[y][x] && sidea[y][z] && plana[z][x]
}

function populate() {
    fronta=[[],[],[],[]]
    sidea=[[],[],[],[]]
    plana=[[],[],[],[]]
    for (var i=0;i<w;i++)
        for (var j=0;j<h;j++)
            fronta[i].push(rgbToHex(document.getElementById("front").children[i*4+j].style.backgroundColor)=="#777777")
    
    for (i=0;i<w;i++)
        for (j=0;j<h;j++)
            sidea[i].push(rgbToHex(document.getElementById("side").children[i*4+j].style.backgroundColor)=="#777777")

    for (i=0;i<w;i++)
        for (j=0;j<h;j++)
            plana[i].push(rgbToHex(document.getElementById("plan").children[i*4+j].style.backgroundColor)=="#777777")

}

function solveall() {
    populate();
    for (var c of cubes) {
        scene.remove(c);
    }
    cubes=[]
    for (var y=0;y<4;y++)
        for (var z=0;z<4;z++)
            for (var x=0;x<4;x++)
                if (solve(x,y,z)) {
                    let cube = 
                        new THREE.Mesh(
                            new THREE.BoxGeometry(),
                            new THREE.MeshPhongMaterial(
                                {color:0xcc5522}
                            )
                        )
                    scene.add(cube);
                    cubes.push(cube);
                    cube.position.x=x-1.5;
                    cube.position.y=1.5-y;
                    cube.position.z=z-1.5;
                }
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();

let mode3d=true;
function toggleMode() {
    if (mode3d) {
        document.getElementById("cubeContainer").classList.remove("m3d")
                document.getElementById("scene").classList.remove("m3d")
    } else {
        document.getElementById("cubeContainer").classList.add("m3d")
                document.getElementById("scene").classList.add("m3d")
    }
    mode3d=!mode3d
}

populateDiv(document.getElementById("front"))
populateDiv(document.getElementById("side"))
populateDiv(document.getElementById("plan"))
solveall();