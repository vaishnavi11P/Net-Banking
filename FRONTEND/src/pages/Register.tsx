import React, { useState } from "react";
import { register } from "@/services/auth";
import { Link, useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const nav = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
    confirm: "",
  });
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");

  const set = (k: string, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    setOk("");
    if (form.password !== form.confirm) return setErr("Passwords do not match");
    try {
      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        email: form.email,
        phoneNumber: form.phoneNumber,
        address: form.address,
        password: form.password,
      });
      setOk("User registered successfully!");
      nav("/login");
    } catch (e: any) {
      setErr(e?.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="grid items-center justify-start bg-gray-50 min-h-[calc(100dvh-3.5rem)] pl-12">
      <form
        onSubmit={submit}
        className="card w-full max-w-2xl grid grid-cols-2 gap-4"
      >
        <h2 className="text-xl font-semibold col-span-2">Register User</h2>
        {err && <div className="text-red-600 text-sm col-span-2">{err}</div>}
        {ok && <div className="text-green-600 text-sm col-span-2">{ok}</div>}
        <div>
          <label className="label">First Name</label>
          <input
            className="input"
            onChange={(e) => set("firstName", e.target.value)}
          />
        </div>
        <div>
          <label className="label">Last Name</label>
          <input
            className="input"
            onChange={(e) => set("lastName", e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label className="label">Username</label>
          <input
            className="input"
            onChange={(e) => set("username", e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label className="label">Email</label>
          <input
            className="input"
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label className="label">Phone Number</label>
          <input
            className="input"
            onChange={(e) => set("phoneNumber", e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label className="label">Address</label>
          <input
            className="input"
            onChange={(e) => set("address", e.target.value)}
          />
        </div>
        <div>
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            onChange={(e) => set("password", e.target.value)}
          />
        </div>
        <div>
          <label className="label">Confirm Password</label>
          <input
            type="password"
            className="input"
            onChange={(e) => set("confirm", e.target.value)}
          />
        </div>
        <button className="btn btn-primary col-span-2" type="submit">
          Register
        </button>
        <div className="text-sm col-span-2 text-center">
          Already a user?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Register;
