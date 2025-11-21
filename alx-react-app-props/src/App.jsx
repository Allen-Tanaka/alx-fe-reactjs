import React, { useState } from "react";
import UserContext from "./UserContext";
import Main from "./Main"; // replace with your root component

function App() {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Main />
        </UserContext.Provider>
    );
}

export default App;
