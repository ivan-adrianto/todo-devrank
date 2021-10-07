import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import DashboardModule from "../components/Dashboard/DashboardModule";
import Header from "../layout/Header";
import { titlePage } from "../lib/titleHead";
import { Creators as TodoActions } from "../redux/TodoRedux";

function Dashboard() {
  const dispatch = useDispatch();
  const getActivities = () => dispatch(TodoActions.getActivitiesRequest());
  useEffect(() => {
    titlePage({
      title: "To Do List - Dashboard",
    });
    getActivities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Header />
      <DashboardModule />
    </div>
  );
}

export default Dashboard;
