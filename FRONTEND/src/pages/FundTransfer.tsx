import React, { useEffect, useState } from "react";
import { getMyAccounts } from "@/services/accounts";
import { transfer } from "@/services/transactions";

const FundTransfer: React.FC = () => {
  const [accounts, setAccounts] = useState<
    { id: number; number: string; label: string }[]
  >([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  useEffect(() => {
    (async () => {
      const data = await getMyAccounts();
      const mapped = data.map((a) => ({
        id: a.id,
        number: a.accountNumber,
        label: `${a.accountType} - ${a.accountNumber}`,
      }));
      setAccounts(mapped);
      if (mapped.length) setFrom(mapped[0].number);
    })();
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOk("");
    const amt = Number(amount);
    if (!from || !to || !amt || amt <= 0)
      return setError("Please fill all required fields with valid values.");
    setLoading(true);
    try {
      const res = await transfer({
        fromAccountNumber: from,
        toAccountNumber: to,
        amount: amt,
        description: desc,
      });
      setOk(`Transfer successful. Ref: ${res.transactionReference}`);
      setTo("");
      setAmount("");
      setDesc("");
    } catch (e: any) {
      setError(e?.response?.data?.error || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Fund Transfer</h1>
      </div>
      <form onSubmit={submit} className="card grid md:grid-cols-2 gap-4">
        {error && <div className="text-red-600 col-span-2">{error}</div>}
        {ok && <div className="text-green-700 col-span-2">{ok}</div>}
        <div>
          <label className="label">From Account</label>
          <select
            className="input"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          >
            {accounts.map((a) => (
              <option key={a.id} value={a.number}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">To Account Number</label>
          <input
            className="input"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            className="input"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Description (optional)</label>
          <input
            className="input"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Transferring…" : "Transfer"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default FundTransfer;
