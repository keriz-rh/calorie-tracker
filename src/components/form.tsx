import { ChangeEvent, useState, FormEvent, Dispatch } from "react"
import { v4 as uuidv4 } from "uuid"
import { categories } from "../data/categories"
import { Activity } from "../types"
import { ActivityActions } from "../reducers/activity-reduce"

type FormProps = {
    dispatch: Dispatch<ActivityActions>
}

const initialState : Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function form({ dispatch }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    const hadleChange = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        setActivity({
            ...activity,
            [e.target.name]: isNumberField ? Number(e.target.value) : e.target.value
        });
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        return name.trim() !== '' && calories > 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: "save-activity", payload: { newActivity: activity } })

        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    return (
        <form
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3 ">
                <label htmlFor="category" className="text-lg font-semibold">Categoría:</label>
                <select
                    className="border border-gray-300 rounded-lg p-2 w-full bg-white"
                    name="category" id="category"
                    value={activity.category}
                    onChange={hadleChange}
                >
                    {categories.map((category) => (
                        <option key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3 ">
                <label htmlFor="name" className="text-lg font-semibold">Actividad:</label>
                <input type="text"
                    id="name"
                    name="name"
                    className="border border-gray-300 rounded-lg p-2 w-full bg-white"
                    placeholder="Ej. Comida, "
                    value={activity.name}
                    onChange={hadleChange}
                />

            </div>

            <div className="grid grid-cols-1 gap-3 ">
                <label htmlFor="calories" className="text-lg font-semibold">Calorías:</label>
                <input type="number"
                    id="calories"
                    name="calories"
                    className="border border-gray-300 rounded-lg p-2 w-full bg-white"
                    placeholder="Calorias ej. 200, "
                    min="0"
                    value={activity.calories}
                    onChange={hadleChange} />


            </div>

            <input type="submit"
                className="bg-gray-800 text-white p-2 rounded-lg w-full cursor-pointer hover:bg-gray-700 transition-colors uppercase font-semibold disabled:opacity-50"

                value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
                disabled={!isValidActivity()}
            />

        </form>
    )
}
