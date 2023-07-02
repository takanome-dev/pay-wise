import Image from 'next/image';
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
      cc_number: '4242 4242 4242 24242',
      brand: 'visa',
      type: 'virtual',
      exp_month: 10,
      exp_year: 2023,
      cvv: '123',
      currency: 'USD',
      status: 'active',
      balance: 0,
      created_at: '2023-07-01T19:39:05.439Z',
      updated_at: '2023-07-01T19:39:05.439Z',
    },
    {
      id: 'a22e05d5-64c3-48ed-94f2-90cef33d4383',
      cc_number: '4242 4242 4242 67514',
      brand: 'mastercard',
      type: 'virtual',
      exp_month: 9,
      exp_year: 2023,
      cvv: '456',
      currency: 'USD',
      status: 'active',
      balance: 0,
      created_at: '2023-07-01T19:39:05.439Z',
      updated_at: '2023-07-01T19:39:05.439Z',
    },
    {
      id: 'a22e05d5-64c3-48ed-94f2-90ced33d4341',
      cc_number: '4242 4242 4242 44324',
      brand: 'mastercard',
      type: 'virtual',
      exp_month: 11,
      exp_year: 2023,
      cvv: '789',
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
