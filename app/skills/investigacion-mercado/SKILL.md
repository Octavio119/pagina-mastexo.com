---
name: investigacion-mercado
description: "Realiza investigación de mercado que identifica tamaño de mercado, tendencias, necesidades de clientes y oportunidades competitivas. Utiliza para validar ideas, entender demanda o informar estrategia GTM."
author: "Imperio Digital"
version: "1.0"
---

# Investigador de Mercado

## Cuándo Usar Este Skill

- Usuario tiene una idea y quiere saber si el mercado existe
- Usuario necesita estimar tamaño de mercado (TAM, SAM, SOM)
- Usuario quiere entender tendencias en su industria
- Usuario necesita justificar un mercado a inversores

## Principio Fundamental

LA INVESTIGACIÓN DE MERCADO SIN VALIDACIÓN DE CLIENTES ES ESPECULACIÓN. Combina datos públicos con conversaciones reales con 5-10 prospectos potenciales.

## Workflow

### Fase 1: Define tu Mercado

```
MI MERCADO
==========
Industria: [Ej: Email Marketing]
Segmento específico: [Ej: For solo creators]
Geografía: [Global, US, regional]
```

### Fase 2: Tamaño de Mercado (TAM, SAM, SOM)

**TAM (Total Addressable Market)**
- Mercado global teórico si éxito total
- Cómo calcularlo: # de posibles clientes × promedio valor
- Ej: "10M freelancers × $300/año = $3B TAM"

**SAM (Serviceable Addressable Market)**
- Mercado que podrías realista alcanzar
- Típicamente 5-10% de TAM
- Ej: "Cream of freelancers + early adopters = $300M SAM"

**SOM (Serviceable Obtainable Market)**
- Mercado que puedes capturar realista en 5 años
- Típicamente 1-5% de SAM
- Ej: "With strong execution = $30M SOM by year 5"

### Fase 3: Investigación de Datos Públicos

Busca:

**Tamaño de mercado oficial**
- Reporte de industria (Gartner, IDC, Forrester)
- Búsqueda: "[Industry] market size 2024-2030"

**Tendencias**
- Google Trends (búsquedas crecientes?)
- LinkedIn trends (skills, roles emergentes?)
- Newsletter industry insights (What's trending?)

**Competidor datos**
- Anuncios de financiación (VC backing = validación)
- Job postings (¿cuántos contratando? Señal de crecimiento)
- Pricing (qué pagan los clientes?)

**Necesidades de cliente**
- Reddit discussions (qué se quejan?)
- Twitter/X searches (qué dicen?)
- Facebook groups (qué necesitan?)
- Quora (qué preguntan?)

### Fase 4: Validación Primaria

**Entrevista 5-10 prospectos:**

1. "Do you have this problem?"
   (Sí/No)

2. "How much would solving this be worth?"
   (Dinero = disposición a pagar)

3. "Who else struggles with this?"
   (Validación de mercado)

4. "Would you buy a solution?"
   (Intención de compra)

5. "What would that need to include?"
   (Validación de product-market fit)

### Fase 5: Documento de Investigación

```
RESUMEN EJECUTIVO
=================
Market: [Name]
Size (TAM): $[X] billion
Growth rate: [X]% CAGR
Key drivers: [What's making this grow?]

CONCLUSIÓN: [El mercado es real / Not yet / Declining]

EVIDENCE
========
1. Public market data
   - [Source] says the market is $[X]
   - Growing [X]% per year

2. Customer validation
   - Interviewed [X] prospects
   - [X]% said they have this problem
   - [X]% willing to pay $[Y]

3. Competitive validation
   - [X] competitors raising money
   - [X] Fortune 500 companies entering
   - Trending on Twitter/LinkedIn

RISKS
=====
- Market might be smaller than reports show
- Customers say yes but don't buy
- Better solution exists that we didn't find

NEXT STEPS
==========
1. Talk to 10 more prospects
2. Create MVP and test with beta customers
3. Revisit market size assumptions in 6 months
```

## Ejemplos

### Ejemplo 1: Email Marketing para Creadores

```
MARKET SIZING
=============

TAM: Creadores globales que necesitan email
- 15M creators worldwide with audience
- @ $200 average annual = $3B TAM

SAM: Creadores de habla inglesa, ingresos $50K+
- 2M creators
- @ $200 average = $400M SAM

SOM: Creadores que descubren nuestra herramienta en 5 años
- 100K customers por año 5 (25% market share)
- @ $200 average = $20M SOM

VALIDACIÓN
==========
Entrevistadas: 8 podcasters, 6 YouTubers, 5 newsletter writers = 19 total

Resultados:
- 17/19 (89%) tiene problema (low email engagement)
- 15/19 (79%) abierto a herramienta
- 12/19 (63%) pagará $29-99/mes
- Rango promedio dispuesto a pagar: $47/mes

EVIDENCIA PÚBLICA
=================
- ConvertKit recaudó $12M Series A para creators
- Substack alcanzó 1M writers (aunque no todos activos)
- Google Trends: "email marketing for creators" creciendo 40% YoY

CONCLUSIÓN: Market is real, demand validated, competitors exist but white space remains
```

---

## Recuperación

- **No encuentras datos públicos**: Significa mercado nuevo/pequeño. Más importante: validación primaria
- **Prospecto dice "no" a 7/10**: El mercado podría no existir. Refina problem definition
- **Datos públicos vs. realidad no coinciden**: Confía más en lo que dice la gente. Datos públicos son lentos
- **Mercado es enorme**: No garantiza éxito. Enfoca en SAM/SOM realista (pequeño mercado bien penetrado > mercado gigante sin tracción)

## Restricciones

- **NUNCA asumas TAM sin fuente** — busca reporte publicado
- **NUNCA uses solo datos públicos** — entrevista clientes reales
- **NUNCA ignores mercados pequeños** — "$100M market" de niche puede ser mejor que "$10B de fragmentado"
- **SIEMPRE documenta supuestos** — "Si promedio spend es $300, TAM es $X. Si es $600, TAM es $Y"
