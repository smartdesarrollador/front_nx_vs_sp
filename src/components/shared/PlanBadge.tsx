import { cn } from '@/utils/cn';
import { getPlanDisplayName, type Plan } from '@/data/featureGates';

interface PlanBadgeProps {
  plan: Plan;
  className?: string;
}

const PLAN_COLORS: Record<Plan, string> = {
  free: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  starter: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
  professional: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  enterprise: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
};

export function PlanBadge({ plan, className }: PlanBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        PLAN_COLORS[plan],
        className
      )}
    >
      {getPlanDisplayName(plan)}
    </span>
  );
}
