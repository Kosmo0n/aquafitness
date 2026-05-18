"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────── Data ─────────────────────────── */
const WHATSAPP_NUMBER = "+7 747 910 5889"; // ← replace with real number

const plans = [
  {
    id: "standard",
    name: "Standard",
    price: "25,000",
    currency: "₸",
    period: "/ ай",
    description: "Бассейндегі барлық стандартты сабақтарға қол жеткізе отырып, аква-фитнестегі тамаша бастама.",
    features: [
      "Айына 8 сабақ бассейнде",
      "Киім ауыстыратын бөлмелерге кіру",
      "Дене шынықтыруды бағалау",
      "Сабақтарға онлайн жазылу",
    ],
    featured: false,
    icon: "💧",
  },
  {
    id: "pilates",
    name: "Pilates",
    price: "35,000",
    currency: "₸",
    period: "/ ай",
    description: "Үйлесімді дене үшін аква-пилатесті кор бұлшықеттерін қатайтумен біріктіріңіз.",
    features: [
      "Аква-пилатес бойынша 12 сабақ",
      "Икемділік пен кор жаттығулары",
      "Нұсқаушымен сабақтар",
      "Тамақтану бойынша кеңес",
    ],
    featured: false,
    icon: "🌊",
  },
  {
    id: "surf",
    name: "Surf",
    price: "45,000",
    currency: "₸",
    period: "/ ай",
    description: "Серфингтің жігерлі симуляциясы және толқынға қарсыласу жаттығулары.",
    features: [
      "Шексіз серф-сабақтар",
      "Толқынға қарсыласу жаттығулары",
      "Жеке жаттықтырушы (аптасына 2 рет)",
      "Жолға басымдықпен кіру",
    ],
    featured: true,
    icon: "🏄",
  },
  {
    id: "premium",
    name: "Premium",
    price: "55,000",
    currency: "₸",
    period: "/ ай",
    description: "Аква-велнестің максималды кешенді тәжірибесі — барлығы қосылған.",
    features: [
      "Барлық сыныптарға шексіз кіру",
      "Күнделікті жеке жаттықтырушы",
      "Спа мен саунаға кіру",
      "Клуб мүшелеріне арналған эксклюзивті аймақ",
    ],
    featured: false,
    icon: "👑",
  },
];

const schedule = [
  { time: "07:00 – 08:00", mon: "Аква Кардио",  tue: "—",           wed: "Аква Кардио",  thu: "—",           fri: "Аква Кардио",  sat: "Ашық бассейн",   sun: "—"         },
  { time: "09:00 – 10:00", mon: "Аква Пилатес", tue: "Аква Пилатес",wed: "—",            thu: "Аква Пилатес", fri: "—",            sat: "Аква Пилатес",sun: "Ашық бассейн" },
  { time: "10:30 – 11:30", mon: "—",            tue: "Серф Фит",    wed: "Серф Фит",     thu: "—",           fri: "Серф Фит",     sat: "Серф Фит",    sun: "—"         },
  { time: "12:00 – 13:00", mon: "Стретч & Флоу",tue: "—",          wed: "Стретч & Флоу",thu: "Стретч & Флоу",fri: "—",         sat: "—",           sun: "Судағы йога"},
  { time: "18:00 – 19:00", mon: "Аква Кардио",  tue: "Аква Пилатес",wed: "Аква Кардио",  thu: "Серф Фит",    fri: "Аква Кардио",  sat: "—",           sun: "—"         },
  { time: "19:30 – 20:30", mon: "Серф Фит",     tue: "Стретч & Флоу",wed: "Аква Пилатес",thu: "Аква Кардио", fri: "Серф Фит",    sat: "—",           sun: "—"         },
];

const days = ["Дс", "Сс", "Ср", "Бс", "Жм", "Сн", "Жк"];

function buildWhatsApp(planName: string) {
  const msg = encodeURIComponent(
    `Сәлеметсіз бе! Мені «${planName}» абонементі қызықтырады.`
  );
  // Remove non-digit characters for the link
  const cleanNumber = WHATSAPP_NUMBER.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${msg}`;
}

/* ─────────────────────── Bubbles helper ───────────────────── */
function Bubbles() {
  return (
    <div className="caustics-wrapper" aria-hidden="true">
      {[
        { size: 12, left: 10, delay: 0,   duration: 14 },
        { size: 8,  left: 25, delay: 2,   duration: 18 },
        { size: 16, left: 40, delay: 5,   duration: 12 },
        { size: 6,  left: 55, delay: 1,   duration: 20 },
        { size: 10, left: 70, delay: 7,   duration: 16 },
        { size: 14, left: 82, delay: 3,   duration: 13 },
        { size: 5,  left: 92, delay: 9,   duration: 22 },
        { size: 9,  left: 15, delay: 11,  duration: 17 },
      ].map((b, i) => (
        <div
          key={i}
          className="bubble"
          style={{
            width:  b.size,
            height: b.size,
            left:   `${b.left}%`,
            bottom: "-20px",
            animationDelay:    `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────── Page ─────────────────────────── */
export default function Home() {
  /* scroll-based fade-in */
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fade-in-up").forEach((el) =>
      observerRef.current?.observe(el)
    );
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#000814" }}>

      {/* ══════════════════ NAV ══════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[rgba(0,180,216,0.12)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-cinzel text-lg font-bold tracking-widest text-[#90e0ef]">
            AQUAFIT
          </span>
          <div className="hidden md:flex items-center gap-8">
            {([["Біз туралы", "about"], ["Бағалар", "pricing"], ["Кесте", "schedule"]] as [string, string][]).map(([label, anchor]) => (
              <a key={anchor} href={`#${anchor}`} className="nav-link">
                {label}
              </a>
            ))}
          </div>
          <a
            href="#pricing"
            id="nav-join-btn"
            className="btn-whatsapp px-5 py-2 rounded-full text-sm hidden md:block"
          >
            Қосылу
          </a>
        </div>
      </nav>

      {/* ══════════════════ HERO ══════════════════ */}
      <section
        id="hero"
        className="hero-bg relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      >
        {/* caustic blobs */}
        <div className="caustics-wrapper" aria-hidden="true">
          <div className="caustic caustic-1" />
          <div className="caustic caustic-2" />
          <div className="caustic caustic-3" />
          <div className="caustic caustic-4" />
        </div>
        <div className="mesh-overlay" aria-hidden="true" />
        <Bubbles />

        <div className="relative z-10 px-6 max-w-5xl mx-auto">
          {/* eyebrow */}
          <p className="font-inter text-xs tracking-[0.35em] uppercase text-[#48cae4] mb-6 opacity-80">
            Премиум Аква-Велнес · Қазақстан
          </p>

          {/* main title */}
          <h1 className="font-cinzel text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 glow-text"
            style={{ color: "#caf0f8" }}>
            AquaFit<br />
            <span style={{ color: "#90e0ef" }}>Wellness Club</span>
          </h1>

          {/* sub */}
          <p className="font-inter text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto mb-10"
            style={{ color: "rgba(202,240,248,0.7)" }}>
            Аква-фитнестің ең озық тәжірибесіне еніңіз.
            Нәтиже үйлесімділікпен кездесетін жер - судың тереңінде.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pricing"
              id="hero-explore-btn"
              className="btn-whatsapp px-8 py-4 rounded-full text-sm font-semibold tracking-wider"
            >
              Абонементтерді көру
            </a>
            <a
              href="#about"
              id="hero-about-btn"
              className="px-8 py-4 rounded-full text-sm font-semibold tracking-wider border transition-all duration-300 hover:bg-[rgba(0,180,216,0.1)]"
              style={{
                borderColor: "rgba(0,180,216,0.3)",
                color: "#90e0ef",
              }}
            >
              Толығырақ білу
            </a>
          </div>

          {/* scroll hint */}
          <div className="mt-20 flex flex-col items-center gap-2 opacity-40">
            <span className="font-inter text-xs tracking-widest uppercase" style={{ color: "#90e0ef" }}>
              Аударыңыз
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-[#00b4d8] to-transparent" />
          </div>
        </div>
      </section>

      {/* ══════════════════ ABOUT ══════════════════ */}
      <section id="about" className="relative py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="divider w-full max-w-xs mb-20 mx-auto" />

          <div className="fade-in-up grid md:grid-cols-2 gap-12 items-center">
            {/* text block */}
            <div>
              <p className="font-inter text-xs tracking-[0.3em] uppercase mb-4"
                style={{ color: "#48cae4" }}>
                Біздің философиямыз
              </p>
              <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6 leading-tight"
                style={{ color: "#caf0f8" }}>
                Су сіздің панаңызға<br />
              айналатын жер
              </h2>
              <p className="font-inter text-base leading-relaxed mb-4"
                style={{ color: "rgba(202,240,248,0.65)" }}>
                AquaFit Wellness Club жаттығу ұғымын қайта қарайды. Гидротерапия және су биомеханикасы ғылымына негізделген біздің бағдарламалар буындарға ең аз күш түсіре отырып, максималды нәтижеге жету үшін жасалған — әр сабақ бір уақытта қалпына келтіреді және нығайтады.
              </p>
              <p className="font-inter text-base leading-relaxed"
                style={{ color: "rgba(202,240,248,0.65)" }}>
                Аква-Пилатестің медитативті ағымынан Серф-Фиттің қызықты қарсыласуына дейін — біздің сертификатталған жаттықтырушыларымыз сізді тек сіз үшін жасалған жолмен жүргізеді. Бұл жай ғана спорт залы емес — бұл кемелдікті талап ететіндер үшін жасалған тәжірибе.
              </p>
            </div>

            {/* glass stats */}
            <div className="glass rounded-2xl p-8 fade-in-up">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: "4+", label: "Бірегей бағдарламалар" },
                  { value: "500+", label: "Белсенді қатысушылар" },
                  { value: "12", label: "Сарапшы жаттықтырушылар" },
                  { value: "5★", label: "Қатысушылар рейтингі" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-4 rounded-xl"
                    style={{ background: "rgba(0,53,102,0.3)", border: "1px solid rgba(0,180,216,0.12)" }}>
                    <div className="font-cinzel text-3xl font-bold mb-1"
                      style={{ color: "#48cae4" }}>
                      {stat.value}
                    </div>
                    <div className="font-inter text-xs tracking-wider uppercase"
                      style={{ color: "rgba(202,240,248,0.5)" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t" style={{ borderColor: "rgba(0,180,216,0.12)" }}>
                <p className="font-inter text-sm text-center italic"
                  style={{ color: "rgba(202,240,248,0.5)" }}>
                  «Су сіздің шектеулеріңізді біледі — біз олардан асып түсуге көмектесеміз.»
                </p>
              </div>
            </div>
          </div>

          <div className="divider w-full max-w-xs mt-20 mx-auto" />
        </div>
      </section>

      {/* ══════════════════ PRICING ══════════════════ */}
      <section id="pricing" className="relative py-24 px-6">
        <Bubbles />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <p className="font-inter text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "#48cae4" }}>
              Абонементтер
            </p>
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "#caf0f8" }}>
              Өз жолыңызды таңдаңыз
            </h2>
            <p className="font-inter text-base max-w-xl mx-auto"
              style={{ color: "rgba(202,240,248,0.55)" }}>
              Әрбір абонемент біздің бірінші дәрежелі нысандарға қол жеткізуді ашады.
              Мақсаттарыңызға сәйкес келетін жоспарды таңдаңыз.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <div
                key={plan.id}
                className={`glass-card rounded-2xl p-6 flex flex-col fade-in-up relative${plan.featured ? " featured" : ""}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="badge-popular text-white px-4 py-1 rounded-full font-inter font-semibold">
                      Ең танымал
                    </span>
                  </div>
                )}

                {/* icon */}
                <div className="text-4xl mb-4">{plan.icon}</div>

                {/* name */}
                <h3 className="font-cinzel text-xl font-bold mb-1"
                  style={{ color: "#caf0f8" }}>
                  {plan.name}
                </h3>
                <p className="font-inter text-xs mb-4 leading-relaxed"
                  style={{ color: "rgba(202,240,248,0.5)" }}>
                  {plan.description}
                </p>

                {/* price */}
                <div className="mb-5">
                  <span className="font-cinzel text-4xl font-bold"
                    style={{ color: "#48cae4" }}>
                    {plan.price}
                  </span>
                  <span className="font-cinzel text-lg ml-1"
                    style={{ color: "#48cae4" }}>
                    {plan.currency}
                  </span>
                  <span className="font-inter text-xs ml-2"
                    style={{ color: "rgba(202,240,248,0.4)" }}>
                    {plan.period}
                  </span>
                </div>

                {/* features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 font-inter text-sm"
                      style={{ color: "rgba(202,240,248,0.7)" }}>
                      <span style={{ color: "#00b4d8" }} className="mt-0.5 shrink-0">✦</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  id={`buy-${plan.id}-btn`}
                  href={buildWhatsApp(plan.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full py-3 rounded-xl text-sm text-center block"
                >
                  Абонемент сатып алу
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ SCHEDULE ══════════════════ */}
      <section id="schedule" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-in-up">
            <p className="font-inter text-xs tracking-[0.3em] uppercase mb-4"
              style={{ color: "#48cae4" }}>
              Апталық кесте
            </p>
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "#caf0f8" }}>
              Сабақ кестесі
            </h2>
            <p className="font-inter text-base max-w-xl mx-auto"
              style={{ color: "rgba(202,240,248,0.55)" }}>
              Аптаңызды біздің сабақ кестесімен жоспарлаңыз. Барлық сессиялар
              жеке кабинет арқылы онлайн жазылуға қолжетімді.
            </p>
          </div>

          {/* desktop table */}
          <div className="fade-in-up glass rounded-2xl overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <table className="schedule-table w-full text-left">
                <thead>
                  <tr>
                    <th className="py-4 px-6 font-cinzel text-sm tracking-wider" style={{ color: "#90e0ef" }}>
                      Уақыт
                    </th>
                    {days.map((d) => (
                      <th key={d} className="py-4 px-4 font-inter text-xs tracking-widest uppercase"
                        style={{ color: "#90e0ef" }}>
                        {d}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row, i) => (
                    <tr key={i} className="transition-colors duration-200">
                      <td className="py-4 px-6 font-inter text-xs font-semibold whitespace-nowrap"
                        style={{ color: "#48cae4" }}>
                        {row.time}
                      </td>
                      {[row.mon, row.tue, row.wed, row.thu, row.fri, row.sat, row.sun].map((cls, j) => (
                        <td key={j} className="py-4 px-4 font-inter text-sm">
                          {cls === "—" ? (
                            <span style={{ color: "rgba(202,240,248,0.2)" }}>—</span>
                          ) : (
                            <span className="inline-block px-2 py-1 rounded-md text-xs font-medium"
                              style={{
                                background: "rgba(0,53,102,0.5)",
                                border: "1px solid rgba(0,180,216,0.2)",
                                color: "#caf0f8",
                              }}>
                              {cls}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* mobile cards */}
          <div className="md:hidden space-y-4">
            {schedule.map((row, i) => (
              <div key={i} className="glass-card rounded-xl p-4 fade-in-up">
                <p className="font-inter text-xs font-bold mb-3"
                  style={{ color: "#48cae4" }}>
                  {row.time}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {days.map((d, j) => {
                    const cls = [row.mon, row.tue, row.wed, row.thu, row.fri, row.sat, row.sun][j];
                    return cls !== "—" ? (
                      <div key={d} className="text-xs rounded-lg p-2"
                        style={{ background: "rgba(0,53,102,0.5)", border: "1px solid rgba(0,180,216,0.2)" }}>
                        <span className="font-semibold" style={{ color: "#48cae4" }}>{d}: </span>
                        <span style={{ color: "#caf0f8" }}>{cls}</span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* legend */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center fade-in-up">
            {["Аква Кардио", "Аква Пилатес", "Серф Фит", "Стретч & Флоу", "Судағы йога", "Ашық бассейн"].map((cls) => (
              <span key={cls} className="font-inter text-xs px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(0,53,102,0.4)",
                  border: "1px solid rgba(0,180,216,0.2)",
                  color: "rgba(202,240,248,0.6)",
                }}>
                {cls}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="py-12 px-6 border-t" style={{ borderColor: "rgba(0,180,216,0.1)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-cinzel text-xl font-bold tracking-widest mb-1" style={{ color: "#90e0ef" }}>
              AQUAFIT
            </p>
            <p className="font-inter text-xs" style={{ color: "rgba(202,240,248,0.35)" }}>
              Велнес-клуб · Қазақстан
            </p>
          </div>

          <div className="flex gap-6">
            {([["Біз туралы", "about"], ["Бағалар", "pricing"], ["Кесте", "schedule"]] as [string, string][]).map(([label, anchor]) => (
              <a key={anchor} href={`#${anchor}`}
                className="font-inter text-xs tracking-wider uppercase nav-link">
                {label}
              </a>
            ))}
          </div>

          <a
            id="footer-whatsapp-btn"
            href={buildWhatsApp("General")}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp px-6 py-3 rounded-full text-xs font-semibold tracking-wider flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp-қа жазу
          </a>
        </div>

        <div className="divider w-full max-w-xs mt-8 mb-6 mx-auto" />

        <p className="font-inter text-center text-xs" style={{ color: "rgba(202,240,248,0.2)" }}>
          © {new Date().getFullYear()} AquaFit Wellness Club. Барлық құқықтар қорғалған.
        </p>
      </footer>
    </div>
  );
}
