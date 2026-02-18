import { Stat } from '@/app/stat'
import { Avatar } from '@/components/avatar'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { getRecentOrders } from '@/data'

export default async function Home() {
  let orders = await getRecentOrders()

  return (
    <>
      <Heading>Good afternoon, Erica</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Overview</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">Last week</option>
            <option value="last_two">Last two weeks</option>
            <option value="last_month">Last month</option>
            <option value="last_quarter">Last quarter</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total revenue" value="$2.6M" change="+4.5%" />
        <Stat title="Average order value" value="$455" change="-0.5%" />
        <Stat title="Tickets sold" value="5,888" change="+4.5%" />
        <Stat title="Pageviews" value="823,067" change="+21.2%" />
      </div>
      <Subheading className="mt-14">Recent orders</Subheading>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {orders.map((order) => (
          <a
            key={order.id}
            href={order.url}
            className="relative flex flex-col gap-4 rounded-lg border border-zinc-950/10 bg-white p-6 hover:bg-zinc-950/[2.5%] dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-white/[2.5%] focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500"
            aria-label={`Order #${order.id}`}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-zinc-950 dark:text-white">
                Order #{order.id}
              </div>
              <div className="text-sm font-medium text-right text-zinc-950 dark:text-white">
                US{order.amount.usd}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Avatar src={order.event.thumbUrl} className="size-10" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-zinc-950 dark:text-white truncate">
                  {order.event.name}
                </div>
                <div className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                  {order.customer.name}
                </div>
              </div>
            </div>
            
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              {order.date}
            </div>
          </a>
        ))}
      </div>
    </>
  )
}
