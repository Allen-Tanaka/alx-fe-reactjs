import React from "react";

function MainContent() {
  return (
    <main
      style={{
        padding: "20px",
        backgroundColor: "#eef2f3",
        minHeight: "300px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Welcome to My React App</h2>
      <p style={{ marginTop: "10px", fontSize: "18px" }}>
        This is the main content section of the page. Explore various components
        styled using inline CSS!
      </p>
    </main>
  );
}

export default MainContent;
