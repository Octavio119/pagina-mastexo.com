#!/usr/bin/env node
/**
 * generate-mastexo-audio.ts
 *
 * Genera los 8 archivos de narración (mp3) para el video Mastexo
 * usando ElevenLabs TTS en español (modelo multilingual_v2).
 *
 * Uso:
 *   npx tsx cli/generate-mastexo-audio.ts
 *   npx tsx cli/generate-mastexo-audio.ts --voice <voiceId> --scene <n>
 *
 * Variables de entorno:
 *   ELEVENLABS_API_KEY  — API key de ElevenLabs
 */

import * as fs from 'fs';
import * as path from 'path';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import prompts from 'prompts';
import ora from 'ora';
import chalk from 'chalk';
import * as dotenv from 'dotenv';

dotenv.config({ quiet: true });

// ── Importar los scripts desde src/ ──────────────────────────────────
// Usamos require porque tsx compila en runtime
import { NARRATIONS, AUDIO_DIR } from '../src/mastexo/narration';

// ── Voces españolas recomendadas (ElevenLabs) ─────────────────────────
// Cambia VOICE_ID por el que prefieras desde tu cuenta ElevenLabs
const VOICES: Record<string, string> = {
  // Voces predefinidas de ElevenLabs (multilingue)
  'adam':    'pNInz6obpgDQGcFmaJgB',  // Adam  — voz masculina, neutra, funciona en ES
  'antoni':  'ErXwobaYiN019PkySvjV',  // Antoni — voz masculina, cálida
  'rachel':  '21m00Tcm4TlvDq8ikWAM', // Rachel — voz femenina, clara
  'bella':   'EXAVITQu4vr4xnSDxMaL', // Bella  — voz femenina, amable
  'arnold':  'VR6AewLTigWG4xSOukaG', // Arnold — voz masculina, profunda
};

const MODEL_ID = 'eleven_multilingual_v2';

// ── Helpers ───────────────────────────────────────────────────────────
function getPublicAudioDir(): string {
  const dir = path.join(process.cwd(), 'public', AUDIO_DIR);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

async function generateSceneAudio(
  client: ElevenLabsClient,
  voiceId: string,
  sceneIndex: number,
  outputDir: string,
): Promise<void> {
  const narration = NARRATIONS[sceneIndex];
  const outputPath = path.join(outputDir, narration.filename);

  // Skip if already generated (unless --force)
  if (fs.existsSync(outputPath) && !process.argv.includes('--force')) {
    console.log(chalk.yellow(`  ⏭  Escena ${sceneIndex + 1} ya existe (${narration.filename}), saltando. Usa --force para regenerar.`));
    return;
  }

  // convertWithTimestamps devuelve audioBase64 + alignment timestamps
  const response = await client.textToSpeech.convertWithTimestamps(voiceId, {
    text: narration.script,
    modelId: MODEL_ID,
    voiceSettings: {
      stability: 0.5,
      similarityBoost: 0.8,
      style: 0.25,
      useSpeakerBoost: true,
    },
  });

  if (!response.audioBase64) {
    throw new Error('ElevenLabs no devolvió audioBase64');
  }

  const buffer = Buffer.from(response.audioBase64, 'base64');
  fs.writeFileSync(outputPath, buffer);
}

// ── Main ──────────────────────────────────────────────────────────────
async function main() {
  console.log(chalk.blue.bold('\n🎙  Generador de narración — Mastexo Video\n'));

  // API key
  let apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    const res = await prompts({
      type: 'password',
      name: 'apiKey',
      message: 'ElevenLabs API key:',
      validate: (v) => v.length > 0 || 'Requerida',
    });
    if (!res.apiKey) {
      console.log(chalk.red('API key requerida. Saliendo.'));
      process.exit(1);
    }
    apiKey = res.apiKey as string;
  }

  // Voice selection
  const voiceArg = process.argv.includes('--voice')
    ? process.argv[process.argv.indexOf('--voice') + 1]
    : null;

  let voiceId: string;
  if (voiceArg) {
    // Acepta nombre corto o ID directo
    voiceId = VOICES[voiceArg] ?? voiceArg;
    console.log(chalk.cyan(`Voz: ${voiceArg} (${voiceId})`));
  } else {
    const voiceChoices = Object.entries(VOICES).map(([name, id]) => ({
      title: `${name} (${id.slice(0, 8)}...)`,
      value: id,
    }));
    voiceChoices.push({ title: 'Introducir ID manualmente', value: '__custom__' });

    const res = await prompts({
      type: 'select',
      name: 'voiceId',
      message: 'Elige la voz:',
      choices: voiceChoices,
    });

    if (!res.voiceId) { process.exit(1); }

    if (res.voiceId === '__custom__') {
      const custom = await prompts({ type: 'text', name: 'id', message: 'Voice ID:' });
      voiceId = custom.id as string;
    } else {
      voiceId = res.voiceId as string;
    }
  }

  // Scene filter
  const sceneArg = process.argv.includes('--scene')
    ? parseInt(process.argv[process.argv.indexOf('--scene') + 1], 10) - 1
    : null;

  const scenes = sceneArg !== null
    ? [sceneArg]
    : NARRATIONS.map((_, i) => i);

  // Generate
  const client = new ElevenLabsClient({ apiKey });
  const outputDir = getPublicAudioDir();

  console.log(chalk.green(`\nGuardando en: public/${AUDIO_DIR}/\n`));

  for (const sceneIndex of scenes) {
    const narration = NARRATIONS[sceneIndex];
    const spinner = ora(`Escena ${sceneIndex + 1}: "${narration.script.slice(0, 50)}..."`).start();
    try {
      await generateSceneAudio(client, voiceId, sceneIndex, outputDir);
      spinner.succeed(chalk.green(`Escena ${sceneIndex + 1} → ${narration.filename}`));
    } catch (err) {
      spinner.fail(chalk.red(`Escena ${sceneIndex + 1} falló: ${(err as Error).message}`));
    }
  }

  console.log(chalk.blue.bold('\n✅ Narración generada. Ahora re-renderiza el video:\n'));
  console.log(chalk.white('  npx remotion render MastexoVideo out/mastexo.mp4\n'));
}

main().catch((err) => {
  console.error(chalk.red('Error fatal:'), err);
  process.exit(1);
});
