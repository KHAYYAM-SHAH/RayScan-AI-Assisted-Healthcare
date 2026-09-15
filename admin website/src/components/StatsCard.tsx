
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
  trend?: number;
}

const StatsCard = ({ title, value, icon: Icon, color, trend }: StatsCardProps) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayValue(prev => {
          const increment = Math.ceil(value / 50);
          const next = prev + increment;
          if (next >= value) {
            clearInterval(interval);
            return value;
          }
          return next;
        });
      }, 30);
      return () => clearInterval(interval);
    }, 200);

    return () => clearTimeout(timer);
  }, [value]);

  return (
    <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-0 shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {displayValue.toLocaleString()}
            </p>
            {trend && (
              <p className={`text-sm mt-2 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {trend > 0 ? '+' : ''}{trend}% from last month
              </p>
            )}
          </div>
          <div className={`p-3 rounded-full ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
