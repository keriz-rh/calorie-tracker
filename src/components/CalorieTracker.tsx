import { useActivity } from "../hooks/useActivity";
import CaloriesDisplay from "./CaloriesDisplay";


function CalorieTracker() {
    const { caloriesConsumed, caloriesBured, netCalories} = useActivity()

    return (
        <>
            <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>

            <div className=" flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
                <CaloriesDisplay
                    calories={caloriesConsumed}
                    text="Consumidas"
                />
                <CaloriesDisplay
                    calories={caloriesBured}
                    text="Ejercicio"
                />
                <CaloriesDisplay
                    calories={netCalories}
                    text="Diferencia"
                />

            </div >

        </>
    );
}

export default CalorieTracker;