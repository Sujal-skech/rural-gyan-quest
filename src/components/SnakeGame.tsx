import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Home, RefreshCw } from "lucide-react";

interface Question {
  q: string;
  correct: string;
  options: string[];
}

interface SnakeGameProps {
  subject: 'math' | 'english';
  onBack: () => void;
  onHome: () => void;
}

const mathQuestions: Question[] = [
  { q: "2 + 3 = ?", correct: "5", options: ["4", "5", "6"] },
  { q: "7 - 4 = ?", correct: "3", options: ["3", "5", "6"] },
  { q: "6 × 2 = ?", correct: "12", options: ["10", "12", "14"] },
  { q: "15 ÷ 3 = ?", correct: "5", options: ["4", "5", "6"] },
  { q: "9 + 8 = ?", correct: "17", options: ["16", "17", "18"] },
  { q: "20 - 9 = ?", correct: "11", options: ["10", "11", "12"] },
  { q: "5 × 5 = ?", correct: "25", options: ["20", "25", "30"] },
  { q: "18 ÷ 2 = ?", correct: "9", options: ["8", "9", "10"] },
  { q: "12 + 15 = ?", correct: "27", options: ["25", "27", "29"] },
  { q: "30 - 14 = ?", correct: "16", options: ["15", "16", "18"] }
];

const englishQuestions: Question[] = [
  { q: "Plural of 'child'?", correct: "children", options: ["childs", "children", "childrens"] },
  { q: "Opposite of 'big'?", correct: "small", options: ["tiny", "small", "shorts"] },
  { q: "Past tense of 'go'?", correct: "went", options: ["goed", "gone", "went"] },
  { q: "Synonym of 'happy'?", correct: "glad", options: ["sad", "glad", "mad"] },
  { q: "Opposite of 'hot'?", correct: "cold", options: ["cool", "cold", "freeze"] },
  { q: "Plural of 'man'?", correct: "men", options: ["mans", "mens", "men"] },
  { q: "Past tense of 'eat'?", correct: "ate", options: ["eated", "ate", "eaten"] },
  { q: "Opposite of 'day'?", correct: "night", options: ["dark", "moon", "night"] },
  { q: "Synonym of 'fast'?", correct: "quick", options: ["slow", "quick", "speed"] },
  { q: "Opposite of 'up'?", correct: "down", options: ["down", "low", "fall"] }
];

export default function SnakeGame({ subject, onBack, onHome }: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'gameOver' | 'completed'>('waiting');
  const [snake, setSnake] = useState([{ x: 200, y: 200 }]);
  const [direction, setDirection] = useState<string | null>(null);
  const [foods, setFoods] = useState<Array<{value: string, x: number, y: number}>>([]);
  
  const BOX_SIZE = 20;
  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGHT = 400;
  const FOOD_WIDTH = BOX_SIZE * 3;
  const FOOD_HEIGHT = BOX_SIZE * 1.5;

  const questions = subject === 'math' ? mathQuestions : englishQuestions;
  const currentQuestion = questions[currentQuestionIndex];

  // Generate food positions
  const generateFoodBox = useCallback((existingFoods: typeof foods) => {
    let x, y, collisionDetected;
    do {
      x = Math.floor(Math.random() * ((CANVAS_WIDTH - FOOD_WIDTH) / BOX_SIZE)) * BOX_SIZE;
      y = Math.floor(Math.random() * ((CANVAS_HEIGHT - FOOD_HEIGHT) / BOX_SIZE)) * BOX_SIZE;
      
      collisionDetected = existingFoods.some(food => 
        x < food.x + FOOD_WIDTH &&
        x + FOOD_WIDTH > food.x &&
        y < food.y + FOOD_HEIGHT &&
        y + FOOD_HEIGHT > food.y
      );
    } while (collisionDetected);
    return { x, y };
  }, []);

  // Load question
  const loadQuestion = useCallback(() => {
    if (currentQuestionIndex >= questions.length) {
      setGameState('completed');
      return;
    }

    const newFoods = currentQuestion.options.map(option => {
      const pos = generateFoodBox([]);
      return { value: option, x: pos.x, y: pos.y };
    });
    
    // Ensure no overlapping foods
    for (let i = 1; i < newFoods.length; i++) {
      const pos = generateFoodBox(newFoods.slice(0, i));
      newFoods[i].x = pos.x;
      newFoods[i].y = pos.y;
    }
    
    setFoods(newFoods);
  }, [currentQuestionIndex, currentQuestion, generateFoodBox, questions.length]);

  // Game controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState !== 'playing' && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'a', 'w', 'd', 's'].includes(e.key)) {
        setGameState('playing');
      }

      if ((e.key === 'ArrowLeft' || e.key === 'a') && direction !== 'RIGHT') setDirection('LEFT');
      else if ((e.key === 'ArrowUp' || e.key === 'w') && direction !== 'DOWN') setDirection('UP');
      else if ((e.key === 'ArrowRight' || e.key === 'd') && direction !== 'LEFT') setDirection('RIGHT');
      else if ((e.key === 'ArrowDown' || e.key === 's') && direction !== 'UP') setDirection('DOWN');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameState]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const gameInterval = setInterval(() => {
      setSnake(prevSnake => {
        if (!direction) return prevSnake;

        const newSnake = [...prevSnake];
        const head = { ...newSnake[0] };

        // Move head
        switch (direction) {
          case 'LEFT': head.x -= BOX_SIZE; break;
          case 'UP': head.y -= BOX_SIZE; break;
          case 'RIGHT': head.x += BOX_SIZE; break;
          case 'DOWN': head.y += BOX_SIZE; break;
        }

        // Check wall collision
        if (head.x < 0 || head.y < 0 || head.x >= CANVAS_WIDTH || head.y >= CANVAS_HEIGHT) {
          setGameState('gameOver');
          return prevSnake;
        }

        // Check self collision
        if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameState('gameOver');
          return prevSnake;
        }

        // Check food collision
        let ateFood = false;
        for (const food of foods) {
          if (
            head.x < food.x + FOOD_WIDTH &&
            head.x + BOX_SIZE > food.x &&
            head.y < food.y + FOOD_HEIGHT &&
            head.y + BOX_SIZE > food.y
          ) {
            if (food.value === currentQuestion.correct) {
              setScore(prev => prev + 1);
              setCurrentQuestionIndex(prev => prev + 1);
              ateFood = true;
            } else {
              setGameState('gameOver');
              return prevSnake;
            }
            break;
          }
        }

        newSnake.unshift(head);
        if (!ateFood) {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(gameInterval);
  }, [gameState, direction, foods, currentQuestion]);

  // Load question when index changes
  useEffect(() => {
    if (gameState === 'playing' || gameState === 'waiting') {
      loadQuestion();
    }
  }, [currentQuestionIndex, loadQuestion, gameState]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#fff8dc';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#2e7d32' : '#66bb6a';
      ctx.fillRect(segment.x, segment.y, BOX_SIZE, BOX_SIZE);
      ctx.strokeStyle = '#fff';
      ctx.strokeRect(segment.x, segment.y, BOX_SIZE, BOX_SIZE);
    });

    // Draw food
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    foods.forEach(food => {
      ctx.fillStyle = '#f44336';
      ctx.fillRect(food.x, food.y, FOOD_WIDTH, FOOD_HEIGHT);
      
      const fontSize = food.value.length > 6 ? 12 : 16;
      ctx.font = `${fontSize}px Arial`;
      ctx.fillStyle = '#fff';
      ctx.fillText(food.value, food.x + FOOD_WIDTH / 2, food.y + FOOD_HEIGHT / 2);
    });

    // Draw instructions
    if (gameState === 'waiting') {
      ctx.fillStyle = 'black';
      ctx.font = '18px Arial';
      ctx.fillText('Press Arrow Keys or WASD to Start', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    }
  }, [snake, foods, gameState]);

  const restartGame = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setSnake([{ x: 200, y: 200 }]);
    setDirection(null);
    setGameState('waiting');
    setFoods([]);
  };

  return (
    <div className="min-h-screen p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-2xl font-bold text-primary">
          🐍 {subject === 'math' ? 'Math' : 'English'} Snake
        </h1>
        <Button onClick={onHome} variant="outline" className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          Home
        </Button>
      </div>

      {/* Game Status */}
      <Card className="gradient-card shadow-card p-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Badge variant="default" className="text-lg px-4 py-2">
              Score: {score}
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Level: {currentQuestionIndex + 1}/{questions.length}
            </Badge>
          </div>
          <Button onClick={restartGame} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Restart
          </Button>
        </div>
      </Card>

      {/* Question */}
      {currentQuestion && (
        <Card className="gradient-card shadow-card p-6 text-center">
          <h2 className="text-xl font-bold text-primary mb-2">
            Level {currentQuestionIndex + 1}: {currentQuestion.q}
          </h2>
          <p className="text-muted-foreground">
            Move your snake to eat the correct answer!
          </p>
        </Card>
      )}

      {/* Game Canvas */}
      <div className="flex justify-center">
        <Card className="p-4 shadow-elevated">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="border-4 border-primary rounded-lg bg-yellow-50"
          />
        </Card>
      </div>

      {/* Game Over Modal */}
      {gameState === 'gameOver' && (
        <Card className="gradient-card shadow-elevated p-6 text-center border-destructive">
          <h3 className="text-xl font-bold text-destructive mb-4">Game Over! 💥</h3>
          <p className="text-muted-foreground mb-4">
            Final Score: {score}/{questions.length}
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={restartGame} className="shadow-button">
              Try Again
            </Button>
            <Button onClick={onHome} variant="outline">
              Back to Home
            </Button>
          </div>
        </Card>
      )}

      {/* Completion Modal */}
      {gameState === 'completed' && (
        <Card className="gradient-card shadow-elevated p-6 text-center border-success">
          <h3 className="text-xl font-bold text-success mb-4">🎉 Congratulations!</h3>
          <p className="text-muted-foreground mb-4">
            Perfect Score: {score}/{questions.length}!
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={restartGame} className="shadow-button">
              Play Again
            </Button>
            <Button onClick={onHome} variant="outline">
              Back to Home
            </Button>
          </div>
        </Card>
      )}

      {/* Controls Help */}
      <Card className="gradient-card shadow-card p-4">
        <h4 className="font-semibold mb-2">Controls:</h4>
        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div>• Arrow Keys or WASD to move</div>
          <div>• Eat the correct answer to grow</div>
          <div>• Avoid walls and your tail</div>
          <div>• Complete all levels to win!</div>
        </div>
      </Card>
    </div>
  );
}