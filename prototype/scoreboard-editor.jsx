import { useState, useEffect, useRef } from "react";

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700&family=Bebas+Neue&family=Teko:wght@400;500;600;700&family=Anton&family=Rajdhani:wght@400;500;600;700&family=Russo+One&family=Orbitron:wght@400;500;600;700&family=Saira+Condensed:wght@400;500;600;700&family=Chakra+Petch:wght@400;500;600;700&display=swap";

const FONT_OPTIONS = [
  { id: "oswald", label: "Oswald", family: "'Oswald', sans-serif" },
  { id: "barlow", label: "Barlow Condensed", family: "'Barlow Condensed', sans-serif" },
  { id: "bebas", label: "Bebas Neue", family: "'Bebas Neue', sans-serif" },
  { id: "teko", label: "Teko", family: "'Teko', sans-serif" },
  { id: "anton", label: "Anton", family: "'Anton', sans-serif" },
  { id: "rajdhani", label: "Rajdhani", family: "'Rajdhani', sans-serif" },
  { id: "russo", label: "Russo One", family: "'Russo One', sans-serif" },
  { id: "orbitron", label: "Orbitron", family: "'Orbitron', sans-serif" },
  { id: "saira", label: "Saira Condensed", family: "'Saira Condensed', sans-serif" },
  { id: "chakra", label: "Chakra Petch", family: "'Chakra Petch', sans-serif" },
];

const BODY_TYPES = [
  { id: 1, label: "Titre centré + lignes symétriques" },
  { id: 2, label: "Deux titres gauche/droite + lignes asymétriques" },
  { id: 3, label: "Titre centré + variable / valeur (joueur)" },
];

const FONT_SIZES = {
  1: { val: 108, label: 32 },
  2: { val: 108, label: 32 },
  3: { val: 86, label: 30 },
  4: { val: 76, label: 28 },
  5: { val: 65, label: 27 },
  6: { val: 60, label: 26 },
  7: { val: 54, label: 24 },
  8: { val: 48, label: 24 },
};

const defaultColors = {
  bgTop: "#0b2550",
  bgMid: "#1565c0",
  bgBot: "#0a2d65",
  teamName: "#ffffff",
  score: "#ffffff",
  scoreBox: "",
  time: "#ffffff",
  clockBox: "#cc0000",
  period: "#ffffff",
  titleText: "#ffffff",
  statVal: "#ffffff",
  statLabel: "#ffffff",
  penaltyTime: "#ff5252",
  penaltyNumber: "#ffffff",
};

const defaultOpacities = {
  bgTop: 0, bgMid: 0, bgBot: 0,
  teamName: 0, score: 0, scoreBox: 0,
  time: 0, clockBox: 0, period: 0, titleText: 0,
  statVal: 0, statLabel: 0,
  penaltyTime: 0, penaltyNumber: 0,
};

function hexToRgba(hex, opacityPct) {
  if (!hex) return hex;
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  if (opacityPct === 0) return hex;
  return `rgba(${r},${g},${b},${1 - opacityPct / 100})`;
}

const defaultState = {
  bodyType: 1,
  showPenalties: false,
  team1: "SVK",
  team2: "FIN",
  score1: "1",
  score2: "1",
  time: "20:00",
  period: "1st PERIOD",
  periodOptions: [
    { label: "TO WARM UP", next: "WARM UP", duration: "10:00" },
    { label: "WARM UP", next: "TO GAME", duration: "20:00" },
    { label: "TO GAME", next: "1st PERIOD", duration: "5:00" },
    { label: "1st PERIOD", next: "1st INTERMISSION", duration: "20:00" },
    { label: "1st INTERMISSION", next: "2nd PERIOD", duration: "15:00" },
    { label: "2nd PERIOD", next: "2nd INTERMISSION", duration: "20:00" },
    { label: "2nd INTERMISSION", next: "3rd PERIOD", duration: "15:00" },
    { label: "3rd PERIOD", next: "3rd INTERMISSION", duration: "20:00" },
    { label: "3rd INTERMISSION", next: "", duration: "15:00" },
    { label: "OVERTIME", next: "", duration: "5:00" },
    { label: "OVERTIME 2", next: "", duration: "5:00" },
  ],
  demoMode: false,
  demoRunning: false,
  clockBoxMode: "never",
  showClock: true,
  titleCenter: "GAME STATISTICS",
  titleLeft: "POWER PLAY EFFICIENCY",
  titleRight: "PENALTY KILLING %",
  colors: { ...defaultColors },
  opacities: { ...defaultOpacities },
  fontTeams: "oswald",
  fontClock: "barlow",
  fontBody: "barlow",
  showPlayerPhoto: true,
  playerStats: [
    { label: "GOALS", value: "12", playerName: "KOPITAR", playerNumber: "11" },
    { label: "ASSISTS", value: "8", playerName: "PASTRNAK", playerNumber: "88" },
    { label: "POINTS", value: "18", playerName: "KOPITAR", playerNumber: "11" },
    { label: "+/-", value: "+6", playerName: "HOSSA", playerNumber: "81" },
  ],
  stats: [
    { valLeft: "82%", label: "GAME", valRight: "91%" },
    { valLeft: "87%", label: "TOURNAMENT", valRight: "85%" },
  ],
  penaltiesLeft: [
    { time: "1:52", number: "24" },
    { time: "2:12", number: "7" },
  ],
  penaltiesRight: [
    { time: "0:45", number: "11" },
  ],
};

const HOCKEY_NATIONS = [
  { noc: "CAN", iso: "ca", name: "Canada" },
  { noc: "USA", iso: "us", name: "États-Unis" },
  { noc: "RUS", iso: "ru", name: "Russie" },
  { noc: "SWE", iso: "se", name: "Suède" },
  { noc: "FIN", iso: "fi", name: "Finlande" },
  { noc: "CZE", iso: "cz", name: "Tchéquie" },
  { noc: "SVK", iso: "sk", name: "Slovaquie" },
  { noc: "SUI", iso: "ch", name: "Suisse" },
  { noc: "GER", iso: "de", name: "Allemagne" },
  { noc: "DEN", iso: "dk", name: "Danemark" },
  { noc: "NOR", iso: "no", name: "Norvège" },
  { noc: "LAT", iso: "lv", name: "Lettonie" },
  { noc: "AUT", iso: "at", name: "Autriche" },
  { noc: "FRA", iso: "fr", name: "France" },
  { noc: "BLR", iso: "by", name: "Biélorussie" },
  { noc: "KAZ", iso: "kz", name: "Kazakhstan" },
  { noc: "SLO", iso: "si", name: "Slovénie" },
  { noc: "HUN", iso: "hu", name: "Hongrie" },
  { noc: "GBR", iso: "gb", name: "Grande-Bretagne" },
  { noc: "POL", iso: "pl", name: "Pologne" },
  { noc: "ITA", iso: "it", name: "Italie" },
  { noc: "JPN", iso: "jp", name: "Japon" },
  { noc: "KOR", iso: "kr", name: "Corée du Sud" },
  { noc: "CHN", iso: "cn", name: "Chine" },
  { noc: "ROU", iso: "ro", name: "Roumanie" },
  { noc: "CRO", iso: "hr", name: "Croatie" },
  { noc: "UKR", iso: "ua", name: "Ukraine" },
  { noc: "EST", iso: "ee", name: "Estonie" },
  { noc: "LTU", iso: "lt", name: "Lituanie" },
  { noc: "SRB", iso: "rs", name: "Serbie" },
  { noc: "BUL", iso: "bg", name: "Bulgarie" },
];

const FLAG_STYLES = {
  ca: { bg: "linear-gradient(90deg, #ff0000 25%, #fff 25%, #fff 75%, #ff0000 75%)" },
  us: { bg: "linear-gradient(180deg, #bf0a30 8%, #fff 8%, #fff 15%, #bf0a30 15%, #bf0a30 23%, #fff 23%, #fff 31%, #bf0a30 31%, #bf0a30 38%, #fff 38%, #fff 46%, #bf0a30 46%, #bf0a30 54%, #fff 54%, #fff 62%, #bf0a30 62%, #bf0a30 69%, #fff 69%, #fff 77%, #bf0a30 77%, #bf0a30 85%, #fff 85%, #fff 92%, #bf0a30 92%)", overlay: { top: 0, left: 0, width: "40%", height: "54%", background: "#3c3b6e" } },
  ru: { bg: "linear-gradient(180deg, #fff 33%, #0039a6 33%, #0039a6 66%, #d52b1e 66%)" },
  se: { bg: "#006aa7", cross: { color: "#fecc00" } },
  fi: { bg: "#fff", cross: { color: "#003580" } },
  cz: { bg: "linear-gradient(180deg, #fff 50%, #d7141a 50%)", overlay: { top: 0, left: 0, width: 0, height: 0, borderTop: "25px solid transparent", borderBottom: "25px solid transparent", borderLeft: "35px solid #11457e", background: "transparent" } },
  sk: { bg: "linear-gradient(180deg, #fff 33%, #0b4ea2 33%, #0b4ea2 66%, #ee1c25 66%)" },
  ch: { bg: "#ff0000" },
  de: { bg: "linear-gradient(180deg, #000 33%, #dd0000 33%, #dd0000 66%, #ffcc00 66%)" },
  dk: { bg: "#c8102e", cross: { color: "#fff" } },
  no: { bg: "#ef2b2d", cross: { color: "#002868", border: "#fff" } },
  lv: { bg: "linear-gradient(180deg, #9e3039 40%, #fff 40%, #fff 60%, #9e3039 60%)" },
  at: { bg: "linear-gradient(180deg, #ed2939 33%, #fff 33%, #fff 66%, #ed2939 66%)" },
  fr: { bg: "linear-gradient(90deg, #002395 33%, #fff 33%, #fff 66%, #ed2939 66%)" },
  by: { bg: "linear-gradient(180deg, #c8313e 66%, #4aa02c 66%)" },
  kz: { bg: "#00afca" },
  si: { bg: "linear-gradient(180deg, #fff 33%, #003da5 33%, #003da5 66%, #ed1c24 66%)" },
  hu: { bg: "linear-gradient(180deg, #ce2939 33%, #fff 33%, #fff 66%, #477050 66%)" },
  gb: { bg: "#012169" },
  pl: { bg: "linear-gradient(180deg, #fff 50%, #dc143c 50%)" },
  it: { bg: "linear-gradient(90deg, #008c45 33%, #fff 33%, #fff 66%, #cd212a 66%)" },
  jp: { bg: "#fff" },
  kr: { bg: "#fff" },
  cn: { bg: "#ee1c25" },
  ro: { bg: "linear-gradient(90deg, #002b7f 33%, #fcd116 33%, #fcd116 66%, #ce1126 66%)" },
  hr: { bg: "linear-gradient(180deg, #ff0000 33%, #fff 33%, #fff 66%, #171796 66%)" },
  ua: { bg: "linear-gradient(180deg, #005bbb 50%, #ffd500 50%)" },
  ee: { bg: "linear-gradient(180deg, #0072ce 33%, #000 33%, #000 66%, #fff 66%)" },
  lt: { bg: "linear-gradient(180deg, #fdb913 33%, #006a44 33%, #006a44 66%, #c1272d 66%)" },
  rs: { bg: "linear-gradient(180deg, #c6363c 33%, #0c4076 33%, #0c4076 66%, #fff 66%)" },
  bg: { bg: "linear-gradient(180deg, #fff 33%, #00966e 33%, #00966e 66%, #d62612 66%)" },
};

const ff = (id) => (FONT_OPTIONS.find(f => f.id === id) || FONT_OPTIONS[0]).family;

function Flag({ code, w = 77, h = 50 }) {
  const nation = HOCKEY_NATIONS.find(n => n.noc === code);
  const iso = nation ? nation.iso : "";
  const style = FLAG_STYLES[iso];
  if (!style) {
    return <div style={{ width: w, height: h, borderRadius: 4, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.4)", flexShrink: 0, background: "#334155", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#94a3b8" }}>{code}</div>;
  }
  const base = { width: w, height: h, borderRadius: 4, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.4)", flexShrink: 0, background: style.bg, position: "relative" };
  return (
    <div style={base}>
      {style.overlay && <div style={{ position: "absolute", ...style.overlay }} />}
      {style.cross && (
        <>
          <div style={{ position: "absolute", top: 0, left: "28%", width: style.cross.border ? "16%" : "12%", height: "100%", background: style.cross.border || style.cross.color }} />
          <div style={{ position: "absolute", top: "35%", left: 0, width: "100%", height: style.cross.border ? "26%" : "20%", background: style.cross.border || style.cross.color }} />
          <div style={{ position: "absolute", top: 0, left: "30%", width: "12%", height: "100%", background: style.cross.color }} />
          <div style={{ position: "absolute", top: "37%", left: 0, width: "100%", height: "20%", background: style.cross.color }} />
        </>
      )}
      {iso === "ch" && (
        <div style={{ position: "absolute", top: "20%", left: "30%", width: "40%", height: "60%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", width: "60%", height: "20%", background: "#fff" }} />
          <div style={{ position: "absolute", width: "20%", height: "60%", background: "#fff" }} />
        </div>
      )}
      {iso === "jp" && (
        <div style={{ position: "absolute", top: "20%", left: "32%", width: "36%", height: "60%", borderRadius: "50%", background: "#bc002d" }} />
      )}
    </div>
  );
}

function ScoreboardPreview({ state }) {
  const { bodyType, showPenalties, team1, team2, score1, score2, time, period, clockBoxMode, demoRunning, showClock, colors, opacities, fontTeams, fontClock, fontBody, showPlayerPhoto, playerStats, titleCenter, titleLeft, titleRight, stats, penaltiesLeft, penaltiesRight } = state;
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(0.5);
  const W = 1920, H = 1080;
  const c = colors;
  const o = opacities || {};
  const col = (key) => hexToRgba(c[key], o[key] || 0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) {
        const { width, height } = e.contentRect;
        setScale(Math.min(width / W, height / H));
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const activeRows = bodyType === 3 ? playerStats : stats;
  const n = activeRows.length;
  const fs = FONT_SIZES[Math.min(Math.max(n, 1), 8)];
  const penW = 346;
  const contentPad = showPenalties ? 10 : 40;
  const labelW = showPenalties ? 240 : 300;
  const photoW = showPlayerPhoto && bodyType === 3 ? 120 : 0;

  const gridRows = [];
  for (let i = 0; i < n; i++) {
    if (i === 0) gridRows.push("1fr");
    gridRows.push("auto");
    gridRows.push("1fr");
  }
  if (n === 0) gridRows.push("1fr");

  const bg = `linear-gradient(180deg, ${col("bgTop")} 0%, ${col("bgMid")} 50%, ${col("bgBot")} 100%)`;

  const showClockBox = clockBoxMode === "always" || (clockBoxMode === "stopped" && !demoRunning) || (clockBoxMode === "running" && demoRunning);

  return (
    <div ref={wrapRef} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "center center", flexShrink: 0 }}>
        <div style={{
          width: W, height: H, background: bg,
          position: "relative", overflow: "hidden", display: "flex", flexDirection: "column",
          fontFamily: ff(fontTeams), color: "#fff"
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 25% 15%, rgba(100,200,255,0.12) 0%, transparent 50%), radial-gradient(ellipse at 75% 85%, rgba(100,200,255,0.08) 0%, transparent 50%)", pointerEvents: "none" }} />

          {/* HEADER */}
          <div style={{ position: "relative", zIndex: 1, flexShrink: 0, padding: "14px 96px 10px" }}>
            {/* Teams + Scores */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                <Flag code={team1} />
                <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: 6, textShadow: "0 3px 15px rgba(0,0,0,0.5)", color: col("teamName") }}>{team1}</div>
                <div style={{
                  fontSize: 80, fontWeight: 700, minWidth: 75, textAlign: "center",
                  textShadow: "0 4px 20px rgba(0,0,0,0.5)", color: col("score"),
                  ...(c.scoreBox ? { background: col("scoreBox"), borderRadius: 8, padding: "2px 20px", boxShadow: "0 4px 16px rgba(0,0,0,0.3)" } : {})
                }}>{score1}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                <div style={{
                  fontSize: 80, fontWeight: 700, minWidth: 75, textAlign: "center",
                  textShadow: "0 4px 20px rgba(0,0,0,0.5)", color: col("score"),
                  ...(c.scoreBox ? { background: col("scoreBox"), borderRadius: 8, padding: "2px 20px", boxShadow: "0 4px 16px rgba(0,0,0,0.3)" } : {})
                }}>{score2}</div>
                <div style={{ fontSize: 80, fontWeight: 700, letterSpacing: 6, textShadow: "0 3px 15px rgba(0,0,0,0.5)", color: col("teamName") }}>{team2}</div>
                <Flag code={team2} />
              </div>
            </div>

            {/* Clock overlay - centered, aligned with scores */}
            {showClock && (
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                pointerEvents: "none"
              }}>
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  pointerEvents: "auto",
                  ...(showClockBox ? { background: col("clockBox"), borderRadius: 8, padding: "4px 28px", boxShadow: "0 4px 16px rgba(0,0,0,0.3)" } : {})
                }}>
                  <span style={{ fontSize: 80, fontWeight: 600, fontFamily: ff(fontClock), color: col("time") }}>{time}</span>
                  {period && (
                    <span style={{ fontSize: 22, fontWeight: 600, letterSpacing: 3, fontFamily: ff(fontClock), textTransform: "uppercase", marginTop: -8, color: col("period") }}>{period}</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* MAIN AREA */}
          <div style={{ flex: 1, display: "flex", position: "relative", zIndex: 1 }}>

            {/* LEFT PENALTIES */}
            {showPenalties && (
              <div style={{ width: penW, display: "grid", gridTemplateRows: "repeat(8, 1fr)", padding: "10px 24px", flexShrink: 0, borderRight: "1px solid rgba(255,255,255,0.05)" }}>
                {penaltiesLeft.map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: ff(fontBody), fontWeight: 600 }}>
                    <span style={{ width: 172, textAlign: "right", fontSize: 60, color: col("penaltyTime"), textShadow: `0 0 8px ${col("penaltyTime")}66`, fontVariantNumeric: "tabular-nums" }}>{p.time}</span>
                    <span style={{ width: 115, textAlign: "center", fontSize: 60, color: col("penaltyNumber"), fontVariantNumeric: "tabular-nums" }}>{p.number}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CONTENT */}
            {bodyType === 3 ? (
              <div style={{
                flex: 1, display: "flex", flexDirection: "column",
                padding: `40px ${contentPad + 20}px`,
              }}>
                {/* Title */}
                <div style={{
                  textAlign: "center", fontSize: 30, fontWeight: 600, letterSpacing: 5,
                  fontFamily: ff(fontBody), textTransform: "uppercase", color: col("titleText"),
                  whiteSpace: "nowrap", paddingBottom: 40, flexShrink: 0,
                }}>
                  {titleCenter}
                </div>
                {/* Data table */}
                <div style={{
                  flex: 1, display: "grid",
                  gridTemplateColumns: showPlayerPhoto
                    ? `auto auto auto auto`
                    : "auto auto auto",
                  gridTemplateRows: `repeat(${playerStats.length}, 1fr)`,
                  gap: "0 35px",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {playerStats.map((s, i) => {
                    const rowFs = fs.val * 0.55;
                    return [
                      // Variable
                      <div key={`lb-${i}`} style={{
                        fontSize: rowFs, fontWeight: 500, letterSpacing: 3,
                        textTransform: "uppercase", fontFamily: ff(fontBody),
                        color: col("statLabel"), whiteSpace: "nowrap", overflow: "hidden",
                      }}>{s.label}</div>,
                      // Photo
                      showPlayerPhoto && (
                        <div key={`ph-${i}`} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <div style={{
                            width: rowFs * 1.3, height: rowFs * 1.3, borderRadius: "50%",
                            background: "rgba(255,255,255,0.08)", border: "2px solid rgba(255,255,255,0.15)",
                            display: "flex", alignItems: "center", justifyContent: "center"
                          }}>
                            <span style={{ fontSize: rowFs * 0.5, fontWeight: 700, fontFamily: ff(fontBody), color: col("statVal"), lineHeight: 1 }}>{s.playerNumber}</span>
                          </div>
                        </div>
                      ),
                      // Player name
                      <div key={`nm-${i}`} style={{
                        fontSize: rowFs, fontWeight: 500, letterSpacing: 2,
                        textTransform: "uppercase", fontFamily: ff(fontBody),
                        color: col("statVal"), whiteSpace: "nowrap", overflow: "hidden",
                      }}>{s.playerName}</div>,
                      // Value
                      <div key={`vr-${i}`} style={{
                        fontSize: rowFs, fontWeight: 700, textAlign: "right",
                        fontFamily: ff(fontBody), fontVariantNumeric: "tabular-nums",
                        letterSpacing: 2, color: col("statVal"),
                        textShadow: `0 0 16px ${col("statVal")}5a`,
                      }}>{s.value}</div>,
                    ];
                  })}
                </div>
              </div>
            ) : (
              <div style={{ flex: 1, display: "grid", gridTemplateColumns: `1fr ${labelW}px 1fr`, gridTemplateRows: gridRows.join(" "), padding: `0 ${contentPad}px` }}>
                {stats.map((s, i) => {
                  const els = [];
                  if (i === 0) {
                    if (bodyType === 1) {
                      els.push(
                        <div key="t1" style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 600, letterSpacing: 5, fontFamily: ff(fontBody), textTransform: "uppercase", color: col("titleText"), whiteSpace: "nowrap" }}>
                          {titleCenter}
                        </div>
                      );
                    } else {
                      els.push(
                        <div key="t1" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 600, letterSpacing: 5, fontFamily: ff(fontBody), textTransform: "uppercase", color: col("titleText"), whiteSpace: "nowrap" }}>
                          {titleLeft}
                        </div>
                      );
                      els.push(<div key="t2" />);
                      els.push(
                        <div key="t3" style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, fontWeight: 600, letterSpacing: 5, fontFamily: ff(fontBody), textTransform: "uppercase", color: col("titleText"), whiteSpace: "nowrap" }}>
                          {titleRight}
                        </div>
                      );
                    }
                  }
                  els.push(
                    <div key={`vl-${i}`} style={{
                      display: "flex", alignItems: "center",
                      justifyContent: bodyType === 2 ? "center" : "flex-end",
                      paddingRight: bodyType === 2 ? 0 : 40,
                      fontSize: fs.val, fontWeight: 700,
                      fontFamily: ff(fontBody),
                      letterSpacing: 2, color: col("statVal"),
                      textShadow: `0 0 16px ${col("statVal")}5a`
                    }}>{s.valLeft}</div>
                  );
                  els.push(
                    <div key={`lb-${i}`} style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: fs.label, fontWeight: 500, letterSpacing: 5,
                      textTransform: "uppercase", fontFamily: ff(fontBody),
                      color: col("statLabel")
                    }}>{s.label}</div>
                  );
                  els.push(
                    <div key={`vr-${i}`} style={{
                      display: "flex", alignItems: "center",
                      justifyContent: bodyType === 2 ? "center" : "flex-start",
                      paddingLeft: bodyType === 2 ? 0 : 40,
                      fontSize: fs.val, fontWeight: 700,
                      fontFamily: ff(fontBody),
                      letterSpacing: 2, color: col("statVal"),
                      textShadow: `0 0 16px ${col("statVal")}5a`
                    }}>{s.valRight}</div>
                  );
                  els.push(<div key={`sp-${i}`} style={{ gridColumn: "1 / -1" }} />);
                  return els;
                })}
              </div>
            )}

            {/* RIGHT PENALTIES */}
            {showPenalties && (
              <div style={{ width: penW, display: "grid", gridTemplateRows: "repeat(8, 1fr)", padding: "10px 24px", flexShrink: 0, borderLeft: "1px solid rgba(255,255,255,0.05)" }}>
                {penaltiesRight.map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: ff(fontBody), fontWeight: 600 }}>
                    <span style={{ width: 115, textAlign: "center", fontSize: 60, color: col("penaltyNumber"), fontVariantNumeric: "tabular-nums" }}>{p.number}</span>
                    <span style={{ width: 172, textAlign: "left", fontSize: 60, color: col("penaltyTime"), textShadow: `0 0 8px ${col("penaltyTime")}66`, fontVariantNumeric: "tabular-nums" }}>{p.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, flex: 1, minWidth: 0 }}>
      <label style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{label}</label>
      <input type="text" value={value} onChange={e => onChange(e.target.value)}
        style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 6, padding: "6px 10px", color: "#f1f5f9", fontSize: 14, fontFamily: "'Barlow Condensed', sans-serif", outline: "none", width: "100%" }}
      />
    </div>
  );
}

function ColorPick({ label, value, onChange, opacity = 0, onOpacityChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <input type="color" value={value || "#ffffff"} onChange={e => onChange(e.target.value)}
          style={{ width: 28, height: 28, border: "1px solid #334155", borderRadius: 4, cursor: "pointer", background: "none", padding: 0 }}
        />
        <span style={{ fontSize: 12, color: "#cbd5e1", flex: 1 }}>{label}</span>
        <input type="text" value={value} onChange={e => onChange(e.target.value)}
          style={{ width: 72, background: "#1e293b", border: "1px solid #334155", borderRadius: 4, padding: "3px 6px", color: "#94a3b8", fontSize: 11, fontFamily: "monospace", outline: "none" }}
        />
      </div>
      {onOpacityChange && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, paddingLeft: 36 }}>
          <input type="range" min={0} max={100} value={opacity}
            onChange={e => onOpacityChange(parseInt(e.target.value))}
            style={{ flex: 1, height: 4, accentColor: "#4fc3f7" }}
          />
          <span style={{ fontSize: 10, color: "#64748b", width: 32, textAlign: "right" }}>{opacity}%</span>
        </div>
      )}
    </div>
  );
}

function Section({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: open ? 8 : 0 }}>
      <div onClick={() => setOpen(!open)} style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 1.5, borderBottom: "1px solid #1e293b", paddingBottom: 4, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {title}
        <span style={{ fontSize: 10, color: "#475569" }}>{open ? "v" : ">"}</span>
      </div>
      {open && children}
    </div>
  );
}

function BtnAdd({ onClick, label }) {
  return (
    <button onClick={onClick} style={{ background: "#1e3a5f", border: "1px solid #2563eb", borderRadius: 6, color: "#93c5fd", padding: "6px 12px", cursor: "pointer", fontSize: 13, width: "100%" }}>
      + {label}
    </button>
  );
}

function BtnRemove({ onClick }) {
  return (
    <button onClick={onClick} style={{ background: "#991b1b", border: "none", borderRadius: 6, color: "#fca5a5", padding: "6px 10px", cursor: "pointer", fontSize: 14, flexShrink: 0, height: 32 }}>X</button>
  );
}

export default function ScoreboardEditor() {
  const [state, setState] = useState(defaultState);
  const [periodOptsOpen, setPeriodOptsOpen] = useState(false);
  const timerRef = useRef(null);

  // Time parsing
  const parseTime = (t) => {
    const parts = t.split(":").map(Number);
    if (parts.length === 2) return (parts[0] || 0) * 60 + (parts[1] || 0);
    return 0;
  };
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Demo timer
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (!state.demoRunning) return;

    timerRef.current = setInterval(() => {
      setState(prev => {
        const secs = parseTime(prev.time);
        // Decrement penalties and remove expired
        const tickPenalties = (list) => list
          .map(p => {
            const ps = parseTime(p.time);
            return ps <= 0 ? null : { ...p, time: formatTime(ps - 1) };
          })
          .filter(p => p !== null);
        const nextPenLeft = tickPenalties(prev.penaltiesLeft);
        const nextPenRight = tickPenalties(prev.penaltiesRight);

        if (secs <= 0) {
          const cur = prev.periodOptions.find(p => p.label === prev.period);
          if (cur && cur.next) {
            const nextPhase = prev.periodOptions.find(p => p.label === cur.next);
            const nextDuration = nextPhase ? nextPhase.duration : "20:00";
            return { ...prev, period: cur.next, time: nextDuration, penaltiesLeft: nextPenLeft, penaltiesRight: nextPenRight };
          }
          return { ...prev, demoRunning: false, penaltiesLeft: nextPenLeft, penaltiesRight: nextPenRight };
        }
        return { ...prev, time: formatTime(secs - 1), penaltiesLeft: nextPenLeft, penaltiesRight: nextPenRight };
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [state.demoRunning]);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = FONT_LINK;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const update = (key, val) => setState(prev => ({ ...prev, [key]: val }));
  const updateColor = (key, val) => setState(prev => ({ ...prev, colors: { ...prev.colors, [key]: val } }));
  const updateOpacity = (key, val) => setState(prev => ({ ...prev, opacities: { ...prev.opacities, [key]: val } }));
  const updateStat = (idx, field, val) => {
    const next = [...state.stats];
    next[idx] = { ...next[idx], [field]: val };
    update("stats", next);
  };
  const addStat = () => { if (state.stats.length < 8) update("stats", [...state.stats, { valLeft: "0", label: "STAT", valRight: "0" }]); };
  const removeStat = (idx) => update("stats", state.stats.filter((_, i) => i !== idx));
  const updatePlayerStat = (idx, field, val) => {
    const next = [...state.playerStats];
    next[idx] = { ...next[idx], [field]: val };
    update("playerStats", next);
  };
  const removePlayerStat = (idx) => update("playerStats", state.playerStats.filter((_, i) => i !== idx));
  const bodyType = state.bodyType;
  const updatePenalty = (side, idx, field, val) => {
    const key = side === "left" ? "penaltiesLeft" : "penaltiesRight";
    const next = [...state[key]];
    next[idx] = { ...next[idx], [field]: val };
    update(key, next);
  };
  const addPenalty = (side) => {
    const key = side === "left" ? "penaltiesLeft" : "penaltiesRight";
    if (state[key].length < 8) update(key, [{ time: "2:00", number: "0" }, ...state[key]]);
  };
  const removePenalty = (side, idx) => {
    const key = side === "left" ? "penaltiesLeft" : "penaltiesRight";
    update(key, state[key].filter((_, i) => i !== idx));
  };

  const cc = state.colors;
  const oo = state.opacities || {};

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0f172a", color: "#e2e8f0", fontFamily: "'Barlow Condensed', sans-serif", overflow: "hidden" }}>

      {/* EDITOR */}
      <div style={{ width: 360, flexShrink: 0, borderRight: "1px solid #1e293b", overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>

        <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "'Oswald', sans-serif", letterSpacing: 2, textTransform: "uppercase", color: "#4fc3f7" }}>
          Scoreboard Editor
        </div>

        <Section title="Type de corps">
          {BODY_TYPES.map(t => (
            <label key={t.id} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13 }}>
              <input type="radio" checked={state.bodyType === t.id} onChange={() => update("bodyType", t.id)} style={{ accentColor: "#4fc3f7" }} />
              {t.label}
            </label>
          ))}
        </Section>

        <Section title="Colonnes de pénalités">
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13 }}>
            <input type="checkbox" checked={state.showPenalties} onChange={e => update("showPenalties", e.target.checked)} style={{ accentColor: "#4fc3f7" }} />
            Afficher les colonnes
          </label>
        </Section>

        <Section title="Header">
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <label style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>Team 1</label>
              <select value={state.team1} onChange={e => update("team1", e.target.value)}
                style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 6, padding: "6px 10px", color: "#f1f5f9", fontSize: 14, fontFamily: "'Barlow Condensed', sans-serif", outline: "none" }}>
                {HOCKEY_NATIONS.map(n => (
                  <option key={n.noc} value={n.noc}>{n.noc} - {n.name}</option>
                ))}
              </select>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <label style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>Team 2</label>
              <select value={state.team2} onChange={e => update("team2", e.target.value)}
                style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 6, padding: "6px 10px", color: "#f1f5f9", fontSize: 14, fontFamily: "'Barlow Condensed', sans-serif", outline: "none" }}>
                {HOCKEY_NATIONS.map(n => (
                  <option key={n.noc} value={n.noc}>{n.noc} - {n.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <InputField label="Score 1" value={state.score1} onChange={v => update("score1", v)} />
            <InputField label="Score 2" value={state.score2} onChange={v => update("score2", v)} />
          </div>
        </Section>

        <Section title="Horloge">
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13 }}>
            <input type="checkbox" checked={state.showClock} onChange={e => update("showClock", e.target.checked)} style={{ accentColor: "#4fc3f7" }} />
            Afficher l'horloge
          </label>
          {state.showClock && (
            <>
              <InputField label="Temps" value={state.time} onChange={v => { update("time", v); update("demoRunning", false); }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <label style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>Phase active</label>
                <select value={state.period} onChange={e => {
                    const v = e.target.value;
                    update("period", v);
                    const phase = state.periodOptions.find(p => p.label === v);
                    if (phase) update("time", phase.duration);
                  }}
                  style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 6, padding: "6px 10px", color: "#f1f5f9", fontSize: 14, fontFamily: "'Barlow Condensed', sans-serif", outline: "none" }}>
                  <option value="">-- aucune --</option>
                  {state.periodOptions.map((p, i) => (
                    <option key={i} value={p.label}>{p.label}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div onClick={() => setPeriodOptsOpen(!periodOptsOpen)} style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Options de phases et transitions</span>
                  <span style={{ fontSize: 10, color: "#475569" }}>{periodOptsOpen ? "v" : ">"}</span>
                </div>
                {periodOptsOpen && (
                  <>
                    {state.periodOptions.map((p, i) => (
                      <div key={i} style={{ display: "flex", flexDirection: "column", gap: 2, background: "#1e293b", borderRadius: 6, padding: "6px 8px" }}>
                        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                          <input type="text" value={p.label}
                            onChange={e => {
                              const next = [...state.periodOptions];
                              const old = next[i].label;
                              next[i] = { ...next[i], label: e.target.value };
                              update("periodOptions", next);
                              if (state.period === old) update("period", e.target.value);
                            }}
                            style={{ flex: 1, background: "#0f172a", border: "1px solid #334155", borderRadius: 4, padding: "4px 8px", color: "#f1f5f9", fontSize: 13, fontFamily: "'Barlow Condensed', sans-serif", outline: "none" }}
                          />
                          <BtnRemove onClick={() => {
                            const next = state.periodOptions.filter((_, j) => j !== i);
                            update("periodOptions", next);
                            if (state.period === p.label) update("period", "");
                          }} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, paddingLeft: 4 }}>
                          <span style={{ fontSize: 10, color: "#64748b", whiteSpace: "nowrap" }}>Durée :</span>
                          <input type="text" value={p.duration}
                            onChange={e => {
                              const next = [...state.periodOptions];
                              next[i] = { ...next[i], duration: e.target.value };
                              update("periodOptions", next);
                            }}
                            style={{ width: 60, background: "#0f172a", border: "1px solid #334155", borderRadius: 4, padding: "2px 6px", color: "#f1f5f9", fontSize: 11, fontFamily: "'Barlow Condensed', sans-serif", outline: "none", textAlign: "center" }}
                          />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, paddingLeft: 4 }}>
                          <span style={{ fontSize: 10, color: "#64748b", whiteSpace: "nowrap" }}>A 0:00 :</span>
                          <select value={p.next}
                            onChange={e => {
                              const next = [...state.periodOptions];
                              next[i] = { ...next[i], next: e.target.value };
                              update("periodOptions", next);
                            }}
                            style={{ flex: 1, background: "#0f172a", border: "1px solid #334155", borderRadius: 4, padding: "2px 6px", color: "#94a3b8", fontSize: 11, fontFamily: "'Barlow Condensed', sans-serif", outline: "none" }}>
                            <option value="">-- stop --</option>
                            {state.periodOptions.filter((_, j) => j !== i).map((o, j) => (
                              <option key={j} value={o.label}>{o.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                    <BtnAdd onClick={() => update("periodOptions", [...state.periodOptions, { label: "NEW PHASE", next: "", duration: "20:00" }])} label="Ajouter une phase" />
                  </>
                )}
              </div>

              {/* DEMO MODE */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6, background: "#0c1a30", border: "1px solid #1e3a5f", borderRadius: 6, padding: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#4fc3f7", letterSpacing: 1 }}>MODE DEMO</div>
                <div style={{ display: "flex", gap: 6 }}>
                  <button onClick={() => {
                    if (state.demoRunning) {
                      update("demoRunning", false);
                    } else {
                      update("demoRunning", true);
                    }
                  }} style={{
                    flex: 1, background: state.demoRunning ? "#991b1b" : "#1b5e20", border: "none", borderRadius: 6,
                    color: "#fff", padding: "8px 12px", cursor: "pointer", fontSize: 14, fontWeight: 700,
                    fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: 1
                  }}>
                    {state.demoRunning ? "STOP" : "START"}
                  </button>
                  <button onClick={() => {
                    update("demoRunning", false);
                    const cur = state.periodOptions.find(p => p.label === state.period);
                    update("time", cur ? cur.duration : "20:00");
                  }}
                    style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 6, color: "#94a3b8", padding: "8px 12px", cursor: "pointer", fontSize: 12, fontFamily: "'Barlow Condensed', sans-serif" }}>
                    RESET
                  </button>
                </div>
                {state.demoRunning && (
                  <div style={{ fontSize: 11, color: "#4fc3f7", opacity: 0.7 }}>
                    {(() => {
                      const cur = state.periodOptions.find(p => p.label === state.period);
                      if (cur && cur.next) {
                        const nextP = state.periodOptions.find(p => p.label === cur.next);
                        return `A 0:00 → ${cur.next} (${nextP ? nextP.duration : "20:00"})`;
                      }
                      return "A 0:00 → stop";
                    })()}
                  </div>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <label style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>Cadre horloge</label>
                <select value={state.clockBoxMode} onChange={e => update("clockBoxMode", e.target.value)}
                  style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 6, padding: "6px 10px", color: "#f1f5f9", fontSize: 14, fontFamily: "'Barlow Condensed', sans-serif", outline: "none" }}>
                  <option value="never">Jamais</option>
                  <option value="always">Toujours</option>
                  <option value="stopped">Horloge arrêtée</option>
                  <option value="running">Horloge en marche</option>
                </select>
              </div>
            </>
          )}
        </Section>

        <Section title="Polices" defaultOpen={false}>
          {[
            { key: "fontTeams", label: "Noms d'équipes / Scores" },
            { key: "fontClock", label: "Horloge / Période" },
            { key: "fontBody", label: "Titres / Stats / Pénalités" },
          ].map(f => (
            <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <label style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{f.label}</label>
              <select value={state[f.key]} onChange={e => update(f.key, e.target.value)}
                style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 6, padding: "6px 10px", color: "#f1f5f9", fontSize: 14, fontFamily: ff(state[f.key]), outline: "none" }}>
                {FONT_OPTIONS.map(o => (
                  <option key={o.id} value={o.id} style={{ fontFamily: o.family }}>{o.label}</option>
                ))}
              </select>
            </div>
          ))}
        </Section>

        <Section title="Titre(s)">
          {(state.bodyType === 1 || state.bodyType === 3) && <InputField label="Titre central" value={state.titleCenter} onChange={v => update("titleCenter", v)} />}
          {state.bodyType === 2 && (
            <>
              <InputField label="Titre gauche" value={state.titleLeft} onChange={v => update("titleLeft", v)} />
              <InputField label="Titre droite" value={state.titleRight} onChange={v => update("titleRight", v)} />
            </>
          )}
        </Section>

        {bodyType === 3 ? (
          <Section title={`Stats joueur (${state.playerStats.length}/8)`}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 13 }}>
              <input type="checkbox" checked={state.showPlayerPhoto} onChange={e => update("showPlayerPhoto", e.target.checked)} style={{ accentColor: "#4fc3f7" }} />
              Afficher photo joueur
            </label>
            {state.playerStats.map((s, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 4, background: "#1e293b", borderRadius: 6, padding: "6px 8px" }}>
                <div style={{ display: "flex", gap: 4, alignItems: "flex-end" }}>
                  <InputField label="Variable" value={s.label} onChange={v => updatePlayerStat(i, "label", v)} />
                  {state.showPlayerPhoto && <InputField label="No" value={s.playerNumber} onChange={v => updatePlayerStat(i, "playerNumber", v)} />}
                  <InputField label="Nom Prénom" value={s.playerName} onChange={v => updatePlayerStat(i, "playerName", v)} />
                  <InputField label="Valeur" value={s.value} onChange={v => updatePlayerStat(i, "value", v)} />
                  <BtnRemove onClick={() => removePlayerStat(i)} />
                </div>
              </div>
            ))}
            {state.playerStats.length < 8 && (
              <BtnAdd onClick={() => update("playerStats", [...state.playerStats, { label: "STAT", value: "0", playerName: "PLAYER", playerNumber: "00" }])} label="Ajouter une ligne" />
            )}
          </Section>
        ) : (
          <Section title={`Lignes de stats (${state.stats.length}/8)`}>
            {state.stats.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
                <InputField label="Val. G" value={s.valLeft} onChange={v => updateStat(i, "valLeft", v)} />
                <InputField label="Label" value={s.label} onChange={v => updateStat(i, "label", v)} />
                <InputField label="Val. D" value={s.valRight} onChange={v => updateStat(i, "valRight", v)} />
                <BtnRemove onClick={() => removeStat(i)} />
              </div>
            ))}
            {state.stats.length < 8 && <BtnAdd onClick={addStat} label="Ajouter une ligne" />}
          </Section>
        )}

        {state.showPenalties && (
          <>
            <Section title={`Pénalités ${state.team1} (${state.penaltiesLeft.length}/8)`}>
              {state.penaltiesLeft.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
                  <InputField label="Temps" value={p.time} onChange={v => updatePenalty("left", i, "time", v)} />
                  <InputField label="No" value={p.number} onChange={v => updatePenalty("left", i, "number", v)} />
                  <BtnRemove onClick={() => removePenalty("left", i)} />
                </div>
              ))}
              {state.penaltiesLeft.length < 8 && <BtnAdd onClick={() => addPenalty("left")} label="Ajouter" />}
            </Section>
            <Section title={`Pénalités ${state.team2} (${state.penaltiesRight.length}/8)`}>
              {state.penaltiesRight.map((p, i) => (
                <div key={i} style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
                  <InputField label="No" value={p.number} onChange={v => updatePenalty("right", i, "number", v)} />
                  <InputField label="Temps" value={p.time} onChange={v => updatePenalty("right", i, "time", v)} />
                  <BtnRemove onClick={() => removePenalty("right", i)} />
                </div>
              ))}
              {state.penaltiesRight.length < 8 && <BtnAdd onClick={() => addPenalty("right")} label="Ajouter" />}
            </Section>
          </>
        )}

        <Section title="Couleurs - Background" defaultOpen={false}>
          <ColorPick label="Haut" value={cc.bgTop} onChange={v => updateColor("bgTop", v)} opacity={oo.bgTop || 0} onOpacityChange={v => updateOpacity("bgTop", v)} />
          <ColorPick label="Milieu" value={cc.bgMid} onChange={v => updateColor("bgMid", v)} opacity={oo.bgMid || 0} onOpacityChange={v => updateOpacity("bgMid", v)} />
          <ColorPick label="Bas" value={cc.bgBot} onChange={v => updateColor("bgBot", v)} opacity={oo.bgBot || 0} onOpacityChange={v => updateOpacity("bgBot", v)} />
        </Section>

        <Section title="Couleurs - Header" defaultOpen={false}>
          <ColorPick label="Noms d'équipes" value={cc.teamName} onChange={v => updateColor("teamName", v)} opacity={oo.teamName || 0} onOpacityChange={v => updateOpacity("teamName", v)} />
          <ColorPick label="Scores" value={cc.score} onChange={v => updateColor("score", v)} opacity={oo.score || 0} onOpacityChange={v => updateOpacity("score", v)} />
          <ColorPick label="Cadre score" value={cc.scoreBox} onChange={v => updateColor("scoreBox", v)} opacity={oo.scoreBox || 0} onOpacityChange={v => updateOpacity("scoreBox", v)} />
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={() => updateColor("scoreBox", "")} style={{ flex: 1, background: "#1e293b", border: cc.scoreBox === "" ? "2px solid #4fc3f7" : "1px solid #334155", borderRadius: 4, color: "#94a3b8", padding: "3px 8px", cursor: "pointer", fontSize: 11 }}>Aucun cadre</button>
          </div>
          <ColorPick label="Horloge" value={cc.time} onChange={v => updateColor("time", v)} opacity={oo.time || 0} onOpacityChange={v => updateOpacity("time", v)} />
          <ColorPick label="Cadre horloge" value={cc.clockBox} onChange={v => updateColor("clockBox", v)} opacity={oo.clockBox || 0} onOpacityChange={v => updateOpacity("clockBox", v)} />
          <ColorPick label="Période" value={cc.period} onChange={v => updateColor("period", v)} opacity={oo.period || 0} onOpacityChange={v => updateOpacity("period", v)} />
        </Section>

        <Section title="Couleurs - Corps" defaultOpen={false}>
          <ColorPick label="Titres" value={cc.titleText} onChange={v => updateColor("titleText", v)} opacity={oo.titleText || 0} onOpacityChange={v => updateOpacity("titleText", v)} />
          <ColorPick label="Valeurs stats" value={cc.statVal} onChange={v => updateColor("statVal", v)} opacity={oo.statVal || 0} onOpacityChange={v => updateOpacity("statVal", v)} />
          <ColorPick label="Labels stats" value={cc.statLabel} onChange={v => updateColor("statLabel", v)} opacity={oo.statLabel || 0} onOpacityChange={v => updateOpacity("statLabel", v)} />
        </Section>

        {state.showPenalties && (
          <Section title="Couleurs - Pénalités" defaultOpen={false}>
            <ColorPick label="Temps" value={cc.penaltyTime} onChange={v => updateColor("penaltyTime", v)} opacity={oo.penaltyTime || 0} onOpacityChange={v => updateOpacity("penaltyTime", v)} />
            <ColorPick label="Numéros" value={cc.penaltyNumber} onChange={v => updateColor("penaltyNumber", v)} opacity={oo.penaltyNumber || 0} onOpacityChange={v => updateOpacity("penaltyNumber", v)} />
          </Section>
        )}

        <Section title="Presets de couleurs" defaultOpen={false}>
          {[
            { label: "OMEGA Blue (défaut)", colors: { ...defaultColors } },
            { label: "Dark Mode", colors: { ...defaultColors, bgTop: "#0a0a0a", bgMid: "#1a1a2e", bgBot: "#0a0a0a", statVal: "#00e5ff", penaltyTime: "#ff4444" } },
            { label: "Ice White", colors: { ...defaultColors, bgTop: "#e3f2fd", bgMid: "#bbdefb", bgBot: "#90caf9", teamName: "#0d47a1", score: "#0d47a1", time: "#1565c0", period: "#1565c0", titleText: "#0d47a1", statVal: "#01579b", statLabel: "#1565c0", penaltyTime: "#c62828", penaltyNumber: "#0d47a1" } },
            { label: "Hockey Red", colors: { ...defaultColors, bgTop: "#4a0000", bgMid: "#b71c1c", bgBot: "#4a0000", statVal: "#ffcdd2", penaltyTime: "#ffeb3b" } },
            { label: "Arena Green", colors: { ...defaultColors, bgTop: "#003300", bgMid: "#1b5e20", bgBot: "#003300", statVal: "#69f0ae", penaltyTime: "#ff5252" } },
          ].map(p => (
            <button key={p.label} onClick={() => { update("colors", { ...p.colors }); update("opacities", { ...defaultOpacities }); }}
              style={{ background: `linear-gradient(90deg, ${p.colors.bgTop}, ${p.colors.bgMid}, ${p.colors.bgBot})`, border: "1px solid #334155", borderRadius: 6, color: p.colors.teamName, padding: "8px 12px", cursor: "pointer", fontSize: 13, width: "100%", textAlign: "left", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: 1 }}>
              {p.label}
            </button>
          ))}
        </Section>

        <div style={{ height: 40 }} />
      </div>

      {/* PREVIEW */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "#020617", overflow: "hidden" }}>
        <ScoreboardPreview state={state} />
      </div>
    </div>
  );
}
