import Menu from "./Menu"
function Header() {
    return (
        <header className="header">
            <img src="/logo.svg" alt="PhotoEdit" width={32} height={32} />
            <span>PhotoEdit</span>
            <Menu 
                label="File"
                items={[
                    { label: "Open", onClick: () => console.log("open")},
                    { label: "Save", onClick: () => console.log("save")},
                ]}
            />
        </header>
    )
}

export default Header