import {React,useState,useEffect,useMemo,useRef} from 'react'
import '../../Css/Components/Search/SearchLayout.css'

import ShownPeople from './shownPeople' 
import _ from 'loadsh'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useAuth } from '../../Store/AuthContext'

import img1 from '../../assets/business.jpg'
import img2 from '../../assets/business2.jpg'
import img3 from '../../assets/business3.jpg'

function SearchLayout() {

  const token = Cookies.get('user');
  //letting future works behind, only names allowed
  const [nameList, setNameList] = useState();
  const [result, setResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [image, setImage] = useState('');
  const { url } = useAuth();

  const countRef = useRef(0);

  useEffect(() => {
    countRef.current += 1;
  });


  const searchResult = useMemo(() => _.debounce(async (searchTerm) => {
    try {
      // console.log(searchTerm);
      const response = await axios.get(`${url}/api/search/searchAllRecommendedUsers?name=${searchTerm}`, {
        headers: {
          Authorization: `Bearer: ${token}`,
        }
      });
      if (!response) {
        console.log("Couldn't' get search results");
        return;
      }
      setResult(response.data);
    }
    catch (err) {
      console.log(err.message);
      console.log("Couldn't get search results");
    }
  }, 500), [searchTerm]);


  useEffect(() => {
    searchResult(searchTerm);
    return () => searchResult.cancel();
  }, [searchTerm]);

  

  return (
    <div className="SearchLayout">
      {/* <h1>{ countRef.current}</h1> */}
          <div className="col1"></div>
        <div className="searchSection">
        <div className="searchActivities">
          <div className="searchbarLayout">
            
            <div className="searchbarFilters">
              <div className="searchbarfilter1"></div>
              <div className="searchbarfilter2"></div>
              <div className="searchbarfilter3"></div>
            </div>

            <div className="searchbarFromSearchLayout">
                        <input
            type="text"
            placeholder="Search for your people"
            onChange={(e) =>setTimeout(()=> setSearchTerm(e.target.value), 1000) }
          />

            </div>

            </div>
              </div>
               <div className="visiblePeople">
                    { result.map((data,key)=>
                    <ShownPeople key={key} data={ data} />
                  )
                      }
              </div>
          </div>
          <div className="col3"></div>
    </div>
  )
}

export default SearchLayout