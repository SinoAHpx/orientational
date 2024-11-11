import { create } from "zustand"

interface GlobalState {
    currentWeek : number,
    
}

export const uesGlobalState = create<GlobalState>()