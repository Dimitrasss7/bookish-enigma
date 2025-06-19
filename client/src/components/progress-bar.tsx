import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showPercentage?: boolean;
}

export function ProgressBar({ value, max, className, showPercentage = true }: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className={cn("w-full", className)}>
      {showPercentage && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Прогресс</span>
          <span className="text-sm text-primary font-semibold">{percentage}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-primary h-3 rounded-full transition-all duration-300 progress-bar"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
