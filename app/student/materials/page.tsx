import Link from "next/link";

const items = [
  ["Legal Research Prompt Pack", "PDF", "Updated"],
  ["Contract Drafting Checklist", "DOCX", "Updated"],
  ["Compliance Documentation Template", "XLSX", "Updated"],
  ["Class Recording Links", "Portal", "Weekly"],
];

export default function StudentMaterialsPage() {
  return (
    <section className="card">
      <h1>Study Materials</h1>
      <p className="small">Download templates, checklists, and revision resources for enrolled courses.</p>
      <table className="table">
        <thead><tr><th>Resource</th><th>Format</th><th>Last Updated</th></tr></thead>
        <tbody>{items.map(([title, format, status]) => <tr key={title}><td>{title}</td><td>{format}</td><td>{status}</td></tr>)}</tbody>
      </table>
      <Link href="/student" className="btn btn-outline" style={{ marginTop: 10 }}>Back to Dashboard</Link>
    </section>
  );
}
