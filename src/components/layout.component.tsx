import AppContainer from "./app.component";
import TopBarComponent from "./topbar.component";

export function Layout() {
    return (
        <div className="layout">
            <TopBarComponent />
            <AppContainer />
        </div>
    );
}