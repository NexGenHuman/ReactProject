import React from "react";
import axios from 'axios';

export default class GetPopularity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            screenings: [],
            toPrint: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:7777/screenings")
            .then(res => {
                const screenings = res.data;
                this.setState({ screenings });
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.state.screenings.map((screening) => {
            if (screening.date == e.target.screening_date.value && screening.movieID==e.target.movie_id.value) {
                axios.get("http://localhost:7777/movies/" + screening.movieID)
                    .then(res => {
                        const movie = res.data;
                        const item = {
                            id: movie.id,
                            title: movie.title,
                            popularity: screening.soldTicketsNumber
                        }
                        this.setState({ toPrint: [...this.state.toPrint, item] })
                    })
            }
        })
        this.state.screenings.map((screening) => {
            if (screening.date == e.target.screening_date2.value && screening.movieID==e.target.movie_id.value) {
                axios.get("http://localhost:7777/movies/" + screening.movieID)
                    .then(res => {
                        const movie = res.data;
                        const item = {
                            id: movie.id,
                            title: movie.title,
                            popularity: screening.soldTicketsNumber
                        }
                        this.setState({ toPrint: [...this.state.toPrint, item] })
                    })
            }else{
                axios.get("http://localhost:7777/movies/" + screening.movieID)
                .then(res => {
                    const movie = res.data;
                    const item = {
                        id: movie.id,
                        title: movie.title,
                        popularity: 0
                    }
                    this.setState({ toPrint: [...this.state.toPrint, item] })
                })
            }
        }
        )
    }

    render() {
        console.log(this.state.toPrint);
        return (
            <div>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <label>Screening date:</label><br />
                    <input type="number" name="movie_id"/><br/>
                    <input type="date" name="screening_date" /><br />
                    <input type="date" name="screening_date2" /><br />
                    <input type="submit" value="Get" ></input>
                </form>
                <div className="listBlock">
                        {this.state.toPrint.map((item) => {
                            return (<p key={item.id}>{item.title} - {item.popularity}</p>)
                        })}
                </div>
            </div>
        );
    }
}


/*
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
  export default Getdate;*/