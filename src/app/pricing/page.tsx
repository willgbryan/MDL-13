import { getSession } from '@/app/_data/user';
import { Pricing } from '@/components/pricing';
import { getUserPaymentStatus } from '../_actions/stripe';
import Stripe from 'stripe';

type PaymentStatus = {
  id: string;
  amount: number;
  currency: string;
  status: Stripe.Charge.Status;
  created: string;
  description: string | null;
  metadata: Stripe.Metadata;
} | null;

export default async function Page() {
  const session = await getSession();
  let latestPayment: PaymentStatus = null;

  if (session?.user?.id) {
    try {
      latestPayment = await getUserPaymentStatus(session.user.id);
    } catch (error) {
      console.error('Error fetching payment status:', error);
    }
  }

  return <Pricing session={session} latestPayment={latestPayment} />;
}