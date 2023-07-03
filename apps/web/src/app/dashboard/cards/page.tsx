import { notFound } from 'next/navigation';

import { CreateCardButton } from '~/components/create-card-button';
import CreditCard from '~/components/credit-card';
import { EmptyPlaceholder } from '~/components/empty-placeholder';
import { DashboardHeader } from '~/components/header';
import { DashboardShell } from '~/components/shell';
import { type CardSchemaType } from '~/lib/schemas/card';
import { getCurrentUser } from '~/lib/session';

async function getCards() {
  const user = await getCurrentUser();

  // TODO: mv api url to env
  const response = await fetch('http://localhost:3000/api/v1/cards', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.token}`,
    },
    next: {
      tags: ['Cards'],
    },
  });

  const data = (await response.json()) as CardSchemaType[];

  return data;
}

export default async function Cards() {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  const cards = await getCards();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Cards"
        text="This is where you will find all of your generated cards. Click on a card to view more details."
      >
        <CreateCardButton user={user} />
      </DashboardHeader>
      <div className="mt-6 grid grid-cols-3 gap-8">
        {cards.length > 0 ? (
          cards.map((card) => <CreditCard key={card.id} card={card} />)
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="billing" />
            <EmptyPlaceholder.Title>No cards created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any cards yet. Create your first card.
            </EmptyPlaceholder.Description>
            <CreateCardButton variant="outline" user={user} />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
