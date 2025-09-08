import { useState, useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import SnakeGame from "@/components/SnakeGame";
import SplashScreen from "@/components/SplashScreen";
import OfflineIndicator from "@/components/OfflineIndicator";

type GameMode = 'splash' | 'dashboard' | 'snake-math' | 'snake-english' | 'math' | 'science' | 'english' | 'physics';

const Index = () => {
  const [currentMode, setCurrentMode] = useState<GameMode>('splash');
  
  // Sample student data - in real app this would come from a database
  const studentData = {
    name: "Priya Patel",
    class: "8",
    totalXP: 2850,
    currentLevel: 12,
    learningStreak: 7
  };

  const handleSplashComplete = () => {
    setCurrentMode('dashboard');
  };

  const handleSubjectSelect = (subject: string) => {
    setCurrentMode(subject as GameMode);
  };

  const handleBackToDashboard = () => {
    setCurrentMode('dashboard');
  };

  const renderCurrentMode = () => {
    switch (currentMode) {
      case 'splash':
        return <SplashScreen onComplete={handleSplashComplete} />;
      case 'snake-math':
        return (
          <SnakeGame 
            subject="math" 
            onBack={handleBackToDashboard}
            onHome={handleBackToDashboard}
          />
        );
      case 'snake-english':
        return (
          <SnakeGame 
            subject="english" 
            onBack={handleBackToDashboard}
            onHome={handleBackToDashboard}
          />
        );
      case 'dashboard':
      default:
        return (
          <Dashboard
            playerName={studentData.name}
            playerClass={studentData.class}
            totalXP={studentData.totalXP}
            currentLevel={studentData.currentLevel}
            learningStreak={studentData.learningStreak}
            onSubjectSelect={handleSubjectSelect}
          />
        );
    }
  };

  return (
    <>
      <main className="min-h-screen">
        {renderCurrentMode()}
      </main>
      <OfflineIndicator />
    </>
  );
};

export default Index;
