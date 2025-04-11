type CaloriesDisplayProps = {
    calories: number
    text: string
}


function CaloriesDisplay({ calories, text }: CaloriesDisplayProps) {
    return (

        <p className="text-white font-bold rounded-full grid gird-cols-1 gap-3 text-center">
            <span className=" font-black text-6xl text-orange">
                {calories}
            </span>
            {text}
        </p>
    );
}

export default CaloriesDisplay;