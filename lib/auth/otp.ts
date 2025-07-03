import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function generateOTP(): string {
  // Generate a 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOTP(emailOrPhone: string, otp: string, type: 'email' | 'phone'): Promise<{ data: any | null; error: Error | null }> {
  if (type === 'email') {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: emailOrPhone,
      options: {
        data: { otp_code: otp }, // Custom data to pass to the email template
      },
    });
    return { data, error };
  } else if (type === 'phone') {
    // Supabase phone OTP requires a separate endpoint or a custom Twilio integration.
    // For this example, we'll just log an error.
    console.error("Phone OTP sending not fully implemented with basic Supabase setup. Requires a custom Edge Function or Twilio integration.");
    return { data: null, error: new Error("Phone OTP sending not supported directly without custom setup.") };
  }
  return { data: null, error: new Error("Invalid OTP type specified.") };
}
