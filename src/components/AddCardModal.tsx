import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { toast } from "sonner";

interface AddCardModalProps {
  open: boolean;
  onClose: () => void;
}

const AddCardModal = ({ open, onClose }: AddCardModalProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, "");
    const chunks = cleaned.match(/.{1,4}/g);
    return chunks ? chunks.join(" ") : cleaned;
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleSave = () => {
    if (!cardNumber || cardNumber.length < 16) {
      toast.error("Введите корректный номер карты");
      return;
    }
    if (!cardHolder || cardHolder.length < 3) {
      toast.error("Введите имя держателя карты");
      return;
    }
    if (!expiryDate || expiryDate.length < 5) {
      toast.error("Введите срок действия карты");
      return;
    }

    toast.success("Карта успешно добавлена!");
    onClose();
    setCardNumber("");
    setCardHolder("");
    setExpiryDate("");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="CreditCard" size={20} />
            Добавить банковскую карту
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Icon name="CreditCard" size={32} className="text-primary" />
              <span className="text-xs text-muted-foreground">БАНКОВСКАЯ КАРТА</span>
            </div>
            <div className="text-2xl font-mono font-bold tracking-wider">
              {formatCardNumber(cardNumber) || "•••• •••• •••• ••••"}
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Держатель</p>
                <p className="font-medium">{cardHolder || "CARDHOLDER NAME"}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Действительна</p>
                <p className="font-medium">{expiryDate || "MM/YY"}</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-card-number">Номер карты</Label>
            <Input
              id="new-card-number"
              type="text"
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              value={formatCardNumber(cardNumber)}
              onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, ""))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="new-card-holder">Имя держателя карты</Label>
            <Input
              id="new-card-holder"
              type="text"
              placeholder="IVAN IVANOV"
              value={cardHolder}
              onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiry-date">Срок действия</Label>
            <Input
              id="expiry-date"
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              value={expiryDate}
              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
            />
          </div>

          <div className="bg-muted/30 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground flex items-start gap-2">
              <Icon name="Lock" size={14} className="mt-0.5 flex-shrink-0" />
              <span>
                Данные вашей карты хранятся в зашифрованном виде и используются только для вывода средств
              </span>
            </p>
          </div>

          <Button 
            className="w-full" 
            size="lg"
            onClick={handleSave}
          >
            <Icon name="Check" size={18} className="mr-2" />
            Сохранить карту
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCardModal;
