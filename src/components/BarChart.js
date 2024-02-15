import React from "react";
import Plot from "react-plotly.js";
import "../components/Datatable.css";
const BarChart = ({ DataDetails }) => {
    const data1 = DataDetails.map(item => ({
        x: [item.title],
        y: [item.price],
        type: "bar",
        name: item.title + "with Price"
    }));

    const data2 = DataDetails.map(item => ({
        x: [item.title],
        y: [item.stock],
        type: "bar",
        name: item.title + "with stock"
    }));

    var data = [...data1, ...data2];

    return (
        <div className="chart">
            <Plot
                data={data}
                layout={{ title: "Bar Chart Products of Stocks and Price" }}

            />
        </div>
    );
};

export default BarChart;
