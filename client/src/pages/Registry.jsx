import { useMemo, useState } from "react";

export default function Registry({ title, eyebrow, description, columns, records }) {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => records.filter((record) => Object.values(record).some((value) => String(value).toLowerCase().includes(query.toLowerCase()))), [records, query]);
  return <section className="registry-page"><div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="muted">{description}</p></div></div><div className="toolbar"><span><strong>{visible.length}</strong> illustrative records</span><input aria-label={`Search ${title}`} placeholder={`Search ${title.toLowerCase()}`} value={query} onChange={(event) => setQuery(event.target.value)} /></div><div className="project-table registry-table"><div className="registry-row table-header">{columns.map((column) => <span key={column.key}>{column.label}</span>)}</div>{visible.length ? visible.map((record) => <div className="registry-row" key={record.id}>{columns.map((column) => <span key={column.key}>{column.key === "name" ? <strong>{record[column.key]}</strong> : record[column.key]}</span>)}</div>) : <div className="empty-state"><h2>No records found.</h2><p>Try another search term.</p></div>}</div></section>;
}
