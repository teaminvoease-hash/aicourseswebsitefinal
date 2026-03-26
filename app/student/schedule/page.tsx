import Link from "next/link";

export default function StudentSchedulePage() {
  return (
    <section className="card">
      <h1>Live Class Schedule</h1>
      <p className="small">Attend live classes and use recordings for revision from the materials module.</p>
      <table className="table">
        <thead><tr><th>Date</th><th>Session</th><th>Course</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td>April 15, 2026</td><td>AI Research Prompt Frameworks</td><td>AI Tools for Legal Research</td><td>Upcoming</td></tr>
          <tr><td>April 18, 2026</td><td>Contract Clause Risk Flagging</td><td>AI in Contract Drafting</td><td>Upcoming</td></tr>
          <tr><td>April 21, 2026</td><td>Brief Structuring Lab</td><td>AI for Legal Writing</td><td>Upcoming</td></tr>
        </tbody>
      </table>
      <Link href="/student" className="btn btn-outline" style={{ marginTop: 10 }}>Back to Dashboard</Link>
    </section>
  );
}
