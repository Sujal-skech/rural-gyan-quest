import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Calculator, Atom, Globe, Trophy, Zap, Flame } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";
import heroImage from "@/assets/hero-education.jpg";

interface DashboardProps {
  playerName: string;
  playerClass: string;
  totalXP: number;
  currentLevel: number;
  learningStreak: number;
  onSubjectSelect: (subject: string) => void;
}

const subjects = [
  {
    id: "math",
    name: "Mathematics",
    icon: Calculator,
    progress: 75,
    nextTopic: "Quadratic Equations",
    xp: 1250,
    color: "bg-primary",
    lightColor: "bg-primary-light"
  },
  {
    id: "science",
    name: "Science",
    icon: Atom,
    progress: 60,
    nextTopic: "Chemical Reactions",
    xp: 950,
    color: "bg-secondary",
    lightColor: "bg-secondary-light"
  },
  {
    id: "english",
    name: "English",
    icon: BookOpen,
    progress: 85,
    nextTopic: "Grammar Rules",
    xp: 1450,
    color: "bg-accent",
    lightColor: "bg-yellow-100"
  },
  {
    id: "physics",
    name: "Physics",
    icon: Globe,
    progress: 40,
    nextTopic: "Motion and Forces",
    xp: 650,
    color: "bg-level",
    lightColor: "bg-purple-100"
  }
];

const achievements = [
  { name: "Math Master", description: "Complete 20 math lessons", icon: "🏆" },
  { name: "Science Explorer", description: "Discover 15 science concepts", icon: "🔬" },
  { name: "Problem Solver", description: "Solve 50 challenging problems", icon: "🧩" }
];

export default function Dashboard({ 
  playerName, 
  playerClass, 
  totalXP, 
  currentLevel, 
  learningStreak,
  onSubjectSelect 
}: DashboardProps) {
  return (
    <div className="min-h-screen space-y-6">
      {/* Hero Section */}
      <div 
        className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center bg-no-repeat rounded-b-3xl overflow-hidden"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white space-y-6 p-8">
          <AnimatedLogo size="lg" />
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">
              नमस्कार, {playerName}! 🙏
            </h2>
            <p className="text-xl md:text-2xl opacity-90">
              Class {playerClass} • Ready for your next adventure?
            </p>
            <Badge variant="secondary" className="text-lg px-6 py-2 bg-white/20 backdrop-blur-sm">
              7 Day Streak! 🔥
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="gradient-card shadow-card p-4 text-center">
            <Zap className="h-8 w-8 text-xp mx-auto mb-2" />
            <div className="text-2xl font-bold text-xp">{totalXP.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total XP</div>
          </Card>
          
          <Card className="gradient-card shadow-card p-4 text-center">
            <div className="text-2xl font-bold text-success">24/45</div>
            <div className="text-sm text-muted-foreground">Lessons Completed</div>
          </Card>
          
          <Card className="gradient-card shadow-card p-4 text-center">
            <Trophy className="h-8 w-8 text-level mx-auto mb-2" />
            <div className="text-2xl font-bold text-level">Level {currentLevel}</div>
            <div className="text-sm text-muted-foreground">Current Level</div>
          </Card>
          
          <Card className="gradient-card shadow-card p-4 text-center">
            <Flame className="h-8 w-8 text-streak mx-auto mb-2" />
            <div className="text-2xl font-bold text-streak">{learningStreak} Days</div>
            <div className="text-sm text-muted-foreground">Learning Streak</div>
          </Card>
        </div>

        {/* Subject Selection */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground">Choose Your Subject</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subjects.map((subject) => {
              const Icon = subject.icon;
              return (
                <Card 
                  key={subject.id} 
                  className="gradient-card shadow-card p-6 hover:shadow-elevated cursor-pointer transition-all duration-300 hover:scale-105"
                  onClick={() => onSubjectSelect(subject.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-full ${subject.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{subject.name}</h4>
                        <p className="text-sm text-muted-foreground">{subject.progress}% Complete</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-xp font-semibold">XP: {subject.xp}</div>
                      <Badge variant="outline" className="mt-1">
                        Next: {subject.nextTopic}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`${subject.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${subject.progress}%` }}
                    ></div>
                  </div>
                  
                  <Button 
                    className="w-full mt-4"
                    variant="hero"
                    size="lg"
                  >
                    Start Learning 🚀
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Achievements Section */}
        <Card className="gradient-card shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-6 w-6 text-xp" />
            <h3 className="text-xl font-bold">Achievements</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="text-center p-4 rounded-xl bg-success/10 border border-success/20"
              >
                <div className="text-2xl mb-2">{achievement.icon}</div>
                <div className="font-semibold text-success">{achievement.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Game Access */}
        <Card className="gradient-secondary text-white shadow-elevated p-6 text-center">
          <h3 className="text-xl font-bold mb-4">🐍 Snake Learning Game</h3>
          <p className="text-white/90 mb-4">
            Learn while playing! Answer questions to grow your snake.
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button 
              onClick={() => onSubjectSelect('snake-math')}
              variant="hero"
              size="lg"
            >
              🔢 Math Snake
            </Button>
            <Button 
              onClick={() => onSubjectSelect('snake-english')}
              variant="success"
              size="lg"
            >
              📚 English Snake
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}