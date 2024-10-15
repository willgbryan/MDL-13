import { getCurrentUserId, getSession, getUserDetails } from '@/app/_data/user'
import { getPaymentHistory, getStripeCustomerId, getPaymentStatus } from "@/app/_data/stripe";
import { BillingPageClient } from '@/components/billing';

type Json = any;

type StripeCharge = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created: string;
  description: string | null;
  invoice: string | { id: string; } | null;
};

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

function mapStripeChargeToPayment(charge: StripeCharge | null): Payment | null {
  if (!charge) return null;
  return {
    id: charge.id,
    user_id: '', // We don't have this information from the charge
    price_id: null, // One-time payments don't have a price_id
    status: charge.status,
    amount: charge.amount,
    currency: charge.currency,
    created: charge.created,
    metadata: {}, // We don't have this information from the charge
    description: charge.description,
    stripe_customer_id: '', // We don't have this information from the charge
  };
}

function mapStripeChargeToPaymentHistoryItem(charge: StripeCharge): PaymentHistoryItem {
  return {
    id: charge.id,
    amount: charge.amount,
    currency: charge.currency,
    created: charge.created,
    status: charge.status,
    description: charge.description,
  };
}

export default async function Page() {
  const session = await getSession()
  if (!session) {
    return <div>Please log in to access billing information.</div>
  }

  const userId = await getCurrentUserId()
  if (!userId) {
    throw new Error('User ID not found')
  }

  const stripeCustomerId = await getStripeCustomerId(userId)
  let latestPayment: Payment | null = null;
  let paymentHistory: PaymentHistoryItem[] = [];

  if (stripeCustomerId) {
    const stripeLatestCharge = await getPaymentStatus(stripeCustomerId)
    const stripePaymentHistory = await getPaymentHistory(stripeCustomerId)
    
    latestPayment = mapStripeChargeToPayment(stripeLatestCharge)
    paymentHistory = stripePaymentHistory.map(mapStripeChargeToPaymentHistoryItem)
  }

  return (
    <BillingPageClient
      user={session.user}
      latestPayment={latestPayment}
      paymentHistory={paymentHistory}
      isFreeTier={!stripeCustomerId}
      stripeCustomerId={stripeCustomerId}
    />
  )
}