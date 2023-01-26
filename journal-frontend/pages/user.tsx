import { useContext, useEffect, useState } from "react"
import { HiOutlineMoon } from "react-icons/hi2"
import { BiDroplet } from "react-icons/bi"
import { MdOutlineShower } from "react-icons/md"
import { TbMoodNeutral, TbMoodSmile, TbMoodSad } from "react-icons/tb"
import { IoNutritionOutline, IoBicycleOutline } from "react-icons/io5"

import { UserContext } from '@/context/UserContext';
import { useRouter } from "next/router"

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function UserPage() {
    const [date, setDate] = useState({date: 0})
    const [entries, setEntries] = useState([])
    const [loading, setLoading] = useState(true);


    const router = useRouter()

    const userData = useContext(UserContext);
    console.log(userData, userData.username)
    
    useEffect(() => {
        async function fetchData() {
            const data = {
                date: date.date,
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }
            const response = await fetch('/api/journal/get', options)
            const respData = await response.json();
            setEntries(respData);
            setLoading(false);
            console.log(response, respData)
        }
        fetchData();
    }, [date]);


    const selectDate = (event, key) => {
        console.log(event.currentTarget, key)
        setDate({date: key})
    }

    const calendarSelection = () => {
        const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
        return(
            <div className="flex bg-white shadow-md justify-start md:justify-center rounded-lg mx-auto py-4 px-2 md:mx-12 flex-row-reverse">
                {[...Array(7)].map( (_, i) => {
                    var currentDate = new Date();
                    currentDate.setDate(currentDate.getDate() - i)
                    var selected = (date.date == i) ? 'bg-gray-300 border-black' : '';
                    return(
                        <div key={i} className={classNames(selected, "flex group hover:bg-gray-200 hover:shadow-lg hover-dark-shadow rounded-lg mx-1 transition-all duration-300 cursor-pointer justify-center w-16")} onClick={e => selectDate(e, i)}>
                            <div className="flex items-center px-4 py-4">
                                <div className="text-center">
                                    <p className="text-gray-900 text-sm transition-all duration-300">{weekday[currentDate.getDay()]}</p>
                                    <p className="text-gray-900 mt-3 transition-all	duration-300">{currentDate.getDate()}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    const displayMood = () => {
        const moods = [
            {name: "happy", icon: () => {return <TbMoodSmile className="w-full h-full" />}},
            {name: "neutral", icon: () => {return <TbMoodNeutral className="w-full h-full" />}},
            {name: "sad", icon: () => {return <TbMoodSad className="w-full h-full" />}},
        ]
        if (loading) return;
        var entry = entries.entries;
        console.log(typeof(entry), entry)
        var mood = entries.entries.map(item => {
            if (item.type == "Mood") {
                return item;
            }
        })
        var mood = mood[0];

        if(!mood) {
            return(
                <div>
                    No mood added for day
                </div>
            )
        }

        return(
            <div className="flex bg-white shadow-md justify-start md:justify-center rounded-lg mx-auto py-4 px-2 md:mx-12 flex-row mt-4">
                <div className="">
                    {moods.map(item => {
                        if(item.name == mood.additional.entry) {
                            return item.icon()
                        }
                    })}
                </div>
                {mood.additional.entry}
            </div>
        )
    }

    const displayEntries = () => {
        return (
            {displayMood}
        )
    }

    return (
        <div className="flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div>
                {calendarSelection()}
            </div>
            <div>
                {displayMood()}
            </div>
            
        </div>
    )
}