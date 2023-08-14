import { notFound } from 'next/navigation';

import { CreateCardButton } from '~/components/create-card-button';
import CreditCard from '~/components/credit-card';
import { EmptyPlaceholder } from '~/components/empty-placeholder';
import { DashboardHeader } from '~/components/header';
import { DashboardShell } from '~/components/shell';
import { type CardSchemaType } from '~/lib/schemas/card';
import { getSession } from '~/lib/session';
import { tags } from '~/lib/tags';

async function getCards(token: string) {
  // TODO: mv api url to env
  const response = await fetch('http://localhost:3000/v1/cards', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: [tags.cards],
    },
  });

  const data = (await response.json()) as CardSchemaType[];
  return data;
}

export default async function Cards() {
  const session = await getSession();

  if (!session) {
    return notFound();
  }

  const cards = await getCards(session.access_token);

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Cards"
        text="This is where you will find all of your generated cards. Click on a card to view more details."
      >
        <CreateCardButton token={session.access_token} />
      </DashboardHeader>
      <div className="mt-6">
        {cards.length > 0 ? (
          <div className="grid grid-cols-3 gap-8">
            {cards.map((card) => (
              <CreditCard key={card.id} card={card} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="billing" />
            <EmptyPlaceholder.Title>No cards created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any cards yet. Create your first card.
            </EmptyPlaceholder.Description>
            <CreateCardButton variant="outline" token={session.access_token} />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
