
import { Link } from "react-router-dom";
  /** Don't forget to JS-Doc all your components to know what you're doing! */
export default function Hello() {

  return (
    <div className="App">

    <header className="App-header">
      <Link to ="/">
         <button className="my-buttons-header primary">Signup</button>
       </Link>
       <Link to ="/">
          <button className="my-buttons-header primary">Login</button>
      </Link>
    </header>

      <body className="App-body">
        <h1>Welcome to YumYumRank!</h1>
      <div>
        <Link to="/restaurants" >
          <button className="my-buttons secondary">Restaurants</button>
        </Link>
        <Link to="/dishes">
          <button className="my-buttons secondary">Dishes</button>
        </Link>
      </div>
      </body>
    </div>
  );
}
