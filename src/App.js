import React from 'react';

import AppTabPanel from "./components/AppTabPanel";

export function App() {
    return (
        <div className="app">
            <div className="title-bg p-2 bg-primary">
                <div className="title container text-white font-weight-bold">
                    React-Redux-CRUD-System
                </div>
            </div>
            <div className="app_buttons_tab">
                <AppTabPanel/>
            </div>
        </div>
    );
}
