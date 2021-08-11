import { useEffect } from "react";
import axios from "axios";

function LandingPage() {
<<<<<<< HEAD
=======
<<<<<<< HEAD
  useEffect(() => {
    axios.get("/api/hello").then((response) => console.log(response.data));
  }, []);

  return <div>LandingPage 랜딩페이지</div>;
=======
>>>>>>> 52ded8f6f785539dafa16c51431d72dd6ca4fe4d
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
<<<<<<< HEAD
=======
>>>>>>> b25a0c3dc5a583bdfc707ffa32689896e94be7fa
>>>>>>> 52ded8f6f785539dafa16c51431d72dd6ca4fe4d
}

export default LandingPage;
