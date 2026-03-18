import React, { useState, useCallback } from 'react';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';

// ─── Individual Toast ─────────────────────────────────────────────────────────
const TOAST_ICONS = {
  success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
  error:   <XCircle      className="w-5 h-5 text-red-500" />,
  info:    <Info         className="w-5 h-5 text-blue-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
};

const TOAST_CLASSES = {
  success: 'border-l-4 border-green-500',
  error:   'border-l-4 border-red-500',
  info:    'border-l-4 border-blue-500',
  warning: 'border-l-4 border-yellow-500',
};

const ToastItem = ({ toast, onRemove }) => (
  <div className={`flex items-start gap-3 bg-white shadow-lg rounded-lg p-4 w-80 ${TOAST_CLASSES[toast.type]}`}>
    {TOAST_ICONS[toast.type]}
    <p className="flex-1 text-sm text-gray-700">{toast.message}</p>
    <button onClick={() => onRemove(toast.id)} className="text-gray-400 hover:text-gray-600 shrink-0">
      <X className="w-4 h-4" />
    </button>
  </div>
);

// ─── Toast Container ──────────────────────────────────────────────────────────
export const ToastContainer = ({ toasts, onRemove }) => (
  <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
    {toasts.map((t) => (
      <div key={t.id} className="pointer-events-auto">
        <ToastItem toast={t} onRemove={onRemove} />
      </div>
    ))}
  </div>
);

// ─── useToast hook ────────────────────────────────────────────────────────────
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = {
    success: (msg, dur) => addToast(msg, 'success', dur),
    error:   (msg, dur) => addToast(msg, 'error',   dur),
    info:    (msg, dur) => addToast(msg, 'info',    dur),
    warning: (msg, dur) => addToast(msg, 'warning', dur),
  };

  return { toasts, toast, removeToast };
};

export default ToastContainer;
