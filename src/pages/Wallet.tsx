import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import DepositModal from "@/components/DepositModal";
import WithdrawModal from "@/components/WithdrawModal";
import AddCardModal from "@/components/AddCardModal";

const Wallet = () => {
  const availableBalance = 3.49;
  const deposited = 100.0;
  const withdrawn = 0.0;
  const pending = 0.0;
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [showAddCardModal, setShowAddCardModal] = useState(false);

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
        <Card className="bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground p-6 space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                <span className="text-xs font-medium flex items-center gap-1">
                  <Icon name="Wallet" size={14} />
                  ОСНОВНОЙ СЧЕТ
                </span>
              </div>
              <div className="px-2 py-1 rounded bg-yellow-400/30">
                <span className="text-xs">💳</span>
              </div>
            </div>

            <p className="text-sm opacity-80 mb-1">Доступно к выводу</p>
            <div className="text-5xl font-bold tabular-nums mb-4">
              {availableBalance.toFixed(2)} ₽
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                className="h-12 bg-white text-primary hover:bg-white/90 font-semibold shadow-lg"
                onClick={() => setShowDepositModal(true)}
              >
                <Icon name="ArrowUpRight" size={18} className="mr-2" />
                Пополнить
              </Button>
              <Button 
                className="h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 font-semibold"
                onClick={() => setShowWithdrawModal(true)}
              >
                <Icon name="ArrowDownLeft" size={18} className="mr-2" />
                Вывести
              </Button>
            </div>
          </div>
        </Card>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Финансы</h3>
          
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-4 text-center space-y-1">
              <p className="text-xs text-muted-foreground">Пополнено</p>
              <p className="text-lg font-bold tabular-nums">{deposited.toFixed(2)}</p>
            </Card>
            
            <Card className="p-4 text-center space-y-1">
              <p className="text-xs text-muted-foreground">Выведено</p>
              <p className="text-lg font-bold tabular-nums">{withdrawn.toFixed(2)}</p>
            </Card>
            
            <Card className="p-4 text-center space-y-1">
              <p className="text-xs text-muted-foreground">Ожидание</p>
              <p className="text-lg font-bold tabular-nums">{pending.toFixed(2)}</p>
            </Card>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Реквизиты</h3>
            <Button variant="ghost" size="sm" className="h-8">
              <Icon name="CreditCard" size={16} className="mr-1" />
            </Button>
          </div>
          
          <Card className="p-5 border-dashed border-2 border-border/50">
            <div className="text-center py-4 space-y-2">
              <Icon name="CreditCard" size={32} className="mx-auto text-muted-foreground opacity-50" />
              <p className="text-sm text-muted-foreground">Нет сохранённых счетов</p>
              <Button 
                variant="outline" 
                size="sm"
                className="mt-3"
                onClick={() => setShowAddCardModal(true)}
              >
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить новый метод
              </Button>
            </div>
          </Card>
        </div>
      </main>

      <DepositModal open={showDepositModal} onClose={() => setShowDepositModal(false)} />
      <WithdrawModal 
        open={showWithdrawModal} 
        onClose={() => setShowWithdrawModal(false)}
        availableBalance={availableBalance}
      />
      <AddCardModal open={showAddCardModal} onClose={() => setShowAddCardModal(false)} />
    </div>
  );
};

export default Wallet;