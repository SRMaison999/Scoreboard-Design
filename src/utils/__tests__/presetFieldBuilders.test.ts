import { describe, it, expect } from 'vitest';
import { DEFAULT_FIELD_STYLE } from '@/types/customField';
import {
  makeTextField,
  makeTeamNameField,
  makeScoreField,
  makeClockField,
  makePeriodField,
  makePenaltyColumn,
  makeStatLine,
} from '@/utils/presetFieldBuilders';

describe('makeTextField', () => {
  it('cr\u00e9e un champ text-block avec les propri\u00e9t\u00e9s correctes', () => {
    const field = makeTextField(
      'test-id', 'Mon texte', 100, 200, 300, 50, 'Contenu', 24,
    );

    expect(field.id).toBe('test-id');
    expect(field.label).toBe('Mon texte');
    expect(field.x).toBe(100);
    expect(field.y).toBe(200);
    expect(field.width).toBe(300);
    expect(field.height).toBe(50);
    expect(field.element.type).toBe('text-block');
    if (field.element.type === 'text-block') {
      expect(field.element.config.content).toBe('Contenu');
      expect(field.element.config.fontSize).toBe(24);
      expect(field.element.config.fontWeight).toBe(700);
      expect(field.element.config.textAlign).toBe('center');
      expect(field.element.config.textTransform).toBe('uppercase');
    }
  });

  it('applique les options personnalis\u00e9es', () => {
    const field = makeTextField(
      'opt-id', 'Label', 0, 0, 100, 40, 'X', 12,
      { fontWeight: 400, textAlign: 'left', textTransform: 'none', letterSpacing: 2, zIndex: 5 },
    );

    expect(field.zIndex).toBe(5);
    if (field.element.type === 'text-block') {
      expect(field.element.config.fontWeight).toBe(400);
      expect(field.element.config.textAlign).toBe('left');
      expect(field.element.config.textTransform).toBe('none');
      expect(field.element.config.letterSpacing).toBe(2);
    }
  });

  it('utilise le style par d\u00e9faut', () => {
    const field = makeTextField('s-id', 'L', 0, 0, 40, 40, '', 12);
    expect(field.style).toEqual(DEFAULT_FIELD_STYLE);
  });
});

describe('makeTeamNameField', () => {
  it('cr\u00e9e un champ team-name avec le bon c\u00f4t\u00e9', () => {
    const field = makeTeamNameField('tn-id', 'Label', 50, 60, 200, 80, 'right');

    expect(field.element.type).toBe('team-name');
    if (field.element.type === 'team-name') {
      expect(field.element.config.side).toBe('right');
      expect(field.element.config.showFlag).toBe(false);
      expect(field.element.config.fontSizeOverride).toBe(0);
    }
    expect(field.visible).toBe(true);
    expect(field.locked).toBe(false);
  });
});

describe('makeScoreField', () => {
  it('cr\u00e9e un champ score-display', () => {
    const field = makeScoreField('sc-id', 'Score', 100, 100, 120, 120, 'left');

    expect(field.element.type).toBe('score-display');
    if (field.element.type === 'score-display') {
      expect(field.element.config.side).toBe('left');
      expect(field.element.config.showLabel).toBe(false);
    }
    expect(field.zIndex).toBe(2);
  });

  it('accepte un zIndex personnalis\u00e9', () => {
    const field = makeScoreField('sc2', 'S', 0, 0, 60, 60, 'right', 10);
    expect(field.zIndex).toBe(10);
  });
});

describe('makeClockField', () => {
  it('cr\u00e9e un champ clock-display', () => {
    const field = makeClockField('cl-id', 'Horloge', 0, 0, 300, 80);

    expect(field.element.type).toBe('clock-display');
    if (field.element.type === 'clock-display') {
      expect(field.element.config.showPeriod).toBe(false);
      expect(field.element.config.showBox).toBe(false);
    }
    expect(field.zIndex).toBe(3);
  });
});

describe('makePeriodField', () => {
  it('cr\u00e9e un champ period-display', () => {
    const field = makePeriodField('pd-id', 'P\u00e9riode', 0, 0, 200, 50);

    expect(field.element.type).toBe('period-display');
    if (field.element.type === 'period-display') {
      expect(field.element.config.fontSizeOverride).toBe(0);
    }
  });
});

describe('makePenaltyColumn', () => {
  it('cr\u00e9e un champ penalty-column', () => {
    const field = makePenaltyColumn('pen-id', 'P\u00e9nalit\u00e9s', 0, 0, 200, 400, 'left');

    expect(field.element.type).toBe('penalty-column');
    if (field.element.type === 'penalty-column') {
      expect(field.element.config.side).toBe('left');
    }
  });
});

describe('makeStatLine', () => {
  it('cr\u00e9e un champ stat-line avec le bon index', () => {
    const field = makeStatLine('sl-id', 'Tirs', 0, 0, 500, 60, 3);

    expect(field.element.type).toBe('stat-line');
    if (field.element.type === 'stat-line') {
      expect(field.element.config.statIndex).toBe(3);
    }
  });
});

describe('propri\u00e9t\u00e9s communes \u00e0 tous les builders', () => {
  const builders = [
    () => makeTextField('a', 'L', 10, 20, 100, 50, 'C', 12),
    () => makeTeamNameField('b', 'L', 10, 20, 100, 50, 'left'),
    () => makeScoreField('c', 'L', 10, 20, 100, 50, 'right'),
    () => makeClockField('d', 'L', 10, 20, 100, 50),
    () => makePeriodField('e', 'L', 10, 20, 100, 50),
    () => makePenaltyColumn('f', 'L', 10, 20, 100, 50, 'left'),
    () => makeStatLine('g', 'L', 10, 20, 100, 50, 0),
  ];

  it.each(builders.map((fn, i) => [i, fn]))(
    'builder %i d\u00e9finit rotation \u00e0 0 et visible \u00e0 true',
    (_index, builderFn) => {
      const field = (builderFn as () => ReturnType<typeof makeTextField>)();
      expect(field.rotation).toBe(0);
      expect(field.visible).toBe(true);
      expect(field.locked).toBe(false);
      expect(field.lockAspectRatio).toBe(false);
      expect(field.scaleContent).toBe(false);
    },
  );

  it.each(builders.map((fn, i) => [i, fn]))(
    'builder %i d\u00e9finit initialWidth/Height \u00e9gaux \u00e0 width/height',
    (_index, builderFn) => {
      const field = (builderFn as () => ReturnType<typeof makeTextField>)();
      expect(field.initialWidth).toBe(field.width);
      expect(field.initialHeight).toBe(field.height);
    },
  );
});
