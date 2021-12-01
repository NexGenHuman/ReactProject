import {useState} from "react";
export const Getdate =()=>{
    const[date,setdate]=useState("");
    return (      
        <h1><form>
        <label>
          Podaj date którą chcesz uzyskać
        </label>
        <br />
        <label>
          Email:
          <input type="date" name={date} onChange={(e)=>setdate(e.target.value)} />
        </label><br />
        <a href={'http://localhost:7777/screenings/date/' + date} >Znajdź seanse</a>
      </form>
      </h1>
    );
  };
  export default Getdate;