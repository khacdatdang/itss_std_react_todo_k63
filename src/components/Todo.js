import React, { useState } from 'react';

/* 
  【Todoのデータ構成】
　・key：Todoを特定するID（String）
　・text：Todoの内容（String）
　・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useStorage from '../hooks/storage';

/* ライブラリ */
import {getKey} from "../lib/util";

function Todo() {
  const [items, putItems, clearItems] = useStorage();

  const [filter, setFilter] = React.useState('all')
  const handleCheck = checked => {
    const newItems = items.map(item => {
      if (item.key === checked.key) {
        item.done = !item.done;
      }
      return item;
    });
    putItems(newItems);
  };

  const handleAdd = text => {
    putItems([...items, { key: getKey(), text, done: false }]);
  };

  const handleFilterChange = value => setFilter(value);
  
  const filterItems = items.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'todo') return !item.done;
    if (filter === 'done') return item.done
  })
  return (
    <div className="panel">
      <div className="panel-heading">
        ITSS ToDoアプリ
      </div>
      <Input onAdd = {handleAdd}/>
      <Filter
        onChange={handleFilterChange}
        value={filter}
      />
      {filterItems.map(item => (
        <TodoItem item = {item} onClick = {handleCheck}/>
      ))}
      <div className="panel-block">
        {filterItems.length} items
      </div>
       <div className="panel-block">
        <button className="button is-light is-fullwidth" onClick={clearItems}>
          全てのToDoを削除
        </button>
      </div>
    </div>
  );
}

export default Todo;