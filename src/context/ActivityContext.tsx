import { createContext, Dispatch, ReactNode, useMemo, useReducer } from "react"
import { ActivityActions, activityReducer, ActivityState, initialState } from "../reducers/activity-reduce"
import { categories } from "../data/categories"
import { Activity, Category } from "../types"

type ActivityProviderProps = {
    children: ReactNode
}

type ActivityContextProps = {
    state: ActivityState
    dispatch: Dispatch<ActivityActions>
    caloriesConsumed: number
    caloriesBured: number
    netCalories: number
    categoryName: (category: Activity['category']) => string[]
    isEmptyActivities: boolean
}

export const ActivityContext = createContext<ActivityContextProps>(null!)

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
    const [state, dispatch] = useReducer(activityReducer, initialState)

    //Contadores
    const caloriesConsumed = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total +
        activity.calories : total, 0), [state.activities])
    const caloriesBured = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total +
        activity.calories : total, 0), [state.activities])
    const netCalories = useMemo(() => caloriesConsumed - caloriesBured, [state.activities])


    const categoryName = useMemo(() =>
        (category: Activity['category']) =>
            categories.map(cat => cat.id === category ? cat.name : '')
        , [state.activities])

    const isEmptyActivities = useMemo(() => state.activities.length === 0, [state.activities])


    return (
        <ActivityContext.Provider
            value={{
                state,
                dispatch,
                caloriesConsumed,
                caloriesBured,
                netCalories,
                categoryName,
                isEmptyActivities
            }}>
            {children}
        </ActivityContext.Provider>
    )
}
