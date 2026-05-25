"use client";

import { createContext, useContext, useState, useCallback } from 'react';

const UiContext = createContext(null);

export function useUi() {
  return useContext(UiContext);
}

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div style={{ position: 'fixed', right: 20, top: 20, zIndex: 9999 }}>
      <div className={`rounded p-3 text-white ${toast.type === 'error' ? 'bg-red-600' : 'bg-green-600'}`}>
        {toast.message}
      </div>
    </div>
  );
}

function ConfirmModal({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded p-6 w-full max-w-md">
        <h3 className="font-semibold mb-2">Confirmar</h3>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button className="px-3 py-1 border rounded" onClick={onCancel}>Cancelar</button>
          <button className="px-3 py-1 bg-red-600 text-white rounded" onClick={onConfirm}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default function UiProvider({ children }) {
  const [toast, setToast] = useState(null);
  const [confirmState, setConfirmState] = useState({ open: false, message: null, resolve: null });

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const confirm = useCallback((message) => {
    return new Promise((resolve) => {
      setConfirmState({ open: true, message, resolve });
    });
  }, []);

  function handleConfirm(result) {
    if (confirmState.resolve) confirmState.resolve(result);
    setConfirmState({ open: false, message: null, resolve: null });
  }

  return (
    <UiContext.Provider value={{ showToast, confirm }}>
      {children}
      <Toast toast={toast} />
      <ConfirmModal open={confirmState.open} message={confirmState.message} onConfirm={() => handleConfirm(true)} onCancel={() => handleConfirm(false)} />
    </UiContext.Provider>
  );
}
