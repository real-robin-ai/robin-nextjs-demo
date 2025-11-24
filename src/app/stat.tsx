import { Badge } from '@/components/badge'
import { Divider } from '@/components/divider'
import { Sparkline } from '@/components/sparkline'

export function Stat({
  title,
  value,
  change,
  data,
}: {
  title: string
  value: string
  change: string
  data?: number[]
}) {
  return (
    <div>
      <Divider />
      <div className="mt-6 text-lg/6 font-medium sm:text-sm/6">{title}</div>
      <div className="mt-3 flex items-center gap-3">
        <div className="text-3xl/8 font-semibold sm:text-2xl/8">{value}</div>
        {data && (
          <Sparkline
            data={data}
            className={change.startsWith('+') ? 'text-lime-500' : 'text-pink-500'}
          />
        )}
      </div>
      <div className="mt-3 text-sm/6 sm:text-xs/6">
        <Badge color={change.startsWith('+') ? 'lime' : 'pink'}>{change}</Badge>{' '}
        <span className="text-zinc-500">from last week</span>
      </div>
    </div>
  )
}
