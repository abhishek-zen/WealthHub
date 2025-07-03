import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

const transferSchema = z.object({
  fromAccountId: z.string().uuid(),
  toAccountId: z.string().uuid(),
  amount: z.number().positive(),
  currency: z.string().min(3).max(3),
  otp: z.string().optional(), // For MFA
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const supabase = createServerSupabaseClient({ req, res });

    // Verify user is authenticated
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const parsedBody = transferSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json({ error: parsedBody.error.errors });
    }

    const { fromAccountId, toAccountId, amount, currency, otp } = parsedBody.data;

    // --- Placeholder for MFA verification logic (to be implemented later) ---
    // if (user.app_metadata.mfa_enabled && !otp) {
    //   return res.status(403).json({ error: 'MFA required for this transaction.' });
    // }
    // if (otp) {
    //   const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
    //     email: user.email,
    //     token: otp,
    //     type: 'totp', // Or 'email', depending on MFA type
    //   });
    //   if (verifyError) {
    //     return res.status(401).json({ error: 'Invalid or expired OTP.' });
    //   }
    // }
    // -------------------------------------------------------------------

    // --- Placeholder for fund transfer logic (to be implemented later) ---
    console.log(`Transferring ${amount} ${currency} from ${fromAccountId} to ${toAccountId}`);
    // In a real application, you would interact with your database here
    // For example: deduct from fromAccountId, add to toAccountId
    // Ensure atomicity (transactions) for financial operations
    // -------------------------------------------------------------------

    return res.status(200).json({ message: 'Transfer request received. (MFA and transfer logic pending)', transaction: parsedBody.data });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
