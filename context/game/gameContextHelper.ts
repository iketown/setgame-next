interface UseGameCtxHelperI {
  state: GameState;
  action: GameAction;
}

export const useGameCtxHelper = ({ state, dispatch }: UseGameCtxHelperI) => {
  const [gameInfo, setGameInfo];
  const delayedStart = () => {};

  return { delayedStart };
};
