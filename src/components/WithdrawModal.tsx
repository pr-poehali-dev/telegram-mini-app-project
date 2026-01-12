import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { toast } from "sonner";

interface WithdrawModalProps {
  open: boolean;
  onClose: () => void;
  availableBalance: number;
}

const WithdrawModal = ({ open, onClose, availableBalance }: WithdrawModalProps) => {
  const [amount, setAmount] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Введите корректную сумму");
      return;
    }
    if (parseFloat(amount) > availableBalance) {
      toast.error("Недостаточно средств");
      return;
    }
    if (!cardNumber || cardNumber.length < 16) {
      toast.error("Введите корректный номер карты");
      return;
    }
    if (!cardHolder || cardHolder.length < 3) {
      toast.error("Введите имя держателя карты");
      return;
    }

    toast.success("Заявка на вывод создана! Ожидайте обработки в течение 24 часов");
    onClose();
    setAmount("");
    setCardNumber("");
    setCardHolder("");
  };

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="ArrowDownLeft" size={20} />
            Вывод средств
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Доступно к выводу</span>
              <span className="text-lg font-bold tabular-nums">{availableBalance.toFixed(2)} ₽</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="withdraw-amount">Сумма вывода</Label>
            <div className="relative">
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="Минимум 100 ₽"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ₽
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs"
              onClick={() => setAmount(availableBalance.toString())}
            >
              Вывести всё
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-number">Номер банковской карты</Label>
            <Input
              id="card-number"
              type="text"
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              value={formatCardNumber(cardNumber)}
              onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ""))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="card-holder">Имя держателя карты</Label>
            <Input
              id="card-holder"
              type="text"
              placeholder="IVAN IVANOV"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
            />
          </div>

          <div className="bg-primary/10 border border-primary/30 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground flex items-start gap-2">
              <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0" />
              <span>
                Комиссия за вывод: 0%. Минимальная сумма: 100 ₽. 
                Обработка заявки: 1-24 часа в рабочие дни.
              </span>
            </p>
          </div>

          <Button 
            className="w-full" 
            size="lg"
            onClick={handleWithdraw}
          >
            <Icon name="Send" size={18} className="mr-2" />
            Создать заявку на вывод
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WithdrawModal;
