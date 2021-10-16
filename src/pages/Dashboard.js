import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { titlePage } from "../lib/titleHead";
import { Creators as TodoActions } from "../redux/TodoRedux";
const DashboardModule = lazy(() =>
  import("../components/Dashboard/DashboardModule")
);
const Header = lazy(() =>
  import("../layout/Header")
);


function Dashboard() {
  const dispatch = useDispatch();
  const getActivities = () => dispatch(TodoActions.getActivitiesRequest());
  useEffect(() => {
    titlePage({
      title: "To Do List - Dashboard",
    });
    getActivities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Header />
      <DashboardModule />
    </Suspense>
  );
}

export default Dashboard;
