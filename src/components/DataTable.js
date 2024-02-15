import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/Datatable.css";
import BarChart from "./BarChart";

const DataTable = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [search, setSearch] = useState("");
    const [checkedItems, setCheckedItems] = useState([]);





    useEffect(() => {
        const skip = page * 10;
        axios.get(`https://dummyjson.com/products?limit=10&skip=${skip}`)
            .then(function (response) {
                setData(response.data.products);

            })
            .catch(function (error) {
                setError(error.message);
            });



    }, [page]);


    let OnSearchingofData = (e) => {
        const searchValue = e.target.value
        setSearch(searchValue);
        axios.get(`https://dummyjson.com/products/search?q=${searchValue}&limit=10`)
            .then(function (response) {
                setData(response.data.products);


            })
            .catch(function (error) {
                setError(error.message);
            });
    }

    //Filter with help of arraymethods

    // let OnSearchingofDataAlteranate = (e) => {
    //     const searchValue = e.target.value;
    //     setSearch(searchValue);
    //     axios.get(`https://dummyjson.com/products?limit=0`)
    //         .then(function (response) {
    //             const filteredData = response.data.products.filter(item => item.title.includes(searchValue));
    //             setData(filteredData);
    //         })
    //         .catch(function (error) {
    //             setError(error.message);
    //         });
    // }

    useEffect(() => {

        if (!search) {
            setCheckedItems(data.slice(0, 5));
        }

    }, [data]);


    let OnCLickCheckedItems = (item) => {

        let newData = true;

        const updatedItems = checkedItems.filter(data => {
            if (data.id === item.id) {
                newData = false;
                return false;
            }
            return true;
        });

        if (newData) {
            updatedItems.push(item);

        }

        setCheckedItems(updatedItems);

    }




    return (
        <div className="dataVisual">
            <div className="datatablecontainer">
                {error && <p>{error}</p>}
                <label>Search
                    <input type='search' className="datatablesearch" onChange={OnSearchingofData} />
                </label>



                <table className="datatable">
                    <thead>
                        <tr>
                            <th>Check Box</th>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 && data.map((item) => (
                            <tr key={item.id}>
                                <td><input type="checkbox" onClick={() => { OnCLickCheckedItems(item) }} defaultChecked={item.id < 6} /></td>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td>{item.stock}</td>
                                <td>{item.rating}</td>
                            </tr>
                        ))}
                        {data.length === 0 && <tr><td colSpan="6">No Data Available</td></tr>}
                    </tbody>
                </table>
                {!search ? <button onClick={() => setPage(page - 1)} className="datatablebutton" disabled={page === 0}>Previous</button>
                    : null}
                {!search ? <button onClick={() => setPage(page + 1)} className="datatablebutton" disabled={page === 10}>Next</button>
                    : null}



            </div>
            <div>    <BarChart DataDetails={checkedItems} /></div>
        </div>

    );
};

export default DataTable;
