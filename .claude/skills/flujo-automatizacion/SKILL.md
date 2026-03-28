---
name: flujo-automatizacion
description: "Diseña workflows de automatización con secuencias disparador-acción, conexiones de herramientas y procedimientos de manejo de errores. Úsalo cuando automatices procesos empresariales repetitivos."
allowed-tools: Read Write Glob
metadata:
  author: Imperio Digital
  version: "1.0"
---

# Flujo de Automatización

## Cuándo Usar Este Skill

Usa este skill cuando necesites:
- Diseñar un workflow de automatización para un proceso empresarial repetitivo
- Mapear secuencias disparador-acción que conecten múltiples herramientas
- Construir manejo de errores y monitoreo para procesos automatizados
- Documentar workflows de automatización para mantenimiento y resolución de problemas

**NO USES** este skill para codificar integraciones personalizadas, seleccionar herramientas de automatización o procesos batch únicos. Esto es para diseñar workflows automatizados repetibles.

---

## Principio Fundamental

AUTOMATIZA PROCESOS QUE SEAN REPETIBLES, BASADOS EN REGLAS Y CONSUMIDORES DE TIEMPO — SI UNA TAREA REQUIERE JUICIO CADA VEZ, NECESITA UN HUMANO, NO UNA AUTOMATIZACIÓN.

---

## Fase 1: Brief

### Inputs Requeridos

| Input | Qué Preguntar | Default |
|-------|------------|---------|
| **Proceso a automatizar** | "¿Qué tarea repetitiva quieres automatizar?" | Sin default — debe proporcionarse |
| **Pasos actuales** | "Camina a través de los pasos manuales, en orden." | Sin default — debe proporcionarse |
| **Frecuencia** | "¿Con qué frecuencia se ejecuta este proceso? ¿Por día, semana, disparador?" | Múltiples veces por semana |
| **Herramientas involucradas** | "¿Qué herramientas están involucradas en este proceso?" | Sin default — lista todas |
| **Plataforma de automatización** | "¿Usas Zapier, Make, n8n u otra herramienta de automatización?" | Zapier |
| **Tolerancia a errores** | "¿Qué pasa si la automatización falla? ¿Impacto crítico o menor?" | Menor — puede recuperarse manualmente |

**PUNTO DE CONTROL: Confirma el brief antes de mapear el workflow.**

---

## Fase 2: Mapear el Workflow

### Documentación del Proceso

Documenta el proceso manual actual paso a paso:

```
## Proceso Manual Actual: [Nombre]

**Disparador:** [Qué inicia este proceso]
**Pasos:**
1. [Acción] en [Herramienta] — [Estimación de tiempo]
2. [Acción] en [Herramienta] — [Estimación de tiempo]
3. [Acción] en [Herramienta] — [Estimación de tiempo]
...
**Salida:** [Lo que produce el proceso completado]
**Tiempo total:** [X minutos/horas por ocurrencia]
**Frecuencia:** [X veces por semana/mes]
```

### Diseño de Automatización

Convierte pasos manuales a formato disparador-acción:

```
## Workflow Automatizado: [Nombre]

**Disparador:** [Evento que inicia la automatización]
  ↓
**Paso 1:** [Acción] — [Herramienta] → [Salida]
  ↓
**Paso 2:** [Filtro/Condición] — Solo continúa si [criterio]
  ↓
**Paso 3:** [Acción] — [Herramienta] → [Salida]
  ↓
**Paso 4:** [Acción] — [Herramienta] → [Salida]
  ↓
**Fin:** [Salida final o notificación]
```

### Puntos de Decisión

Identifica pasos que requieren condiciones:

| Decisión | Si Verdadero | Si Falso |
|----------|---------|----------|
| [Condición 1] | Continúa al Paso 3 | Salta al Paso 5 |
| [Condición 2] | Envía notificación | Registra y detén |

**PUNTO DE CONTROL: Confirma el mapa del workflow antes de construir manejo de errores.**

---

## Fase 3: Construir

### Guía de Configuración Paso a Paso

Para cada paso en la automatización, documenta:

```
### Paso [X]: [Nombre de Acción]

**Herramienta:** [Nombre de herramienta]
**Disparador/Acción:** [Tipo específico de disparador o acción]
**Configuración:**
- Campo 1: [Valor o mapeo]
- Campo 2: [Valor o mapeo]
- Campo 3: [Valor o mapeo]

**Mapeo de datos:**
- Entrada: [De dónde viene este dato]
- Salida: [Lo que este paso produce para el siguiente paso]

**Prueba:** [Cómo verificar que este paso funciona correctamente]
```

### Manejo de Errores

Para cada paso, define escenarios de fallo:

| Paso | Modo de Fallo | Detección | Recuperación |
|------|-------------|-----------|----------|
| Paso 1 | El disparador no se activa | Monitorea frecuencia esperada | Verifica configuración de disparador |
| Paso 2 | La conexión API falla | Notificación de error | Reintenta 3 veces, después alerta |
| Paso 3 | Desajuste de formato de datos | Verificación de validación | Registra error, salta registro, notifica |
| Paso 4 | Destino no disponible | Notificación de error | Encola y reintenta en 1 hora |

### Configuración de Monitoreo

- **Notificación de éxito:** Confirmación opcional cuando el flujo se completa
- **Alerta de fallo:** Notificación inmediata (email o Slack) en cualquier fallo de paso
- **Resumen diario:** Resumen de ejecuciones, éxitos y fallos
- **Revisión mensual:** Verifica que la automatización aún funciona correctamente y produce resultados esperados

---

## Fase 4: Pulir

### 1. Documentación del Workflow

```
## Documentación del Workflow: [Nombre]

**Propósito:** [Lo que esta automatización hace en una oración]
**Creado:** [Fecha]
**Propietario:** [Nombre]
**Plataforma:** [Zapier/Make/n8n]
**Tiempo estimado ahorrado:** [X] horas por [semana/mes]

### Diagrama del Workflow
[Disparador] → [Paso 1] → [Condición] → [Paso 2] → [Paso 3] → [Salida]

### Dependencias
- Cuenta [Herramienta 1] con [requisito de plan]
- [Herramienta 2] API key o integración habilitada
- [Fuente de datos] debe estar en [formato]

### Mantenimiento
- Verifica mensualmente que todas las conexiones estén activas
- Actualiza si cualquier herramienta conectada cambia su API
- Revisa si el proceso empresarial cambia
```

### 2. Cálculo de ROI

```
## ROI de Automatización

**Tiempo por ejecución manual:** [X] minutos
**Frecuencia:** [X] veces por [período]
**Tiempo manual total:** [X] horas por mes
**Tu tarifa horaria:** $[X]
**Valor mensual de tiempo ahorrado:** $[X]
**Costo de herramienta de automatización:** $[X]/mes
**Ahorros netos mensuales:** $[X]
```

### 3. Lista de Verificación de Calidad

```
## Lista de Verificación del Flujo de Automatización

- [ ] Proceso manual documentado paso a paso con estimaciones de tiempo
- [ ] Disparador claramente definido (evento, programación o condición)
- [ ] Cada paso tiene herramienta específica, acción y configuración documentadas
- [ ] Puntos de decisión y condiciones están mapeados
- [ ] Manejo de errores definido para cada paso (detección + recuperación)
- [ ] Alertas de fallo configuradas (notificación por email o Slack)
- [ ] Workflow probado de principio a fin con datos reales
- [ ] Documentación incluye dependencias y notas de mantenimiento
- [ ] ROI calculado (tiempo ahorrado vs. costo de herramienta)
- [ ] Revisión mensual programada para verificar función continua
```

---

## Ejemplo

**Proceso:** Onboarding de nuevo cliente

```
## Workflow Automatizado: Onboarding de Nuevo Cliente

**Disparador:** Nuevo pago recibido en Stripe
  ↓
**Paso 1:** Crear registro de cliente en CRM (Notion/Airtable)
  ↓
**Paso 2:** Enviar email de bienvenida vía herramienta de email (con credenciales de login)
  ↓
**Paso 3:** Agregar cliente a secuencia de email de onboarding
  ↓
**Paso 4:** Crear proyecto en herramienta de gestión de proyectos
  ↓
**Paso 5:** Enviar notificación Slack al equipo: "Nuevo cliente: [Nombre]"
  ↓
**Fin:** Cliente está configurado en todos los sistemas automáticamente

**Tiempo ahorrado:** 25 minutos por nuevo cliente × 8 nuevos clientes/mes = 3.3 horas/mes
**Costo de herramienta:** $20/mes (Zapier Starter)
**ROI:** $247/mes ahorrados a $75/hora
```

---

## Anti-Patrones

- **Automatizar un proceso roto** — si el proceso manual es defectuoso, la automatización simplemente se rompe más rápido. Arregla el proceso primero.
- **Sin manejo de errores** — las automatizaciones fallan silenciosamente a menos que construyas alertas. Siempre configura notificaciones de fallo.
- **Sobre-automatizar** — una automatización de 15 pasos con 8 condiciones es frágil. Si se rompe, nadie sabe cómo arreglarlo. Mantén flujos bajo 7 pasos.
- **Sin documentación** — una automatización que nadie entiende es una automatización que nadie puede arreglar o mejorar.
- **Saltarse la prueba** — siempre prueba con datos reales antes de depender de la automatización. Los casos extremos se revelan en pruebas.

---

## Recuperación

- **La automatización deja de funcionar:** Verifica cada conexión. La mayoría de fallos vienen de tokens API expirados o permisos de herramienta cambiados.
- **Datos incorrectos fluyendo a través:** Agrega un paso de validación que verifique el formato de datos antes de procesar. Registra registros rechazados.
- **La automatización se ejecuta demasiado frecuentemente o no lo suficiente:** Verifica la configuración del disparador. Agrega límites de velocidad o restricciones de programación.
- **El proceso cambia pero la automatización no:** Por eso importa la documentación. Revisa el workflow siempre que cambie el proceso empresarial.
