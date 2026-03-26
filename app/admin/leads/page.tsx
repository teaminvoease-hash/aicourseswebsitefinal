const sampleLeads = [
  ["Priya Sharma", "LLB Student", "Delhi", "Brochure Request", "New"],
  ["Rahul Menon", "Associate", "Bengaluru", "Callback", "Follow-up"],
  ["Neha Patel", "Compliance", "Mumbai", "Syllabus", "Counseled"],
];

export default function AdminLeadsPage() {
  return (
    <section className="card">
      <h1>Lead & Inquiry Management</h1>
      <p className="small">Capture and segment leads by profession, city, and inquiry type for admissions conversion.</p>
      <table className="table">
        <thead><tr><th>Name</th><th>Profession</th><th>City</th><th>Source</th><th>Stage</th></tr></thead>
        <tbody>{sampleLeads.map((row) => <tr key={row.join('-')}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </section>
  );
}
