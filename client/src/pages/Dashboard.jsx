
import { useEffect, useState } from "react";
import { projectService } from "../services/projectService";

function Dashboard({ onViewProjects, onAddProject }) {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState("");
    useEffect(() => {
        projectService.list().then(setProjects).catch(() => setError("The project register is temporarily unavailable."));
    }, []);
    const active = projects.filter((project) => project.status === "In Progress").length;
    return (
        <div className="dashboard">

            <div className="dashboard-heading">
                <div>
                    <p className="eyebrow">PROTON / OVERVIEW</p>
                    <h1>Research at a glance.</h1>
                    <p className="muted">
                        An overview of laboratory operations.
                    </p>
                </div>

                <button className="add-button" onClick={onAddProject}>
                    + New Project
                </button>
            </div>

            <section className="metrics">
                <div className="metric">
                    <p>ACTIVE PROJECTS</p>
                    <h2>{active.toString().padStart(2, "0")}</h2>
                </div>

                <div className="metric">
                    <p>TOTAL PROJECTS</p>
                    <h2>{projects.length.toString().padStart(2, "0")}</h2>
                </div>

                <div className="metric">
                    <p>EQUIPMENT</p>
                    <h2>—</h2>
                </div>

                <div className="metric">
                    <p>PROTOTYPES</p>
                    <h2>—</h2>
                </div>
            </section>

            <section className="projects-section">
                <div className="section-heading">
                    <div>
                        <p className="eyebrow">RESEARCH ACTIVITY</p>
                        <h2>Current projects</h2>
                    </div>

                    <button className="view-all" onClick={onViewProjects}>VIEW ALL ↗</button>
                </div>

                {error ? <p className="api-error">{error}</p> : <div className="project-table dashboard-table">
                    <div className="table-row table-header dashboard-row">
                        <span>PROJECT</span>
                        <span>IDENTIFIER</span>
                        <span>DOMAIN</span>
                        <span>STATUS</span>
                    </div>

                    {projects.slice(0, 5).map((project) => (
                        <div className="table-row dashboard-row" key={project.id}>
                            <strong>{project.name}</strong>
                            <span>{project.code}</span>
                            <span>{project.area}</span>
                            <span className="project-status">
                                {project.status}
                            </span>
                        </div>
                    ))}
                    {!projects.length && <p className="loading">Loading current projects…</p>}
                </div>}
            </section>

        </div>
    );
}

export default Dashboard;
