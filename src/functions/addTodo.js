import React, { useState } from 'react';

export const addTodo = (todos, newTodo) => {
    return [...todos, newTodo];
  };
