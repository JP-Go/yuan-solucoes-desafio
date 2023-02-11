import { MagnifyingGlass } from 'phosphor-react';
import { type ReactElement } from 'react';

export function SearchBar(): ReactElement {
  return (
    <div className="relative top-2 h-16 w-3/5 z-10 flex items-center rounded-lg drop-shadow-lg">
      <MagnifyingGlass
        className="bg-white text-slate-500 rounded-r-lg h-12 pr-2 drop-shadow-r-lg"
        size={32}
        mirrored
      />
      <input
        className="bg-white placeholder:text-slate-500 p-2 w-full h-12 rounded-r-lg outline-none drop-shadow-t-lg drop-shadow-rb"
        placeholder="Busque um endereço para iniciar uma nova rota"
      />
    </div>
  );
}
