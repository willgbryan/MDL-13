import { getSession } from '@/app/_data/user';
import { getStripeCustomerId, getPaymentStatus } from '@/app/_data/stripe';
import Pricing from '@/components/pricing';
import { Stripe } from 'stripe';

type PaymentStatus = {
  id: string;
  amount: number;
  currency: string;
  status: Stripe.Charge.Status;
  created: string;
  description: string | null;
  invoice: string | Stripe.Invoice | null;
} | null;

export default async function Page() {
  const session = await getSession();
  let latestPayment: PaymentStatus = null;
  
  if (session?.user?.id) {
    try {
      const customerId = await getStripeCustomerId(session.user.id);
      if (customerId) {
        latestPayment = await getPaymentStatus(customerId);
      }
    } catch (error) {
      console.error('Error fetching payment status:', error);
    }
  }

  return <Pricing session={session} latestPayment={latestPayment} />;
}