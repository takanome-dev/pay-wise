import { BadgeDelta, Card, Flex, Grid, Metric, Text } from '@tremor/react';

import { DashboardHeader } from '~/components/header';
import ChartOverview from '~/components/overview-chart';
import { DashboardShell } from '~/components/shell';
import { getSession } from '~/lib/session';
import { tags } from '~/lib/tags';

export interface DailyPerformance {
  date: string;
  Transactions: number;
  Cards: number;
  Customers: number;
}

interface KPIResponseData {
  performance: DailyPerformance[];
  totalCustomers: number;
  totalCards: number;
  totalTransactions: number;
  totalAmount: number;
}

async function getKpis(token: string) {
  // TODO: mv api url to env
  const response = await fetch('http://localhost:3000/v1/users/kpis/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: [tags.kpis],
    },
  });

  return (await response.json()) as KPIResponseData;
}

interface KpiCardProps {
  name: string;
  value: string | number;
}

function KpiCard(props: KpiCardProps) {
  const { name, value } = props;

  return (
    <Card className="max-w-lg mx-auto">
      <Flex alignItems="start">
        <div>
          <Text>{name}</Text>
          <Metric>{value}</Metric>
        </div>
        <BadgeDelta deltaType="moderateIncrease">13.2%</BadgeDelta>
      </Flex>
    </Card>
  );
}

export default async function Dashboard() {
  const session = await getSession();
  const kpis = await getKpis(session?.access_token ?? '');

  return (
    <DashboardShell className="px-1">
      <DashboardHeader
        heading="Overview"
        text="This is where you will find all the recaps of activities happening in your app"
      />
      <div className="mt-6 mb-8">
        <Grid numItemsMd={3} numItemsLg={4} className="gap-4">
          <KpiCard name="Cards" value={kpis.totalCards} />
          <KpiCard name="Customers" value={kpis.totalCustomers} />
          <KpiCard name="Transactions" value={kpis.totalTransactions} />
          <KpiCard name="Amount Received" value={`$${kpis.totalAmount}`} />
        </Grid>
        <Grid numItems={1} className="mt-12 gap-6">
          <ChartOverview performance={kpis.performance} />
        </Grid>
      </div>
    </DashboardShell>
  );
}
