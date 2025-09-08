import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { WifiOff, Wifi } from "lucide-react";

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowOfflineMessage(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowOfflineMessage(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!showOfflineMessage && isOnline) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-bounce-gentle">
      <Badge 
        variant={isOnline ? "secondary" : "destructive"}
        className="flex items-center gap-2 px-3 py-2 shadow-elevated"
      >
        {isOnline ? (
          <>
            <Wifi className="h-4 w-4" />
            Back Online!
          </>
        ) : (
          <>
            <WifiOff className="h-4 w-4" />
            Offline Mode
          </>
        )}
      </Badge>
    </div>
  );
}