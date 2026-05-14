export type Vendor = {
  _id: string;
  name: string;
};

export type Audit = {
  action: string;
  user: string;
};

export type Payout = {
  _id: string;
  amount: number;
  status: "Draft" | "Submitted" | "Approved" | "Rejected";
  audit: Audit[];
};