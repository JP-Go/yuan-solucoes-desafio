import { Location } from '../@types/interfaces';

interface SaveRouteButtonProps {
  stops: Location[];
  onSave: (stops: Location[]) => void;
}

export function SaveRouteButton({ onSave, stops }: SaveRouteButtonProps) {
  return (
    <button
      className="text-white bg-slate-700 font-bold rounded-lg p-2 drop-shadow-lg justify-self-end"
      disabled={stops.length < 2}
      onClick={() => onSave(stops)}
    >
      Salvar esta rota
    </button>
  );
}
