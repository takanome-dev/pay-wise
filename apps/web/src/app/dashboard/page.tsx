import {
  BadgeDelta,
  Card,
  Col,
  Flex,
  Grid,
  Metric,
  ProgressBar,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Text,
  Title,
} from '@tremor/react';

import { DashboardHeader } from '~/components/header';
import ChartOverview from '~/components/overview-chart';
import { DashboardShell } from '~/components/shell';

// import { StatusOnlineIcon } from "@heroicons/react/outline";

const data = [
  {
    name: 'Viola Amherd',
    amount: 100,
  },
  {
    name: 'Simonetta Sommaruga',
    amount: 200,
  },
  {
    name: 'Alain Berset',
    amount: 300,
  },
  {
    name: 'Ignazio Cassis',
    amount: 400,
  },
  {
    name: 'Ueli Maurer',
    amount: 500,
  },
  {
    name: 'Guy Parmelin',
    amount: 600,
  },
];

function KpiCard() {
  return (
    <Card className="max-w-lg mx-auto">
      <Flex alignItems="start">
        <div>
          <Text>Sales</Text>
          <Metric>$ 12,699</Metric>
        </div>
        <BadgeDelta deltaType="moderateIncrease">13.2%</BadgeDelta>
      </Flex>
      <Flex className="mt-4">
        <Text className="truncate">68% ($ 149,940)</Text>
        <Text>$ 220,500</Text>
      </Flex>
      <ProgressBar value={15.9} className="mt-2" />
    </Card>
  );
}

export default function Dashboard() {
  return (
    <DashboardShell className="px-1">
      <DashboardHeader
        heading="Overview"
        text="This is where you will find all the recaps of activities happening in your app"
      />
      <div className="mt-6 mb-8">
        <Grid numItemsMd={2} numItemsLg={3} className="gap-6">
          <KpiCard />
          <KpiCard />
          <KpiCard />
        </Grid>
        <Grid numItems={1} numItemsLg={3} className="mt-12 gap-6">
          <Col numColSpan={1} numColSpanLg={2}>
            <ChartOverview />
          </Col>
          <Card>
            <Title>Invoices & bills</Title>
            <Table className="mt-5">
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <Text>${item.amount}</Text>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </Grid>
      </div>
    </DashboardShell>
  );
}
