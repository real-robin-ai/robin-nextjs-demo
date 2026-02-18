import { Badge } from '@/components/badge'
import { Divider } from '@/components/divider'
import { Sparkline } from '@/components/sparkline'

export function Stat({
  title,
  value,
  change,
  trend,
}: {
  title: string
  value: string
  change: string
  trend?: number[]
}) {
  const isPositive = change.startsWith('+')

  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 flex items-center gap-3">
        <div className="text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
        {trend && (
          <Sparkline
            data={trend}
            className={isPositive ? 'text-lime-600 dark:text-lime-400' : 'text-pink-600 dark:text-pink-400'}
          />
        )}
      </div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={isPositive ? 'lime' : 'pink'}>{change}</Badge>{' '}
        <span className="text-zinc-500">from last week</span>
      </div>
    </div>
  )
}
