import React, { useState, useMemo } from 'react';
import { KeySelector } from './components/KeySelector';
import { ScaleDisplay } from './components/ScaleDisplay';
import { HarmonicFieldDisplay } from './components/HarmonicFieldDisplay';
import { ScaleTypeSelector } from './components/ScaleTypeSelector';
import { ChordTypeSelector } from './components/ChordTypeSelector';
import { EnharmonicPreferenceSelector } from './components/EnharmonicPreferenceSelector';
import { AnalysisModal } from './components/AnalysisModal';
import { AllScalesDisplay } from './components/AllScalesDisplay';
import { generateScale, generateHarmonicField, getChordName, analyzeChordFunctions, getDegreeVariations } from './utils/musicTheory';
import {
  DEGREE_NAMES,
  SHARP_TO_FLAT,
  FLAT_TO_SHARP,
} from './constants';
import * as c from './constants';
import type { Note, ScaleType, ChordType, EnharmonicPreference, Chord, ModalTab } from './types';


type NoteAnalysis = {
  type: 'note';
  title: string;
  content: React.ReactNode;
}
type ChordAnalysis = {
  type: 'chord';
  chord: Chord;
  degreeIndex: number;
  functionAnalysis: ReturnType<typeof analyzeChordFunctions>;
  variationAnalysis: ReturnType<typeof getDegreeVariations>;
}

const App: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<Note>('C');
  const [scaleType, setScaleType] = useState<ScaleType>('ionian');
  const [chordType, setChordType] = useState<ChordType>('triad');
  const [enharmonicPreference, setEnharmonicPreference] = useState<EnharmonicPreference>('sharp');
  
  const [modalState, setModalState] = useState<NoteAnalysis | ChordAnalysis | null>(null);
  const [activeTab, setActiveTab] = useState<ModalTab>('variations');
  const [showAllScales, setShowAllScales] = useState(false);

  const handleEnharmonicSelect = (preference: EnharmonicPreference) => {
    setEnharmonicPreference(preference);
    if (preference === 'flat') {
      const flatEquivalent = SHARP_TO_FLAT[selectedKey];
      if (flatEquivalent) setSelectedKey(flatEquivalent);
    } else { // sharp
      const sharpEquivalent = FLAT_TO_SHARP[selectedKey];
      if (sharpEquivalent) setSelectedKey(sharpEquivalent);
    }
  };

  const currentScale = useMemo(() => generateScale(selectedKey, scaleType), [selectedKey, scaleType]);
  const currentHarmonicField = useMemo(() => generateHarmonicField(currentScale, scaleType, chordType), [currentScale, scaleType, chordType]);
  
  const currentIntervals = useMemo(() => {
    switch(scaleType) {
      case 'ionian': return c.IONIAN_INTERVAL_NAMES;
      case 'dorian': return c.DORIAN_INTERVAL_NAMES;
      case 'phrygian': return c.PHRYGIAN_INTERVAL_NAMES;
      case 'lydian': return c.LYDIAN_INTERVAL_NAMES;
      case 'mixolydian': return c.MIXOLYDIAN_INTERVAL_NAMES;
      case 'aeolian': return c.AEOLIAN_INTERVAL_NAMES;
      case 'locrian': return c.LOCRIAN_INTERVAL_NAMES;
      case 'harmonicMinor': return c.HARMONIC_MINOR_INTERVAL_NAMES;
      case 'melodicMinor': return c.MELODIC_MINOR_INTERVAL_NAMES;
    }
  }, [scaleType]);

  const handleNoteClick = (note: string, index: number) => {
      const degree = (index % 7) + 1;
      const functionName = DEGREE_NAMES[index % 7];
      setModalState({
          type: 'note',
          title: `Análise da Nota: ${note}`,
          content: (
              <div className="text-slate-300 space-y-3">
                  <p className="text-lg"><strong className="font-semibold text-white w-24 inline-block">Grau:</strong> {degree}º</p>
                  <p className="text-lg"><strong className="font-semibold text-white w-24 inline-block">Função:</strong> {functionName}</p>
              </div>
          )
      });
  };
  
  const handleChordClick = (chord: Chord, index: number) => {
      const functionAnalysis = analyzeChordFunctions(chord);
      const variationAnalysis = getDegreeVariations(selectedKey, index);
      setModalState({
        type: 'chord',
        chord,
        degreeIndex: index,
        functionAnalysis,
        variationAnalysis
      });
      setActiveTab('variations'); // Abre na nova aba por padrão
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center p-4 sm:p-6">
      <main className="container mx-auto max-w-5xl w-full flex-grow flex flex-col">
        <header className="text-center my-8 sm:my-12">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-violet-500 pb-2">
            Tonalia
          </h1>
          <p className="mt-2 text-lg sm:text-xl text-slate-400">
            Explore escalas, acordes e campos harmônicos com facilidade.
          </p>
        </header>

        <div className="flex justify-center mb-8">
            <button
                onClick={() => setShowAllScales(!showAllScales)}
                className="px-6 py-3 bg-gradient-to-br from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 rounded-lg font-bold text-white transition-all duration-300 ease-in-out shadow-lg shadow-sky-500/20 hover:shadow-xl hover:shadow-sky-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-400 transform hover:-translate-y-0.5"
            >
                {showAllScales ? 'Voltar para Análise Individual' : 'Ver Todas as Escalas Maiores'}
            </button>
        </div>

        <ChordTypeSelector selectedType={chordType} onTypeSelect={setChordType} />

        {showAllScales ? (
            <AllScalesDisplay chordType={chordType} enharmonicPreference={enharmonicPreference} />
        ) : (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <EnharmonicPreferenceSelector selectedPreference={enharmonicPreference} onPreferenceSelect={handleEnharmonicSelect} />
                  <ScaleTypeSelector selectedType={scaleType} onTypeSelect={setScaleType} />
                </div>
                <KeySelector selectedKey={selectedKey} onKeySelect={setSelectedKey} enharmonicPreference={enharmonicPreference} />
                <ScaleDisplay scale={currentScale} scaleType={scaleType} intervals={currentIntervals} onNoteClick={handleNoteClick} />
                <HarmonicFieldDisplay field={currentHarmonicField} rootNote={selectedKey} scaleType={scaleType} chordType={chordType} onChordClick={handleChordClick} />
            </>
        )}
        
        <AnalysisModal
          isOpen={!!modalState}
          onClose={() => setModalState(null)}
          title={
            !modalState ? '' :
            modalState.type === 'note' ? modalState.title :
            activeTab === 'variations' ? `Análise do Grau: ${modalState.chord.degree}` :
            `Análise do Acorde: ${getChordName(modalState.chord)}`
          }
        >
          {modalState?.type === 'note' && modalState.content}
          {modalState?.type === 'chord' && (
            <div>
              <div className="flex space-x-2 border-b border-slate-700 mb-4">
                <button
                  onClick={() => setActiveTab('variations')}
                  className={`relative px-4 py-2 font-semibold text-sm rounded-t-md focus:outline-none transition-colors duration-200 ${
                    activeTab === 'variations'
                      ? 'text-sky-300'
                      : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-300'
                  }`}
                >
                  Variações do Grau
                  {activeTab === 'variations' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 rounded-full"></span>}
                </button>
                <button
                  onClick={() => setActiveTab('functions')}
                  className={`relative px-4 py-2 font-semibold text-sm rounded-t-md focus:outline-none transition-colors duration-200 ${
                    activeTab === 'functions'
                      ? 'text-sky-300'
                      : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-300'
                  }`}
                >
                  Funções do Acorde
                   {activeTab === 'functions' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400 rounded-full"></span>}
                </button>
              </div>

              {activeTab === 'variations' ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-slate-300">
                    <thead className="text-xs text-sky-300 uppercase bg-slate-800/50">
                      <tr>
                        <th className="px-4 py-3">Escala/Modo</th>
                        <th className="px-4 py-3">Tríade</th>
                        <th className="px-4 py-3">Tétrade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                      {modalState.variationAnalysis.map((res, i) => (
                        <tr key={i} className="hover:bg-slate-700/50">
                          <td className="px-4 py-3 font-medium text-white">{c.SCALE_TYPE_NAMES[res.scaleType]}</td>
                          <td className="px-4 py-3">{`${getChordName(res.triad)} (${res.triad.degree})`}</td>
                          <td className="px-4 py-3">{`${getChordName(res.tetrad)} (${res.tetrad.degree})`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  {modalState.functionAnalysis.length > 0 ? (
                    <table className="w-full text-left text-slate-300">
                      <thead className="text-xs text-sky-300 uppercase bg-slate-800/50">
                        <tr>
                          <th className="px-4 py-3">Tonalidade</th>
                          <th className="px-4 py-3">Escala/Modo</th>
                          <th className="px-4 py-3">Grau</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700">
                        {modalState.functionAnalysis.map((res, i) => (
                          <tr key={i} className="hover:bg-slate-700/50">
                            <td className="px-4 py-3 font-medium text-white">{res.key}</td>
                            <td className="px-4 py-3">{res.scale}</td>
                            <td className="px-4 py-3">{res.degree}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p>Nenhuma função comum encontrada para este acorde.</p>
                  )}
                </div>
              )}
            </div>
          )}
        </AnalysisModal>

        <footer className="text-center mt-auto pt-8 sm:pt-12 text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Tonalia. Uma ferramenta para músicos.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;