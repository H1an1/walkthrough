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
          From Blueprints to{' '}
          <span style={highlightPurple}>Building Blocks</span>.
        </div>
        <div
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '22px',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.6)',
          }}
        >
          How we stopped planning cities and started forging the blocks that build them.
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Ch1 — THE MASTER ARCHITECT
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
        <div style={tagStyle}>01 — The Old City</div>
        <div style={headingStyle}>
          The master <span style={highlightPink}>architect</span>.
        </div>
        <div style={bodyStyle}>
          In the old world, you designed the entire city. Every building placed by hand, every street drawn to spec. One architect, one blueprint, one grand vision — handed off to engineering, built exactly as drawn.
        </div>
        <div style={bodyStyle}>
          Look at the city below. Every block arranged with intention. Beautiful — but change one zoning rule and the whole plan has to be redrawn.
        </div>
        <div style={italicStyle}>
          One architect. One blueprint. Serving billions of visitors. This was the old model.
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
          There is no <span style={highlightPink}>perfect city plan</span>.
        </div>
        <div style={{ ...bodyStyle, fontSize: '16px' }}>
          We spent months trying to design the perfect city. Waterfall districts, magazine quarters, masonry grids — countless rounds of UX Labs, 50+ blueprints. Every plan had a fatal flaw. Residents wanted contradictory things: wide boulevards for scenic views, dense blocks for fast navigation.
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
              Needs wide boulevards and scenic overlooks. One stunning view says it all.
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
              Needs a dense showroom with everything on display. Many options, found fast.
            </div>
          </div>
        </div>
        <div style={{ ...bodyStyle, fontSize: '16px' }}>
          A tourist district and a financial district have completely different needs — but we were building them with the same blueprint. This isn't an architecture problem. It's a <span style={highlightYellow}>city planning problem</span>.
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
          No amount of urban planning would break through this ceiling. The blueprint had reached its limit.
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
          Stop drawing <span style={highlightPink}>blueprints</span>. Start{' '}
          <span style={highlightYellow}>forging blocks</span>.
        </div>
        <div style={{ ...bodyStyle, marginBottom: '20px', fontSize: '16px' }}>
          Watch the city break apart — every building becomes an independent block, free to be reassembled. This isn't a renovation. It's a fundamental shift in what "city planning" means.
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
              role: 'Master Architect',
              color: 'var(--pink)',
              desc: 'You design the whole city. Every building, every street, every block. You hand off the blueprint, engineering builds exactly what you drew.',
            },
            {
              era: 'Now',
              role: 'Block Maker',
              color: 'var(--purple)',
              desc: 'You forge precise, independent building blocks. Then hand them to AI and say: build the city.',
            },
            {
              era: 'Future',
              role: 'City DNA',
              color: 'var(--yellow)',
              desc: 'No more blueprints — just define the city\'s character: style, density, rhythm. AI assembles the skyline from a vast library of blocks.',
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
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Ch4 — THREE BUILDING BLOCKS (三颗子弹)
   ────────────────────────────────────────────── */
function Chapter4({ opacity }) {
  const ammo = [
    {
      title: 'Hero',
      subtitle: 'The Landmark',
      color: 'var(--pink)',
      desc: 'Someone searches "Eiffel Tower" — they don\'t need a whole neighborhood of thumbnails. They need one unmistakable landmark that says: yes, this is it. Hero anchors the city. Its power comes from what you leave out, not what you cram in.',
    },
    {
      title: 'Category Selector',
      subtitle: 'The Crossroads',
      color: 'var(--purple)',
      desc: '"2025 wedding dress" — the visitor stands at an intersection. A-line avenue? Mermaid lane? Boho boulevard? Category Selector maps the routes through the city. It\'s not decoration — it\'s the city\'s wayfinding system.',
    },
    {
      title: 'Swimlane',
      subtitle: 'The Avenue',
      color: 'var(--yellow)',
      desc: 'Search "jaguar" — one avenue leads to the dealership, another to the nature preserve. Parallel streets for parallel meanings. No forced turns, just all the paths spread out before you.',
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
      <div style={{ ...glassCardStyle, maxWidth: '90vw', padding: '32px 40px' }}>
        <div style={tagStyle}>04 — The Building Blocks</div>
        <div style={headingStyle}>
          Three blocks. <span style={highlightYellow}>Each with a purpose.</span>
        </div>
        <div style={{ ...bodyStyle, marginBottom: '12px' }}>
          Not three city plans — three <span style={highlightPurple}>types of city blocks</span>, each solving a different urban problem. Together they form a chain: <strong style={{ color: '#fff' }}>Anchor → Navigate → Explore → Browse.</strong>
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '12px',
            marginTop: '16px',
            marginBottom: '16px',
          }}
        >
          {[
            { name: 'HERO', image: import.meta.env.BASE_URL + 'images/hero.png', color: 'var(--pink)' },
            { name: 'CATEGORY', image: import.meta.env.BASE_URL + 'images/category.png', color: 'var(--purple)' },
            { name: 'SWIMLANE', image: import.meta.env.BASE_URL + 'images/swimlane.png', color: 'var(--yellow)' },
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
                  color: comp.color,
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

        <div style={italicStyle}>
          The old grid still lives at the bottom — the fallback for deep browsing. But above it, AI is assembling a new cityscape in real time, choosing the right blocks for each visitor.
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
        <div style={tagStyle}>05 — The New City</div>
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
              A finished city blueprint. One architect decides the entire layout for every visitor.
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
              A building code. The architect defines the blocks and rules; AI builds a different city for every visitor.
            </div>
          </div>
        </div>

        <div style={bodyStyle}>
          We went from designing finished cities to designing the <span style={highlightYellow}>building code that generates infinite cities</span>. The architect's job didn't shrink — it moved upstream. Less "what does this city look like" and more "what are the fundamental blocks, and how should they connect."
        </div>
        <div style={italicStyle}>
          See how the city reassembles — same blocks, new arrangement, clean grid. The pieces are the same. The system composes them.
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Ch6 — FROM SANDBOX TO BATTLEFIELD (从沙盒到战场)
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
      <div style={{ ...glassCardStyle, maxWidth: '90vw', padding: '32px 40px' }}>
        <div style={tagStyle}>06 — From District to Metropolis</div>
        <div style={headingStyle}>
          From one district to the <span style={highlightPink}>whole city</span>.
        </div>
        <div style={{ ...bodyStyle, fontSize: '16px' }}>
          We proved the blocks worked in Image Vertical — our test district, free from the main city's strict zoning laws. When Landmark, Crossroads, and Avenue proved themselves, the question arose: why doesn't the main city have these?
        </div>
        <div style={{ ...bodyStyle, fontSize: '16px' }}>
          But SERP is a different district with different rules. The biggest constraint: no radical rezoning allowed. So we adapted surgically. Hero transplanted cleanly. Swimlane hit a wall — the main district won't allow two parallel avenues — so we kept TopWide as the main street and added a single Carousel lane. Category Selector is the frontier: lightweight Chips + Image that the zoning code can accommodate.
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '12px',
            margin: '20px 0',
          }}
        >
          {[
            { name: 'HERO → SERP', image: import.meta.env.BASE_URL + 'images/serp-hero.png', color: 'var(--pink)' },
            { name: 'CAROUSEL → SERP', image: import.meta.env.BASE_URL + 'images/serp-carousel.png', color: 'var(--purple)' },
            { name: 'CATEGORY → SERP', image: import.meta.env.BASE_URL + 'images/serp-category.png', color: 'var(--yellow)' },
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
                  color: comp.color,
                  background: 'rgba(0, 0, 0, 0.7)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                }}
              >
                {comp.name}
              </div>
            </div>
          ))}
        </div>

        <div style={italicStyle}>
          Blocks designed for one district are now adapting into a system shared across three: Image Vertical, SERP, and GenIE. Same DNA, different neighborhoods.
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   Ch7 — AND BEYOND (更大的故事)
   Left-right layout: images left, text right
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
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transition: 'opacity 0.1s ease',
        pointerEvents: opacity > 0 ? 'auto' : 'none',
        zIndex: 5000 + Math.round(opacity * 100),
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          ...glassCardStyle,
          maxWidth: '92vw',
          padding: '32px 36px',
          display: 'flex',
          gap: '32px',
          alignItems: 'stretch',
        }}
      >
        {/* ── LEFT: Images ── */}
        <div
          style={{
            flex: '0 0 50%',
            display: 'flex',
            gap: '10px',
            minHeight: 0,
          }}
        >
          {/* Tall image on the left */}
          <div
            style={{
              flex: '1 1 40%',
              borderRadius: '12px',
              overflow: 'hidden',
              background: 'rgba(0, 0, 0, 0.4)',
            }}
          >
            <img
              src={import.meta.env.BASE_URL + 'images/beyond-frame.png'}
              alt="AI-generated page"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
          {/* Two images stacked on the right */}
          <div
            style={{
              flex: '1 1 60%',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div
              style={{
                flex: 1,
                borderRadius: '12px',
                overflow: 'hidden',
                background: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <img
                src={import.meta.env.BASE_URL + 'images/beyond-tall.png'}
                alt="SERP AI layout"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                borderRadius: '12px',
                overflow: 'hidden',
                background: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <img
                src={import.meta.env.BASE_URL + 'images/beyond-group.png'}
                alt="Copilot Mosaic UI"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>

        {/* ── RIGHT: Text ── */}
        <div
          style={{
            flex: '0 0 45%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={tagStyle}>07 — And Beyond</div>
          <div style={{ ...headingStyle, fontSize: '44px', color: 'var(--yellow)' }}>
            And Beyond.
          </div>
          <div style={{ ...bodyStyle, fontSize: '16px' }}>
            This isn't just about one city. It's about what happens to architecture when AI enters the loop.
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              margin: '20px 0',
            }}
          >
            {[
              { era: 'Old World', desc: 'Architects draw every street. One blueprint, one city.', color: 'var(--pink)' },
              { era: 'New World', desc: 'Architects forge building blocks. AI assembles a unique city for every visitor.', color: 'var(--purple)' },
              { era: 'Future', desc: 'Define the city\'s soul — style, rhythm, character. AI generates the skyline. A2UI.', color: 'var(--yellow)' },
            ].map((item) => (
              <div
                key={item.era}
                style={{
                  padding: '14px 16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '10px',
                  border: `1px solid ${item.color}22`,
                  borderLeft: `3px solid ${item.color}`,
                }}
              >
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: item.color, fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {item.era}
                </div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: '16px',
              borderRadius: '10px',
              background: 'rgba(253, 230, 138, 0.04)',
              border: '1px solid rgba(253, 230, 138, 0.12)',
              marginBottom: '16px',
            }}
          >
            <div style={{ fontFamily: 'var(--display)', fontSize: '17px', fontWeight: 700, color: 'var(--yellow)', marginBottom: '6px' }}>
              Copilot Mosaic
            </div>
            <div style={{ fontFamily: 'var(--sans)', fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
              The city that builds itself. A platform where architects and engineers continuously forge blocks — forming a library rich enough for AI to compose infinite skylines. This is <span style={{ color: '#60c0ff' }}>A2UI</span> — from Ambition to User Interface.
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 14px',
              borderRadius: '10px',
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
    </div>
  );
}

/* ──────────────────────────────────────────────
   Ch8 — FINALE
   ────────────────────────────────────────────── */
function Chapter8({ opacity }) {
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
          You're no longer drawing
          <br />
          every street by hand.
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
          This is AI transformation. Not AI replacing architects — but architects learning to design for AI.
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
    { start: 0.0, end: 0.11 },
    { start: 0.11, end: 0.22 },
    { start: 0.22, end: 0.33 },
    { start: 0.33, end: 0.44 },
    { start: 0.44, end: 0.55 },
    { start: 0.55, end: 0.66 },
    { start: 0.66, end: 0.77 },
    { start: 0.77, end: 0.88 },
    { start: 0.88, end: 1.0 },
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
    Chapter8,
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
