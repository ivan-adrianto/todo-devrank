import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import TodoDetailModule from "../components/TodoDetail/TodoDetailModule";
import Header from "../layout/Header";
import { titlePage } from "../lib/titleHead";
import { Creators as TodoActions } from "../redux/TodoRedux";

function TodoDetail() {
  const params = useParams().todoId
  const dispatch = useDispatch()
  const getTodoDetail = (data) => dispatch(TodoActions.getActivityDetailRequest(data)) 
  useEffect(() => {
    titlePage({
      title: "To Do List - Detail",
    });
    getTodoDetail(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Header />
      <TodoDetailModule />
    </div>
  );
}

export default TodoDetail;
