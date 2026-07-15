import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, X, Sparkles, Loader2, Anchor, Ship, Bird, Cloud, Lock, Flag, Mountain, Waves
} from 'lucide-react';
import { Continent, ExamLevel, GrammarPoint } from './types';
import { CONTINENTS as INITIAL_CONTINENTS, buildGrammarWorld, generateOrganicIslandPolygon } from './data/grammar';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const setCookie = (name: string, value: string, days: number = 365) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

export default function App() {
  const [selectedExam, setSelectedExam] = useState<ExamLevel>('PET');
  const [selectedPoint, setSelectedPoint] = useState<GrammarPoint | null>(null);
  const [completedPoints, setCompletedPoints] = useState<string[]>([]);
  const [viewingContinent, setViewingContinent] = useState<Continent | null>(null);
  const [quizMode, setQuizMode] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState<{ correct: boolean; message: string } | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const DEFAULT_VERTEX_OFFSETS: Record<string, { x: number; y: number }[]> = {
    tenses: [
      { x: -11.29, y: 38.59 }, { x: -70.76, y: -51.75 }, { x: 83.64, y: 20.82 }, { x: 9.49, y: 38.49 },
      { x: 86.89, y: 21.12 }, { x: -52.13, y: -8.37 }, { x: -47.39, y: 81.16 }, { x: -26.27, y: 30.57 }
    ],
    modals: [
      { x: -162.18, y: -8.67 }, { x: -62.82, y: 10.13 }, { x: 18.24, y: 2.57 }, { x: 364.99, y: 13.81 },
      { x: 0, y: 0 }, { x: 22.93, y: -23.58 }, { x: -26.60, y: 103.24 }, { x: 15.16, y: -110.60 }
    ],
    pragmatics: [
      { x: -162.94, y: 10.03 }, { x: -142.30, y: -216.31 }, { x: -57.73, y: -127.13 }, { x: 8.25, y: 2.67 },
      { x: 161.30, y: 46.25 }, { x: -30.82, y: 166.12 }, { x: -82.35, y: 119.62 }, { x: -51.03, y: 102.18 }
    ],
    structural: [
      { x: -311.52, y: 179.65 }, { x: -85.26, y: 98.75 }, { x: -126.03, y: -251.95 }, { x: -125.54, y: 25.98 },
      { x: 101.03, y: 28.70 }, { x: 245.79, y: 77.56 }, { x: -101.88, y: -102.51 }, { x: -295.67, y: 79.50 }
    ]
  };

  const DEFAULT_MAP_PARAMS = {
    customSeed: '',
    scaleFactor: 0.60,
    roughnessFactor: 1.9,
    islandSpread: 1.2,
    decorVisibility: true,
    ambientFog: 0.5
  };

  const getInitialContinents = () => {
    try {
      const savedParams = localStorage.getItem('grammar_world_default_params');
      const savedVertexOffsets = localStorage.getItem('grammar_world_vertex_offsets');
      if (savedParams) {
        const params = JSON.parse(savedParams);
        const offsets = savedVertexOffsets ? JSON.parse(savedVertexOffsets) : DEFAULT_VERTEX_OFFSETS;
        return buildGrammarWorld(
          params.customSeed || '',
          params.scaleFactor || DEFAULT_MAP_PARAMS.scaleFactor,
          params.roughnessFactor || DEFAULT_MAP_PARAMS.roughnessFactor,
          params.islandSpread || DEFAULT_MAP_PARAMS.islandSpread,
          offsets
        );
      }
    } catch (e) {
      console.error('Failed to load initial continents from localStorage', e);
    }
    return buildGrammarWorld(
      DEFAULT_MAP_PARAMS.customSeed,
      DEFAULT_MAP_PARAMS.scaleFactor,
      DEFAULT_MAP_PARAMS.roughnessFactor,
      DEFAULT_MAP_PARAMS.islandSpread,
      DEFAULT_VERTEX_OFFSETS
    );
  };

  const [continents, setContinents] = useState<Continent[]>(getInitialContinents);

  const getDefaultParams = () => {
    try {
      const saved = localStorage.getItem('grammar_world_default_params');
      if (saved) {
        return { ...DEFAULT_MAP_PARAMS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to parse default map params', e);
    }
    return DEFAULT_MAP_PARAMS;
  };

  const defaultParams = getDefaultParams();

  // Map Workshop (Procedural Generation Design Lab) States
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false);
  const [customSeed, setCustomSeed] = useState(defaultParams.customSeed);
  const [scaleFactor, setScaleFactor] = useState(defaultParams.scaleFactor);
  const [roughnessFactor, setRoughnessFactor] = useState(defaultParams.roughnessFactor);
  const [islandSpread, setIslandSpread] = useState(defaultParams.islandSpread);
  const [decorVisibility, setDecorVisibility] = useState(defaultParams.decorVisibility);
  const [ambientFog, setAmbientFog] = useState(defaultParams.ambientFog);
  const [hasCopiedSvg, setHasCopiedSvg] = useState(false);

  // Continent Vertex Sculpting / Drag & Drop Editor States
  const [isSculptingMode, setIsSculptingMode] = useState(false);
  const [continentOffsets, setContinentOffsets] = useState<Record<string, { x: number; y: number }>>(() => {
    try {
      const saved = localStorage.getItem('grammar_world_continent_offsets');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse continent offsets', e);
    }
    return { 
      tenses: { x: 0, y: 0 }, 
      modals: { x: 0, y: 0 }, 
      pragmatics: { x: 0, y: 0 }, 
      structural: { x: 0, y: 0 }, 
      lexical: { x: 0, y: 0 } 
    };
  });
  const [vertexOffsets, setVertexOffsets] = useState<Record<string, { x: number; y: number }[]>>(() => {
    try {
      const saved = localStorage.getItem('grammar_world_vertex_offsets');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.tenses && parsed.modals && parsed.pragmatics && parsed.structural) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse saved vertex offsets', e);
    }
    try {
      const defaultSaved = localStorage.getItem('grammar_world_default_offsets');
      if (defaultSaved) {
        const parsed = JSON.parse(defaultSaved);
        if (parsed.tenses && parsed.modals && parsed.pragmatics && parsed.structural) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to parse default vertex offsets', e);
    }
    return DEFAULT_VERTEX_OFFSETS;
  });

  useEffect(() => {
    localStorage.setItem('grammar_world_vertex_offsets', JSON.stringify(vertexOffsets));
  }, [vertexOffsets]);

  useEffect(() => {
    localStorage.setItem('grammar_world_continent_offsets', JSON.stringify(continentOffsets));
  }, [continentOffsets]);

  const saveAsDefaultShape = () => {
    const fs = window as any;
    if (!fs.electronAPI) {
      alert('已将当前形状保存到浏览器缓存！刷新页面后会保留此形状。');
      return;
    }
    console.log('Saving default shape:', JSON.stringify(vertexOffsets, null, 2));
  };

  const [savedDefault, setSavedDefault] = useState(false);

  const [draggedHandle, setDraggedHandle] = useState<{ continentId: string; index: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const mapGroupRef = useRef<SVGGElement | null>(null);

  // Dynamically calculate the original base vertices for a given continent
  const getContinentBaseVertices = (continentId: string) => {
    const seedSuffix = customSeed;
    switch (continentId) {
      case 'tenses':
        return generateOrganicIslandPolygon(50, -100, 600, 600, 'tenses' + seedSuffix, 40, roughnessFactor);
      case 'modals':
        return generateOrganicIslandPolygon(1100, -100, 2250, 500, 'modals' + seedSuffix, 40, roughnessFactor);
      case 'pragmatics':
        return generateOrganicIslandPolygon(1750, 400, 2350, 1450, 'pragmatics' + seedSuffix, 40, roughnessFactor);
      case 'structural':
        return generateOrganicIslandPolygon(400, 380, 1850, 1350, 'structural' + seedSuffix, 40, roughnessFactor);
      default:
        return [];
    }
  };

  // Convert client-space mouse coordinates to current panned/zoomed SVG user coordinate space
  const getSvgCoords = (e: React.MouseEvent) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    if (mapGroupRef.current) {
      try {
        const svg = svgRef.current;
        const g = mapGroupRef.current;
        const pt = svg.createSVGPoint();
        pt.x = e.clientX;
        pt.y = e.clientY;
        const screenCTM = g.getScreenCTM();
        if (screenCTM) {
          const transformed = pt.matrixTransform(screenCTM.inverse());
          return { x: transformed.x, y: transformed.y };
        }
      } catch (err) {
        console.error("SVG coordinate matrix transformation failed", err);
      }
    }
    // Fallback: simple ratio-aware coordinate mapping
    const rect = svgRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - pan.x) / zoom;
    const y = (e.clientY - rect.top - pan.y) / zoom;
    return { x, y };
  };

  // Dynamically regenerate world map when design workshop parameters change!
  useEffect(() => {
    const newWorld = buildGrammarWorld(customSeed, scaleFactor, roughnessFactor, islandSpread, vertexOffsets);
    
    setContinents(prev => {
      if (!prev || prev.length === 0) return newWorld;
      
      return newWorld.map(c => {
        const existingCont = prev.find(p => p.id === c.id);
        if (!existingCont) return c;
        
        const updatedPoints = c.points.map(p => {
          const existingPoint = existingCont.points.find(ep => ep.id === p.id);
          if (existingPoint) {
            return {
              ...existingPoint,
              position: p.position,
              territoryPath: p.territoryPath
            };
          }
          return p;
        });
        
        return {
          ...c,
          path: c.path,
          points: updatedPoints
        };
      });
    });
  }, [customSeed, scaleFactor, roughnessFactor, islandSpread, vertexOffsets]);

  // Map Zoom & Pan State
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const [isUserZoomed, setIsUserZoomed] = useState(false);
  
  // Continent Drag State
  const [draggingContinent, setDraggingContinent] = useState<string | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (isUserZoomed) return;
      const windowHeight = window.innerHeight;
      const mapBaseHeight = 1600;
      const minHeight = 1500;
      const defaultZoom = 1.0;
      
      if (windowHeight <= minHeight) {
        setZoom(defaultZoom);
        setPan({ x: 0, y: 0 });
      } else {
        const scale = windowHeight / (mapBaseHeight * defaultZoom);
        const newZoom = Math.min(defaultZoom * scale, 1.2);
        setZoom(newZoom);
        setPan({ x: 0, y: 0 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isUserZoomed]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as SVGElement;
    // Don't pan if clicking an interactive node/city circle or a vertex handle
    if (target.closest('.interactive-node') || target.closest('.vertex-handle')) {
      setHasDragged(false);
      return;
    }
    
    // Check if clicking on a continent for dragging
    if (isSculptingMode) {
      const continentEl = target.closest('.continent-drag-area');
      if (continentEl) {
        const continentId = continentEl.getAttribute('data-continent-id');
        if (continentId) {
          const coords = getSvgCoords(e);
          setDraggingContinent(continentId);
          setDragStart({ x: coords.x - (continentOffsets[continentId]?.x || 0), y: coords.y - (continentOffsets[continentId]?.y || 0) });
          return;
        }
      }
    }
    
    setIsPanning(true);
    setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    setHasDragged(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedHandle) {
      const coords = getSvgCoords(e);
      const { continentId, index } = draggedHandle;
      const baseVertices = getContinentBaseVertices(continentId);
      const basePos = baseVertices[index * 5];
      if (basePos) {
        // Compute displacement from base position
        const dx = coords.x - basePos.x;
        const dy = coords.y - basePos.y;
        setVertexOffsets(prev => {
          const arr = [...prev[continentId]];
          arr[index] = { x: dx, y: dy };
          return {
            ...prev,
            [continentId]: arr
          };
        });
      }
      return;
    }

    // Handle continent dragging
    if (draggingContinent) {
      const coords = getSvgCoords(e);
      const dx = coords.x - dragStart.x;
      const dy = coords.y - dragStart.y;
      setContinentOffsets(prev => ({
        ...prev,
        [draggingContinent]: { x: dx, y: dy }
      }));
      return;
    }

    if (!isPanning) return;
    const nextX = e.clientX - panStart.x;
    const nextY = e.clientY - panStart.y;
    if (Math.abs(nextX - pan.x) > 3 || Math.abs(nextY - pan.y) > 3) {
      setHasDragged(true);
    }
    setPan({ x: nextX, y: nextY });
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggedHandle(null);
    setDraggingContinent(null);
  };

  const handleZoom = (factor: number) => {
    setIsUserZoomed(true);
    setZoom(prev => Math.max(0.4, Math.min(2.5, prev * factor)));
  };

  const resetMap = () => {
    setIsUserZoomed(false);
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  };

  const pointsMap = useMemo(() => {
    const map: Record<string, GrammarPoint> = {};
    continents.forEach(c => {
      c.points.forEach(p => {
        map[p.id] = p;
      });
    });
    return map;
  }, [continents]);

  const askAiForHelp = async () => {
    if (!selectedPoint) return;
    setIsAiLoading(true);
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grammarPoint: selectedPoint.name,
          question: selectedPoint.quiz.question,
          correctAnswer: selectedPoint.quiz.options[selectedPoint.quiz.answer]
        }),
      });
      const data = await response.json();
      setAiExplanation(data.explanation);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAiLoading(false);
    }
  };

  // Progress logic - using cookies instead of localStorage
  useEffect(() => {
    const saved = getCookie('grammar_quest_completed');
    if (saved) setCompletedPoints(JSON.parse(saved));
  }, []);

  useEffect(() => {
    setCookie('grammar_quest_completed', JSON.stringify(completedPoints));
  }, [completedPoints]);

  const exams: ExamLevel[] = ['KET', 'PET', 'FCE', 'IELTS'];

  const getContinentProgress = (continent: Continent) => {
    const relevantPoints = continent.points.filter(p => p.levels.includes(selectedExam));
    if (relevantPoints.length === 0) return 0;
    const completed = relevantPoints.filter(p => completedPoints.includes(p.id)).length;
    return (completed / relevantPoints.length) * 100;
  };

  const isLevelComplete = () => {
    const relevantPointsIds = continents.flatMap(c => c.points)
      .filter(p => p.levels.includes(selectedExam))
      .map(p => p.id);
    return relevantPointsIds.every(id => completedPoints.includes(id)) && relevantPointsIds.length > 0;
  };

  const handleQuizAnswer = (index: number) => {
    if (!selectedPoint) return;
    const isCorrect = index === selectedPoint.quiz.answer;
    if (isCorrect) {
      if (!completedPoints.includes(selectedPoint.id)) {
        setCompletedPoints([...completedPoints, selectedPoint.id]);
      }
      setQuizFeedback({ correct: true, message: '回答正确！您已成功攻占了此领域！' });
    } else {
      setQuizFeedback({ correct: false, message: '回答错误，再仔细想想吧！' });
    }
  };

  return (
    <div className="min-h-screen bg-[#B8D8E6] text-[#1A1A1A] font-sans overflow-hidden relative">
      {/* Hand-drawn SVG Filter */}
      <svg className="hidden">
        <filter id="hand-drawn-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>

      {/* Sidebar - Overlay Style */}
      <aside className="w-[280px] bg-transparent p-6 z-10 flex flex-col absolute top-0 left-0 h-screen pointer-events-none">
        {/* Title Banner - Hand-drawn style - Align to Top */}
        <div className="relative pointer-events-auto">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
            <div className="w-3 h-6 bg-gray-700 rounded-sm" />
            <div className="w-3 h-6 bg-gray-600 rounded-sm" />
            <div className="w-3 h-6 bg-gray-700 rounded-sm" />
          </div>
          <div className="bg-yellow-400 border-4 border-black p-4 shadow-[6px_6px_0_0_#000] -rotate-0.5">
            <h1 className="text-2xl font-display font-black tracking-tighter uppercase text-center leading-none">
              The World of<br/>English Grammar
            </h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="text-[10px] font-bold text-black/60 uppercase">Explore</span>
              <span className="w-1 h-1 bg-black/40 rounded-full" />
              <span className="text-[10px] font-bold text-black/60 uppercase">Learn</span>
              <span className="w-1 h-1 bg-black/40 rounded-full" />
              <span className="text-[10px] font-bold text-black/60 uppercase">Master</span>
            </div>
          </div>
          <div className="absolute -top-2 right-4">
            <svg width="24" height="28" viewBox="0 0 24 28" className="text-red-600">
              <path d="M12 28V14M12 14L16 18M12 14L8 18" stroke="currentColor" strokeWidth="2" fill="none"/>
              <circle cx="12" cy="10" r="4" fill="white" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        </div>

        {/* Spacer to push content to bottom */}
        <div className="flex-1"></div>

        {/* Exam Level Selection - Always Visible - Align to Bottom */}
        <div className="space-y-4 mb-4 pointer-events-auto">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-700">选择关卡等级</label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {exams.map(exam => (
              <button
                key={exam}
                onClick={() => setSelectedExam(exam)}
                className={cn(
                  "px-3 py-2.5 rounded-xl font-black transition-all border-4 text-xs",
                  selectedExam === exam 
                    ? "bg-yellow-400 border-black shadow-[3px_3px_0_0_#000] -translate-y-0.5" 
                    : "bg-white/70 border-gray-300 text-gray-600 hover:bg-white/90"
                )}
              >
                {exam}
              </button>
            ))}
          </div>
        </div>

        {/* Progress Tracker - Always Visible - Align to Bottom */}
        <div className="p-4 bg-white/60 rounded-xl border-2 border-black relative overflow-hidden group pointer-events-auto">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-yellow-600" />
              <span className="text-xs font-black uppercase italic text-gray-700">探险进度</span>
            </div>
            <div className="w-full h-2 bg-white border-2 border-black rounded-full overflow-hidden mb-1">
              <motion.div 
                className="h-full bg-emerald-400 border-r-2 border-black"
                initial={{ width: 0 }}
                animate={{ width: `${(completedPoints.length / continents.reduce((acc, c) => acc + c.points.length, 0)) * 100}%` }}
              />
            </div>
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
              已征服 {completedPoints.length} / {continents.reduce((acc, c) => acc + c.points.length, 0)} 个领域
            </p>
          </div>
        </div>
      </aside>

      {/* Main Map Viewer */}
      <main className="w-full h-screen relative overflow-auto select-none bg-[#B8D8E6]">
        {/* Animated Background Decor */}
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-300" style={{ opacity: ambientFog }}>
          <motion.div 
            animate={{ x: [0, 50, 0], y: [0, 20, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-20 left-1/4"
          >
            <Cloud className="w-16 h-16 text-white" />
          </motion.div>
          <motion.div 
            animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
            transition={{ duration: 15, repeat: Infinity, delay: 2 }}
            className="absolute top-1/3 right-1/4"
          >
            <Cloud className="w-12 h-12 text-white" />
          </motion.div>
        </div>

        {/* Floating Zoom & Map Controls */}
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 bg-white/90 backdrop-blur border-4 border-black p-2 shadow-[4px_4px_0_0_#000] rounded-xl font-display">
          <button 
            onClick={() => handleZoom(1.2)}
            className="w-10 h-10 flex items-center justify-center font-black text-lg hover:bg-yellow-400 border-2 border-black rounded-lg transition-colors active:translate-y-0.5"
            title="Zoom In"
          >
            +
          </button>
          <button 
            onClick={() => handleZoom(0.8)}
            className="w-10 h-10 flex items-center justify-center font-black text-lg hover:bg-yellow-400 border-2 border-black rounded-lg transition-colors active:translate-y-0.5"
            title="Zoom Out"
          >
            -
          </button>
          <button 
            onClick={resetMap}
            className="w-10 h-10 flex items-center justify-center font-bold text-xs hover:bg-yellow-400 border-2 border-black rounded-lg transition-colors active:translate-y-0.5"
            title="Reset Map View"
          >
            ↺
          </button>
          <div className="text-[9px] font-black uppercase text-center mt-1 text-gray-500 tracking-wider">
            拖动以平移地图
          </div>
        </div>

        <svg 
          ref={svgRef}
          viewBox="0 0 2667 1600" 
          preserveAspectRatio="xMidYMin meet"
          className="h-full w-auto font-display cursor-grab active:cursor-grabbing"
          xmlns="http://www.w3.org/2000/svg"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Waves Pattern */}
          <defs>
            <pattern id="waves" x="0" y="0" width="100" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 Q 25 0, 50 20 T 100 20" fill="none" stroke="#A5D8E2" strokeWidth="2" strokeOpacity="0.4" />
            </pattern>
            {/* Arrow Markers for progression */}
            <marker id="arrow" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#4B5563" />
            </marker>
            <marker id="arrow-completed" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#10B981" />
            </marker>
            <marker id="arrow-hover" viewBox="0 0 10 10" refX="22" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#EF4444" />
            </marker>
          </defs>
          <rect width="100%" height="100%" fill="url(#waves)" className="pointer-events-none" />



          {/* Zoomable & Pannable Map Content */}
          <g ref={mapGroupRef} transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`} className="transition-transform duration-75 ease-out">
            
            {/* Continent Labels/Placards */}
            {continents.map(continent => {
              const labelPos = (() => {
                switch (continent.id) {
                  case 'tenses': return { x: 500, y: 500 }; // Tense Island
                  case 'modals': return { x: 2200, y: 150 }; // Modal Highlands
                  case 'structural': return { x: 1450, y: 650 }; // Syntax Mainland
                  case 'pragmatics': return { x: 2500, y: 1060 }; // Pragmatic Peninsula
                  case 'lexical': return { x: 1333, y: 1520 }; // Lexical Archipelago
                  default: return continent.position;
                }
              })();

              const relevantPoints = continent.points.filter(p => p.levels.includes(selectedExam));
              const completedCount = relevantPoints.filter(p => completedPoints.includes(p.id)).length;
              const totalCount = relevantPoints.length;

              return (
                <g key={`label-${continent.id}`} className="select-none pointer-events-none">
                  {/* English Name - Elegant Serif Book Typography */}
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    className="font-serif font-bold text-[28px] fill-slate-800 tracking-wide"
                    style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                  >
                    {continent.name}
                  </text>
                  {/* Chinese Name - Crisp Modern Small Caps */}
                  <text
                    x={labelPos.x}
                    y={labelPos.y + 24}
                    textAnchor="middle"
                    className="font-sans font-extrabold text-[12px] tracking-[0.25em] fill-slate-500"
                  >
                    {continent.chineseName}
                  </text>
                  {/* Territory Progress Info */}
                  <text
                    x={labelPos.x}
                    y={labelPos.y + 42}
                    textAnchor="middle"
                    className="font-mono text-[9px] font-bold fill-emerald-600/90 tracking-wider"
                  >
                    {totalCount > 0 
                      ? `${completedCount}/${totalCount} (${Math.round((completedCount/totalCount)*100)}% 收复)`
                      : `暂无活跃领域`
                    }
                  </text>
                </g>
              );
            })}

            {/* Animated Dependency Routes */}
            <g pointerEvents="none">
              {continents.flatMap(c => c.points).map(point => {
                if (!point.dependencies) return null;
                return point.dependencies.map(depId => {
                  const depPoint = pointsMap[depId];
                  if (!depPoint) return null;
                  
                  const isDepCompleted = completedPoints.includes(depId);
                  const isHovered = selectedPoint?.id === point.id || selectedPoint?.id === depId;
                  const isTargetRelevant = point.levels.includes(selectedExam);
                  const isSourceRelevant = depPoint.levels.includes(selectedExam);
                  
                  // Get continent offsets
                  const pointContinent = continents.find(ct => ct.points.some(p => p.id === point.id));
                  const depContinent = continents.find(ct => ct.points.some(p => p.id === depId));
                  const pointOffset = continentOffsets[pointContinent?.id || ''] || { x: 0, y: 0 };
                  const depOffset = continentOffsets[depContinent?.id || ''] || { x: 0, y: 0 };
                  
                  const px = point.position.x + pointOffset.x;
                  const py = point.position.y + pointOffset.y;
                  const dx = depPoint.position.x + depOffset.x;
                  const dy = depPoint.position.y + depOffset.y;
                  
                  const mx = (px + dx) / 2;
                  const my = (py + dy) / 2;
                  const dist = Math.sqrt((px - dx) ** 2 + (py - dy) ** 2);
                  const cx = mx - ((py - dy) / (dist || 1)) * 25;
                  const cy = my + ((px - dx) / (dist || 1)) * 25;

                  return (
                    <path
                      key={`${depId}-${point.id}`}
                      d={`M ${dx} ${dy} Q ${cx} ${cy} ${px} ${py}`}
                      fill="none"
                      stroke={isHovered ? "#EF4444" : isDepCompleted ? "#10B981" : "#9CA3AF"}
                      strokeWidth={isHovered ? "3.5" : isDepCompleted ? "2" : "1.5"}
                      strokeDasharray={isHovered ? "0" : isDepCompleted ? "6,4" : "4,6"}
                      markerEnd={isHovered ? "url(#arrow-hover)" : isDepCompleted ? "url(#arrow-completed)" : "url(#arrow)"}
                      opacity={isTargetRelevant && isSourceRelevant ? 0.8 : 0.2}
                      className="transition-all duration-300"
                    />
                  );
                });
              })}
            </g>

            {/* High Fantasy RPG Map Decorations (Ships, Lighthouses, Reefs & Sea Monster) */}
            
            {decorVisibility && (
              <>
                {/* 1. Sea Monster (利维坦海兽) */}
                <g transform="translate(680, 480)" pointerEvents="none" className="opacity-30 select-none">
                  <motion.path
                     animate={{ rotate: [0, 5, -5, 0], y: [0, -8, 0] }}
                     transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                     d="M0 0 Q 20 -30 40 0 T 80 0" 
                     fill="none" 
                     stroke="#1A1A1A" 
                     strokeWidth="3" 
                     strokeLinecap="round"
                  />
                  <text x="25" y="22" className="text-[9px] font-bold fill-slate-500 tracking-wider">利维坦海兽</text>
                </g>

                {/* 2. Northwest Sailing Ship (探险商船) */}
                <g transform="translate(720, 220)" pointerEvents="none" className="opacity-40 select-none">
                  <motion.g
                    animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
                    transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Ship Hull */}
                    <path d="M -16,4 C -10,10 10,10 16,4 C 18,2 19,-2 17,-4 L -17,-4 C -19,-2 -18,2 -16,4 Z" fill="#78350F" stroke="#1A1A1A" strokeWidth="2" />
                    {/* Sails */}
                    <path d="M 0,-4 L 0,-22 M 0,-20 C 6,-20 8,-14 10,-8 C 5,-10 0,-10 0,-10 Z" fill="#FDFBF7" stroke="#1A1A1A" strokeWidth="1.8" />
                    <path d="M 0,-20 C -6,-20 -8,-14 -10,-8 C -5,-10 0,-10 0,-10 Z" fill="#FDFBF7" stroke="#1A1A1A" strokeWidth="1.8" />
                    {/* Flag */}
                    <path d="M 0,-22 L 5,-20 L 0,-18 Z" fill="#EF4444" />
                    <text x="0" y="16" textAnchor="middle" className="text-[8px] font-bold fill-slate-500 font-sans tracking-wide">探险商船</text>
                  </motion.g>
                </g>

                {/* 3. Southeast Sailing Ship (皇家巡逻船) */}
                <g transform="translate(1820, 1420)" pointerEvents="none" className="opacity-45 select-none">
                  <motion.g
                    animate={{ y: [0, -5, 0], rotate: [3, -3, 3] }}
                    transition={{ duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <path d="M -14,3 C -8,8 8,8 14,3 C 16,1 17,-2 15,-4 L -15,-4 C -17,-2 -16,1 -14,3 Z" fill="#1E3A8A" stroke="#1A1A1A" strokeWidth="2" />
                    <path d="M 0,-4 L 0,-20 M 0,-18 C 5,-18 7,-12 9,-7 C 4,-9 0,-9 0,-9 Z" fill="#FDFBF7" stroke="#1A1A1A" strokeWidth="1.8" />
                    <path d="M 0,-18 C -5,-18 -7,-12 -9,-7 C -4,-9 0,-9 0,-9 Z" fill="#FDFBF7" stroke="#1A1A1A" strokeWidth="1.8" />
                    <path d="M 0,-20 L 4,-18.5 L 0,-17 Z" fill="#10B981" />
                    <text x="0" y="14" textAnchor="middle" className="text-[8px] font-bold fill-slate-500 font-sans tracking-wide">守卫快船</text>
                  </motion.g>
                </g>

                {/* 4. Southwest Watchman Lighthouse (守望灯塔) */}
                <g transform="translate(180, 1100)" pointerEvents="none" className="opacity-50 select-none">
                  {/* Foundation Rock */}
                  <path d="M -22,8 L -14,-4 L 0,-6 L 14,-4 L 22,8 Z" fill="#4B5563" stroke="#1A1A1A" strokeWidth="2" />
                  {/* Lighthouse Tower */}
                  <path d="M -7,-4 L -4,-36 L 4,-36 L 7,-4 Z" fill="#F3F4F6" stroke="#1A1A1A" strokeWidth="2" />
                  {/* Red Stripes */}
                  <path d="M -6,-12 L -5,-18 L 5,-18 L 6,-12 Z" fill="#EF4444" />
                  <path d="M -5,-24 L -4,-30 L 4,-30 L 5,-24 Z" fill="#EF4444" />
                  {/* Dome Lantern */}
                  <path d="M -4,-36 L -4,-39 C -4,-42 4,-42 4,-39 L 4,-36 Z" fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="1.5" />
                  {/* Glowing Beacon Beam */}
                  <motion.polygon 
                    points="0,-39 -160,-15 -160,-65" 
                    fill="#FEF08A" 
                    opacity="0.25" 
                    animate={{ opacity: [0.12, 0.32, 0.12] }} 
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} 
                  />
                  <text x="0" y="18" textAnchor="middle" className="text-[8px] font-bold fill-slate-500 font-sans tracking-wide">守望灯塔</text>
                </g>

                {/* 5. Northeast Cliff Lighthouse (风暴哨塔) */}
                <g transform="translate(2300, 200)" pointerEvents="none" className="opacity-50 select-none">
                  <path d="M -20,6 L -12,-3 L 0,-5 L 12,-3 L 20,6 Z" fill="#374151" stroke="#1A1A1A" strokeWidth="2" />
                  <path d="M -6,-3 L -4,-32 L 4,-32 L 6,-3 Z" fill="#D1D5DB" stroke="#1A1A1A" strokeWidth="2" />
                  <path d="M -5,-10 L -5,-15 L 5,-15 L 5,-10 Z" fill="#1E3A8A" />
                  <path d="M -4,-22 L -4,-27 L 4,-27 L 4,-22 Z" fill="#1E3A8A" />
                  <path d="M -4,-32 L -4,-35 C -4,-38 4,-38 4,-35 L 4,-32 Z" fill="#1A1A1A" stroke="#1A1A1A" strokeWidth="1.5" />
                  <motion.polygon 
                    points="0,-35 -140,-12 -140,-58" 
                    fill="#FEF08A" 
                    opacity="0.22" 
                    animate={{ opacity: [0.10, 0.28, 0.10] }} 
                    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 1.5 }} 
                  />
                  <text x="0" y="16" textAnchor="middle" className="text-[8px] font-bold fill-slate-500 font-sans tracking-wide">风暴哨塔</text>
                </g>

                {/* 6. Hand-drawn Sea Reefs (礁石) with ripples */}
                <g pointerEvents="none" className="opacity-45 select-none">
                  {/* Reef 1 (West Sea) */}
                  <g transform="translate(160, 680)">
                    <polygon points="0,-10 -6,2 6,2" fill="#4B5563" stroke="#1A1A1A" strokeWidth="1.8" />
                    <polygon points="5,-5 1,2 9,2" fill="#374151" stroke="#1A1A1A" strokeWidth="1.5" />
                    <path d="M -12,4 Q -3,1 6,4" fill="none" stroke="#A5D8E2" strokeWidth="1.5" />
                  </g>
                  {/* Reef 2 (Central Bay) */}
                  <g transform="translate(1780, 520)">
                    <polygon points="0,-8 -5,2 5,2" fill="#4B5563" stroke="#1A1A1A" strokeWidth="1.8" />
                    <polygon points="-4,-4 -8,2 0,2" fill="#374151" stroke="#1A1A1A" strokeWidth="1.5" />
                    <path d="M -10,4 Q -2,1 6,4" fill="none" stroke="#A5D8E2" strokeWidth="1.5" />
                  </g>
                  {/* Reef 3 (Southeast Cape) */}
                  <g transform="translate(2320, 1120)">
                    <polygon points="0,-12 -8,2 8,2" fill="#4B5563" stroke="#1A1A1A" strokeWidth="2" />
                    <polygon points="6,-6 2,2 10,2" fill="#374151" stroke="#1A1A1A" strokeWidth="1.5" />
                    <path d="M -14,4 Q -4,1 6,4" fill="none" stroke="#A5D8E2" strokeWidth="1.5" />
                  </g>
                </g>
              </>
            )}

            {continents.map(continent => {
              return (
                <motion.g
                  key={continent.id}
                  className="group"
                >
                  {/* Continent Drag Area */}
                  {continent.path && continent.id !== 'lexical' && isSculptingMode && (
                    <path
                      d={continent.path}
                      fill="rgba(255, 200, 0, 0.1)"
                      stroke="#FFC800"
                      strokeWidth="3"
                      strokeDasharray="8,4"
                      className="continent-drag-area cursor-move"
                      data-continent-id={continent.id}
                      style={{ transform: 'translate(-10px, -10px)' }}
                    />
                  )}
                  
                  {/* Unified Mainland Shadow */}
                  {continent.path && continent.id !== 'lexical' && (
                    <path
                      d={continent.path}
                      fill="#000"
                      fillOpacity="0.04"
                      transform="translate(10, 10)"
                      className="hand-drawn-border"
                      filter="url(#hand-drawn-filter)"
                    />
                  )}
                  
                  {/* Mainland Outline (The Base Backdrop) */}
                  {continent.path && continent.id !== 'lexical' && (
                    <path
                      d={continent.path}
                      fill="#FDFBF7"
                      stroke="#1A1A1A"
                      strokeWidth="5"
                      className="hand-drawn-border"
                      id={`mainland-${continent.id}`}
                      filter="url(#hand-drawn-filter)"
                    />
                  )}

                  {/* Individual Territories (Puzzle Pieces) */}
                  {continent.points.map((point) => {
                    const isRelevant = point.levels.includes(selectedExam);
                    const isCompleted = completedPoints.includes(point.id);
                    const isSelected = selectedPoint?.id === point.id;

                    const baseColor = continent.color || '#E5E7EB';
                    const fillHex = isRelevant 
                      ? (isCompleted ? baseColor : baseColor + '25') // 20% opacity for relevant but not completed
                      : '#F3F4F6'; // Greyed out for locked/non-relevant

                    return (
                      <motion.g
                        key={point.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          // Prevent triggering selection on pan drag release
                          if (hasDragged) return;
                          
                          setSelectedPoint(point);
                          setQuizMode(false);
                          setQuizFeedback(null);
                          setAiExplanation(null);
                        }}
                        className="cursor-pointer interactive-node"
                      >
                        {/* Territory Shape */}
                        {point.territoryPath && (
                          <motion.path
                            d={point.territoryPath}
                            fill={fillHex}
                            stroke={isSelected ? "#EF4444" : isRelevant ? "#1A1A1A" : "#9CA3AF"}
                            strokeWidth={isSelected ? "3" : "1.5"}
                            filter="url(#hand-drawn-filter)"
                            animate={{ 
                              fill: fillHex,
                              strokeDasharray: isRelevant ? "0" : "3,4"
                            }}
                            whileHover={{ 
                              fill: isRelevant 
                                ? (isCompleted ? baseColor : baseColor + '55') 
                                : "#E5E7EB" 
                            }}
                            className="transition-colors duration-300"
                          />
                        )}

                        {/* Completion Badge (No black dot!) */}
                        {isCompleted && (
                          <g transform={`translate(${point.position.x}, ${point.position.y - 14})`} className="pointer-events-none">
                            <circle
                              cx="0"
                              cy="0"
                              r="6"
                              fill="#10B981"
                              stroke="#FFFFFF"
                              strokeWidth="1.5"
                              filter="url(#hand-drawn-filter)"
                            />
                            <path 
                              d="M -2.5 0 L -0.5 2 L 2.5 -1"
                              stroke="white"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />
                          </g>
                        )}
                        
                        {/* Wrapped Label */}
                        {(() => {
                          // Wrap Chinese label into lines of up to 4-5 characters to keep it extremely compact and narrow
                          const chnText = point.chineseName || '';
                          const chnLines: string[] = [];
                          let maxChars = 4;
                          if (chnText.length <= 5) {
                            maxChars = 5;
                          } else if (chnText.length <= 8) {
                            maxChars = 4;
                          } else {
                            maxChars = Math.ceil(chnText.length / 3);
                            if (maxChars < 3) maxChars = 3;
                            if (maxChars > 4) maxChars = 4;
                          }
                          for (let i = 0; i < chnText.length; i += maxChars) {
                            chnLines.push(chnText.substring(i, i + maxChars));
                          }

                          const allLines = chnLines.map(l => ({ text: l, isChn: true }));
                          const lineHeight = 9.5;
                          // If completed, shift label slightly down to make room for the badge
                          const yOffset = isCompleted ? 8 : 1;
                          const startY = point.position.y + yOffset - ((allLines.length - 1) * lineHeight) / 2;

                          return (
                            <g className="pointer-events-none select-none">
                              {allLines.map((line, idx) => (
                                <text
                                  key={idx}
                                  x={point.position.x}
                                  y={startY + idx * lineHeight}
                                  textAnchor="middle"
                                  className={cn(
                                    "text-[8.5px] font-black fill-slate-800 tracking-wide",
                                    !isRelevant && "opacity-30"
                                  )}
                                  style={{ dominantBaseline: 'middle' }}
                                >
                                  {line.text}
                                </text>
                              ))}
                            </g>
                          );
                        })()}
                      </motion.g>
                    );
                  })}

                  {/* Decoration */}
                  <motion.g
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="pointer-events-none opacity-20"
                  >
                    <g transform="translate(150, 400) scale(1.5)">
                      <Anchor className="w-6 h-6 text-black" strokeWidth={1} />
                    </g>
                    <g transform="translate(850, 250) scale(1.5)">
                      <Bird className="w-6 h-6 text-black" strokeWidth={1} />
                    </g>
                  </motion.g>
                </motion.g>
              );
            })}


          </g>
        </svg>

        {isLevelComplete() && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center p-8 bg-black/50 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              className="bg-yellow-400 border-8 border-black p-12 max-w-lg text-center shadow-[20px_20px_0_0_#000]"
            >
              <Trophy className="w-32 h-32 mx-auto mb-8 text-black" />
              <h2 className="text-6xl font-display font-black mb-4 uppercase tracking-tighter leading-none">探险凯旋！</h2>
              <p className="text-xl font-bold mb-8 uppercase tracking-widest text-black/60">{selectedExam} 的所有领域已全部征服</p>
              <button 
                onClick={() => setCompletedPoints([])}
                className="px-8 py-4 bg-black text-yellow-400 font-black uppercase tracking-widest hover:bg-gray-800 transition-colors"
              >
                重置地图进度
              </button>
            </motion.div>
          </motion.div>
        )}


      </main>

      {/* Point Details Modal */}
      <AnimatePresence>
        {selectedPoint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 50, rotate: 1 }}
              animate={{ y: 0, rotate: 0 }}
              exit={{ y: 50, rotate: 1 }}
              className="bg-white border-8 border-black w-full max-w-xl overflow-hidden shadow-[16px_16px_0_0_#000] flex flex-col max-h-[90vh]"
            >
              <div className="p-6 bg-yellow-400 border-b-8 border-black flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-display font-black uppercase">{selectedPoint.chineseName}</h2>
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{selectedPoint.name}</p>
                </div>
                <button onClick={() => setSelectedPoint(null)} className="p-2 bg-black text-white hover:rotate-90 transition-transform">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <div>
                  <h4 className="text-[10px] font-black uppercase text-gray-400 mb-2">神秘奥义（语法点解析）</h4>
                  <p className="text-lg font-bold leading-tight">{selectedPoint.description}</p>
                </div>

                <div className="space-y-3">
                   {selectedPoint.examples.map((ex, i) => (
                    <div key={i} className="p-4 bg-gray-50 border-4 border-black font-bold italic rotate-[0.5deg]">
                       "{ex}"
                    </div>
                  ))}
                </div>

                {/* Target CEFR Exam Levels & Prerequisites Checklist */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-t-2 border-dashed border-gray-200 pt-6">
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-gray-400 mb-2">欧洲共同语言参考标准 (CEFR)</h4>
                    <div className="flex gap-1">
                      {['KET', 'PET', 'FCE', 'IELTS'].map(lvl => {
                        const isMatch = selectedPoint.levels.includes(lvl as ExamLevel);
                        return (
                          <span
                            key={lvl}
                            className={cn(
                              "px-2 py-1 text-[10px] font-black rounded-md border-2 transition-all",
                              isMatch
                                ? "bg-black text-yellow-400 border-black"
                                : "bg-gray-100 text-gray-300 border-transparent select-none"
                            )}
                          >
                            {lvl}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex-1 min-w-[200px]">
                    <h4 className="text-[10px] font-black uppercase text-gray-400 mb-2">前置解锁要件</h4>
                    <div className="flex flex-wrap gap-1.5 animate-fade-in">
                      {selectedPoint.dependencies && selectedPoint.dependencies.length > 0 ? (
                        selectedPoint.dependencies.map(depId => {
                          const dep = pointsMap[depId];
                          const isConquered = completedPoints.includes(depId);
                          if (!dep) return null;
                          return (
                            <span 
                              key={depId}
                              className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black border-2 transition-all",
                                isConquered 
                                  ? "bg-emerald-50 border-emerald-400 text-emerald-700" 
                                  : "bg-gray-50 border-gray-300 text-gray-400"
                              )}
                            >
                              <span className={cn("w-1.5 h-1.5 rounded-full", isConquered ? "bg-emerald-500 animate-pulse" : "bg-gray-400")} />
                              {dep.chineseName}
                            </span>
                          );
                        })
                      ) : (
                        <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          无前置要求！探险通道已解锁。
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {!quizMode ? (
                  (() => {
                    const isLocked = selectedPoint.dependencies && selectedPoint.dependencies.length > 0 && !selectedPoint.dependencies.every(depId => completedPoints.includes(depId));
                    if (isLocked) {
                      return (
                        <div className="space-y-3">
                          <button 
                            disabled
                            className="w-full py-6 bg-gray-100 border-4 border-dashed border-gray-300 text-gray-400 font-display font-black text-xl uppercase tracking-tighter flex items-center justify-center gap-4 cursor-not-allowed"
                          >
                            <Lock className="w-6 h-6" />
                            前置领地尚未收复
                          </button>
                          <p className="text-xs text-rose-500 font-bold text-center">
                            请先收复上方列出的所有「前置解锁要件」领地，以开启此领域挑战！
                          </p>
                        </div>
                      );
                    }
                    return (
                      <button 
                        onClick={() => setQuizMode(true)}
                        className="w-full py-6 bg-black text-yellow-400 font-display font-black text-xl uppercase tracking-tighter flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all"
                      >
                        <Sparkles className="w-6 h-6" />
                        开始领域挑战
                      </button>
                    );
                  })()
                ) : (
                  <div className="space-y-6">
                    <div className="p-6 bg-emerald-50 border-4 border-emerald-900/10 rounded-3xl">
                      <h4 className="text-[10px] font-black uppercase text-emerald-600 mb-4 tracking-widest">探险挑战问题</h4>
                      <p className="text-xl font-bold">{selectedPoint.quiz.question}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {selectedPoint.quiz.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => !quizFeedback && handleQuizAnswer(i)}
                          className={cn(
                            "p-4 border-4 border-black text-left font-black transition-all",
                            quizFeedback
                              ? i === selectedPoint.quiz.answer
                                ? "bg-emerald-400 -translate-y-1"
                                : quizFeedback.correct === false && i !== selectedPoint.quiz.answer
                                  ? "bg-gray-100 opacity-50"
                                  : "bg-white"
                              : "bg-white hover:bg-yellow-100 hover:-translate-y-1 shadow-[4px_4px_0_0_#000] active:shadow-none active:translate-x-1 active:translate-y-1"
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                    {quizFeedback && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                          "p-6 border-4 border-black",
                          quizFeedback.correct ? "bg-emerald-100" : "bg-rose-100"
                        )}
                      >
                         <h5 className="font-black uppercase mb-2">{quizFeedback.correct ? '挑战成功！' : '攻占失败！'}</h5>
                         <p className="text-sm font-bold opacity-70 mb-6">{quizFeedback.message}</p>
                         
                         {quizFeedback.correct ? (
                           <button onClick={() => setSelectedPoint(null)} className="w-full py-3 bg-black text-white font-black uppercase text-xs tracking-widest">返回地图</button>
                         ) : (
                           <div className="space-y-4">
                             <button onClick={() => setQuizFeedback(null)} className="w-full py-3 bg-red-600 text-white font-black uppercase text-xs tracking-widest">重新尝试</button>
                             {!aiExplanation ? (
                               <button 
                                onClick={askAiForHelp}
                                disabled={isAiLoading}
                                className="w-full py-3 bg-white border-2 border-black font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors"
                               >
                                 {isAiLoading ? '正在召请导师...' : '请 AI 导师释疑'}
                                 <Sparkles className="w-3 h-3" />
                               </button>
                             ) : (
                               <div className="p-4 bg-white border-2 border-black text-xs font-bold leading-relaxed italic">
                                 <div className="flex items-center gap-2 mb-2 text-blue-600">
                                   <Sparkles className="w-3 h-3" />
                                   导师教诲：
                                 </div>
                                 {aiExplanation}
                               </div>
                             )}
                           </div>
                         )}
                      </motion.div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
