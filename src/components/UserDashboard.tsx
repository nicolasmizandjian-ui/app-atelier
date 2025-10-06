import React from 'react';
import { ModuleCard } from './ModuleCard';
import { MemberSpace } from './MemberSpace';
import { LivePage } from './LivePage';
import { CATEGORY_TITLES, CategoryKey } from '../constants/categories';

interface UserDashboardProps {
  activeCategory: string;
  modules: any[];
  onModuleClick: (moduleId: string) => void;
  liveSession?: any;
  isLiveActive?: boolean;
  isMobile?: boolean;
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

export function UserDashboard({ 
  activeCategory, 
  modules, 
  onModuleClick, 
  liveSession, 
  isLiveActive = false,
  isMobile = false,
  breakpoint = 'desktop'
}: UserDashboardProps) {
  const filteredModules = activeCategory === 'dashboard' 
    ? modules 
    : modules.filter(module => module.category === activeCategory);

  const getGridCols = () => {
    switch (breakpoint) {
      case 'mobile':
        return 'grid-cols-1';
      case 'tablet':
        return 'grid-cols-1 sm:grid-cols-2';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  const getSpacing = () => {
    switch (breakpoint) {
      case 'mobile':
        return { container: 'space-y-4', grid: 'gap-4', section: 'mt-6' };
      case 'tablet':
        return { container: 'space-y-5', grid: 'gap-5', section: 'mt-7' };
      default:
        return { container: 'space-y-6', grid: 'gap-6', section: 'mt-8' };
    }
  };

  const spacing = getSpacing();

  if (activeCategory === 'dashboard') {
    return (
      <div className={spacing.container}>
        {/* Tous les modules */}
        <div>
          <h2 className={`text-white mb-4 font-semibold ${
            isMobile ? 'text-lg' : 'text-xl'
          }`}>
            Tous les modules
          </h2>
          <div className={`grid ${getGridCols()} ${spacing.grid}`}>
            {modules.map((module) => (
              <ModuleCard 
                key={module.id} 
                module={module} 
                onModuleClick={onModuleClick}
                isMobile={isMobile}
                breakpoint={breakpoint}
              />
            ))}
          </div>
        </div>

        {/* Espace membre */}
        <div className={spacing.section}>
          <h2 className={`text-white mb-4 font-semibold ${
            isMobile ? 'text-lg' : 'text-xl'
          }`}>
            Mon espace membre
          </h2>
          <MemberSpace 
            isMobile={isMobile}
            breakpoint={breakpoint}
          />
        </div>
      </div>
    );
  }

  if (activeCategory === 'live') {
    return (
      <LivePage
        liveSession={liveSession}
        isLiveActive={isLiveActive}
        isMobile={isMobile}
        breakpoint={breakpoint}
      />
    );
  }

  return (
    <div className={spacing.container}>
      <div>
        <h2 className={`text-white mb-4 font-semibold ${
          isMobile ? 'text-lg' : 'text-xl'
        }`}>
          {CATEGORY_TITLES[activeCategory as CategoryKey] || 'Modules'}
        </h2>
        <div className={`grid ${getGridCols()} ${spacing.grid}`}>
          {filteredModules.map((module) => (
            <ModuleCard 
              key={module.id} 
              module={module} 
              onModuleClick={onModuleClick}
              isMobile={isMobile}
              breakpoint={breakpoint}
            />
          ))}
        </div>
      </div>
    </div>
  );
}