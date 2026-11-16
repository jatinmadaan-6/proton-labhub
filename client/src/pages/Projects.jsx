import { useEffect, useMemo, useState } from "react";
import ProjectTable from "../components/ProjectTable";
import ProjectForm from "../components/ProjectForm";
import ConfirmDialog from "../components/ConfirmDialog";
import { projectService } from "../services/projectService";

export default function Projects({ openCreateSignal }) {
 const [projects, setProjects] = useState([]), [loading, setLoading] = useState(true), [error, setError] = useState(""), [query, setQuery] = useState(""), [status, setStatus] = useState("All statuses"), [editing, setEditing] = useState(null), [deleting, setDeleting] = useState(null), [saving, setSaving] = useState(false), [notice, setNotice] = useState("");
 const load = async () => { setLoading(true); setError(""); try { setProjects(await projectService.list()); } catch (err) { setError(`${err.message} Start the API and configure PostgreSQL to load the register.`); } finally { setLoading(false); } };
 // Fetching on mount necessarily transitions from the loading state to fetched data.
 // oxlint-disable-next-line react(set-state-in-effect)
 useEffect(() => { load(); }, []);
 useEffect(() => { if (openCreateSignal) setEditing({}); }, [openCreateSignal]);
 const visible = useMemo(() => projects.filter((p) => (status === "All statuses" || p.status === status) && [p.name,p.code,p.area,p.lead].some((value) => value.toLowerCase().includes(query.toLowerCase()))), [projects, query, status]);
 const save = async (form) => { setSaving(true); try { const result = editing?.id ? await projectService.update(editing.id, form) : await projectService.create(form); setProjects((items) => editing?.id ? items.map((p) => p.id === result.id ? result : p) : [result, ...items]); setEditing(null); setNotice(editing?.id ? "Project updated." : "Project added to the register."); } finally { setSaving(false); } };
 const remove = async () => { setSaving(true); try { await projectService.remove(deleting.id); setProjects((items) => items.filter((p) => p.id !== deleting.id)); setDeleting(null); setNotice("Project deleted."); } catch (err) { setError(err.message); } finally { setSaving(false); } };
 return <div className="projects-page"><div className="page-heading"><div><p className="eyebrow">PROTON / RESEARCH REGISTER</p><h1>Research projects.</h1><p className="muted">A working register for illustrative laboratory research initiatives.</p></div><button className="add-button" onClick={() => setEditing({})}>+ Add project</button></div><div className="toolbar"><span><strong>{projects.length}</strong> projects in register</span><div><input aria-label="Search projects" placeholder="Search projects" value={query} onChange={(e) => setQuery(e.target.value)} /><select aria-label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}><option>All statuses</option>{["Planning", "In Progress", "On Hold", "Completed"].map((item) => <option key={item}>{item}</option>)}</select></div></div>{notice && <p className="notice" role="status">{notice}</p>}{error && <div className="api-error" role="alert">{error}<button onClick={load}>Try again</button></div>}{loading ? <p className="loading">Loading project register…</p> : !error && <ProjectTable projects={visible} onEdit={setEditing} onDelete={setDeleting} />}{editing && <ProjectForm project={editing.id ? editing : null} onClose={() => setEditing(null)} onSave={save} saving={saving} />}{deleting && <ConfirmDialog project={deleting} onCancel={() => setDeleting(null)} onConfirm={remove} saving={saving} />}</div>;
}
