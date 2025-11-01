import React, { useEffect, useState } from "react";
import { getMe, updateMe } from "@/services/users";

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const u = await getMe();
        setForm((f) => ({
          ...f,
          username: u.username,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          phoneNumber: u.phoneNumber,
          address: u.address || "",
        }));
      } catch (e: any) {
        setError(e?.response?.data?.error || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const change = (k: string, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const save = async () => {
    setSaving(true);
    setError("");
    setOk("");
    try {
      await updateMe({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        address: form.address,
        dateOfBirth: form.dateOfBirth || undefined,
      });
      setOk("Profile updated successfully!");
      setEditing(false);
    } catch (e: any) {
      setError(e?.response?.data?.error || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">My Profile</h2>
        {!editing ? (
          <button className="btn btn-primary" onClick={() => setEditing(true)}>
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              className="btn btn-primary"
              onClick={save}
              disabled={saving}
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>
            <button
              className="btn btn-outline"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {error && <div className="card text-red-600">{error}</div>}
      {ok && <div className="card text-green-700">{ok}</div>}

      {loading ? (
        <div className="card">Loading…</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 card space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="label">Username</label>
                <input className="input" value={form.username} disabled />
              </div>
              <div>
                <label className="label">Account Status</label>
                <div>
                  <span className="badge badge-success">ACTIVE</span>
                </div>
              </div>
              <div>
                <label className="label">First Name</label>
                <input
                  className="input"
                  value={form.firstName}
                  disabled={!editing}
                  onChange={(e) => change("firstName", e.target.value)}
                />
              </div>
              <div>
                <label className="label">Last Name</label>
                <input
                  className="input"
                  value={form.lastName}
                  disabled={!editing}
                  onChange={(e) => change("lastName", e.target.value)}
                />
              </div>
              <div>
                <label className="label">Email</label>
                <input
                  className="input"
                  value={form.email}
                  disabled={!editing}
                  onChange={(e) => change("email", e.target.value)}
                />
              </div>
              <div>
                <label className="label">Phone Number</label>
                <input
                  className="input"
                  value={form.phoneNumber}
                  disabled={!editing}
                  onChange={(e) => change("phoneNumber", e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className="label">Address</label>
                <input
                  className="input"
                  value={form.address}
                  disabled={!editing}
                  onChange={(e) => change("address", e.target.value)}
                />
              </div>
              <div>
                <label className="label">Date of Birth</label>
                <input
                  type="date"
                  className="input"
                  value={form.dateOfBirth}
                  disabled={!editing}
                  onChange={(e) => change("dateOfBirth", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="card text-center space-y-2">
            <div className="text-5xl">👤</div>
            <div className="font-semibold">
              {form.firstName} {form.lastName}
            </div>
            <div className="text-sm text-gray-500">@{form.username}</div>
            <span className="badge badge-success">ACTIVE</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;
