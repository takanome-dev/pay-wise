import { DashboardHeader } from '~/components/header';
import { DashboardShell } from '~/components/shell';

export default function Transactions() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Transactions"
        text="This is where you will find all your transactions"
      />
    </DashboardShell>
  );
}
