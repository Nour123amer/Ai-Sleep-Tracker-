
"use client"
import { useEffect, useState } from 'react';
import { Bar, BarChart, BarShapeProps, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const MyCustomShape = (props: BarShapeProps) => {
    const [isActive, setIsActive] = useState(false);
    const handleMouseClick = () => {
        setIsActive(curr => !curr);
    };
    const fill = isActive ? '#82ca9d' : '#8884d8';
    return <Rectangle {...props} onClick={handleMouseClick} fill={fill} />;
};

const SleepRecordChart = () => {
    const [sleepData, setSleepData] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem('sleepData');
        if (storedData) {
            setSleepData(JSON.parse(storedData));
        }
        console.log("Loaded sleep data from localStorage:", storedData);
    }, []);

    return (
        <>

            <div className="w-full h-100 bg-white rounded-2xl shadow-md border border-gray-100 p-5">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Sleep Hours Per Day
                    </h2>

                    <span className="text-xs text-gray-400">
                        Last 7 days
                    </span>
                </div>

                <ResponsiveContainer width="100%" height="90%">
                    <BarChart
                        barCategoryGap="10%"
                        data={sleepData}
                    >
                        <CartesianGrid strokeDasharray="2 2" />

                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12, fill: "#6b7280" }}
                        />

                        <YAxis
                            tick={{ fontSize: 12, fill: "#6b7280" }}
                        />

                        <Tooltip
                            contentStyle={{
                                borderRadius: "0px",
                                border: "1px solid #e5e7eb",
                            }}
                        />

                        <Bar
                            dataKey="amount"
                            shape={MyCustomShape}
                            barSize={40}
                            radius={[0, 0, 0, 0]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>


        </>
    );
};

export default SleepRecordChart;