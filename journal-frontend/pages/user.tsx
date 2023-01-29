// @ts-nocheck
import { useContext, useEffect, useState } from "react"
import { HiOutlineMoon } from "react-icons/hi2"
import { BiDroplet } from "react-icons/bi"
import { MdOutlineShower } from "react-icons/md"
import { TbMoodNeutral, TbMoodSmile, TbMoodSad } from "react-icons/tb"
import { IoNutritionOutline, IoBicycleOutline } from "react-icons/io5"

import { UserContext } from '@/context/UserContext';
import { useRouter } from "next/router"
import Link from "next/link"

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
        var mood = entries.entries.map(item => {
            if (item.type == "Mood") {
                return item;
            }
        })
        var mood = mood[0];

        if(!mood) {
            return(
                <div className="flex flex-col align-center w-2/5">
                    <div className="flex bg-white shadow-md justify-start md:justify-center rounded-lg mx-auto py-4 flex-row mt-4 w-full">
                        No mood added for day
                    </div>
                </div>
            )
        }

        return(
            <div className="flex flex-col align-center w-2/5">
                <div className="flex bg-white shadow-md justify-start  rounded-lg mx-auto py-4 flex-row mt-4 w-full text-2xl">
                    <div className="w-1/4 flex justify-center">
                        <div className="w-2/5">
                            {moods.map(item => {
                                if(item.name == mood.additional.entry) {
                                    return item.icon()
                                }
                            })}
                        </div>
                    </div>
                    <div className="w-1/4 flex text-center m-auto">
                        <div className="w-full">
                            Mood
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-row">
                        <div className="w-full flex flex-col text-center m-auto">
                            <div className="w-full font-bold">
                                {mood.additional.entry}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const displayEntries = () => {
        if (loading) return;
        const itemIcons = [
            {name: "Sleep", icon: () => {return <HiOutlineMoon className="w-full h-full"/>}},
            {name: "Eat", icon: () => {return <IoNutritionOutline className="w-full h-full"/>}},
            {name: "Hydrate", icon: () => {return <BiDroplet className="w-full h-full"/>}},
            {name: "Shower", icon: () => {return <MdOutlineShower className="w-full h-full"/>}},
            {name: "Excercise", icon: () => {return <IoBicycleOutline className="w-full h-full"/>}},
            {name: "Mood", icon: () => {return <TbMoodNeutral className="w-full h-full"/>}},
        ]
        var entry = entries.entries.filter(item => (item.type !== "Mood"))
        entry.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        })
        console.log("entry", entry)
        return(
            <div className="flex flex-col align-center w-2/5">
                {entry.map(item => {
                    var icon = itemIcons.filter(i => (i.name == item.type))[0];
                    var keys = Object.keys(item.additional);
                    console.log(keys)
                    return(
                        <div key={item} className="flex bg-white shadow-md justify-start  rounded-lg mx-auto py-4 flex-row mt-4 w-full text-2xl">

                            <div className="w-1/4 flex justify-center">
                                <div className="w-2/5">
                                    {icon.icon()}
                                </div>
                            </div>

                            <div className="w-1/4 flex text-center m-auto">
                                <div className="w-full">
                                    {item.type}
                                </div>
                            </div>
                            <div className="w-1/2 flex flex-row align-center">
                                {[...Array(keys.length)].map( (_, i) => {
                                    return(
                                        <div key={keys[i]} className="w-full flex flex-col text-center">
                                            <div className="w-full font-bold">
                                                {keys[i]}
                                            </div>
                                            <div className="w-full">
                                                {item.additional[keys[i]]}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {calendarSelection()}
            {displayMood()}
            {displayEntries()}
            <Link href="/user/entry" className="inline-block rounded-lg bg-gray-900 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-gray-600 hover:bg-gray-700 hover:ring-indigo-700 mt-8">
                Add new entry <span className="text-indigo-200" aria-hidden="true">&rarr;</span>
            </Link>
        </div>
    )
}