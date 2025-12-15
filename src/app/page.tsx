'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Centros y oficinas ANID por region
const CENTROS = [
  { id: 1, nombre: 'ANID Direccion Nacional', region: 'Metropolitana', ciudad: 'Santiago', direccion: 'Moneda 1375, piso 11', tipo: 'Sede Central', areas: ['Coordinacion', 'Fondos', 'Becas'] },
  { id: 2, nombre: 'Centro de Modelamiento Matematico (CMM)', region: 'Metropolitana', ciudad: 'Santiago', direccion: 'Beauchef 851, Torre Norte', tipo: 'Centro de Excelencia', areas: ['Matematicas', 'Modelamiento', 'Data Science'] },
  { id: 3, nombre: 'Centro de Regulacion del Genoma (CRG)', region: 'Metropolitana', ciudad: 'Santiago', direccion: 'Blanco Encalada 2085', tipo: 'Centro de Excelencia', areas: ['Genomica', 'Biotecnologia', 'Bioinformatica'] },
  { id: 4, nombre: 'Instituto Milenio de Oceanografia (IMO)', region: 'Biobio', ciudad: 'Concepcion', direccion: 'Universidad de Concepcion', tipo: 'Instituto Milenio', areas: ['Oceanografia', 'Cambio Climatico', 'Biodiversidad Marina'] },
  { id: 5, nombre: 'Centro de Astrofisica CATA', region: 'Metropolitana', ciudad: 'Santiago', direccion: 'Camino el Observatorio 1515', tipo: 'Centro de Excelencia', areas: ['Astronomia', 'Astrofisica', 'Cosmologia'] },
  { id: 6, nombre: 'Centro Ciencia del Clima y Resiliencia (CR2)', region: 'Metropolitana', ciudad: 'Santiago', direccion: 'Blanco Encalada 2002', tipo: 'Centro de Excelencia', areas: ['Clima', 'Medio Ambiente', 'Resiliencia'] },
  { id: 7, nombre: 'Instituto Antartico Chileno (INACH)', region: 'Magallanes', ciudad: 'Punta Arenas', direccion: 'Plaza Munoz Gamero 1055', tipo: 'Instituto Nacional', areas: ['Antartica', 'Glaciologia', 'Biologia Polar'] },
  { id: 8, nombre: 'Centro de Neurociencias de Valparaiso (CNV)', region: 'Valparaiso', ciudad: 'Valparaiso', direccion: 'Gran Bretana 1111', tipo: 'Centro de Excelencia', areas: ['Neurociencias', 'Biofisica', 'Farmacologia'] },
  { id: 9, nombre: 'Instituto de Ecologia y Biodiversidad (IEB)', region: 'Metropolitana', ciudad: 'Santiago', direccion: 'Las Palmeras 3425, Nunoa', tipo: 'Instituto Milenio', areas: ['Ecologia', 'Biodiversidad', 'Conservacion'] },
  { id: 10, nombre: 'Centro de Biotecnologia Vegetal', region: 'Metropolitana', ciudad: 'Santiago', direccion: 'UNAB, Republica 217', tipo: 'Centro FONDAP', areas: ['Biotecnologia', 'Agricultura', 'Genetica Vegetal'] },
  { id: 11, nombre: 'Centro Avanzado de Tecnologia para Mineria (AMTC)', region: 'Metropolitana', ciudad: 'Santiago', direccion: 'Av. Tupper 2007', tipo: 'Centro FONDAP', areas: ['Mineria', 'Automatizacion', 'Robotica'] },
  { id: 12, nombre: 'Instituto Milenio de Neurociencia Biomedica (BNI)', region: 'Metropolitana', ciudad: 'Santiago', direccion: 'Independencia 1027', tipo: 'Instituto Milenio', areas: ['Neurociencias', 'Biomedicina', 'Enfermedades Neurologicas'] },
  { id: 13, nombre: 'Observatorio ALMA', region: 'Antofagasta', ciudad: 'San Pedro de Atacama', direccion: 'Llano de Chajnantor', tipo: 'Observatorio', areas: ['Radioastronomia', 'Cosmologia', 'Formacion Estelar'] },
  { id: 14, nombre: 'Centro de Estudios Cientificos (CECs)', region: 'Los Rios', ciudad: 'Valdivia', direccion: 'Av. Arturo Prat 514', tipo: 'Centro Privado', areas: ['Glaciologia', 'Fisica Teorica', 'Biologia Molecular'] },
  { id: 15, nombre: 'Instituto de Fisica PUCV', region: 'Valparaiso', ciudad: 'Valparaiso', direccion: 'Av. Universidad 330', tipo: 'Instituto Universitario', areas: ['Fisica', 'Optica', 'Materiales'] },
  { id: 16, nombre: 'Centro de Investigacion Oceanografica COPAS', region: 'Biobio', ciudad: 'Concepcion', direccion: 'Barrio Universitario s/n', tipo: 'Centro FONDAP', areas: ['Oceanografia', 'Pesca', 'Ecosistemas Marinos'] }
];

const REGIONES = ['Todas', 'Metropolitana', 'Valparaiso', 'Biobio', 'Antofagasta', 'Magallanes', 'Los Rios'];

// Fondos de investigacion
const FONDOS = [
  { nombre: 'FONDECYT Regular', institucion: 'ANID', icono: '🔬', monto: '$80M - $120M/ano', descripcion: 'Proyectos de investigacion de 2-4 anos para investigadores con trayectoria', requisitos: ['Doctorado', 'Afiliacion institucional', 'Publicaciones previas'], duracion: '2-4 anos' },
  { nombre: 'FONDECYT Iniciacion', institucion: 'ANID', icono: '🌱', monto: '$40M - $60M/ano', descripcion: 'Para investigadores jovenes iniciando carrera academica', requisitos: ['Doctorado reciente (5 anos)', 'Primera adjudicacion', 'Plan de carrera'], duracion: '2-3 anos' },
  { nombre: 'FONDECYT Postdoctorado', institucion: 'ANID', icono: '📚', monto: '$25M - $35M/ano', descripcion: 'Formacion de investigadores recien doctorados', requisitos: ['Doctorado (3 anos max)', 'Investigador patrocinante', 'Proyecto original'], duracion: '2-3 anos' },
  { nombre: 'FONDEF IDeA', institucion: 'ANID', icono: '💡', monto: '$100M - $400M', descripcion: 'Investigacion aplicada con impacto economico y social', requisitos: ['Asociacion empresa-universidad', 'TRL definido', 'Cofinanciamiento'], duracion: '2-4 anos' },
  { nombre: 'Fondos Milenio', institucion: 'ANID', icono: '🏛️', monto: '$500M - $1.500M/ano', descripcion: 'Centros e institutos de investigacion de excelencia', requisitos: ['Equipo consolidado', 'Impacto internacional', 'Plan estrategico'], duracion: '5-10 anos' },
  { nombre: 'FONIS', institucion: 'ANID-MINSAL', icono: '🏥', monto: '$30M - $80M', descripcion: 'Investigacion en salud publica y politicas sanitarias', requisitos: ['Relevancia sanitaria', 'Equipo multidisciplinario', 'Vinculo con MINSAL'], duracion: '1-3 anos' }
];

// Becas Chile
const BECAS = [
  { nombre: 'Beca Doctorado Nacional', tipo: 'Postgrado', monto: '$950.000/mes', duracion: '4 anos', requisitos: ['Licenciatura/Magister', 'Admision a programa', 'Ranking academico'] },
  { nombre: 'Beca Doctorado Extranjero', tipo: 'Postgrado', monto: 'US$2.500/mes + arancel', duracion: '4 anos', requisitos: ['Admision universidad top', 'Idioma certificado', 'Carta aceptacion'] },
  { nombre: 'Beca Magister Nacional', tipo: 'Postgrado', monto: '$680.000/mes', duracion: '2 anos', requisitos: ['Licenciatura', 'Programa acreditado', 'Promedio 5.5+'] },
  { nombre: 'Beca Magister Extranjero', tipo: 'Postgrado', monto: 'US$2.000/mes + arancel', duracion: '2 anos', requisitos: ['Admision confirmada', 'TOEFL/IELTS', 'Experiencia laboral'] },
  { nombre: 'Beca Postdoctorado Extranjero', tipo: 'Postdoctoral', monto: 'US$3.000/mes', duracion: '2 anos', requisitos: ['Doctorado reciente', 'Carta invitacion', 'Proyecto de investigacion'] },
  { nombre: 'Beca Gastos Operacionales', tipo: 'Complemento', monto: '$1.5M - $3M', duracion: 'Unica vez', requisitos: ['Becario activo', 'Justificacion gastos', 'Informe avance'] }
];

// Glosario cientifico
const GLOSARIO = [
  { termino: 'ANID', definicion: 'Agencia Nacional de Investigacion y Desarrollo, principal organismo de fomento a la ciencia en Chile' },
  { termino: 'FONDECYT', definicion: 'Fondo Nacional de Desarrollo Cientifico y Tecnologico para proyectos de investigacion basica' },
  { termino: 'Paper', definicion: 'Articulo cientifico publicado en revista academica con revision de pares (peer review)' },
  { termino: 'Factor de Impacto', definicion: 'Metrica que mide la frecuencia de citacion de articulos de una revista cientifica' },
  { termino: 'H-Index', definicion: 'Indice que mide productividad e impacto de un investigador segun publicaciones y citas' },
  { termino: 'Peer Review', definicion: 'Proceso de evaluacion de investigaciones por expertos antes de su publicacion' },
  { termino: 'TRL', definicion: 'Technology Readiness Level, escala de 1-9 que mide madurez de una tecnologia' },
  { termino: 'Conicyt', definicion: 'Nombre anterior de ANID, aun usado coloquialmente para referirse a fondos de investigacion' },
  { termino: 'Patente', definicion: 'Derecho exclusivo sobre una invencion, protege la propiedad intelectual por 20 anos' },
  { termino: 'Spin-off', definicion: 'Empresa creada a partir de investigacion universitaria para comercializar tecnologia' },
  { termino: 'Open Access', definicion: 'Publicacion cientifica de acceso libre y gratuito, sin barreras de pago' },
  { termino: 'Investigador Principal (PI)', definicion: 'Responsable academico de un proyecto de investigacion ante la agencia financiadora' }
];

export default function CienciaPage() {
  const [busqueda, setBusqueda] = useState('');
  const [regionFiltro, setRegionFiltro] = useState('Todas');
  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Calculadora de tamano muestral
  const [nivelConfianza, setNivelConfianza] = useState('95');
  const [margenError, setMargenError] = useState('5');
  const [poblacion, setPoblacion] = useState('');
  const [proporcion, setProporcion] = useState('50');

  const centrosFiltrados = CENTROS.filter(centro => {
    const coincideBusqueda = centro.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                             centro.ciudad.toLowerCase().includes(busqueda.toLowerCase()) ||
                             centro.areas.some(a => a.toLowerCase().includes(busqueda.toLowerCase()));
    const coincideRegion = regionFiltro === 'Todas' || centro.region === regionFiltro;
    return coincideBusqueda && coincideRegion;
  });

  const calcularTamanoMuestral = () => {
    const z = nivelConfianza === '99' ? 2.576 : nivelConfianza === '95' ? 1.96 : 1.645;
    const e = parseFloat(margenError) / 100;
    const p = parseFloat(proporcion) / 100;
    const N = poblacion ? parseFloat(poblacion) : null;

    // Formula para poblacion infinita
    const n0 = (z * z * p * (1 - p)) / (e * e);

    // Ajuste para poblacion finita
    if (N && N > 0) {
      const nAjustado = n0 / (1 + ((n0 - 1) / N));
      return Math.ceil(nAjustado);
    }

    return Math.ceil(n0);
  };

  const tamanoMuestral = calcularTamanoMuestral();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 py-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-6xl mb-4 block">🔬</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ciencia e Investigacion
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Centros de investigacion, fondos ANID, Becas Chile y calculadora de tamano muestral
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <span className="px-4 py-2 bg-cyan-500/20 rounded-full text-cyan-300 text-sm">
                🔬 FONDECYT
              </span>
              <span className="px-4 py-2 bg-purple-500/20 rounded-full text-purple-300 text-sm">
                🎓 Becas Chile
              </span>
              <span className="px-4 py-2 bg-indigo-500/20 rounded-full text-indigo-300 text-sm">
                🏛️ ANID
              </span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Buscador de Centros */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>🔍</span> Buscador de Centros de Investigacion
          </h2>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-2">Buscar centro, ciudad o area</label>
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                onFocus={() => setMostrarResultados(true)}
                placeholder="Ej: astronomia, Valdivia, neurociencias..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Region</label>
              <select
                value={regionFiltro}
                onChange={(e) => setRegionFiltro(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-cyan-500"
              >
                {REGIONES.map(region => (
                  <option key={region} value={region} className="bg-slate-800">{region}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => setMostrarResultados(true)}
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-600 hover:to-blue-700 transition"
          >
            🔍 Buscar Centros ({centrosFiltrados.length} encontrados)
          </button>

          {mostrarResultados && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 space-y-4 max-h-96 overflow-y-auto"
            >
              {centrosFiltrados.map((centro) => (
                <div key={centro.id} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white">{centro.nombre}</h3>
                      <p className="text-cyan-400 text-sm">{centro.tipo}</p>
                    </div>
                    <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-300 text-xs">
                      {centro.region}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">📍 {centro.direccion}, {centro.ciudad}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {centro.areas.map((area, i) => (
                      <span key={i} className="px-2 py-1 bg-indigo-500/20 rounded text-xs text-indigo-300">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Calculadora Tamano Muestral */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-2xl p-6 border border-purple-500/30"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>🧮</span> Calculadora de Tamano Muestral
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Nivel de Confianza</label>
                <select
                  value={nivelConfianza}
                  onChange={(e) => setNivelConfianza(e.target.value)}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="90" className="bg-slate-800">90% (Z = 1.645)</option>
                  <option value="95" className="bg-slate-800">95% (Z = 1.96)</option>
                  <option value="99" className="bg-slate-800">99% (Z = 2.576)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Margen de Error (%)</label>
                <input
                  type="number"
                  value={margenError}
                  onChange={(e) => setMargenError(e.target.value)}
                  placeholder="5"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Proporcion Esperada (%)</label>
                <input
                  type="number"
                  value={proporcion}
                  onChange={(e) => setProporcion(e.target.value)}
                  placeholder="50"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                <p className="text-xs text-gray-500 mt-1">Usar 50% si no se conoce (maximo conservador)</p>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Tamano Poblacion (opcional)</label>
                <input
                  type="number"
                  value={poblacion}
                  onChange={(e) => setPoblacion(e.target.value)}
                  placeholder="Dejar vacio para poblacion infinita"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-6 flex flex-col justify-center">
              <div className="text-center">
                <p className="text-gray-400 mb-2">Tamano Muestral Requerido</p>
                <p className="text-5xl font-bold text-purple-400">{tamanoMuestral}</p>
                <p className="text-gray-500 mt-2">participantes/observaciones</p>
              </div>

              <div className="mt-6 space-y-2 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Nivel de confianza:</span>
                  <span className="text-white">{nivelConfianza}%</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Margen de error:</span>
                  <span className="text-white">+/-{margenError}%</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Proporcion:</span>
                  <span className="text-white">{proporcion}%</span>
                </div>
                {poblacion && (
                  <div className="flex justify-between text-gray-400">
                    <span>Poblacion finita:</span>
                    <span className="text-white">{parseInt(poblacion).toLocaleString('es-CL')}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 p-3 bg-indigo-500/20 rounded-lg">
                <p className="text-xs text-indigo-300">
                  Formula: n = (Z2 x p x (1-p)) / e2 {poblacion && 'x ajuste poblacion finita'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Fondos de Investigacion */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <span>💰</span> Fondos de Investigacion
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FONDOS.map((fondo, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-white/5 backdrop-blur rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{fondo.icono}</span>
                <span className="px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-300 text-xs">
                  {fondo.institucion}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{fondo.nombre}</h3>
              <p className="text-gray-400 text-sm mb-3">{fondo.descripcion}</p>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Monto:</span>
                  <span className="text-green-400 font-medium">{fondo.monto}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duracion:</span>
                  <span className="text-white">{fondo.duracion}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3">
                <p className="text-xs text-gray-500 mb-2">Requisitos principales:</p>
                <div className="flex flex-wrap gap-1">
                  {fondo.requisitos.map((req, j) => (
                    <span key={j} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400">
                      {req}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Becas Chile */}
      <section className="bg-white/5 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span>🎓</span> Becas Chile
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BECAS.map((beca, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-xl p-6 border border-indigo-500/30"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-white">{beca.nombre}</h3>
                  <span className="px-2 py-1 bg-indigo-500/30 rounded text-xs text-indigo-300">
                    {beca.tipo}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Monto:</span>
                    <span className="text-green-400 font-bold">{beca.monto}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Duracion:</span>
                    <span className="text-white">{beca.duracion}</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-3">
                  <p className="text-xs text-gray-500 mb-2">Requisitos:</p>
                  <ul className="space-y-1">
                    {beca.requisitos.map((req, j) => (
                      <li key={j} className="text-xs text-gray-400 flex items-center gap-2">
                        <span className="text-cyan-400">✓</span> {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pasos para Postular */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <span>📝</span> Pasos para Postular a Fondos ANID
        </h2>

        <div className="grid md:grid-cols-6 gap-4">
          {[
            { paso: '1', titulo: 'Registro', desc: 'Crear cuenta en portal ANID', icono: '👤' },
            { paso: '2', titulo: 'Concurso', desc: 'Elegir fondo y leer bases', icono: '📋' },
            { paso: '3', titulo: 'Proyecto', desc: 'Redactar propuesta cientifica', icono: '✍️' },
            { paso: '4', titulo: 'Documentos', desc: 'CV, cartas, presupuesto', icono: '📁' },
            { paso: '5', titulo: 'Envio', desc: 'Postular antes del cierre', icono: '📤' },
            { paso: '6', titulo: 'Evaluacion', desc: 'Esperar resultado (3-6 meses)', icono: '⏳' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mx-auto mb-3 text-2xl">
                {item.icono}
              </div>
              <div className="text-xs text-cyan-400 mb-1">Paso {item.paso}</div>
              <h3 className="font-bold text-white text-sm">{item.titulo}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Glosario */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
          <span>📖</span> Glosario Cientifico
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GLOSARIO.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 * i }}
              className="bg-white/5 rounded-xl p-4 border border-white/10"
            >
              <h3 className="font-bold text-cyan-400 mb-2">{item.termino}</h3>
              <p className="text-sm text-gray-400">{item.definicion}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recursos */}
      <section className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
            <span>🔗</span> Recursos Oficiales
          </h2>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              { nombre: 'Portal ANID', url: 'https://www.anid.cl', icono: '🏛️', desc: 'Agencia Nacional de Investigacion' },
              { nombre: 'Becas Chile', url: 'https://www.anid.cl/capital-humano/becas-chile/', icono: '🎓', desc: 'Postgrado nacional y extranjero' },
              { nombre: 'FONDECYT', url: 'https://www.anid.cl/proyectos-de-investigacion/fondecyt/', icono: '🔬', desc: 'Fondos de investigacion basica' },
              { nombre: 'Scielo Chile', url: 'https://www.scielo.cl', icono: '📚', desc: 'Biblioteca cientifica electronica' }
            ].map((recurso, i) => (
              <a
                key={i}
                href={recurso.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all"
              >
                <span className="text-2xl mb-2 block">{recurso.icono}</span>
                <h3 className="font-bold text-white text-sm">{recurso.nombre}</h3>
                <p className="text-xs text-gray-500 mt-1">{recurso.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Ciencia e Investigacion - Parte de{' '}
            <a href="https://newcool-informada.vercel.app" className="text-cyan-400 hover:underline">
              NewCooltura Informada
            </a>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Informacion basada en datos oficiales de ANID
          </p>
        </div>
      </footer>
    </div>
  );
}
