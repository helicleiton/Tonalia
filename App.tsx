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
              <div className="text-gray-300 space-y-3">
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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 sm:p-6 font-sans">
      <main className="container mx-auto max-w-5xl w-full flex-grow flex flex-col">
        <header className="text-center my-8 sm:my-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Tonalia
          </h1>
          <p className="mt-2 text-lg sm:text-xl text-gray-400">
            Explore escalas, acordes e campos harmônicos com facilidade.
          </p>
        </header>

        <div className="flex justify-center mb-8">
            <button
                onClick={() => setShowAllScales(!showAllScales)}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-bold text-white transition-all duration-200 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
            >
                {showAllScales ? 'Voltar para Análise Individual' : 'Ver Todas as Escalas Maiores'}
            </button>
        </div>

        <ChordTypeSelector selectedType={chordType} onTypeSelect={setChordType} />

        {showAllScales ? (
            <AllScalesDisplay chordType={chordType} enharmonicPreference={enharmonicPreference} />
        ) : (
            <>
                <EnharmonicPreferenceSelector selectedPreference={enharmonicPreference} onPreferenceSelect={handleEnharmonicSelect} />
                <ScaleTypeSelector selectedType={scaleType} onTypeSelect={setScaleType} />
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
              <div className="flex space-x-2 border-b border-gray-700 mb-4">
                <button
                  onClick={() => setActiveTab('variations')}
                  className={`px-4 py-2 font-semibold text-sm rounded-t-md focus:outline-none transition-colors duration-200 ${
                    activeTab === 'variations'
                      ? 'bg-gray-700 text-blue-300'
                      : 'text-gray-400 hover:bg-gray-700/50'
                  }`}
                >
                  Variações do Grau
                </button>
                <button
                  onClick={() => setActiveTab('functions')}
                  className={`px-4 py-2 font-semibold text-sm rounded-t-md focus:outline-none transition-colors duration-200 ${
                    activeTab === 'functions'
                      ? 'bg-gray-700 text-blue-300'
                      : 'text-gray-400 hover:bg-gray-700/50'
                  }`}
                >
                  Funções do Acorde
                </button>
              </div>

              {activeTab === 'variations' ? (
                <table className="w-full text-left text-gray-300">
                  <thead className="text-xs text-blue-300 uppercase bg-gray-700/50">
                    <tr>
                      <th className="px-4 py-3">Escala/Modo</th>
                      <th className="px-4 py-3">Tríade</th>
                      <th className="px-4 py-3">Tétrade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modalState.variationAnalysis.map((res, i) => (
                      <tr key={i} className="border-b border-gray-700 hover:bg-gray-700/50">
                        <td className="px-4 py-3 font-medium text-white">{c.SCALE_TYPE_NAMES[res.scaleType]}</td>
                        <td className="px-4 py-3">{`${getChordName(res.triad)} (${res.triad.degree})`}</td>
                        <td className="px-4 py-3">{`${getChordName(res.tetrad)} (${res.tetrad.degree})`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>
                  {modalState.functionAnalysis.length > 0 ? (
                    <table className="w-full text-left text-gray-300">
                      <thead className="text-xs text-blue-300 uppercase bg-gray-700/50">
                        <tr>
                          <th className="px-4 py-3">Tonalidade</th>
                          <th className="px-4 py-3">Escala/Modo</th>
                          <th className="px-4 py-3">Grau</th>
                        </tr>
                      </thead>
                      <tbody>
                        {modalState.functionAnalysis.map((res, i) => (
                          <tr key={i} className="border-b border-gray-700 hover:bg-gray-700/50">
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

        <footer className="text-center mt-8 sm:mt-12 text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Tonalia. Uma ferramenta para músicos.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
