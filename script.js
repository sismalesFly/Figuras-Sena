let figuraSeleccionada = "";
let medidas = {};
let scene, camera, renderer;
const escala = 20; // Por ejemplo: 1 unidad = 40 píxeles
alert("lo resultados se reprensetaran por unidades y es importate no ingresar valores mayores a 10 para ser visualizados correctamente");
function setup() {
    let canvas = createCanvas(400, 300);
    canvas.parent("canvas-container");
    noLoop();
}

function draw() {
    background(255);
    stroke(0);

    // Obtener el color seleccionado por el usuario
    let colorHex = document.getElementById("figura-color").value || "#96c8fa";
    // Convertir el color HEX a RGB para p5.js
    let r = parseInt(colorHex.substr(1, 2), 16);
    let g = parseInt(colorHex.substr(3, 2), 16);
    let b = parseInt(colorHex.substr(5, 2), 16);

    fill(r, g, b);

    switch (figuraSeleccionada) {
        case "cuadrado":
            if (medidas.lado) rect(100, 100, medidas.lado * escala, medidas.lado * escala);
            break;
        case "triangulo":
            if (medidas.base && medidas.altura)
                triangle(100, 250, 100 + medidas.base * escala, 250, 100, 250 - medidas.altura * escala);
            break;
        case "rectangulo":
            if (medidas.base && medidas.altura)
                rect(100, 100, medidas.base * escala, medidas.altura * escala);
            break;
        case "circulo":
            if (medidas.radio)
                ellipse(200, 150, medidas.radio * 2 * escala);
            break;
    }
}

function mostrarInputs() {
    const figura = document.getElementById("figura").value;
    const contenedor = document.getElementById("inputs-figura");
    figuraSeleccionada = figura;
    contenedor.innerHTML = "";

    const input = (label, id) => `<label class="mb-2">${label}: <input type="number" id="${id}" class="border border-gray-300 rounded p-1 ml-2 focus:outline-none focus:ring-2 focus:ring-blue-400"></label><br>`; document.getElementById("three-container").style.display = "none";
    document.getElementById("canvas-container").style.display = "none";

        document.getElementById("resultado").style.display = "none";

    switch (figura) {
        case "cuadrado":
            contenedor.innerHTML = input("Lado", "lado");
            break;
        case "triangulo":
        case "rectangulo":
            contenedor.innerHTML = input("Base", "base") + input("Altura", "altura");
            break;
        case "circulo":
        case "esfera":
            contenedor.innerHTML = input("Radio", "radio");
            break;
        case "cubo":
            contenedor.innerHTML = input("Lado", "lado");
            break;
        case "prisma":
        case "piramide":
            contenedor.innerHTML = input("Base", "base") + input("Ancho", "ancho") + input("Altura", "altura");
            break;
        case "cilindro":
            contenedor.innerHTML = input("Radio", "radio") + input("Altura", "altura");
            break;
    }
}

function dibujarFigura() {
    const resultado = document.getElementById("resultado");
        document.getElementById("resultado").style.display = "block";

    if (["cuadrado", "triangulo", "rectangulo", "circulo"].includes(figuraSeleccionada)) {
        document.getElementById("three-container").style.display = "none";

        document.getElementById("canvas-container").style.display = "block";
        // Dibujar figura plana
        if (figuraSeleccionada === "cuadrado") {
            medidas.lado = parseFloat(document.getElementById("lado").value);
            let area = medidas.lado ** 2;
            perimetro = 4 * medidas.lado;
            resultado.textContent = `Área del cuadrado: ${area.toFixed(2)} unidades² | Perímetro: ${perimetro.toFixed(2)} unidades`;
        } else if (figuraSeleccionada === "triangulo") {
            medidas.base = parseFloat(document.getElementById("base").value);
            medidas.altura = parseFloat(document.getElementById("altura").value);
            let hipotenusa = Math.sqrt(medidas.base ** 2 + medidas.altura ** 2);

            let area = (medidas.base * medidas.altura) / 2;
            perimetro = medidas.base + medidas.altura + hipotenusa;
            resultado.textContent = `Área del triángulo: ${area.toFixed(2)} unidades² | Perímetro: ${perimetro.toFixed(2)} unidades`;
        } else if (figuraSeleccionada === "rectangulo") {
            medidas.base = parseFloat(document.getElementById("base").value);
            medidas.altura = parseFloat(document.getElementById("altura").value);
            let area = medidas.base * medidas.altura;
            perimetro = 2 * (medidas.base + medidas.altura);
            resultado.textContent = `Área del rectángulo: ${area.toFixed(2)} unidades² | Perímetro: ${perimetro.toFixed(2)} unidades`;
        } else if (figuraSeleccionada === "circulo") {
            medidas.radio = parseFloat(document.getElementById("radio").value);
            let area = Math.PI * medidas.radio ** 2;
            perimetro = 2 * Math.PI * medidas.radio;
            resultado.textContent = `Área del círculo: ${area.toFixed(2)} unidades² | Perímetro: ${perimetro.toFixed(2)} unidades`;
        }
        redraw();
        document.querySelectorAll('section')[1].scrollIntoView({ behavior: 'smooth' });

    } else {
        document.getElementById("three-container").style.display = "block";
        document.getElementById("canvas-container").style.display = "none";
        // Dibujar figura 3D
        switch (figuraSeleccionada) {
            case "cubo":
                medidas.lado = parseFloat(document.getElementById("lado").value);
                resultado.textContent = `Volumen del cubo: ${(medidas.lado ** 3).toFixed(2)} unidades³`;
                break;
            case "prisma":
                medidas.base = parseFloat(document.getElementById("base").value);
                medidas.ancho = parseFloat(document.getElementById("ancho").value);
                medidas.altura = parseFloat(document.getElementById("altura").value);
                resultado.textContent = `Volumen del prisma rectangular: ${(medidas.base * medidas.ancho * medidas.altura).toFixed(2)} unidades³`;
                break;
            case "cilindro":
                medidas.radio = parseFloat(document.getElementById("radio").value);
                medidas.altura = parseFloat(document.getElementById("altura").value);
                resultado.textContent = `Volumen del cilindro: ${(Math.PI * medidas.radio ** 2 * medidas.altura).toFixed(2)} unidades³`;
                break;
            case "piramide":
                medidas.base = parseFloat(document.getElementById("base").value);
                medidas.ancho = parseFloat(document.getElementById("ancho").value);
                medidas.altura = parseFloat(document.getElementById("altura").value);
                resultado.textContent = `Volumen de la pirámide: ${((medidas.base * medidas.ancho * medidas.altura) / 3).toFixed(2)} unidades³`;
                break;
            case "esfera":
                medidas.radio = parseFloat(document.getElementById("radio").value);
                resultado.textContent = `Volumen de la esfera: ${((4 / 3) * Math.PI * Math.pow(medidas.radio, 3)).toFixed(2)} unidades³`;
                break;
        }
        mostrarFigura3D();
        document.querySelectorAll('section')[1].scrollIntoView({ behavior: 'smooth' });

    }
}

function initThreeJS() {
    if (renderer) {
        renderer.dispose();
        document.getElementById("three-container").innerHTML = "";
    }

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, 400 / 300, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(400, 300);
    renderer.setClearColor(0x000000, 0); // color negro con 0 de opacidad

    document.getElementById("three-container").appendChild(renderer.domElement);

    // Luz principal (como el sol)
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 5); // ángulo desde donde ilumina
    scene.add(light);
    camera.position.set(0, 0, 10); // Por ejemplo, 10 o ajusta según el tamaño
    camera.lookAt(0, 0, 0); // Asegura que la cámara mire al centro
    // camera.position.z = 10;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    if (scene && scene.children[1]) scene.children[1].rotation.y += 0.01;
    renderer.render(scene, camera);
}

function mostrarFigura3D() {
    let col = document.getElementById("figura-color").value;
    initThreeJS();
    const scale = 0.1;
    let geometry;
    let material = new THREE.MeshStandardMaterial({ color: col });

    switch (figuraSeleccionada) {
        case "cubo":
            geometry = new THREE.BoxGeometry(medidas.lado, medidas.lado, medidas.lado);
            break;
        case "prisma":
            geometry = new THREE.BoxGeometry(medidas.base, medidas.altura, medidas.ancho);
            break;
        case "cilindro":
            geometry = new THREE.CylinderGeometry(medidas.radio, medidas.radio, medidas.altura, 32);
            break;
        case "piramide":
            geometry = new THREE.ConeGeometry(medidas.base / 2, medidas.altura, 4);
            break;
        case "esfera":
            geometry = new THREE.SphereGeometry(medidas.radio, 32, 32);
            break;
        default:
            return;
    }

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}
