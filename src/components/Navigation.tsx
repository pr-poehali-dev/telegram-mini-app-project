import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Icon from "@/components/ui/icon";

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.substring(1) || "home";
    setActiveTab(path);
  }, [location, setActiveTab]);

  const tabs = [
    { id: "home", label: "Главная", icon: "Home", path: "/" },
    { id: "portfolio", label: "Портфель", icon: "Briefcase", path: "/portfolio" },
    { id: "wallet", label: "Кошелек", icon: "Wallet", path: "/wallet" },
    { id: "bonuses", label: "Бонусы", icon: "Gift", path: "/bonuses" },
    { id: "partners", label: "Партнеры", icon: "Users", path: "/partners" },
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border backdrop-blur-lg bg-opacity-95 z-50">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-around items-center py-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab)}
                className={`flex flex-col items-center gap-1 py-2 px-3 transition-all duration-200 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon 
                  name={tab.icon} 
                  size={20} 
                  className={isActive ? "animate-fade-in" : ""}
                />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
