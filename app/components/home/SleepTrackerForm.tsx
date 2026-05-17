"use client"
import addSleepRecord from "@/app/actions/addSleepRecord";
import { SleepDataContext } from "@/app/context/SleepDataContext";
import { useContext, useRef, useState } from "react";
import { toast } from "sonner";

export const SleepTrackerForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [amount, setAmount] = useState(6);
    const [text, setText] = useState('');
    const [date, setDate] = useState('');
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<'success' | 'error' | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [sleepQuality, setSleepQuality] = useState('Refreshed');
    const { addSleepRecord } = useContext(SleepDataContext)!;

    const clientAction = async (formData: FormData) => {
        setIsLoading(true);
        setAlertMessage(null);

        formData.set('amount', amount.toString());
        formData.set('text', sleepQuality);
        formData.set('date', date);

        addSleepRecord({
            amount,
            text: sleepQuality,
            date,
            id: Math.random().toString(36).substr(2, 9)
        })



        // const { error } = await addSleepRecord(formData);
        console.log(Object.fromEntries(formData.entries()));

    }
    return (
        <div className=" bg-white p-8 rounded-xl shadow-md border border-gray-100">
            <h2 className="text-2xl font-bold text-pink-500 text-center mb-6">Track Your Sleep</h2>
            <form
                ref={formRef}
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(formRef.current!);
                    clientAction(formData);
                    console.log(Object.fromEntries(formData.entries()));
                    setAmount(6);
                    setText("");
                    setDate("");
                }}
                className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <label className="block text-xs font-semibold mb-1">Sleep Quality</label>
                    <select
                        value={sleepQuality}
                        name="sleepQuality"
                        onChange={(e) => { setSleepQuality(e.target.value) }}
                        className="w-full p-2 border rounded-md text-gray-500 bg-white">
                        <option
                            value='' disabled>Sleep quality...</option>
                        <option
                            value='Refreshed'>Refreshed</option>
                        <option
                            value='Tired'>Tired</option>
                        <option
                            value='Exhausted'>Exhausted</option>
                        <option
                            value='Energitic' >Energitic</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold mb-1">Sleep Date</label>
                    <input type="date"
                        name="date"
                        value={date}
                        onChange={(e) => { setDate(e.target.value) }}
                        className="w-full p-2 border rounded-md text-gray-500" defaultValue="2026-05-12" />
                </div>


                <div className="mb-8 w-full ">
                    <label className="block text-xs font-semibold">Hours Slept</label>
                    <p className="text-[10px] text-gray-400 mb-2">(Select between 0 and 12 in steps of 0.5)</p>
                    <input type="range"
                        name="amount"
                        step='0.5'
                        value={amount}
                        onChange={(e) => { setAmount(parseFloat(e.target.value)) }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" min="0" max="12" />
                    <p className="text-center mt-2 text-sm text-gray-600">{amount} hours</p>
                    <button type="submit"
                        className="w-full cursor-pointer py-3 bg-linear-to-r from-fuchsia-500 to-pink-500 text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                        onClick={() => { toast.success("Record added successfully!") }}
                    >
                        Add Sleep Record
                    </button>
                </div>
            </form>
            {/* Alert Message */}
            {alertMessage && (
                <div className={`p-4 rounded-lg ${alertType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {alertMessage}
                </div>
            )}
        </div>


    );
};