import { describe, expect, it } from 'vitest';
import { BANNER_TONES, BANNER_TONE_TOKEN, SKELETON_SHAPES, SKELETON_SHAPE_HEIGHT } from './feedback';
import { APP_BAR_HEIGHT, LIST_ROW_MIN_HEIGHT, TAB_BAR_HEIGHT } from './navigation';
import { TEXT_TONES, TEXT_TONE_TOKEN } from './text';

/**
 * The maps are the only place a tone touches a palette key, and a renderer indexes them at runtime.
 * A tone added to the array without its entry would render undefined rather than fail to compile.
 */
describe('tone maps cover their vocabulary', () => {
  it.each([
    ['banner', BANNER_TONES, BANNER_TONE_TOKEN],
    ['text', TEXT_TONES, TEXT_TONE_TOKEN],
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
});
