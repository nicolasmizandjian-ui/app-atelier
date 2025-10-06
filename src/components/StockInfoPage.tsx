import React, { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Package, 
  Building2, 
  Calendar, 
  Hash, 
  Scale, 
  Tag, 
  FileText, 
  AlertTriangle,
  ArrowLeft
} from 'lucide-react';

interface StockInfoPageProps {
  onBack?: () => void;
}

export const StockInfoPage: React.FC<StockInfoPageProps> = ({ onBack }) => {
  const [stockData, setStockData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get('data');
    
    if (encodedData) {
      try {
        const decodedData = decodeURIComponent(encodedData);
        const parsedData = JSON.parse(decodedData);
        setStockData(parsedData);
        setLoading(false);
      } catch (err) {
        setError('Impossible de décoder les données du QR code');
        setLoading(false);
      }
    } else {
      setError('Aucune donnée trouvée dans le QR code');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Chargement des informations...</p>
        </div>
      </div>
    );
  }

  if (error || !stockData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <Card className="bg-gray-800 border-gray-700 p-8 max-w-md mx-auto">
          <div className="text-center">
            <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">Erreur</h2>
            <p className="text-gray-400 mb-4">{error}</p>
            {onBack && (
              <Button onClick={onBack} variant="outline" className="border-gray-600">
                Retour
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Informations de Stock</h1>
              <p className="text-gray-400 text-sm">Détails du produit scanné</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Informations principales */}
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Informations générales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-sm text-gray-400">Fournisseur</p>
                    <p className="text-white font-medium">{stockData.fournisseur}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-sm text-gray-400">Produit</p>
                    <p className="text-white font-medium">{stockData.produit}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Nature</p>
                    <Badge variant="outline" className="capitalize">
                      {stockData.nature}
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-yellow-400" />
                  <div>
                    <p className="text-sm text-gray-400">Date de réception</p>
                    <p className="text-white font-medium">
                      {new Date(stockData.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Détails techniques */}
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Détails techniques</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-sm text-gray-400">Référence</p>
                    <p className="text-white font-medium font-mono">
                      {stockData.ref}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Hash className="w-5 h-5 text-orange-400" />
                  <div>
                    <p className="text-sm text-gray-400">Batch</p>
                    <p className="text-white font-medium font-mono">
                      {stockData.batch}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Scale className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-sm text-gray-400">Quantité</p>
                    <p className="text-white font-medium">
                      {stockData.quantite}
                    </p>
                  </div>
                </div>

                {stockData.categorie && (
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-pink-400" />
                    <div>
                      <p className="text-sm text-gray-400">Catégorie</p>
                      <p className="text-white font-medium">{stockData.categorie}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Informations spéciales */}
          {(stockData.livraisonPartielle || stockData.rouleaux?.length > 0) && (
            <Card className="bg-gray-800 border-gray-700">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-white mb-4">Informations spéciales</h2>
                
                {stockData.livraisonPartielle && (
                  <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-medium">Livraison partielle</span>
                    </div>
                  </div>
                )}

                {stockData.rouleaux && stockData.rouleaux.length > 0 && (
                  <div>
                    <h3 className="text-white font-medium mb-3">Détail des rouleaux</h3>
                    <div className="space-y-2">
                      {stockData.rouleaux.map((rouleau: any, index: number) => (
                        <div key={index} className="bg-gray-700/50 p-3 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-white">Rouleau #{index + 1}</span>
                            <div className="text-right">
                              <p className="text-white font-medium">{rouleau.quantite} ML</p>
                              <p className="text-sm text-gray-400">Batch: {rouleau.batch}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Notes */}
          {stockData.notes && (
            <Card className="bg-gray-800 border-gray-700">
              <div className="p-6">
                <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-gray-400" />
                  Notes
                </h2>
                <div className="bg-gray-700/50 p-4 rounded-lg">
                  <p className="text-gray-300 whitespace-pre-wrap">{stockData.notes}</p>
                </div>
              </div>
            </Card>
          )}

          {/* Métadonnées */}
          <Card className="bg-gray-800 border-gray-700">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-white mb-4">Informations système</h2>
              <div className="text-sm text-gray-400">
                <p>QR Code généré le : {new Date(stockData.timestamp).toLocaleString('fr-FR')}</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};