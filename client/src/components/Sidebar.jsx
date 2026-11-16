function Sidebar({ activePage, setActivePage }) {
    const menuItems = [
        "Overview",
        "Research Projects",
        "Equipment",
        "Prototypes"
    ];

    return (
        <aside className="sidebar">
            <div className="brand">
                <h2>PROTON.</h2>
                <p>Research Workspace</p>
            </div>

            <nav>
                {menuItems.map((item) => (
                    <button className={activePage === item ? "active" : ""} onClick={() => setActivePage(item)} key={item}>
                        {item}
                    </button>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;
