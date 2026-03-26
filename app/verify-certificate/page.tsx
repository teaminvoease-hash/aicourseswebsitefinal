"use client";

import { useState } from "react";

type Result = {
  valid: boolean;
  studentName?: string;
  courseTitle?: string;
  issuedAt?: string;
  message?: string;
};

export default function VerifyCertificatePage() {
  const [verificationId, setVerificationId] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  async function verify() {
    const res = await fetch(`/api/certificate/verify?id=${encodeURIComponent(verificationId)}`);
    const data = (await res.json()) as Result;
    setResult(data);
  }

  return (
    <section>
      <h1>Certificate Verification</h1>
      <div className="card" style={{ maxWidth: 560 }}>
        <label>Enter unique verification ID</label>
        <input value={verificationId} onChange={(e) => setVerificationId(e.target.value)} />
        <button className="btn" style={{ marginTop: 10 }} onClick={verify}>Verify</button>
        {result ? (
          <div style={{ marginTop: 12 }}>
            {result.valid ? (
              <>
                <p>✅ Valid certificate</p>
                <p>Student: {result.studentName}</p>
                <p>Course: {result.courseTitle}</p>
                <p>Issued on: {result.issuedAt}</p>
              </>
            ) : (
              <p>❌ {result.message}</p>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
