import React from 'react';

const glassCardStyle = {
  background: 'rgba(6, 6, 10, 0.88)',
  backdropFilter: 'blur(44px)',
  borderRadius: '28px',
  border: '1px solid rgba(196, 181, 253, 0.1)',
  padding: '56px 64px',
  maxWidth: '760px',
  margin: '0 auto',
};

const tagStyle = {
  fontFamily: 'var(--mono)',
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--purple)',
  textTransform: 'uppercase',
  letterSpacing: '1.5px',
  marginBottom: '20px',
};

const headingStyle = {
  fontFamily: 'var(--display)',
  fontSize: '52px',
  fontWeight: 700,
  lineHeight: 1.15,
  color: '#ffffff',
  marginBottom: '20px',
};

const bodyStyle = {
  fontFamily: 'var(--sans)',
  fontSize: '18px',
  lineHeight: 1.7,
  color: 'rgba(255, 255, 255, 0.75)',
  marginBottom: '20px',
};

const italicStyle = {
  fontStyle: 'italic',
  color: 'rgba(255, 255, 255, 0.55)',
  fontSize: '17px',
};

const highlightPurple = { color: 'var(--purple)' };
const highlightPink = { color: 'var(--pink)' };
const highlightYellow = { color: 'var(--yellow)' };

function getChapterOpacity(scrollProgress, start, end) {
  const fadeLen = 0.02;
  
  if (scrollProgress < start) return 0;
  if (scrollProgress > end) return 0;
  
  if (scrollProgress < start + fadeLen) {
    return (scrollProgress - start) / fadeLen;
  }
  if (scrollProgress > end - fadeLen) {
    return (end - scrollProgress) / fadeLen;
  }
  
  return 1;
}

function Chapter0({ opacity }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transition: 'opacity 0.1s ease',
        pointerEvents: opacity > 0 ? 'auto' : 'none',
        zIndex: 5000 + Math.round(opacity * 100),
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '900px', padding: '40px' }}>
        <div
          style={{
            fontFamily: 'var(--display)',
            fontSize: '80px',
            fontWeight: 700,
            lineHeight: 1.05,
            color: '#ffffff',
            marginBottom: '28px',
          }}
        >
          From Pages to{' '}
          <span style={highlightPurple}>Ammunition</span>.
        </div>
        <div
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '22px',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          A design system that arms your frontend.
        </div>
      </div>
    </div>
  );
}

function Chapter1({ opacity }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transition: 'opacity 0.1s ease',
        pointerEvents: opacity > 0 ? 'auto' : 'none',
        zIndex: 5000 + Math.round(opacity * 100),
        padding: '40px 20px',
      }}
    >
      <div style={{ ...glassCardStyle }}>
        <div style={tagStyle}>01 — The Old World</div>
        <div style={headingStyle}>
          Designers <span style={highlightPink}>control</span> output.
        </div>
        <div style={bodyStyle}>
          In traditional design-to-dev handoffs, designers meticulously craft every pixel. They draw, annotate, deliver. Each page is a finished artifact. But pages don't scale. They fragment. They break.
        </div>
        <div style={bodyStyle}>
          Look at the city below. Every building placed by hand, every block arranged with intention. Beautiful — but fragile. Change one requirement and the whole layout has to be redrawn.
        </div>
        <div style={italicStyle}>
          The medium demanded control. Control demanded pages.
        </div>
      </div>
    </div>
  );
}

function Chapter2({ opacity }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transition: 'opacity 0.1s ease',
        pointerEvents: opacity > 0 ? 'auto' : 'none',
        zIndex: 5000 + Math.round(opacity * 100),
        padding: '40px 20px',
      }}
    >
      <div style={{ ...glassCardStyle }}>
        <div style={tagStyle}>02 — The Ceiling</div>
        <div style={headingStyle}>
          One layout can't serve <span style={highlightPink}>two masters</span>.
        </div>
        <div style={bodyStyle}>
          A cinematic product launch demands a hero-first, full-bleed visual hierarchy.
          A discovery page with 200 SKUs demands dense grids and filters.
          Same design system. Completely opposite needs.
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            margin: '28px 0',
          }}
        >
          <div
            style={{
              padding: '20px',
              background: 'rgba(240, 196, 226, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(240, 196, 226, 0.1)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '13px',
                color: 'var(--pink)',
                marginBottom: '6px',
                fontWeight: 600,
              }}
            >
              Campaign Launch
            </div>
            <div style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.5 }}>
              Needs emotion, impact, whitespace. One story, told loud.
            </div>
          </div>
          <div
            style={{
              padding: '20px',
              background: 'rgba(196, 181, 253, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(196, 181, 253, 0.1)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '13px',
                color: 'var(--purple)',
                marginBottom: '6px',
                fontWeight: 600,
              }}
            >
              Product Catalog
            </div>
            <div style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.5 }}>
              Needs density, structure, scannability. Many items, found fast.
            </div>
          </div>
        </div>
        <div style={bodyStyle}>
          When you design pages, you choose one. When you design <span style={highlightYellow}>components</span>, you serve both.
        </div>
        <div style={italicStyle}>
          The ceiling isn't skill. It's the medium itself.
        </div>
      </div>
    </div>
  );
}

function Chapter3({ opacity }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transition: 'opacity 0.1s ease',
        pointerEvents: opacity > 0 ? 'auto' : 'none',
        zIndex: 5000 + Math.round(opacity * 100),
        padding: '40px 20px',
      }}
    >
      <div style={{ ...glassCardStyle, maxWidth: '860px' }}>
        <div style={tagStyle}>03 — The Shift</div>
        <div style={headingStyle}>
          Stop designing <span style={highlightPink}>pages</span>. Start{' '}
          <span style={highlightYellow}>forging ammunition</span>.
        </div>
        <div style={{ ...bodyStyle, marginBottom: '32px' }}>
          The shift isn't subtle. It's architectural. Instead of pixel-perfect deliverables, we define components. Instead of one layout, we describe infinite possibilities. Watch the city break apart — every building becomes an independent module, free to be recombined.
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            marginBottom: '24px',
          }}
        >
          {[
            { name: 'HERO', image: import.meta.env.BASE_URL + 'images/hero.png' },
            { name: 'CATEGORY', image: import.meta.env.BASE_URL + 'images/category.png' },
            { name: 'SWIMLANE', image: import.meta.env.BASE_URL + 'images/swimlane.png' },
            { name: 'GRID', image: import.meta.env.BASE_URL + 'images/grid.png' },
          ].map((comp) => (
            <div
              key={comp.name}
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                aspectRatio: '16 / 10',
                background: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <img
                src={comp.image}
                alt={comp.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: '8px',
                  fontFamily: 'var(--mono)',
                  fontSize: '10px',
                  fontWeight: 700,
                  color: 'var(--purple)',
                  background: 'rgba(0, 0, 0, 0.6)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                {comp.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Chapter4({ opacity }) {
  const ammo = [
    {
      title: 'Hero',
      color: 'var(--pink)',
      role: 'The first thing you see.',
      desc: 'Full-bleed visual. One message, maximum impact. It sets emotional tone before a single product is shown. Campaigns live and die here.',
    },
    {
      title: 'Category',
      color: 'var(--purple)',
      role: 'The wayfinder.',
      desc: 'Tiles that map the territory. When users don\'t know what they want yet, categories give them a starting point — visual entry ramps into deeper content.',
    },
    {
      title: 'Swimlane',
      color: 'var(--yellow)',
      role: 'The horizontal storyteller.',
      desc: 'A scrollable row of curated items. It chains narrative: "If you liked this, keep going." Swimlanes turn browsing into a journey, not a dead end.',
    },
    {
      title: 'Grid',
      color: '#60c0ff',
      role: 'The completionist.',
      desc: 'When users want to see everything. Dense, scannable, filterable. The grid says: "Here\'s all of it. You decide." It trades emotion for efficiency.',
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transition: 'opacity 0.1s ease',
        pointerEvents: opacity > 0 ? 'auto' : 'none',
        zIndex: 5000 + Math.round(opacity * 100),
        padding: '40px 20px',
      }}
    >
      <div style={{ ...glassCardStyle, maxWidth: '960px' }}>
        <div style={tagStyle}>04 — The Ammunition</div>
        <div style={headingStyle}>
          Four components. <span style={highlightYellow}>Each one has a job.</span>
        </div>
        <div style={{ ...bodyStyle, marginBottom: '32px' }}>
          These aren't UI widgets. They're design intentions encoded as reusable building blocks. Each one solves a specific content problem — and together, they can compose any page.
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
          }}
        >
          {ammo.map((comp, idx) => (
            <div
              key={idx}
              style={{
                padding: '22px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '14px',
                border: `1px solid ${comp.color}22`,
                borderLeft: `3px solid ${comp.color}`,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: '18px',
                  fontWeight: 700,
                  color: comp.color,
                  marginBottom: '4px',
                }}
              >
                {comp.title}
              </div>
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '10px',
                  fontWeight: 600,
                }}
              >
                {comp.role}
              </div>
              <div
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  lineHeight: 1.6,
                }}
              >
                {comp.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Chapter5({ opacity }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transition: 'opacity 0.1s ease',
        pointerEvents: opacity > 0 ? 'auto' : 'none',
        zIndex: 5000 + Math.round(opacity * 100),
        padding: '40px 20px',
      }}
    >
      <div style={{ ...glassCardStyle, maxWidth: '900px' }}>
        <div style={tagStyle}>05 — The New World</div>
        <div style={headingStyle}>
          Same components. <span style={highlightPurple}>Three different pages.</span>
        </div>
        <div style={{ ...bodyStyle, marginBottom: '28px' }}>
          The designer doesn't draw three layouts. The designer defines four components and their rules. The system does the rest.
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '16px',
            marginBottom: '28px',
          }}
        >
          {[
            {
              label: 'Campaign Page',
              stack: ['Hero', 'Swimlane', 'Swimlane'],
              accent: 'var(--pink)',
              desc: 'Emotion-first. Big visual, curated flow.',
            },
            {
              label: 'Browse Page',
              stack: ['Category', 'Grid', 'Swimlane'],
              accent: 'var(--purple)',
              desc: 'Structure-first. Navigate, then explore.',
            },
            {
              label: 'Search Results',
              stack: ['Grid', 'Grid', 'Category'],
              accent: 'var(--yellow)',
              desc: 'Density-first. Show everything, fast.',
            },
          ].map((page, idx) => (
            <div
              key={idx}
              style={{
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '14px',
                border: `1px solid ${page.accent}22`,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: page.accent,
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {page.label}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
                {page.stack.map((comp, i) => (
                  <div
                    key={i}
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '11px',
                      color: 'rgba(255, 255, 255, 0.5)',
                      padding: '6px 10px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      borderRadius: '6px',
                      borderLeft: `2px solid ${page.accent}44`,
                    }}
                  >
                    {'<'}{comp}{' />'}
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', lineHeight: 1.5 }}>
                {page.desc}
              </div>
            </div>
          ))}
        </div>
        <div style={italicStyle}>
          See how the city reassembles — same buildings, new order, clean grid. Four building blocks. Infinite pages. Zero new design work per page.
        </div>
      </div>
    </div>
  );
}

function Chapter6({ opacity }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transition: 'opacity 0.1s ease',
        pointerEvents: opacity > 0 ? 'auto' : 'none',
        zIndex: 5000 + Math.round(opacity * 100),
        padding: '40px 20px',
      }}
    >
      <div style={{ ...glassCardStyle, maxWidth: '900px' }}>
        <div style={tagStyle}>06 — The Future</div>
        <div style={{ ...headingStyle, color: 'var(--yellow)' }}>
          Copilot Mosaic.
        </div>
        <div style={bodyStyle}>
          We have four components and the rules for combining them. The next question is: what if the system could compose pages <span style={highlightYellow}>by itself</span>?
        </div>
        <div style={bodyStyle}>
          Copilot Mosaic is the AI-powered layout engine that takes our ammunition and assembles it autonomously. Feed it content — product data, editorial assets, campaign briefs — and it generates page compositions that respect the design system's rules without a designer touching a single frame.
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            margin: '28px 0',
          }}
        >
          <div style={{
            padding: '18px',
            borderRadius: '12px',
            background: 'rgba(253, 230, 138, 0.04)',
            border: '1px solid rgba(253, 230, 138, 0.12)',
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--yellow)', fontWeight: 700, marginBottom: '8px' }}>
              INPUT
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'rgba(255, 255, 255, 0.55)', lineHeight: 1.6 }}>
              Content brief, product feed, campaign metadata, audience segment
            </div>
          </div>
          <div style={{
            padding: '18px',
            borderRadius: '12px',
            background: 'rgba(96, 192, 255, 0.04)',
            border: '1px solid rgba(96, 192, 255, 0.12)',
          }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: '#60c0ff', fontWeight: 700, marginBottom: '8px' }}>
              OUTPUT
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'rgba(255, 255, 255, 0.55)', lineHeight: 1.6 }}>
              Production-ready page compositions using Hero, Category, Swimlane, Grid
            </div>
          </div>
        </div>

        <div style={bodyStyle}>
          This is <span style={{ color: '#60c0ff' }}>A2UI</span> — From Ambition to User Interface. The designer's role evolves: from drawing layouts to training the system that draws them.
        </div>

        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '16px',
            borderRadius: '12px',
            background: 'rgba(253, 230, 138, 0.05)',
            border: '1px solid rgba(253, 230, 138, 0.1)',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--yellow)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          <style>{`
            @keyframes pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.4; }
            }
          `}</style>
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--yellow)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Coming to Demo Day
          </div>
        </div>
      </div>
    </div>
  );
}

function Chapter7({ opacity }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transition: 'opacity 0.1s ease',
        pointerEvents: opacity > 0 ? 'auto' : 'none',
        zIndex: 5000 + Math.round(opacity * 100),
        padding: '40px 20px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '900px' }}>
        <div
          style={{
            fontFamily: 'var(--display)',
            fontSize: '68px',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#ffffff',
            marginBottom: '36px',
          }}
        >
          We didn't redesign a page.
          <br />
          We <span style={highlightPurple}>armed an engine</span>.
          <br />
          <span style={{ fontSize: '32px', color: 'rgba(255,255,255,0.4)' }}>And the city rebuilt itself.</span>
        </div>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.3)',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}
        >
          End of walkthrough
        </div>
      </div>
    </div>
  );
}

export default function ChapterOverlay({ scrollProgress = 0, chapters = [], activeIdx = -1 }) {
  const chapterConfigs = [
    { start: 0.0, end: 0.12 },
    { start: 0.12, end: 0.24 },
    { start: 0.24, end: 0.36 },
    { start: 0.36, end: 0.48 },
    { start: 0.48, end: 0.6 },
    { start: 0.6, end: 0.72 },
    { start: 0.72, end: 0.84 },
    { start: 0.84, end: 1.0 },
  ];

  const chapterComponents = [
    Chapter0,
    Chapter1,
    Chapter2,
    Chapter3,
    Chapter4,
    Chapter5,
    Chapter6,
    Chapter7,
  ];

  return (
    <>
      {chapterComponents.map((ChapterComponent, idx) => {
        const config = chapterConfigs[idx];
        const opacity = getChapterOpacity(scrollProgress, config.start, config.end);
        return (
          <ChapterComponent key={idx} opacity={opacity} />
        );
      })}
    </>
  );
}
