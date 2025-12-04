// HTML/CSS Challenges
export const htmlCssChallenges = [
    {
        id: 'html-novato-001',
        title: 'La tarjeta embrujada',
        level: 'novato',
        language: 'html',
        description: 'Crea una tarjeta de perfil con HTML y CSS.',
        theory: {
            concept: 'Box Model y Estructura HTML',
            explanation: `El Box Model define cómo se renderiza cada elemento:
- content: el contenido real
- padding: espacio interno
- border: borde del elemento  
- margin: espacio externo`,
            keyPoints: [
                'border-radius: 50% crea círculos',
                'box-shadow agrega profundidad',
                'text-align: center centra inline'
            ],
            realWorldUse: 'Tarjetas de producto, perfiles de usuario'
        },
        starterCode: `<style>
  .card { /* Tu CSS */ }
</style>
<div class="card">
  <!-- Tu HTML -->
</div>`,
        tests: [],
        solution: `<style>
  .card {
    background: #1f1f38;
    border-radius: 16px;
    padding: 24px;
    text-align: center;
  }
</style>
<div class="card">
  <h2>Ghost Dev</h2>
  <p>Haunting code since 1999</p>
</div>`,
        hints: ['💡 Usa border-radius para esquinas redondeadas']
    },
    {
        id: 'html-novato-002',
        title: 'El botón maldito',
        level: 'novato',
        language: 'html',
        description: 'Crea un botón con efectos hover.',
        theory: {
            concept: 'Pseudo-clases y Transiciones',
            explanation: `:hover aplica estilos cuando el mouse está encima.
transition suaviza los cambios entre estados.`,
            keyPoints: [
                'transition va en el estado base',
                'transform: scale() cambia tamaño',
                ':active es cuando se hace click'
            ],
            realWorldUse: 'Botones de acción, menús interactivos'
        },
        starterCode: `<style>
  .btn { /* Estilo base */ }
  .btn:hover { /* Efecto hover */ }
</style>
<button class="btn">🎃 Click me</button>`,
        tests: [],
        solution: `<style>
  .btn {
    background: linear-gradient(135deg, #ff6b35, #ff8c00);
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255,107,53,0.5);
  }
</style>
<button class="btn">🎃 Click me</button>`,
        hints: ['💡 Usa gradient para el fondo']
    },
    {
        id: 'html-intermedio-001',
        title: 'El grid del cementerio',
        level: 'intermedio',
        language: 'html',
        description: 'Crea un layout con CSS Grid.',
        theory: {
            concept: 'CSS Grid Layout',
            explanation: `Grid es un sistema de layout 2D.
- grid-template-columns define columnas
- gap es el espacio entre elementos
- span ocupa múltiples celdas`,
            keyPoints: [
                'repeat(3, 1fr) = 3 columnas iguales',
                'grid-column: span 2 ocupa 2 columnas',
                'fr = fracción del espacio disponible'
            ],
            realWorldUse: 'Galerías, dashboards, layouts complejos'
        },
        starterCode: `<style>
  .gallery { display: grid; }
  .featured { /* Más grande */ }
</style>
<div class="gallery">
  <div class="featured">🎃</div>
  <div>👻</div>
  <div>💀</div>
</div>`,
        tests: [],
        solution: `<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
  .gallery > div {
    background: #1f1f38;
    padding: 40px;
    text-align: center;
    font-size: 48px;
    border-radius: 12px;
  }
  .featured {
    grid-column: span 2;
    grid-row: span 2;
  }
</style>`,
        hints: ['💡 grid-column: span 2 ocupa 2 columnas']
    }
];

export default htmlCssChallenges;
