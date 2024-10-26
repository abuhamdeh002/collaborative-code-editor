import React from 'react';
import { Save, Play, Users } from 'lucide-react';
import {Button} from '../ui/Button';

export const EditorToolbar = ({
  onSave,
  onRun,
  saving = false,
  running = false,
  collaborators = []
}) => {
  return (
    <div className="bg-white border-b p-2 flex justify-between items-center">
      <div className="flex space-x-2">
        <Button
          onClick={onSave}
          disabled={saving}
          size="sm"
          variant="outline"
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save'}
        </Button>

        <Button
          onClick={onRun}
          disabled={running}
          size="sm"
          variant="outline"
          className="flex items-center gap-2"
        >
          <Play className="w-4 h-4" />
          {running ? 'Running...' : 'Run'}
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Users className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          {collaborators.length} online
        </span>
      </div>
    </div>
  );
};