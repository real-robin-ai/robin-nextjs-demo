import { Stat } from '@/app/stat'
import { Avatar } from '@/components/avatar'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getRecentOrders } from '@/data'
import { es } from '@/translations/es'

export default async function Home() {
  let orders = await getRecentOrders()

  return (
    <>
      <Heading>{es.greeting}</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>{es.overview}</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">{es.selectPeriod.lastWeek}</option>
            <option value="last_two">{es.selectPeriod.lastTwoWeeks}</option>
            <option value="last_month">{es.selectPeriod.lastMonth}</option>
            <option value="last_quarter">{es.selectPeriod.lastQuarter}</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title={es.stats.totalRevenue} value="$2.6M" change="+4.5%" />
        <Stat title={es.stats.averageOrderValue} value="$455" change="-0.5%" />
        <Stat title={es.stats.ticketsSold} value="5,888" change="+4.5%" />
        <Stat title={es.stats.pageviews} value="823,067" change="+21.2%" />
      </div>
      <Subheading className="mt-14">{es.recentOrders}</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>{es.table.orderNumber}</TableHeader>
            <TableHeader>{es.table.purchaseDate}</TableHeader>
            <TableHeader>{es.table.customer}</TableHeader>
            <TableHeader>{es.table.event}</TableHeader>
            <TableHeader className="text-right">{es.table.amount}</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} href={order.url} title={`${es.table.orderNumber} #${order.id}`}>
              <TableCell>{order.id}</TableCell>
              <TableCell className="text-zinc-500">{order.date}</TableCell>
              <TableCell>{order.customer.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar src={order.event.thumbUrl} className="size-6" />
                  <span>{order.event.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">US{order.amount.usd}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
