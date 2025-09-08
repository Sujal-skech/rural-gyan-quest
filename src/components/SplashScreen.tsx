import { useEffect, useState } from "react";
import AnimatedLogo from "@/components/AnimatedLogo";
import LoadingSpinner from "@/components/LoadingSpinner";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500); // Small delay before transition
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <div className="space-y-8">
        <AnimatedLogo size="lg" />
        
        <div className="space-y-4">
          <p className="text-xl text-muted-foreground">
            Loading your learning adventure...
          </p>
          
          {/* Progress Bar */}
          <div className="w-64 mx-auto">
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="gradient-primary h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{progress}%</p>
          </div>
          
          <LoadingSpinner size="md" className="text-primary mx-auto" />
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            🌾 Bringing quality education to rural India
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by Lovable AI • Made with ❤️ for village kids
          </p>
        </div>
      </div>
    </div>
  );
}