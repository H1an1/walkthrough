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

/* ──────────────────────────────────────────────
   Ch0 — PROLOGUE
   ────────────────────────────────────────────── */
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
          How we stopped designing layouts and started arming AI.
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Ch1 — OLD WORLD
   From markdown 范式转换 → 旧模式
   ────────────────────────────────────────────── */
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
          The designer as <span style={highlightPink}>director</span>.
        </div>
        <div style={bodyStyle}>
          You control every frame. You decide what goes where, how big, in what order. The page is your canvas. You deliver annotated specs, engineering builds exactly what you drew.
        </div>
        <div style={bodyStyle}>
          Look at the city below. Every building placed by hand, every block arranged with intention. Beautiful — but fragile. Change one requirement and the whole layout has to be redrawn.
        </div>
        <div style={italicStyle}>
          One designer, one layout, serving billions of queries. This was the old model.
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Ch2 — THE CEILING (天花板)
   ────────────────────────────────────────────── */
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
      <div style={{ ...glassCardStyle, maxWidth: '90vw', padding: '32px 40px' }}>
        <div style={tagStyle}>02 — The Ceiling</div>
        <div style={headingStyle}>
          There is no <span style={highlightPink}>perfect layout</span>.
        </div>
        <div style={{ ...bodyStyle, fontSize: '16px' }}>
          We spent months searching for the ideal image search layout. Waterfall, magazine, masonry, grid — 9 rounds of user research, 50+ proposals. Every layout had a fatal flaw. Users wanted contradictory things: waterfall for impact, magazine for scannability.
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
              "Sunset wallpaper"
            </div>
            <div style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.5 }}>
              Needs big visuals, emotional impact. One stunning image says it all.
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
              "iPhone 16 colors"
            </div>
            <div style={{ fontSize: '15px', color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.5 }}>
              Needs structured comparison, density, scannability. Many options, found fast.
            </div>
          </div>
        </div>
        <div style={{ ...bodyStyle, fontSize: '16px' }}>
          Completely different problems — but we were serving them with the same grid. This isn't a design problem. It's a <span style={highlightYellow}>model problem</span>.
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginTop: '8px',
            marginBottom: '16px',
          }}
        >
          {[
            { label: '"sunset wallpaper"', image: import.meta.env.BASE_URL + 'images/bing-sunset-wallpaper.png', color: 'var(--pink)' },
            { label: '"iphone 16 colors"', image: import.meta.env.BASE_URL + 'images/bing-iphone16-colors.png', color: 'var(--purple)' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                background: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <img
                src={item.image}
                alt={item.label}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
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
                  color: item.color,
                  background: 'rgba(0, 0, 0, 0.7)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        <div style={italicStyle}>
          Layout optimization had hit its ceiling. No amount of pixel-tuning would break through.
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Ch3 — THE SHIFT (范式转换)
   ────────────────────────────────────────────── */
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
      <div style={{ ...glassCardStyle, maxWidth: '90vw', padding: '32px 40px' }}>
        <div style={tagStyle}>03 — The Shift</div>
        <div style={headingStyle}>
          Stop designing <span style={highlightPink}>pages</span>. Start{' '}
          <span style={highlightYellow}>forging ammunition</span>.
        </div>
        <div style={{ ...bodyStyle, marginBottom: '20px', fontSize: '16px' }}>
          Watch the city break apart — every building becomes an independent module, free to be recombined. This isn't a small adjustment. It's a fundamental shift in what "design" means inside an AI product.
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '16px',
            margin: '24px 0',
          }}
        >
          {[
            {
              era: 'Old',
              role: 'Director',
              color: 'var(--pink)',
              desc: 'You control every frame. You decide placement, size, order. You deliver annotated specs.',
            },
            {
              era: 'Now',
              role: 'Arms Dealer',
              color: 'var(--purple)',
              desc: 'You forge precise, independent weapons. Then hand them to AI: the battlefield is yours.',
            },
            {
              era: 'Future',
              role: '?',
              color: 'var(--yellow)',
              desc: 'No more templates — just style, tone, visual principles. AI assembles UI from a vast style library.',
            },
          ].map((item) => (
            <div
              key={item.era}
              style={{
                padding: '22px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '14px',
                border: `1px solid ${item.color}22`,
                borderTop: `3px solid ${item.color}`,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {item.era} Model
              </div>
              <div
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: item.color,
                  marginBottom: '10px',
                }}
              >
                {item.role}
              </div>
              <div
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  lineHeight: 1.6,
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginTop: '16px',
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
                background: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <img
                src={comp.image}
                alt={comp.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
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

/* ──────────────────────────────────────────────
   Ch4 — THREE BULLETS (三颗子弹)
   ────────────────────────────────────────────── */
function Chapter4({ opacity }) {
  const ammo = [
    {
      title: 'Hero',
      subtitle: 'The Anchor',
      color: 'var(--pink)',
      desc: 'Someone searches "Eiffel Tower" — they don\'t need 50 thumbnails. They need one authoritative answer: yes, this is it. Hero confirms the core visual meaning of the query. Its power comes from focus, not density. From what you leave out, not what you cram in.',
    },
    {
      title: 'Category Selector',
      subtitle: 'The Navigator',
      color: 'var(--purple)',
      desc: '"2025 wedding dress" — the user isn\'t looking for one image. They\'re standing at a crossroads. A-line? Mermaid? Boho? Category Selector breaks a broad query into structured directions. It\'s not decoration — it\'s information architecture.',
    },
    {
      title: 'Swimlane',
      subtitle: 'The Explorer',
      color: 'var(--yellow)',
      desc: 'Search "jaguar" — you might want the car or the cat. These parallel meanings shouldn\'t be crammed into one grid. Swimlane lays them side by side — no forced choice, just all the possibilities spread out before you.',
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
          Three bullets. <span style={highlightYellow}>Each with a mission.</span>
        </div>
        <div style={{ ...bodyStyle, marginBottom: '12px' }}>
          Not three layouts — three <span style={highlightPurple}>behavioral units</span>. They form a chain: <strong style={{ color: '#fff' }}>Confirm → Decompose → Expand → Browse.</strong>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            marginBottom: '20px',
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
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '6px' }}>
                <div
                  style={{
                    fontFamily: 'var(--display)',
                    fontSize: '18px',
                    fontWeight: 700,
                    color: comp.color,
                  }}
                >
                  {comp.title}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.45)',
                    fontWeight: 600,
                  }}
                >
                  — {comp.subtitle}
                </div>
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

        <div style={italicStyle}>
          The traditional grid still lives at the bottom — the fallback for deep browsing. But above it, AI is orchestrating a structured answer in real time, assembling the right components for each query.
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Ch5 — DELIVERABLES CHANGED (交付物变了)
   ────────────────────────────────────────────── */
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
          The deliverable <span style={highlightPurple}>changed</span>.
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            margin: '24px 0',
          }}
        >
          <div
            style={{
              padding: '22px',
              background: 'rgba(240, 196, 226, 0.04)',
              borderRadius: '14px',
              border: '1px solid rgba(240, 196, 226, 0.1)',
            }}
          >
            <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--pink)', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase' }}>
              Before
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
              Annotated page layouts. One designer decides the experience for all queries.
            </div>
          </div>
          <div
            style={{
              padding: '22px',
              background: 'rgba(196, 181, 253, 0.04)',
              borderRadius: '14px',
              border: '1px solid rgba(196, 181, 253, 0.1)',
            }}
          >
            <div style={{ fontFamily: 'var(--mono)', fontSize: '12px', color: 'var(--purple)', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase' }}>
              After
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '15px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
              A contract between designer and AI renderer. The designer defines rules; AI decides the experience per query.
            </div>
          </div>
        </div>

        <div style={bodyStyle}>
          We went from designing final compositions to designing the <span style={highlightYellow}>grammar that generates infinite compositions</span>. The designer's job didn't shrink — it moved upstream. Less "what does this page look like" and more "what are the fundamental building blocks of visual understanding, and how should they behave."
        </div>
        <div style={italicStyle}>
          See how the city reassembles — same buildings, new order, clean grid. The components are the same. The system composes them.
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Ch6 — FROM SANDBOX TO BATTLEFIELD + THE BIGGER STORY
   (从沙盒到战场 + 更大的故事)
   ────────────────────────────────────────────── */
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
      <div style={{ ...glassCardStyle, maxWidth: '920px' }}>
        <div style={tagStyle}>06 — The Future</div>
        <div style={{ ...headingStyle, fontSize: '44px' }}>
          From sandbox to <span style={highlightPink}>battlefield</span>.{' '}
          <span style={{ color: 'var(--yellow)' }}>And beyond.</span>
        </div>
        <div style={bodyStyle}>
          We proved the system in Image Vertical — our sandbox, free from SERP's strict consistency rules. When Hero, Category, and Swimlane proved themselves, the question arose naturally: why doesn't SERP have this?
        </div>
        <div style={{ ...bodyStyle, fontSize: '16px' }}>
          SERP is a different beast. The biggest constraint: ACF consistency — no radical layout changes allowed. So we adapted surgically. Hero translated cleanly. Swimlane hit a wall — SERP won't allow two carousels — so we kept TopWide as the main section and added a single Carousel as supplement. Category Selector is the frontier we're pushing now: lightweight Chips + Image that SERP's constraints can accommodate.
        </div>
        <div style={bodyStyle}>
          Components designed for one surface are now <span style={highlightPurple}>adapting into a system shared across three</span>: Image Vertical, SERP, and GenIE. Same DNA, different mutations for different environments.
        </div>

        <div
          style={{
            margin: '24px 0',
            padding: '22px',
            borderRadius: '14px',
            background: 'rgba(253, 230, 138, 0.04)',
            border: '1px solid rgba(253, 230, 138, 0.12)',
          }}
        >
          <div style={{ fontFamily: 'var(--display)', fontSize: '20px', fontWeight: 700, color: 'var(--yellow)', marginBottom: '10px' }}>
            Copilot Mosaic
          </div>
          <div style={{ fontFamily: 'var(--sans)', fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
            A frontend platform where designers and engineers continuously build and accumulate templates — forming a rich enough style library for AI to choose from and compose, generating infinite possible interfaces. This is <span style={{ color: '#60c0ff' }}>A2UI</span> — from Ambition to User Interface.
          </div>
        </div>

        <div
          style={{
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
            Proven at Demo Day
          </div>
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Ch7 — FINALE
   From markdown ending quote
   ────────────────────────────────────────────── */
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
            fontSize: '56px',
            fontWeight: 700,
            lineHeight: 1.15,
            color: '#ffffff',
            marginBottom: '28px',
          }}
        >
          You're no longer a painter
          <br />
          painting frame by frame.
        </div>
        <div
          style={{
            fontFamily: 'var(--display)',
            fontSize: '56px',
            fontWeight: 700,
            lineHeight: 1.15,
            marginBottom: '36px',
          }}
        >
          You're the <span style={highlightPurple}>architect</span> of{' '}
          <span style={highlightYellow}>building blocks</span>.
          <br />
          <span style={{ fontSize: '32px', color: 'rgba(255,255,255,0.4)' }}>
            And the city builds itself.
          </span>
        </div>
        <div
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.45)',
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto 32px',
          }}
        >
          This is AI transformation. Not AI replacing designers — but designers learning to design for AI.
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
