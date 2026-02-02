import { useState, useRef, useCallback, Suspense, Component, useEffect, useMemo, type ReactNode, type ErrorInfo } from 'react';
import * as THREE from 'three';
import { Canvas, createPortal } from '@react-three/fiber';
import { useGLTF, Stage, OrbitControls, useTexture, Decal } from '@react-three/drei';
import { 
  Upload, Maximize2, Palette, Download, Share2, 
  ChevronLeft, Layers, Box, Image as ImageIcon,
  Sparkles, Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

// Design template presets
const designTemplates = [
  { id: 'blank', name: 'Blank', url: null },
  { id: 'minimal', name: 'Minimal Logo', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idHJhbnNwYXJlbnQiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjQ4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+TE9HTzwvdGV4dD48L3N2Zz4=' },
  { id: 'stripes', name: 'Stripes', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0ic3RyaXBlcyIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48bGluZSB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iNDAiIHN0cm9rZT0iIzMzMyIgc3Ryb2tlLXdpZHRoPSI0Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNzdHJpcGVzKSIgb3BhY2l0eT0iMC4zIi8+PC9zdmc+' },
  { id: 'dots', name: 'Polka Dots', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZG90cyIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIj48Y2lyY2xlIGN4PSIyNSIgY3k9IjI1IiByPSI4IiBmaWxsPSIjMzMzIiBvcGFjaXR5PSIwLjMiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSJ1cmwoI2RvdHMpIi8+PC9zdmc+' },
  { id: 'gradient', name: 'Gradient', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2MzY2ZjEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNhODU1ZjciLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNncmFkKSIgb3BhY2l0eT0iMC43Ii8+PC9zdmc+' },
];

// Material options with colors
const materials = [
  { id: 'matte', name: 'Matte Paper', description: 'Soft, non-reflective finish', defaultColor: '#ffffff' },
  { id: 'glossy', name: 'Glossy Coated', description: 'Shiny, vibrant colors', defaultColor: '#ffffff' },
  { id: 'kraft', name: 'Kraft Paper', description: 'Natural brown texture', defaultColor: '#d4a574' },
  { id: 'plastic', name: 'Plastic', description: 'Clear or colored plastic', defaultColor: '#e8f4f8' },
  { id: 'canvas', name: 'Canvas Fabric', description: 'Durable cotton texture', defaultColor: '#f5f0e6' },
  { id: 'luxury', name: 'Luxury Laminated', description: 'Premium high-gloss finish', defaultColor: '#1a1a1a' },
];

// Background options
const backgrounds = [
  { id: 'white', name: 'Pure White', color: '#ffffff', gradient: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)' },
  { id: 'gray', name: 'Studio Gray', color: '#e5e5e5', gradient: 'linear-gradient(135deg, #e5e5e5 0%, #d4d4d4 100%)' },
  { id: 'warm', name: 'Warm Beige', color: '#f5e6d3', gradient: 'linear-gradient(135deg, #f5e6d3 0%, #e8d4bc 100%)' },
  { id: 'cool', name: 'Cool Blue', color: '#e0f2fe', gradient: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)' },
  { id: 'dark', name: 'Dark Mode', color: '#1a1a1a', gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)' },
  { id: 'gradient', name: 'Sunset', color: '#fef3c7', gradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 50%, #fbbf24 100%)' },
  { 
    id: 'grid', 
    name: 'Technical Grid', 
    color: '#f8f9fa', 
    gradient: null,
    style: {
      backgroundColor: '#f8f9fa',
      backgroundImage: 'linear-gradient(to right, #e5e5e5 1px, transparent 1px), linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)',
      backgroundSize: '40px 40px'
    }
  },
];


class ErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('3D Viewer Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function Model({ color = "#ffffff", textureUrl, scale = 1, y = 0 }: { color?: string; textureUrl?: string | null; scale?: number; y?: number }) {
  const { scene } = useGLTF('/shopping-bag_2.gltf');
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const texture = useTexture(textureUrl || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=');
  const [targetMesh, setTargetMesh] = useState<THREE.Mesh | null>(null);
  const [zPos, setZPos] = useState(0.5);

  useEffect(() => {
    if (texture) {
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
    }

    let meshFound: THREE.Mesh | null = null;
    let maxMetric = 0;

    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          if (!mesh.userData.isMaterialCloned) {
            mesh.material = (mesh.material as THREE.Material).clone();
            mesh.userData.isMaterialCloned = true;
          }
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.color.set(color);
          mat.needsUpdate = true;
        }
        
        // Find the main body mesh (largest volume/size) to apply decal
        if (mesh.geometry) {
          mesh.geometry.computeBoundingBox();
          const box = mesh.geometry.boundingBox;
          if (box) {
            const size = new THREE.Vector3();
            box.getSize(size);
            const metric = size.x * size.y * size.z || size.length();
            if (metric > maxMetric) {
              maxMetric = metric;
              meshFound = mesh;
              setZPos(box.max.z + 0.01);
            }
          }
        }
      }
    });
    setTargetMesh(meshFound);
  }, [clonedScene, color]);

  return (
    <>
      <primitive object={clonedScene} dispose={null} scale={1} />
      {targetMesh && textureUrl && createPortal(
        <Decal 
          position={[0, y, zPos]} 
          rotation={[0, 180, 180] 
          scale={scale} 
        >
          <meshStandardMaterial 
            map={texture} 
            transparent 
            polygonOffset 
            polygonOffsetFactor={-2} 
          />
        </Decal>,
        targetMesh
      )}
    </>
  );
}

export function MockupViewer3D() {
  const [activeTab, setActiveTab] = useState<'design' | 'material' | 'background'>('design');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');
  const [selectedMaterial, setSelectedMaterial] = useState('matte');
  const [selectedBackground, setSelectedBackground] = useState('grid');
  const [bagColor, setBagColor] = useState('#ffffff');
  const [customColor, setCustomColor] = useState('#ffffff');
  const [showColorPicker, setShowColorPicker] = useState(false);
  
  // Design positioning
  const [designScale, setDesignScale] = useState(80);
  const [designOpacity, setDesignOpacity] = useState(100);
  const [designY, setDesignY] = useState(0);
  
  // Lighting
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [shadowIntensity, setShadowIntensity] = useState(60);
  
  // View options
  const [showGrid, setShowGrid] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setSelectedTemplate('custom');
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    if (templateId !== 'custom') {
      setUploadedImage(null);
    }
  };

  const handleMaterialSelect = (materialId: string) => {
    setSelectedMaterial(materialId);
    const material = materials.find(m => m.id === materialId);
    if (material) {
      setBagColor(material.defaultColor);
      setCustomColor(material.defaultColor);
    }
  };

  const getCurrentDesign = () => {
    if (selectedTemplate === 'custom' && uploadedImage) return uploadedImage;
    const template = designTemplates.find(t => t.id === selectedTemplate);
    return template?.url || null;
  };

  const currentBackground = backgrounds.find(b => b.id === selectedBackground);
  const currentMaterial = materials.find(m => m.id === selectedMaterial);

  // Apply custom color
  const applyCustomColor = () => {
    setBagColor(customColor);
    setShowColorPicker(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-[72px]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Shopping Bag Mockup</h1>
            
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 gap-2">
              <Download className="w-4 h-4" />
              Export HD
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Viewer */}
          <div className={`lg:col-span-2 ${isFullscreen ? 'fixed inset-0 z-50 bg-black p-4' : ''}`}>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setShowGrid(!showGrid)}
                    className={`p-2 rounded-lg transition-colors ${showGrid ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-100'}`}
                    title="Toggle Grid"
                  >
                    <Box className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Fullscreen"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 3D Canvas Area with Sketchfab Embed */}
              <div
                className="relative aspect-[4/3] overflow-hidden cursor-grab active:cursor-grabbing select-none"
                style={(currentBackground as any)?.style || { background: currentBackground?.gradient }}
              >
                {/* Grid Overlay */}
                {showGrid && (
                  <div className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, #999 1px, transparent 1px),
                        linear-gradient(to bottom, #999 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px'
                    }}
                  />
                )}

                <ErrorBoundary
                  fallback={
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                      <div className="text-center p-6">
                        <p className="text-gray-500 mb-4">3D Viewer encountered an error</p>
                        <Button onClick={() => window.location.reload()} variant="outline">
                          Reload Viewer
                        </Button>
                      </div>
                    </div>
                  }
                >
                  <Canvas 
                    dpr={[1, 2]} 
                    camera={{ fov: 45 }} 
                    shadows
                    gl={{
                      antialias: true,
                      toneMapping: THREE.ACESFilmicToneMapping,
                      powerPreference: 'high-performance',
                    }}
                  >
                    <Suspense fallback={null}>
                      <Stage 
                        environment="city" 
                        intensity={brightness / 100 * 0.8}
                        shadows={{ 
                          type: 'contact', 
                          opacity: shadowIntensity / 100, 
                          blur: 2 
                        }}
                      >
                        <Model 
                          color={bagColor} 
                          textureUrl={getCurrentDesign()} 
                          scale={designScale / 80}
                          y={designY / 50}
                        />
                      </Stage>
                    </Suspense>
                    <OrbitControls makeDefault />
                  </Canvas>
                </ErrorBoundary>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-4">
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'Resolution', value: '4K' },
                  { label: 'Format', value: 'PNG' },
                  { label: 'Material', value: currentMaterial?.name },
                  { label: 'Color', value: bagColor },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl p-3 text-center shadow-sm">
                    <p className="text-xs text-gray-500">{stat.label}</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {stat.label === 'Color' ? (
                        <span
                          className="inline-block w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: stat.value }}
                        />
                      ) : stat.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              {[
                { id: 'design', icon: ImageIcon, label: 'Design' },
                { id: 'material', icon: Layers, label: 'Material' },
                { id: 'background', icon: Palette, label: 'Scene' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'design' | 'material' | 'background')}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="p-6 max-h-[600px] overflow-y-auto">
              {activeTab === 'design' && (
                <div className="space-y-6">
                  {/* Upload Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Upload Your Design
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all flex flex-col items-center gap-2"
                    >
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        <Upload className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">Click or drag to upload</p>
                        <p className="text-xs text-gray-500">PNG, JPG, SVG up to 20MB</p>
                      </div>
                    </button>
                  </div>

                  {/* Templates */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Quick Templates
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {designTemplates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => handleTemplateSelect(template.id)}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            selectedTemplate === template.id
                              ? 'border-purple-600 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div 
                            className="w-full h-14 rounded-lg bg-gray-100 mb-2 flex items-center justify-center overflow-hidden"
                          >
                            {template.url ? (
                              <img src={template.url} alt={template.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-gray-400 text-xs">Blank</span>
                            )}
                          </div>
                          <span className="text-xs font-medium text-gray-700">{template.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Design Positioning */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Design Position
                    </label>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500">Scale</span>
                        <span className="text-xs text-gray-500">{designScale}%</span>
                      </div>
                      <Slider
                        value={[designScale]}
                        onValueChange={(v) => setDesignScale(v[0])}
                        min={10}
                        max={3000}
                        step={5}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500">Vertical Position</span>
                        <span className="text-xs text-gray-500">{designY}px</span>
                      </div>
                      <Slider
                        value={[designY]}
                        onValueChange={(v) => setDesignY(v[0])}
                        min={-50}
                        max={1000}
                        step={5}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500">Opacity</span>
                        <span className="text-xs text-gray-500">{designOpacity}%</span>
                      </div>
                      <Slider
                        value={[designOpacity]}
                        onValueChange={(v) => setDesignOpacity(v[0])}
                        min={20}
                        max={100}
                        step={5}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'material' && (
                <div className="space-y-6">
                  {/* Material Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Material Type
                    </label>
                    <div className="space-y-2">
                      {materials.map((material) => (
                        <button
                          key={material.id}
                          onClick={() => handleMaterialSelect(material.id)}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                            selectedMaterial === material.id
                              ? 'border-purple-600 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{material.name}</p>
                              <p className="text-xs text-gray-500">{material.description}</p>
                            </div>
                            <div 
                              className="w-6 h-6 rounded-full border border-gray-200"
                              style={{ backgroundColor: material.defaultColor }}
                            />
                            {selectedMaterial === material.id && (
                              <Check className="w-5 h-5 text-purple-600 ml-2" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bag Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Bag Color
                    </label>
                    
                    {/* Custom Color Picker */}
                    <div className="mt-3">
                      <button
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700"
                      >
                        <Palette className="w-4 h-4" />
                        Custom Color
                      </button>
                      {showColorPicker && (
                        <div className="mt-2 p-3 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <input
                              type="color"
                              value={customColor}
                              onChange={(e) => setCustomColor(e.target.value)}
                              className="w-12 h-12 rounded-lg border border-gray-200 cursor-pointer"
                            />
                            <input
                              type="text"
                              value={customColor}
                              onChange={(e) => setCustomColor(e.target.value)}
                              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm"
                            />
                            <button
                              onClick={applyCustomColor}
                              className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700"
                            >
                              Apply
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Lighting Controls */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Lighting
                    </label>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500">Brightness</span>
                        <span className="text-xs text-gray-500">{brightness}%</span>
                      </div>
                      <Slider
                        value={[brightness]}
                        onValueChange={(v) => setBrightness(v[0])}
                        min={50}
                        max={150}
                        step={5}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500">Contrast</span>
                        <span className="text-xs text-gray-500">{contrast}%</span>
                      </div>
                      <Slider
                        value={[contrast]}
                        onValueChange={(v) => setContrast(v[0])}
                        min={50}
                        max={150}
                        step={5}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-gray-500">Shadow</span>
                        <span className="text-xs text-gray-500">{shadowIntensity}%</span>
                      </div>
                      <Slider
                        value={[shadowIntensity]}
                        onValueChange={(v) => setShadowIntensity(v[0])}
                        min={0}
                        max={100}
                        step={5}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'background' && (
                <div className="space-y-6">
                  {/* Background Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Background
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {backgrounds.map((bg) => (
                        <button
                          key={bg.id}
                          onClick={() => setSelectedBackground(bg.id)}
                          className={`p-3 rounded-xl border-2 transition-all ${
                            selectedBackground === bg.id
                              ? 'border-purple-600'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div 
                            className="w-full h-16 rounded-lg mb-2"
                            style={(bg as any).style || { background: bg.gradient }}
                          />
                          <span className="text-xs font-medium text-gray-700">{bg.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Export Settings */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Export Settings
                    </label>
                    <div className="space-y-2">
                      {[
                        { label: '4K Resolution (3840×2160)', checked: true },
                        { label: 'Transparent Background', checked: false },
                        { label: 'Include Shadow', checked: true },
                        { label: 'High Quality Render', checked: true },
                      ].map((setting) => (
                        <label key={setting.label} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50">
                          <input type="checkbox" className="w-4 h-4 text-purple-600 rounded" defaultChecked={setting.checked} />
                          <span className="text-sm text-gray-700">{setting.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Pro Tip */}
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-purple-900">Pro Tip</h4>
                        <p className="text-xs text-purple-700 mt-1">
                          Use transparent background for easy integration into your marketing materials.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t border-gray-200 space-y-3">
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Download Mockup
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
