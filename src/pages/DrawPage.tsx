import React, { useState, useRef, useEffect } from "react";

export default function DrawPage() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [start, setStart] = useState({
    x: 0,
    y: 0,
  })

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D>();

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = 700;
    canvas.height = 700;
    canvas.style.width = `${700}px`;
    canvas.style.height = `${700}px`;

    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;

    contextRef.current = context;

  }, []);

  function startDrawing(e: any) {
    const offsetX = e.clientX - 8;
    const offsetY = e.clientY - 8;
    setStart({x: offsetX, y: offsetY});
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  }

  function finishDrawing(e: any) {
    const offsetX = e.clientX - 8;
    const offsetY = e.clientY - 8;
    contextRef.current?.closePath();
    setIsDrawing(false);
  }

  function drawLine(ctx: any, line: any) {
    ctx.beginPath()
    ctx.moveTo(line.start.x, line.start.y)
    ctx.lineTo(line.end.x, line.end.y)
    ctx.lineWidth = line.lineWidth
    ctx.lineCap = line.lineCap
    ctx.strokeStyle = line.strokeStyle
    ctx.strokeRect(start.x, start.y, line.end.x - start.x, line.end.y - start.y)
  }

  function draw(e: any) {
    if (!isDrawing) {
      return;
    }

    const offsetX = e.clientX - 8;
    const offsetY = e.clientY - 8;
    contextRef.current?.clearRect(0,0, canvasRef.current!.width, canvasRef.current!.height)
    const line = {
      start: {...start},
      end: {
        x: offsetX,
        y: offsetY
      }
    }
    drawLine(contextRef.current, line)
  }

  return (
    <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
  );
}
