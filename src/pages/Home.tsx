import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";
import DepositModal from "@/components/DepositModal";

const Home = () => {
  const [balance, setBalance] = useState(0);
  const [profit24h, setProfit24h] = useState(0);
  const [partners] = useState(0);
  const [withdrawn] = useState(0);
  const [showDepositModal, setShowDepositModal] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const increment = 0.01;
      setBalance((prev) => parseFloat((prev + increment).toFixed(2)));
      setProfit24h((prev) => parseFloat((prev + increment).toFixed(2)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button className="text-foreground/80 hover:text-foreground transition-colors">
            Закрыть
          </button>
          <div className="text-center">
            <h1 className="font-semibold text-lg">Passive Invest</h1>
            <p className="text-xs text-muted-foreground">мини-приложение</p>
          </div>
          <button className="text-foreground/80 hover:text-foreground transition-colors">
            <Icon name="MoreVertical" size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6 animate-fade-in">
        <Card className="bg-gradient-to-br from-card via-card to-primary/10 border-primary/20 p-6 space-y-4 animate-slide-up">
          <h2 className="text-sm text-muted-foreground uppercase tracking-wide">
            Баланс активов
          </h2>
          <div className="text-5xl font-bold tabular-nums">
            {balance.toFixed(2)} ₽
          </div>
          
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-success mb-1">
                <Icon name="TrendingUp" size={16} />
                <span className="text-lg font-semibold">+{profit24h.toFixed(2)}</span>
              </div>
              <p className="text-xs text-muted-foreground">Прибыль 24ч</p>
            </div>
            
            <div className="text-center border-x border-border/50">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Icon name="Users" size={16} />
                <span className="text-lg font-semibold">{partners}</span>
              </div>
              <p className="text-xs text-muted-foreground">Партнеры</p>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Icon name="ArrowDownLeft" size={16} />
                <span className="text-lg font-semibold">{withdrawn}</span>
              </div>
              <p className="text-xs text-muted-foreground">Выведено</p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Button 
            className="h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base"
            size="lg"
            onClick={() => setShowDepositModal(true)}
          >
            <Icon name="ArrowUpRight" size={20} className="mr-2" />
            Пополнить баланс
          </Button>
          
          <Button 
            className="h-14 bg-card hover:bg-muted border border-border font-semibold text-base"
            variant="outline"
            size="lg"
            onClick={() => window.open('https://t.me/pasivInvst', '_blank')}
          >
            <Icon name="MessageCircle" size={20} className="mr-2" />
            Перейти на форум
          </Button>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">История операций</h3>
          
          <div className="text-center py-12">
            <Icon name="History" size={48} className="mx-auto text-muted-foreground mb-3 opacity-50" />
            <p className="text-muted-foreground">История операций пуста</p>
          </div>
        </div>
      </main>

      <DepositModal open={showDepositModal} onClose={() => setShowDepositModal(false)} />
    </div>
  );
};

export default Home;