
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Registry from "./pages/Registry";
import "./App.css";

function App() {
    const [activePage, setActivePage] = useState("Overview");
    const [createProjectSignal, setCreateProjectSignal] = useState(0);
    const openProjectForm = () => {
        setActivePage("Research Projects");
        setCreateProjectSignal((value) => value + 1);
    };

    return (
        <div className="app">
            <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
            />

            <main className="main">
                {activePage === "Overview" && <Dashboard onViewProjects={() => setActivePage("Research Projects")} onAddProject={openProjectForm} />}

                {activePage === "Research Projects" && <Projects openCreateSignal={createProjectSignal} />}

                {activePage === "Equipment" && (
                    <Registry title="Equipment inventory." eyebrow="PROTON / EQUIPMENT REGISTER" description="Illustrative equipment tracking for laboratory operations." columns={[{ key: "name", label: "EQUIPMENT" }, { key: "id", label: "ASSET ID" }, { key: "location", label: "LOCATION" }, { key: "state", label: "STATE" }]} records={[{ id: "EQ-014", name: "Optical bench system", location: "Imaging Lab", state: "Available" }, { id: "EQ-027", name: "Environmental chamber", location: "Materials Lab", state: "In use" }, { id: "EQ-041", name: "Precision scale", location: "Analysis Lab", state: "Calibration due" }]} />
                )}

                {activePage === "Prototypes" && (
                    <Registry title="Prototype registry." eyebrow="PROTON / PROTOTYPE REGISTER" description="Illustrative prototype records for review and development planning." columns={[{ key: "name", label: "PROTOTYPE" }, { key: "id", label: "IDENTIFIER" }, { key: "stage", label: "STAGE" }, { key: "owner", label: "OWNER" }]} records={[{ id: "PT-018", name: "Vein finder enclosure", stage: "Bench validation", owner: "Device Systems" }, { id: "PT-023", name: "Respiratory sensor", stage: "Design review", owner: "Signal Research" }, { id: "PT-031", name: "Nutrient probe", stage: "Field testing", owner: "Applied Sensing" }]} />
                )}
            </main>
        </div>
    );
}

export default App;
