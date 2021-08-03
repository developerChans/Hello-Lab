import { useEffect } from "react";
import axios from "axios";

function LandingPage() {
  return (
    <div>
      <h1>LandingPage</h1>
      <hr></hr> 랜딩페이지
      <section labs="Labs">
        Labs
        <ul>
          <li>연구실1</li>
          <li>연구실2</li>
        </ul>
      </section>
    </div>
  );
}

export default LandingPage;
