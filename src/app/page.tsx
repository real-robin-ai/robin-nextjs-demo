import { Stat } from '@/app/stat'
import { Avatar } from '@/components/avatar'
import { Heading, Subheading } from '@/components/heading'
import { Select } from '@/components/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { getRecentOrders } from '@/data'

export default async function Home() {
  let orders = await getRecentOrders()

  return (
    <>
      <Heading>Guten Tag, Erica</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Übersicht</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">Letzte Woche</option>
            <option value="last_two">Letzte zwei Wochen</option>
            <option value="last_month">Letzter Monat</option>
            <option value="last_quarter">Letztes Quartal</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Gesamtumsatz" value="$2.6M" change="+4.5%" />
        <Stat title="Durchschnittlicher Bestellwert" value="$455" change="-0.5%" />
        <Stat title="Verkaufte Tickets" value="5,888" change="+4.5%" />
        <Stat title="Seitenaufrufe" value="823,067" change="+21.2%" />
      </div>
      <Subheading className="mt-14">Letzte Bestellungen</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Bestellnummer</TableHeader>
            <TableHeader>Kaufdatum</TableHeader>
            <TableHeader>Kunde</TableHeader>
            <TableHeader>Veranstaltung</TableHeader>
            <TableHeader className="text-right">Betrag</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} href={order.url} title={`Order #${order.id}`}>
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
