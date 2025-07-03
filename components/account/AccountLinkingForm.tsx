// components/account/AccountLinkingForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function AccountLinkingForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [linkingMethod, setLinkingMethod] = useState<string>("");
  const [accountType, setAccountType] = useState<string>("");
  const [identifier, setIdentifier] = useState<string>(""); // For UPI VPA, etc.

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Linking method:", linkingMethod);
    console.log("Account Type:", accountType);
    console.log("Identifier:", identifier);
    // TODO: Integrate with backend API calls (initiateAccountLinking, etc.)
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Link New Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Link Your Account</DialogTitle>
          <DialogDescription>
            Connect your financial accounts securely.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="linkingMethod" className="text-right">
              Method
            </Label>
            <Select onValueChange={setLinkingMethod} value={linkingMethod}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select linking method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accountAggregator">Account Aggregator (AA)</SelectItem>
                <SelectItem value="upi">UPI</SelectItem>
                <SelectItem value="partnerApi">Partner API</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="accountType" className="text-right">
              Account Type
            </Label>
            <Select onValueChange={setAccountType} value={accountType}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select account type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Account</SelectItem>
                <SelectItem value="investment">Investment Account</SelectItem>
                <SelectItem value="credit_card">Credit Card</SelectItem>
                <SelectItem value="insurance">Insurance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {linkingMethod === "upi" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="upiVpa" className="text-right">
                UPI VPA
              </Label>
              <Input
                id="upiVpa"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="col-span-3"
                placeholder="e.g., yourname@bank"
              />
            </div>
          )}

          {linkingMethod === "partnerApi" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="partnerIdentifier" className="text-right">
                Identifier
              </Label>
              <Input
                id="partnerIdentifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="col-span-3"
                placeholder="e.g., account number, policy ID"
              />
            </div>
          )}
          
          {linkingMethod === "accountAggregator" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="aaIdentifier" className="text-right">
                User ID
              </Label>
              <Input
                id="aaIdentifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="col-span-3"
                placeholder="e.g., your_user_id"
              />
            </div>
          )}

          <Button type="submit" className="mt-4">Link Account</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
