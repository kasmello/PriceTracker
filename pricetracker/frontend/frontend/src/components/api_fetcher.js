import React, { useState, useEffect } from 'react';

//use function with usestate/useeffect hook
function Apifetcher() {
    const [fuelprices, setPrices] = useState([])
    //fuelprices is the array with everything, setPrices is the setter function  

    const fetchFuels = () => {
        console.log('Fetching...')
        const date = new Date();
        console.log(`from ${date}`)
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        fetch(`http://127.0.0.1:8000/api/price/from=${year}-${month}-${day}/`)
        .then(response => response.json()) //converts data
        .then(json => {
            setPrices(json)
        })
    }

    useEffect(() => { //if this component works
        fetchFuels()
      }, [])

    return (
    <div className='Infodisplay'>
        <h1>All prices recorded this month</h1> 
        {fuelprices.map((price) => (
            //ol is ordered list
            <ol key = { price.id} > 
            Brand: { price.brand },
            Date: { price.date },
            Price: { price.price },
            Address: { price.address }

            </ol>
        ))
        }
    </div>
    );


}


  export default Apifetcher