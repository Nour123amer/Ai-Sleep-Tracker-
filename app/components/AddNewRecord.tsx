"use client"
import addSleepRecord from '@/app/actions/addSleepRecord';
import { useRef, useState } from 'react'

export default function AddNewRecord() {
    const formRef= useRef<HTMLFormElement>(null);
    const [amount, setAmount] = useState(6);
    const [text, setText] = useState('');
    const [date, setDate] = useState('');
    const [alertMessage, setAlertMessage] = useState<string| null>(null);
    const [alertType, setAlertType] =  useState<'success' | 'error' | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [sleepQuality, setSleepQuality] = useState('');

    const clientAction = async (formData:FormData) => {
        setIsLoading(true);
        setAlertMessage(null);

        formData.set('amount', amount.toString());
        formData.set('text', text);
        formData.set('date', date);

        const {error} = await addSleepRecord(formData);
        if(error){
            setAlertMessage(`Error: ${error}`);
            setAlertType('error');
        }else{
            setAlertMessage('Sleep record added successfully!');
            setAlertType('success');
            formRef.current?.reset();
            setAmount(6);
            setSleepQuality('');
        }

        setIsLoading(false);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    }

  return (

     <div className='bg-gray-100 flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded-lg p-8 w-full'>
        <h3 className='text-2xl font-bold text-center mb-6 bg-linear-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent'>
          Track Your Sleep
        </h3>

        <form ref={formRef}
        onSubmit={(e)=>{
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            clientAction(formData);
        }}
        className='space-y-6'
        >
            {/* sleep quality and sleep date */}
            <div className='flex flex-col  md:flex-row  md:space-y-4'>
                <div className='flex-1'>
                    <label htmlFor='text' 
                     className='block text-sm font-medium text-gray-700 mb-2'
                    >Sleep Quality</label>

                    <select 
                    id='text'
                    name='text'
                    >

                    </select>
                </div>
            </div>

        </form>

        </div>

        </div>
 
  )
}
