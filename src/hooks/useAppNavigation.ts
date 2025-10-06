import { useState } from 'react';

export function useAppNavigation() {
  const [activeCategory, setActiveCategory] = useState('dashboard');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'dashboard' | 'module' | 'video' | 'certificates' | 'services' | 'module-page'>('dashboard');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminSection, setAdminSection] = useState('dashboard');

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSelectedModule(null);
    setSelectedLesson(null);
    
    if (category === 'certificates') {
      setCurrentView('certificates');
    } else if (category === 'services') {
      setCurrentView('services');
    } else if (category === 'dashboard') {
      setCurrentView('dashboard');
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(moduleId);
    // Utiliser la nouvelle page de module pour certains modules spécifiques
    const detailedModuleIds = ['ecommerce', 'ads', 'seo', 'ia', 'branding', 'copywriting', 'analytics'];
    if (detailedModuleIds.includes(moduleId) || ['1', '2', '3', '4', '5', '6', '7'].includes(moduleId)) {
      setCurrentView('module-page');
    } else {
      setCurrentView('module');
    }
  };

  const handleModulePageLessonStart = (lessonId: string) => {
    setSelectedLesson(lessonId);
    setCurrentView('video');
  };

  const handleLessonStart = (moduleId: string, lessonId: string) => {
    setSelectedModule(moduleId);
    setSelectedLesson(lessonId);
    setCurrentView('video');
  };

  const handleLessonChange = (lessonId: string) => {
    setSelectedLesson(lessonId);
  };

  const handleBackToModules = () => {
    setSelectedModule(null);
    setSelectedLesson(null);
    setCurrentView('dashboard');
  };

  const handleBackToModule = () => {
    setSelectedLesson(null);
    setCurrentView('module');
  };

  const handleAccessAdmin = () => {
    setIsAdminMode(true);
    setAdminSection('dashboard');
  };

  const handleBackToUser = () => {
    setIsAdminMode(false);
    setActiveCategory('dashboard');
    setCurrentView('dashboard');
  };

  const handleAdminSectionChange = (section: string) => {
    setAdminSection(section);
  };

  return {
    // State
    activeCategory,
    selectedModule,
    selectedLesson,
    currentView,
    isAdminMode,
    adminSection,
    // Handlers
    handleCategoryChange,
    handleModuleClick,
    handleLessonStart,
    handleLessonChange,
    handleBackToModules,
    handleBackToModule,
    handleAccessAdmin,
    handleBackToUser,
    handleAdminSectionChange,
    handleModulePageLessonStart
  };
}