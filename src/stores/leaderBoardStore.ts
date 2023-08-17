import type { gameModes } from "@/types/gameModes";
import { defineStore } from "pinia";

interface ILeaderBoardCategory {
  name: string;
  time: number | string;
  timeInSeconds: number | string;
}

export const useLeaderBoardStore = defineStore("leaderBoardStore", {
  state: () => ({
    leaderBoard: {
      easy:
        JSON.parse(localStorage.getItem("leaderBoard:easy") as string) || [],
      medium:
        JSON.parse(localStorage.getItem("leaderBoard:medium") as string) || [],
      hard:
        JSON.parse(localStorage.getItem("leaderBoard:hard") as string) || [],
    },
  }),
  actions: {
    saveNewWinner(gameMode: gameModes, name: string, time: number) {
      this.leaderBoard[gameMode].push({
        name,
        time: new Date(time * 1000).toISOString().slice(11, 19),
        timeInSeconds: time,
      });

      this.leaderBoard[gameMode].sort(
        (a: ILeaderBoardCategory, b: ILeaderBoardCategory) =>
          Number(a.timeInSeconds) - Number(b.timeInSeconds)
      );
      if (this.leaderBoard[gameMode].length > 10) {
        this.leaderBoard[gameMode].pop();
      }
      localStorage.setItem(
        `leaderBoard:${gameMode}`,
        JSON.stringify(this.leaderBoard[gameMode])
      );
    },
  },
});
