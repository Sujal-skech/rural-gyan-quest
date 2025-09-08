import { BookOpen } from "lucide-react";

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function AnimatedLogo({ size = 'md', showText = true }: AnimatedLogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16'
  };

  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-4xl',
    lg: 'text-6xl'
  };

  return (
    <div className="flex items-center justify-center gap-3 animate-bounce-gentle">
      <div className="relative">
        <BookOpen className={`${sizeClasses[size]} text-primary animate-pulse-slow`} />
        <div className="absolute -top-1 -right-1 text-xs">
          📚
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizeClasses[size]} font-bold text-primary`}>
            EduQuest
          </h1>
          <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
            गांव में शिक्षा
          </p>
        </div>
      )}
    </div>
  );
}