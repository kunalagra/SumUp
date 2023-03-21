import { Routes, Route } from "react-router-dom";
import NotFound from "./Components/NotFound";
import CreateSummary from "./Components/CreateSummary";
import RenderSummary from "./Components/RenderSummary";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import UpdatePassword from "./Components/update";
import ResetPassword from "./Components/reset";
import HomePage from "./Components/HomePage";
import Preloader from "./Components/Preloader";
import RecentSummaries from "./Components/RecentSummaries";
import RenderRecentSummary from "./Components/RenderRecentSummary";
import commonContext from "./Context/commonContext";
import { useContext } from "react";
import MyTeams from "./Components/MyTeams";

const RouterRoutes = () => {    

    const { isLoading, loadCont } = useContext(commonContext);

    return (
        <>
            {
                isLoading? <Preloader cont={loadCont} /> : (
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/summarize" element={<CreateSummary />} />
                        <Route path="/summary" element={<RenderSummary />} />
                        <Route path="/user" element={<Profile />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/update" element={<UpdatePassword />} />
                        <Route path="/reset" element={<ResetPassword />} />
                        <Route path="/recent-summaries" element={<RecentSummaries />} />
                        <Route path="/recent-summaries/:index" element={<RenderRecentSummary />} />
                        <Route path="/my-teams" element={<MyTeams />} />

                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                )
            }
        </>
    )
}

export default RouterRoutes;