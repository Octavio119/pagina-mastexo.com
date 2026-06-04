/**
 * narration.ts
 * Scripts de narración para cada escena del video Mastexo.
 * Duración aproximada a ~140 palabras/minuto en español conversacional.
 */

import { FPS, SCENE_STARTS } from './constants';

export interface SceneNarration {
  /** Índice de escena (0-based) */
  index: number;
  /** Nombre del archivo de audio (se guarda en public/content/mastexo/audio/) */
  filename: string;
  /** Texto que se envía a ElevenLabs */
  script: string;
  /** Frame en que empieza el audio dentro del video completo */
  startFrame: number;
  /** Offset en segundos dentro del audio (0 por defecto) */
  audioOffset?: number;
}

export const NARRATIONS: SceneNarration[] = [
  {
    index: 0,
    filename: 'scene1.mp3',
    startFrame: SCENE_STARTS[0],
    script:
      '¿Tu restaurante o evento merece más clientes? ' +
      'En Mastexo transformamos tu presencia digital en reservas reales. ' +
      'Más de ciento veinte negocios en Chile ya lo comprueban.',
  },
  {
    index: 1,
    filename: 'scene2.mp3',
    startFrame: SCENE_STARTS[1],
    script:
      'El ochenta y siete por ciento de los restaurantes en Chile pierde clientes ' +
      'por falta de presencia digital. ' +
      'Sin marketing efectivo, tus mesas quedan vacías y tu agenda sin reservas. ' +
      'Hay una solución.',
  },
  {
    index: 2,
    filename: 'scene3.mp3',
    startFrame: SCENE_STARTS[2],
    script:
      'Mastexo ofrece gestión de redes sociales, campañas Meta Ads de alto rendimiento, ' +
      'posicionamiento local en Google, y tu propio sistema de reservas online. ' +
      'Todo integrado, todo medible, todo optimizado para gastronomía y eventos.',
  },
  {
    index: 3,
    filename: 'scene4.mp3',
    startFrame: SCENE_STARTS[3],
    script:
      'Restaurante Don Pedro triplicó sus reservas en solo treinta días. ' +
      'Pasaron de veintiocho a noventa y cuatro reservas mensuales ' +
      'gracias a nuestra estrategia GastroGrowth. ' +
      'Sus mesas ahora se llenan todos los fines de semana.',
  },
  {
    index: 4,
    filename: 'scene5.mp3',
    startFrame: SCENE_STARTS[4],
    script:
      'Este es el dashboard GastroGrowth en tiempo real. ' +
      'Noventa y cuatro reservas este mes, dos punto ocho millones en ingresos estimados, ' +
      'mil doscientos cuarenta nuevos seguidores, y una satisfacción de cuatro punto nueve estrellas. ' +
      'Tus campañas, tus platos más pedidos y tus reseñas, ' +
      'todo desde una sola pantalla, disponible las veinticuatro horas.',
  },
  {
    index: 5,
    filename: 'scene6.mp3',
    startFrame: SCENE_STARTS[5],
    script:
      'Nuestro proceso tiene cuatro pasos. ' +
      'Primero, el diagnóstico digital completo en veinticuatro horas. ' +
      'Segundo, un plan estratégico personalizado con metas claras. ' +
      'Tercero, campañas activas en setenta y dos horas. ' +
      'Cuarto, reportes en tiempo real para que veas cada resultado.',
  },
  {
    index: 6,
    filename: 'scene7.mp3',
    startFrame: SCENE_STARTS[6],
    script:
      'Carlos del Restaurante Mar de Fondo aumentó sus reservas un doscientos sesenta y siete por ciento. ' +
      'Valentina de Eventos Ópalo logró cuatro punto dos veces su inversión inicial desde el primer mes. ' +
      'Resultados verificados, de clientes reales en Chile.',
  },
  {
    index: 7,
    filename: 'scene8.mp3',
    startFrame: SCENE_STARTS[7],
    script:
      'Sin permanencia, sin compromiso. Resultados visibles en los primeros treinta días. ' +
      'Un gestor dedicado disponible las veinticuatro horas. ' +
      'Más de ciento veinte negocios en Chile ya confían en Mastexo. ' +
      'El próximo puede ser el tuyo. ' +
      'Agenda tu consulta gratis hoy en mastexo punto com. ' +
      'Solo quedan tres cupos disponibles este mes. No esperes más.',
  },
];

/** Ruta relativa dentro de public/ para los audios de Mastexo */
export const AUDIO_DIR = 'content/mastexo/audio';

/** staticFile path para Remotion */
export function audioPath(filename: string): string {
  return `${AUDIO_DIR}/${filename}`;
}

/** Devuelve el frame de inicio relativo a la composición completa */
export function sceneAudioStartFrame(sceneIndex: number): number {
  return SCENE_STARTS[sceneIndex];
}

/** FPS re-export para conveniencia */
export { FPS };
