import { createSelector } from '@reduxjs/toolkit';

export const isDetailVisibleSelector = (state) => state.isDetailVisible.isDetailVisible
export const isSelectedIdSelector = (state) => state.isDetailVisible.isSelectedId