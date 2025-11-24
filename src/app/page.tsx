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
      <Heading>Bon après-midi, Erica</Heading>
      <div className="mt-8 flex items-end justify-between">
        <Subheading>Aperçu</Subheading>
        <div>
          <Select name="period">
            <option value="last_week">La semaine dernière</option>
            <option value="last_two">Les deux dernières semaines</option>
            <option value="last_month">Le mois dernier</option>
            <option value="last_quarter">Le dernier trimestre</option>
          </Select>
        </div>
      </div>
      <div className="mt-4 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
        <Stat title="Revenus totaux" value="2,6 M$" change="+4,5 %" />
        <Stat title="Valeur moyenne des commandes" value="455 $" change="-0,5 %" />
        <Stat title="Billets vendus" value="5 888" change="+4,5 %" />
        <Stat title="Pages vues" value="823 067" change="+21,2 %" />
      </div>
      <Subheading className="mt-14">Commandes récentes</Subheading>
      <Table className="mt-4 [--gutter:--spacing(6)] lg:[--gutter:--spacing(10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Numéro de commande</TableHeader>
            <TableHeader>Date d'achat</TableHeader>
            <TableHeader>Client</TableHeader>
            <TableHeader>Événement</TableHeader>
            <TableHeader className="text-right">Montant</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} href={order.url} title={`Commande #${order.id}`}>
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
