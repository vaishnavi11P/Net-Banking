import React, { useEffect, useState } from "react";
import { getMyAccounts } from "@/services/accounts";
import { getTransactionsForAccount } from "@/services/transactions";
import { shortDateTime } from "@/utils/format";

const Transactions: React.FC = () => {
  const [accounts, setAccounts] = useState<{ id: number; label: string }[]>([]);
  const [accountId, setAccountId] = useState<number | "">("");
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getMyAccounts();
      const mapped = data.map((a) => ({
        id: a.id,
        label: `${a.accountType} - ${a.accountNumber} (₹${Number(
          a.balance
        ).toFixed(2)})`,
      }));
      setAccounts(mapped);
      if (mapped.length) setAccountId(mapped[0].id);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!accountId) return;
      setLoading(true);
      setError("");
      try {
        const list = await getTransactionsForAccount(Number(accountId));
        setItems(list.slice(0, limit));
      } catch (e: any) {
        setError(e?.response?.data?.error || "Failed to load transactions");
      } finally {
        setLoading(false);
      }
    })();
  }, [accountId, limit]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Transaction History</h1>
        <div className="flex gap-3 items-center">
          <label className="label">Account</label>
          <select
            className="input"
            value={accountId}
            onChange={(e) => setAccountId(Number(e.target.value))}
          >
            {accounts.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
          <label className="label">Show</label>
          <select
            className="input w-24"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <div className="card text-red-600">{error}</div>}

      <div className="card overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Reference</th>
              <th>Description</th>
              <th>Type</th>
              <th>Status</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id}>
                <td>{shortDateTime(i.transactionDateEpoch)}</td>
                <td>{i.transactionReference}</td>
                <td>{i.description}</td>
                <td>{i.transactionType}</td>
                <td>{i.status}</td>
                <td className="text-right">{Number(i.amount).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && items.length === 0 && (
          <div className="text-sm text-gray-500">No transactions found.</div>
        )}
      </div>
    </div>
  );
};
export default Transactions;
