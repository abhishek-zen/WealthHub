import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const totpFormSchema = z.object({
  totpCode: z.string().min(6, { message: "TOTP code must be 6 digits." }).max(6, { message: "TOTP code must be 6 digits." }),
});

type TotpFormValues = z.infer<typeof totpFormSchema>;

export default function TotpSetup() {
  const form = useForm<TotpFormValues>({
    resolver: zodResolver(totpFormSchema),
    defaultValues: {
      totpCode: "",
    },
  });

  function onSubmit(values: TotpFormValues) {
    // Handle TOTP verification logic here
    console.log(values);
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Set Up Authenticator App</CardTitle>
        <CardDescription>Scan the QR code with your authenticator app and enter the code below.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-4">
          {/* Placeholder for QR Code */}
          <div className="w-48 h-48 bg-gray-200 flex items-center justify-center text-gray-500">
            QR Code Placeholder
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="totpCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Verify and Enable TOTP</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
