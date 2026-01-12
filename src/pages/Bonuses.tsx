import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

const Bonuses = () => {
  const tasks = [
    {
      id: 1,
      title: "Подписка на чат",
      description: "Вступите в наш официальный чат инвесторов.",
      reward: 100,
      completed: true,
      icon: "Send",
      iconBg: "bg-primary/20",
      iconColor: "text-primary",
    },
    {
      id: 2,
      title: "Пригласить 25 друзей",
      description: "Бонус начисляется на тело депозита за 25 приглашенных пользователей.",
      reward: 200,
      completed: false,
      progress: 0,
      total: 25,
      icon: "Users",
      iconBg: "bg-secondary/20",
      iconColor: "text-secondary",
    },
  ];

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
            <Icon name="Gift" size={24} className="text-primary" />
            <h2 className="text-2xl font-bold">Бонусы</h2>
          </div>
          <p className="text-muted-foreground text-sm">
            Выполняй задания — получай деньги
          </p>
        </div>

        <div className="space-y-3">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className={`p-5 space-y-4 transition-all ${
                task.completed
                  ? "bg-success/5 border-success/30"
                  : "hover:border-primary/50"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${task.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={task.icon} size={24} className={task.iconColor} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-base leading-tight">
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-1 text-success font-semibold whitespace-nowrap">
                      <Icon name="Plus" size={14} />
                      <span>{task.reward}₽</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {task.description}
                  </p>

                  {task.completed ? (
                    <Button 
                      className="w-full bg-success hover:bg-success/90 text-white font-semibold h-11"
                      disabled
                    >
                      <Icon name="CheckCircle" size={18} className="mr-2" />
                      Выполнено
                    </Button>
                  ) : (
                    <>
                      {task.progress !== undefined && task.total !== undefined && (
                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Прогресс</span>
                            <span className="font-medium tabular-nums">
                              {task.progress} / {task.total}
                            </span>
                          </div>
                          <Progress 
                            value={(task.progress / task.total) * 100} 
                            className="h-2"
                          />
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="h-11">
                          Проверить
                        </Button>
                        <Button className="h-11 bg-secondary hover:bg-secondary/90 font-semibold">
                          Пригласить
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/30 p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/30 flex items-center justify-center flex-shrink-0">
              <Icon name="Sparkles" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Больше заданий скоро</h3>
              <p className="text-sm text-muted-foreground">
                Следите за обновлениями, чтобы не пропустить новые возможности заработка
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Bonuses;
