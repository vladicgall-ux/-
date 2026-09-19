// Shoot scene.html frame by frame and encode it.
//
// The page exposes seek(t) and no timers, so each frame is asked for
// explicitly and the result is the same on every run — which matters when
// the clip has to loop: frame 0 and frame N land on the same state.

import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import ffmpegPath from 'ffmpeg-static';
import path from 'node:path';

const W = 1080, H = 1920, FPS = 30, SECONDS = 6;
const FRAMES = FPS * SECONDS;
const here = path.dirname(new URL(import.meta.url).pathname);
const frames = path.join(here, 'frames');
const out = path.join(here, '..', 'live-cover.mp4');

await rm(frames, { recursive: true, force: true });
await mkdir(frames, { recursive: true });

const browser = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
  args: ['--no-sandbox', '--disable-gpu', '--force-device-scale-factor=1'],
});
const page = await browser.newPage({ viewport: { width: W, height: H } });
await page.goto('file://' + path.join(here, 'scene.html'));
// The webfonts must be in before the first frame, or the opening frames
// come out in the fallback face.
await page.evaluate(() => document.fonts.ready);

for (let i = 0; i < FRAMES; i++) {
  await page.evaluate((t) => window.seek(t), i / FRAMES);
  await page.screenshot({
    path: path.join(frames, String(i).padStart(4, '0') + '.png'),
    animations: 'disabled',
  });
}
await browser.close();
console.log(`снято кадров: ${FRAMES}`);

await new Promise((resolve, reject) => {
  const ff = spawn(ffmpegPath, [
    '-y', '-loglevel', 'error',
    '-framerate', String(FPS),
    '-i', path.join(frames, '%04d.png'),
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18',
    // yuv420p and even dimensions are what players and VK expect
    '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    out,
  ], { stdio: 'inherit' });
  ff.on('exit', (c) => (c === 0 ? resolve() : reject(new Error('ffmpeg ' + c))));
});

await rm(frames, { recursive: true, force: true });
console.log('готово:', out);
