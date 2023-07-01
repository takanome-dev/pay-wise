import { notFound } from 'next/navigation';

import { CreateCardButton } from '~/components/create-card-button';
import { EmptyPlaceholder } from '~/components/empty-placeholder';
import { DashboardHeader } from '~/components/header';
import { DashboardShell } from '~/components/shell';
import { type CardSchemaType } from '~/lib/schemas/card';
import { getCurrentUser } from '~/lib/session';

async function getCards() {
  const user = await getCurrentUser();

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
  console.log({ data });

  return data;
}

export default async function Cards() {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  // const cards = await getCards();
  const cards = [
    {
      id: 'a22e05d5-64c2-48ed-94f2-90cef33d4382',
      cc_number:
        '32ae2b0196fe1b6791acbb517c317bb1:1c31902c2551542c74fa68a29f975e69',
      brand: 'visa',
      type: 'virtual',
      exp_month: 10,
      exp_year: 2023,
      cvv: '859f029e0187ed5c97e965f00eba9ca2:aec3ef',
      currency: 'USD',
      status: 'active',
      balance: 0,
      created_at: '2023-07-01T19:39:05.439Z',
      updated_at: '2023-07-01T19:39:05.439Z',
    },
  ];

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Cards"
        text="This is where you will find all of your generated cards."
      >
        <CreateCardButton user={user} />
      </DashboardHeader>
      <div className="mt-6">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div key={card.id}>
              <p>Card Number: {card.cc_number}</p>
              <p>Card ID: {card.id}</p>
            </div>
          ))
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
