import {React,useState,useEffect,useMemo} from 'react'
import '../../Css/Components/Search/SearchLayout.css'

import ShownPeople from './shownPeople' 


import img1 from '../../assets/asta.jpg'
import img2 from '../../assets/liebe.png'
import img3 from '../../assets/user_post1.jpg'

function SearchLayout() {

  //letting future works behind, only names allowed
  const names = [{
    img: img1,
    name: "Saravanan",
    followers: "90",
    upvotes: "121212"
  }, {
    img: img2,
    name: "Shrishalini",
    followers: "1",
    upvotes: "0"
  }, {
    img: img3,
    name: "Latha",
    followers: "23",
    upvotes: "2"
    }];
  
  const [nameList, setNameList] = useState(names);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
            
      setDebouncedSearchTerm(searchTerm)
    }, 300);
          
    return () => {
      clearTimeout(handler)
    }
  }, [searchTerm]);
  
  //usememo is used to help skipping the recalculations by caching the result of previous calc
  
const filteredPersons = useMemo(() => {
  return names.filter(({ name }) =>
    name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );
}, [debouncedSearchTerm, names]);  

  return (
    <div className="SearchLayout">
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
              <input type="text" placeholder="Search for your people"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} />
            </div>

            </div>
              </div>
               <div className="visiblePeople">
                    {filteredPersons.map((data,key)=>
                    
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