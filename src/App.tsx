import { useReducer, useEffect, useMemo } from "react"
import Form from "./components/form"
import { activityReducer, initialState } from "./reducers/activity-reduce"
import ActivityList from "./components/ActivityList"
import CalorieTracker from "./components/CalorieTracker"


function App() {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities))
  }, [state.activities])

  const canResetApp = () => useMemo(() => state.activities.length > 0, [state.activities])

  return (
    <>

      <header className="bg-lime-600 text-white p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">

          <h1 className="text-2xl font-bold">
            Contador de Calorias App</h1>
      
          <button
          className="bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer
          rounded-lg text-sm disabled:opacity-10"
          disabled={!canResetApp()}
          onClick={() => dispatch({type: 'reset-activity'})}
         >
            Reiniciar App
          </button>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
        <CalorieTracker
        activities={state.activities}
          />
        </div>

      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          activities={state.activities}
          dispatch={dispatch}

        />
      </section>

    </>
  )
}

export default App
