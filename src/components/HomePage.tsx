'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'motion/react';
import { home } from '@/content';

// ─── Stats row (inline counter logic, no content prop drilling) ──────────────
function StatsRow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const targets = home.stats.map((s) => s.value);
  const [counts, setCounts] = useState(targets.map(() => 0));

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const intervals = targets.map((target, i) => {
      const step = Math.ceil(target / (duration / 16));
      return setInterval(() => {
        setCounts((prev) => {
          const next = [...prev];
          if (next[i] >= target) return prev;
          next[i] = Math.min(next[i] + step, target);
          return next;
        });
      }, 16);
    });
    return () => intervals.forEach(clearInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 gap-px" style={{ borderTop: '1px solid rgba(245,166,35,0.15)' }}>
      {home.stats.map((stat, i) => (
        <div key={stat.id} className="pt-8 pb-4 text-center">
          <p className="text-4xl md:text-5xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--primary))' }}>
            {counts[i].toLocaleString()}<span>{stat.suffix}</span>
          </p>
          <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Animated network mesh (canvas) ──────────────────────────────────────────
function NetworkMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const nodes: { x: number; y: number; vx: number; vy: number; r: number; pulse: number; phase: number }[] = [];
    const NODE_COUNT = 38;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2.5 + 1.5,
        pulse: Math.random(),
        phase: Math.random() * Math.PI * 2,
      });
    }

    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update positions
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        n.pulse = (Math.sin(t * 1.2 + n.phase) + 1) / 2;
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 160;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(245,166,35,${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4 + n.pulse * 6);
        glow.addColorStop(0, `rgba(245,166,35,${0.7 + n.pulse * 0.3})`);
        glow.addColorStop(0.4, `rgba(245,166,35,${0.15 + n.pulse * 0.1})`);
        glow.addColorStop(1, 'rgba(245,166,35,0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4 + n.pulse * 6, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245,166,35,${0.8 + n.pulse * 0.2})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.55 }}
      aria-hidden="true"
    />
  );
}

// ─── Fade-up variant ──────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <main>
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          className="relative min-h-screen flex flex-col justify-center overflow-hidden"
          style={{ background: '#0F1117' }}
        >
          <NetworkMesh />

          {/* Radial glow center */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 60%, rgba(245,166,35,0.07) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 container mx-auto px-6 pt-32 pb-24 flex flex-col items-center text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="max-w-4xl"
            >
              <motion.p
                variants={fadeUp}
                className="text-xs font-semibold uppercase tracking-widest mb-6"
                style={{ color: 'hsl(var(--primary))' }}
              >
                melki.ai
              </motion.p>

              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-6"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--card-foreground))' }}
              >
                {home.hero.headline}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed"
                style={{ color: 'hsl(var(--muted-foreground))' }}
              >
                {home.hero.subheadline}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
                  style={{ background: 'hsl(var(--primary))', color: '#0F1117' }}
                >
                  {home.hero.ctaPrimary}
                </Link>
                <Link
                  href="/how-it-works"
                  className="px-8 py-3.5 rounded-full font-semibold text-sm border transition-all duration-200 hover:-translate-y-0.5"
                  style={{ borderColor: 'rgba(245,166,35,0.4)', color: 'hsl(var(--card-foreground))' }}
                >
                  {home.hero.ctaSecondary}
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Stats row */}
          <div className="relative z-10 container mx-auto px-6 pb-20">
            <StatsRow />
          </div>
        </section>

        {/* ── MISSION ──────────────────────────────────────────────────────── */}
        <section className="py-xxl" style={{ background: '#0F1117' }}>
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              {/* Pull quote */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
              >
                <div
                  className="w-12 h-1 mb-8 rounded-full"
                  style={{ background: 'hsl(var(--primary))' }}
                />
                <blockquote
                  className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                  style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--card-foreground))' }}
                >
                  "{home.mission.pullQuote}"
                </blockquote>
              </motion.div>

              {/* Body paragraphs */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={stagger}
                className="flex flex-col gap-6 pt-2 lg:pt-16"
              >
                {home.mission.body.map((para) => (
                  <motion.p
                    key={para.id}
                    variants={fadeUp}
                    className="text-base md:text-lg leading-relaxed"
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                  >
                    {para.text}
                  </motion.p>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
        <section className="py-xxl" style={{ background: 'hsl(var(--card))' }}>
          <div className="container mx-auto px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              className="mb-16"
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'hsl(var(--primary))' }}
              >
                How It Works
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--card-foreground))' }}
              >
                From connection to community.
              </h2>
            </motion.div>

            <div className="flex flex-col gap-0">
              {home.steps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={fadeUp}
                  className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-12 py-12 relative"
                  style={{
                    borderTop: idx === 0 ? '1px solid rgba(245,166,35,0.12)' : '1px solid rgba(245,166,35,0.12)',
                  }}
                >
                  {/* Oversized number */}
                  <div className="overflow-hidden">
                    <span
                      className="block font-bold leading-none select-none"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(4rem, 10vw, 7rem)',
                        color: 'hsl(var(--primary))',
                        opacity: 0.9,
                        lineHeight: 1,
                      }}
                    >
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center gap-3">
                    <h3
                      className="text-xl md:text-2xl font-bold"
                      style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--card-foreground))' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-base leading-relaxed max-w-xl"
                      style={{ color: 'hsl(var(--muted-foreground))' }}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VISION ───────────────────────────────────────────────────────── */}
        <section className="py-xxl" style={{ background: '#0F1117' }}>
          <div className="container mx-auto px-6">
            {/* Amber rule */}
            <div
              className="w-16 h-0.5 mx-auto mb-16 rounded-full"
              style={{ background: 'hsl(var(--primary))' }}
            />

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-center max-w-3xl mx-auto mb-20 leading-tight"
              style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--card-foreground))' }}
            >
              {home.vision.statement}
            </motion.h2>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={stagger}
              className="grid grid-cols-1 sm:grid-cols-2 gap-px"
              style={{ border: '1px solid rgba(245,166,35,0.1)' }}
            >
              {home.vision.values.map((val) => (
                <motion.div
                  key={val.id}
                  variants={fadeUp}
                  className="p-8 md:p-10 group transition-colors duration-300"
                  style={{ background: 'rgba(22,25,32,0.6)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(245,166,35,0.05)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.background = 'rgba(22,25,32,0.6)'; }}
                >
                  <h3
                    className="text-lg font-bold mb-3"
                    style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--primary))' }}
                  >
                    {val.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'hsl(var(--muted-foreground))' }}
                  >
                    {val.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section
          className="py-xxl relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, #c47d10 60%, #8a5500 100%)',
          }}
        >
          {/* Subtle texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 80% at 80% 50%, rgba(255,255,255,0.06) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Headline */}
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                style={{ fontFamily: 'var(--font-heading)', color: '#0F1117' }}
              >
                {home.cta.headline}
              </motion.h2>

              {/* CTAs */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={stagger}
                className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end"
              >
                <motion.div variants={fadeUp}>
                  <Link
                    href="/contact"
                    className="inline-block px-8 py-4 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                    style={{ background: '#0F1117', color: 'hsl(var(--primary))' }}
                  >
                    {home.cta.ctaPrimary}
                  </Link>
                </motion.div>
                <motion.div variants={fadeUp}>
                  <Link
                    href="/contact"
                    className="inline-block px-8 py-4 rounded-full font-semibold text-sm border-2 transition-all duration-200 hover:-translate-y-0.5"
                    style={{ borderColor: 'rgba(15,17,23,0.3)', color: '#0F1117' }}
                  >
                    {home.cta.ctaSecondary}
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
