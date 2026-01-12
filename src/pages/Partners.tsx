import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { toast } from "sonner";

const Partners = () => {
  const referralLink = "https://t.me/pasivInvst";
  const [copied, setCopied] = useState(false);

  const stats = {
    total: 0,
    active: 0,
    income: 0,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Ссылка скопирована!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button className="text-foreground/80 hover:text-foreground transition-colors">
            Закрыть
          </button>
          <div className="text-center">
            <h1 className="font-semibold text-lg">Passive Capital</h1>
            <p className="text-xs text-muted-foreground">мини-приложение</p>
          </div>
          <button className="text-foreground/80 hover:text-foreground transition-colors">
            <Icon name="MoreVertical" size={20} />
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-6 animate-fade-in">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Icon name="Users" size={24} className="text-secondary" />
            <h2 className="text-2xl font-bold">Партнерская программа</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Приглашайте друзей и зарабатывайте
          </p>
        </div>

        <Card className="bg-gradient-to-br from-secondary/30 via-secondary/20 to-secondary/10 border-secondary/40 p-6 text-center space-y-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center shadow-lg">
              <span className="text-4xl">25%</span>
            </div>
            
            <h3 className="text-2xl font-bold mb-2">Ваш доход от партнеров</h3>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Получайте 25% от каждого депозита ваших рефералов мгновенно на баланс.
            </p>
          </div>
        </Card>

        <div className="space-y-3">
          <Card className="p-4 flex items-center justify-between bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center">
                <Icon name="Users" size={20} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">ВСЕГО</p>
                <p className="text-lg font-bold tabular-nums">{stats.total}</p>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card className="p-4 text-center space-y-1">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Icon name="UserCheck" size={16} className="text-success" />
                <p className="text-xs text-muted-foreground">АКТИВНЫХ</p>
              </div>
              <p className="text-xl font-bold tabular-nums">{stats.active}</p>
            </Card>

            <Card className="p-4 text-center space-y-1">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Icon name="Wallet" size={16} className="text-primary" />
                <p className="text-xs text-muted-foreground">ДОХОД</p>
              </div>
              <p className="text-xl font-bold tabular-nums">{stats.income} ₽</p>
            </Card>
          </div>
        </div>

        <div className="space-y-3">
          <Card className="p-4 bg-card space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Ваша реферальная ссылка</p>
              <Icon name="Link" size={16} className="text-muted-foreground" />
            </div>
            
            <div className="bg-muted/50 p-3 rounded-lg border border-border">
              <code className="text-xs text-foreground/80 break-all font-mono">
                {referralLink}
              </code>
            </div>

            <Button 
              onClick={handleCopy}
              className="w-full h-12 bg-primary hover:bg-primary/90 font-semibold"
            >
              {copied ? (
                <>
                  <Icon name="Check" size={18} className="mr-2" />
                  Скопировано!
                </>
              ) : (
                <>
                  <Icon name="Copy" size={18} className="mr-2" />
                  Скопировать ссылку
                </>
              )}
            </Button>
          </Card>

          <Button 
            className="w-full h-12 bg-secondary hover:bg-secondary/90 font-semibold"
            size="lg"
            onClick={() => {
              const text = `Присоединяйся к Passive Capital и получай пассивный доход!\n${referralLink}`;
              if (navigator.share) {
                navigator.share({ title: 'Passive Capital', text });
              } else {
                window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Присоединяйся к Passive Capital и получай пассивный доход!')}`, '_blank');
              }
            }}
          >
            <Icon name="Share2" size={18} className="mr-2" />
            Пригласить друзей
          </Button>
        </div>

        <Card className="p-5 border-dashed border-2 border-border/50">
          <div className="text-center py-6 space-y-2">
            <Icon name="Users" size={40} className="mx-auto text-muted-foreground opacity-50 mb-3" />
            <p className="font-semibold">Партнеры не найдены</p>
            <p className="text-sm text-muted-foreground max-w-xs mx-auto">
              Поделитесь ссылкой с друзьями, чтобы начать зарабатывать
            </p>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Partners;