"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { createStripePortalSession } from '@/app/_actions/stripe';
import { Tabs } from './cult/tabs';

type Json = any;

type Payment = {
  id: string;
  user_id: string;
  price_id: string | null;
  status: string | null;
  amount: number | null;
  currency: string | null;
  created: string;
  metadata: {
    customerId?: string;
    isTestEvent?: boolean;
    paymentType?: string;
  } | Json;
  description: string | null;
  stripe_customer_id: string;
};

type PaymentHistoryItem = {
  id: string;
  amount: number | null;
  currency: string | null;
  created: string;
  status: string | null;
  description: string | null;
};

type BillingPageClientProps = {
  user: any;
  latestPayment: Payment | null;
  paymentHistory: PaymentHistoryItem[];
  isFreeTier: boolean;
  stripeCustomerId: string | undefined;
}

export const BillingPageClient: React.FC<BillingPageClientProps> = ({ 
  user, 
  latestPayment, 
  paymentHistory, 
  isFreeTier,
  stripeCustomerId
}) => {
  const router = useRouter();

  const handleManageSubscription = async () => {
    if (stripeCustomerId) {
      try {
        const { url } = await createStripePortalSession(stripeCustomerId);
        window.location.href = url;
      } catch (error) {
        alert('Failed to open Stripe portal: ' + (error as Error).message);
      }
    } else {
      router.push('/pricing');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount: number | null, currency: string | null) => {
    if (amount === null || currency === null) return 'N/A';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase() }).format(amount / 100);
  };

  const tabs = [
    {
      title: "Current Plan",
      value: "current-plan",
      content: (
        <Card className="w-full h-full bg-white dark:bg-zinc-800">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
          </CardHeader>
          <CardContent>
            {isFreeTier ? (
              <p>You are currently on the Basic plan.</p>
            ) : latestPayment ? (
              <div>
                <p>Plan: {latestPayment.status === 'succeeded' ? 'Pro' : 'Basic'}</p>
                <p>Status: {latestPayment.status || 'N/A'}</p>
                <p>Amount: {formatCurrency(latestPayment.amount, latestPayment.currency)}</p>
                <p>Last Payment: {formatDate(latestPayment.created)}</p>
              </div>
            ) : (
              <p>You don't have any recent payments.</p>
            )}
          </CardContent>
        </Card>
      ),
    },
    {
      title: "Payment History",
      value: "payment-history",
      content: (
        <Card className="w-full h-full bg-white dark:bg-zinc-800">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            {isFreeTier ? (
              <p>No payment history available for Basic plan users.</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paymentHistory.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{formatDate(payment.created)}</TableCell>
                      <TableCell>{formatCurrency(payment.amount, payment.currency)}</TableCell>
                      <TableCell>{payment.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      ),
    },
    {
      title: "Manage Plan",
      value: "manage",
      content: (
        <Card className="w-full h-full bg-white dark:bg-zinc-800">
          <CardHeader>
            <CardTitle>Manage Plan</CardTitle>
          </CardHeader>
          <CardContent>
            {isFreeTier ? (
              <p>You are currently on the Basic plan. Click the button below to view our pricing plans and upgrade your account.</p>
            ) : latestPayment ? (
              <p>Click the button below to manage your plan, update payment methods, or make a new purchase.</p>
            ) : (
              <p>You don't have any recent payments. Click the button below to view our pricing plans and make a purchase.</p>
            )}
            <Button onClick={handleManageSubscription} className="mt-4">
              {isFreeTier ? 'View Pricing Plans' : (latestPayment ? 'Manage Plan' : 'View Pricing Plans')}
            </Button>
          </CardContent>
        </Card>
      ),
    },
  ];

  return (
    <>
      <div className="h-[40rem] [perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-10">
        <Tabs tabs={tabs} />
      </div>
    </>
  );
}