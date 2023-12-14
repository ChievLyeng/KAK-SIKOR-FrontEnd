import React from "react";
import ClientTopBar from "../ClientTopBar";

function ClientLayout({ children }) {
  return (
    <div>
      <nav>
        <ClientTopBar />
      </nav>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
}

export default ClientLayout;
