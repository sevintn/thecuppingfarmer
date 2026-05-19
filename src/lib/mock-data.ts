export interface MockProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  price: number;
  currencyCode: string;
  image: string;
  tags: string[];
  origin: string;
  process: string;
  roast: string;
  weight: string;
  flavorNotes: string[];
  featured: boolean;
  inStock: boolean;
  variantId: string;
}

export interface MockExperience {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  image: string;
  price: number;
  duration: string;
  capacity: string;
  tags: string[];
}

export interface MockPost {
  id: string;
  slug: string;
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  content: string;
  contentEn: string;
  image: string;
  date: string;
  readingTime: string;
  category: string;
}

// ─── Products ─────────────────────────────────────────────────────────────────

export const mockProducts: MockProduct[] = [
  {
    id: "prod_001",
    handle: "geisha-natural-finca-la-montana",
    title: "Finca La Montaña — Geisha Natural",
    description:
      "Un café extraordinario de varietal Geisha cultivado en altura. Proceso natural que resalta las notas florales y frutales propias de la variedad. Cosecha cuidadosamente seleccionada a mano.",
    price: 28.0,
    currencyCode: "USD",
    image:
      `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/hero.jpg`,
    tags: ["specialty", "geisha", "natural", "featured"],
    origin: "Colombia",
    process: "Natural",
    roast: "Ligero",
    weight: "250g",
    flavorNotes: ["Jazmín", "Durazno", "Miel de flores"],
    featured: true,
    inStock: true,
    variantId: "var_001_250g",
  },
  {
    id: "prod_002",
    handle: "washed-caturra-el-paramo",
    title: "El Páramo — Washed Caturra",
    description:
      "Café Caturra cultivado a 1.900 msnm en el páramo andino. Proceso lavado que preserva la acidez brillante y el perfil limpio. Ideal para métodos de filtrado.",
    price: 18.5,
    currencyCode: "USD",
    image:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80",
    tags: ["specialty", "caturra", "washed"],
    origin: "Colombia",
    process: "Lavado",
    roast: "Medio",
    weight: "500g",
    flavorNotes: ["Mandarina", "Caramelo", "Almendra"],
    featured: true,
    inStock: true,
    variantId: "var_002_500g",
  },
  {
    id: "prod_003",
    handle: "blend-artesanal-del-farmer",
    title: "Blend Artesanal del Farmer",
    description:
      "Mezcla cuidadosamente diseñada por nuestro equipo de catadores. Combina lo mejor de tres fincas para crear un perfil equilibrado y consistente. Versátil para espresso y filtrado.",
    price: 22.0,
    currencyCode: "USD",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    tags: ["blend", "espresso", "versatile", "featured"],
    origin: "Colombia",
    process: "Mixto",
    roast: "Medio-oscuro",
    weight: "1kg",
    flavorNotes: ["Chocolate oscuro", "Panela", "Nuez"],
    featured: true,
    inStock: true,
    variantId: "var_003_1kg",
  },
  {
    id: "prod_004",
    handle: "honey-castillo-la-palma",
    title: "La Palma — Honey Castillo",
    description:
      "Proceso miel que otorga cuerpo pronunciado y dulzura natural. Varietal Castillo de alta adaptabilidad, cultivado en suelos volcánicos ricos en minerales.",
    price: 20.0,
    currencyCode: "USD",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&q=80",
    tags: ["specialty", "castillo", "honey"],
    origin: "Colombia",
    process: "Miel",
    roast: "Medio",
    weight: "250g",
    flavorNotes: ["Ciruela", "Caramelo", "Vainilla"],
    featured: false,
    inStock: true,
    variantId: "var_004_250g",
  },
  {
    id: "prod_005",
    handle: "anaerobic-bourbon-la-esperanza",
    title: "La Esperanza — Anaeróbico Bourbon",
    description:
      "Fermentación anaeróbica de 72 horas que desarrolla notas inusuales y complejas. Para los amantes del café experimental y perfiles sensoriales intensos.",
    price: 32.0,
    currencyCode: "USD",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
    tags: ["specialty", "bourbon", "anaerobic", "experimental"],
    origin: "Colombia",
    process: "Anaeróbico",
    roast: "Ligero",
    weight: "250g",
    flavorNotes: ["Ron", "Maracuyá", "Rosa"],
    featured: false,
    inStock: false,
    variantId: "var_005_250g",
  },
  {
    id: "prod_006",
    handle: "washed-tabi-finca-nueva",
    title: "Finca Nueva — Lavado Tabi",
    description:
      "Varietal Tabi, un híbrido colombiano de gran calidad en taza. Proceso lavado en estación meteorológica de precisión que garantiza repetibilidad y pureza del perfil.",
    price: 24.0,
    currencyCode: "USD",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80",
    tags: ["specialty", "tabi", "washed"],
    origin: "Colombia",
    process: "Lavado",
    roast: "Ligero",
    weight: "250g",
    flavorNotes: ["Melocotón", "Uva verde", "Té negro"],
    featured: false,
    inStock: true,
    variantId: "var_006_250g",
  },
];

// ─── Experiences ──────────────────────────────────────────────────────────────

export const mockExperiences: MockExperience[] = [
  {
    id: "exp_001",
    slug: "cupping-experience",
    title: "Cupping Experience",
    titleEn: "Cupping Experience",
    description:
      "Una cata profesional guiada por nuestros expertos. Aprende a identificar aromas, sabores y texturas en 5 cafés de diferentes orígenes y procesos. Incluye degustación y material educativo.",
    descriptionEn:
      "A professional cupping session guided by our experts. Learn to identify aromas, flavors and textures across 5 coffees from different origins and processes. Includes tasting and educational materials.",
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
    price: 45,
    duration: "2.5 horas",
    capacity: "Máx. 8 personas",
    tags: ["cupping", "degustación", "educación"],
  },
  {
    id: "exp_002",
    slug: "taller-barismo-basico",
    title: "Taller de Barismo Básico",
    titleEn: "Basic Barista Workshop",
    description:
      "Aprende los fundamentos del café de especialidad: molienda, extracción, técnicas de preparación (V60, Chemex, AeroPress). Sin experiencia previa necesaria. Llevate a casa lo que preparas.",
    descriptionEn:
      "Learn the fundamentals of specialty coffee: grinding, extraction, brewing techniques (V60, Chemex, AeroPress). No prior experience needed. Take home what you brew.",
    image:
      "https://images.unsplash.com/photo-1561047029-3000c68339ca?w=800&q=80",
    price: 65,
    duration: "4 horas",
    capacity: "Máx. 6 personas",
    tags: ["barismo", "brew", "taller"],
  },
  {
    id: "exp_003",
    slug: "tour-cosecha-finca",
    title: "Tour de Cosecha en Finca",
    titleEn: "Farm Harvest Tour",
    description:
      "Visita a nuestra finca cafetera en época de cosecha. Recorre los cultivos, participa en la recolección manual de cerezas y aprende todo el proceso desde el árbol hasta el pergamino.",
    descriptionEn:
      "Visit our coffee farm during harvest season. Walk through the crops, participate in manual cherry picking and learn the entire process from tree to parchment.",
    image:
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80",
    price: 85,
    duration: "Día completo (7am–4pm)",
    capacity: "Máx. 10 personas",
    tags: ["finca", "cosecha", "tour"],
  },
  {
    id: "exp_004",
    slug: "taller-catacion-avanzado",
    title: "Taller de Catación Avanzado",
    titleEn: "Advanced Cupping Workshop",
    description:
      "Para los entusiastas del café que quieren profundizar. Protocolo SCA de catación, calibración sensorial, análisis de defectos y construcción de vocabulario descriptivo.",
    descriptionEn:
      "For coffee enthusiasts who want to go deeper. SCA cupping protocol, sensory calibration, defect analysis and building descriptive vocabulary.",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    price: 95,
    duration: "6 horas",
    capacity: "Máx. 6 personas",
    tags: ["cupping", "SCA", "avanzado", "catación"],
  },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────

export const mockPosts: MockPost[] = [
  {
    id: "post_001",
    slug: "que-es-el-cupping-y-por-que-importa",
    title: "¿Qué es el cupping y por qué importa?",
    titleEn: "What is cupping and why does it matter?",
    excerpt:
      "El cupping es el lenguaje universal del café de especialidad. Es el proceso que nos permite evaluar, comparar y comprender la calidad de un café de manera objetiva y reproducible.",
    excerptEn:
      "Cupping is the universal language of specialty coffee. It's the process that allows us to evaluate, compare and understand coffee quality in an objective and reproducible way.",
    content: `El cupping es mucho más que una simple cata. Es el protocolo estándar de la industria cafetera de especialidad para evaluar la calidad sensorial del café de manera sistemática y reproducible.

**¿Cómo funciona?**

El proceso es simple en apariencia pero profundo en su aplicación. Se muele café a granulometría gruesa, se añade agua caliente (93°C) directamente sobre el molido, y se evalúa en diferentes etapas: la costra, el aroma, el sabor, la acidez, el cuerpo, la dulzura y el retrogusto.

**¿Por qué usamos el protocolo SCA?**

La Specialty Coffee Association (SCA) desarrolló un protocolo estandarizado que permite comparar cafés de diferentes orígenes de manera justa. Cualquier catador entrenado en cualquier parte del mundo puede evaluar el mismo café y llegar a puntuaciones similares.

**¿Qué aprendemos del cupping?**

- El perfil sensorial exacto de cada lote
- Si el procesamiento fue correcto
- Si hubo defectos en la cosecha o secado
- La puntuación de calidad (Q-grade)
- Notas de sabor características del origen

En The Cupping Farmer, catamos cada lote antes de empacar. Es nuestra garantía de calidad.`,
    contentEn: `Cupping is much more than a simple tasting. It's the industry standard protocol for evaluating the sensory quality of specialty coffee in a systematic and reproducible way.

**How does it work?**

The process is simple in appearance but profound in application. Coffee is ground to a coarse grind, hot water (93°C) is added directly to the grounds, and evaluation happens at different stages: the crust, aroma, flavor, acidity, body, sweetness and aftertaste.

**Why do we use the SCA protocol?**

The Specialty Coffee Association (SCA) developed a standardized protocol that allows coffees from different origins to be compared fairly. Any trained cupper anywhere in the world can evaluate the same coffee and reach similar scores.

**What do we learn from cupping?**

- The exact sensory profile of each lot
- Whether processing was correct
- Whether there were defects in harvesting or drying
- The quality score (Q-grade)
- Flavor notes characteristic of the origin

At The Cupping Farmer, we cup every lot before packaging. It's our quality guarantee.`,
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80",
    date: "2024-11-15",
    readingTime: "5 min",
    category: "educación",
  },
  {
    id: "post_002",
    slug: "origen-y-proceso-de-nuestros-cafes",
    title: "Origen y proceso de nuestros cafés",
    titleEn: "Origin and processing of our coffees",
    excerpt:
      "Cada taza de café cuenta una historia geográfica. La altitud, el suelo, la variedad y el proceso de beneficio determinan el perfil sensorial final. Aquí te contamos la historia detrás de nuestros microlotes.",
    excerptEn:
      "Every cup of coffee tells a geographical story. Altitude, soil, variety and processing method determine the final sensory profile. Here we share the story behind our micro-lots.",
    content: `Colombia es uno de los países cafeteros más privilegiados del mundo. La combinación de altitudes extremas, microclimas variados y tradición cafetera centenaria produce cafés de excepcional calidad.

**Nuestras fincas**

Trabajamos con tres fincas seleccionadas en el departamento, todas por encima de los 1.700 metros sobre el nivel del mar. Esta altura crea granos más densos, de maduración más lenta y perfiles sensoriales más complejos.

**Los procesos que usamos**

*Lavado:* El proceso más común y reproducible. Las cerezas se despulpan, se fermentan en agua y se secan al sol. Produce perfiles limpios con acidez brillante.

*Natural:* Las cerezas se secan con la pulpa intacta. El contacto prolongado con la fruta imparte dulzura y notas frutales intensas.

*Miel:* Un proceso intermedio. Se retira parte de la pulpa y se seca el grano con cierta cantidad de mucílago, logrando equilibrio entre cuerpo y dulzura.

*Anaeróbico:* Fermentación en ambiente sin oxígeno que desarrolla perfiles únicos y en ocasiones inusuales.

**Trazabilidad total**

Cada bolsa tiene información del lote: finca, varietal, altitud, proceso, fecha de cosecha y perfil sensorial. Creemos que transparencia es calidad.`,
    contentEn: `Colombia is one of the most privileged coffee-producing countries in the world. The combination of extreme altitudes, varied microclimates and centuries of coffee tradition produces coffees of exceptional quality.

**Our farms**

We work with three selected farms in the region, all above 1,700 meters above sea level. This altitude creates denser beans with slower ripening and more complex sensory profiles.

**The processes we use**

*Washed:* The most common and reproducible process. Cherries are depulped, fermented in water and sun-dried. Produces clean profiles with bright acidity.

*Natural:* Cherries are dried with the pulp intact. Extended contact with the fruit imparts sweetness and intense fruity notes.

*Honey:* An intermediate process. Part of the pulp is removed and the bean is dried with some mucilage, achieving balance between body and sweetness.

*Anaerobic:* Fermentation in an oxygen-free environment that develops unique and sometimes unusual profiles.

**Full traceability**

Each bag has lot information: farm, varietal, altitude, process, harvest date and sensory profile. We believe transparency is quality.`,
    image:
      "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&q=80",
    date: "2024-10-22",
    readingTime: "7 min",
    category: "origen",
  },
  {
    id: "post_003",
    slug: "guia-preparacion-v60-paso-a-paso",
    title: "Guía de preparación: V60 paso a paso",
    titleEn: "Brewing guide: V60 step by step",
    excerpt:
      "El V60 es uno de los métodos de filtrado más elegantes y versátiles. Con la técnica correcta, puede revelar la complejidad de un café de especialidad como ningún otro método.",
    excerptEn:
      "The V60 is one of the most elegant and versatile pour-over methods. With the right technique, it can reveal the complexity of a specialty coffee like no other method.",
    content: `El Hario V60 es el método de preparación favorito de muchos baristas y aficionados al café de especialidad. Su diseño en espiral y el ángulo de 60 grados permiten un flujo de agua único que extrae lo mejor del café.

**Lo que necesitas**

- V60 (cerámica, plástico o vidrio)
- Filtros de papel V60
- Kettle de cuello de cisne
- Báscula de gramos
- Molinillo de burras
- Café fresco: 15g
- Agua filtrada a 92–94°C: 250ml

**La receta base (ratio 1:16)**

*Paso 1 — Pre-infusión (30s):*
Vierte 30ml de agua en movimientos circulares. Esto libera el CO2 atrapado en el café recién molido. Espera 30 segundos.

*Paso 2 — Primera vertida (0:30–1:00):*
Vierte hasta 130ml de forma suave y circular, de adentro hacia afuera. Mantén la cama de café uniformemente saturada.

*Paso 3 — Segunda vertida (1:00–1:30):*
Completa hasta 200ml. Mantén el nivel de agua estable.

*Paso 4 — Vertida final (1:30–2:00):*
Termina con los 250ml. El goteo completo debe ocurrir entre 2:30 y 3:00 minutos.

**Consejos clave**

- Muele justo antes de preparar
- La temperatura del agua importa más de lo que crees
- Experimenta con el grosor de la molienda para ajustar acidez y cuerpo
- Un café con buen proceso produce resultados extraordinarios con esta técnica`,
    contentEn: `The Hario V60 is the favorite brewing method of many baristas and specialty coffee enthusiasts. Its spiral design and 60-degree angle allow a unique water flow that extracts the best from coffee.

**What you need**

- V60 (ceramic, plastic or glass)
- V60 paper filters
- Gooseneck kettle
- Gram scale
- Burr grinder
- Fresh coffee: 15g
- Filtered water at 92–94°C: 250ml

**The base recipe (1:16 ratio)**

*Step 1 — Bloom (30s):*
Pour 30ml of water in circular motions. This releases CO2 trapped in freshly ground coffee. Wait 30 seconds.

*Step 2 — First pour (0:30–1:00):*
Pour up to 130ml gently and circularly, from inside to outside. Keep the coffee bed evenly saturated.

*Step 3 — Second pour (1:00–1:30):*
Complete up to 200ml. Keep the water level stable.

*Step 4 — Final pour (1:30–2:00):*
Finish with 250ml. Complete draining should occur between 2:30 and 3:00 minutes.

**Key tips**

- Grind just before brewing
- Water temperature matters more than you think
- Experiment with grind size to adjust acidity and body
- Coffee with good processing produces extraordinary results with this technique`,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
    date: "2024-09-10",
    readingTime: "6 min",
    category: "preparación",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getProductByHandle(handle: string): MockProduct | undefined {
  return mockProducts.find((p) => p.handle === handle);
}

export function getFeaturedProducts(): MockProduct[] {
  return mockProducts.filter((p) => p.featured);
}

export function getExperienceBySlug(slug: string): MockExperience | undefined {
  return mockExperiences.find((e) => e.slug === slug);
}

export function getPostBySlug(slug: string): MockPost | undefined {
  return mockPosts.find((p) => p.slug === slug);
}
