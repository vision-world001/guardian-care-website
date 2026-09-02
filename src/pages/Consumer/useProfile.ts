import {useCallback, useMemo, useState} from 'react';
import type {ConcernKey, SystemKey} from '../../data/consumerFlow';
import {CONCERNS, SYSTEMS} from '../../data/consumerFlow';
import type {StatusTone} from '../../data/command';

/**
 * What the page has learned about this household, and what it concludes.
 *
 * The whole journey is one object. Sections read it and are told what to
 * render; nothing decides for itself, which is what keeps a branching page
 * from turning into three components each holding a different idea of who the
 * visitor is.
 *
 * Held in memory only. An earlier version persisted answers to `localStorage`
 * and reopened on the last step, which meant somebody coming back to the site
 * landed mid-journey on a result built from a conversation they no longer
 * remembered having. The journey is three clicks long; starting it again costs
 * nothing, and always opening on the question is the more predictable page.
 */

export type Profile = {
  system: SystemKey | null;
  concern: ConcernKey | null;
  /**
   * Whether the third click has happened. Two answers are enough to build the
   * result, but it is withheld until asked for — a page that generates before
   * being told to has taken the decision away from the visitor.
   */
  generated: boolean;
};

const EMPTY: Profile = {system: null, concern: null, generated: false};

/* ---------- What the answers add up to ---------- */

/**
 * Two answers is not enough to grade somebody's system, and pretending
 * otherwise produced a result full of "Unknown" — honest, and useless to read.
 * What two answers *are* enough for is to say what Guardian Care would watch
 * on a system like theirs: the product described accurately, rather than a
 * status board with no data behind it.
 */
export type Watch = {
  key: string;
  /** The mark it wears. Same set as the questions, so the page reads as one. */
  glyph: 'generation' | 'battery' | 'grid' | 'export' | 'health';
  title: string;
  /** What it looks for. One line, specific to this kind of system. */
  detail: string;
  tone: StatusTone;
};

export type Derived = {
  watches: Watch[];
  priority: {heading: string; body: string; tone: StatusTone};
  steps: string[];
  /** The three-rung CTA ladder for this intent. */
  cta: [string, string, string];
  hasBattery: boolean;
  isOlder: boolean;
};

function derive(profile: Profile): Derived {
  const {system, concern} = profile;
  const hasBattery = system === 'solar-battery';
  const isOlder = system === 'older';
  const route = CONCERNS.find((item) => item.key === concern) ?? CONCERNS[5];

  const watches: Watch[] = [
    {
      key: 'generation',
      glyph: 'generation',
      title: 'Your generation',
      detail:
        'Compared against what your own system has done before, not against an average for your postcode.',
      tone: 'green'
    },
    ...(hasBattery
      ? [
          {
            key: 'battery',
            glyph: 'battery' as const,
            title: 'Your battery',
            detail:
              'When it charges, when it empties, and whether that timing matches the hours you are actually home.',
            tone: 'purple' as StatusTone
          }
        ]
      : []),
    {
      key: 'grid',
      glyph: 'grid',
      title: 'What you buy back',
      detail:
        'The hours you import from the grid, and whether any of it could have come from your own roof.',
      tone: 'amber'
    },
    {
      key: 'export',
      glyph: 'export',
      title: 'What you send out',
      detail:
        'How much leaves the house, what you are paid for it, and what it costs to buy the same units back.',
      tone: 'blue'
    },
    ...(isOlder
      ? [
          {
            key: 'health',
            glyph: 'health' as const,
            title: 'System health',
            detail:
              'Inverter age and reporting, and shading that has grown in since the day it was installed.',
            tone: 'orange' as StatusTone
          }
        ]
      : [])
  ];

  return {
    watches,
    priority: {
      heading: route.heading,
      body: route.body,
      tone: concern === 'performance' || concern === 'installer' ? 'orange' : 'amber'
    },
    steps: route.checks,
    cta: route.cta,
    hasBattery,
    isOlder
  };
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(EMPTY);

  /* Either answer re-opens the result rather than leaving a stale one on
     screen: everything below is a response to these two. */
  const setConcern = useCallback((concern: ConcernKey) => {
    setProfile((current) => ({...current, concern, generated: false}));
  }, []);

  const setSystem = useCallback((system: SystemKey) => {
    setProfile((current) => ({...current, system, generated: false}));
  }, []);

  const generate = useCallback(() => {
    setProfile((current) => ({...current, generated: true}));
  }, []);

  const derived = useMemo(() => derive(profile), [profile]);

  const systemLabel = SYSTEMS.find((item) => item.key === profile.system)?.short ?? null;
  const concernLabel = CONCERNS.find((item) => item.key === profile.concern)?.label ?? null;

  return {profile, derived, systemLabel, concernLabel, setSystem, setConcern, generate};
}
