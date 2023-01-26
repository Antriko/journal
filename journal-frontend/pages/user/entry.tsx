import { useState } from "react"
import { HiOutlineMoon } from "react-icons/hi2"
import { BiDroplet } from "react-icons/bi"
import { MdOutlineShower } from "react-icons/md"
import { TbMoodNeutral, TbMoodSmile, TbMoodSad } from "react-icons/tb";
import { IoNutritionOutline, IoBicycleOutline } from "react-icons/io5";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function EntryPage() {
    const [entry, setEntry] = useState({entry: null})
    const [additional, setAdditional] = useState({})
    const [date, setDate] = useState({date: 0})
    const [isComplete, setComplete] = useState(false);
    const [message, setMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);
    
    const selectEntry = (event, key) => {
        console.log(event.currentTarget, key)
        setEntry({entry: key})
        setComplete(false);
        setSubmitted(false);
        // Auto scroll down?
    }

    const selectAdditional = (event, key) => {
        console.log(event.currentTarget.value, key)
        var tmp = additional;
        tmp[key] = event.currentTarget.value;
        setAdditional(tmp)
        setComplete(true);
        setSubmitted(false);

        console.log(tmp)
    }

    const multipleChoice = (event, key) => {
        console.log(event.currentTarget.value, key)
        setAdditional({entry: key})
        setComplete(true);
        setSubmitted(false);
    }

    const selectDate = (event, key) => {
        console.log(event.currentTarget, key)
        
        setEntry({entry: null})
        setSubmitted(false);
        setComplete(false);
        setDate({date: key})
    }

    const HandleSubmit = async (event) => {
        event.preventDefault();
        
        // Make sure all additional data is filled in
        var keys = Object.keys(additional);
        if (!entry || !keys.every(i => additional[i] != null)) return;
        
        const data = {
            type: entry.entry,
            additional: additional,
            date: date.date,
        }
        console.log('Form submission', entry, additional, date, isComplete)
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
        setSubmitted(true);
        const response = await fetch('/api/journal/entry', options)
        const respData = await response.json();
        console.log(response, respData)
        if (response.status == 200) {
            setMessage("Entry created");
            return;
        }
        setMessage(respData.message);
    }
    
    const sleepInfo = () => {
        // if slept is higher than woke, then slept is day before
        // if slept is lower than woke, then slept is same day
        if (!isComplete) {
            setComplete(true);
            setAdditional({started: null, finished: null})
        }
        return(
            <div className="flex flex-col w-3/4 justify-center items-center">
                <div className="w-1/4 justify-center mx-1 flex flex-row mb-3">
                    <div className="w-1/2 text-right pr-2 text-xl">
                        Time slept
                    </div>
                    <div className="w-1/2 pl-2">
                        {timeSelection("started")}
                    </div>
                </div>
                <div className="w-1/4 justify-center mx-1 flex flex-row">
                    <div className="w-1/2 text-right pr-2 text-xl">
                        Time woken
                    </div>
                    <div className="w-1/2 pl-2">
                        {timeSelection("finished")}
                    </div>
                </div>
            </div>
        )
    }
    const eatInfo = () => {
        if (!isComplete) {
            setComplete(true);
            setAdditional({started: null, input: null})
        }
        return(
            <div className="flex flex-col w-3/4 justify-center items-center">
                <div className="w-1/4 justify-center mx-1 flex flex-row mb-3">
                    <div className="w-1/2 text-right pr-2 text-xl">
                        Time ate
                    </div>
                    <div className="w-1/2 pl-2">
                        {timeSelection("started")}
                    </div>
                </div>
                <div className="w-1/4 justify-center mx-1 flex flex-row">
                    <div className="w-1/2 text-right pr-2 text-xl">
                        Calories
                    </div>
                    <div className="w-1/2 pl-2">
                        {userInput()}
                    </div>
                </div>
            </div>
        )
    }
    const hydrateInfo = () => {
        if (!isComplete) {
            setComplete(true);
            setAdditional({input: null})
        }
        return(
            <div className="flex flex-col w-3/4 justify-center items-center">
                <div className="w-1/2 mx-1 flex flex-row">
                    <div className="w-1/2 text-right pr-2 text-xl">
                        Milliliters drank
                    </div>
                    <div className="w-1/4 pl-2">
                        {userInput()}
                    </div>
                </div>
            </div>
        )
    }
    const showerInfo = () => {
        if (!isComplete) {
            setComplete(true);
            setAdditional({started: null})
        }
        return(
            <div className="flex flex-col w-3/4 justify-center items-center">
                <div className="w-1/2 mx-1 flex flex-row">
                    <div className="w-1/2 text-right pr-2 text-xl">
                        Time showered
                    </div>
                    <div className="w-1/4 pl-2">
                        {timeSelection("started")}
                    </div>
                </div>
            </div>
        )
    }
    const excerciseInfo = () => {
        if (!isComplete) {
            setComplete(true);
            setAdditional({started: null, input: null})
        }
        return(
            <div className="flex flex-col w-3/4 justify-center items-center">
                <div className="w-1/2 mx-1 flex flex-row mb-3">
                    <div className="w-1/2 text-right pr-2 text-xl">
                        Time excercised
                    </div>
                    <div className="w-1/4 pl-2">
                        {timeSelection("started")}
                    </div>
                </div>
                <div className="w-1/2 mx-1 flex flex-row">
                    <div className="w-1/2 text-right pr-2 text-xl">
                        How long for
                    </div>
                    <div className="w-1/4 pl-2">
                        {userInput()}
                    </div>
                </div>
            </div>
        )
    }
    const moodInfo = () => {
        const moods = [
            {name: "happy", icon: () => {return <TbMoodSmile className="w-full h-full" />}},
            {name: "neutral", icon: () => {return <TbMoodNeutral className="w-full h-full" />}},
            {name: "sad", icon: () => {return <TbMoodSad className="w-full h-full" />}},
        ]
        console.log(moods)
        return(
            moods.map(mood => {
                console.log("Mood", mood, mood.name, additional.entry)
                var selected = (mood.name == additional.entry) ? 'bg-gray-300 border-black' : '';
                return (
                    <div className={classNames(selected, "w-1/6 mx-2 py-4 px-8 bg-white shadow-lg rounded-lg my-4 ease-out duration-200 transition-all hover:bg-gray-200")} key={mood.name} onClick={e => multipleChoice(e, mood.name)}>
                        <div className="text-center font-bold text-2xl">
                            {mood.name}
                        </div>
                        <div className="align-center">
                            {mood.icon()}
                        </div>
                    </div>
                )
            })
        )
    }

    
    const timeSelection = (id) => {
        return(
                <input 
                    id={id}
                    className="relative block w-full appearance-none rounded-md align-right border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-600 focus:z-10 focus:border-gray-600 focus:outline-none focus:ring-gray-900 sm:text-sm" 
                    type="time"
                    onChange={e => selectAdditional(e, id)}
                    required
                />
            )
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
    const userInput = () => {
        return(
            <input 
                id="input"
                className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-600 focus:z-10 focus:border-gray-600 focus:outline-none focus:ring-gray-900 sm:text-sm"
                type={"number"}
                onChange={e => selectAdditional(e, "input")}
                required
            />
        )
    }
    
    const confirmButton = () => {
        console.log(isComplete, submitted)
        if (!isComplete || submitted) return;
        console.log("Show button")
        return(
            <button className="w-1/6 px-4 py-2 m-2 bg-white hover:bg-gray-200 hover:shadow-lg hover-dark-shadow rounded-lg mx-1 transition-all duration-300 cursor-pointer text-xl" type="submit">
                Confirm
            </button>    
        )
    }

    const displayMessage = () => {
        if (!submitted) return;
        return(
            <div className="w-full m-2 text-center text-xl">
                {message}
            </div>    
        )
    }



    const entries = [
        {name: "Sleep", icon: () => {return <HiOutlineMoon className="w-full h-full"/>}, additonal: sleepInfo,},
        {name: "Eat", icon: () => {return <IoNutritionOutline className="w-full h-full"/>}, additonal: eatInfo,},
        {name: "Hydrate", icon: () => {return <BiDroplet className="w-full h-full"/>}, additonal: hydrateInfo,},
        {name: "Shower", icon: () => {return <MdOutlineShower className="w-full h-full"/>}, additonal: showerInfo,},
        {name: "Excercise", icon: () => {return <IoBicycleOutline className="w-full h-full"/>}, additonal: excerciseInfo,},
        {name: "Mood", icon: () => {return <TbMoodNeutral className="w-full h-full"/>}, additonal: moodInfo,},
        // Future additions - Brushing teeth, medication, mindfulness ect
    ]

    return (
        <form className="flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8" onSubmit={HandleSubmit}>
            {calendarSelection()}
            <div className="w-full max-w-md space-y-8 mb-4">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Entry type
                    </h2>
                </div>
            </div>

            <div className="flex items-center justify-center w-3/4">
                {entries.map(item => {
                    var selected = (item.name == entry.entry) ? 'bg-gray-300 border-black' : '';
                    return(
                        <div className={classNames(selected, "w-1/6 mx-2 py-4 px-8 bg-white shadow-lg rounded-lg my-4 ease-out duration-200 transition-all hover:bg-gray-200")} key={item.name} onClick={e => selectEntry(e, item.name)}>
                            <div className="text-center font-bold text-2xl">
                                {item.name}
                            </div>
                            <div className="align-center">
                                {item.icon()}
                            </div>
                        </div>
                    )
                })}
            </div>
            
            {entries.map(item => {
                if (item.name !== entry.entry) return;
                return(
                    <div key={item.name} className="flex items-center justify-center w-3/4">
                        {item.additonal()}
                    </div>
                ) 
            })}
            {confirmButton()}
            {displayMessage()}
        </form>
    )
}