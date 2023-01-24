import { useState } from "react"
import { HiOutlineMoon } from "react-icons/hi2"
import { BiDroplet } from "react-icons/bi"
import { MdOutlineShower } from "react-icons/md"
import { TbMoodNeutral, TbMoodSmile, TbMoodSad } from "react-icons/tb";
import { IoNutritionOutline, IoBicycleOutline } from "react-icons/io5";
import { isTemplateExpression } from "typescript";


function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function EntryPage() {
    const [entry, setEntry] = useState({entry: null})
    const [additional, setAdditional] = useState({entry: null})
    
    const selectEntry = (event, key) => {
        console.log(event.currentTarget, key)
        setEntry({entry: key})
        // Auto scroll down?
    }

    const selectAdditional = (event, key) => {
        console.log(event.currentTarget, key)
        setAdditional({entry: key})
    }
    
    const sleepInfo = () => {
        return(
            <div>
                Sleep time
                Wake up time
                Show how long slept for
            </div>
        )
    }
    const eatInfo = () => {
        return(
            <div>
                What time eat
                Snack/Dinner
                Calories
            </div>
        )
    }
    const hydrateInfo = () => {
        return(
            <div>
                How many liters
            </div>
        )
    }
    const showerInfo = () => {
        return(
            <div>
                What time showered
                How long for
            </div>
        )
    }
    const excerciseInfo = () => {
        return(
            <div>
                How long for
            </div>
        )
    }
    const moodInfo = () => {
        const moods = [
            {name: "happy", icon: () => {return <TbMoodSmile className="w-full h-full" />}},
            {name: "neutral", icon: () => {return <TbMoodNeutral className="w-full h-full" />}},
            {name: "sad", icon: () => {return <TbMoodSad className="w-full h-full" />}},
        ]
        return(
            moods.map(mood => {
                const selected = (mood.name == additional.entry) ? 'bg-gray-300 border-black' : '';
                return (
                    <div className={classNames(selected, "w-1/6 mx-2 py-4 px-8 bg-gray-100 shadow-lg rounded-lg my-4 ease-out duration-200 transition-all hover:bg-gray-200")} key={mood.name} onClick={e => selectAdditional(e, mood.name)}>
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



    const entries = [
        {name: "Sleep", icon: () => {return <HiOutlineMoon className="w-full h-full"/>}, additonal: sleepInfo,},
        {name: "Eat", icon: () => {return <IoNutritionOutline className="w-full h-full"/>}, additonal: eatInfo,},
        {name: "Hydrate", icon: () => {return <BiDroplet className="w-full h-full"/>}, additonal: hydrateInfo,},
        {name: "Shower", icon: () => {return <MdOutlineShower className="w-full h-full"/>}, additonal: showerInfo,},
        {name: "Excercise", icon: () => {return <IoBicycleOutline className="w-full h-full"/>}, additonal: excerciseInfo,},
        {name: "Mood", icon: () => {return <TbMoodNeutral className="w-full h-full"/>}, additonal: moodInfo,},
        // Brushing teeth, medication, mindfulness
    ]

    return (
        <div className="flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 mb-4">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Entry type
                    </h2>
                </div>
            </div>

            <div className="flex items-center justify-center w-3/4">
                {entries.map(item => {
                    const selected = (item.name == entry.entry) ? 'bg-gray-300 border-black' : '';
                    return(
                        <div className={classNames(selected, "w-1/6 mx-2 py-4 px-8 bg-gray-100 shadow-lg rounded-lg my-4 ease-out duration-200 transition-all hover:bg-gray-200")} key={item.name} onClick={e => selectEntry(e, item.name)}>
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

        </div>
    )
}