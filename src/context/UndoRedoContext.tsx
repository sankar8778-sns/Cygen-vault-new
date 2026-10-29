import React, { createContext, useContext, useState, useCallback, useRef } from 'react';

export interface UndoableAction {
  id: string;
  description: string;
  undo: () => void;
  redo: () => void;
  timestamp: number;
}

interface UndoRedoContextType {
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  undoDescription: string | null;
  redoDescription: string | null;
  recordAction: (action: { description: string; undo: () => void; redo: () => void }) => void;
  clearHistory: () => void;
}

const UndoRedoContext = createContext<UndoRedoContextType | undefined>(undefined);

export const UndoRedoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [undoStack, setUndoStack] = useState<UndoableAction[]>([]);
  const [redoStack, setRedoStack] = useState<UndoableAction[]>([]);
  
  // Guard to prevent recording actions that are triggered by undo/redo itself
  const isExecutingRef = useRef(false);

  const recordAction = useCallback(({ description, undo, redo }: { description: string; undo: () => void; redo: () => void }) => {
    if (isExecutingRef.current) return;
    
    const newAction: UndoableAction = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      description,
      undo,
      redo,
      timestamp: Date.now()
    };

    setUndoStack(prev => {
      // Limit history to 30 actions to stay lightweight
      const updated = [...prev, newAction];
      if (updated.length > 30) {
        return updated.slice(updated.length - 30);
      }
      return updated;
    });
    // Whenever a new action is performed, redo stack is cleared
    setRedoStack([]);
  }, []);

  const undo = useCallback(() => {
    if (undoStack.length === 0) return;

    const actionToUndo = undoStack[undoStack.length - 1];
    isExecutingRef.current = true;
    try {
      actionToUndo.undo();
    } finally {
      isExecutingRef.current = false;
    }

    setUndoStack(prev => prev.slice(0, prev.length - 1));
    setRedoStack(prev => [...prev, actionToUndo]);
  }, [undoStack]);

  const redo = useCallback(() => {
    if (redoStack.length === 0) return;

    const actionToRedo = redoStack[redoStack.length - 1];
    isExecutingRef.current = true;
    try {
      actionToRedo.redo();
    } finally {
      isExecutingRef.current = false;
    }

    setRedoStack(prev => prev.slice(0, prev.length - 1));
    setUndoStack(prev => [...prev, actionToRedo]);
  }, [redoStack]);

  const clearHistory = useCallback(() => {
    setUndoStack([]);
    setRedoStack([]);
  }, []);

  const canUndo = undoStack.length > 0;
  const canRedo = redoStack.length > 0;
  const undoDescription = canUndo ? undoStack[undoStack.length - 1].description : null;
  const redoDescription = canRedo ? redoStack[redoStack.length - 1].description : null;

  return (
    <UndoRedoContext.Provider
      value={{
        canUndo,
        canRedo,
        undo,
        redo,
        undoDescription,
        redoDescription,
        recordAction,
        clearHistory
      }}
    >
      {children}
    </UndoRedoContext.Provider>
  );
};

export const useUndoRedo = () => {
  const context = useContext(UndoRedoContext);
  if (!context) {
    throw new Error('useUndoRedo must be used within an UndoRedoProvider');
  }
  return context;
};
