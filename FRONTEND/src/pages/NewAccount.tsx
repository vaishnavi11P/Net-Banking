import React, { useState } from "react";
import { createAccount } from "@/services/accounts";

const NewAccount: React.FC = () => {
  const [accountType, setAccountType] = useState<"SAVINGS" | "CURRENT">(
    "SAVINGS"
  );
  const [initialDeposit, setInitialDeposit] = useState(1000);
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState<{
    number?: string;
    type?: string;
    balance?: number;
  } | null>(null);

  const canCreate = initialDeposit >= 1000 && !creating;

  const submit = async () => {
    if (!canCreate) return;
    setCreating(true);
    try {
      const res = await createAccount(accountType);
      setCreated({
        number: res.accountNumber,
        type: res.accountType,
        balance: Number(res.balance),
      });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-semibold">Open New Account</div>
          <div className="text-gray-500">
            Create a new bank account in a few steps
          </div>
        </div>
      </div>

      {!created ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card space-y-4">
            <div>
              <label className="label">Account Type</label>
              <select
                className="input"
                value={accountType}
                onChange={(e) => setAccountType(e.target.value as any)}
              >
                <option value="SAVINGS">Savings</option>
                <option value="CURRENT">Current</option>
              </select>
            </div>
            <div>
              <label className="label">Initial Deposit (₹)</label>
              <input
                type="number"
                min={1000}
                className="input"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(Number(e.target.value))}
              />
              <div className="text-xs text-gray-500">
                Minimum deposit: ₹1,000
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn btn-outline">Cancel</button>
              <button
                className="btn btn-primary"
                onClick={submit}
                disabled={!canCreate}
              >
                {creating ? "Creating…" : "Create Account"}
              </button>
            </div>
          </div>

          <div className="card">
            <div className="text-lg font-semibold mb-2">Account Summary</div>
            <div>
              Type: <strong>{accountType}</strong>
            </div>
            <div>
              Initial Balance:{" "}
              <strong>₹{initialDeposit.toLocaleString("en-IN")}</strong>
            </div>
            <div>
              Status:{" "}
              <span className="badge badge-success">Will be Active</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="text-xl font-semibold mb-3">
            🎉 Account Created Successfully!
          </div>
          <div>
            Account Number: <strong>{created.number}</strong>
          </div>
          <div>
            Account Type: <strong>{created.type}</strong>
          </div>
          <div>
            Initial Balance:{" "}
            <strong>
              ₹{Number(created.balance || 0).toLocaleString("en-IN")}
            </strong>
          </div>
        </div>
      )}
    </div>
  );
};
export default NewAccount;
