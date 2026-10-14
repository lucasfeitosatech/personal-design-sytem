import { describe, expect, it } from 'vitest';
import { BANNER_TONES, BANNER_TONE_TOKEN, SKELETON_SHAPES, SKELETON_SHAPE_HEIGHT } from './feedback';
import { PROGRESS_TONES, PROGRESS_TONE_TOKEN, easeOutCubic, tweenValue } from './motion';
import { APP_BAR_HEIGHT, LIST_ROW_MIN_HEIGHT, TAB_BAR_HEIGHT } from './navigation';
import { TEXT_TONES, TEXT_TONE_TOKEN } from './text';
import { TILE_STATES, TILE_STATE_TOKEN, PRACTICE_TILE_MIN_HEIGHT } from './tile';
import { BILL_ROW_MIN_HEIGHT } from './row';
import { DATE_STRIP_DAY_HEIGHT } from './date-strip';

/**
 * The maps are the only place a tone touches a palette key, and a renderer indexes them at runtime.
 * A tone added to the array without its entry would render undefined rather than fail to compile.
 */
describe('tone maps cover their vocabulary', () => {
  it.each([
    ['banner', BANNER_TONES, BANNER_TONE_TOKEN],
    ['text', TEXT_TONES, TEXT_TONE_TOKEN],
    ['tile', TILE_STATES, TILE_STATE_TOKEN],
    ['progress', PROGRESS_TONES, PROGRESS_TONE_TOKEN],
  ])('%s', (_name, tones, map) => {
    expect(Object.keys(map).sort()).toEqual([...tones].sort());
  });

  it('every skeleton shape has a default height', () => {
    expect(Object.keys(SKELETON_SHAPE_HEIGHT).sort()).toEqual([...SKELETON_SHAPES].sort());
  });
});

describe('chrome measurements', () => {
  it('sizes the bars per platform, above the touch target', () => {
    expect(TAB_BAR_HEIGHT.android).toBeGreaterThan(TAB_BAR_HEIGHT.ios);
    expect(APP_BAR_HEIGHT.ios).toBe(44);
    expect(LIST_ROW_MIN_HEIGHT).toBeGreaterThanOrEqual(44);
  });

  it('keeps every tappable block at or above the touch target', () => {
    expect(PRACTICE_TILE_MIN_HEIGHT).toBeGreaterThanOrEqual(44);
    expect(BILL_ROW_MIN_HEIGHT).toBeGreaterThanOrEqual(44);
    expect(DATE_STRIP_DAY_HEIGHT).toBeGreaterThanOrEqual(44);
  });
});

/**
 * `done` and `partial` must differ by more than colour (D-03), and the difference the renderer has
 * to draw is the half fill. Without it a colour-blind reader sees one state.
 */
describe('tile states differ by shape, not only by colour', () => {
  it('marks the partial state as a half fill', () => {
    expect(TILE_STATE_TOKEN.partial.half).toBe(true);
    expect(TILE_STATE_TOKEN.done.half).toBe(false);
    expect(TILE_STATE_TOKEN.idle.mark).toBeNull();
  });
});

/**
 * The tween math is pure, so it is tested once here and both renderers reuse it: a number that
 * settles by a different curve on each platform would read as two different systems.
 */
describe('motion math', () => {
  it('eases out cubic through the interval', () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(0.5)).toBe(0.875);
    expect(easeOutCubic(1)).toBe(1);
  });

  it('clamps progress outside the interval', () => {
    expect(easeOutCubic(-0.4)).toBe(0);
    expect(easeOutCubic(1.6)).toBe(1);
  });

  it('tweens from the start to the end of the duration', () => {
    expect(tweenValue(0, 100, 0, 450)).toBe(0);
    expect(tweenValue(0, 100, 450, 450)).toBe(100);
  });

  it('lands on the eased point at the middle', () => {
    expect(tweenValue(0, 100, 225, 450)).toBe(87.5);
  });

  it('holds the end value once the duration is over', () => {
    expect(tweenValue(0, 100, 999, 450)).toBe(100);
  });

  it('jumps straight to the target with no duration', () => {
    expect(tweenValue(3, 7, 0, 0)).toBe(7);
    expect(tweenValue(3, 7, 0, -1)).toBe(7);
  });
});
