import { notFound } from 'next/navigation';

import { columns } from './columns';
import { DataTable } from './data-table';

import type { TransactionSchemaType } from '~/lib/schemas/transaction';

import { DashboardHeader } from '~/components/header';
import { DashboardShell } from '~/components/shell';
import { getCurrentUser } from '~/lib/session';
import { tags } from '~/lib/tags';

async function getTransactions(token: string) {
  // TODO: mv api url to env
  const response = await fetch('http://localhost:3000/api/v1/transactions', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: [tags.transactions],
    },
  });

  return (await response.json()) as TransactionSchemaType[];
}

export default async function Transactions() {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  const transactions = await getTransactions(user.token ?? '');

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Transactions"
        text="This is where you will find all your transactions"
      />
      <div className="mt-6">
        <DataTable columns={columns} data={transactions} />
      </div>
    </DashboardShell>
  );
}
