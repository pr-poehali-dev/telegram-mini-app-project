import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { toast } from "sonner";

interface AddToDepositModalProps {
  open: boolean;
  onClose: () => void;
  depositId: number;
  depositName: string;
  availableBalance: number;
}

const AddToDepositModal = ({ open, onClose, depositId, depositName, availableBalance }: AddToDepositModalProps) => {
  const [amount, setAmount] = useState("");

  const handleAdd = () => {
    const amountValue = parseFloat(amount);
    
    if (!amount || amountValue <= 0) {
      toast.error("Введите корректную сумму");
      return;
    }

    if (amountValue > availableBalance) {
      toast.error("Недостаточно средств на балансе");
      return;
    }

    toast.success(`${amountValue.toFixed(2)} ₽ добавлено к депозиту`);
    setAmount("");
    onClose();
  };

  const handleMax = () => {
    setAmount(availableBalance.toFixed(2));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Plus" size={20} />
            Добавить к депозиту
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted/30 p-4 rounded-lg space-y-2">
            <p className="text-sm text-muted-foreground">Депозит</p>
            <p className="text-lg font-semibold">{depositName}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="add-amount">Сумма добавления</Label>
            <div className="relative">
              <Input
                id="add-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ₽
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between bg-muted/20 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="Wallet" size={16} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Доступно</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tabular-nums">
                {availableBalance.toFixed(2)} ₽
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMax}
                className="h-7 text-xs text-primary hover:text-primary/80"
              >
                Всё
              </Button>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/30 p-4 rounded-lg">
            <p className="text-xs text-muted-foreground flex items-start gap-2">
              <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0 text-primary" />
              <span>
                Добавленная сумма будет инвестирована по текущему тарифу депозита.
                Прибыль начнёт начисляться сразу после добавления.
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="h-12"
            >
              Отмена
            </Button>
            <Button
              onClick={handleAdd}
              className="h-12 bg-primary hover:bg-primary/90 font-semibold"
            >
              <Icon name="Plus" size={18} className="mr-2" />
              Добавить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddToDepositModal;
