import React, { useEffect, useMemo, useState } from "react";
import {
  createAccount,
  deleteAccount,
  getMyAccounts,
} from "@/services/accounts";
import { inr } from "@/utils/format";
import { Link } from "react-router-dom";

const Accounts: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<any[]>([]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const data = await getMyAccounts();
      setAccounts(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const rows = useMemo(
    () =>
      accounts.map((a, i) => ({
        serial: a.id ?? i + 1,
        id: a.id,
        accountType: a.accountType,
        accountNumber: a.accountNumber,
        balance: inr(a.balance),
        currency: a.currency,
        status: "Active",
      })),
    [accounts]
  );

  const onDelete = async (row: any) => {
    if (!confirm(`Delete account ${row.accountNumber}?`)) return;
    await deleteAccount(row.serial);
    await fetchAll();
  };

  const onCreate = async () => {
    const type =
      prompt("Enter account type (SAVINGS or CURRENT):", "SAVINGS") ||
      "SAVINGS";
    await createAccount(type as any);
    await fetchAll();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">🏦 My Accounts</h2>
        <div className="flex gap-2">
          <button className="btn btn-primary" onClick={onCreate}>
            + Open New Account
          </button>
          <Link className="btn btn-outline" to="/newaccount">
            Open via Form
          </Link>
        </div>
      </div>

      {loading && <div className="card">Loading your accounts…</div>}

      {!loading && rows.length === 0 && (
        <div className="card">
          <div className="text-lg font-semibold mb-2">No Accounts Found</div>
          <div className="text-sm mb-3">
            You don't have any accounts yet. Create your first account to get
            started!
          </div>
          <button className="btn btn-primary" onClick={onCreate}>
            Open Your First Account
          </button>
        </div>
      )}

      {!loading && rows.length > 0 && (
        <div className="card overflow-auto">
          <table className="table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Account Type</th>
                <th>Account Number</th>
                <th>Balance</th>
                <th>Currency</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.accountNumber}>
                  <td>{r.serial}</td>
                  <td>
                    <span className="badge">{r.accountType}</span>
                  </td>
                  <td className="font-mono">{r.accountNumber}</td>
                  <td>{r.balance}</td>
                  <td>{r.currency}</td>
                  <td>
                    <span className="badge badge-success">{r.status}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline"
                      onClick={() => onDelete(r)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default Accounts;
