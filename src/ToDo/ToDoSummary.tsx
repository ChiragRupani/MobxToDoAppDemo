import { inject, observer } from 'mobx-react';
import * as React from 'react';
import ToDoStore from './ToDoStore';

@inject('ToDoStore')
@observer
export default class ToDoSummary extends React.Component<
  { ToDoStore?: ToDoStore },
  {}
> {
  render() {
    const totalToDos = this.props.ToDoStore?.ToDos.length ?? 0;
    const completedToDos =
      this.props.ToDoStore?.ToDos.filter((x) => x.IsCompleted).length ?? 0;

    return (
      <section style={{ fontSize: 'larger' }}>
        ToDo status {totalToDos - completedToDos} ToDo(s) pending from{' '}
        {totalToDos} ToDo(s)
      </section>
    );
  }
}
