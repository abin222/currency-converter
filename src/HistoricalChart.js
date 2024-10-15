import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Freecurrencyapi from "@everapi/freecurrencyapi-js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HistoricalChart = ({ base, target }) => {
  const [chartData, setChartData] = useState(null);
  const freecurrencyapi = new Freecurrencyapi(
    "fca_live_9FMK0TUx87dDNpA43lJYavN1n5TdQjYaeaWAlJhS"
  );

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 3); // Last 3 months

        const response = await freecurrencyapi.historical({
          base_currency: base,
          currencies: target,
          start_date: startDate.toISOString().split("T")[0],
          end_date: endDate.toISOString().split("T")[0],
        });

        const dates = Object.keys(response.data.rates).sort();
        const rates = dates.map((date) => response.data.rates[date][target]);

        setChartData({
          labels: dates,
          datasets: [
            {
              label: `Exchange Rate (${base} to ${target})`,
              data: rates,
              fill: false,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching historical data:", error);
      }
    };

    fetchHistoricalData();
  }, [base, target, freecurrencyapi]);

  return (
    <div>
      {chartData ? (
        <Line data={chartData} />
      ) : (
        <p>Loading historical data...</p>
      )}
    </div>
  );
};

export default HistoricalChart;
