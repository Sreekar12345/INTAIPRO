import {
  Blocks,
  Clock3,
  FileArchive,
  FolderKanban,
  GalleryVerticalEnd,
  History,
  Home,
  ImageIcon,
  Layers3,
  Library,
  MessageSquare,
  PanelTop,
  Settings,
  Upload,
  Users,
  WandSparkles,
} from "lucide-react";
import type {
  AnalysisSignal,
  LayoutVersion,
  MaterialItem,
  Project,
  QuestionnaireSection,
  RenderJob,
  RoomDetection,
  WorkspaceRoute,
} from "@/types/product";

export const workspaceRoutes: WorkspaceRoute[] = [
  { href: "/projects", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: FolderKanban },
  { href: "/uploads", label: "Uploads", icon: Upload, stage: "intake" },
  { href: "/analysis", label: "AI Concepts", icon: WandSparkles, stage: "analysis" },
  { href: "/layouts", label: "Layouts", icon: Layers3, stage: "layouts" },
  { href: "/moodboards", label: "Moodboards", icon: GalleryVerticalEnd, stage: "moodboards" },
  { href: "/materials", label: "Materials", icon: Library, stage: "materials" },
  { href: "/renders", label: "Renders", icon: ImageIcon, stage: "renders" },
  { href: "/documentation", label: "Documentation", icon: FileArchive, stage: "documentation" },
  { href: "/collaboration", label: "Team", icon: Users },
  { href: "/history", label: "History", icon: History },
  { href: "/settings", label: "Settings", icon: Settings },
];

export const workflowStages = [
  { key: "intake", label: "Create project", icon: FolderKanban },
  { key: "intake", label: "Upload floor plan", icon: Upload },
  { key: "analysis", label: "AI analysis", icon: PanelTop },
  { key: "questionnaire", label: "Design discovery", icon: MessageSquare },
  { key: "layouts", label: "Layout planning", icon: Layers3 },
  { key: "moodboards", label: "Moodboards", icon: GalleryVerticalEnd },
  { key: "materials", label: "Materials", icon: Blocks },
  { key: "renders", label: "Renders", icon: ImageIcon },
  { key: "documentation", label: "Export package", icon: FileArchive },
] as const;

export const projects: Project[] = [
  {
    id: "hudson-loft",
    name: "Hudson Loft",
    location: "New York, NY",
    squareFeet: 1860,
    styleDirection: "Quiet luxury",
    stage: "layouts",
    progress: 62,
    lastEdited: "Today, 10:42",
    collaborators: ["Mira", "Jon", "Atelier AI"],
    generationStatus: "generating",
    thumbnail:
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "noe-valley",
    name: "Noe Valley Residence",
    location: "San Francisco, CA",
    squareFeet: 2420,
    styleDirection: "Soft minimal",
    stage: "materials",
    progress: 74,
    lastEdited: "Yesterday",
    collaborators: ["Priya", "Ava"],
    generationStatus: "ready",
    thumbnail:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "aoyama-studio",
    name: "Aoyama Studio",
    location: "Tokyo, JP",
    squareFeet: 640,
    styleDirection: "Compact Japandi",
    stage: "renders",
    progress: 88,
    lastEdited: "May 22",
    collaborators: ["Ken", "Mira"],
    generationStatus: "review",
    thumbnail:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "chelsea-townhouse",
    name: "Chelsea Townhouse",
    location: "London, UK",
    squareFeet: 3120,
    styleDirection: "Gallery classic",
    stage: "questionnaire",
    progress: 38,
    lastEdited: "May 20",
    collaborators: ["Elena", "Theo"],
    generationStatus: "analyzing",
    thumbnail:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
  },
];

export const roomDetections: RoomDetection[] = [
  { id: "living", name: "Living room", area: 28.4, confidence: 98, warnings: [] },
  { id: "kitchen", name: "Kitchen", area: 10.1, confidence: 93, warnings: ["Plumbing chase close to island clearance"] },
  { id: "dining", name: "Dining", area: 14.8, confidence: 91, warnings: [] },
  { id: "entry", name: "Entry", area: 6.2, confidence: 88, warnings: ["Storage wall opportunity"] },
];

export const analysisSignals: AnalysisSignal[] = [
  {
    id: "circulation",
    title: "Circulation spine",
    detail: "Main path stays above 920 mm, but dining chair pullback needs protection.",
    score: 92,
    type: "circulation",
  },
  {
    id: "sunlight",
    title: "West daylight",
    detail: "Afternoon glare affects media wall; recommend textile shade or low-reflectance finish.",
    score: 86,
    type: "sunlight",
  },
  {
    id: "storage",
    title: "Entry storage",
    detail: "A 2.4 m built-in can absorb coats, shoes, and cleaning storage without reducing flow.",
    score: 89,
    type: "storage",
  },
  {
    id: "privacy",
    title: "Guest sightline",
    detail: "Entry has a direct view to lounge; a low console or slatted divider can soften arrival.",
    score: 81,
    type: "privacy",
  },
];

export const questionnaireSections: QuestionnaireSection[] = [
  {
    id: "household",
    title: "Household Information",
    prompt: "Who will live in this home most days?",
    progress: 0,
    required: true,
    intent: "Family members, ages, pets, and guest frequency shape room priorities and durable material choices.",
    recommendation: "AI recommends capturing pets and frequent guests before layout generation.",
    options: ["Couple", "Young family", "Multi-generational", "Pets at home", "Frequent guests", "Live-in help"],
  },
  {
    id: "lifestyle",
    title: "Lifestyle Analysis",
    prompt: "How does the household actually use the space?",
    progress: 0,
    required: true,
    intent: "Work patterns, cooking habits, entertainment habits, storage behavior, privacy, and routines become planning constraints.",
    recommendation: "Because the plan has an open living-dining zone, entertainment and privacy answers will affect zoning.",
    options: ["Work from home", "Daily cooking", "Weekend hosting", "Quiet routines", "High storage behavior", "Privacy focused"],
  },
  {
    id: "functional",
    title: "Functional Requirements",
    prompt: "Which functions must the design solve without compromise?",
    progress: 0,
    required: true,
    intent: "Workspace, dining, wardrobe, utility, and storage requirements determine layout feasibility.",
    recommendation: "AI detected an entry storage opportunity; confirm wardrobe and utility needs before generation.",
    options: ["Dedicated workspace", "Expandable dining", "Large wardrobes", "Utility zone", "Hidden storage", "Child-safe circulation"],
  },
  {
    id: "style",
    title: "Style Discovery",
    prompt: "What should the home feel like, and what should it avoid?",
    progress: 0,
    required: true,
    intent: "Preferred styles, disliked styles, material preferences, lighting preferences, and inspiration uploads guide concepts and renders.",
    recommendation: "Current project signal suggests warm minimal with low-reflectance materials for west daylight.",
    options: ["Warm minimal", "Quiet luxury", "Natural textures", "Soft contrast", "Dislike glossy finishes", "Layered lighting"],
  },
  {
    id: "budget",
    title: "Budget Planning",
    prompt: "Where should the project spend, save, and stay practical?",
    progress: 0,
    required: true,
    intent: "Total budget, room-wise priorities, and luxury versus practical balance control recommendations.",
    recommendation: "AI can generate premium and practical branches after this budget profile is complete.",
    options: ["Premium living room", "Save on bedrooms", "Invest in lighting", "Durable materials", "Custom storage", "Mixed high-low"],
  },
  {
    id: "technical",
    title: "Technical Constraints",
    prompt: "Which constraints must the design respect from day one?",
    progress: 0,
    required: true,
    intent: "Vastu, existing plumbing, structural restrictions, and renovation limits prevent impossible concepts.",
    recommendation: "Kitchen plumbing zone was detected; confirm whether plumbing can move before layout generation.",
    options: ["Vastu sensitive", "Fixed plumbing", "No wall demolition", "Rental limits", "Existing flooring stays", "Limited renovation time"],
  },
];

export const designIntelligenceProfile = {
  household: "Young professional household with frequent weekend guests and one pet.",
  lifestyle: "Hybrid work, daily cooking, quiet weekday evenings, occasional hosting.",
  function: "Concealed entry storage, flexible dining, ergonomic work zone, protected circulation.",
  style: "Warm minimal direction with natural textures, matte finishes, layered lighting, and no glossy surfaces.",
  budget: "Premium living and lighting spend; practical secondary room choices; custom storage allowed.",
  constraints: "Existing plumbing remains fixed, no major structural wall changes, west-light glare needs mitigation.",
};

export const layoutVersions: LayoutVersion[] = [
  {
    id: "layout-a",
    name: "Open lounge axis",
    branch: "main / concept-a",
    clearanceScore: 94,
    storageGain: "+18%",
    notes: ["Best circulation", "Media wall protected", "Dining remains flexible"],
  },
  {
    id: "layout-b",
    name: "Gallery dining",
    branch: "main / concept-b",
    clearanceScore: 88,
    storageGain: "+11%",
    notes: ["Strong hosting mode", "Needs sideboard reduction", "Better artwork wall"],
  },
  {
    id: "layout-c",
    name: "Compact conversation",
    branch: "branch / client-review",
    clearanceScore: 91,
    storageGain: "+15%",
    notes: ["Balanced seating", "Good daylight", "Lower furniture cost"],
  },
];

export const materials: MaterialItem[] = [
  { id: "oak", name: "Smoked oak plank", category: "Flooring", finish: "Matte engineered", priceBand: "$$$", tone: "#4b4038", favorite: true },
  { id: "travertine", name: "Honed travertine", category: "Marble", finish: "Vein cut slab", priceBand: "$$$$", tone: "#b4a88e", favorite: true },
  { id: "limewash", name: "Mineral limewash", category: "Wall finish", finish: "Low sheen", priceBand: "$$", tone: "#d8d2c4", favorite: false },
  { id: "boucle", name: "Cloud boucle", category: "Fabrics", finish: "Performance textile", priceBand: "$$$", tone: "#ebe8df", favorite: false },
  { id: "bronze", name: "Brushed bronze", category: "Lighting fixtures", finish: "Satin metal", priceBand: "$$$", tone: "#7c654d", favorite: true },
  { id: "laminate", name: "Charcoal laminate", category: "Laminates", finish: "Fingerprint resistant", priceBand: "$", tone: "#242424", favorite: false },
];

export const renderJobs: RenderJob[] = [
  {
    id: "render-01",
    room: "Living room",
    prompt: "Warm minimal lounge, smoked oak floor, low modular sofa, west daylight.",
    status: "rendering",
    camera: "35 mm corner view",
    lighting: "Soft afternoon",
    progress: 68,
  },
  {
    id: "render-02",
    room: "Dining",
    prompt: "Travertine dining table, linen wall finish, pendant lighting, gallery wall.",
    status: "queued",
    camera: "Eye-level frontal",
    lighting: "Evening warm",
    progress: 12,
  },
  {
    id: "render-03",
    room: "Entry",
    prompt: "Built-in storage wall, bronze pulls, concealed lighting, stone catch-all shelf.",
    status: "complete",
    camera: "Wide entry",
    lighting: "Natural ambient",
    progress: 100,
  },
];

export const activityLog = [
  { icon: Clock3, label: "AI analysis completed circulation pass", time: "10:42" },
  { icon: Layers3, label: "Layout B branched for client review", time: "11:08" },
  { icon: ImageIcon, label: "Living room render entered queue", time: "11:31" },
  { icon: MessageSquare, label: "Jon approved warm minimal direction", time: "12:04" },
];
