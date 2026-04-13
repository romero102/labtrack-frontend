import {Outlet} from "react-router-dom"
import Navbar from "./Navbar"

function Layout() {
    return(
        <>
        <Navbar/>
        <main className="max-w-6xl mx-auto p-4">
            <Outlet/>
        </main>
        </>
    )
}

export default Layout