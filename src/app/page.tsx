'use client'
import DroppableContainer from '@/components/dnd/droppable-container';
import AnnotationNode from '@/components/flow/annotation-node';
import ButtonEdge from '@/components/flow/button-edge';
import CircleNode from '@/components/flow/circle-node';
import {
  edges as initialEdges,
  nodes as initialNodes,
} from '@/components/flow/initial-elements';
import ResizerNode from '@/components/flow/resizer-node';
import TextNode from '@/components/flow/text-node';
import ToolbarNode from '@/components/flow/toolbar-node';
import MainLayout from '@/components/layout/main-layout';
import { useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useEdgesState,
  useNodesState,
} from 'reactflow';



const nodeTypes = {
  annotation: AnnotationNode,
  tools: ToolbarNode,
  resizer: ResizerNode,
  circle: CircleNode,
  textinput: TextNode,
};

const edgeTypes = {
  button: ButtonEdge,
};

const nodeClassName = (node) => node.type;

const ItemTypes = {
  ITEM: 'chat'
}

export default function Home() {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );


  return (
    <main>
      <DndProvider backend={HTML5Backend}>
        <DroppableContainer>
          <MainLayout>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              attributionPosition="top-right"
              nodeTypes={nodeTypes}
              edgeTypes={edgeTypes}
              className="overview"
            >
              <MiniMap zoomable pannable nodeClassName={nodeClassName} />
              <Controls />
              <Background />
            </ReactFlow>
          </MainLayout>
        </DroppableContainer>
      </DndProvider>
    </main>
  );
}
