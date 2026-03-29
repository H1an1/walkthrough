import React from 'react';

const glassCardStyle = {
  background: 'rgba(6, 6, 10, 0.86)',
  backdropFilter: 'blur(44px)',
  borderRadius: '24px',
  border: '1px solid rgba(196, 181, 253, 0.1)',
  padding: '48px',
  maxWidth: '600px',
  margin: '0 auto',
};

const tagStyle = {
  fontFamily: 'var(--mono)',
  fontSize: '11px',
  fontWeight: 600,
  color: 'var(--purple)',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: '16px',
};

const headingStyle = {
  fontFamily: 'var(--display)',
  fontSize: '42px',
  fontWeight: 700,
  lineHeight: 1.2,
  color: '#ffffff',
  marginBottom: '16px',
};

const bodyStyle = {
  fontFamily: 'var(--sans)',
  fontSize: '15px',
  lineHeight: 1.6,
  color: 'rgba(255, 255, 255, 0.7)',
  marginBottom: '16px',
};

const italicStyle = {
  fontStyle: 'italic',
  color: 'rgba(255, 255, 255, 0.5)',
  fontSize: '14px',
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
      <div style={{ textAlign: 'center', maxWidth: '700px', padding: '40px' }}>
        <div
          style={{
            fontFamily: 'var(--display)',
            fontSize: '64px',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#ffffff',
            marginBottom: '24px',
          }}
        >
          From Pages to{' '}
          <span style={highlightPurple}>Ammunition</span>.
        </div>
        <div
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '18px',
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
          Same grid. Completely different problems.
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '24px',
            margin: '32px 0',
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
                fontSize: '12px',
                color: 'var(--pink)',
                marginBottom: '8px',
              }}
            >
              Sunset Wallpaper
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
              Needs impact
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
                fontSize: '12px',
                color: 'var(--purple)',
                marginBottom: '8px',
              }}
            >
              iPhone 16 Colors
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.6)' }}>
              Needs structure
            </div>
          </div>
        </div>
        <div style={bodyStyle}>
          One perfect layout? <span style={highlightYellow}>It doesn't exist.</span>
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
      <div style={{ ...glassCardStyle, maxWidth: '700px' }}>
        <div style={tagStyle}>03 — The Shift</div>
        <div style={headingStyle}>
          Stop designing <span style={highlightPink}>pages</span>. Start{' '}
          <span style={highlightYellow}>forging ammunition</span>.
        </div>
        <div style={{ ...bodyStyle, marginBottom: '32px' }}>
          The shift isn't subtle. It's architectural. Instead of pixel-perfect deliverables, we define components. Instead of one layout, we describe infinite possibilities.
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
            { name: 'HERO', image: '/images/hero.png' },
            { name: 'CATEGORY', image: '/images/category.png' },
            { name: 'SWIMLANE', image: '/images/swimlane.png' },
            { name: 'GRID', image: '/images/grid.png' },
          ].map((comp) => (
            <div
              key={comp.name}
              style={{
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden',
                aspectRatio: '1',
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
      <div style={{ ...glassCardStyle, maxWidth: '800px' }}>
        <div style={tagStyle}>04 — The Ammunition</div>
        <div style={headingStyle}>
          Four components. Infinite combinations.
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: '16px',
            marginTop: '32px',
          }}
        >
          {[
            { title: 'Hero', subtitle: 'The Impact Maker', desc: 'Commands attention' },
            { title: 'Category', subtitle: 'The Navigator', desc: 'Guides exploration' },
            { title: 'Swimlane', subtitle: 'The Storyteller', desc: 'Chains narrative' },
            { title: 'Grid', subtitle: 'The Completionist', desc: 'Maps abundance' },
          ].map((comp, idx) => (
            <div
              key={idx}
              style={{
                padding: '20px',
                background: 'rgba(196, 181, 253, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(196, 181, 253, 0.1)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--display)',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--purple)',
                  marginBottom: '4px',
                }}
              >
                {comp.title}
              </div>
              <div
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '8px',
                }}
              >
                {comp.subtitle}
              </div>
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '11px',
                  color: 'rgba(255, 255, 255, 0.4)',
                  fontStyle: 'italic',
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
      <div style={{ ...glassCardStyle, maxWidth: '700px' }}>
        <div style={tagStyle}>05 — The New World</div>
        <div style={headingStyle}>
          Designers define the <span style={highlightPurple}>possibility space</span>.
        </div>
        <div style={bodyStyle}>
          The shift is radical. Designers no longer think in pages. We build components. We define rules. We trust the system to generate infinite layouts that serve any content, any context, any screen.
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '12px',
            marginTop: '28px',
          }}
        >
          <div
            style={{
              padding: '16px',
              borderRadius: '8px',
              border: '1px solid rgba(200, 200, 200, 0.1)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              Old World
            </div>
          </div>
          <div
            style={{
              padding: '16px',
              borderRadius: '8px',
              border: `1px solid var(--purple)`,
              textAlign: 'center',
              background: 'rgba(196, 181, 253, 0.05)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                color: 'var(--purple)',
                fontWeight: 600,
              }}
            >
              New World
            </div>
          </div>
          <div
            style={{
              padding: '16px',
              borderRadius: '8px',
              border: `1px solid var(--yellow)`,
              textAlign: 'center',
              background: 'rgba(253, 230, 138, 0.05)',
            }}
          >
            <div
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                color: 'var(--yellow)',
                fontWeight: 600,
              }}
            >
              Future
            </div>
          </div>
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
      <div style={{ ...glassCardStyle, maxWidth: '700px' }}>
        <div style={tagStyle}>06 — The Future</div>
        <div style={{ ...headingStyle, color: 'var(--yellow)' }}>
          Copilot Mosaic.
        </div>
        <div style={bodyStyle}>
          The frontend platform for templates. A system that doesn't just organize components, but generates them. Designs emerge from possibility, not prescription.
        </div>
        <div style={{ ...bodyStyle, marginTop: '20px' }}>
          Coming to Demo Day. Featured on A2UI — From Ambition to Interface.
        </div>

        <div
          style={{
            marginTop: '32px',
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
            A2UI — From Ambition to Interface
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
      <div style={{ textAlign: 'center', maxWidth: '700px' }}>
        <div
          style={{
            fontFamily: 'var(--display)',
            fontSize: '52px',
            fontWeight: 700,
            lineHeight: 1.1,
            color: '#ffffff',
            marginBottom: '32px',
          }}
        >
          We didn't redesign a page.
          <br />
          We <span style={highlightPurple}>armed an engine</span>.
        </div>
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.3)',
            letterSpacing: '1px',
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
