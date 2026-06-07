// Serviço de dados — NASA MSL (Curiosity) Weather API
// Fonte: Centro de Astrobiologia (CAB) via mars.nasa.gov
// Retorna leituras do instrumento REMS na Cratera Gale, Marte
// Sem necessidade de chave de API. Funciona normalmente em apps nativos.

const URL_NASA =
  'https://mars.nasa.gov/rss/api/?feed=weather&category=msl&feedtype=json';

// ── Tipos ─────────────────────────────────────────────────────────────────────

export interface SolWeather {
  sol: number;
  terrestrial_date: string;     // "AAAA-MM-DD"
  min_temp: number;             // Celsius (temperatura do ar)
  max_temp: number;             // Celsius (temperatura do ar)
  min_temp_fahrenheit: number;
  max_temp_fahrenheit: number;
  pressure: number;             // Pascals
  pressure_string: string;      // "Higher" | "Lower" | "Normal"
  abs_humidity: number | null;
  wind_speed: number | null;    // m/s
  wind_direction: string | null;
  atmo_opacity: string;         // "Sunny" | "Cloudy" etc.
  season: string;               // Estação marciana (ex: "Month 1")
  sunrise: string;              // "HH:MM" — horário local em Marte
  sunset: string;               // "HH:MM" — horário local em Marte
  ls: number;                   // Longitude solar (0–360°)
  uv_index: string;             // "Low" | "Moderate" | "High" | "Very High"
  min_gts_temp: number | null;  // Temperatura mínima do solo (Celsius)
  max_gts_temp: number | null;  // Temperatura máxima do solo (Celsius)
}

// Formato bruto retornado pela API da NASA
interface SolNasaBruto {
  id: string;
  sol: string;
  terrestrial_date: string;
  ls: string;
  season: string;
  min_temp: string;
  max_temp: string;
  pressure: string;
  pressure_string: string;
  abs_humidity: string;
  wind_speed: string;
  wind_direction: string;
  atmo_opacity: string;
  sunrise: string;
  sunset: string;
  local_uv_irradiance_index: string;
  min_gts_temp: string;
  max_gts_temp: string;
}

interface RespostaNasa {
  soles: SolNasaBruto[];
}

// ── Funções de parsing ────────────────────────────────────────────────────────

function celsiusParaFahrenheit(c: number): number {
  return Math.round((c * 9) / 5 + 32);
}

// Converte string da API para número, retorna null se ausente/inválido
function parsearNum(val: string | null | undefined): number | null {
  if (!val || val === '--' || val === 'N/A' || val.trim() === '') return null;
  const n = parseFloat(val);
  return isNaN(n) ? null : n;
}

// Limpa strings da API, retorna null se ausente
function parsearStr(val: string | null | undefined): string | null {
  if (!val || val === '--' || val === 'N/A' || val.trim() === '') return null;
  return val.trim();
}

// Converte o formato bruto da NASA para o tipo interno SolWeather
function converterSolNasa(bruto: SolNasaBruto): SolWeather {
  const tempMin = parsearNum(bruto.min_temp) ?? 0;
  const tempMax = parsearNum(bruto.max_temp) ?? 0;
  const ls      = parsearNum(bruto.ls) ?? 0;

  return {
    sol:                  parseInt(bruto.sol, 10),
    terrestrial_date:     bruto.terrestrial_date,
    min_temp:             tempMin,
    max_temp:             tempMax,
    min_temp_fahrenheit:  celsiusParaFahrenheit(tempMin),
    max_temp_fahrenheit:  celsiusParaFahrenheit(tempMax),
    pressure:             parsearNum(bruto.pressure) ?? 0,
    pressure_string:      bruto.pressure_string ?? 'Desconhecido',
    abs_humidity:         parsearNum(bruto.abs_humidity),
    wind_speed:           parsearNum(bruto.wind_speed),
    wind_direction:       parsearStr(bruto.wind_direction),
    atmo_opacity:         bruto.atmo_opacity ?? 'Desconhecido',
    season:               bruto.season ?? 'Desconhecido',
    sunrise:              bruto.sunrise ?? '--:--',
    sunset:               bruto.sunset ?? '--:--',
    ls,
    uv_index:             bruto.local_uv_irradiance_index ?? 'Desconhecido',
    min_gts_temp:         parsearNum(bruto.min_gts_temp),
    max_gts_temp:         parsearNum(bruto.max_gts_temp),
  };
}

// ── Chamadas à API ────────────────────────────────────────────────────────────

async function buscarNasa(): Promise<RespostaNasa> {
  const res = await fetch(URL_NASA, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`Erro na API da NASA: ${res.status}`);
  return res.json();
}

/** Retorna o sol mais recente disponível do REMS do Curiosity. */
export async function fetchLatestSol(): Promise<SolWeather> {
  const dados = await buscarNasa();
  if (!dados.soles || dados.soles.length === 0) {
    throw new Error('Nenhum dado de sol retornado pela API da NASA');
  }
  return converterSolNasa(dados.soles[0]);
}

/** Retorna os últimos N sols disponíveis (padrão: 7). */
export async function fetchRecentSols(quantidade = 7): Promise<SolWeather[]> {
  const dados = await buscarNasa();
  if (!dados.soles || dados.soles.length === 0) {
    throw new Error('Nenhum dado de sol retornado pela API da NASA');
  }
  return dados.soles.slice(0, quantidade).map(converterSolNasa);
}

// ── Funções auxiliares ────────────────────────────────────────────────────────

/** Retorna o nome da estação marciana com base na longitude solar (Ls). */
export function getMarsSeasonName(ls: number): string {
  if (ls < 90)  return 'Primavera do Norte';
  if (ls < 180) return 'Verão do Norte';
  if (ls < 270) return 'Outono do Norte';
  return 'Inverno do Norte';
}

/** Formata uma data terrestre no padrão brasileiro (ex: "3 jun 2026"). */
export function formatEarthDate(dateStr: string): string {
  const d = new Date(dateStr + 'T12:00:00Z');
  return d.toLocaleDateString('pt-BR', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Retorna uma descrição da opacidade atmosférica. */
export function getAtmoDescription(opacity: string): string {
  const mapa: Record<string, string> = {
    Sunny:       'Céu limpo, pouca poeira na atmosfera.',
    Cloudy:      "Nuvens de gelo d'água em alta altitude.",
    'Dust Storm':'Tempestade de poeira ativa reduzindo a visibilidade.',
  };
  return mapa[opacity] ?? 'Condições atmosféricas variáveis.';
}

/**
 * Calcula a Hora Solar Local Média (LMST) atual na Cratera Gale (137,4°E em Marte).
 * Usa a fórmula padrão do Mars Sol Date (MSD).
 * Retorna string no formato "HH:MM:SS".
 */
export function getMarsLocalTime(longitudeLeste = 137.4): string {
  const segundosUnix = Date.now() / 1000;
  // Tempo Unix → Data Juliana (UTC)
  const jdUtc = segundosUnix / 86400.0 + 2440587.5;
  // Correção TT (≈69s em 2026)
  const jdTt = jdUtc + 69.184 / 86400.0;
  // Mars Sol Date
  const msd = (jdTt - 2451549.5) / 1.0274912517 + 44796.0 - 0.0009626;
  // Tempo Coordenado de Marte em horas (meridiano principal)
  const mtcHoras = (msd % 1) * 24;
  // Hora Solar Local na longitude dada
  const lmst = ((mtcHoras + longitudeLeste * (24.0 / 360.0)) % 24 + 24) % 24;

  const h = Math.floor(lmst);
  const m = Math.floor((lmst - h) * 60);
  const s = Math.floor(((lmst - h) * 60 - m) * 60);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
