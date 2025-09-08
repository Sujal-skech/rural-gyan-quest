import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AnimatedLogo from "@/components/AnimatedLogo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="gradient-card shadow-elevated p-8 text-center max-w-md w-full">
        <AnimatedLogo size="md" />
        <div className="mt-6 space-y-4">
          <h1 className="text-6xl font-bold text-destructive">404</h1>
          <h2 className="text-2xl font-bold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground">
            Oops! The page you're looking for doesn't exist. Let's get you back to learning!
          </p>
          <div className="flex gap-2 justify-center mt-6">
            <Button 
              onClick={() => window.location.href = "/"}
              variant="hero"
              size="lg"
            >
              🏠 Back to Home
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFound;
