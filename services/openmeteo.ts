// geocoding: converte nome de cidade em coordenadas
// weather: retorna dados meteorológicos atuais

const URL_GEO     = 'https://geocoding-api.open-meteo.com/v1/search';
const URL_WEATHER = 'https://api.open-meteo.com/v1/forecast';

export interface Cidade {
  id: number;
  nome: string;        
  pais: string;       
  estado: string;       
  latitude: number;
  longitude: number;
}

export interface ClimaAtual {
  cidade: string;
  pais: string;
  latitude: number;
  longitude: number;
  temperatura: number;          // °C
  sensacaoTermica: number;      // °C
  tempMin: number;              // °C (do dia)
  tempMax: number;              // °C (do dia)
  umidade: number;              // %
  pressao: number;              // hPa
  velocidadeVento: number;      // km/h
  direcaoVento: number;         // graus
  precipitacao: number;         // mm (última hora)
  codigoClima: number;          // WMO weather code
  descricaoClima: string;
  uv: number;                   // índice UV (0-11+)
  visibilidade: number;         // metros
  nuvens: number;               // % cobertura
  ehDia: boolean;
  horaAtualizacao: string;     
}

export interface PrevisaoDia {
  data: string;                
  tempMin: number;
  tempMax: number;
  codigoClima: number;
  descricaoClima: string;
  precipitacaoTotal: number;    // mm
  chuvaProbabilidade: number;   // %
  velocidadeVentoMax: number;   // km/h
  uv: number;
}

function descricaoWMO(codigo: number): string {
  const mapa: Record<number, string> = {
    0:  'Céu limpo', 1: 'Principalmente limpo', 2: 'Parcialmente nublado', 3: 'Nublado',
    45: 'Neblina', 48: 'Neblina com gelo',
    51: 'Garoa leve', 53: 'Garoa moderada', 55: 'Garoa intensa',
    61: 'Chuva leve', 63: 'Chuva moderada', 65: 'Chuva forte',
    71: 'Neve leve', 73: 'Neve moderada', 75: 'Neve intensa',
    77: 'Granizo',
    80: 'Pancadas leves', 81: 'Pancadas moderadas', 82: 'Pancadas fortes',
    85: 'Pancadas de neve leves', 86: 'Pancadas de neve fortes',
    95: 'Tempestade', 96: 'Tempestade com granizo', 99: 'Tempestade com granizo forte',
  };
  return mapa[codigo] ?? 'Condição desconhecida';
}

export async function buscarCidades(nome: string): Promise<Cidade[]> {
  const params = new URLSearchParams({
    name: nome,
    count: '5',
    language: 'pt',
    format: 'json',
  });
  const res = await fetch(`${URL_GEO}?${params}`);
  if (!res.ok) throw new Error(`Erro no geocoding: ${res.status}`);
  const dados = await res.json();
  if (!dados.results) return [];

  return dados.results.map((r: any): Cidade => ({
    id:        r.id,
    nome:      r.name,
    pais:      r.country ?? '',
    estado:    r.admin1 ?? '',
    latitude:  r.latitude,
    longitude: r.longitude,
  }));
}

export async function fetchClimaAtual(cidade: Cidade): Promise<ClimaAtual> {
  const params = new URLSearchParams({
    latitude:               String(cidade.latitude),
    longitude:              String(cidade.longitude),
    current:                [
      'temperature_2m', 'relative_humidity_2m', 'apparent_temperature',
      'precipitation', 'weather_code', 'cloud_cover', 'pressure_msl',
      'wind_speed_10m', 'wind_direction_10m', 'is_day', 'uv_index', 'visibility',
    ].join(','),
    daily:                  'temperature_2m_max,temperature_2m_min',
    wind_speed_unit:        'kmh',
    timezone:               'auto',
    forecast_days:          '1',
  });

  const res = await fetch(`${URL_WEATHER}?${params}`);
  if (!res.ok) throw new Error(`Erro na API de clima: ${res.status}`);
  const dados = await res.json();
  const c = dados.current;

  return {
    cidade:          cidade.nome,
    pais:            cidade.pais,
    latitude:        cidade.latitude,
    longitude:       cidade.longitude,
    temperatura:     Math.round(c.temperature_2m),
    sensacaoTermica: Math.round(c.apparent_temperature),
    tempMin:         Math.round(dados.daily.temperature_2m_min[0]),
    tempMax:         Math.round(dados.daily.temperature_2m_max[0]),
    umidade:         c.relative_humidity_2m,
    pressao:         Math.round(c.pressure_msl),
    velocidadeVento: Math.round(c.wind_speed_10m),
    direcaoVento:    c.wind_direction_10m,
    precipitacao:    c.precipitation,
    codigoClima:     c.weather_code,
    descricaoClima:  descricaoWMO(c.weather_code),
    uv:              c.uv_index ?? 0,
    visibilidade:    c.visibility ?? 0,
    nuvens:          c.cloud_cover,
    ehDia:           c.is_day === 1,
    horaAtualizacao: c.time,
  };
}

export async function fetchPrevisao(cidade: Cidade): Promise<PrevisaoDia[]> {
  const params = new URLSearchParams({
    latitude:        String(cidade.latitude),
    longitude:       String(cidade.longitude),
    daily:           [
      'temperature_2m_max', 'temperature_2m_min', 'weather_code',
      'precipitation_sum', 'precipitation_probability_max',
      'wind_speed_10m_max', 'uv_index_max',
    ].join(','),
    wind_speed_unit: 'kmh',
    timezone:        'auto',
    forecast_days:   '7',
  });

  const res = await fetch(`${URL_WEATHER}?${params}`);
  if (!res.ok) throw new Error(`Erro na previsão: ${res.status}`);
  const dados = await res.json();
  const d = dados.daily;

  return d.time.map((data: string, i: number): PrevisaoDia => ({
    data,
    tempMin:              Math.round(d.temperature_2m_min[i]),
    tempMax:              Math.round(d.temperature_2m_max[i]),
    codigoClima:          d.weather_code[i],
    descricaoClima:       descricaoWMO(d.weather_code[i]),
    precipitacaoTotal:    d.precipitation_sum[i] ?? 0,
    chuvaProbabilidade:   d.precipitation_probability_max[i] ?? 0,
    velocidadeVentoMax:   Math.round(d.wind_speed_10m_max[i]),
    uv:                   d.uv_index_max[i] ?? 0,
  }));
}

export function direcaoVentoTexto(graus: number): string {
  const dirs = ['N','NNE','NE','ENE','L','ESE','SE','SSE','S','SSO','SO','OSO','O','ONO','NO','NNO'];
  return dirs[Math.round(graus / 22.5) % 16];
}

export function emojiClima(codigo: number, ehDia: boolean): string {
  if (codigo === 0)              return ehDia ? '☀️' : '🌙';
  if (codigo <= 2)               return ehDia ? '⛅' : '🌤';
  if (codigo === 3)              return '☁️';
  if (codigo <= 48)              return '🌫';
  if (codigo <= 55)              return '🌦';
  if (codigo <= 65)              return '🌧';
  if (codigo <= 77)              return '❄️';
  if (codigo <= 82)              return '🌦';
  if (codigo <= 86)              return '🌨';
  return '⛈';
}

export function nivelUV(uv: number): string {
  if (uv <= 2)  return 'Baixo';
  if (uv <= 5)  return 'Moderado';
  if (uv <= 7)  return 'Alto';
  if (uv <= 10) return 'Muito Alto';
  return 'Extremo';
}

export function formatarData(dataStr: string): string {
  const d = new Date(dataStr + 'T12:00:00');
  return d.toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' });
}
