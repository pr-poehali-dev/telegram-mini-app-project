import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import CalculatorModal from "@/components/CalculatorModal";
import AddToDepositModal from "@/components/AddToDepositModal";

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState<"active" | "completed">("active");
  const [totalInvested] = useState(0);
  const [activeCount] = useState(0);
  const [dailyIncome] = useState(0);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showAddToDeposit, setShowAddToDeposit] = useState(false);
  const availableBalance = 0;

  const activeTariff = activeCount > 0 ? {
    id: 1,
    name: "Тариф 9.60%",
    rate: 9.6,
    invested: 100.0,
    currentProfit: 3.5,
    endDate: "12.01.2027",
    progress: 0.1,
    nextAccrual: "31 сек",
  } : null;

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
        <Card className="bg-card border-border p-6 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground uppercase mb-1">Всего вложено</p>
              <p className="text-xl font-bold tabular-nums">{totalInvested.toFixed(2)} ₽</p>
            </div>
            <div className="border-x border-border/50 px-4">
              <p className="text-xs text-muted-foreground uppercase mb-1">Активных</p>
              <p className="text-xl font-bold tabular-nums">{activeCount}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase mb-1">Доход в сутки</p>
              <p className="text-xl font-bold text-success tabular-nums">+{dailyIncome.toFixed(2)} ₽</p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/20 to-secondary/5 border-secondary/30 p-5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-secondary/30 flex items-center justify-center">
              <Icon name="TrendingUp" size={24} className="text-secondary" />
            </div>
            <div>
              <h3 className="font-semibold text-base">Повышенная ставка 11% в день</h3>
              <p className="text-xs text-muted-foreground">Действует для депозитов от 100 000 ₽</p>
            </div>
          </div>
        </Card>

        <Card 
          className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 p-5 space-y-3 cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => setShowCalculator(true)}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/30 flex items-center justify-center">
              <Icon name="Calculator" size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-base">Калькулятор доходности</h3>
              <p className="text-xs text-muted-foreground">Рассчитайте свою прибыль</p>
            </div>
            <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
          </div>
        </Card>

        <div className="flex gap-2 bg-muted/30 p-1 rounded-xl">
          <button
            onClick={() => setActiveFilter("active")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeFilter === "active"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Активные
          </button>
          <button
            onClick={() => setActiveFilter("completed")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeFilter === "completed"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Завершенные
          </button>
        </div>

        {activeFilter === "active" ? (
          activeTariff ? (
            <Card className="bg-card border-border p-5 space-y-4 hover:border-primary/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Icon name="Zap" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">{activeTariff.name}</h3>
                    <p className="text-xs text-muted-foreground">
                      <Icon name="Clock" size={12} className="inline mr-1" />
                      До {activeTariff.endDate}
                    </p>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-success/20 text-success text-xs font-medium">
                  В работе
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3 border-y border-border/50">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Текущая прибыль</p>
                  <p className="text-lg font-bold text-success tabular-nums">
                    +{activeTariff.currentProfit.toFixed(2)} ₽
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Вклад</p>
                  <p className="text-lg font-bold tabular-nums">{activeTariff.invested.toFixed(2)} ₽</p>
                </div>
              </div>

              <Button 
                className="w-full h-12 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 font-semibold"
                onClick={() => setShowAddToDeposit(true)}
              >
                <Icon name="Plus" size={18} className="mr-2" />
                Добавить к депозиту
              </Button>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Прогресс срока</span>
                  <span className="font-medium">{(activeTariff.progress * 100).toFixed(2)}%</span>
                </div>
                <Progress value={activeTariff.progress * 100} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} className="inline mr-1" />
                  След. начисление через: {activeTariff.nextAccrual}
                </p>
              </div>
            </Card>
          ) : (
            <div className="text-center py-12">
              <Icon name="Briefcase" size={48} className="mx-auto text-muted-foreground mb-3 opacity-50" />
              <p className="text-muted-foreground">Нет активных депозитов</p>
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <Icon name="Archive" size={48} className="mx-auto text-muted-foreground mb-3 opacity-50" />
            <p className="text-muted-foreground">Нет завершенных депозитов</p>
          </div>
        )}
      </main>

      <CalculatorModal open={showCalculator} onClose={() => setShowCalculator(false)} />
      {activeTariff && (
        <AddToDepositModal 
          open={showAddToDeposit} 
          onClose={() => setShowAddToDeposit(false)}
          depositId={activeTariff.id}
          depositName={activeTariff.name}
          availableBalance={availableBalance}
        />
      )}
    </div>
  );
};

export default Portfolio;