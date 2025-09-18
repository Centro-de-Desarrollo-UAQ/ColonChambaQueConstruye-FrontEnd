'use client';

import LinkerNavBar from '@/components/linker/LinkerNavBar';

export default function PagePrueba() {
  return (
    <div>
      <LinkerNavBar />
      <main className="p-10">
        <h1 className="text-2xl font-bold">Prueba del LinkerNavBar</h1>
        <p>Si ves la barra de navegación arriba, todo está funcionando 👌</p>
      </main>
    </div>
  );
}
