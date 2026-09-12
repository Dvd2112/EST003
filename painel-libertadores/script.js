// ------------------------------------------------------------------
// Copa Libertadores em Números (2012–2026) — painel interativo
// Consome data/libertadores_bundle.json (matches, club_stats,
// country_stats, champions, best_worst_per_year)
// ------------------------------------------------------------------

// Paleta em tons de verde — um matiz distinto por país para diferenciação visual
// Cores oficiais por país (espelham as CSS custom properties --bra, --arg... em style.css)
const COUNTRY_COLORS = {
  BRA: "#FFDF00",
  ARG: "#75AADB",
  URU: "#5C9CD4",
  PAR: "#D52B1E",
  CHI: "#D52B1E",
  BOL: "#F9E300",
  PER: "#D91023",
  ECU: "#FFD100",
  COL: "#FCD116",
  VEN: "#FFCC00",
  MEX: "#006341",
};
const CHART_GRID_COLOR = "#234a34";
const COUNTRY_NAMES = {
  BRA: "Brasil", ARG: "Argentina", URU: "Uruguai", PAR: "Paraguai",
  CHI: "Chile", BOL: "Bolívia", PER: "Peru", ECU: "Equador",
  COL: "Colômbia", VEN: "Venezuela", MEX: "México",
};
const COUNTRY_FLAGS = {
  BRA: "🇧🇷", ARG: "🇦🇷", URU: "🇺🇾", PAR: "🇵🇾",
  CHI: "🇨🇱", BOL: "🇧🇴", PER: "🇵🇪", ECU: "🇪🇨",
  COL: "🇨🇴", VEN: "🇻🇪", MEX: "🇲🇽",
};

function countryColor(code) {
  return COUNTRY_COLORS[code] || "#888888";
}
function countryLabel(code) {
  return `${COUNTRY_FLAGS[code] || ""} ${COUNTRY_NAMES[code] || code}`.trim();
}

// Cores reais/reconhecíveis dos clubes mais tradicionais do dataset.
// Clubes sem entrada aqui recebem uma cor estável gerada automaticamente
// (mesma cor sempre para o mesmo nome) — ver hashColor().
const CLUB_COLORS = {
  // Brasil
  "Flamengo": "#C8102E",
  "Palmeiras": "#006437",
  "Corinthians": "#4d4d4d",
  "São Paulo FC": "#E4032E",
  "Santos FC": "#e8e8e8",
  "Grêmio": "#0D80C0",
  "Internacional": "#E2231A",
  "Athletico Paranaense": "#A3122A",
  "Atlético Mineiro": "#1c1c1c",
  "Cruzeiro": "#003399",
  "Fluminense": "#7A0C2E",
  "Botafogo": "#2b2b2b",
  "Fortaleza": "#1560BD",
  "Bragantino": "#E4002B",
  "Vasco da Gama RJ": "#1a1a1a",
  "América MG": "#00A550",
  "Bahia": "#0033A0",
  "Mirassol FC": "#FFD400",
  // Argentina
  "Boca Juniors": "#0033A0",
  "River Plate (ARG)": "#D2001C",
  "Racing Club": "#6CACE4",
  "San Lorenzo": "#0B3D91",
  "Independiente": "#E2231A",
  "Vélez Sarsfield": "#1E5AA8",
  "Estudiantes": "#C8102E",
  "Talleres": "#0057A8",
  "Lanús": "#7C0A02",
  "Argentinos Juniors": "#D7141A",
  "Huracán": "#E2001A",
  "Rosario Central": "#0B3D91",
  "Godoy Cruz": "#1560BD",
  "Newell's Old Boys": "#B8121A",
  "Independiente Rivadavia": "#0033A0",
  "Platense": "#7C4A00",
  "Defensa y Justicia": "#00843D",
  "Banfield": "#009640",
  "Patronato": "#B8121A",
  "Atlético Tucumán": "#6CACE4",
  "Tigre": "#0057A8",
  "Colón de Santa Fe": "#C8102E",
  "CA Central Córdoba": "#004B93",
  // Uruguai
  "Peñarol": "#F2C500",
  "Nacional": "#004B93",
  "Defensor Sporting": "#6C2C91",
  "Liverpool": "#7B1E3A",
  "Danubio": "#004B93",
  "Montevideo Wanderers": "#C8102E",
  "River Plate (URU)": "#D2001C",
  // Paraguai
  "Club Olimpia": "#2E2E2E",
  "Cerro Porteño": "#C8102E",
  "Libertad": "#8A1538",
  "Guaraní": "#A6192E",
  "Club Nacional": "#004B93",
  // Colômbia
  "Atlético Nacional": "#00964B",
  "Millonarios": "#003DA5",
  "Santa Fe": "#D2122E",
  "Atlético Junior": "#E4032E",
  "Deportes Tolima": "#B5121B",
  "Independiente Medellín": "#DA291C",
  "Deportivo Cali": "#00843D",
  "América de Cali": "#D2122E",
  // Chile
  "Colo-Colo": "#2E2E2E",
  "Universidad de Chile": "#0057A8",
  "Universidad Católica": "#4B2E83",
  "Palestino": "#CE1126",
  "Huachipato": "#2b2b2b",
  "O'Higgins": "#003DA5",
  "Unión Española": "#004B93",
  // Equador
  "Barcelona": "#FFCC00",
  "LDU Quito": "#0057B8",
  "Independiente del Valle": "#D0112B",
  "El Nacional": "#4B5320",
  "Emelec": "#0033A0",
  "Deportivo Quito": "#1560BD",
  "SD Aucas": "#F2A900",
  "Universidad Catolica (ECU)": "#7A1F91",
  // Peru
  "Alianza Lima": "#003DA5",
  "Sporting Cristal": "#3AA6DA",
  "Universitario de Deportes": "#7C1D2C",
  "FBC Melgar": "#8A1538",
  // Bolívia
  "Bolívar": "#4FA8DA",
  "The Strongest": "#F5C400",
  "Always Ready": "#D2122E",
  "Jorge Wilstermann": "#2E8B57",
  // Venezuela
  "Caracas FC": "#8A1538",
  "Deportivo Táchira": "#D4AF37",
  "Zamora FC": "#F2C500",
  "Monagas": "#003DA5",
  "Carabobo FC": "#004B93",
  "Deportivo La Guaira": "#C8102E",
  // México
  "UANL Tigres": "#FFCC00",
  "Cruz Azul": "#004B93",
  "Club León": "#046A38",
};

function hashColor(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 55%, 55%)`;
}

function clubColor(name) {
  return CLUB_COLORS[name] || hashColor(name);
}

// Cor efetiva de um clube conforme o modo escolhido no seletor
// "Cor dos gráficos" (país ou clube).
function activeColor(club) {
  return state.colorMode === "club" ? clubColor(club.name) : countryColor(club.country);
}

const state = {
  countries: new Set(),
  colorMode: "country", // "country" | "club"
  yearMode: "range", // "range" | "single"
  yearMin: 2012,
  yearMax: 2026,
  search: "",
  sortKey: "titles",
  sortDir: "desc",
};

let BUNDLE = null;
let CLUBS = []; // normalized club array: {name, country, mp, w, d, l, gf, ga, titles, runner_up, years}
let charts = {};

async function main() {
  const res = await fetch("data/libertadores_bundle.json");
  BUNDLE = await res.json();

  CLUBS = Object.entries(BUNDLE.club_stats).map(([key, v]) => {
    const name = key.split("|")[0];
    return {
      name,
      country: v.country,
      mp: v.mp || 0,
      w: v.w || 0,
      d: v.d || 0,
      l: v.l || 0,
      gf: v.gf || 0,
      ga: v.ga || 0,
      titles: v.titles || 0,
      runner_up: v.runner_up || 0,
      years: v.years || [],
    };
  });

  const allCountries = Object.keys(BUNDLE.country_stats).sort();
  allCountries.forEach((c) => state.countries.add(c));

  buildCountryDropdown(allCountries);
  bindFilterEvents();
  initCharts();
  renderAll();
}

function buildCountryDropdown(countries) {
  const wrap = document.getElementById("countryChecks");
  wrap.innerHTML = "";
  countries.forEach((code) => {
    const label = document.createElement("label");
    label.className = "country-check-item";
    label.innerHTML = `
      <input type="checkbox" value="${code}" checked />
      <span class="swatch" style="background:${countryColor(code)}"></span>
      <span>${countryLabel(code)}</span>
    `;
    const checkbox = label.querySelector("input");
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        state.countries.add(code);
      } else {
        state.countries.delete(code);
      }
      updateCountryDropdownLabel(countries.length);
      renderAll();
    });
    wrap.appendChild(label);
  });
  updateCountryDropdownLabel(countries.length);
}

function updateCountryDropdownLabel(total) {
  const labelEl = document.getElementById("countryDropdownLabel");
  const selected = state.countries.size;
  if (selected === total) {
    labelEl.textContent = "Todos os países";
  } else if (selected === 0) {
    labelEl.textContent = "Nenhum país selecionado";
  } else if (selected <= 2) {
    labelEl.textContent = [...state.countries].map((c) => countryLabel(c)).join(", ");
  } else {
    labelEl.textContent = `${selected} de ${total} países`;
  }
}

// ------------------------------------------------------------------
// Dropdowns genéricos (país + ano) — abre um por vez, fecha ao clicar
// fora ou pressionar Esc.
// ------------------------------------------------------------------
const DROPDOWNS = [];

function registerDropdown(btnId, menuId) {
  const btn = document.getElementById(btnId);
  const menu = document.getElementById(menuId);
  DROPDOWNS.push({ btn, menu });

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasOpen = !menu.hidden;
    closeAllDropdowns();
    if (!wasOpen) {
      menu.hidden = false;
      btn.setAttribute("aria-expanded", "true");
    }
  });
  menu.addEventListener("click", (e) => e.stopPropagation());
}

function closeAllDropdowns() {
  DROPDOWNS.forEach(({ btn, menu }) => {
    menu.hidden = true;
    btn.setAttribute("aria-expanded", "false");
  });
}

document.addEventListener("click", closeAllDropdowns);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAllDropdowns();
});

// ------------------------------------------------------------------
// Dropdown de ano: modo "Período" (De/Até) ou "Ano específico"
// ------------------------------------------------------------------
const YEARS = [];
for (let y = 2012; y <= 2026; y++) YEARS.push(y);

function makeYearChip(year, onClick) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "year-chip";
  btn.textContent = year;
  btn.dataset.year = String(year);
  btn.addEventListener("click", onClick);
  return btn;
}

function buildYearDropdown() {
  const fromList = document.getElementById("yearFromList");
  const toList = document.getElementById("yearToList");
  const singleList = document.getElementById("yearSingleList");

  YEARS.forEach((y) => {
    fromList.appendChild(makeYearChip(y, () => {
      state.yearMin = y;
      if (state.yearMax < state.yearMin) state.yearMax = state.yearMin;
      refreshYearUI();
      renderAll();
    }));
    toList.appendChild(makeYearChip(y, () => {
      state.yearMax = y;
      if (state.yearMin > state.yearMax) state.yearMin = state.yearMax;
      refreshYearUI();
      renderAll();
    }));
    singleList.appendChild(makeYearChip(y, () => {
      state.yearMin = y;
      state.yearMax = y;
      refreshYearUI();
      renderAll();
    }));
  });

  document.querySelectorAll(".year-mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".year-mode-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.yearMode = btn.dataset.mode;
      document.getElementById("yearRangeMode").hidden = state.yearMode !== "range";
      document.getElementById("yearSingleMode").hidden = state.yearMode !== "single";
      if (state.yearMode === "single") {
        state.yearMax = state.yearMin;
      }
      refreshYearUI();
      renderAll();
    });
  });

  refreshYearUI();
}

function refreshYearUI() {
  document.querySelectorAll("#yearFromList .year-chip").forEach((b) => {
    b.classList.toggle("active", parseInt(b.dataset.year, 10) === state.yearMin);
  });
  document.querySelectorAll("#yearToList .year-chip").forEach((b) => {
    b.classList.toggle("active", parseInt(b.dataset.year, 10) === state.yearMax);
  });
  document.querySelectorAll("#yearSingleList .year-chip").forEach((b) => {
    b.classList.toggle("active", parseInt(b.dataset.year, 10) === state.yearMin);
  });

  const label = document.getElementById("yearDropdownLabel");
  if (state.yearMode === "single" || state.yearMin === state.yearMax) {
    label.textContent = `${state.yearMin}`;
  } else {
    label.textContent = `${state.yearMin}–${state.yearMax}`;
  }
}

function resetYearFilter() {
  state.yearMode = "range";
  state.yearMin = 2012;
  state.yearMax = 2026;
  document.querySelectorAll(".year-mode-btn").forEach((b) => b.classList.toggle("active", b.dataset.mode === "range"));
  document.getElementById("yearRangeMode").hidden = false;
  document.getElementById("yearSingleMode").hidden = true;
  refreshYearUI();
}

function bindFilterEvents() {
  registerDropdown("countryDropdownBtn", "countryDropdownMenu");
  registerDropdown("yearDropdownBtn", "yearDropdownMenu");

  buildYearDropdown();

  document.getElementById("selectAllCountries").addEventListener("click", () => {
    state.countries = new Set(Object.keys(BUNDLE.country_stats));
    document.querySelectorAll("#countryChecks input[type=checkbox]").forEach((cb) => (cb.checked = true));
    updateCountryDropdownLabel(Object.keys(BUNDLE.country_stats).length);
    renderAll();
  });
  document.getElementById("clearAllCountries").addEventListener("click", () => {
    state.countries = new Set();
    document.querySelectorAll("#countryChecks input[type=checkbox]").forEach((cb) => (cb.checked = false));
    updateCountryDropdownLabel(Object.keys(BUNDLE.country_stats).length);
    renderAll();
  });

  let searchTimer = null;
  document.getElementById("searchInput").addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    const val = e.target.value;
    searchTimer = setTimeout(() => {
      state.search = val.trim().toLowerCase();
      renderAll();
    }, 200);
  });

  document.querySelectorAll(".color-mode-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".color-mode-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      state.colorMode = btn.dataset.mode;
      renderAll();
    });
  });

  document.getElementById("resetFilters").addEventListener("click", () => {
    state.countries = new Set(Object.keys(BUNDLE.country_stats));
    state.search = "";
    state.colorMode = "country";
    document.getElementById("searchInput").value = "";
    document.querySelectorAll("#countryChecks input[type=checkbox]").forEach((cb) => (cb.checked = true));
    updateCountryDropdownLabel(Object.keys(BUNDLE.country_stats).length);
    document.querySelectorAll(".color-mode-btn").forEach((b) => b.classList.toggle("active", b.dataset.mode === "country"));
    resetYearFilter();
    renderAll();
  });

  document.querySelectorAll("#clubTable thead th").forEach((th) => {
    th.addEventListener("click", () => {
      const key = th.dataset.key;
      if (state.sortKey === key) {
        state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
      } else {
        state.sortKey = key;
        state.sortDir = "desc";
      }
      renderTable(getFilteredClubs());
    });
  });
}

function getFilteredClubs() {
  return CLUBS.filter((c) => {
    if (!state.countries.has(c.country)) return false;
    if (state.search && !c.name.toLowerCase().includes(state.search)) return false;
    const hasYearOverlap = c.years.some((y) => y >= state.yearMin && y <= state.yearMax);
    if (c.years.length && !hasYearOverlap) return false;
    return true;
  });
}

function getFilteredChampions() {
  return Object.entries(BUNDLE.champions).filter(([year]) => {
    const y = parseInt(year, 10);
    return y >= state.yearMin && y <= state.yearMax;
  });
}

// ------------------------------------------------------------------
// KPIs
// ------------------------------------------------------------------
function renderKPIs(clubs, champsEntries) {
  const totalJogos = clubs.reduce((s, c) => s + c.mp, 0) / 2; // cada jogo conta para 2 clubes
  document.getElementById("kpiJogos").textContent = Math.round(totalJogos).toLocaleString("pt-BR");

  const topClubTitles = [...clubs].filter((c) => state.countries.has(c.country))
    .sort((a, b) => b.titles - a.titles)[0];
  document.getElementById("kpiClubeTitulos").textContent =
    topClubTitles && topClubTitles.titles > 0 ? `${topClubTitles.name} (${topClubTitles.titles})` : "—";

  const titlesByCountry = {};
  champsEntries.forEach(([, v]) => {
    titlesByCountry[v.champion_country] = (titlesByCountry[v.champion_country] || 0) + 1;
  });
  const filteredTitlesByCountry = Object.entries(titlesByCountry)
    .filter(([code]) => state.countries.has(code))
    .sort((a, b) => b[1] - a[1]);
  document.getElementById("kpiPaisTitulos").textContent = filteredTitlesByCountry.length
    ? `${countryLabel(filteredTitlesByCountry[0][0])} (${filteredTitlesByCountry[0][1]})`
    : "—";

  const withGames = clubs.filter((c) => c.mp >= 6);
  const bestAtk = [...withGames].sort((a, b) => (b.gf / b.mp) - (a.gf / a.mp))[0];
  const bestDef = [...withGames].sort((a, b) => (a.ga / a.mp) - (b.ga / b.mp))[0];
  document.getElementById("kpiMelhorAtaque").textContent = bestAtk
    ? `${bestAtk.name} (${(bestAtk.gf / bestAtk.mp).toFixed(2)})` : "—";
  document.getElementById("kpiMelhorDefesa").textContent = bestDef
    ? `${bestDef.name} (${(bestDef.ga / bestDef.mp).toFixed(2)})` : "—";
}

// ------------------------------------------------------------------
// Charts
// ------------------------------------------------------------------
function initCharts() {
  const ctxTitulos = document.getElementById("chartTitulos").getContext("2d");
  charts.titulos = new Chart(ctxTitulos, {
    type: "bar",
    data: { labels: [], datasets: [{ label: "Títulos", data: [], backgroundColor: [] }] },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (c) => `${c.parsed.x} título(s)` } },
      },
      scales: {
        x: { title: { display: true, text: "Títulos" }, ticks: { precision: 0 }, grid: { color: "#234a34" } },
        y: { grid: { display: false } },
      },
    },
  });

  const ctxPizza = document.getElementById("chartPizzaPaises").getContext("2d");
  charts.pizza = new Chart(ctxPizza, {
    type: "doughnut",
    data: { labels: [], datasets: [{ data: [], backgroundColor: [] }] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { color: "#e6f5ec" } },
        tooltip: { callbacks: { label: (c) => `${c.label}: ${c.parsed} título(s)` } },
      },
    },
  });

  const ctxLinha = document.getElementById("chartLinhaTitulos").getContext("2d");
  charts.linha = new Chart(ctxLinha, {
    type: "line",
    data: { labels: [], datasets: [] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      plugins: { legend: { position: "bottom", labels: { color: "#e6f5ec" } } },
      scales: {
        x: { title: { display: true, text: "Ano" }, grid: { color: "#234a34" } },
        y: {
          title: { display: true, text: "Títulos acumulados" },
          ticks: { precision: 0 },
          grid: { color: "#234a34" },
        },
      },
    },
  });

  const ctxScatter = document.getElementById("chartScatter").getContext("2d");
  charts.scatter = new Chart(ctxScatter, {
    type: "bubble",
    data: { datasets: [] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (c) => `${c.raw.label}: ${c.raw.x.toFixed(2)} gols marc./jogo, ${c.raw.y.toFixed(2)} gols sofr./jogo, ${c.raw.titles} título(s)`,
          },
        },
      },
      scales: {
        x: { title: { display: true, text: "Gols marcados por jogo" }, grid: { color: "#234a34" } },
        y: { title: { display: true, text: "Gols sofridos por jogo" }, grid: { color: "#234a34" } },
      },
    },
  });

  const ctxVitorias = document.getElementById("chartVitorias").getContext("2d");
  charts.vitorias = new Chart(ctxVitorias, {
    type: "bar",
    data: { labels: [], datasets: [{ label: "Vitórias", data: [], backgroundColor: [] }] },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { autoSkip: false, maxRotation: 40, minRotation: 20 } },
        y: { title: { display: true, text: "Vitórias" }, ticks: { precision: 0 }, grid: { color: "#234a34" } },
      },
    },
  });

  const ctxPaisGols = document.getElementById("chartPaisGols").getContext("2d");
  charts.paisGols = new Chart(ctxPaisGols, {
    type: "bar",
    data: {
      labels: [],
      datasets: [
        { label: "Gols marcados/jogo", data: [], backgroundColor: "#2ecc71" },
        { label: "Gols sofridos/jogo", data: [], backgroundColor: "#0b6e4f" },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: "bottom", labels: { color: "#e6f5ec" } } },
      scales: {
        x: { grid: { display: false } },
        y: { title: { display: true, text: "Gols por jogo" }, grid: { color: "#234a34" } },
      },
    },
  });
}

function updateTitulosChart(clubs) {
  const top = [...clubs].filter((c) => c.titles > 0)
    .sort((a, b) => b.titles - a.titles)
    .slice(0, 10);
  charts.titulos.data.labels = top.map((c) => c.name);
  charts.titulos.data.datasets[0].data = top.map((c) => c.titles);
  charts.titulos.data.datasets[0].backgroundColor = top.map((c) => activeColor(c));
  charts.titulos.update();
}

function updatePizzaChart(champsEntries) {
  const byCountry = {};
  champsEntries.forEach(([, v]) => {
    if (!state.countries.has(v.champion_country)) return;
    byCountry[v.champion_country] = (byCountry[v.champion_country] || 0) + 1;
  });
  const entries = Object.entries(byCountry).sort((a, b) => b[1] - a[1]);
  charts.pizza.data.labels = entries.map(([c]) => countryLabel(c));
  charts.pizza.data.datasets[0].data = entries.map(([, n]) => n);
  charts.pizza.data.datasets[0].backgroundColor = entries.map(([c]) => countryColor(c));
  charts.pizza.update();
}

function updateLinhaChart(champsEntries) {
  const years = champsEntries.map(([y]) => parseInt(y, 10)).sort((a, b) => a - b);
  const countriesInvolved = [...new Set(champsEntries.map(([, v]) => v.champion_country))]
    .filter((c) => state.countries.has(c));

  const cumulative = {};
  countriesInvolved.forEach((c) => (cumulative[c] = 0));

  const datasetsData = {};
  countriesInvolved.forEach((c) => (datasetsData[c] = []));

  years.forEach((y) => {
    const entry = champsEntries.find(([yy]) => parseInt(yy, 10) === y);
    const champCountry = entry ? entry[1].champion_country : null;
    countriesInvolved.forEach((c) => {
      if (c === champCountry) cumulative[c] += 1;
      datasetsData[c].push(cumulative[c]);
    });
  });

  charts.linha.data.labels = years;
  charts.linha.data.datasets = countriesInvolved.map((c) => ({
    label: countryLabel(c),
    data: datasetsData[c],
    borderColor: countryColor(c),
    backgroundColor: countryColor(c),
    tension: 0.25,
    fill: false,
  }));
  charts.linha.update();
}

function updateScatterChart(clubs) {
  const withGames = clubs.filter((c) => c.mp >= 6);
  charts.scatter.data.datasets = [{
    label: "Clubes",
    data: withGames.map((c) => ({
      x: c.gf / c.mp,
      y: c.ga / c.mp,
      r: 4 + Math.min(c.titles, 3) * 5,
      label: c.name,
      titles: c.titles,
      backgroundColor: activeColor(c),
    })),
    backgroundColor: withGames.map((c) => activeColor(c)),
  }];
  charts.scatter.update();
}

function updateVitoriasChart(clubs) {
  const top = [...clubs].sort((a, b) => b.w - a.w).slice(0, 10);
  charts.vitorias.data.labels = top.map((c) => c.name);
  charts.vitorias.data.datasets[0].data = top.map((c) => c.w);
  charts.vitorias.data.datasets[0].backgroundColor = top.map((c) => activeColor(c));
  charts.vitorias.update();
}

function updatePaisGolsChart(clubs) {
  const byCountry = {};
  clubs.forEach((c) => {
    if (!byCountry[c.country]) byCountry[c.country] = { gf: 0, ga: 0, mp: 0 };
    byCountry[c.country].gf += c.gf;
    byCountry[c.country].ga += c.ga;
    byCountry[c.country].mp += c.mp;
  });
  const entries = Object.entries(byCountry)
    .filter(([, v]) => v.mp > 0)
    .sort((a, b) => (b[1].gf / b[1].mp) - (a[1].gf / a[1].mp));

  charts.paisGols.data.labels = entries.map(([c]) => countryLabel(c));
  charts.paisGols.data.datasets[0].data = entries.map(([, v]) => +(v.gf / v.mp).toFixed(2));
  charts.paisGols.data.datasets[1].data = entries.map(([, v]) => +(v.ga / v.mp).toFixed(2));
  charts.paisGols.update();
}

// ------------------------------------------------------------------
// Tabela
// ------------------------------------------------------------------
function renderTable(clubs) {
  const sorted = [...clubs].sort((a, b) => {
    const key = state.sortKey;
    let va = key === "name" || key === "country" ? a[key] : a[key];
    let vb = key === "name" || key === "country" ? b[key] : b[key];
    if (typeof va === "string") {
      return state.sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
    }
    return state.sortDir === "asc" ? va - vb : vb - va;
  });

  const tbody = document.getElementById("clubTableBody");
  tbody.innerHTML = sorted.map((c) => `
    <tr>
      <td>${c.name}</td>
      <td><span class="swatch" style="background:${activeColor(c)};display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:5px;"></span>${countryLabel(c.country)}</td>
      <td>${c.mp}</td>
      <td>${c.w}</td>
      <td>${c.d}</td>
      <td>${c.l}</td>
      <td>${c.gf}</td>
      <td>${c.ga}</td>
      <td>${c.titles}</td>
      <td>${c.runner_up}</td>
    </tr>
  `).join("");
}

// ------------------------------------------------------------------
// Orquestrador
// ------------------------------------------------------------------
function renderAll() {
  const clubs = getFilteredClubs();
  const champsEntries = getFilteredChampions();

  renderKPIs(clubs, champsEntries);
  updateTitulosChart(clubs);
  updatePizzaChart(champsEntries);
  updateLinhaChart(champsEntries);
  updateScatterChart(clubs);
  updateVitoriasChart(clubs);
  updatePaisGolsChart(clubs);
  renderTable(clubs);
}

main().catch((err) => {
  console.error(err);
  document.body.innerHTML = `<p style="color:#fff;padding:40px;">
    Erro ao carregar os dados (data/libertadores_bundle.json). Verifique se o arquivo
    existe e se a página está sendo servida por um servidor HTTP (não abra o
    index.html diretamente via file://, use "Live Server" ou "python -m http.server").
    <br><br>Detalhe técnico: ${err.message}</p>`;
});
