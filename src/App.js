import React, { useState, useEffect } from "react";
import "./App.css";
import { createApi } from "unsplash-js";

const api = createApi({
  accessKey: "pd8vatOVhEbjFEgGiN1b7eQvBU9K9-5DfsMYLkBS0oc",
});

const Photo = (props) => {
  const { user, urls } = props.photo;
  return (
    <div className="picture-container" onClick={()=>props.expandview(props.photo)}>
	  <div>
        <img className="img" src={urls.regular} />
	  </div>
    </div>
  );
};

const ResultDetails = (props) => {
	if(props.info!=null){
		return(
			<div className="result-details" style={props.visible?{}:{display:'none'}}>
				<img className="img" src={props.info.urls.regular} />
				<div className="info">
					<div>Title: {props.info.alt_description}</div>
					<div>Author: {props.info.user.first_name}</div>
					<div>Author bio: {props.info.user.bio}</div>
					<button onClick={props.closeview}>Close</button>
				</div>
			</div>
		)
	}
}

const Results = (props) => {
	const [detailInfo, setDetailInfo] = useState(null);
	const [detailOpen, setDetailOpen] = useState(false);
	if (props === null) {
	
	} else if (props.errors) {
		return (
		  <div>
			<div>{props.errors[0]}</div>
			<div>PS: Make sure to set your access token!</div>
		  </div>
		);
	} else if(props.images != undefined && props.images.response.results != undefined && props.images.response.results.length > 0) {
		const nextPage = () => {
			props.nextpage();
			setDetailOpen(false);
		};
		const prevPage = () => {
			props.prevpage();
			setDetailOpen(false);
		};

		const expandView = (id) => {
			setDetailInfo(id);
			setDetailOpen(true);
		};

		const closeView = (id) => {
			setDetailOpen(false);
		};
		return (
		  <div>
			  <div className="results-grid">
				{props.images.response.results.map((photo) => (
				  <Photo key={photo.id} photo={photo} expandview={expandView}  />
				))}
				<ResultDetails info={detailInfo} visible={detailOpen} closeview={closeView} />
			  </div>
			  <div className="results-buttons">
				<button onClick={prevPage} disabled={props.currentpage <= 1}>Previous Page</button>
				<button onClick={nextPage}>Next Page</button>
			  </div>
		  </div>
		);
	}
};

function App() {
  const [searchPage, setsearchPage] = useState(1);
	useEffect(() => {
		fireSearch();
	}, [searchPage])
  const [imgList, setNewimgList] = useState(null);
  const [newSearch, setNewSearch] = useState("");
  const handleChangeSearch = (event) => {
    setNewSearch(event.target.value);
  };

  const fireSearch = (event) => {
    if (event) {
      event.preventDefault();
    }
    api.search
      .getPhotos({
        query: newSearch,
        orientation: "landscape",
        page: searchPage,
      })
      .then((response) => {
        setNewimgList(response);
      })
      .catch(() => {
        console.log("Search error!");
      });
  };

  function prevPage() {
    setsearchPage((s) => s - 1);
  }
  function nextPage() {
    setsearchPage((s) => s + 1);
    fireSearch();
  }
  return (
    <div className="App">
      <h2>Imatia Image Search</h2>
      <form onSubmit={fireSearch}>
        <input type="text" value={newSearch} onChange={handleChangeSearch} />
        <button type="submit">Search</button>
      </form>
      <Results
        images={imgList}
        prevpage={prevPage}
        nextpage={nextPage}
        currentpage={searchPage}
      />
    </div>
  );
}

export default App;
