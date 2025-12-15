// JavaScript Challenges Data
export const javascriptChallenges = [
  // NIVEL NOVATO 🌱
  {
    id: 'js-novato-001',
    title: 'La posesión del mensaje',
    level: 'novato',
    language: 'javascript',
    description: 'Crea una función que revierta cada palabra de un mensaje poseído.',
    theory: {
      concept: 'Manipulación de Strings',
      explanation: `Los strings en JavaScript son **inmutables**, lo que significa que no puedes modificar directamente sus caracteres. 
      
Para manipularlos, necesitas convertirlos a estructuras mutables como arrays, realizar las operaciones, y luego volver a unirlos.

**Métodos clave:**
- \`split(separador)\`: Divide un string en un array usando el separador
- \`reverse()\`: Invierte el orden de elementos en un array
- \`join(separador)\`: Une elementos de un array en un string`,
      keyPoints: [
        'split(" ") divide por espacios, creando un array de palabras',
        'El spread operator [...str] convierte un string en array de caracteres',
        'reverse() modifica el array original (es mutativo)',
        'join("") une sin separador, join(" ") une con espacios'
      ],
      realWorldUse: 'Estas técnicas se usan en encriptación básica, formateo de texto, y procesamiento de datos de usuario.'
    },
    starterCode: `function translatePossessed(message) {
  // Si el mensaje está vacío, retorna vacío
  // 1. Divide el mensaje en palabras
  // 2. Para cada palabra, revierte sus caracteres
  // 3. Une las palabras de nuevo
  
}

// Prueba tu función:
console.log(translatePossessed("hello world"));
// Esperado: "olleh dlrow"`,
    tests: [
      { input: ['hello world'], expected: 'olleh dlrow' },
      { input: [''], expected: '' },
      { input: ['JavaScript es genial'], expected: 'tpircSavaJ se laineg' }
    ],
    solution: `function translatePossessed(message) {
  if (message.trim() === '') return ''
  
  const result = message
    .split(' ')
    .map(singleWord => [...singleWord].reverse().join(''))
    .join(' ')
  
  return result
}`,
    hints: [
      '💡 Primero maneja el caso del string vacío',
      '💡 Usa split(" ") para obtener las palabras',
      '💡 map() te permite transformar cada palabra',
      '💡 [...palabra] convierte la palabra en array de letras'
    ]
  },
  {
    id: 'js-novato-002',
    title: 'El contador de almas',
    level: 'novato',
    language: 'javascript',
    description: 'Cuenta cuántas vocales (almas atrapadas) hay en un texto maldito.',
    theory: {
      concept: 'Iteración y Condiciones',
      explanation: `Para contar elementos que cumplen una condición, podemos usar varios enfoques:

**Enfoque 1: Loop tradicional**
\`\`\`javascript
for (let i = 0; i < str.length; i++) {
  if (condicion) contador++
}
\`\`\`

**Enfoque 2: Filter + Length**
\`\`\`javascript
[...str].filter(char => vocales.includes(char)).length
\`\`\`

**Enfoque 3: Match con RegEx**
\`\`\`javascript
(str.match(/[aeiou]/gi) || []).length
\`\`\``,
      keyPoints: [
        'includes() verifica si un elemento existe en un array o string',
        'filter() crea un nuevo array con elementos que pasan la prueba',
        'toLowerCase() normaliza el texto para comparar sin importar mayúsculas',
        'Las expresiones regulares son más eficientes para búsquedas de patrones'
      ],
      realWorldUse: 'Contar ocurrencias es fundamental en análisis de texto, validación de formularios, y procesamiento de datos.'
    },
    starterCode: `function countSouls(text) {
  // Las vocales son las almas atrapadas: a, e, i, o, u
  // Cuenta cuántas hay en el texto (sin importar mayúsculas)
  
}

// Prueba tu función:
console.log(countSouls("Halloween"));
// Esperado: 4 (a, o, e, e)`,
    tests: [
      { input: ['Halloween'], expected: 4 },
      { input: ['xyz'], expected: 0 },
      { input: ['AEIOU'], expected: 5 }
    ],
    solution: `function countSouls(text) {
  const vowels = 'aeiouAEIOU'
  let count = 0
  
  for (const char of text) {
    if (vowels.includes(char)) {
      count++
    }
  }
  
  return count
}`,
    hints: [
      '💡 Define las vocales en un string o array',
      '💡 Recorre cada carácter del texto',
      '💡 Usa includes() para verificar si es vocal'
    ]
  },
  {
    id: 'js-novato-003',
    title: 'El espejo maldito',
    level: 'novato',
    language: 'javascript',
    description: 'Verifica si una palabra lee igual al derecho y al revés (palíndromo).',
    theory: {
      concept: 'Palíndromos y Comparación de Strings',
      explanation: `Un palíndromo es una secuencia que se lee igual en ambas direcciones.

**Estrategia:**
1. Limpiar el texto (quitar espacios, convertir a minúsculas)
2. Comparar el string original con su versión invertida

**Código clave:**
\`\`\`javascript
const reversed = [...str].reverse().join('')
return str === reversed
\`\`\``,
      keyPoints: [
        'Normaliza el texto antes de comparar (toLowerCase)',
        'Elimina caracteres no deseados con replace() o filter()',
        'La comparación estricta (===) compara valor y tipo',
        'Podrías también comparar caracteres desde ambos extremos'
      ],
      realWorldUse: 'Validación de datos, problemas de entrevistas técnicas, y algoritmos de strings.'
    },
    starterCode: `function isCursedMirror(word) {
  // Retorna true si la palabra es un palíndromo
  // Ignora mayúsculas/minúsculas
  
}

// Prueba tu función:
console.log(isCursedMirror("Oso"));
// Esperado: true`,
    tests: [
      { input: ['Oso'], expected: true },
      { input: ['halloween'], expected: false },
      { input: ['Ana'], expected: true },
      { input: ['level'], expected: true }
    ],
    solution: `function isCursedMirror(word) {
  const cleaned = word.toLowerCase()
  const reversed = [...cleaned].reverse().join('')
  return cleaned === reversed
}`,
    hints: [
      '💡 Primero convierte a minúsculas',
      '💡 Invierte el string',
      '💡 Compara original con invertido'
    ]
  },

  // NIVEL INTERMEDIO 🔥
  {
    id: 'js-intermedio-001',
    title: 'El ritual del array',
    level: 'intermedio',
    language: 'javascript',
    description: 'Elimina los elementos duplicados de un array maldito.',
    theory: {
      concept: 'Sets y Eliminación de Duplicados',
      explanation: `JavaScript ofrece el objeto **Set** que automáticamente elimina duplicados.

**Set**: Una colección de valores únicos.

\`\`\`javascript
const unique = [...new Set(array)]
\`\`\`

**Alternativa con filter:**
\`\`\`javascript
array.filter((item, index) => array.indexOf(item) === index)
\`\`\`

El método indexOf retorna la PRIMERA posición del elemento. Si el índice actual es diferente, es un duplicado.`,
      keyPoints: [
        'Set solo almacena valores únicos',
        'El spread operator [...set] convierte Set a Array',
        'indexOf encuentra la primera ocurrencia',
        'filter + indexOf es O(n²), Set es O(n)'
      ],
      realWorldUse: 'Limpieza de datos, eliminación de entradas duplicadas en formularios, optimización de listas.'
    },
    starterCode: `function purifyArray(cursedArray) {
  // Elimina los duplicados del array
  // Mantén el orden de primera aparición
  
}

// Prueba tu función:
console.log(purifyArray([1, 2, 2, 3, 4, 4, 5]));
// Esperado: [1, 2, 3, 4, 5]`,
    tests: [
      { input: [[1, 2, 2, 3, 4, 4, 5]], expected: [1, 2, 3, 4, 5] },
      { input: [['a', 'b', 'a', 'c']], expected: ['a', 'b', 'c'] },
      { input: [[1, 1, 1]], expected: [1] }
    ],
    solution: `function purifyArray(cursedArray) {
  return [...new Set(cursedArray)]
}`,
    hints: [
      '💡 Investiga el objeto Set de JavaScript',
      '💡 Set automáticamente elimina duplicados',
      '💡 Convierte el Set de vuelta a array'
    ]
  },
  {
    id: 'js-intermedio-002',
    title: 'La cripta de objetos',
    level: 'intermedio',
    language: 'javascript',
    description: 'Agrupa un array de objetos por una propiedad específica.',
    theory: {
      concept: 'Agrupación con reduce()',
      explanation: `**reduce()** es el método más versátil de arrays. Permite transformar un array en cualquier estructura.

**Sintaxis:**
\`\`\`javascript
array.reduce((acumulador, elemento) => {
  // lógica
  return acumulador
}, valorInicial)
\`\`\`

**Para agrupar:**
\`\`\`javascript
items.reduce((groups, item) => {
  const key = item[propiedad]
  groups[key] = groups[key] || []
  groups[key].push(item)
  return groups
}, {})
\`\`\``,
      keyPoints: [
        'reduce() recibe una función y un valor inicial',
        'El acumulador guarda el resultado entre iteraciones',
        'Puedes crear objetos, arrays, números, strings, etc.',
        'Es más eficiente que múltiples loops'
      ],
      realWorldUse: 'Organización de datos en dashboards, categorización de productos, análisis de datos.'
    },
    starterCode: `function groupByProperty(items, property) {
  // Agrupa los items por la propiedad indicada
  // Retorna un objeto donde cada key es un valor único de esa propiedad
  
}

// Prueba tu función:
const monsters = [
  { name: 'Zombie', type: 'undead' },
  { name: 'Ghost', type: 'spirit' },
  { name: 'Skeleton', type: 'undead' },
  { name: 'Banshee', type: 'spirit' }
];
console.log(groupByProperty(monsters, 'type'));
// Esperado: { undead: [...], spirit: [...] }`,
    tests: [
      {
        input: [[{ a: 1, b: 'x' }, { a: 2, b: 'x' }, { a: 3, b: 'y' }], 'b'],
        expected: { x: [{ a: 1, b: 'x' }, { a: 2, b: 'x' }], y: [{ a: 3, b: 'y' }] }
      }
    ],
    solution: `function groupByProperty(items, property) {
  return items.reduce((groups, item) => {
    const key = item[property]
    if (!groups[key]) {
      groups[key] = []
    }
    groups[key].push(item)
    return groups
  }, {})
}`,
    hints: [
      '💡 Usa reduce() con un objeto vacío como valor inicial',
      '💡 Accede a la propiedad dinámicamente con item[property]',
      '💡 Crea el array si no existe antes de hacer push'
    ]
  },
  {
    id: 'js-intermedio-003',
    title: 'El hechizo del debounce',
    level: 'intermedio',
    language: 'javascript',
    description: 'Implementa una función debounce para controlar la frecuencia de ejecución.',
    theory: {
      concept: 'Debounce y Closures',
      explanation: `**Debounce** retrasa la ejecución de una función hasta que pase un tiempo sin ser llamada.

**Uso común:** Evitar múltiples llamadas a APIs mientras el usuario escribe.

**Concepto clave - Closure:**
Una función que "recuerda" variables de su scope exterior.

\`\`\`javascript
function debounce(fn, delay) {
  let timeoutId  // Esta variable persiste entre llamadas
  return function(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}
\`\`\``,
      keyPoints: [
        'clearTimeout cancela el timer anterior',
        'setTimeout programa la ejecución futura',
        'Los closures mantienen el estado entre llamadas',
        'El spread operator (...args) captura todos los argumentos'
      ],
      realWorldUse: 'Búsquedas en tiempo real, redimensionamiento de ventana, auto-guardado.'
    },
    starterCode: `function debounce(fn, delay) {
  // Retorna una nueva función que:
  // 1. Cancela cualquier ejecución pendiente
  // 2. Programa una nueva ejecución después del delay
  
}

// Prueba (conceptual):
// const debouncedSearch = debounce(search, 300)
// debouncedSearch('a') // cancelado
// debouncedSearch('ab') // cancelado  
// debouncedSearch('abc') // se ejecuta después de 300ms`,
    tests: [],
    solution: `function debounce(fn, delay) {
  let timeoutId
  
  return function(...args) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}`,
    hints: [
      '💡 Necesitas una variable para guardar el timeoutId',
      '💡 Retorna una nueva función (closure)',
      '💡 Usa clearTimeout para cancelar ejecuciones previas'
    ]

  },
  {
    id: 'js-intermedio-004',
    title: 'La fusión de las sombras',
    level: 'intermedio',
    language: 'javascript',
    description: 'Combina dos objetos, fusionando sus propiedades (Deep Merge).',
    theory: {
      concept: 'Deep Merge vs Shallow Merge',
      explanation: `**Shallow Merge** (Object.assign, {...a, ...b}) solo copia propiedades del primer nivel. Si hay objetos anidados, se sobrescriben por referencia.
      
**Deep Merge** combina recursivamente objetos anidados.

\`\`\`javascript
function deepMerge(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      deepMerge(target[key], source[key]);
    } else {
      Object.assign(target, { [key]: source[key] });
    }
  }
  return target;
}
\`\`\``,
      keyPoints: [
        'Shallow copy solo copia referencias de objetos anidados',
        'Deep copy crea nuevas instancias de todo el árbol',
        'Recursión es clave para navegar estructuras profundas'
      ],
      realWorldUse: 'Configuraciones de usuario que sobrescriben defaults, estado en Redux.'
    },
    starterCode: `function mergeShadows(obj1, obj2) {
  // Retorna un nuevo objeto que combine obj1 y obj2
  // Si ambos tienen la misma propiedad y es un objeto, fusiónalos también
  // Si es primitivo, obj2 gana
  
}`,
    tests: [
      {
        input: [{ a: 1, b: { x: 1 } }, { b: { y: 2 }, c: 3 }],
        expected: { a: 1, b: { x: 1, y: 2 }, c: 3 }
      }
    ],
    solution: `function mergeShadows(target, source) {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = mergeShadows(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item) {
  return (item && typeof item === 'object' && !Array.isArray(item));
}`,
    hints: [
      '💡 Verifica si ambas propiedades son objetos',
      '💡 Usa recursión para objetos anidados',
      '💡 Object.assign o spread operator {...} para el nivel base'
    ]
  },

  // NIVEL AVANZADO ⚡
  {
    id: 'js-avanzado-001',
    title: 'La promesa del más allá',
    level: 'avanzado',
    language: 'javascript',
    description: 'Implementa una función que ejecute promesas en secuencia.',
    theory: {
      concept: 'Promesas y Async/Await',
      explanation: `Las **Promesas** representan valores que estarán disponibles en el futuro.

**Estados de una promesa:**
- Pending (pendiente)
- Fulfilled (resuelta)
- Rejected (rechazada)

**Ejecución en secuencia:**
\`\`\`javascript
async function sequential(promises) {
  const results = []
  for (const promise of promises) {
    results.push(await promise())
  }
  return results
}
\`\`\`

**vs. Paralelo:**
\`\`\`javascript
Promise.all(promises.map(p => p()))
\`\`\``,
      keyPoints: [
        'async/await es sintaxis sobre promesas',
        'await pausa la ejecución hasta que la promesa resuelva',
        'for...of con await ejecuta en secuencia',
        'Promise.all ejecuta en paralelo'
      ],
      realWorldUse: 'Llamadas a APIs dependientes, operaciones de base de datos en orden, flujos de trabajo.'
    },
    starterCode: `async function executeSequentially(promiseFunctions) {
  // Ejecuta cada función que retorna promesa EN ORDEN
  // Espera a que cada una termine antes de ejecutar la siguiente
  // Retorna un array con todos los resultados
  
}

// Prueba:
const tasks = [
  () => Promise.resolve(1),
  () => Promise.resolve(2),
  () => Promise.resolve(3)
];
// executeSequentially(tasks).then(console.log)
// Esperado: [1, 2, 3]`,
    tests: [],
    solution: `async function executeSequentially(promiseFunctions) {
  const results = []
  
  for (const promiseFn of promiseFunctions) {
    const result = await promiseFn()
    results.push(result)
  }
  
  return results
}`,
    hints: [
      '💡 Usa async/await',
      '💡 Itera con for...of, no con map',
      '💡 await dentro del loop asegura secuencialidad'
    ]
  },
  {
    id: 'js-avanzado-002',
    title: 'El arbol maldito',
    level: 'avanzado',
    language: 'javascript',
    description: 'Aplana un objeto anidado en un objeto de un solo nivel con dot notation.',
    theory: {
      concept: 'Recursión y Objetos Anidados',
      explanation: `**Recursión**: Una función que se llama a sí misma para resolver subproblemas.

**Caso base**: Condición que detiene la recursión.
**Caso recursivo**: La función se llama con un problema más pequeño.

\`\`\`javascript
function flatten(obj, prefix = '') {
  let result = {}
  
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? \`\${prefix}.\${key}\` : key
    
    if (typeof value === 'object' && value !== null) {
      Object.assign(result, flatten(value, newKey))
    } else {
      result[newKey] = value
    }
  }
  
  return result
}
\`\`\``,
      keyPoints: [
        'Object.entries() convierte objeto en array de [key, value]',
        'typeof verifica el tipo de dato',
        'null es typeof "object" (bug histórico de JS)',
        'Object.assign() combina objetos'
      ],
      realWorldUse: 'Transformación de datos para APIs, formularios dinámicos, almacenamiento en bases de datos planas.'
    },
    starterCode: `function flattenObject(obj, prefix = '') {
  // Aplana un objeto anidado
  // { a: { b: 1 } } -> { 'a.b': 1 }
  
}

// Prueba:
const haunted = {
  room: {
    ghost: {
      name: 'Casper',
      age: 100
    }
  }
};
console.log(flattenObject(haunted));
// Esperado: { 'room.ghost.name': 'Casper', 'room.ghost.age': 100 }`,
    tests: [
      {
        input: [{ a: { b: 1, c: 2 } }],
        expected: { 'a.b': 1, 'a.c': 2 }
      }
    ],
    solution: `function flattenObject(obj, prefix = '') {
  let result = {}
  
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? \`\${prefix}.\${key}\` : key
    
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey))
    } else {
      result[newKey] = value
    }
  }
  
  return result
}`,
    hints: [
      '💡 Usa recursión para manejar objetos anidados',
      '💡 Construye la clave con template strings',
      '💡 Verifica que el valor sea objeto Y no sea null'
    ]
  },

  // NIVEL LEGENDARIO 💀
  {
    id: 'js-legendario-001',
    title: 'El algoritmo del nigromante',
    level: 'legendario',
    language: 'javascript',
    description: 'Implementa un sistema de caché LRU (Least Recently Used).',
    theory: {
      concept: 'LRU Cache - Estructuras de Datos',
      explanation: `**LRU Cache** descarta los elementos menos usados recientemente cuando alcanza su capacidad.

**Operaciones requeridas en O(1):**
- get(key): Obtener valor y marcarlo como recién usado
- put(key, value): Insertar/actualizar y marcar como recién usado

**Implementación óptima:**
Combinar un **Map** (que mantiene orden de inserción) con lógica de reordenamiento.

\`\`\`javascript
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.cache = new Map()
  }
  
  get(key) {
    if (!this.cache.has(key)) return -1
    const value = this.cache.get(key)
    // Mover al final (más reciente)
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.capacity) {
      // Eliminar el más antiguo (primero)
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
    this.cache.set(key, value)
  }
}
\`\`\``,
      keyPoints: [
        'Map mantiene el orden de inserción',
        'delete + set mueve un elemento al final',
        'keys().next().value obtiene la primera clave',
        'Esta estructura es O(1) para todas las operaciones'
      ],
      realWorldUse: 'Sistemas de caché en navegadores, bases de datos, CDNs, gestión de memoria.'
    },
    starterCode: `class LRUCache {
  constructor(capacity) {
    // Inicializa la caché con la capacidad dada
  }
  
  get(key) {
    // Retorna el valor si existe, -1 si no
    // Marca el elemento como recién usado
  }
  
  put(key, value) {
    // Inserta o actualiza el valor
    // Si excede capacidad, elimina el menos usado
  }
}

// Prueba:
const cache = new LRUCache(2);
cache.put(1, 'uno');
cache.put(2, 'dos');
console.log(cache.get(1)); // 'uno'
cache.put(3, 'tres'); // elimina key 2
console.log(cache.get(2)); // -1`,
    tests: [],
    solution: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.cache = new Map()
  }
  
  get(key) {
    if (!this.cache.has(key)) return -1
    
    const value = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  }
  
  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.capacity) {
      const oldestKey = this.cache.keys().next().value
      this.cache.delete(oldestKey)
    }
    this.cache.set(key, value)
  }
}`,
    hints: [
      '💡 Map en JS mantiene orden de inserción',
      '💡 Eliminar y re-insertar mueve al final',
      '💡 El primer elemento del Map es el más antiguo'
    ]
  },
  {
    id: 'js-legendario-002',
    title: 'El portal dimensional',
    level: 'legendario',
    language: 'javascript',
    description: 'Implementa deep clone de objetos con manejo de referencias circulares.',
    theory: {
      concept: 'Deep Clone y Referencias Circulares',
      explanation: `**Problema:** JSON.parse(JSON.stringify(obj)) falla con:
- Referencias circulares
- Funciones
- Symbols
- undefined
- Dates (se convierten a strings)

**Solución:** Recursión con un WeakMap para rastrear objetos ya clonados.

\`\`\`javascript
function deepClone(obj, seen = new WeakMap()) {
  // Primitivos
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  
  // Referencia circular detectada
  if (seen.has(obj)) {
    return seen.get(obj)
  }
  
  // Crear el clon apropiado
  const clone = Array.isArray(obj) ? [] : {}
  seen.set(obj, clone)
  
  // Clonar propiedades recursivamente
  for (const key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key], seen)
  }
  
  return clone
}
\`\`\``,
      keyPoints: [
        'WeakMap permite usar objetos como keys',
        'WeakMap no previene garbage collection',
        'Debemos manejar arrays y objetos de forma diferente',
        'Date, RegExp, Map, Set requieren manejo especial'
      ],
      realWorldUse: 'Estado inmutable en React/Redux, serialización de datos, testing.'
    },
    starterCode: `function deepClone(obj, seen = new WeakMap()) {
  // Clona profundamente un objeto
  // Maneja referencias circulares
  // Ejemplo: const a = {}; a.self = a; // circular!
  
}

// Prueba:
const original = { a: 1, b: { c: 2 } };
original.self = original; // referencia circular

const cloned = deepClone(original);
console.log(cloned.b.c); // 2
console.log(cloned.self === cloned); // true (la referencia se mantiene)
console.log(cloned === original); // false`,
    tests: [],
    solution: `function deepClone(obj, seen = new WeakMap()) {
  // Primitivos
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  
  // Referencia circular
  if (seen.has(obj)) {
    return seen.get(obj)
  }
  
  // Manejar Date
  if (obj instanceof Date) {
    return new Date(obj.getTime())
  }
  
  // Manejar Array u Object
  const clone = Array.isArray(obj) ? [] : {}
  seen.set(obj, clone)
  
  for (const key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key], seen)
  }
  
  return clone
}`,
    hints: [
      '💡 Usa WeakMap para rastrear objetos clonados',
      '💡 Primero verifica si es primitivo',
      '💡 Guarda el clon en WeakMap ANTES de clonar propiedades'
    ]
  }
];

export default javascriptChallenges;
