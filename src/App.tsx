import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { CustomModal } from "./components/CustomModal";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Textarea } from "./components/ui/textarea";
import { Checkbox } from "./components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "./components/ui/sidebar";
import { QRCodeGenerator } from "./components/QRCodeGenerator";
import { StockInfoPage } from "./components/StockInfoPage";
import { StockManagement } from "./components/StockManagement";
import { DashboardStats } from "./components/DashboardStats";

import {
  Scissors,
  Sparkles,
  Wrench,
  Package,
  Archive,
  RotateCcw,
  Factory,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Building2,
  ArrowLeft,
  Box,
  Save,
  Plus,
  Trash2,
  Calendar,
  QrCode,
  Download,
  Printer,
  Edit,
  FileText,
  StopCircle,
  Activity,
  BarChart3,
  Scan,
  Camera,
  Link,
  Settings,
  Database,
  Cog,
  Package2,
  Layers,
  ChevronRight,
} from "lucide-react";

interface ProductionStep {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: "idle" | "active" | "completed" | "error";
  description: string;
  buttonText: string;
  color: string;
}

export default function App() {
  // Vérifier si on est sur la page d'informations de stock
  const urlParams = new URLSearchParams(window.location.search);
  const hasStockData = urlParams.get("data");

  // Si on a des données de stock dans l'URL, afficher la page d'informations
  if (hasStockData) {
    return (
      <StockInfoPage onBack={() => window.history.back()} />
    );
  }

  const [currentPage, setCurrentPage] = useState<
    "production" | "stock" | "dashboard"
  >("production");
  const [currentStockSubpage, setCurrentStockSubpage] =
    useState<
      | "accessoires"
      | "outillages"
      | "emballages"
      | "matieres-premieres"
      | "produits-finis"
    >("matieres-premieres");

  const [productionSteps, setProductionSteps] = useState<
    ProductionStep[]
  >([
    {
      id: "decoupe",
      name: "Découpe",
      icon: <Scissors className="w-8 h-8" />,
      status: "idle",
      description:
        "Lancement du processus de découpe des matériaux",
      buttonText: "Lancer découpe",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "nettoyage",
      name: "Nettoyage",
      icon: <Sparkles className="w-8 h-8" />,
      status: "idle",
      description: "Nettoyage et préparation des pièces",
      buttonText: "Lancer nettoyage",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      id: "assemblage",
      name: "Assemblage",
      icon: <Wrench className="w-8 h-8" />,
      status: "idle",
      description: "Assemblage des composants",
      buttonText: "Lancer assemblage",
      color: "from-green-500 to-green-600",
    },
    {
      id: "confection",
      name: "Confection",
      icon: <Package className="w-8 h-8" />,
      status: "idle",
      description: "Finalisation et confection du produit",
      buttonText: "Lancer confection",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "stock",
      name: "Mise en Stock",
      icon: <Archive className="w-8 h-8" />,
      status: "idle",
      description: "Mise en stock du produit fini",
      buttonText: "Mettre en stock",
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "retirer",
      name: "Retirer du Stock",
      icon: <RotateCcw className="w-8 h-8" />,
      status: "idle",
      description: "Retirer le produit du stock",
      buttonText: "Oups retirer du stock",
      color: "from-red-500 to-red-600",
    },
  ]);

  const [productsInProgress, setProductsInProgress] =
    useState(0);
  const [productsCompleted, setProductsCompleted] = useState(0);
  const [productsInStock, setProductsInStock] = useState(0);
  const [activeDecoupes, setActiveDecoupes] = useState<any[]>(
    [],
  );
  const [materialUsage, setMaterialUsage] = useState<any>({});
  const [
    showMaterialDeductionModal,
    setShowMaterialDeductionModal,
  ] = useState(false);
  const [currentStep, setCurrentStep] = useState<
    "suppliers" | "products" | "form" | "qrcode" | null
  >(null);
  const [decoupeStep, setDecoupeStep] = useState<
    | "clients"
    | "products" 
    | "optimization"
    | "materials"
    | "production"
    | null
  >(null);
  const [scannedQRData, setScannedQRData] = useState<any>(null);
  const [qrScanInput, setQrScanInput] = useState("");
  const [scannedRolls, setScannedRolls] = useState<any[]>([]);
  const [rollAssignments, setRollAssignments] = useState<any[]>(
    [],
  );
  const [availableChutes, setAvailableChutes] = useState<any[]>(
    [],
  );
  const [showChutesModal, setShowChutesModal] = useState(false);
  const [materialAdjustments, setMaterialAdjustments] =
    useState<any[]>([]);
  const [confectionStep, setConfectionStep] = useState<
    "clients" | "selection" | null
  >(null);
  const [completedProducts, setCompletedProducts] = useState<
    any[]
  >([]);
  const [
    selectedConfectionClient,
    setSelectedConfectionClient,
  ] = useState<any>(null);
  const [
    selectedConfectionReferences,
    setSelectedConfectionReferences,
  ] = useState<any[]>([]);
  const [activeConfections, setActiveConfections] = useState<
    any[]
  >([]);
  const [
    showConfectionCompletionModal,
    setShowConfectionCompletionModal,
  ] = useState(false);
  const [confectionAdjustments, setConfectionAdjustments] =
    useState<any[]>([]);
  const [inventoryStep, setInventoryStep] = useState<
    "preparation" | "scanning" | "validation" | null
  >(null);
  const [inventoryData, setInventoryData] = useState<any[]>([]);
  const [currentInventoryItem, setCurrentInventoryItem] =
    useState<any>(null);
  const [inventoryStatus, setInventoryStatus] = useState<
    "idle" | "active" | "completed"
  >("idle");
  const [selectedClient, setSelectedClient] =
    useState<any>(null);
  const [selectedReferences, setSelectedReferences] = useState<
    any[]
  >([]);
  const [optimizationSuggestions, setOptimizationSuggestions] = useState<any[]>([]);
  const [selectedOptimizations, setSelectedOptimizations] = useState<any[]>([]);
  const [availableRolls, setAvailableRolls] = useState<any[]>([]);
  const [selectedRolls, setSelectedRolls] = useState<any[]>([]);
  const [suggestedGroupings, setSuggestedGroupings] = useState<
    any[]
  >([]);
  const [activeProductions, setActiveProductions] = useState<any[]>([]);
  const [stockData, setStockData] = useState<any>(null);
  const [showDecoupeCompletionModal, setShowDecoupeCompletionModal] = useState(false);
  const [selectedProductionForCompletion, setSelectedProductionForCompletion] = useState<any>(null);
  const [decoupeAdjustments, setDecoupeAdjustments] = useState<any[]>([]);
  const [selectedSupplier, setSelectedSupplier] =
    useState<any>(null);
  const [selectedProduct, setSelectedProduct] =
    useState<any>(null);
  const [formData, setFormData] = useState({
    nature: "", // 'matiere' ou 'produit'
    dateReception: "",
    referenceFournisseur: "",
    batch: "",
    quantite: "",
    unite: "", // 'ML' pour matière, 'unité' pour produit
    categorie: "", // pour matières uniquement
    referenceInterne: "", // pour matières uniquement, basée sur catégorie
    livraisonPartielle: false,
    notes: "",
    rouleaux: [], // pour matières en rouleaux
  });

  const categoriesMatiere = [
    { id: "adhesif", name: "Adhésif", prefix: "ADH" },
    { id: "textile", name: "Textile", prefix: "TEX" },
    { id: "plastique", name: "Plastique", prefix: "PLA" },
    { id: "metal", name: "Métal", prefix: "MET" },
    { id: "bois", name: "Bois", prefix: "BOI" },
    { id: "composite", name: "Composite", prefix: "COM" },
  ];

  const suppliers = [
    {
      id: 1,
      name: "TechnoFab Solutions",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      name: "MetalWorks France",
      color: "from-gray-500 to-gray-600",
    },
    {
      id: 3,
      name: "PlastiPro Industries",
      color: "from-green-500 to-green-600",
    },
    {
      id: 4,
      name: "LogiStock Express",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 5,
      name: "EcoMat Durable",
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Composants électroniques premium",
      category: "Électronique",
      price: "25€/unité",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      name: "Pièces métalliques usinées",
      category: "Métallurgie",
      price: "45€/unité",
      color: "from-gray-500 to-gray-600",
    },
    {
      id: 3,
      name: "Boîtiers plastique moulés",
      category: "Plastique",
      price: "12€/unité",
      color: "from-green-500 to-green-600",
    },
    {
      id: 4,
      name: "Emballages de protection",
      category: "Conditionnement",
      price: "8€/unité",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 5,
      name: "Matériaux bio-sourcés",
      category: "Écologique",
      price: "35€/unité",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      id: 6,
      name: "Circuits imprimés",
      category: "Électronique",
      price: "65€/unité",
      color: "from-cyan-500 to-cyan-600",
    },
  ];

  const clients = [
    {
      id: 1,
      name: "Automobile France",
      sector: "Automobile",
      color: "from-red-500 to-red-600",
      totalOrders: 45,
    },
    {
      id: 2,
      name: "Tech Innovations",
      sector: "Technologie",
      color: "from-blue-500 to-blue-600",
      totalOrders: 32,
    },
    {
      id: 3,
      name: "Mobilier Design",
      sector: "Ameublement",
      color: "from-amber-500 to-amber-600",
      totalOrders: 28,
    },
    {
      id: 4,
      name: "Packaging Solutions",
      sector: "Emballage",
      color: "from-green-500 to-green-600",
      totalOrders: 38,
    },
    {
      id: 5,
      name: "Aerospace Components",
      sector: "Aéronautique",
      color: "from-purple-500 to-purple-600",
      totalOrders: 15,
    },
  ];

  const getReferencesForClient = (clientId: number) => {
    const baseReferences = [
      {
        id: 1,
        ref: "ALU_PANNEAU_200X100_3MM_STANDARD",
        description: "Panneau aluminium pour structure externe",
        quantite: 25,
        matiere: "Aluminium",
        dimensions: "200x100x3mm",
        ficheTechnique: "FT_ALU_001.pdf",
        priorite: "Standard",
        color: "from-gray-500 to-gray-600",
      },
      {
        id: 2,
        ref: "PLA_BOITIER_150X80_5MM_URGENTE",
        description: "Boîtier plastique de protection IP65",
        quantite: 50,
        matiere: "Plastique ABS",
        dimensions: "150x80x5mm",
        ficheTechnique: "FT_PLA_002.pdf",
        priorite: "Urgente",
        color: "from-green-500 to-green-600",
      },
      {
        id: 3,
        ref: "TEX_TISSU_500X300_2MM_STANDARD",
        description: "Tissu technique pour revêtement",
        quantite: 15,
        matiere: "Textile technique",
        dimensions: "500x300x2mm",
        ficheTechnique: "FT_TEX_003.pdf",
        priorite: "Standard",
        color: "from-blue-500 to-blue-600",
      },
      {
        id: 4,
        ref: "ALU_PROFILE_1000X50_10MM_URGENTE",
        description: "Profilé aluminium pour châssis",
        quantite: 30,
        matiere: "Aluminium",
        dimensions: "1000x50x10mm",
        ficheTechnique: "FT_ALU_004.pdf",
        priorite: "Urgente",
        color: "from-gray-500 to-gray-600",
      },
      {
        id: 5,
        ref: "BOI_PLANCHE_800X400_15MM_STANDARD",
        description: "Planche bois pour habillage",
        quantite: 20,
        matiere: "Bois composite",
        dimensions: "800x400x15mm",
        ficheTechnique: "FT_BOI_005.pdf",
        priorite: "Standard",
        color: "from-amber-500 to-amber-600",
      },
    ];

    // Ajouter quelques références spécifiques au client
    return baseReferences.map((ref) => ({
      ...ref,
      id: ref.id + clientId * 100,
      client:
        clients.find((c) => c.id === clientId)?.name ||
        "Client",
    }));
  };

  const handleStepAction = (stepId: string) => {
    // Si c'est le bouton "stock", ouvrir le modal de sélection de fournisseur
    if (stepId === "stock") {
      console.log("Opening stock modal - suppliers");
      setCurrentStep("suppliers");
      return;
    }

    // Si c'est le bouton "decoupe", ouvrir le modal de sélection de client
    if (stepId === "decoupe") {
      console.log("Opening decoupe modal - clients");
      setDecoupeStep("clients");
      return;
    }

    // Si c'est le bouton "confection", ouvrir le modal de sélection des commandes découpées
    if (stepId === "confection") {
      console.log("Opening confection modal - clients");
      setConfectionStep("clients");
      return;
    }

    setProductionSteps((prev) =>
      prev.map((step) => {
        if (step.id === stepId) {
          const newStatus =
            step.status === "idle"
              ? "active"
              : step.status === "active"
                ? "completed"
                : "idle";

          // Créer une production active pour les étapes simples
          if (newStatus === "active" && (stepId === "nettoyage" || stepId === "assemblage")) {
            const newProduction = {
              id: `PROD_${Date.now()}`,
              type: stepId,
              clientPrincipal: { name: "Production générale", color: step.color },
              clientsOptimises: [],
              references: [`${stepId.toUpperCase()}_${String(Date.now()).slice(-4)}`],
              optimizations: [],
              rouleaux: [],
              heureDebut: new Date().toLocaleString('fr-FR'),
              statut: 'en_cours',
              ordreRef: `${stepId.toUpperCase()}_${new Date().getFullYear()}${String(Date.now()).slice(-6)}`
            };
            setActiveProductions(prev => [...prev, newProduction]);
          }

          // Mise à jour des compteurs
          if ((stepId === "nettoyage" || stepId === "assemblage") && newStatus === "active") {
            setProductsInProgress((prev) => prev + 1);
          } else if (
            stepId === "confection" &&
            newStatus === "completed"
          ) {
            setProductsCompleted((prev) => prev + 1);
            setProductsInProgress((prev) =>
              Math.max(0, prev - 1),
            );
          } else if (
            stepId === "retirer" &&
            newStatus === "completed"
          ) {
            setProductsInStock((prev) => Math.max(0, prev - 1));
          }

          return { ...step, status: newStatus };
        }
        return step;
      }),
    );
  };

  // Fonctions pour l'inventaire
  const isInventoryPeriod = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const september30 = new Date(currentYear, 8, 30); // Mois 8 = septembre (0-indexé)
    const october1 = new Date(currentYear, 9, 2); // Jusqu'au 2 octobre 00:00

    return now >= september30 && now < october1;
  };

  const handleInventoryStart = () => {
    if (!isInventoryPeriod()) {
      return; // Ne rien faire si on n'est pas dans la période
    }
    setInventoryStep("preparation");
  };

  const handleInventoryAction = () => {
    if (!isInventoryPeriod()) {
      return; // Ne rien faire si on n'est pas dans la période
    }

    if (inventoryStatus === "completed") {
      // Relancer un nouvel inventaire
      setInventoryStatus("idle");
    }

    setInventoryStatus("active");
    handleInventoryStart();
  };

  const getInventoryButtonText = () => {
    if (!isInventoryPeriod()) {
      return "Inventaire indisponible - Période autorisée : 30 septembre au 1er octobre";
    }

    if (inventoryStatus === "active") {
      return "Inventaire en cours...";
    }

    if (inventoryStatus === "completed") {
      return "Relancer un nouvel inventaire";
    }

    return "Lancer l'inventaire annuel";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 text-xs px-2.5 py-0.5"
          >
            <Clock className="w-3 h-3 mr-1" />
            En cours
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="secondary"
            className="bg-green-500/10 text-green-600 border-green-500/20 text-xs px-2.5 py-0.5"
          >
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Terminé
          </Badge>
        );
      case "error":
        return (
          <Badge
            variant="secondary"
            className="bg-red-500/10 text-red-600 border-red-500/20 text-xs px-2.5 py-0.5"
          >
            <AlertTriangle className="w-3 h-3 mr-1" />
            Erreur
          </Badge>
        );
      default:
        return (
          <Badge
            variant="outline"
            className="text-muted-foreground border-border/50 text-xs px-2.5 py-0.5"
          >
            En attente
          </Badge>
        );
    }
  };

  const getButtonVariant = (status: string) => {
    if (status === "active") return "secondary";
    if (status === "completed") return "outline";
    return "default";
  };

  const getButtonText = (step: ProductionStep) => {
    if (step.status === "active") return "En cours...";
    if (step.status === "completed") return "Relancer";
    return step.buttonText;
  };

  const getStockTitle = () => {
    switch (currentStockSubpage) {
      case "matieres-premieres":
        return "Matières Premières";
      case "produits-finis":
        return "Produits Finis";
      case "accessoires":
        return "Accessoires";
      case "outillages":
        return "Outillages";
      case "emballages":
        return "Emballages";
      default:
        return "Gestion du Stock";
    }
  };

  const getStockDescription = () => {
    switch (currentStockSubpage) {
      case "matieres-premieres":
        return "Gestion des matières de base pour la production";
      case "produits-finis":
        return "Gestion des produits terminés prêts à livrer";
      case "accessoires":
        return "Gestion des pièces et accessoires";
      case "outillages":
        return "Gestion des outils et équipements";
      case "emballages":
        return "Gestion des matériaux d'emballage";
      default:
        return "Base de données des matières";
    }
  };

  const navigationItems = [
    {
      id: "dashboard",
      title: "Tableau de bord",
      icon: BarChart3,
      description: "Statistiques et métriques de production",
    },
    {
      id: "production",
      title: "Production",
      icon: Factory,
      description: "Gestion du processus de fabrication",
    },
    {
      id: "stock",
      title: "Stock",
      icon: Database,
      description: "Base de données des matières",
      subItems: [
        {
          id: "matieres-premieres",
          title: "Matières premières",
          icon: Layers,
          description: "Gestion des matières de base",
        },
        {
          id: "produits-finis",
          title: "Produits finis",
          icon: Box,
          description: "Gestion des produits terminés",
        },
        {
          id: "accessoires",
          title: "Accessoires",
          icon: Cog,
          description: "Pièces et accessoires",
        },
        {
          id: "outillages",
          title: "Outillages",
          icon: Wrench,
          description: "Outils et équipements",
        },
        {
          id: "emballages",
          title: "Emballages",
          icon: Package2,
          description: "Matériaux d'emballage",
        },
      ],
    },
  ];

  const renderMainContent = () => {
    if (currentPage === "stock") {
      return (
        <StockManagement currentSubpage={currentStockSubpage} />
      );
    }

    if (currentPage === "dashboard") {
      return <DashboardStats />;
    }

    // Contenu Production (existant)
    return (
      <div className="space-y-8" style={{ fontFamily: 'var(--font-family-sidebar)' }}>
        <div className="mb-6">
          <h2 className="text-foreground mb-2">
            Étapes de Production
          </h2>
          <p className="text-muted-foreground">
            Gérez chaque étape du processus de fabrication
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {productionSteps.map((step) => (
            <Card
              key={step.id}
              className="bg-card border-border/50 hover:border-border hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="p-6">
                {/* Header avec icône et statut */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-105`}
                  >
                    {step.icon}
                  </div>
                  {getStatusBadge(step.status)}
                </div>

                {/* Titre et description */}
                <div className="mb-6">
                  <h3 className="text-foreground mb-2">
                    {step.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Bouton d'action */}
                <Button
                  onClick={() => handleStepAction(step.id)}
                  variant={getButtonVariant(step.status)}
                  className={`w-full ${
                    step.status === "idle"
                      ? `bg-gradient-to-r ${step.color} hover:shadow-lg hover:shadow-current/25 text-white border-0`
                      : ""
                  }`}
                  disabled={step.status === "active"}
                >
                  {getButtonText(step)}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Section Productions en Cours */}
        {activeProductions.length > 0 && (
          <div className="mt-10">
            <Card className="bg-card border-border/50 shadow-xl">
              <div className="p-7">
                <h3 className="text-foreground mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Productions en Cours ({activeProductions.length})
                </h3>
                
                <div className="space-y-5">
                  {activeProductions.map((production) => (
                    <Card key={production.id} className="bg-secondary/30 border-border/30 hover:border-border/50 transition-all">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-4">
                            <div className={`w-13 h-13 rounded-xl bg-gradient-to-br ${
                              production.type === 'découpe' ? 'from-blue-500 to-blue-600' :
                              production.type === 'nettoyage' ? 'from-cyan-500 to-cyan-600' :
                              production.type === 'assemblage' ? 'from-green-500 to-green-600' :
                              production.type === 'confection' ? 'from-purple-500 to-purple-600' :
                              'from-gray-500 to-gray-600'
                            } flex items-center justify-center shadow-lg`}>
                              {production.type === 'découpe' && <Scissors className="w-6 h-6 text-white" />}
                              {production.type === 'nettoyage' && <Sparkles className="w-6 h-6 text-white" />}
                              {production.type === 'assemblage' && <Wrench className="w-6 h-6 text-white" />}
                              {production.type === 'confection' && <Package className="w-6 h-6 text-white" />}
                            </div>
                            <div>
                              <h4 className="text-foreground">
                                {production.type.charAt(0).toUpperCase() + production.type.slice(1)} - {production.ordreRef}
                              </h4>
                              <p className="text-muted-foreground text-sm mt-0.5">
                                Démarrée le {production.heureDebut}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-blue-600 border-blue-500/20 bg-blue-500/10 text-xs px-2.5 py-1">
                              <Clock className="w-3 h-3 mr-1" />
                              En cours
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {/* Client principal */}
                          <div className="bg-secondary/50 rounded-lg p-4 border border-border/30">
                            <h5 className="text-foreground text-sm mb-3">
                              {production.type === 'découpe' ? 'Client principal' : 'Production'}
                            </h5>
                            <div className="flex items-center gap-2">
                              <div className={`w-6 h-6 rounded bg-gradient-to-br ${production.clientPrincipal.color} flex items-center justify-center shadow-md`}>
                                <Building2 className="w-3 h-3 text-white" />
                              </div>
                              <span className="text-foreground text-sm">{production.clientPrincipal.name}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-2">
                              {Array.isArray(production.references) ? production.references.length : 1} référence(s)
                            </div>
                          </div>

                          {/* Optimisations ou Type de production */}
                          <div className="bg-secondary/50 rounded-lg p-4 border border-border/30">
                            <h5 className="text-foreground text-sm mb-3">
                              {production.type === 'découpe' ? 'Optimisations' : 'Type de process'}
                            </h5>
                            {production.type === 'découpe' && production.clientsOptimises.length > 0 ? (
                              <div className="space-y-1.5">
                                {production.clientsOptimises.slice(0, 2).map((client: any) => (
                                  <div key={client.id} className="flex items-center gap-2">
                                    <div className={`w-4 h-4 rounded bg-gradient-to-br ${client.color}`}></div>
                                    <span className="text-foreground text-xs">{client.name}</span>
                                  </div>
                                ))}
                                {production.clientsOptimises.length > 2 && (
                                  <div className="text-xs text-muted-foreground">+{production.clientsOptimises.length - 2} autre(s)</div>
                                )}
                              </div>
                            ) : production.type === 'découpe' ? (
                              <div className="text-muted-foreground text-sm">Aucune optimisation</div>
                            ) : (
                              <div className="text-foreground text-sm">
                                {production.type === 'nettoyage' ? 'Nettoyage standard' :
                                 production.type === 'assemblage' ? 'Assemblage manuel' :
                                 production.type === 'confection' ? 'Finition produit' : 'Process standard'}
                              </div>
                            )}
                          </div>

                          {/* Matières ou Ressources */}
                          <div className="bg-secondary/50 rounded-lg p-4 border border-border/30">
                            <h5 className="text-foreground text-sm mb-3">
                              {production.type === 'découpe' ? 'Rouleaux utilisés' : 'Ressources'}
                            </h5>
                            {production.type === 'découpe' ? (
                              <>
                                <div className="text-foreground text-sm">{production.rouleaux.length} rouleaux</div>
                                <div className="text-xs text-muted-foreground mt-2">
                                  {[...new Set(production.rouleaux.map((r: any) => r.matiere))].join(", ")}
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="text-foreground text-sm">
                                  {production.type === 'nettoyage' ? 'Station de nettoyage' :
                                   production.type === 'assemblage' ? 'Poste d\'assemblage' :
                                   production.type === 'confection' ? 'Atelier de finition' : 'Poste de travail'}
                                </div>
                                <div className="text-xs text-muted-foreground mt-2">Disponible</div>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-between items-center pt-5 border-t border-border/30">
                          <div className="text-sm text-muted-foreground">
                            Ordre: {production.ordreRef} • Démarrée à {production.heureDebut.split(', ')[1]}
                          </div>
                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setActiveProductions(prev => prev.filter(p => p.id !== production.id));
                                setProductsInProgress(prev => Math.max(0, prev - (1 + production.clientsOptimises.length)));
                              }}
                              className="text-red-600 border-red-500/20 hover:bg-red-500/10"
                            >
                              <StopCircle className="w-4 h-4 mr-2" />
                              Arrêter
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => {
                                if (production.type === 'découpe') {
                                  // Pour la découpe, ouvrir le modal de confirmation
                                  setSelectedProductionForCompletion(production);
                                  // Initialiser les ajustements avec les rouleaux utilisés
                                  const initialAdjustments = production.rouleaux.map((rouleau: any) => ({
                                    id: rouleau.id,
                                    reference: rouleau.reference,
                                    matiere: rouleau.matiere,
                                    quantiteInitiale: rouleau.longueur,
                                    quantiteUtilisee: Math.floor(rouleau.longueur * 0.8), // 80% par défaut
                                    quantiteRestante: Math.floor(rouleau.longueur * 0.2),
                                    unit: 'ML',
                                    batch: rouleau.batch
                                  }));
                                  setDecoupeAdjustments(initialAdjustments);
                                  setShowDecoupeCompletionModal(true);
                                } else {
                                  // Pour les autres types, terminer directement
                                  setActiveProductions(prev => prev.filter(p => p.id !== production.id));
                                  setProductsInProgress(prev => Math.max(0, prev - (1 + production.clientsOptimises.length)));
                                  setProductsCompleted(prev => prev + (1 + production.clientsOptimises.length));
                                }
                              }}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              {production.type.charAt(0).toUpperCase() + production.type.slice(1)} terminée
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Section d'état général */}
        <div className="mt-10">
          <Card className="bg-card border-border/50 shadow-xl">
            <div className="p-7">
              <h3 className="text-foreground mb-6">
                État du Système
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 text-center">
                  <div className="text-4xl text-blue-600 mb-2">
                    {productsInProgress}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Produits en fabrication
                  </div>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center">
                  <div className="text-4xl text-green-600 mb-2">
                    {productsCompleted}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Produits terminés
                  </div>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6 text-center">
                  <div className="text-4xl text-orange-600 mb-2">
                    {productsInStock}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Produits en stock
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Section Inventaire - En bas de page, pleine largeur */}
        <div className="mt-10">
          <Card
            className={`border transition-all duration-300 shadow-xl ${
              isInventoryPeriod()
                ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-500/30"
                : "bg-card border-border/50"
            }`}
          >
            <div className="p-8">
              {/* Header de la section inventaire */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-lg ${
                      !isInventoryPeriod()
                        ? "opacity-50 grayscale"
                        : ""
                    }`}
                  >
                    <BarChart3 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-foreground mb-1">
                      Inventaire Annuel
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Gestion complète de l'inventaire du stock
                    </p>
                  </div>
                </div>

                {/* Statut de l'inventaire */}
                <div className="text-right">
                  {isInventoryPeriod() ? (
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-500/20 bg-green-500/10 mb-2 text-xs px-2.5 py-1"
                    >
                      ✅ Période active
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-amber-600 border-amber-500/20 bg-amber-500/10 mb-2 text-xs px-2.5 py-1"
                    >
                      ⏳ Hors période
                    </Badge>
                  )}
                  <div className="text-xs text-muted-foreground">
                    Disponible : 30 sept. - 1er oct.
                  </div>
                </div>
              </div>

              {/* Informations détaillées */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Période d'activité */}
                <div className="bg-card border border-border/30 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar className="w-5 h-5 text-indigo-600" />
                    <span className="text-foreground text-sm">
                      Période autorisée
                    </span>
                  </div>
                  <div className="text-indigo-600 mb-1">
                    30 sept. - 1er oct.
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Inventaire annuel obligatoire
                  </div>
                </div>

                {/* Statut actuel */}
                <div className="bg-card border border-border/30 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Activity className="w-5 h-5 text-purple-600" />
                    <span className="text-foreground text-sm">
                      Statut
                    </span>
                  </div>
                  <div
                    className={`mb-1 ${
                      inventoryStatus === "completed"
                        ? "text-green-600"
                        : inventoryStatus === "active"
                          ? "text-amber-600"
                          : "text-muted-foreground"
                    }`}
                  >
                    {inventoryStatus === "completed"
                      ? "Terminé"
                      : inventoryStatus === "active"
                        ? "En cours"
                        : "En attente"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {inventoryStatus === "completed"
                      ? "Inventaire complété"
                      : inventoryStatus === "active"
                        ? "Scan en cours"
                        : "Prêt à démarrer"}
                  </div>
                </div>

                {/* Catégories à inventorier */}
                <div className="bg-card border border-border/30 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Package className="w-5 h-5 text-blue-600" />
                    <span className="text-foreground text-sm">
                      Catégories
                    </span>
                  </div>
                  <div className="text-blue-600 mb-1">
                    3 types
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Matières, produits, composants
                  </div>
                </div>

                {/* Méthode */}
                <div className="bg-card border border-border/30 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Scan className="w-5 h-5 text-green-600" />
                    <span className="text-foreground text-sm">
                      Méthode
                    </span>
                  </div>
                  <div className="text-green-600 mb-1">
                    QR Code
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Scan + saisie manuelle
                  </div>
                </div>
              </div>

              {/* Instructions et processus */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Processus d'inventaire */}
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-600 mb-4 flex items-center gap-2">
                    📋 Processus d'inventaire
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                        1
                      </div>
                      <div>
                        <div className="text-foreground font-medium">
                          Préparation
                        </div>
                        <div className="text-blue-700 text-xs">
                          Arrêt production, organisation des
                          zones
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                        2
                      </div>
                      <div>
                        <div className="text-foreground font-medium">
                          Scan QR Codes
                        </div>
                        <div className="text-blue-700 text-xs">
                          Scanner chaque article en stock
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                        3
                      </div>
                      <div>
                        <div className="text-foreground font-medium">
                          Comptage physique
                        </div>
                        <div className="text-blue-700 text-xs">
                          Vérifier et saisir les quantités
                          réelles
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                        4
                      </div>
                      <div>
                        <div className="text-foreground font-medium">
                          Validation
                        </div>
                        <div className="text-blue-700 text-xs">
                          Contrôle des écarts et rapport final
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bénéfices et objectifs */}
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                  <h4 className="font-semibold text-green-600 mb-4 flex items-center gap-2">
                    🎯 Objectifs de l'inventaire
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <div className="text-green-700">
                        Mise à jour précise des stocks
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <div className="text-green-700">
                        Détection des écarts et pertes
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <div className="text-green-700">
                        Traçabilité complète par QR code
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <div className="text-green-700">
                        Rapport automatique d'inventaire
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <div className="text-green-700">
                        Optimisation des achats futurs
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zone d'alerte pour les périodes */}
              {!isInventoryPeriod() && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-amber-600 mb-2">
                        Inventaire temporairement indisponible
                      </h4>
                      <div className="space-y-2 text-sm text-amber-700">
                        <p>
                          • <strong>Période autorisée :</strong>{" "}
                          L'inventaire annuel ne peut être lancé
                          qu'entre le 30 septembre et le 1er
                          octobre
                        </p>
                        <p>
                          • <strong>Raison :</strong> Cette
                          restriction assure la cohérence des
                          données comptables annuelles
                        </p>
                        <p>
                          •{" "}
                          <strong>
                            Prochaine disponibilité :
                          </strong>{" "}
                          Du 30 septembre au 1er octobre{" "}
                          {new Date().getFullYear()}
                        </p>
                        <p>
                          • <strong>Préparation :</strong>{" "}
                          Profitez de cette période pour
                          organiser et ranger vos zones de
                          stockage
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bouton principal d'action - Pleine largeur */}
              <Button
                onClick={handleInventoryAction}
                disabled={!isInventoryPeriod()}
                size="lg"
                className={`w-full py-6 text-lg ${
                  isInventoryPeriod()
                    ? "bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 hover:shadow-xl hover:shadow-indigo-500/25 text-white border-0"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed border-0"
                } transition-all duration-300`}
              >
                <div className="flex items-center justify-center gap-3">
                  <BarChart3 className="w-6 h-6" />
                  <span>{getInventoryButtonText()}</span>
                  {isInventoryPeriod() &&
                    inventoryStatus === "idle" && (
                      <Badge
                        variant="outline"
                        className="text-green-600 border-green-500/30 bg-green-500/10 ml-2"
                      >
                        Disponible maintenant
                      </Badge>
                    )}
                </div>
              </Button>

              {/* Informations complémentaires */}
              <div className="mt-4 text-center">
                <div className="text-xs text-muted-foreground">
                  {isInventoryPeriod() ? (
                    <>
                      <Clock className="w-3 h-3 inline mr-1" />
                      Temps restant :{" "}
                      {Math.ceil(
                        (new Date(
                          new Date().getFullYear(),
                          9,
                          2,
                        ).getTime() -
                          Date.now()) /
                          (1000 * 60 * 60 * 24),
                      )}{" "}
                      jour(s) • Deadline : 1er octobre 23:59
                    </>
                  ) : (
                    <>
                      <Calendar className="w-3 h-3 inline mr-1" />
                      Prochaine période d'inventaire : 30
                      septembre - 1er octobre{" "}
                      {new Date().getFullYear()}
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex w-full">
        {/* Sidebar */}
        <Sidebar collapsible="icon" className="border-border/50">
          <SidebarHeader className="border-b border-border/50 p-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                <Factory className="w-5 h-5 text-white" />
              </div>
              <div className="group-data-[collapsible=icon]:hidden">
                <h1 className="text-sidebar-foreground">
                  Plateforme
                </h1>
                <p className="text-xs text-muted-foreground">
                  Production & Stock
                </p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-2">
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={
                      currentPage === item.id && !item.subItems
                    }
                    onClick={() => {
                      setCurrentPage(
                        item.id as
                          | "production"
                          | "stock"
                          | "dashboard",
                      );
                    }}
                    tooltip={item.title}
                    className="w-full justify-start"
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                    {item.subItems && (
                      <ChevronRight className="w-4 h-4 ml-auto transition-transform group-data-[state=open]:rotate-90" />
                    )}
                  </SidebarMenuButton>

                  {/* Sous-menu pour Stock */}
                  {item.subItems && currentPage === "stock" && (
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.id}>
                          <SidebarMenuSubButton
                            isActive={
                              currentStockSubpage === subItem.id
                            }
                            onClick={() =>
                              setCurrentStockSubpage(
                                subItem.id as any,
                              )
                            }
                          >
                            <subItem.icon className="w-4 h-4" />
                            <span>{subItem.title}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="bg-card border-b border-border/50 px-8 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger className="text-foreground hover:bg-secondary/80 rounded-lg" />
                <div className="flex items-center space-x-4">
                  <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                    {currentPage === "production" ? (
                      <Factory className="w-6 h-6 text-white" />
                    ) : currentPage === "dashboard" ? (
                      <BarChart3 className="w-6 h-6 text-white" />
                    ) : (
                      <Database className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div>
                    <h1 className="text-foreground">
                      {currentPage === "production"
                        ? "Production"
                        : currentPage === "dashboard"
                          ? "Tableau de Bord"
                          : getStockTitle()}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                      {currentPage === "production"
                        ? "Gestion du processus de fabrication"
                        : currentPage === "dashboard"
                          ? "Statistiques et métriques de production"
                          : getStockDescription()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Statistiques - Seulement pour la page Production */}
              {currentPage === "production" && (
                <div className="flex items-center gap-6">
                  <div className="text-center px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="text-2xl text-blue-600">
                      {productsInProgress}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      En cours
                    </div>
                  </div>
                  <div className="text-center px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="text-2xl text-green-600">
                      {productsCompleted}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Terminés
                    </div>
                  </div>
                  <div className="text-center px-4 py-2 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <div className="text-2xl text-orange-600">
                      {productsInStock}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      En stock
                    </div>
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Main Content */}
          <main className="p-8">
            <div className="max-w-7xl mx-auto">
              {renderMainContent()}
            </div>
          </main>
        </SidebarInset>

        {/* Modals des workflows */}

        {/* Modal Workflow Mise en Stock */}
        <CustomModal
          isOpen={currentStep !== null}
          onClose={() => setCurrentStep(null)}
          title={
            currentStep === "suppliers" ? "Étape 1 : Sélection du fournisseur" :
            currentStep === "products" ? "Étape 2 : Sélection du produit" :
            currentStep === "form" ? "Étape 3 : Informations de réception" :
            currentStep === "qrcode" ? "Étape 4 : Génération QR Code" : ""
          }
          description={
            currentStep === "suppliers" ? "Sélectionnez le fournisseur de cette livraison" :
            currentStep === "products" ? "Choisissez le type de produit reçu" :
            currentStep === "form" ? "Complétez les informations de réception" :
            currentStep === "qrcode" ? "QR Code généré pour traçabilité" : ""
          }
        >

            {currentStep === "suppliers" && (
              <div className="space-y-6 p-6" style={{ fontFamily: 'var(--font-family-sidebar)' }}>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-blue-600 mb-2">
                    Sélection du fournisseur
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Choisissez le fournisseur de cette livraison
                    pour continuer
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {suppliers.map((supplier) => (
                    <Card
                      key={supplier.id}
                      className="bg-card border-border hover:border-blue-500/50 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10"
                      onClick={() => {
                        setSelectedSupplier(supplier);
                        setCurrentStep("products");
                      }}
                    >
                      <div className="p-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${supplier.color} flex items-center justify-center flex-shrink-0`}
                          >
                            <Building2 className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground text-lg mb-2">
                              {supplier.name}
                            </h3>
                            <div className="flex items-center justify-between">
                              <Badge
                                variant="outline"
                                className="text-blue-600 border-blue-500/30"
                              >
                                Fournisseur partenaire
                              </Badge>
                              <div className="text-muted-foreground text-sm">
                                →
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {currentStep === "products" && (
              <div className="space-y-4 p-6" style={{ fontFamily: 'var(--font-family-sidebar)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentStep("suppliers")}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    Fournisseur :{" "}
                    <span className="text-foreground">
                      {selectedSupplier?.name}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {products.map((product) => (
                    <Card
                      key={product.id}
                      className="bg-card border-border hover:border-border/70 cursor-pointer transition-all duration-200 hover:shadow-lg"
                      onClick={() => {
                        setSelectedProduct(product);
                        setCurrentStep("form");
                      }}
                    >
                      <div className="p-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${product.color} flex items-center justify-center flex-shrink-0`}
                          >
                            <Package className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">
                              {product.name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {product.category}
                            </p>
                            <p className="text-blue-600 font-medium">
                              {product.price}
                            </p>
                          </div>
                          <div className="text-muted-foreground text-sm">
                            →
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {currentStep === "form" && (
              <div className="space-y-6 p-6" style={{ fontFamily: 'var(--font-family-sidebar)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentStep("products")}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                  <div className="text-sm text-muted-foreground">
                    {selectedSupplier?.name} →{" "}
                    {selectedProduct?.name}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-foreground">
                        Nature de la réception
                      </Label>
                      <Select
                        value={formData.nature}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            nature: value,
                          }))
                        }
                      >
                        <SelectTrigger className="bg-input border-border text-foreground">
                          <SelectValue placeholder="Sélectionner..." />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border text-foreground">
                          <SelectItem
                            value="matiere"
                            className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground"
                          >
                            Matière première
                          </SelectItem>
                          <SelectItem
                            value="produit"
                            className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground"
                          >
                            Produit fini
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-foreground">
                        Date de réception
                      </Label>
                      <Input
                        type="date"
                        value={formData.dateReception}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            dateReception: e.target.value,
                          }))
                        }
                        className="bg-input border-border text-foreground"
                      />
                    </div>

                    <div>
                      <Label className="text-foreground">
                        Référence fournisseur
                      </Label>
                      <Input
                        value={formData.referenceFournisseur}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            referenceFournisseur:
                              e.target.value,
                          }))
                        }
                        className="bg-input border-border text-foreground"
                        placeholder="REF_FOURNISSEUR_001"
                      />
                    </div>

                    <div>
                      <Label className="text-foreground">
                        Numéro de lot
                      </Label>
                      <Input
                        value={formData.batch}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            batch: e.target.value,
                          }))
                        }
                        className="bg-input border-border text-foreground"
                        placeholder="LOT_2024_001"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-foreground">
                        Quantité reçue
                      </Label>
                      <Input
                        type="number"
                        value={formData.quantite}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            quantite: e.target.value,
                          }))
                        }
                        className="bg-input border-border text-foreground"
                        placeholder="100"
                      />
                    </div>

                    <div>
                      <Label className="text-foreground">
                        Unité
                      </Label>
                      <Select
                        value={formData.unite}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            unite: value,
                          }))
                        }
                      >
                        <SelectTrigger className="bg-input border-border text-foreground">
                          <SelectValue placeholder="Choisir l'unité..." />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border text-foreground">
                          <SelectItem
                            value="ML"
                            className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground"
                          >
                            ML (mètres linéaires)
                          </SelectItem>
                          <SelectItem
                            value="unité"
                            className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground"
                          >
                            Unité
                          </SelectItem>
                          <SelectItem
                            value="kg"
                            className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground"
                          >
                            Kilogrammes
                          </SelectItem>
                          <SelectItem
                            value="m2"
                            className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground"
                          >
                            Mètres carrés
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {formData.nature === "matiere" && (
                      <div>
                        <Label className="text-foreground">
                          Catégorie de matière
                        </Label>
                        <Select
                          value={formData.categorie}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              categorie: value,
                            }))
                          }
                        >
                          <SelectTrigger className="bg-input border-border text-foreground">
                            <SelectValue placeholder="Sélectionner une catégorie..." />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-border text-foreground">
                            {categoriesMatiere.map((cat) => (
                              <SelectItem
                                key={cat.id}
                                value={cat.id}
                                className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground"
                              >
                                {cat.name} ({cat.prefix})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="livraison-partielle"
                        checked={formData.livraisonPartielle}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            livraisonPartielle:
                              checked as boolean,
                          }))
                        }
                      />
                      <Label
                        htmlFor="livraison-partielle"
                        className="text-foreground"
                      >
                        Livraison partielle
                      </Label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-foreground">
                    Notes complémentaires
                  </Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    className="bg-input border-border text-foreground"
                    placeholder="Informations supplémentaires..."
                    rows={3}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep("products")}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                  <Button
                    onClick={() => setCurrentStep("qrcode")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Générer QR Code
                  </Button>
                </div>
              </div>
            )}

            {currentStep === "qrcode" && (
              <div className="p-6" style={{ fontFamily: 'var(--font-family-sidebar)' }}>
                <QRCodeGenerator
                formData={formData}
                supplier={selectedSupplier}
                product={selectedProduct}
                onComplete={() => {
                  setCurrentStep(null);
                  setProductsInStock((prev) => prev + 1);
                  // Reset du formulaire
                  setFormData({
                    nature: "",
                    dateReception: "",
                    referenceFournisseur: "",
                    batch: "",
                    quantite: "",
                    unite: "",
                    categorie: "",
                    referenceInterne: "",
                    livraisonPartielle: false,
                    notes: "",
                    rouleaux: [],
                  });
                  setSelectedSupplier(null);
                  setSelectedProduct(null);
                }}
                />
              </div>
            )}
        </CustomModal>

        {/* Modal Workflow Découpe Optimisé */}
        <CustomModal
          isOpen={decoupeStep !== null}
          onClose={() => setDecoupeStep(null)}
          title={
            decoupeStep === "clients" ? "Sélectionner un Client" :
            decoupeStep === "products" ? "Références à Découper" :
            decoupeStep === "optimization" ? "Optimisation et Regroupement" :
            decoupeStep === "materials" ? "Sélection des rouleaux" :
            decoupeStep === "production" ? "Ordre de fabrication" : ""
          }
          description={
            decoupeStep === "clients" ? "Choisissez le client pour lequel lancer la découpe" :
            decoupeStep === "products" ? "Sélectionnez les références à découper. Les références seront automatiquement groupées par matière pour optimiser la production." :
            decoupeStep === "optimization" ? "Optimisez la découpe en regroupant les matières similaires" :
            decoupeStep === "materials" ? "Scan ou sélection des rouleaux nécessaires" :
            decoupeStep === "production" ? "Génération de l'ordre de fabrication" : ""
          }
        >

            {decoupeStep === "clients" && (
              <div className="p-6 space-y-6" style={{ fontFamily: 'var(--font-family-sidebar)' }}>
                {/* Liste des clients */}
                <div className="space-y-4">
                  {clients.map((client) => {
                    const clientRefs = getReferencesForClient(client.id);
                    const pendingCount = clientRefs.filter(ref => Math.random() > 0.4).length;
                    
                    return (
                      <Card
                        key={client.id}
                        className="bg-card border-border hover:border-blue-500/50 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10"
                        onClick={() => {
                          setSelectedClient(client);
                          setDecoupeStep("products");
                        }}
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${client.color} flex items-center justify-center`}>
                                <Building2 className="w-8 h-8 text-white" />
                              </div>
                              <div>
                                <h3 className="font-bold text-foreground text-lg mb-1">{client.name}</h3>
                                <p className="text-muted-foreground text-sm mb-2">{client.sector}</p>
                                <div className="flex items-center gap-3">
                                  <Badge variant="outline" className="text-blue-600 border-blue-500/30 bg-blue-500/10">
                                    {pendingCount} commandes
                                  </Badge>
                                  <Badge variant="outline" className="text-green-600 border-green-500/30 bg-green-500/10">
                                    Actif
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="text-muted-foreground text-2xl">→</div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )}

            {decoupeStep === "products" && selectedClient && (
              <div className="p-6 space-y-6" style={{ fontFamily: 'var(--font-family-sidebar)' }}>
                <div className="flex items-center gap-4 mb-6">
                  <Button variant="outline" onClick={() => setDecoupeStep("clients")} className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Retour
                  </Button>
                  <div className="text-muted-foreground">
                    Sélectionné : <span className="text-foreground font-medium">{selectedClient.name}</span>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-6">
                  <h4 className="font-bold text-blue-600 mb-2 flex items-center gap-2">
                    📋 Références disponibles
                  </h4>
                  <p className="text-blue-700">
                    Sélectionnez les références à découper. Les références seront automatiquement groupées par matière pour optimiser la production.
                  </p>
                </div>

                <div className="space-y-4">
                  {getReferencesForClient(selectedClient.id).map((ref) => (
                    <Card 
                      key={ref.id} 
                      className="bg-card border-border hover:border-border/70 transition-colors cursor-pointer"
                      onClick={() => {
                        const isSelected = selectedReferences.some(r => r.id === ref.id);
                        if (isSelected) {
                          setSelectedReferences(prev => prev.filter(r => r.id !== ref.id));
                        } else {
                          setSelectedReferences(prev => [...prev, ref]);
                        }
                      }}
                    >
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <Checkbox
                            checked={selectedReferences.some(r => r.id === ref.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedReferences(prev => [...prev, ref]);
                              } else {
                                setSelectedReferences(prev => prev.filter(r => r.id !== ref.id));
                              }
                            }}
                            className="mt-1"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              <h4 className="font-bold text-foreground text-lg">{ref.ref}</h4>
                              <div className="flex items-center gap-2">
                                <Badge className="bg-secondary text-foreground border-0 text-xs px-2 py-1">
                                  {ref.matiere}
                                </Badge>
                                <Badge 
                                  className={
                                    ref.priorite === "Urgente"
                                      ? "bg-red-600 text-white border-0 text-xs px-2 py-1"
                                      : "bg-green-600 text-white border-0 text-xs px-2 py-1"
                                  }
                                >
                                  {ref.priorite}
                                </Badge>
                                <Badge className="bg-blue-600 text-white border-0 text-xs px-2 py-1">
                                  {ref.quantite} pièces
                                </Badge>
                              </div>
                            </div>
                            <p className="text-foreground/90 mb-4">{ref.description}</p>
                            <div className="flex items-center text-sm text-muted-foreground gap-6">
                              <span>Matière: <span className="text-foreground">{ref.matiere}</span></span>
                              <span>Dimensions: <span className="text-foreground">{ref.dimensions}</span></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-6 border-t border-border">
                  <div className="text-muted-foreground">
                    {selectedReferences.length} référence(s) sélectionnée(s)
                  </div>
                  <Button
                    onClick={() => {
                      // Analyser l'optimisation après validation des produits
                      const clientRefs = selectedReferences;
                      const suggestions = clients
                        .filter(c => c.id !== selectedClient.id)
                        .map(c => {
                          const refs = getReferencesForClient(c.id);
                          const commonMaterials = refs.filter(ref => 
                            clientRefs.some(clientRef => clientRef.matiere === ref.matiere)
                          );
                          return commonMaterials.length > 0 ? {
                            client: c,
                            references: commonMaterials,
                            materials: [...new Set(commonMaterials.map(r => r.matiere))]
                          } : null;
                        })
                        .filter(Boolean)
                        .slice(0, 3);
                      
                      setOptimizationSuggestions(suggestions);
                      setDecoupeStep("optimization");
                    }}
                    disabled={selectedReferences.length === 0}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2"
                  >
                    Optimiser la découpe ({selectedReferences.length} sélectionnée(s))
                  </Button>
                </div>
              </div>
            )}

            {decoupeStep === "optimization" && selectedClient && (
              <div className="p-6 space-y-6" style={{ fontFamily: 'var(--font-family-sidebar)' }}>
                <div className="flex items-center gap-4 mb-6">
                  <Button variant="outline" onClick={() => setDecoupeStep("products")} className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Retour
                  </Button>
                  <div className="text-muted-foreground">
                    Optimisez la découpe en regroupant les matières similaires
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                  <h4 className="font-bold text-green-600 mb-4 flex items-center gap-2">
                    ✅ Références confirmées
                  </h4>
                  <div className="text-sm text-green-700 mb-4">
                    {selectedClient.name} ({selectedClient.sector}) - {selectedReferences.length} références sélectionnées
                  </div>
                  <div className="space-y-2">
                    {selectedReferences.map((ref) => (
                      <div key={ref.id} className="bg-secondary/50 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-foreground font-medium">{ref.ref}</div>
                            <div className="text-muted-foreground text-sm">{ref.matiere} - {ref.quantite} pièces</div>
                          </div>
                          <Badge className="bg-green-600 text-white border-0">Sélectionné</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
                  <h4 className="font-bold text-orange-600 mb-4 flex items-center gap-2">
                    ⚡ Suggestions d'optimisation
                  </h4>
                  <div className="text-sm text-orange-700 mb-4">
                    Nous avons trouvé d'autres clients avec des matières similaires. Regrouper les découpes permettra d'optimiser la production.
                  </div>
                  
                  <div className="mb-6">
                    <h5 className="text-foreground font-medium mb-3">Matière: {selectedReferences.length > 0 ? selectedReferences[0].matiere : "Aluminium"} - <span className="text-orange-600">{optimizationSuggestions.length} suggestion(s)</span></h5>
                    
                    <div className="space-y-3">
                      {optimizationSuggestions.map((suggestion, index) => (
                        <div 
                          key={index} 
                          className="bg-secondary/30 rounded-lg p-4 cursor-pointer hover:bg-secondary/50 transition-colors"
                          onClick={() => {
                            const isSelected = selectedOptimizations.some(opt => opt.client.id === suggestion.client.id);
                            if (isSelected) {
                              setSelectedOptimizations(prev => prev.filter(opt => opt.client.id !== suggestion.client.id));
                            } else {
                              setSelectedOptimizations(prev => [...prev, suggestion]);
                            }
                          }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <Checkbox 
                                checked={selectedOptimizations.some(opt => opt.client.id === suggestion.client.id)}
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    setSelectedOptimizations(prev => [...prev, suggestion]);
                                  } else {
                                    setSelectedOptimizations(prev => prev.filter(opt => opt.client.id !== suggestion.client.id));
                                  }
                                }}
                                onClick={(e) => e.stopPropagation()}
                              />
                              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${suggestion.client.color} flex items-center justify-center`}>
                                <Building2 className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <div className="text-foreground font-medium">{suggestion.client.name}</div>
                                <div className="text-muted-foreground text-sm">Client: {suggestion.client.sector} • Commande standard</div>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Badge className="bg-green-600 text-white border-0 text-xs">Standard</Badge>
                              <Badge className="bg-blue-600 text-white border-0 text-xs">Découper</Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            {suggestion.references.slice(0, 2).map((ref) => (
                              <div key={ref.id} className="text-sm">
                                <div className="text-foreground font-medium">{ref.ref}</div>
                                <div className="text-muted-foreground">{ref.matiere} - {ref.quantite} pièces</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                  <h4 className="font-bold text-blue-600 mb-4 flex items-center gap-2">
                    📊 Résumé de la découpe
                  </h4>
                  <div className="grid grid-cols-4 gap-6 text-center">
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-foreground">1</div>
                      <div className="text-xs text-muted-foreground">Références principales</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-orange-600">{selectedOptimizations.length}</div>
                      <div className="text-xs text-muted-foreground">Références optimisées</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600">{selectedReferences.length + selectedOptimizations.reduce((acc, opt) => acc + opt.references.length, 0)}</div>
                      <div className="text-xs text-muted-foreground">Pièces totales</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600">{[...new Set([...selectedReferences.map(r => r.matiere), ...selectedOptimizations.flatMap(opt => opt.materials)])].length}</div>
                      <div className="text-xs text-muted-foreground">Matières différentes</div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-6">
                  <div className="text-muted-foreground">
                    Détail par matière: 
                    {selectedOptimizations.length > 0 && (
                      <span className="text-foreground ml-2">
                        +{selectedOptimizations.length} optimisation(s) ajoutée(s)
                      </span>
                    )}
                  </div>
                  <Button 
                    onClick={() => {
                      // Identifier les matières nécessaires pour les références sélectionnées
                      const requiredMaterials = [...new Set([
                        ...selectedReferences.map(r => r.matiere),
                        ...selectedOptimizations.flatMap(opt => opt.materials)
                      ])];
                      
                      // Générer des rouleaux UNIQUEMENT pour les matières nécessaires
                      const allAvailableRolls = [
                        // Rouleaux d'Aluminium
                        { id: 1, reference: "ALU_ROLL_001", matiere: "Aluminium", longueur: 50, largeur: 200, batch: "LOT_2024_A01", stock: 3 },
                        { id: 2, reference: "ALU_ROLL_002", matiere: "Aluminium", longueur: 25, largeur: 150, batch: "LOT_2024_A02", stock: 5 },
                        { id: 3, reference: "ALU_ROLL_003", matiere: "Aluminium", longueur: 100, largeur: 300, batch: "LOT_2024_A03", stock: 2 },
                        { id: 4, reference: "ALU_ROLL_004", matiere: "Aluminium", longueur: 75, largeur: 250, batch: "LOT_2024_A04", stock: 1 },
                        
                        // Rouleaux de Plastique ABS
                        { id: 5, reference: "PLA_ROLL_001", matiere: "Plastique ABS", longueur: 100, largeur: 300, batch: "LOT_2024_P01", stock: 2 },
                        { id: 6, reference: "PLA_ROLL_002", matiere: "Plastique ABS", longueur: 50, largeur: 200, batch: "LOT_2024_P02", stock: 4 },
                        { id: 7, reference: "PLA_ROLL_003", matiere: "Plastique ABS", longueur: 150, largeur: 400, batch: "LOT_2024_P03", stock: 1 },
                        
                        // Rouleaux de Textile technique
                        { id: 8, reference: "TEX_ROLL_001", matiere: "Textile technique", longueur: 200, largeur: 500, batch: "LOT_2024_T01", stock: 1 },
                        { id: 9, reference: "TEX_ROLL_002", matiere: "Textile technique", longueur: 120, largeur: 300, batch: "LOT_2024_T02", stock: 3 },
                        { id: 10, reference: "TEX_ROLL_003", matiere: "Textile technique", longueur: 80, largeur: 600, batch: "LOT_2024_T03", stock: 2 },
                        
                        // Rouleaux de Bois composite
                        { id: 11, reference: "BOI_ROLL_001", matiere: "Bois composite", longueur: 60, largeur: 400, batch: "LOT_2024_B01", stock: 2 },
                        { id: 12, reference: "BOI_ROLL_002", matiere: "Bois composite", longueur: 40, largeur: 300, batch: "LOT_2024_B02", stock: 1 },
                        
                        // Rouleaux de matières spéciales
                        { id: 13, reference: "COM_ROLL_001", matiere: "Composite carbone", longueur: 30, largeur: 150, batch: "LOT_2024_C01", stock: 1 },
                        { id: 14, reference: "MET_ROLL_001", matiere: "Métal inox", longueur: 40, largeur: 100, batch: "LOT_2024_M01", stock: 2 }
                      ];
                      
                      // Filtrer les rouleaux pour ne garder que ceux des matières nécessaires
                      const filteredRolls = allAvailableRolls.filter(roll => 
                        requiredMaterials.includes(roll.matiere)
                      );
                      
                      setAvailableRolls(filteredRolls);
                      setDecoupeStep("materials");
                    }}
                    className="bg-blue-600 hover:bg-blue-700 px-6 py-2"
                  >
                    Continuer vers les matières
                  </Button>
                </div>
              </div>
            )}

            {decoupeStep === "materials" && (
              <div className="space-y-6 p-6" style={{ fontFamily: 'var(--font-family-sidebar)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Button variant="outline" size="sm" onClick={() => setDecoupeStep("optimization")}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour
                  </Button>
                  <div className="text-muted-foreground text-sm">
                    Clients : <span className="text-foreground">{selectedClient?.name}</span>
                    {selectedOptimizations.length > 0 && <span> + {selectedOptimizations.length} autre(s)</span>}
                  </div>
                </div>

                {/* En-tête avec matières nécessaires et statistiques */}
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-purple-600 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Sélection des rouleaux - Matières requises
                  </h4>
                  
                  {/* Affichage des matières nécessaires */}
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
                    <h5 className="text-blue-600 font-medium mb-2 flex items-center gap-2">
                      🎯 Matières nécessaires pour cette production
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {[...new Set([
                        ...selectedReferences.map(r => r.matiere),
                        ...selectedOptimizations.flatMap(opt => opt.materials)
                      ])].map((matiere) => {
                        const quantiteTotal = [
                          ...selectedReferences.filter(r => r.matiere === matiere),
                          ...selectedOptimizations.flatMap(opt => 
                            opt.references.filter(r => r.matiere === matiere)
                          )
                        ].reduce((acc, ref) => acc + ref.quantite, 0);
                        
                        return (
                          <div key={matiere} className="bg-secondary/50 rounded-lg px-3 py-2">
                            <div className="text-foreground font-medium text-sm">{matiere}</div>
                            <div className="text-blue-700 text-xs">{quantiteTotal} pièces à découper</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-secondary/50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-blue-600">{availableRolls.length}</div>
                      <div className="text-xs text-muted-foreground">Rouleaux compatibles</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-green-600">{selectedRolls.length}</div>
                      <div className="text-xs text-muted-foreground">Sélectionnés</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-orange-600">{[...new Set(availableRolls.map(r => r.matiere))].length}</div>
                      <div className="text-xs text-muted-foreground">Matières trouvées</div>
                    </div>
                    <div className="bg-secondary/50 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-purple-600">{availableRolls.reduce((acc, roll) => acc + roll.stock, 0)}</div>
                      <div className="text-xs text-muted-foreground">Stock total</div>
                    </div>
                  </div>
                </div>

                {/* Système de scan QR et filtres - Une seule colonne */}
                <Card className="bg-card border-border mb-6">
                  <div className="p-6">
                    <h5 className="font-medium text-foreground mb-4 flex items-center gap-2">
                      <Camera className="w-5 h-5 text-blue-600" />
                      Scan QR Code et Sélection
                    </h5>
                    
                    {/* Section scan QR */}
                    <div className="space-y-4 mb-6">
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <div className="flex items-center gap-4">
                          <QrCode className="w-8 h-8 text-blue-600 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-blue-700 text-sm mb-2">Scanner le QR code du rouleau ou saisir la référence</p>
                            <div className="flex gap-2">
                              <Input
                                value={qrScanInput}
                                onChange={(e) => setQrScanInput(e.target.value)}
                                className="bg-input border-border text-foreground flex-1"
                                placeholder="Code QR ou référence..."
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter' && qrScanInput.trim()) {
                                    const foundRoll = availableRolls.find(roll => 
                                      roll.reference.toLowerCase().includes(qrScanInput.toLowerCase()) ||
                                      roll.batch.toLowerCase().includes(qrScanInput.toLowerCase())
                                    );
                                    if (foundRoll && !selectedRolls.some(r => r.id === foundRoll.id)) {
                                      setSelectedRolls(prev => [...prev, foundRoll]);
                                      setQrScanInput("");
                                    }
                                  }
                                }}
                              />
                              <Button
                                onClick={() => {
                                  if (qrScanInput.trim()) {
                                    const foundRoll = availableRolls.find(roll => 
                                      roll.reference.toLowerCase().includes(qrScanInput.toLowerCase()) ||
                                      roll.batch.toLowerCase().includes(qrScanInput.toLowerCase())
                                    );
                                    if (foundRoll && !selectedRolls.some(r => r.id === foundRoll.id)) {
                                      setSelectedRolls(prev => [...prev, foundRoll]);
                                      setQrScanInput("");
                                    } else if (foundRoll) {
                                      alert("Ce rouleau est déjà sélectionné");
                                    } else {
                                      alert("Rouleau non trouvé en stock");
                                    }
                                  }
                                }}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <Scan className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Section filtres et actions */}
                    <div className="border-t border-border pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-foreground text-sm">Filtrer par matière nécessaire</Label>
                          <Select onValueChange={(value) => {
                            console.log("Filtre matière:", value);
                          }}>
                            <SelectTrigger className="bg-input border-border text-foreground">
                              <SelectValue placeholder="Matières requises" />
                            </SelectTrigger>
                            <SelectContent className="bg-card border-border text-foreground">
                              {[...new Set([
                                ...selectedReferences.map(r => r.matiere),
                                ...selectedOptimizations.flatMap(opt => opt.materials)
                              ])].map((matiere) => (
                                <SelectItem key={matiere} value={matiere} className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">
                                  {matiere}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-foreground text-sm">Actions rapides</Label>
                          <div className="flex gap-2 mt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                // Sélectionner tous les rouleaux des matières nécessaires
                                const requiredMaterials = [...new Set([
                                  ...selectedReferences.map(r => r.matiere),
                                  ...selectedOptimizations.flatMap(opt => opt.materials)
                                ])];
                                const requiredRolls = availableRolls.filter(r => 
                                  requiredMaterials.includes(r.matiere) && 
                                  !selectedRolls.some(sr => sr.id === r.id)
                                );
                                setSelectedRolls(prev => [...prev, ...requiredRolls]);
                              }}
                              className="text-xs"
                            >
                              + Matières requises
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedRolls([])}
                              className="text-xs"
                            >
                              Effacer tout
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Rouleaux disponibles - Sélection visuelle */}
                <Card className="bg-card border-border">
                  <div className="p-6">
                    <h4 className="font-semibold text-foreground mb-4">
                      Rouleaux disponibles pour les matières requises
                      <span className="text-muted-foreground text-sm font-normal ml-2">
                        ({availableRolls.length} rouleaux compatibles trouvés)
                      </span>
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      {availableRolls.map((roll) => {
                        const isSelected = selectedRolls.some(r => r.id === roll.id);
                        return (
                          <div
                            key={roll.id}
                            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                              isSelected 
                                ? "border-green-500 bg-green-500/10" 
                                : "border-border hover:border-blue-500 bg-secondary/50 hover:bg-secondary/70"
                            }`}
                            onClick={() => {
                              if (isSelected) {
                                setSelectedRolls(prev => prev.filter(r => r.id !== roll.id));
                              } else {
                                setSelectedRolls(prev => [...prev, roll]);
                              }
                            }}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  roll.matiere.toLowerCase().includes('aluminium') ? 'bg-gray-500' :
                                  roll.matiere.toLowerCase().includes('plastique') ? 'bg-green-500' :
                                  roll.matiere.toLowerCase().includes('textile') ? 'bg-blue-500' :
                                  'bg-purple-500'
                                }`}>
                                  <Package className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <div className="text-foreground font-medium">{roll.reference}</div>
                                  <div className="text-muted-foreground text-sm">{roll.matiere}</div>
                                </div>
                              </div>
                              {isSelected && (
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                              )}
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Dimensions:</span>
                                <div className="text-foreground">{roll.longueur}ML × {roll.largeur}mm</div>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Stock:</span>
                                <div className="text-foreground">{roll.stock} unités</div>
                              </div>
                              <div className="col-span-2">
                                <span className="text-muted-foreground">Batch:</span>
                                <div className="text-foreground font-mono text-xs">{roll.batch}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Card>

                {/* Résumé des rouleaux sélectionnés */}
                {selectedRolls.length > 0 && (
                  <Card className="bg-green-500/10 border border-green-500/30">
                    <div className="p-6">
                      <h4 className="font-semibold text-green-600 mb-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5" />
                        Résumé de la sélection ({selectedRolls.length} rouleaux)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedRolls.map((roll) => (
                          <div key={roll.id} className="bg-secondary/50 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="text-foreground font-medium text-sm">{roll.reference}</div>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRolls(prev => prev.filter(r => r.id !== roll.id));
                                }}
                                className="h-6 w-6 p-0"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                            <div className="text-muted-foreground text-xs">
                              {roll.matiere} • {roll.longueur}ML × {roll.largeur}mm
                            </div>
                            <div className="text-green-600 text-xs mt-1">
                              Stock: {roll.stock} • {roll.batch}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                )}

                <div className="flex justify-between items-center pt-4">
                  <div className="text-muted-foreground">
                    {selectedRolls.length > 0 ? (
                      <span className="text-green-600">
                        ✓ {selectedRolls.length} rouleau(x) sélectionné(s) - Matières: {[...new Set(selectedRolls.map(r => r.matiere))].join(", ")}
                      </span>
                    ) : (
                      "Aucun rouleau sélectionné"
                    )}
                  </div>
                  <Button 
                    onClick={() => setDecoupeStep("production")}
                    disabled={selectedRolls.length === 0}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Générer l'ordre de fabrication ({selectedRolls.length})
                  </Button>
                </div>
              </div>
            )}

            {decoupeStep === "production" && (
              <div className="space-y-6 p-6" style={{ fontFamily: 'var(--font-family-sidebar)' }}>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                  <h4 className="font-semibold text-green-600 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Ordre de fabrication généré
                  </h4>
                  
                  {/* Récapitulatif */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div>
                        <span className="text-muted-foreground">Référence OF:</span>
                        <div className="text-foreground font-medium">OF_{new Date().getFullYear()}{String(Date.now()).slice(-6)}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date/Heure:</span>
                        <div className="text-foreground font-medium">{new Date().toLocaleString('fr-FR')}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Client principal:</span>
                        <div className="text-foreground font-medium">{selectedClient?.name}</div>
                      </div>
                      {selectedOptimizations.length > 0 && (
                        <div>
                          <span className="text-muted-foreground">Clients additionnels:</span>
                          <div className="text-foreground font-medium">
                            {selectedOptimizations.map(opt => opt.client.name).join(", ")}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-muted-foreground">Rouleaux à utiliser:</span>
                        <div className="text-foreground font-medium">{selectedRolls.length}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Matières:</span>
                        <div className="text-foreground font-medium">
                          {[...new Set(selectedRolls.map(r => r.matiere))].join(", ")}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Statut:</span>
                        <Badge variant="outline" className="text-green-600 border-green-500/30 bg-green-500/10 ml-2">
                          Prêt à lancer
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-center gap-4">
                    <Button variant="outline" className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Télécharger OF (PDF)
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                      <Printer className="w-4 h-4" />
                      Imprimer ordre de fabrication
                    </Button>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Button 
                    onClick={() => {
                      // Créer l'objet de production active
                      const newProduction = {
                        id: `PROD_${Date.now()}`,
                        type: 'découpe',
                        clientPrincipal: selectedClient,
                        clientsOptimises: selectedOptimizations.map(opt => opt.client),
                        references: selectedReferences,
                        optimizations: selectedOptimizations,
                        rouleaux: selectedRolls,
                        heureDebut: new Date().toLocaleString('fr-FR'),
                        statut: 'en_cours',
                        ordreRef: `OF_${new Date().getFullYear()}${String(Date.now()).slice(-6)}`
                      };
                      
                      setActiveProductions(prev => [...prev, newProduction]);
                      setDecoupeStep(null);
                      setSelectedClient(null);
                      setSelectedReferences([]);
                      setOptimizationSuggestions([]);
                      setSelectedOptimizations([]);
                      setAvailableRolls([]);
                      setSelectedRolls([]);
                      setQrScanInput("");
                      setProductsInProgress(prev => prev + (1 + selectedOptimizations.length));
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Lancer la production
                  </Button>
                </div>
              </div>
            )}
        </CustomModal>

        {/* Modal Confirmation Découpe Terminée */}
        <CustomModal
          isOpen={showDecoupeCompletionModal}
          onClose={() => {
            setShowDecoupeCompletionModal(false);
            setSelectedProductionForCompletion(null);
            setDecoupeAdjustments([]);
          }}
          title="Confirmation de Découpe Terminée"
          description="Validez les matières utilisées et les quantités découpées"
        >
          {showDecoupeCompletionModal && selectedProductionForCompletion && (
            <div className="space-y-6 p-6" style={{ fontFamily: 'var(--font-family-sidebar)' }}>
              {/* Récapitulatif de la production */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
                <h4 className="font-semibold text-blue-600 mb-4 flex items-center gap-2">
                  <Scissors className="w-5 h-5" />
                  Production à finaliser
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Ordre de fabrication:</span>
                    <div className="text-foreground font-medium">{selectedProductionForCompletion.ordreRef}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Client principal:</span>
                    <div className="text-foreground font-medium">{selectedProductionForCompletion.clientPrincipal.name}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Heure de début:</span>
                    <div className="text-foreground font-medium">{selectedProductionForCompletion.heureDebut}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Rouleaux utilisés:</span>
                    <div className="text-foreground font-medium">{selectedProductionForCompletion.rouleaux.length} rouleaux</div>
                  </div>
                </div>
              </div>

              {/* Ajustements des matières */}
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
                <h4 className="font-semibold text-orange-600 mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Confirmation des matières utilisées
                </h4>
                <p className="text-orange-700 text-sm mb-4">
                  Validez les quantités réellement utilisées pour chaque rouleau. Le stock sera automatiquement ajusté.
                </p>
                
                <div className="space-y-4">
                  {decoupeAdjustments.map((adjustment, index) => (
                    <Card key={adjustment.id} className="bg-secondary/50 border-border">
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h5 className="font-medium text-foreground">{adjustment.reference}</h5>
                            <p className="text-muted-foreground text-sm">{adjustment.matiere} - Batch: {adjustment.batch}</p>
                          </div>
                          <Badge variant="outline" className="text-blue-600 border-blue-500/30 bg-blue-500/10">
                            {adjustment.matiere}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label className="text-foreground text-sm">Quantité initiale</Label>
                            <div className="text-foreground/90 font-medium">{adjustment.quantiteInitiale} {adjustment.unit}</div>
                          </div>
                          <div>
                            <Label className="text-foreground text-sm">Quantité utilisée</Label>
                            <Input
                              type="number"
                              value={adjustment.quantiteUtilisee}
                              onChange={(e) => {
                                const newUtilisee = parseInt(e.target.value) || 0;
                                const newRestante = adjustment.quantiteInitiale - newUtilisee;
                                setDecoupeAdjustments(prev => 
                                  prev.map((adj, i) => 
                                    i === index 
                                      ? { ...adj, quantiteUtilisee: newUtilisee, quantiteRestante: newRestante }
                                      : adj
                                  )
                                );
                              }}
                              className="bg-input border-border text-foreground"
                              min="0"
                              max={adjustment.quantiteInitiale}
                            />
                          </div>
                          <div>
                            <Label className="text-foreground text-sm">Quantité restante</Label>
                            <div className={`font-medium ${adjustment.quantiteRestante >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {adjustment.quantiteRestante} {adjustment.unit}
                            </div>
                          </div>
                        </div>
                        
                        {adjustment.quantiteRestante < 0 && (
                          <div className="mt-3 bg-red-500/10 border border-red-500/30 rounded p-3">
                            <p className="text-red-600 text-sm">
                              ⚠️ Attention : La quantité utilisée dépasse la quantité disponible
                            </p>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Résumé des ajustements */}
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
                <h4 className="font-semibold text-green-600 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Résumé des ajustements
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-foreground font-medium mb-3">Matières consommées</h5>
                    <div className="space-y-2">
                      {[...new Set(decoupeAdjustments.map(adj => adj.matiere))].map(matiere => {
                        const totalUtilise = decoupeAdjustments
                          .filter(adj => adj.matiere === matiere)
                          .reduce((sum, adj) => sum + adj.quantiteUtilisee, 0);
                        return (
                          <div key={matiere} className="flex justify-between text-sm">
                            <span className="text-foreground/90">{matiere}:</span>
                            <span className="text-foreground font-medium">{totalUtilise} ML</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-foreground font-medium mb-3">Matières restantes</h5>
                    <div className="space-y-2">
                      {[...new Set(decoupeAdjustments.map(adj => adj.matiere))].map(matiere => {
                        const totalRestant = decoupeAdjustments
                          .filter(adj => adj.matiere === matiere)
                          .reduce((sum, adj) => sum + adj.quantiteRestante, 0);
                        return (
                          <div key={matiere} className="flex justify-between text-sm">
                            <span className="text-foreground/90">{matiere}:</span>
                            <span className={`font-medium ${totalRestant >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {totalRestant} ML
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end items-center gap-3 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDecoupeCompletionModal(false);
                    setSelectedProductionForCompletion(null);
                    setDecoupeAdjustments([]);
                  }}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Annuler
                </Button>
                <Button
                  onClick={() => {
                    // Valider les ajustements et terminer la production
                    const hasErrors = decoupeAdjustments.some(adj => adj.quantiteRestante < 0);
                    if (hasErrors) {
                      alert("Certaines quantités utilisées dépassent les quantités disponibles. Veuillez corriger avant de valider.");
                      return;
                    }
                    
                    // Terminer la production
                    setActiveProductions(prev => prev.filter(p => p.id !== selectedProductionForCompletion.id));
                    setProductsInProgress(prev => Math.max(0, prev - (1 + selectedProductionForCompletion.clientsOptimises.length)));
                    setProductsCompleted(prev => prev + (1 + selectedProductionForCompletion.clientsOptimises.length));
                    
                    // Fermer le modal
                    setShowDecoupeCompletionModal(false);
                    setSelectedProductionForCompletion(null);
                    setDecoupeAdjustments([]);
                    
                    // TODO: Ici on pourrait ajouter la logique pour mettre à jour le stock
                    console.log("Ajustements validés:", decoupeAdjustments);
                  }}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={decoupeAdjustments.some(adj => adj.quantiteRestante < 0)}
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Valider la découpe terminée
                </Button>
              </div>
            </div>
          )}
        </CustomModal>

        {/* Modal Workflow Confection */}
        <CustomModal
          isOpen={confectionStep !== null}
          onClose={() => setConfectionStep(null)}
          title={
            confectionStep === "clients" ? "Sélection des commandes découpées" :
            confectionStep === "selection" ? "Confirmation de la confection" : ""
          }
          description={
            confectionStep === "clients" ? "Choisissez les commandes découpées à mettre en confection" :
            confectionStep === "selection" ? "Validez le lancement de la confection" : ""
          }
        >

            {confectionStep === "clients" && (
              <div className="space-y-6 p-6" style={{ fontFamily: 'var(--font-family-sidebar)' }}>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-600 mb-2">
                    Commandes découpées disponibles
                  </h4>
                  <p className="text-blue-700 text-sm">
                    Sélectionnez les commandes prêtes pour la
                    confection
                  </p>
                </div>

                {clients.map((client) => {
                  const clientRefs = getReferencesForClient(
                    client.id,
                  ).filter((ref) => Math.random() > 0.3); // Simulation références découpées
                  if (clientRefs.length === 0) return null;

                  return (
                    <Card
                      key={client.id}
                      className="bg-card border-border"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${client.color} flex items-center justify-center`}
                            >
                              <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-foreground">
                                {client.name}
                              </h3>
                              <p className="text-muted-foreground text-sm">
                                {clientRefs.length} référence(s)
                                découpée(s)
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {clientRefs.map((ref) => (
                            <div
                              key={ref.id}
                              className="bg-secondary/50 rounded-lg p-4 cursor-pointer hover:bg-secondary/70 transition-colors"
                              onClick={() => {
                                const isSelected = selectedConfectionReferences.some((r) => r.id === ref.id);
                                if (isSelected) {
                                  setSelectedConfectionReferences(
                                    (prev) => prev.filter((r) => r.id !== ref.id)
                                  );
                                } else {
                                  setSelectedConfectionReferences(
                                    (prev) => [...prev, { ...ref, client }]
                                  );
                                }
                              }}
                            >
                              <div className="flex items-start gap-3">
                                <Checkbox
                                  checked={selectedConfectionReferences.some(
                                    (r) => r.id === ref.id,
                                  )}
                                  onCheckedChange={(
                                    checked,
                                  ) => {
                                    if (checked) {
                                      setSelectedConfectionReferences(
                                        (prev) => [
                                          ...prev,
                                          { ...ref, client },
                                        ],
                                      );
                                    } else {
                                      setSelectedConfectionReferences(
                                        (prev) =>
                                          prev.filter(
                                            (r) =>
                                              r.id !== ref.id,
                                          ),
                                      );
                                    }
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <h4 className="font-medium text-foreground">
                                      {ref.ref}
                                    </h4>
                                    <Badge
                                      variant="outline"
                                      className="text-green-600 border-green-500/30 bg-green-500/10"
                                    >
                                      Découpé
                                    </Badge>
                                  </div>
                                  <p className="text-foreground/90 text-sm mb-2">
                                    {ref.description}
                                  </p>
                                  <div className="grid grid-cols-3 gap-4 text-xs">
                                    <div>
                                      <span className="text-muted-foreground">
                                        Quantité:
                                      </span>
                                      <div className="text-foreground font-medium">
                                        {ref.quantite} unités
                                      </div>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">
                                        Matière:
                                      </span>
                                      <div className="text-foreground font-medium">
                                        {ref.matiere}
                                      </div>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">
                                        Priorité:
                                      </span>
                                      <div
                                        className={`font-medium ${ref.priorite === "Urgente" ? "text-red-600" : "text-muted-foreground"}`}
                                      >
                                        {ref.priorite}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  );
                })}

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <div className="text-sm text-muted-foreground">
                    {selectedConfectionReferences.length}{" "}
                    référence(s) sélectionnée(s) pour confection
                  </div>
                  <Button
                    onClick={() =>
                      setConfectionStep("selection")
                    }
                    disabled={
                      selectedConfectionReferences.length === 0
                    }
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Lancer la confection
                  </Button>
                </div>
              </div>
            )}

            {confectionStep === "selection" && (
              <div className="space-y-6 p-6" style={{ fontFamily: 'var(--font-family-sidebar)' }}>
                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
                  <h4 className="font-semibold text-purple-600 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Confection lancée avec succès !
                  </h4>

                  <div className="space-y-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">
                        Références en confection:
                      </span>
                      <span className="text-foreground font-medium ml-2">
                        {selectedConfectionReferences.length}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {selectedConfectionReferences.map(
                        (ref) => (
                          <div
                            key={ref.id}
                            className="bg-secondary/30 rounded p-3"
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="text-foreground font-medium">
                                  {ref.ref}
                                </div>
                                <div className="text-muted-foreground text-sm">
                                  {ref.client?.name} -{" "}
                                  {ref.quantite} unités
                                </div>
                              </div>
                              <Badge
                                variant="outline"
                                className="text-purple-600 border-purple-500/30 bg-purple-500/10"
                              >
                                En confection
                              </Badge>
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="text-sm">
                      <span className="text-muted-foreground">
                        Heure de lancement:
                      </span>
                      <span className="text-foreground font-medium ml-2">
                        {new Date().toLocaleTimeString("fr-FR")}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={() => {
                      setConfectionStep(null);
                      setSelectedConfectionReferences([]);
                      setProductsInProgress(
                        (prev) =>
                          prev +
                          selectedConfectionReferences.length,
                      );
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Terminer
                  </Button>
                </div>
              </div>
            )}
        </CustomModal>
      </div>
    </SidebarProvider>
  );
}