import image_75a440c03d19cd7d4582df618bf890cf7ea87a2a from 'figma:asset/75a440c03d19cd7d4582df618bf890cf7ea87a2a.png';
import React from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Home, 
  ShoppingCart, 
  Search, 
  Brain, 
  Palette, 
  PenTool, 
  BarChart3,
  Star,
  Award,
  Settings,
  LogOut,
  Briefcase,
  X,
  Radio,
  Megaphone
} from 'lucide-react';

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  isMobile?: boolean;
  isTablet?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const categories = [
  { id: 'dashboard', name: 'Dashboard', icon: Home },
  { id: 'live', name: 'Live', icon: Radio, isLive: true },
  { id: 'ecom', name: 'E-commerce', icon: ShoppingCart, count: 8 },
  { id: 'seo', name: 'SEO', icon: Search, count: 6 },
  { id: 'ia', name: 'IA', icon: Brain, count: 12 },
  { id: 'branding', name: 'Branding', icon: Palette, count: 5 },
  { id: 'copywriting', name: 'Copywriting', icon: PenTool, count: 7 },
  { id: 'analytics', name: 'Analytics', icon: BarChart3, count: 4 },
  { id: 'ads', name: 'Publicité', icon: Megaphone, count: 3 },
  { id: 'services', name: 'Services', icon: Briefcase },
  { id: 'certificates', name: 'Mes Certificats', icon: Award },
];

export function Sidebar({ 
  activeCategory, 
  onCategoryChange, 
  isMobile = false, 
  isTablet = false,
  isOpen = false,
  onClose 
}: SidebarProps) {
  
  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
    if (isMobile && onClose) {
      onClose();
    }
  };

  return (
    <div className={`
      ${isMobile ? 'w-80' : isTablet ? 'w-72' : 'w-64'} 
      bg-gray-900 border-r border-gray-800 flex flex-col h-full
      ${isMobile ? 'shadow-2xl' : ''}
    `}>
      {/* Mobile Header with Close Button */}
      {isMobile && (
        <div className="p-4 border-b border-gray-800 flex items-center justify-between lg:hidden">
          <h2 className="text-white font-semibold">Menu</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Logo */}
      <div className={`${isMobile ? 'p-4' : 'p-6'} border-b border-gray-800`}>
        <div className="flex items-center space-x-3">
          <div className={`
            ${isMobile ? 'w-8 h-8' : 'w-10 h-10'} 
            rounded-lg overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5
          `}>
            <ImageWithFallback 
              src={image_75a440c03d19cd7d4582df618bf890cf7ea87a2a}
              alt="START Modules Logo"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div>
            <h1 className={`text-white font-bold ${isMobile ? 'text-base' : 'text-lg'}`}>
              START
            </h1>
            <p className={`text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>
              Modules
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`flex-1 ${isMobile ? 'p-3' : 'p-4'} space-y-1 overflow-y-auto`}>
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = activeCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`
                w-full flex items-center justify-between rounded-lg transition-all duration-200
                ${isMobile ? 'p-3 text-sm' : 'p-3 text-sm'}
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-500/20 to-cyan-400/20 border border-blue-500/30 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }
                ${isMobile ? 'active:bg-gray-800' : ''}
              `}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`${isMobile ? 'w-5 h-5' : 'w-5 h-5'} ${category.isLive ? 'text-red-500' : ''}`} />
                <span className="font-medium">{category.name}</span>
                {category.isLive && (
                  <Badge className="bg-red-500 text-white px-2 py-0.5 text-xs animate-pulse">
                    LIVE
                  </Badge>
                )}
              </div>
              {category.count && (
                <Badge 
                  variant="secondary" 
                  className={`
                    bg-gray-800 text-gray-300 
                    ${isMobile ? 'text-xs px-2 py-0.5' : 'text-xs'}
                  `}
                >
                  {category.count}
                </Badge>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Actions */}
      <div className={`${isMobile ? 'p-3' : 'p-4'} border-t border-gray-800 space-y-1`}>
        <Button 
          variant="ghost" 
          className={`
            w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800
            ${isMobile ? 'p-3 text-sm h-auto' : 'text-sm'}
          `}
        >
          <Settings className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} mr-3`} />
          Paramètres
        </Button>
        
        <Button 
          variant="ghost" 
          className={`
            w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800
            ${isMobile ? 'p-3 text-sm h-auto' : 'text-sm'}
          `}
        >
          <LogOut className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'} mr-3`} />
          Déconnexion
        </Button>

        {/* Mobile-only footer info */}
        {isMobile && (
          <div className="pt-4 mt-4 border-t border-gray-800">
            <p className="text-gray-500 text-xs text-center">
              START Modules v2.0
            </p>
          </div>
        )}
      </div>
    </div>
  );
}