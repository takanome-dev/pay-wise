import Image from 'next/image';
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
      cc_number: '**** **** **** 24242',
      brand: 'visa',
      type: 'virtual',
      exp_month: 10,
      exp_year: 2023,
      cvv: '***',
      currency: 'USD',
      status: 'active',
      balance: 0,
      created_at: '2023-07-01T19:39:05.439Z',
      updated_at: '2023-07-01T19:39:05.439Z',
    },
    {
      id: 'a22e05d5-64c3-48ed-94f2-90cef33d4383',
      cc_number: '**** **** **** 67514',
      brand: 'mastercard',
      type: 'virtual',
      exp_month: 9,
      exp_year: 2023,
      cvv: '***',
      currency: 'USD',
      status: 'active',
      balance: 0,
      created_at: '2023-07-01T19:39:05.439Z',
      updated_at: '2023-07-01T19:39:05.439Z',
    },
    {
      id: 'a22e05d5-64c3-48ed-94f2-90ced33d4341',
      cc_number: '**** **** **** 44324',
      brand: 'mastercard',
      type: 'virtual',
      exp_month: 11,
      exp_year: 2023,
      cvv: '***',
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
          cards.map((card) => (
            <div key={card.id} className="bg-slate-800 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-accent text-xs">Card balance</p>
                  <p className="text-accent font-bold text-xl">
                    ${card.balance}
                  </p>
                </div>
                <div>
                  <Image
                    src={
                      card.brand === 'visa' ? '/visa.svg' : '/mastercard.svg'
                    }
                    alt="Visa Icon"
                    width={60}
                    height={60}
                  />
                </div>
              </div>
              <div className="my-6">
                <p className="text-accent text-2xl font-bold">
                  {card.cc_number}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-accent text-xs">Expiration</p>
                  <p className="text-accent font-semibold">
                    {card.exp_month}/{card.exp_year}
                  </p>
                </div>
                <div>
                  <p className="text-accent text-xs">CVV</p>
                  <p className="text-accent font-semibold">{card.cvv}</p>
                </div>
              </div>
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
