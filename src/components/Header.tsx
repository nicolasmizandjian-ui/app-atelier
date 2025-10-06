import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Bell, Gift, Unlock, Shield, Radio } from 'lucide-react';

interface HeaderProps {
  user: {
    firstName: string;
    lastName: string;
    avatar?: string;
    completionPercentage: number;
    unlockedModules: number;
    totalModules: number;
    role?: 'user' | 'admin' | 'staff';
  };
  onAccessAdmin?: () => void;
  isLiveActive?: boolean;
  isMobile?: boolean;
  isTablet?: boolean;
}

export function Header({ 
  user, 
  onAccessAdmin, 
  isLiveActive = false, 
  isMobile = false, 
  isTablet = false 
}: HeaderProps) {
  const isStaff = user.role === 'admin' || user.role === 'staff';

  return (
    <div className={`
      bg-gray-900 border-b border-gray-800 sticky top-0 z-20
      ${isMobile ? 'p-4' : isTablet ? 'p-5' : 'p-6'}
    `}>
      <div className={`flex items-center justify-between ${isMobile ? 'mb-4' : 'mb-6'}`}>
        <div className="flex items-center space-x-3 min-w-0 flex-1">
          <Avatar className={`${isMobile ? 'w-10 h-10' : 'w-12 h-12'} flex-shrink-0`}>
            <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
              {user.firstName[0]}{user.lastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <h2 className={`text-white font-semibold truncate ${isMobile ? 'text-lg' : 'text-xl'}`}>
              {isMobile ? `${user.firstName}` : `Bonjour, ${user.firstName} ${user.lastName}`}
            </h2>
            <p className={`text-gray-400 truncate ${isMobile ? 'text-sm' : 'text-base'}`}>
              {isMobile 
                ? `${user.unlockedModules}/${user.totalModules} modules`
                : `${user.unlockedModules} modules débloqués sur ${user.totalModules}`
              }
            </p>
          </div>
        </div>
        
        <div className={`flex items-center ${isMobile ? 'space-x-2' : 'space-x-4'} flex-shrink-0`}>
          {isLiveActive && (
            <Badge className={`
              bg-red-500 text-white animate-pulse relative
              ${isMobile ? 'px-2 py-1 text-xs' : 'px-3 py-1'}
            `}>
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
              <Radio className={`${isMobile ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-2'}`} />
              {isMobile ? 'LIVE' : 'LIVE'}
            </Badge>
          )}
          
          {!isMobile && (
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <Bell className="w-5 h-5" />
            </Button>
          )}
          
          {isStaff && onAccessAdmin && !isMobile && (
            <Button 
              variant="outline"
              size={isMobile ? "sm" : "default"}
              onClick={onAccessAdmin}
              className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Shield className="w-4 h-4 mr-2" />
              {isMobile ? 'Staff' : 'Access Staff'}
            </Button>
          )}
          
          <Button 
            size={isMobile ? "sm" : "default"}
            className={`
              bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white border-0
              ${isMobile ? 'px-3 text-sm' : ''}
            `}
          >
            <Unlock className={`${isMobile ? 'w-4 h-4' : 'w-4 h-4 mr-2'}`} />
            {!isMobile && 'Débloquer un module'}
          </Button>
        </div>
      </div>

      {/* Bannière nouveau module */}
      {!isMobile && (
        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-400/10 border border-blue-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Gift className="w-6 h-6 text-blue-500 flex-shrink-0" />
              <div className="min-w-0">
                <h3 className="text-white font-medium">Nouveau module disponible !</h3>
                <p className="text-gray-300 text-sm truncate">IA Marketing - Étape 3 maintenant accessible</p>
              </div>
            </div>
            <Badge className="bg-blue-500 hover:bg-blue-600 text-white flex-shrink-0">
              Nouveau
            </Badge>
          </div>
        </div>
      )}

      {/* Barre de progression */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className={`text-gray-300 ${isMobile ? 'text-sm' : 'text-sm'}`}>
            Progression globale
          </span>
          <span className={`text-white font-medium ${isMobile ? 'text-sm' : 'text-sm'}`}>
            {user.completionPercentage}%
          </span>
        </div>
        <Progress 
          value={user.completionPercentage} 
          className={`bg-gray-800 ${isMobile ? 'h-2' : 'h-2'}`}
        />
      </div>
    </div>
  );
}