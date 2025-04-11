import { Activity } from "../types"

export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } }  |
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'reset-activity'}


export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => {
    const activities= localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : 
    []
}


export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
): ActivityState => {

    switch (action.type) {
        case 'save-activity': {
            let updatedActivities: Activity[];

            if (state.activeId) {
                // Editar actividad existente
                updatedActivities = state.activities.map(act =>
                    act.id === state.activeId ? action.payload.newActivity : act
                );
            } else {
                // Agregar nueva actividad
                updatedActivities = [...state.activities, action.payload.newActivity];
            }

            return {
                ...state,
                activities: updatedActivities,
                activeId: ''
            };
        }

        case 'set-activeId':
            return {
                ...state,
                activeId: action.payload.id
            };

        case 'delete-activity': {
            const updatedActivities = state.activities.filter(
                act => act.id !== action.payload.id
            );
            return {
            ...state,
             activities: updatedActivities
            }
        }

        case 'reset-activity': 
        return {
            activities: [],
            activeId: ''
        }
            
        

        default:
            return state;
    }
};
