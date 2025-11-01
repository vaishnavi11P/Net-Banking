import React, { useEffect, useState } from "react";
import { getMyAccounts } from "@/services/accounts";
import { getMyCards } from "@/services/cards";
import { getTransactionsForAccount } from "@/services/transactions";
import { inr } from "@/utils/format";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const [totalBalance, setTotalBalance] = useState("₹0.00");
  const [activeCards, setActiveCards] = useState(0);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [recentActivity, setRecentActivity] = useState(0);
  const [accounts, setAccounts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const acc = await getMyAccounts();
      setTotalAccounts(acc.length);
      setAccounts(
        acc.map((a) => ({
          type: `${a.accountType} Account`,
          number: a.accountNumber,
          balance: inr(a.balance),
          status: "Active",
        }))
      );
      const total = acc.reduce((s, a) => s + Number(a.balance), 0);
      setTotalBalance(inr(total));

      if (acc.length) {
        const tx = await getTransactionsForAccount(acc[0].id);
        setRecentActivity(tx.slice(0, 5).length);
      }

      const cards = await getMyCards();
      setActiveCards(cards.filter((c) => c.status === "ACTIVE").length);
    })().catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
        <div className="flex gap-2">
          <Link to="/fundtransfer" className="btn btn-primary">
            ➡ Quick Transfer
          </Link>
          <Link to="/newaccount" className="btn btn-outline">
            ➕ New Account
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="card">
          <div className="text-sm text-gray-500">Total Balance</div>
          <div className="text-2xl font-semibold">{totalBalance}</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-500">Active Cards</div>
          <div className="text-2xl font-semibold">{activeCards}</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-500">Total Accounts</div>
          <div className="text-2xl font-semibold">{totalAccounts}</div>
        </div>
        <div className="card">
          <div className="text-sm text-gray-500">Recent Activity</div>
          <div className="text-2xl font-semibold">{recentActivity}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <div className="text-lg font-semibold mb-3">Your Accounts</div>
          <div className="space-y-2">
            {accounts.map((a, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{a.type}</div>
                  <div className="text-sm text-gray-500">{a.number}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{a.balance}</div>
                  <div className="text-xs text-green-700">{a.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="text-lg font-semibold mb-3">Quick Actions</div>
          <div className="flex flex-wrap gap-2">
            <Link to="/fundtransfer" className="btn btn-outline">
              💸 Transfer Funds
            </Link>
            <Link to="/newaccount" className="btn btn-outline">
              ➕ Open Account
            </Link>
            <Link to="/card" className="btn btn-outline">
              💳 Apply for Card
            </Link>
            <Link to="/transactions" className="btn btn-outline">
              📄 View Statements
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
