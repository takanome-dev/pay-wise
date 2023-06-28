import { notFound } from 'next/navigation';

import { CreateCardButton } from '~/components/create-card-button';
import { EmptyPlaceholder } from '~/components/empty-placeholder';
import { DashboardHeader } from '~/components/header';
import { DashboardShell } from '~/components/shell';
import { getCurrentUser } from '~/lib/session';

export default async function Cards() {
  const user = await getCurrentUser();

  if (!user) {
    return notFound();
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Cards"
        text="This is where you will find all of your generated cards."
      >
        <CreateCardButton user={user} />
      </DashboardHeader>
      <div className="mt-6">
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="billing" />
          <EmptyPlaceholder.Title>No cards created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any cards yet. Create your first card.
          </EmptyPlaceholder.Description>
          <CreateCardButton variant="outline" user={user} />
        </EmptyPlaceholder>
      </div>
    </DashboardShell>
  );
}
