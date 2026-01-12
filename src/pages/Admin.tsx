import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { toast } from "sonner";

const Admin = () => {
  const [users] = useState([
    { id: 1, telegramId: 123456789, balance: 1245.50, deposited: 5000, referrals: 3, status: "active" },
    { id: 2, telegramId: 987654321, balance: 0, deposited: 0, referrals: 0, status: "inactive" },
  ]);

  const [deposits] = useState([
    { id: 1, userId: 1, amount: 5000, profit: 1245.50, rate: 10, startDate: "10.01.2026", status: "active" },
  ]);

  const [withdrawals] = useState([
    { id: 1, userId: 1, amount: 1000, cardNumber: "2202 **** **** 2847", status: "pending", date: "12.01.2026" },
  ]);

  const [stats] = useState({
    totalUsers: 42,
    activeDeposits: 15,
    totalDeposited: 850000,
    totalWithdrawn: 12500,
    pendingWithdrawals: 2,
    referralEarnings: 5600,
  });

  const [searchTelegram, setSearchTelegram] = useState("");

  const handleApproveWithdrawal = (id: number) => {
    toast.success(`Вывод #${id} одобрен`);
  };

  const handleRejectWithdrawal = (id: number) => {
    toast.error(`Вывод #${id} отклонён`);
  };

  const handleBlockUser = (id: number) => {
    toast.info(`Пользователь #${id} заблокирован`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-40 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-destructive" />
            </div>
            <div>
              <h1 className="font-bold text-xl">Админ-панель</h1>
              <p className="text-xs text-muted-foreground">Управление платформой</p>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <Icon name="LogOut" size={18} className="mr-2" />
            Выйти
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Всего пользователей</p>
              <Icon name="Users" size={18} className="text-primary" />
            </div>
            <p className="text-3xl font-bold tabular-nums">{stats.totalUsers}</p>
          </Card>

          <Card className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Активных депозитов</p>
              <Icon name="TrendingUp" size={18} className="text-success" />
            </div>
            <p className="text-3xl font-bold tabular-nums">{stats.activeDeposits}</p>
          </Card>

          <Card className="p-5 space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">На выводе</p>
              <Icon name="Clock" size={18} className="text-yellow-500" />
            </div>
            <p className="text-3xl font-bold tabular-nums">{stats.pendingWithdrawals}</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5 space-y-2">
            <p className="text-sm text-muted-foreground">Всего пополнено</p>
            <p className="text-2xl font-bold tabular-nums text-primary">
              {stats.totalDeposited.toLocaleString()} ₽
            </p>
          </Card>

          <Card className="p-5 space-y-2">
            <p className="text-sm text-muted-foreground">Всего выведено</p>
            <p className="text-2xl font-bold tabular-nums text-destructive">
              {stats.totalWithdrawn.toLocaleString()} ₽
            </p>
          </Card>

          <Card className="p-5 space-y-2">
            <p className="text-sm text-muted-foreground">Реф. доходы</p>
            <p className="text-2xl font-bold tabular-nums text-secondary">
              {stats.referralEarnings.toLocaleString()} ₽
            </p>
          </Card>
        </div>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Icon name="AlertCircle" size={22} className="text-yellow-500" />
              Ожидают вывода
            </h2>
            <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-500 text-sm font-medium">
              {withdrawals.filter(w => w.status === "pending").length} заявок
            </span>
          </div>

          <div className="space-y-3">
            {withdrawals.filter(w => w.status === "pending").map((withdrawal) => (
              <Card key={withdrawal.id} className="p-4 border-yellow-500/30">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">User ID: {withdrawal.userId}</span>
                      <span className="px-2 py-0.5 rounded bg-muted text-xs">
                        {withdrawal.date}
                      </span>
                    </div>
                    <p className="text-lg font-bold tabular-nums">{withdrawal.amount.toFixed(2)} ₽</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Icon name="CreditCard" size={14} />
                      {withdrawal.cardNumber}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleRejectWithdrawal(withdrawal.id)}
                    >
                      <Icon name="X" size={16} className="mr-1" />
                      Отклонить
                    </Button>
                    <Button
                      size="sm"
                      className="bg-success hover:bg-success/90"
                      onClick={() => handleApproveWithdrawal(withdrawal.id)}
                    >
                      <Icon name="Check" size={16} className="mr-1" />
                      Одобрить
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Icon name="Users" size={22} className="text-primary" />
              Пользователи
            </h2>
            <div className="relative w-64">
              <Input
                placeholder="Telegram ID..."
                value={searchTelegram}
                onChange={(e) => setSearchTelegram(e.target.value)}
                className="pr-10"
              />
              <Icon name="Search" size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Telegram ID</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Баланс</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Депозиты</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Рефералы</th>
                  <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Статус</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Действия</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border/50 hover:bg-muted/20">
                    <td className="py-4 px-4 text-sm">{user.id}</td>
                    <td className="py-4 px-4 text-sm font-mono">{user.telegramId}</td>
                    <td className="py-4 px-4 text-right font-semibold tabular-nums">
                      {user.balance.toFixed(2)} ₽
                    </td>
                    <td className="py-4 px-4 text-right tabular-nums text-muted-foreground">
                      {user.deposited.toFixed(2)} ₽
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="px-2 py-1 rounded bg-secondary/20 text-secondary text-xs font-medium">
                        {user.referrals}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      {user.status === "active" ? (
                        <span className="px-2 py-1 rounded bg-success/20 text-success text-xs font-medium">
                          Активен
                        </span>
                      ) : (
                        <span className="px-2 py-1 rounded bg-muted text-muted-foreground text-xs font-medium">
                          Неактивен
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleBlockUser(user.id)}
                      >
                        <Icon name="Ban" size={16} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Icon name="Briefcase" size={22} className="text-success" />
            Активные депозиты
          </h2>

          <div className="space-y-3">
            {deposits.map((deposit) => (
              <Card key={deposit.id} className="p-4 bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">User ID: {deposit.userId}</span>
                      <span className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs font-medium">
                        {deposit.rate}% в день
                      </span>
                      <span className="px-2 py-0.5 rounded bg-muted text-xs">
                        с {deposit.startDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-xs text-muted-foreground">Вклад</p>
                        <p className="text-lg font-bold tabular-nums">{deposit.amount.toFixed(2)} ₽</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Прибыль</p>
                        <p className="text-lg font-bold tabular-nums text-success">
                          +{deposit.profit.toFixed(2)} ₽
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-success/20 text-success text-sm font-medium">
                    {deposit.status === "active" ? "Активен" : "Завершён"}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Admin;
