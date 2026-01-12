import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { toast } from "sonner";

interface DepositModalProps {
  open: boolean;
  onClose: () => void;
}

const DepositModal = ({ open, onClose }: DepositModalProps) => {
  const [amount, setAmount] = useState("");
  const cardNumber = "2202 2063 7195 2847";
  const cryptoAddress = "TQn4Y7jLvZvQ7K2Jy8xRz9pXnW3Bb5mD4c";

  const handleCopyCard = () => {
    navigator.clipboard.writeText(cardNumber.replace(/\s/g, ""));
    toast.success("Номер карты скопирован!");
  };

  const handleCopyCrypto = () => {
    navigator.clipboard.writeText(cryptoAddress);
    toast.success("Адрес кошелька скопирован!");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="ArrowUpRight" size={20} />
            Пополнение баланса
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="card">
              <Icon name="CreditCard" size={16} className="mr-2" />
              Карта
            </TabsTrigger>
            <TabsTrigger value="crypto">
              <Icon name="Bitcoin" size={16} className="mr-2" />
              Криптовалюта
            </TabsTrigger>
          </TabsList>

          <TabsContent value="card" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Сумма пополнения</Label>
              <div className="relative">
                <Input
                  id="amount"
                  type="number"
                  placeholder="Введите сумму"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  ₽
                </span>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Номер карты</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyCard}
                  className="h-8"
                >
                  <Icon name="Copy" size={14} className="mr-1" />
                  Копировать
                </Button>
              </div>
              <div className="bg-card p-3 rounded border border-border">
                <code className="text-sm font-mono">{cardNumber}</code>
              </div>
              <p className="text-xs text-muted-foreground">
                Получатель: ИП Иванов Иван Иванович
              </p>
            </div>

            <div className="bg-primary/10 border border-primary/30 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground flex items-start gap-2">
                <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0" />
                <span>
                  После перевода напишите в поддержку @PassiveCapital_Support с суммой и
                  последними 4 цифрами карты для подтверждения
                </span>
              </p>
            </div>

            <Button className="w-full" size="lg" onClick={() => {
              toast.success("Инструкция отправлена! Ожидайте зачисления после перевода");
              onClose();
            }}>
              Я перевёл деньги
            </Button>
          </TabsContent>

          <TabsContent value="crypto" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="crypto-amount">Сумма пополнения</Label>
              <div className="relative">
                <Input
                  id="crypto-amount"
                  type="number"
                  placeholder="Введите сумму"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  USDT
                </span>
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Адрес кошелька (USDT TRC-20)</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyCrypto}
                  className="h-8"
                >
                  <Icon name="Copy" size={14} className="mr-1" />
                  Копировать
                </Button>
              </div>
              <div className="bg-card p-3 rounded border border-border break-all">
                <code className="text-xs font-mono">{cryptoAddress}</code>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/30 p-3 rounded-lg">
              <p className="text-xs text-muted-foreground flex items-start gap-2">
                <Icon name="Info" size={14} className="mt-0.5 flex-shrink-0" />
                <span>
                  Отправляйте только USDT в сети TRC-20. Минимальная сумма пополнения: 10 USDT
                </span>
              </p>
            </div>

            <Button 
              className="w-full" 
              size="lg"
              onClick={() => {
                window.open(`https://t.me/PassiveCapital_Support?text=Пополнил ${amount} USDT`, '_blank');
              }}
            >
              <Icon name="Send" size={18} className="mr-2" />
              Написать в поддержку
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default DepositModal;
