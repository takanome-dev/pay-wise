import { notFound } from 'next/navigation';

import type { TransactionSchemaType } from '~/lib/schemas/transaction';

import { EmptyPlaceholder } from '~/components/empty-placeholder';
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
        {transactions.length > 0 ? (
          <div className="grid grid-cols-3 gap-8">
            {transactions.map((t) => (
              <p key={t.id}>{t.amount}</p>
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="transaction" />
            <EmptyPlaceholder.Title>
              No transactions created
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any transactions yet.
            </EmptyPlaceholder.Description>
            {/* <CreateCardButton variant="outline" user={user} /> */}
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
