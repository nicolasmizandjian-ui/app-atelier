import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  Clock,
  Target,
  Award,
  Activity,
  Scissors,
  Package,
  Wrench,
  Filter,
  Download,
  RefreshCw,
  Users,
  Factory,
  Timer,
  CheckCircle2
} from 'lucide-react';

interface ProductionData {
  date: string;
  decoupe: number;
  assemblage: number;
  confection: number;
  total: number;
}

interface StatsCardProps {
  title: string;
  value: number;
  previousValue: number;
  icon: React.ReactNode;
  color: string;
  unit?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, previousValue, icon, color, unit = '' }) => {
  const percentage = previousValue > 0 ? ((value - previousValue) / previousValue) * 100 : 0;
  const isPositive = percentage >= 0;

  return (
    <Card className="bg-card border-border p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white`}>
              {icon}
            </div>
            <div>
              <h3 className="font-medium text-muted-foreground text-sm">{title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold text-foreground">{value.toLocaleString()}</span>
                <span className="text-sm text-muted-foreground">{unit}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {isPositive ? '+' : ''}{percentage.toFixed(1)}%
            </span>
            <span className="text-sm text-muted-foreground">vs période précédente</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const DashboardStats: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'year'>('week');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Données simulées pour le tableau de bord
  const generateMockData = (period: string): ProductionData[] => {
    const now = new Date();
    const data: ProductionData[] = [];

    switch (period) {
      case 'day':
        // Derniers 7 jours
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          data.push({
            date: date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
            decoupe: Math.floor(Math.random() * 50) + 20,
            assemblage: Math.floor(Math.random() * 40) + 15,
            confection: Math.floor(Math.random() * 35) + 10,
            total: 0
          });
        }
        break;

      case 'week':
        // Dernières 8 semaines
        for (let i = 7; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - (i * 7));
          const weekNumber = Math.ceil((date.getDate()) / 7);
          data.push({
            date: `S${weekNumber} ${date.toLocaleDateString('fr-FR', { month: 'short' })}`,
            decoupe: Math.floor(Math.random() * 300) + 150,
            assemblage: Math.floor(Math.random() * 250) + 120,
            confection: Math.floor(Math.random() * 200) + 100,
            total: 0
          });
        }
        break;

      case 'month':
        // Derniers 12 mois
        for (let i = 11; i >= 0; i--) {
          const date = new Date(now);
          date.setMonth(date.getMonth() - i);
          data.push({
            date: date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' }),
            decoupe: Math.floor(Math.random() * 1200) + 600,
            assemblage: Math.floor(Math.random() * 1000) + 500,
            confection: Math.floor(Math.random() * 800) + 400,
            total: 0
          });
        }
        break;

      case 'year':
        // Dernières 5 années
        for (let i = 4; i >= 0; i--) {
          const year = now.getFullYear() - i;
          data.push({
            date: year.toString(),
            decoupe: Math.floor(Math.random() * 12000) + 8000,
            assemblage: Math.floor(Math.random() * 10000) + 6000,
            confection: Math.floor(Math.random() * 8000) + 5000,
            total: 0
          });
        }
        break;
    }

    // Calculer les totaux
    return data.map(item => ({
      ...item,
      total: item.decoupe + item.assemblage + item.confection
    }));
  };

  const productionData = generateMockData(selectedPeriod);
  
  // Calcul des statistiques globales
  const currentPeriodData = productionData[productionData.length - 1] || { decoupe: 0, assemblage: 0, confection: 0, total: 0 };
  const previousPeriodData = productionData[productionData.length - 2] || { decoupe: 0, assemblage: 0, confection: 0, total: 0 };

  const totalProduction = productionData.reduce((sum, item) => sum + item.total, 0);
  const averageDaily = totalProduction / productionData.length;

  // Données pour le graphique en secteurs (répartition des opérations)
  const pieData = [
    { name: 'Découpe', value: currentPeriodData.decoupe, color: '#3B82F6' },
    { name: 'Assemblage', value: currentPeriodData.assemblage, color: '#10B981' },
    { name: 'Confection', value: currentPeriodData.confection, color: '#8B5CF6' }
  ];

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'day': return 'journalières';
      case 'week': return 'hebdomadaires';
      case 'month': return 'mensuelles';
      case 'year': return 'annuelles';
      default: return '';
    }
  };

  const getUnitLabel = () => {
    switch (selectedPeriod) {
      case 'day': return 'articles/jour';
      case 'week': return 'articles/semaine';
      case 'month': return 'articles/mois';
      case 'year': return 'articles/année';
      default: return 'articles';
    }
  };

  return (
    <div className="space-y-6" style={{ fontFamily: 'var(--font-family-sidebar)' }}>
      {/* Header avec filtres */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Tableau de Bord Production</h2>
          <p className="text-muted-foreground">Suivi des performances {getPeriodLabel()} de production</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={selectedPeriod} onValueChange={(value: any) => setSelectedPeriod(value)}>
            <SelectTrigger className="w-48 bg-input border-border text-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border text-foreground">
              <SelectItem value="day" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">📅 Vue journalière</SelectItem>
              <SelectItem value="week" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">📊 Vue hebdomadaire</SelectItem>
              <SelectItem value="month" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">📈 Vue mensuelle</SelectItem>
              <SelectItem value="year" className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">🗓️ Vue annuelle</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
            <SelectTrigger className="w-32 bg-input border-border text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border text-foreground">
              {Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <SelectItem key={year} value={year.toString()} className="text-foreground hover:bg-secondary focus:bg-secondary focus:text-foreground">{year}</SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" className="border-border">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Cartes de statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Articles découpés"
          value={currentPeriodData.decoupe}
          previousValue={previousPeriodData.decoupe}
          icon={<Scissors className="w-6 h-6" />}
          color="from-blue-500 to-blue-600"
          unit={getUnitLabel().split('/')[1]}
        />
        
        <StatsCard
          title="Articles assemblés"
          value={currentPeriodData.assemblage}
          previousValue={previousPeriodData.assemblage}
          icon={<Wrench className="w-6 h-6" />}
          color="from-green-500 to-green-600"
          unit={getUnitLabel().split('/')[1]}
        />
        
        <StatsCard
          title="Articles confectionnés"
          value={currentPeriodData.confection}
          previousValue={previousPeriodData.confection}
          icon={<Package className="w-6 h-6" />}
          color="from-purple-500 to-purple-600"
          unit={getUnitLabel().split('/')[1]}
        />
        
        <StatsCard
          title="Production totale"
          value={currentPeriodData.total}
          previousValue={previousPeriodData.total}
          icon={<Factory className="w-6 h-6" />}
          color="from-orange-500 to-orange-600"
          unit={getUnitLabel().split('/')[1]}
        />
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graphique d'évolution temporelle */}
        <Card className="bg-card border-border p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Évolution de la production</h3>
              <p className="text-muted-foreground text-sm">Tendances {getPeriodLabel()} par opération</p>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded"></div>
                <span className="text-foreground">Découpe</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-foreground">Assemblage</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded"></div>
                <span className="text-foreground">Confection</span>
              </div>
            </div>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={productionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="date" stroke="#6B7280" fontSize={12} />
                <YAxis stroke="#6B7280" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    color: '#1A202C'
                  }}
                />
                <Area type="monotone" dataKey="decoupe" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="assemblage" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                <Area type="monotone" dataKey="confection" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Graphique en secteurs */}
        <Card className="bg-card border-border p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-1">Répartition actuelle</h3>
            <p className="text-muted-foreground text-sm">Distribution par type d'opération</p>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    color: '#1A202C'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-3 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded`} style={{ backgroundColor: item.color }}></div>
                  <span className="text-foreground text-sm">{item.name}</span>
                </div>
                <span className="text-foreground font-medium">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Métriques de performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Moyenne quotidienne</h4>
              <p className="text-muted-foreground text-sm">Production journalière</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-600 mb-1">{Math.round(averageDaily).toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">articles/jour</div>
        </Card>

        <Card className="bg-card border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Taux de complétion</h4>
              <p className="text-muted-foreground text-sm">Confection/Découpe</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-green-600 mb-1">
            {currentPeriodData.decoupe > 0 ? Math.round((currentPeriodData.confection / currentPeriodData.decoupe) * 100) : 0}%
          </div>
          <div className="text-sm text-muted-foreground">Efficacité process</div>
        </Card>

        <Card className="bg-card border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Timer className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Temps de cycle</h4>
              <p className="text-muted-foreground text-sm">Découpe → Confection</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-600 mb-1">2.4</div>
          <div className="text-sm text-muted-foreground">jours moyens</div>
        </Card>

        <Card className="bg-card border-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Pic de production</h4>
              <p className="text-muted-foreground text-sm">Record de la période</p>
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-600 mb-1">
            {Math.max(...productionData.map(d => d.total)).toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">articles/{selectedPeriod === 'day' ? 'jour' : selectedPeriod === 'week' ? 'semaine' : selectedPeriod === 'month' ? 'mois' : 'année'}</div>
        </Card>
      </div>

      {/* Tableau détaillé */}
      <Card className="bg-card border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-1">Données détaillées</h3>
              <p className="text-muted-foreground text-sm">Historique complet des productions {getPeriodLabel()}</p>
            </div>
            <Button variant="outline" size="sm" className="border-border">
              <RefreshCw className="w-4 h-4 mr-2" />
              Actualiser
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left p-4 font-medium text-foreground">Période</th>
                <th className="text-left p-4 font-medium text-foreground">Découpe</th>
                <th className="text-left p-4 font-medium text-foreground">Assemblage</th>
                <th className="text-left p-4 font-medium text-foreground">Confection</th>
                <th className="text-left p-4 font-medium text-foreground">Total</th>
                <th className="text-left p-4 font-medium text-foreground">Évolution</th>
              </tr>
            </thead>
            <tbody>
              {productionData.map((item, index) => {
                const prevItem = index > 0 ? productionData[index - 1] : null;
                const evolution = prevItem ? ((item.total - prevItem.total) / prevItem.total) * 100 : 0;
                
                return (
                  <tr key={index} className="border-t border-border hover:bg-secondary/30">
                    <td className="p-4 font-medium text-foreground">{item.date}</td>
                    <td className="p-4 text-blue-600">{item.decoupe.toLocaleString()}</td>
                    <td className="p-4 text-green-600">{item.assemblage.toLocaleString()}</td>
                    <td className="p-4 text-purple-600">{item.confection.toLocaleString()}</td>
                    <td className="p-4 font-bold text-foreground">{item.total.toLocaleString()}</td>
                    <td className="p-4">
                      {prevItem && (
                        <div className="flex items-center gap-1">
                          {evolution >= 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-600" />
                          )}
                          <span className={`text-sm ${evolution >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {evolution >= 0 ? '+' : ''}{evolution.toFixed(1)}%
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};