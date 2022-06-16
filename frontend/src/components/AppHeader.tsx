import NavBar from "./NavBar";
import "./AppHeader.css"


export default function AppHeader() {
    return <div className={"header_container"}>
        <h1 className={"header"}>Camp4All</h1>
        <NavBar/>
    </div>
}