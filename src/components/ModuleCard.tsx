import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Play, 
  Lock, 
  CheckCircle, 
  Clock, 
  Star,
  Users,
  Video
} from 'lucide-react';

interface Module {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  level: 'Débutant' | 'Confirmé' | 'Expert';
  status: 'unlocked' | 'in-progress' | 'locked' | 'completed';
  progress?: number;
  price?: number;
  lessonsCount: number;
  duration: string;
  thumbnail: string;
  isPromoted?: boolean;
  promotedBy?: string;
}

interface ModuleCardProps {
  module: Module;
  onModuleClick: (moduleId: string) => void;
  isMobile?: boolean;
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function ModuleCard({ 
  module, 
  onModuleClick, 
  isMobile = false, 
  breakpoint = 'desktop' 
}: ModuleCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'in-progress':
        return 'bg-cyan-400 text-white';
      case 'unlocked':
        return 'bg-blue-500 text-white';
      case 'locked':
        return 'bg-gray-600 text-gray-300';
      default:
        return 'bg-gray-600 text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'in-progress':
        return 'En cours';
      case 'unlocked':
        return 'Débloqué';
      case 'locked':
        return 'À débloquer';
      default:
        return 'À débloquer';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Confirmé':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Expert':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'unlocked':
        return <Play className="w-4 h-4" />;
      case 'locked':
        return <Lock className="w-4 h-4" />;
      default:
        return <Lock className="w-4 h-4" />;
    }
  };

  return (
    <Card 
      className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-200 cursor-pointer group overflow-hidden"
      onClick={() => onModuleClick(module.id)}
    >
      {/* Thumbnail */}
      <div className={`relative overflow-hidden ${
        isMobile ? 'h-40' : breakpoint === 'tablet' ? 'h-44' : 'h-48'
      }`}>
        <ImageWithFallback
          src={module.thumbnail}
          alt={module.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-400/20 group-hover:from-blue-400/30 group-hover:to-cyan-300/30 transition-all duration-500" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Outer blur effect */}
            <div className="absolute inset-0 w-20 h-20 bg-white/10 rounded-full blur-sm animate-pulse group-hover:bg-white/15 transition-all duration-300"></div>
            
            {/* Glass button with glassmorphism effect */}
            <div className="relative w-20 h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group-hover:scale-105 group-hover:bg-white/15 group-hover:border-white/30 transition-all duration-300 shadow-2xl">
              {/* Inner glass effect */}
              <div className="absolute inset-1 bg-gradient-to-br from-white/20 via-white/5 to-transparent rounded-full"></div>
              
              {/* Play icon */}
              <Play className="relative w-8 h-8 text-white ml-1 drop-shadow-lg group-hover:scale-110 transition-transform duration-200" fill="currentColor" />
              
              {/* Glass shine effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
              
              {/* Border highlight */}
              <div className="absolute inset-0 rounded-full ring-1 ring-white/10 group-hover:ring-white/20 transition-all duration-300"></div>
            </div>
          </div>
        </div>
        
        {/* Badges overlay */}
        <div className={`absolute ${isMobile ? 'top-2 left-2' : 'top-3 left-3'} flex flex-wrap gap-2`}>
          <Badge className={`${getStatusColor(module.status)} ${isMobile ? 'text-xs px-2 py-1' : 'text-xs'}`}>
            {getStatusIcon(module.status)}
            <span className="ml-1">{getStatusText(module.status)}</span>
          </Badge>
          <Badge variant="outline" className={`${getLevelColor(module.level)} ${isMobile ? 'text-xs px-2 py-1' : 'text-xs'} border`}>
            {module.level}
          </Badge>
        </div>

        {module.isPromoted && (
          <div className={`absolute ${isMobile ? 'top-2 right-2' : 'top-3 right-3'}`}>
            <Badge className={`bg-gradient-to-r from-purple-500 to-pink-500 text-white ${isMobile ? 'text-xs px-2 py-1' : 'text-xs'}`}>
              <Star className={`${isMobile ? 'w-3 h-3 mr-1' : 'w-3 h-3 mr-1'}`} />
              Promu
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className={`${isMobile ? 'pb-2 p-4' : 'pb-3'}`}>
        <div className={`${isMobile ? 'space-y-1' : 'space-y-2'}`}>
          <h3 className={`text-white group-hover:text-blue-400 transition-colors ${
            isMobile ? 'text-base' : 'text-lg'
          }`}>
            {module.title}
          </h3>
          <p className={`text-gray-400 ${isMobile ? 'text-sm' : 'text-sm'}`}>
            {module.subtitle}
          </p>
          
          {module.isPromoted && module.promotedBy && (
            <p className={`text-purple-400 ${isMobile ? 'text-xs' : 'text-xs'}`}>
              Recommandé par {module.promotedBy}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className={`${isMobile ? 'space-y-3 p-4 pt-0' : 'space-y-4'}`}>
        {/* Progress for in-progress modules */}
        {module.status === 'in-progress' && module.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progression</span>
              <span className="text-white">{module.progress}%</span>
            </div>
            <Progress value={module.progress} className="h-1 bg-gray-700" />
          </div>
        )}

        {/* Module details */}
        <div className="flex justify-between items-center text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Video className="w-4 h-4 mr-1" />
              {module.lessonsCount} leçons
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {module.duration}
            </span>
          </div>
          
          {module.price && module.status === 'locked' && (
            <span className="text-blue-400 font-semibold">{module.price}€</span>
          )}
        </div>

        {/* Action button */}
        <Button 
          variant="default"
          size={isMobile ? 'sm' : 'default'}
          className={`w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white border-0 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 ${isMobile ? 'text-sm h-9' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onModuleClick(module.id);
          }}
        >
          {isMobile ? 'Débloquer - 250€' : 'Débloquer - 250€'}
        </Button>
      </CardContent>
    </Card>
  );
}