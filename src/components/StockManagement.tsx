import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Search,
  Plus,
  Edit,
  Trash2,
  Package,
  Archive,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Download,
  Upload,
  BarChart3,
  Box,
  Calendar,
  MapPin,
  Truck,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  Star,
  SortAsc,
  SortDesc,
  X,
  RefreshCw,
  Clock,
  TrendingUp,
  TrendingDown,
  Eye,
  Building2,
  QrCode
} from 'lucide-react';

interface Material {
  id: number;
  ref: string;
  name: string;
  category: string;
  supplier: string;
  batch: string;
  quantityTotal: number;
  quantityAvailable: number;
  quantityReserved: number;
  unit: string;
  location: string;
  dateReceived: string;
  expiryDate?: string;
  quality: 'excellent' | 'good' | 'acceptable' | 'defective';
  notes?: string;
  cost: number;
  rolls?: Array<{
    id: string;
    quantity: number;
    batch: string;
    location: string;
  }>;
}

interface StockManagementProps {
  currentSubpage: 'accessoires' | 'outillages' | 'emballages' | 'matieres-premieres' | 'produits-finis';
}

export function StockManagement({ currentSubpage }: StockManagementProps) {
  // Données différentes selon la sous-page
  const getMaterialsData = () => {
    switch (currentSubpage) {
      case 'matieres-premieres':
        return [
          {
            id: 1,
            ref: "ALU-2024-001",
            name: "Aluminium 6061-T6 Premium",
            category: "Métal",
            supplier: "MetalWorks France",
            batch: "BATCH-ALU-240115",
            quantityTotal: 1500,
            quantityAvailable: 850,
            quantityReserved: 200,
            unit: "ML",
            location: "Zone A1-B3",
            dateReceived: "2024-01-15",
            expiryDate: "2026-01-15",
            quality: "excellent",
            cost: 12.50,
            notes: "Matière premium pour applications critiques",
            rolls: [
              { id: "R001", quantity: 500, batch: "BATCH-ALU-240115-1", location: "A1-B3-01" },
              { id: "R002", quantity: 350, batch: "BATCH-ALU-240115-2", location: "A1-B3-02" }
            ]
          },
          {
            id: 2,
            ref: "PLA-2024-001",
            name: "Plastique ABS Premium",
            category: "Plastique",
            supplier: "PlastiPro Industries",
            batch: "BATCH-PLA-240120",
            quantityTotal: 2000,
            quantityAvailable: 1200,
            quantityReserved: 300,
            unit: "ML",
            location: "Zone B2-C1",
            dateReceived: "2024-01-20",
            quality: "good",
            cost: 8.75,
            notes: "Plastique haute résistance pour applications extérieures",
            rolls: [
              { id: "R003", quantity: 600, batch: "BATCH-PLA-240120-1", location: "B2-C1-01" },
              { id: "R004", quantity: 600, batch: "BATCH-PLA-240120-2", location: "B2-C1-02" }
            ]
          },
          {
            id: 3,
            ref: "TEX-2024-001",
            name: "Textile technique renforcé",
            category: "Textile",
            supplier: "TechnoFab Solutions",
            batch: "BATCH-TEX-240110",
            quantityTotal: 800,
            quantityAvailable: 300,
            quantityReserved: 150,
            unit: "ML",
            location: "Zone C1-D2",
            dateReceived: "2024-01-10",
            quality: "excellent",
            cost: 15.20,
            notes: "Textile technique pour applications spéciales"
          }
        ];
      case 'produits-finis':
        return [
          {
            id: 401,
            ref: "PF-AUTO-2024-001",
            name: "Panneaux carrosserie Automobile France",
            category: "Automobile",
            supplier: "Production Interne",
            batch: "BATCH-PF-240128",
            quantityTotal: 150,
            quantityAvailable: 120,
            quantityReserved: 30,
            unit: "unité",
            location: "Zone H1-PF",
            dateReceived: "2024-01-28",
            quality: "excellent",
            cost: 125.00,
            notes: "Produits finis contrôlés qualité - Prêts à expédier"
          },
          {
            id: 402,
            ref: "PF-TECH-2024-001",
            name: "Boîtiers électroniques Tech Innovations",
            category: "Électronique",
            supplier: "Production Interne",
            batch: "BATCH-PF-240126",
            quantityTotal: 200,
            quantityAvailable: 180,
            quantityReserved: 20,
            unit: "unité",
            location: "Zone H1-ELEC",
            dateReceived: "2024-01-26",
            quality: "excellent",
            cost: 89.50,
            notes: "Série certifiée ISO 9001 - Tests électriques validés"
          },
          {
            id: 403,
            ref: "PF-MOBI-2024-001",
            name: "Éléments mobilier Mobilier Design",
            category: "Ameublement",
            supplier: "Production Interne",
            batch: "BATCH-PF-240125",
            quantityTotal: 80,
            quantityAvailable: 65,
            quantityReserved: 15,
            unit: "unité",
            location: "Zone H2-MOBI",
            dateReceived: "2024-01-25",
            quality: "good",
            cost: 245.75,
            notes: "Finition premium - Emballage de protection inclus"
          },
          {
            id: 404,
            ref: "PF-PACK-2024-001",
            name: "Solutions emballage Packaging Solutions",
            category: "Emballage",
            supplier: "Production Interne",
            batch: "BATCH-PF-240124",
            quantityTotal: 500,
            quantityAvailable: 420,
            quantityReserved: 80,
            unit: "unité",
            location: "Zone H3-PACK",
            dateReceived: "2024-01-24",
            quality: "excellent",
            cost: 15.30,
            notes: "Emballages éco-responsables - Certification FSC"
          }
        ];
      case 'accessoires':
        return [
          {
            id: 101,
            ref: "ACC-VIS-2024-001",
            name: "Vis inox M6x20 tête hexagonale",
            category: "Visserie",
            supplier: "LogiStock Express",
            batch: "BATCH-VIS-240120",
            quantityTotal: 5000,
            quantityAvailable: 3200,
            quantityReserved: 800,
            unit: "unité",
            location: "Zone F1-A1",
            dateReceived: "2024-01-20",
            quality: "excellent",
            cost: 0.12,
            notes: "Visserie de haute qualité pour assemblage"
          },
          {
            id: 102,
            ref: "ACC-JT-2024-001",
            name: "Joints étanchéité NBR 70 Shore",
            category: "Étanchéité",
            supplier: "TechnoFab Solutions",
            batch: "BATCH-JT-240115",
            quantityTotal: 1000,
            quantityAvailable: 650,
            quantityReserved: 150,
            unit: "unité",
            location: "Zone F1-B2",
            dateReceived: "2024-01-15",
            quality: "good",
            cost: 2.50,
            notes: "Joints pour applications hydrauliques"
          }
        ];
      case 'outillages':
        return [
          {
            id: 201,
            ref: "OUT-FORE-2024-001",
            name: "Forets HSS Ø6mm set de 10",
            category: "Perçage",
            supplier: "MetalWorks France",
            batch: "BATCH-FORE-240110",
            quantityTotal: 50,
            quantityAvailable: 32,
            quantityReserved: 8,
            unit: "set",
            location: "Atelier-OUT-A1",
            dateReceived: "2024-01-10",
            quality: "excellent",
            cost: 15.80,
            notes: "Forets haute vitesse pour métaux"
          },
          {
            id: 202,
            ref: "OUT-LAME-2024-001",
            name: "Lames scie circulaire Ø250mm",
            category: "Découpe",
            supplier: "LogiStock Express",
            batch: "BATCH-LAME-240105",
            quantityTotal: 20,
            quantityAvailable: 12,
            quantityReserved: 3,
            unit: "unité",
            location: "Atelier-OUT-B1",
            dateReceived: "2024-01-05",
            quality: "good",
            cost: 45.20,
            notes: "Lames carbure pour découpe précise"
          }
        ];
      case 'emballages':
        return [
          {
            id: 301,
            ref: "EMB-CTN-2024-001",
            name: "Cartons ondulés 400x300x200mm",
            category: "Cartons",
            supplier: "EcoMat Durable",
            batch: "BATCH-CTN-240125",
            quantityTotal: 2000,
            quantityAvailable: 1200,
            quantityReserved: 400,
            unit: "unité",
            location: "Zone G1-EMB",
            dateReceived: "2024-01-25",
            quality: "good",
            cost: 1.20,
            notes: "Cartons recyclables pour expédition"
          },
          {
            id: 302,
            ref: "EMB-FILM-2024-001",
            name: "Film plastique étirable 500mm",
            category: "Protection",
            supplier: "PlastiPro Industries",
            batch: "BATCH-FILM-240120",
            quantityTotal: 100,
            quantityAvailable: 65,
            quantityReserved: 15,
            unit: "rouleau",
            location: "Zone G1-FILM",
            dateReceived: "2024-01-20",
            quality: "excellent",
            cost: 8.50,
            notes: "Film extensible pour palettisation"
          }
        ];
      default:
        return [];
    }
  };

  const [materials, setMaterials] = useState<Material[]>(getMaterialsData());

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedQuality, setSelectedQuality] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  const [formData, setFormData] = useState<Partial<Material>>({});
  
  // Nouveaux états pour l'amélioration de l'UX
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);
  const [sortBy, setSortBy] = useState<'name' | 'category' | 'quantity' | 'date'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const getCategoriesForSubpage = () => {
    switch (currentSubpage) {
      case 'matieres-premieres':
        return ['Métal', 'Plastique', 'Textile', 'Adhésif', 'Bois', 'Composite'];
      case 'produits-finis':
        return ['Automobile', 'Électronique', 'Ameublement', 'Emballage', 'Aéronautique', 'Industriel'];
      case 'accessoires':
        return ['Visserie', 'Étanchéité', 'Connecteurs', 'Fixations', 'Quincaillerie'];
      case 'outillages':
        return ['Perçage', 'Découpe', 'Mesure', 'Assemblage', 'Maintenance'];
      case 'emballages':
        return ['Cartons', 'Protection', 'Étiquetage', 'Sangles', 'Palettes'];
      default:
        return [];
    }
  };

  const categories = getCategoriesForSubpage();
  const suppliers = ['MetalWorks France', 'PlastiPro Industries', 'TechnoFab Solutions', 'EcoMat Durable', 'LogiStock Express'];

  // Mettre à jour les données quand la sous-page change
  React.useEffect(() => {
    setMaterials(getMaterialsData());
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedQuality('all');
    setSelectedSupplier('all');
    setCurrentPage(1);
    setShowOnlyFavorites(false);
    setActiveFilters([]);
  }, [currentSubpage]);

  // Fonctions utilitaires
  const toggleFavorite = (materialId: number) => {
    setFavorites(prev => 
      prev.includes(materialId) 
        ? prev.filter(id => id !== materialId)
        : [...prev, materialId]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedQuality('all');
    setSelectedSupplier('all');
    setShowOnlyFavorites(false);
    setCurrentPage(1);
    setActiveFilters([]);
  };

  const updateActiveFilters = () => {
    const filters = [];
    if (selectedCategory !== 'all') filters.push(`Catégorie: ${selectedCategory}`);
    if (selectedQuality !== 'all') filters.push(`Qualité: ${selectedQuality}`);
    if (selectedSupplier !== 'all') filters.push(`Fournisseur: ${selectedSupplier}`);
    if (showOnlyFavorites) filters.push('Favoris uniquement');
    setActiveFilters(filters);
  };

  React.useEffect(() => {
    updateActiveFilters();
  }, [selectedCategory, selectedQuality, selectedSupplier, showOnlyFavorites]);

  // Filtrage et tri améliorés
  const filteredMaterials = React.useMemo(() => {
    let filtered = materials.filter(material => {
      const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           material.ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           material.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           material.batch.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
      const matchesQuality = selectedQuality === 'all' || material.quality === selectedQuality;
      const matchesSupplier = selectedSupplier === 'all' || material.supplier === selectedSupplier;
      const matchesFavorites = !showOnlyFavorites || favorites.includes(material.id);
      
      return matchesSearch && matchesCategory && matchesQuality && matchesSupplier && matchesFavorites;
    });

    // Tri
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'category':
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        case 'quantity':
          aValue = a.quantityAvailable;
          bValue = b.quantityAvailable;
          break;
        case 'date':
          aValue = new Date(a.dateReceived).getTime();
          bValue = new Date(b.dateReceived).getTime();
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [materials, searchTerm, selectedCategory, selectedQuality, selectedSupplier, showOnlyFavorites, favorites, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredMaterials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMaterials = filteredMaterials.slice(startIndex, startIndex + itemsPerPage);

  const getTotalValue = () => {
    return materials.reduce((sum, material) => sum + (material.quantityTotal * material.cost), 0);
  };

  const getTotalQuantity = () => {
    return materials.reduce((sum, material) => sum + material.quantityTotal, 0);
  };

  const getAvailableQuantity = () => {
    return materials.reduce((sum, material) => sum + material.quantityAvailable, 0);
  };

  const getLowStockItems = () => {
    return materials.filter(material => 
      (material.quantityAvailable / material.quantityTotal) < 0.2
    ).length;
  };

  const getExpiringItems = () => {
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    
    return materials.filter(material => 
      material.expiryDate && new Date(material.expiryDate) <= threeMonthsFromNow
    ).length;
  };

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'excellent':
        return 'text-green-600 border-green-500/30 bg-green-500/10';
      case 'good':
        return 'text-blue-600 border-blue-500/30 bg-blue-500/10';
      case 'acceptable':
        return 'text-amber-600 border-amber-500/30 bg-amber-500/10';
      case 'defective':
        return 'text-red-600 border-red-500/30 bg-red-500/10';
      default:
        return 'text-muted-foreground border-border bg-secondary/10';
    }
  };

  const getStockLevelColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage < 20) return 'text-red-600';
    if (percentage < 50) return 'text-amber-600';
    return 'text-green-600';
  };

  const handleAddMaterial = () => {
    setFormData({
      ref: '',
      name: '',
      category: '',
      supplier: '',
      batch: '',
      quantityTotal: 0,
      quantityAvailable: 0,
      quantityReserved: 0,
      unit: 'ML',
      location: '',
      dateReceived: new Date().toISOString().split('T')[0],
      quality: 'good',
      cost: 0,
      notes: ''
    });
    setEditingMaterial(null);
    setShowAddModal(true);
  };

  const handleEditMaterial = (material: Material) => {
    setFormData(material);
    setEditingMaterial(material);
    setShowAddModal(true);
  };

  const handleSaveMaterial = () => {
    if (editingMaterial) {
      setMaterials(prev => prev.map(m => 
        m.id === editingMaterial.id ? { ...m, ...formData } as Material : m
      ));
    } else {
      const newMaterial: Material = {
        ...formData,
        id: Date.now(),
        quantityReserved: formData.quantityReserved || 0
      } as Material;
      setMaterials(prev => [...prev, newMaterial]);
    }
    setShowAddModal(false);
    setFormData({});
    setEditingMaterial(null);
  };

  const handleDeleteMaterial = (id: number) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
  };

  return (
    <div className="space-y-6" style={{ fontFamily: 'var(--font-family-sidebar)' }}>
      {/* Header avec statistiques */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {currentSubpage === 'matieres-premieres' && 'Matières Premières'}
            {currentSubpage === 'produits-finis' && 'Produits Finis'}
            {currentSubpage === 'accessoires' && 'Accessoires'}
            {currentSubpage === 'outillages' && 'Outillages'}
            {currentSubpage === 'emballages' && 'Emballages'}
          </h1>
          <p className="text-muted-foreground">
            {currentSubpage === 'matieres-premieres' && 'Gestion des matières de base pour la production'}
            {currentSubpage === 'produits-finis' && 'Gestion des produits terminés prêts à livrer'}
            {currentSubpage === 'accessoires' && 'Gestion des pièces et accessoires'}
            {currentSubpage === 'outillages' && 'Gestion des outils et équipements'}
            {currentSubpage === 'emballages' && 'Gestion des matériaux d\'emballage'}
          </p>
        </div>
        <Button
          onClick={handleAddMaterial}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg text-white border-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          {currentSubpage === 'matieres-premieres' && 'Ajouter une matière'}
          {currentSubpage === 'produits-finis' && 'Ajouter un produit fini'}
          {currentSubpage === 'accessoires' && 'Ajouter un accessoire'}
          {currentSubpage === 'outillages' && 'Ajouter un outillage'}
          {currentSubpage === 'emballages' && 'Ajouter un emballage'}
        </Button>
      </div>

      {/* Statistiques globales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-card border-border p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{materials.length}</div>
              <div className="text-muted-foreground text-sm">
                {currentSubpage === 'matieres-premieres' && 'Matières référencées'}
                {currentSubpage === 'produits-finis' && 'Produits référencés'}
                {currentSubpage === 'accessoires' && 'Accessoires référencés'}
                {currentSubpage === 'outillages' && 'Outillages référencés'}
                {currentSubpage === 'emballages' && 'Emballages référencés'}
              </div>
            </div>
          </div>
        </Card>

        <Card className="bg-card border-border p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Archive className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{getTotalQuantity().toLocaleString()}</div>
              <div className="text-muted-foreground text-sm">ML Total en stock</div>
            </div>
          </div>
        </Card>

        <Card className="bg-card border-border p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{getTotalValue().toLocaleString()}€</div>
              <div className="text-muted-foreground text-sm">Valeur totale</div>
            </div>
          </div>
        </Card>

        <Card className="bg-card border-border p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-600">{getLowStockItems()}</div>
              <div className="text-muted-foreground text-sm">Stock faible (&lt; 20%)</div>
            </div>
          </div>
        </Card>

        <Card className="bg-card border-border p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{getExpiringItems()}</div>
              <div className="text-muted-foreground text-sm">Expire sous 3 mois</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Barre de recherche et filtres améliorée */}
      <Card className="bg-card border-border p-6">
        <div className="space-y-4">
          {/* Ligne 1: Recherche et actions principales */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom, référence, fournisseur, batch..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-input border-border text-foreground"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                variant={showOnlyFavorites ? "default" : "outline"}
                onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                className="flex items-center gap-2"
              >
                <Star className={`w-4 h-4 ${showOnlyFavorites ? 'fill-current' : ''}`} />
                Favoris
              </Button>
              
              <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('table')}
                  className="p-2"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Ligne 2: Filtres */}
          <div className="flex flex-wrap gap-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48 bg-input border-border text-foreground">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border text-foreground">
                <SelectItem value="all" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">Toutes catégories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category} className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedQuality} onValueChange={setSelectedQuality}>
              <SelectTrigger className="w-48 bg-input border-border text-foreground">
                <SelectValue placeholder="Qualité" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border text-foreground">
                <SelectItem value="all" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">Toutes qualités</SelectItem>
                <SelectItem value="excellent" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">✨ Excellente</SelectItem>
                <SelectItem value="good" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">✅ Bonne</SelectItem>
                <SelectItem value="acceptable" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">⚠️ Acceptable</SelectItem>
                <SelectItem value="defective" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">❌ Défectueuse</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
              <SelectTrigger className="w-48 bg-input border-border text-foreground">
                <SelectValue placeholder="Fournisseur" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border text-foreground">
                <SelectItem value="all" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">Tous fournisseurs</SelectItem>
                {suppliers.map(supplier => (
                  <SelectItem key={supplier} value={supplier} className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">{supplier}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
              <SelectTrigger className="w-48 bg-input border-border text-foreground">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border text-foreground">
                <SelectItem value="name" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">Nom</SelectItem>
                <SelectItem value="category" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">Catégorie</SelectItem>
                <SelectItem value="quantity" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">Quantité</SelectItem>
                <SelectItem value="date" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">Date</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="border-border"
            >
              {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
            </Button>

            {activeFilters.length > 0 && (
              <Button
                variant="outline"
                onClick={clearAllFilters}
                className="border-amber-500/30 text-amber-600 hover:bg-amber-500/10"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Réinitialiser
              </Button>
            )}
          </div>

          {/* Ligne 3: Filtres actifs */}
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-muted-foreground">Filtres actifs:</span>
              {activeFilters.map((filter, index) => (
                <Badge key={index} variant="outline" className="text-blue-600 border-blue-500/30 bg-blue-500/10">
                  {filter}
                  <X className="w-3 h-3 ml-1 cursor-pointer" onClick={clearAllFilters} />
                </Badge>
              ))}
            </div>
          )}

          {/* Ligne 4: Statistiques des résultats */}
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="text-sm text-muted-foreground">
              {filteredMaterials.length} résultat{filteredMaterials.length > 1 ? 's' : ''} 
              {filteredMaterials.length !== materials.length && ` sur ${materials.length} total`}
            </div>
            <div className="text-sm text-muted-foreground">
              Page {currentPage} sur {totalPages}
            </div>
          </div>
        </div>
      </Card>

      {/* Liste des matières */}
      <div className="grid gap-4">
        {paginatedMaterials.map((material) => (
          <Card key={material.id} className="bg-card border-border hover:border-border/70 transition-all duration-300">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <Box className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">{material.name}</h3>
                    <p className="text-muted-foreground text-sm mb-2">{material.ref}</p>
                    <div className="flex gap-2 mb-2">
                      <Badge variant="outline" className="text-blue-600 border-blue-500/30 bg-blue-500/10">
                        {material.category}
                      </Badge>
                      <Badge variant="outline" className={getQualityColor(material.quality)}>
                        {material.quality === 'excellent' && '✨ Excellente'}
                        {material.quality === 'good' && '✅ Bonne'}
                        {material.quality === 'acceptable' && '⚠️ Acceptable'}
                        {material.quality === 'defective' && '❌ Défectueuse'}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(material.id)}
                    className={favorites.includes(material.id) ? 'text-yellow-600' : 'text-muted-foreground'}
                  >
                    <Star className={`w-4 h-4 ${favorites.includes(material.id) ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    onClick={() => handleEditMaterial(material)}
                    variant="outline"
                    size="sm"
                    className="border-border hover:bg-secondary"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => handleDeleteMaterial(material.id)}
                    variant="outline"
                    size="sm"
                    className="border-red-500/30 text-red-600 hover:bg-red-500/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Informations détaillées */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Archive className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground text-sm">Stock</span>
                  </div>
                  <div className={`text-lg font-bold ${getStockLevelColor(material.quantityAvailable, material.quantityTotal)}`}>
                    {material.quantityAvailable} / {material.quantityTotal} {material.unit}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {((material.quantityAvailable / material.quantityTotal) * 100).toFixed(1)}% disponible
                  </div>
                </div>

                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground text-sm">Fournisseur</span>
                  </div>
                  <div className="text-foreground font-medium">{material.supplier}</div>
                  <div className="text-xs text-muted-foreground">Batch: {material.batch}</div>
                </div>

                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground text-sm">Localisation</span>
                  </div>
                  <div className="text-foreground font-medium">{material.location}</div>
                  <div className="text-xs text-muted-foreground">
                    Reçu le {new Date(material.dateReceived).toLocaleDateString('fr-FR')}
                  </div>
                </div>

                <div className="bg-secondary/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground text-sm">Valeur</span>
                  </div>
                  <div className="text-foreground font-medium">
                    {(material.quantityTotal * material.cost).toLocaleString()}€
                  </div>
                  <div className="text-xs text-muted-foreground">{material.cost}€/{material.unit}</div>
                </div>
              </div>

              {/* Rouleaux si disponibles */}
              {material.rolls && material.rolls.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    Rouleaux ({material.rolls.length})
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {material.rolls.map((roll) => (
                      <div key={roll.id} className="bg-secondary/50 rounded p-2 text-sm">
                        <div className="text-foreground font-medium">{roll.id}</div>
                        <div className="text-muted-foreground">{roll.quantity} {material.unit} • {roll.location}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Notes */}
              {material.notes && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                  <p className="text-blue-700 text-sm">{material.notes}</p>
                </div>
              )}

              {/* Alertes */}
              <div className="flex gap-2 mt-4">
                {material.quantityAvailable / material.quantityTotal < 0.2 && (
                  <Badge variant="outline" className="text-amber-600 border-amber-500/30 bg-amber-500/10">
                    ⚠️ Stock faible
                  </Badge>
                )}
                {material.expiryDate && new Date(material.expiryDate) <= new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) && (
                  <Badge variant="outline" className="text-red-600 border-red-500/30 bg-red-500/10">
                    📅 Expire bientôt
                  </Badge>
                )}
                {material.quantityReserved > 0 && (
                  <Badge variant="outline" className="text-purple-600 border-purple-500/30 bg-purple-500/10">
                    🔒 {material.quantityReserved} {material.unit} réservés
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Card className="bg-card border-border p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredMaterials.length)} sur {filteredMaterials.length} résultats
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="border-border"
              >
                <ChevronLeft className="w-4 h-4" />
                Précédent
              </Button>
              
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  if (pageNum <= totalPages) {
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-10 border-border"
                      >
                        {pageNum}
                      </Button>
                    );
                  }
                  return null;
                })}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="border-border"
              >
                Suivant
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Message si aucun résultat */}
      {filteredMaterials.length === 0 && (
        <Card className="bg-card border-border p-12 text-center">
          <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Aucun résultat</h3>
          <p className="text-muted-foreground mb-4">
            Aucune matière ne correspond à vos critères de recherche.
          </p>
          <Button
            variant="outline"
            onClick={clearAllFilters}
            className="border-border hover:bg-secondary"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Réinitialiser les filtres
          </Button>
        </Card>
      )}

      {/* Modal d'ajout/édition */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="bg-card border-border text-foreground max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              {editingMaterial ? 'Modifier la matière' : 'Ajouter une nouvelle matière'}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {editingMaterial ? 'Modifiez les informations de la matière' : 'Saisissez les informations de la nouvelle matière'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 mt-6">
            {/* Informations de base */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ref">Référence *</Label>
                <Input
                  id="ref"
                  value={formData.ref || ''}
                  onChange={(e) => setFormData({...formData, ref: e.target.value})}
                  placeholder="Ex: ALU-2024-001"
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Nom de la matière *</Label>
                <Input
                  id="name"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: Aluminium 6061-T6 Premium"
                  className="bg-input border-border text-foreground"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Catégorie *</Label>
                <Select value={formData.category || ''} onValueChange={(value) => setFormData({...formData, category: value})}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border text-foreground">
                    {categories.map(category => (
                      <SelectItem key={category} value={category} className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Fournisseur *</Label>
                <Select value={formData.supplier || ''} onValueChange={(value) => setFormData({...formData, supplier: value})}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Sélectionner un fournisseur" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border text-foreground">
                    {suppliers.map(supplier => (
                      <SelectItem key={supplier} value={supplier} className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">{supplier}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quantités et unités */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantityTotal">Quantité totale *</Label>
                <Input
                  id="quantityTotal"
                  type="number"
                  value={formData.quantityTotal || ''}
                  onChange={(e) => setFormData({...formData, quantityTotal: parseFloat(e.target.value) || 0})}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantityAvailable">Quantité disponible *</Label>
                <Input
                  id="quantityAvailable"
                  type="number"
                  value={formData.quantityAvailable || ''}
                  onChange={(e) => setFormData({...formData, quantityAvailable: parseFloat(e.target.value) || 0})}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit">Unité</Label>
                <Select value={formData.unit || 'ML'} onValueChange={(value) => setFormData({...formData, unit: value})}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border text-foreground">
                    <SelectItem value="ML" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">ML (Mètres linéaires)</SelectItem>
                    <SelectItem value="M²" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">M² (Mètres carrés)</SelectItem>
                    <SelectItem value="KG" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">KG (Kilogrammes)</SelectItem>
                    <SelectItem value="L" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">L (Litres)</SelectItem>
                    <SelectItem value="unité" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">Unité</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Informations logistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="batch">Batch *</Label>
                <Input
                  id="batch"
                  value={formData.batch || ''}
                  onChange={(e) => setFormData({...formData, batch: e.target.value})}
                  placeholder="Ex: BATCH-ALU-240115"
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Localisation *</Label>
                <Input
                  id="location"
                  value={formData.location || ''}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="Ex: Zone A1-B3"
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateReceived">Date de réception *</Label>
                <Input
                  id="dateReceived"
                  type="date"
                  value={formData.dateReceived || ''}
                  onChange={(e) => setFormData({...formData, dateReceived: e.target.value})}
                  className="bg-input border-border text-foreground"
                />
              </div>
            </div>

            {/* Qualité et coût */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quality">Qualité</Label>
                <Select value={formData.quality || 'good'} onValueChange={(value) => setFormData({...formData, quality: value as any})}>
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border text-foreground">
                    <SelectItem value="excellent" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">Excellente</SelectItem>
                    <SelectItem value="good" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">Bonne</SelectItem>
                    <SelectItem value="acceptable" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">Acceptable</SelectItem>
                    <SelectItem value="defective" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">Défectueuse</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Coût unitaire (€)</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  value={formData.cost || ''}
                  onChange={(e) => setFormData({...formData, cost: parseFloat(e.target.value) || 0})}
                  className="bg-input border-border text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Date d'expiration (optionnel)</Label>
                <Input
                  id="expiryDate"
                  type="date"
                  value={formData.expiryDate || ''}
                  onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                  className="bg-input border-border text-foreground"
                />
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes || ''}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Remarques, instructions de stockage, propriétés spéciales..."
                className="bg-input border-border text-foreground min-h-[100px]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6">
            <Button
              onClick={() => setShowAddModal(false)}
              variant="outline"
              className="flex-1 border-border hover:bg-secondary"
            >
              Annuler
            </Button>
            <Button
              onClick={handleSaveMaterial}
              disabled={!formData.ref || !formData.name || !formData.category || !formData.supplier}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg text-white border-0 disabled:opacity-50"
            >
              {editingMaterial ? 'Modifier' : 'Ajouter'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}