import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import qrUPI from "./assets/upi-qr.png"; // change name if your file is different

// Sections for navbar highlighting
const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "download", label: "Download" },
  { id: "howto", label: "Setup" },
  { id: "donation", label: "Donate" },
  { id: "support", label: "Support" },
  { id: "feedback", label: "Feedback" },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" },
  }),
};

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Active section highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Linear-style spotlight following mouse
  useEffect(() => {
    const handleMove = (e) => {
      setSpotlightPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-darkBg text-slate-50 font-sans relative overflow-x-hidden">
      {/* Background gradients + spotlight */}
      <div className="pointer-events-none fixed inset-0 -z-20">
        {/* base gradients */}
        <div className="absolute -top-64 -left-32 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute top-40 right-10 h-[28rem] w-[28rem] rounded-full bg-secondary/25 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-purple-500/25 blur-3xl" />
      </div>

      {/* spotlight */}
      <div className="pointer-events-none fixed inset-0 -z-10 mix-blend-screen">
        <div
          style={{
            background: `radial-gradient(circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(129, 140, 248, 0.32), transparent 55%)`,
          }}
          className="w-full h-full"
        />
      </div>

      {/* Scroll progress bar */}
      <motion.div
        style={{ width: progressWidth }}
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-secondary to-violet-500 z-40"
      />

      {/* NAVBAR */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-black/40 border-b border-white/5">
        <div className="px-6 lg:px-12 xl:px-16 py-3 flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold shadow-[0_0_25px_rgba(59,130,246,0.6)]">
              L+
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">LPU AutoLogin +</p>
              {/* <p className="text-[11px] text-slate-400">
                Wi-Fi Auto Login Extension
              </p> */}
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-2 lg:gap-3 text-xs lg:text-sm">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`px-4 py-1.5 rounded-full transition-all duration-200 ${
                  activeSection === s.id
                    ? "bg-white/10 text-white shadow-[0_0_24px_rgba(148,163,253,0.45)] border border-white/15"
                    : "text-slate-300 hover:bg-white/5 hover:text-white border border-transparent"
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* MAIN */}
      <main className="px-6 lg:px-12 xl:px-24 pb-20 space-y-32 lg:space-y-40">
        {/* HERO */}
        <section
          id="hero"
          className="pt-14 lg:pt-20 2xl:pt-24 grid lg:grid-cols-[1.3fr,1fr] gap-12 items-center min-h-[78vh]"
        >
          {/* HERO TEXT */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="space-y-7"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs text-slate-300 border border-white/10">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Built for LPU 24Online Wi-Fi
            </span>

            <h1 className="text-4xl lg:text-5xl 2xl:text-6xl font-semibold leading-tight tracking-tight">
              Auto-login to{" "}
              <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                LPU Wi-Fi
              </span>{" "}
              every time.
            </h1>

            <p className="text-base lg:text-lg text-slate-300 max-w-2xl">
              LPU AutoLogin+ remembers your credentials, agrees to the Terms &
              Conditions, and taps <span className="font-semibold">Login</span>{" "}
              for you — so you&apos;re online in under a second, every time the
              portal appears.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("download")}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 text-sm font-semibold text-slate-950 shadow-[0_12px_40px_rgba(37,99,235,0.7)] hover:shadow-[0_16px_55px_rgba(37,99,235,0.9)] hover:-translate-y-[1px] active:translate-y-[0.5px] transition-all"
              >
                Download Extension
              </button>
              <button
                onClick={() => scrollToSection("feedback")}
                className="px-5 py-2.5 rounded-full border border-white/15 bg-white/5 text-sm font-medium text-slate-100 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(148,163,253,0.35)] transition-all"
              >
                Contact Developer
              </button>
            </div>

            <div className="flex flex-wrap gap-5 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                ⚡ <span>One-time setup</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                🔒 <span>Runs completely on your browser</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                🧑‍💻 <span>Built by LPU CSE student</span>
              </span>
            </div>
          </motion.div>

          {/* HERO CARD */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="absolute -inset-1 rounded-[32px] bg-gradient-to-br from-sky-500/40 via-indigo-500/20 to-purple-500/40 blur-3xl opacity-80" />

            <div className="relative w-full max-w-[480px] rounded-[28px] bg-[radial-gradient(circle_at_top,_#020617,_#020617)] border border-white/15 shadow-[0_24px_80px_rgba(15,23,42,0.9)] p-5 lg:p-6 hover:border-sky-400/70 hover:shadow-[0_0_55px_rgba(56,189,248,0.65)] transition-all">
              {/* fake browser header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/85" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/85" />
                </div>
                <div className="px-3 py-1 rounded-full bg-slate-900/70 text-[10px] text-slate-300 border border-white/10">
                  https://internet.lpu.in/24online/…
                </div>
              </div>

              {/* login mock */}
              <div className="space-y-4 text-xs">
                <div className="space-y-3">
                  <Field label="User Name" value="1240•••••" />
                  <Field label="Password" value="••••••••••" dim />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="inline-flex items-center gap-2 text-[11px] text-slate-300">
                    <span className="h-3.5 w-3.5 rounded-[8px] bg-indigo-500 flex items-center justify-center shadow-[0_0_10px_rgba(129,140,248,0.9)]">
                      <span className="h-2 w-2 rounded-[6px] bg-white" />
                    </span>
                    I agree with Terms &amp; Conditions
                  </label>
                  <button className="px-4 py-1.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-[11px] font-semibold text-slate-950 shadow-[0_10px_35px_rgba(56,189,248,0.75)]">
                    Auto Login
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>
                    Extension status:{" "}
                    <span className="text-emerald-400">Active</span>
                  </span>
                  <span>Login time: &lt; 1 second</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ABOUT */}
        <section id="about" className="space-y-10">
          <motion.h2
            className="text-2xl lg:text-3xl font-semibold text-center mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeInUp}
          >
            Meet The Developer [ >_ ]
          </motion.h2>

          <motion.div
            className="grid lg:grid-cols-[1.4fr,1fr] gap-10 items-stretch"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0.1}
          >
            <div className="text-sm lg:text-base text-slate-300 max-w-3xl leading-relaxed">
              <p>
                I&apos;m <span className="font-semibold">Soumik Pohi</span>, a
                B.Tech CSE student at Lovely Professional University and a
                developer who hates repetitive clicks.
              </p>
              <p className="mt-3">
                Logging in to Wi-Fi multiple times a day was annoying, so I
                built LPU AutoLogin+ — a tiny extension that quietly handles the
                portal for you and gives those seconds back every single time.
              </p>
              <p className="mt-3">
                I love building automation tools, working with cybersecurity,
                and shipping small open-source projects that make student life
                smoother.
              </p>
            </div>

            <div className="rounded-3xl bg-black/35 border border-white/10 p-5 lg:p-6 shadow-[0_18px_55px_rgba(15,23,42,0.9)] hover:border-sky-400/70 hover:shadow-[0_0_45px_rgba(56,189,248,0.6)] transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-lg font-bold">
                  S
                </div>
                <div>
                  <p className="text-sm font-semibold">SOUMIK POHI</p>
                  <p className="text-[11px] text-slate-400">
                    B.Tech CSE @ LPU • Open-source builder
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-400 mb-2">
                Areas I&apos;m exploring:
              </p>
              <ul className="text-xs text-slate-300 space-y-1 mb-4">
                <li>• Browser automation & productivity tools</li>
                <li>• Cybersecurity & scripting</li>
                <li>• Student-focused open-source projects</li>
              </ul>
              <div className="flex flex-wrap gap-3">
                <SocialChip
                  label="GitHub"
                  href="https://github.com/SOUMIK7770"
                />
                <SocialChip
                  label="LinkedIn"
                  href="https://www.linkedin.com/in/soumik-pohi-116107331/"
                />
                <SocialChip
                  label="Instagram"
                  href="https://www.instagram.com/soumik.pohi/"
                />
              </div>
            </div>
          </motion.div>
        </section>

        {/* DOWNLOAD */}
        <section id="download" className="space-y-10">
          <motion.h2
            className="text-2xl lg:text-3xl font-semibold text-center mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Download LPU AutoLogin+
          </motion.h2>

          <motion.div
            className="grid xl:grid-cols-[1.4fr,1fr] gap-10 items-start"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0.1}
          >
            <div className="space-y-5 text-sm lg:text-base text-slate-300">
              <p>
                Choose where you want to grab the extension from. Both builds
                contain the same code.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/SOUMIK7770/LPU-autologin-plus"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-slate-900/80 border border-white/15 text-sm font-semibold text-slate-50 hover:border-sky-400/70 hover:shadow-[0_0_40px_rgba(56,189,248,0.6)] hover:-translate-y-[1px] transition-all"
                >
                  <span>GitHub Repository</span>
                </a>
                <a
                  href="https://drive.google.com/drive/folders/1Be3DOLH87uAvfOAvd2GmWlqK-Le8wpG2?usp=sharing"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-cyan-400 text-sm font-semibold text-slate-950 shadow-[0_12px_35px_rgba(8,145,178,0.75)] hover:shadow-[0_16px_45px_rgba(8,145,178,0.95)] hover:-translate-y-[1px] transition-all"
                >
                  <span>Download ZIP (Drive)</span>
                </a>
              </div>

              <p className="text-xs text-slate-400">
                Version <span className="text-slate-200">v1.0.0</span> — tested
                on Chrome-based browsers on LPU campus Wi-Fi.
              </p>
            </div>

            <div className="rounded-3xl bg-black/35 border border-white/10 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.9)] hover:border-indigo-400/70 hover:shadow-[0_0_45px_rgba(129,140,248,0.6)] transition-all text-xs text-slate-300 space-y-2">
              <p className="font-semibold text-slate-100">
                Requirements & compatibility
              </p>
              <ul className="space-y-1">
                <li>• Chrome / Edge / Brave (desktop)</li>
                <li>• Manifest V3 extension support</li>
                <li>• Works only with LPU 24Online portal</li>
                <li>• Internet credentials stay on your machine</li>
              </ul>
            </div>
          </motion.div>
        </section>

        {/* HOW TO SETUP */}
        <section id="howto" className="space-y-10">
          <motion.h2
            className="text-2xl lg:text-3xl font-semibold text-center mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Setup in under a minute
          </motion.h2>

          <motion.div
            className="grid lg:grid-cols-[1.2fr,1fr] gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0.1}
          >
            {/* timeline style instead of button boxes */}
            <ol className="relative border-l border-white/10 pl-6 space-y-5 text-sm lg:text-base text-slate-300">
              {[
                "Download the ZIP from GitHub or Google Drive.",
                "Extract it to a folder on your laptop.",
                "Open chrome://extensions in your browser.",
                "Turn on Developer Mode in the top-right corner.",
                "Click 'Load unpacked' and select the folder.",
                "Connect to LPU Wi-Fi and open the login page once.",
                "From now on, the extension will auto-login for you.",
              ].map((step, idx) => (
                <li key={idx} className="relative pl-2">
                  <span className="absolute -left-[38px] top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 border border-white/20 text-[11px] font-semibold text-slate-100 shadow-[0_0_25px_rgba(148,163,253,0.55)]">
                    {idx + 1}
                  </span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>

            {/* <div className="rounded-3xl bg-black/35 border border-white/10 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.9)] hover:border-sky-400/70 hover:shadow-[0_0_45px_rgba(56,189,248,0.6)] transition-all text-xs text-slate-300 space-y-3">
              <p className="font-semibold text-slate-100">
                Video walkthrough (coming soon)
              </p>
              <p>
                A short screen-recorded tutorial will live here with the exact
                steps you just read, so even non-tech friends can set it up in a
                few clicks.
              </p>
              <div className="aspect-video rounded-2xl bg-slate-900/70 border border-dashed border-white/25 flex items-center justify-center text-[11px] text-slate-500">
                Demo video placeholder
              </div>
            </div> */}
          </motion.div>
        </section>

        {/* DONATION */}
        <section id="donation" className="space-y-10">
          <motion.h2
            className="text-2xl lg:text-3xl font-semibold text-center mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Support future student projects ❤️
          </motion.h2>

          <motion.div
            className="grid lg:grid-cols-[1.2fr,1fr] gap-10 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0.1}
          >
            <div className="space-y-4 text-sm lg:text-base text-slate-300">
              <p>
                If LPU AutoLogin+ saves you time every day, you can support more
                small tools like this with a one-time donation.
              </p>
              <p>
                Contributions help with domain costs, hosting, and new
                experiments around automation, Wi-Fi utilities, and
                student-focused open-source work.
              </p>
              <div className="flex flex-wrap gap-3 text-xs text-slate-300">
                <Pill label="UPI donations" />
                <Pill label="No tracking, no ads" />
                <Pill label="Built for students" />
              </div>
            </div>

            <div className="rounded-3xl bg-black/35 border border-white/10 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.9)] hover:border-emerald-400/70 hover:shadow-[0_0_45px_rgba(52,211,153,0.6)] transition-all text-xs text-slate-300 space-y-4">
              <p className="text-center text-[13px] text-slate-200">
                Scan the QR below to donate via UPI
              </p>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-emerald-400/25 blur-xl" />
                  <img
                    src={qrUPI}
                    alt="UPI QR Code"
                    className="relative h-40 w-40 rounded-2xl border border-white/20 object-cover shadow-[0_18px_45px_rgba(15,23,42,0.95)]"
                  />
                </div>
              </div>
              <p className="text-center text-[11px] text-slate-400">
                UPI ID:{" "}
                <span className="text-slate-100 font-mono">7873419960@upi</span>
              </p>
            </div>
          </motion.div>
        </section>

        {/* SUPPORT */}
        <section id="support" className="space-y-10">
          <motion.h2
            className="text-2xl lg:text-3xl font-semibold text-center mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Need help or found a bug?
          </motion.h2>

          <motion.div
            className="grid lg:grid-cols-2 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0.1}
          >
            <div className="rounded-3xl bg-black/35 border border-white/10 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.9)] hover:border-sky-400/70 hover:shadow-[0_0_45px_rgba(56,189,248,0.6)] transition-all text-sm lg:text-base text-slate-300 space-y-3">
              <p className="font-semibold text-slate-100">
                When Wi-Fi or the portal changes
              </p>
              <p>
                Sometimes universities update their login pages. If auto-login
                stops working after an update, just reach out with a screenshot
                and I&apos;ll push a fix.
              </p>
              <ul className="text-xs text-slate-400 space-y-1">
                <li>• Mention your browser & version</li>
                <li>• Attach a screenshot of the portal (no password)</li>
                <li>• Describe what stopped working (fill, checkbox, login)</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-black/35 border border-white/10 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.9)] hover:border-indigo-400/70 hover:shadow-[0_0_45px_rgba(129,140,248,0.6)] transition-all text-xs text-slate-300 space-y-2">
              <p className="font-semibold text-slate-100">
                Contact & support channels
              </p>
              <p>
                GitHub Issues:{" "}
                <a
                  href="https://github.com/SOUMIK7770/LPU-autologin-plus/issues"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  Open an issue
                </a>
              </p>
              <p>
                GitHub Profile:{" "}
                <a
                  href="https://github.com/SOUMIK7770"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sky-400 hover:underline"
                >
                  @SOUMIK7770
                </a>
              </p>
              <p>
                Email me:{" "}
                <a
                  href="mailto:youremail@example.com"
                  className="text-sky-400 hover:underline"
                >
                  iamsoumik.pohi@gmail.com
                </a>
              </p>
              {/* <p>More contact options (email / socials) can be added later.</p> */}
            </div>
          </motion.div>
        </section>

        {/* FEEDBACK */}
        <section id="feedback" className="space-y-10">
          <motion.h2
            className="text-2xl lg:text-3xl font-semibold text-center mb-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Feedback & ideas
          </motion.h2>

          <motion.div
            className="grid lg:grid-cols-[1.1fr,0.9fr] gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={0.1}
          >
            <form
              className="rounded-3xl bg-black/35 border border-white/10 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.9)] hover:border-sky-400/70 hover:shadow-[0_0_45px_rgba(56,189,248,0.6)] transition-all text-sm text-slate-300 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert(
                  "In production, this form can send feedback to Soumik. For now, please use GitHub Issues to share ideas or problems."
                );
              }}
            >
              <div className="grid lg:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">
                    Name (optional)
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-xl bg-slate-950/80 border border-white/10 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-400/70"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-400">
                    Email (optional)
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-xl bg-slate-950/80 border border-white/10 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-400/70"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-slate-400">Message</label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl bg-slate-950/80 border border-white/10 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-sky-400/70 resize-none"
                  placeholder="Share feedback, ideas, or issues…"
                />
              </div>

              <div className="flex items-center justify-between gap-3 flex-wrap">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-sky-500 text-xs font-semibold text-slate-950 shadow-[0_12px_40px_rgba(37,99,235,0.85)] hover:-translate-y-[1px] transition-all"
                >
                  Submit feedback
                </button>
                <p className="text-[11px] text-slate-500">
                  Later this can be wired to Firebase, Google Forms, or a small
                  backend.
                </p>
              </div>
            </form>

            <div className="rounded-3xl bg-black/35 border border-white/10 p-5 shadow-[0_18px_55px_rgba(15,23,42,0.9)] hover:border-indigo-400/70 hover:shadow-[0_0_45px_rgba(129,140,248,0.6)] transition-all text-xs text-slate-300 space-y-3">
              <p className="font-semibold text-slate-100">
                Roadmap & ideas I&apos;m excited about
              </p>
              <ul className="space-y-1 text-slate-400">
                <li>• Firefox & Edge packaged versions</li>
                <li>• One-click installer with auto-updates</li>
                <li>• Support for more campus Wi-Fi portals</li>
                <li>• Simple UI to update credentials safely</li>
              </ul>
              <p className="text-[11px] text-slate-500">
                If you want to collaborate, fork the repo and open a PR — or
                just message your idea.
              </p>
            </div>
          </motion.div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-black/70">
        <div className="px-6 lg:px-12 xl:px-24 py-4 flex flex-col lg:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} LPU AutoLogin+ — built by{" "}
            <span className="text-slate-200">Soumik Pohi</span>
          </p>
          <p>Lovely Profesional University</p>
        </div>
      </footer>
    </div>
  );
}

/* Small reusable components */

function Field({ label, value, dim = false }) {
  return (
    <div className="space-y-1">
      <label className="text-[11px] text-slate-400">{label}</label>
      <div className="h-9 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center px-3 text-[11px] text-slate-200">
        <span className={dim ? "text-slate-500" : ""}>{value}</span>
      </div>
    </div>
  );
}

function SocialChip({ label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="px-3 py-1.5 rounded-full bg-slate-900/70 border border-white/15 text-[11px] text-slate-200 hover:border-sky-400/70 hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all"
    >
      {label}
    </a>
  );
}

function Pill({ label }) {
  return (
    <span className="px-3 py-1 rounded-full bg-slate-900/70 border border-white/15 text-[11px] text-slate-300">
      {label}
    </span>
  );
}

export default App;
