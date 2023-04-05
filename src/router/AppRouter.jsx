import { Route, Routes } from "react-router"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRoutes } from "../journal/routes/JournalRoutes"


export const AppRouter = () => {
  return (
    <Routes>
        
        {/* LOGIN Y REGISTRO */}
        <Route path="/auth/*" element={ <AuthRoutes /> }/>

        {/* JournalApp */}
        <Route path="/*" element={ <JournalRoutes /> } />
        
    </Routes>
  )
}
