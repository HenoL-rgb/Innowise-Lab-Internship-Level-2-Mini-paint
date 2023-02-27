import React, { useState, useRef, useEffect, useId } from "react";
import { useAppSelector } from "../../hooks/redux-hooks";
import SideBar from "../../components/SideBar/SideBar";
import { getStorage, ref, uploadBytes, uploadString } from "firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";
import { DrawPageWrapper, CanvasWrapper } from "./DrawPageStyles";
import { PaletteType, ShapeType } from "../../types";

export default function DrawPage() {
  const [shapes, setShapes] = useState<ShapeType[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [dotted, setDotted] = useState<boolean>(true);
  const [start, setStart] = useState({
    x: 0,
    y: 0,
  });
  const currentShape = useAppSelector((state) => state.figure);
  const user = useAppSelector((state) => state.user);
  const storage = getStorage();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D>();
  const coordsRef = useRef({ x: 0, y: 0 });
  const theme: string = useAppSelector((state) => state.theme.currentTheme);
  const palette: PaletteType = useAppSelector((state) => {
    if (theme === "light") {
      return state.theme.light;
    } else {
      return state.theme.dark;
    }
  });

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 800;
    canvas.style.width = `${800}px`;
    canvas.style.height = `${800}px`;
    coordsRef.current = canvasRef.current?.getBoundingClientRect() ?? {
      x: 0,
      y: 0,
    };

    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    context.lineCap = "round";
    context.strokeStyle = currentShape.color;
    context.lineWidth = currentShape.width;

    contextRef.current = context;
    drawShape(contextRef.current, shapes);
  }, [currentShape]);

  async function handleSave(title: string) {
    const id = uuid();
    const storageRef = ref(storage, `${user.email}/${id}`);
    const string = canvasRef.current?.toDataURL();
    if (!string) return;

    await addDoc(collection(db, "posts"), {
      user: user.email,
      title: title,
      imageRef: id,
      createdAt: serverTimestamp(),
    });

    uploadString(storageRef, string, "data_url").then((snapshot) => {
      console.log("Uploaded a data_url string!");
    });
  }

  return (
    <DrawPageWrapper theme={palette}>
      <SideBar
        handleClearClick={clearAll}
        handleSave={handleSave}
        theme={palette}
      />
      <CanvasWrapper>
        <canvas
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={draw}
          ref={canvasRef}
        />
      </CanvasWrapper>
    </DrawPageWrapper>
  );

  function startDrawing(e: any) {
    const offsetX = e.clientX - coordsRef.current.x;
    const offsetY = e.clientY - coordsRef.current.y;
    setStart({ x: offsetX, y: offsetY });
    setIsDrawing(true);
  }

  function finishDrawing(e: any) {
    setIsDrawing(false);
    setDotted(true);
    const offsetX = e.clientX - coordsRef.current.x;
    const offsetY = e.clientY - coordsRef.current.y;
    const line = {
      start: { ...start },
      end: {
        x: offsetX,
        y: offsetY,
      },
    };

    const figure: ShapeType = {
      line: { ...line },
      figure: currentShape.figure,
      color: currentShape.color,
      mode: currentShape.mode,
      width: currentShape.width,
    };
    setShapes((prev) => [...prev, figure]);
    drawShape(contextRef.current, [...shapes, figure]);
    contextRef.current?.beginPath();
  }

  function drawShape(ctx: any, shapes: ShapeType[]) {
    clearCanvas(contextRef.current);
    shapes.forEach((shape) => {
      const line = shape.line;
      const figure = shape.figure;
      const color = shape.color;
      const mode = shape.mode;
      const width = shape.width;
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(line.start.x, line.start.y);
      ctx.lineTo(line.end.x, line.end.y);

      switch (figure) {
        case "line": {
          ctx.stroke();
          return;
        }
        case "rectangle": {
          if (mode === "fill") {
            ctx.fillStyle = color;
            ctx.fillRect(
              line.start.x,
              line.start.y,
              line.end.x - line.start.x,
              line.end.y - line.start.y
            );
          } else {
            ctx.strokeRect(
              line.start.x,
              line.start.y,
              line.end.x - line.start.x,
              line.end.y - line.start.y
            );
          }

          return;
        }
        case "circle": {
          ctx.beginPath();
          ctx.ellipse(
            line.start.x,
            line.start.y,
            Math.abs(line.start.x - line.end.x) / 2,
            Math.abs(line.start.y - line.end.y) / 2,
            0,
            0,
            2 * Math.PI
          );
          if (mode === "fill") {
            ctx.fillStyle = color;
            ctx.fill();
          } else {
            ctx.stroke();
          }
          return;
        }
        default: {
          if (mode === "fill") {
            ctx.fill();
          } else {
            ctx.stroke();
          }
        }
      }
    });
  }

  function draw(e: any) {
    if (!isDrawing) {
      return;
    }
    setDotted(false);
    const offsetX = e.clientX - coordsRef.current.x;
    const offsetY = e.clientY - coordsRef.current.y;
    const line = {
      start: { ...start },
      end: {
        x: offsetX,
        y: offsetY,
      },
    };

    if (currentShape.figure !== "pencil") {
      const figure: ShapeType = {
        line: { ...line },
        figure: currentShape.figure,
        color: currentShape.color,
        mode: currentShape.mode,
        width: currentShape.width,
      };
      if (dotted === false) {
        setShapes((prev) =>
          prev.filter((item, index) => index !== shapes.length - 1)
        );
      }

      setShapes((prev) => [...prev, figure]);
      drawShape(contextRef.current, shapes);
      return;
    }

    setStart({ x: offsetX, y: offsetY });
    setShapes((prev) => [
      ...prev,
      {
        line: { ...line },
        figure: "line",
        color: currentShape.color,
        mode: currentShape.mode,
        width: currentShape.width,
      },
    ]);

    drawShape(contextRef.current, shapes);
  }

  function clearCanvas(ctx: CanvasRenderingContext2D | undefined) {
    ctx?.clearRect(
      0,
      0,
      canvasRef.current?.width ?? 0,
      canvasRef.current?.height ?? 0
    );
  }

  function clearAll() {
    contextRef.current?.clearRect(
      0,
      0,
      canvasRef.current?.width ?? 0,
      canvasRef.current?.height ?? 0
    );
    setShapes([]);
    setIsDrawing(false);
  }
}
