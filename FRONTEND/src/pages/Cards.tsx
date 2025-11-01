import React, { useEffect, useState } from "react";
import {
  createCard,
  deleteCard,
  getMyCards,
  updateCardStatus,
} from "@/services/cards";
import { getMyAccounts } from "@/services/accounts";

const mask = (n?: string) => (n ? `**** **** **** ${n.slice(-4)}` : "");

const Cards: React.FC = () => {
  const [cards, setCards] = useState<any[]>([]);
  const [dialog, setDialog] = useState(false);
  const [cardType, setCardType] = useState<"DEBIT" | "CREDIT" | "">("");
  const [accountId, setAccountId] = useState<number | undefined>();
  const [accounts, setAccounts] = useState<{ id: number; label: string }[]>([]);

  const load = async () => {
    const list = await getMyCards();
    setCards(list);
  };

  useEffect(() => {
    load();
  }, []);
  useEffect(() => {
    (async () => {
      const acc = await getMyAccounts();
      setAccounts(
        acc.map((a) => ({
          id: a.id,
          label: `${a.accountType} - ${a.accountNumber}`,
        }))
      );
    })();
  }, []);

  const apply = async () => {
    if (!cardType || !accountId) return alert("Select card type and account");
    await createCard(cardType, accountId);
    setDialog(false);
    setCardType("");
    setAccountId(undefined);
    await load();
  };

  const toggle = async (id: number, status: string) => {
    const next = status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    if (!confirm(`Set card to ${next}?`)) return;
    await updateCardStatus(id, next);
    await load();
  };

  const remove = async (id: number) => {
    if (!confirm("Delete this card?")) return;
    await deleteCard(id);
    await load();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">My Cards</h1>
        <div className="flex gap-2">
          <button className="btn btn-outline" onClick={() => setDialog(true)}>
            Apply for New Card
          </button>
        </div>
      </div>

      {cards.length === 0 && (
        <div className="card text-center">
          <div className="text-lg">No Cards Found</div>
          <div className="text-sm text-gray-500 mb-3">
            You don't have any cards yet. Apply to get started.
          </div>
          <button className="btn btn-primary" onClick={() => setDialog(true)}>
            Apply for Your First Card
          </button>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.id} className="card">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{c.cardType}</div>
              <span
                className={`badge ${
                  c.status === "ACTIVE" ? "badge-success" : ""
                }`}
              >
                {c.status}
              </span>
            </div>
            <div className="text-2xl font-mono my-2">{mask(c.cardNumber)}</div>
            <div className="text-sm text-gray-600">{c.cardHolderName}</div>
            <div className="text-sm text-gray-500">Expires: {c.expiryDate}</div>
            <div className="flex gap-2 mt-3">
              <button
                className="btn btn-outline"
                onClick={() => toggle(c.id, c.status)}
              >
                {c.status === "ACTIVE" ? "Deactivate" : "Activate"}
              </button>
              <button className="btn btn-outline" onClick={() => remove(c.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {dialog && (
        <div className="card max-w-md">
          <div className="text-lg font-semibold mb-2">Apply for New Card</div>
          <div className="space-y-3">
            <div>
              <label className="label">Card Type</label>
              <select
                className="input"
                value={cardType}
                onChange={(e) => setCardType(e.target.value as any)}
              >
                <option value="">Select…</option>
                <option value="DEBIT">Debit</option>
                <option value="CREDIT">Credit</option>
              </select>
            </div>
            <div>
              <label className="label">Linked Account</label>
              <select
                className="input"
                value={accountId}
                onChange={(e) => setAccountId(Number(e.target.value))}
              >
                <option value="">Select…</option>
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-outline"
                onClick={() => setDialog(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={apply}>
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cards;
