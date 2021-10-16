import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { titlePage } from "../lib/titleHead";
import { Creators as TodoActions } from "../redux/TodoRedux";
const TodoDetailModule = lazy(() =>
  import("../components/TodoDetail/TodoDetailModule")
);
const Header = lazy(() =>
  import("../layout/Header")
);

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
    <Suspense fallback={<p>Loading...</p>}>
      <Header />
      <TodoDetailModule />
    </Suspense>
  );
}

export default TodoDetail;
