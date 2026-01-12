import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState, useEffect } from "react";

interface CalculatorModalProps {
  open: boolean;
  onClose: () => void;
}

const CalculatorModal = ({ open, onClose }: CalculatorModalProps) => {
  const [amount, setAmount] = useState("10000");
  const [days, setDays] = useState("30");

  const baseRate = 9.6;
  const premiumRate = 11.4;
  const premiumThreshold = 100000;

  const calculateProfit = () => {
    const investAmount = parseFloat(amount) || 0;
    const period = parseInt(days) || 0;
    const rate = investAmount >= premiumThreshold ? premiumRate : baseRate;
    
    const dailyProfit = (investAmount * rate) / 100 / 365;
    const totalProfit = dailyProfit * period;
    const totalAmount = investAmount + totalProfit;

    return {
      rate,
      dailyProfit,
      totalProfit,
      totalAmount,
      isPremium: investAmount >= premiumThreshold,
    };
  };

  const result = calculateProfit();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Calculator" size={20} />
            Калькулятор доходности
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="calc-amount">Сумма инвестиции</Label>
            <div className="relative">
              <Input
                id="calc-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ₽
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="calc-days">Срок инвестиции</Label>
            <div className="relative">
              <Input
                id="calc-days"
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                className="pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                дней
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setDays("30")}
              className="py-2 px-3 rounded-lg border border-border hover:bg-muted text-sm transition-colors"
            >
              30 дней
            </button>
            <button
              onClick={() => setDays("90")}
              className="py-2 px-3 rounded-lg border border-border hover:bg-muted text-sm transition-colors"
            >
              90 дней
            </button>
            <button
              onClick={() => setDays("365")}
              className="py-2 px-3 rounded-lg border border-border hover:bg-muted text-sm transition-colors"
            >
              1 год
            </button>
          </div>

          {result.isPremium && (
            <Card className="bg-secondary/10 border-secondary/30 p-3">
              <p className="text-xs flex items-center gap-2">
                <Icon name="TrendingUp" size={14} className="text-secondary" />
                <span className="text-secondary font-medium">
                  Повышенная ставка {premiumRate}% активна!
                </span>
              </p>
            </Card>
          )}

          <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-primary/20">
              <span className="text-sm text-muted-foreground">Годовая ставка</span>
              <span className="text-xl font-bold text-primary">{result.rate}%</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Прибыль в день</span>
                <span className="text-lg font-bold text-success tabular-nums">
                  +{result.dailyProfit.toFixed(2)} ₽
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Прибыль за {days} дней</span>
                <span className="text-lg font-bold text-success tabular-nums">
                  +{result.totalProfit.toFixed(2)} ₽
                </span>
              </div>

              <div className="pt-3 border-t border-primary/20 flex items-center justify-between">
                <span className="text-sm font-medium">Итого к получению</span>
                <span className="text-2xl font-bold tabular-nums">
                  {result.totalAmount.toFixed(2)} ₽
                </span>
              </div>
            </div>
          </div>

          <div className="bg-muted/30 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground flex items-start gap-2">
              <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0" />
              <span>
                Расчёт примерный. Реальная доходность зависит от времени создания депозита и
                рыночных условий.
              </span>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CalculatorModal;
