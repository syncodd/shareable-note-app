"use client"

// components/DraggableGrid.js
import React, { useState, useEffect } from 'react';
import GridLayout from 'react-grid-layout';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css'; // Import the styles for react-resizable
import Card from '../components/card';

const DraggableGrid = () => {
  
  let initialLayouts = [
    { i: '1', x: 0, y: 0, w: 1, h: 1 },
    // More initial layouts if needed
  ];

  if (typeof window !== 'undefined') {
    // Check if window object is available (indicating a client-side context)
    const storedLayouts = localStorage.getItem('layouts');
    initialLayouts = storedLayouts ? JSON.parse(storedLayouts) : initialLayouts;
  }

  const [layouts, setLayouts] = useState(initialLayouts);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('layouts', JSON.stringify(layouts));
    }
  }, [layouts]);
  
  
  const screenWidth = typeof window !== 'undefined' ? window.screen.width : 0;
  const screenHeight = typeof window !== 'undefined' ? window.screen.height : 0;

  const addLayout = () => {
    const newLayout = {
      i: String(layouts.length + 1), // Unique ID for the new layout
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    };
    setLayouts([...layouts, newLayout]);
  };

  const onLayoutChange = (newLayouts: React.SetStateAction<{ i: string; x: number; y: number; w: number; h: number; }[]>) => {
    // Update the layouts state with the new layout information
    setLayouts(newLayouts);
  };  

  return (
    <>
    <button onClick={addLayout}>Add Layout</button>
    <GridLayout className="layout" layout={layouts} cols={8} rowHeight={100} width={screenWidth} onLayoutChange={onLayoutChange} compactType={null} isResizable={true}>
      {layouts.map(item => (
        <div key={item.i} className="grid-item">
          <ResizableBox
            width={20}
            height={20}
            data-handlestyles={{ right: { cursor: 'e-resize' }, bottom: { cursor: 's-resize' } }}
            
          >
          <Draggable bounds="parent" disabled={true}>
              <div className="draggable-component">
                <Card />
              </div>
          </Draggable>
            </ResizableBox>
        </div>
      ))}
    </GridLayout>
    </>
  );
};

export default DraggableGrid;
